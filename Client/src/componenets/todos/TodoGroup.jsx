import React from 'react';
import TodoItem from './TodoItem';

const TodoGroup = ({ todos, onDelete, onToggle }) => {
  if (!todos || !Array.isArray(todos) || todos.length === 0) {
    return <p className="text-gray-500">No todos for today.</p>;
  }

  // Find index where uncompleted start
  const firstUncompletedIndex = todos.findIndex(t => !t.completed);

  return (
    <div className="mb-6">
      {firstUncompletedIndex > 0 && (
        <h4 className="font-medium mb-2 text-gray-600">Completed</h4>
      )}
      {todos.map((todo, idx) => (
        <React.Fragment key={todo._id}>
          {idx === firstUncompletedIndex && (
            <h4 className="font-medium mb-2 text-gray-600">Uncompleted</h4>
          )}
          <TodoItem todo={todo} onDelete={onDelete} onToggle={onToggle} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TodoGroup;
