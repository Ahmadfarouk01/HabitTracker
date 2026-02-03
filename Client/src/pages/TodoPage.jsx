import React, { useState, useEffect, useContext } from 'react';
import AppLayout from '../componenets/layouts/AppLayout';
import TodoGroup from '../componenets/todos/TodoGroup';
import AddTaskForm from '../componenets/forms/AddTodoForm';
import API, { setAuthToken } from '../axios/axios';
import { AuthContext } from '../context/AuthContext';
import TodosProgress from '../componenets/todos/TodosProgress';

const TodoPage = () => {
  const { token } = useContext(AuthContext);
  const [todosData, setTodosData] = useState({ completed: [], uncompleted: [], total: 0, completedCount: 0 });
  const [tab, setTab] = useState('uncompleted'); // 'completed' or 'uncompleted'
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchTodayTodos();
    }
  }, [token]);

  const fetchTodayTodos = async () => {
    try {
      const res = await API.get('/todos/today'); // GET /api/todos/today
      setTodosData(res.data);
    } catch (err) {
      console.error('Failed to fetch today todos:', err.response?.data?.message || err.message);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const res = await API.post('/todos', {
        text: task.text,
        time: task.time,
        date: new Date(), // today
      });
      fetchTodayTodos(); // refresh
    } catch (err) {
      console.error('Failed to add todo:', err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodayTodos(); // refresh
    } catch (err) {
      console.error('Failed to delete todo:', err.response?.data?.message || err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      await API.patch(`/todos/${id}/toggle`);
      fetchTodayTodos();
    } catch (err) {
      console.error('Failed to toggle todo:', err.response?.data?.message || err.message);
    }
  };


  

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Today</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Task
        </button>
      </div>


<TodosProgress completed={todosData.completed} total={todosData.total} />

  <h1 className="font-bold text-2xl">Todo's</h1>

      {/* Progress Bar */}
      {/* <div className="mb-4 bg-gray-200 rounded h-4 relative overflow-hidden">
        <div
          className="bg-green-500 h-4"
          style={{ width: `${(todosData.completedCount / Math.max(todosData.total, 1)) * 100}%` }}
        />
        <span className="absolute left-2 top-0 text-sm text-white font-semibold">
          {todosData.completedCount} / {todosData.total} completed
        </span>
      </div>
 */}


      

      {/* Todo Group */}
      {/* // Inside your component, instead of tabs: */}
<TodoGroup
  todos={[...todosData.completed, ...todosData.uncompleted]} // completed first
  onDelete={handleDelete}
  onToggle={handleToggle}
/>

      {/* Add Task Modal */}
      <AddTaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </AppLayout>
  );
};

export default TodoPage;
