import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={todo.done} readOnly className="w-4 h-4" />
        <span className={`${todo.done ? 'line-through text-gray-400' : ''}`}>{todo.text}</span>
      </div>
      <span className="text-gray-400 text-sm">{todo.time}</span>
    </div>
  );
};

export default TodoItem;
