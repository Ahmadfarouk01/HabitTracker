import React, { useState } from 'react';
import AppLayout from '../componenets/layouts/AppLayout';
import DayTabs from '../componenets/todos/DaysTab';
import TodoGroup from '../componenets/todos/TodoGroup';
import AddTaskForm from '../componenets/forms/AddTodoForm';

const TodoPage = () => {
  const [todosData, setTodosData] = useState({
    Today: [{ id: 1, text: 'Buy groceries', done: true, time: '9:00 AM' }],
    Tomorrow: [{ id: 2, text: 'Call dentist', done: false, time: '9:00 AM' }],
  });
  const [selectedDay, setSelectedDay] = useState('Today');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task) => {
    setTodosData({
      ...todosData,
      [selectedDay]: [...(todosData[selectedDay] || []), task],
    });
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <DayTabs days={['Today', 'Tue', 'Wed', 'Thu', 'Sat']} onSelect={setSelectedDay} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Task
        </button>
      </div>

      <TodoGroup day={selectedDay} todos={todosData[selectedDay]} />

      <AddTaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </AppLayout>
  );
};

export default TodoPage;
