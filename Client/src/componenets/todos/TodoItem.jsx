import React, { useState, useEffect } from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const [open, setOpen] = useState(false);
  const [timeStatus, setTimeStatus] = useState('active'); // 'active', 'almost', 'passed'
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!todo.completed && todo.time) {
      const now = new Date();
      const [hours, minutes] = todo.time.split(':').map(Number);
      const todoDate = new Date();
      todoDate.setHours(hours, minutes, 0, 0);

      const diffMinutes = (todoDate - now) / 60000;

      if (diffMinutes <= 0) {
        setTimeStatus('passed');
      } else if (diffMinutes <= 30) {
        setTimeStatus('almost');
      } else {
        setTimeStatus('active');
      }
    } else if (todo.completed) {
      setTimeStatus('completed');
    } else {
      setTimeStatus('active');
    }
  }, [todo]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await onDelete(todo._id);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2 relative">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          className="w-4 h-4"
          disabled={todo.completed || timeStatus === 'passed'}
        />
        <span className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.text}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {/* Time & Warning */}
        {todo.time && (
          <span className="text-sm">
            {timeStatus === 'almost' && (
              <span className="text-red-500 font-semibold">⚠️ Time almost up!</span>
            )}
            {timeStatus === 'passed' && (
              <span className="line-through text-gray-400">⏰ Time passed</span>
            )}
            {timeStatus === 'active' && <span>{todo.time}</span>}
          </span>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-black text-xl"
        >
          ⋮
        </button>

        {open && (
          <div className="absolute right-3 top-10 bg-white border rounded shadow-md w-28 z-10">
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className={`block w-full text-left px-3 py-2 text-red-500 ${
                deleteLoading ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-red-50'
              }`}
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
