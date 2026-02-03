import React, { useState, useEffect } from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const [open, setOpen] = useState(false);
  const [timeStatus, setTimeStatus] = useState('active'); // 'active', 'almost', 'passed'

  useEffect(() => {
    if (!todo.completed && todo.time) {
      const now = new Date();
      // Assuming todo.time is "HH:mm"
      const [hours, minutes] = todo.time.split(':').map(Number);
      const todoDate = new Date();
      todoDate.setHours(hours, minutes, 0, 0);

      const diffMinutes = (todoDate - now) / 60000; // difference in minutes

      if (diffMinutes <= 0) {
        setTimeStatus('passed'); // past due
      } else if (diffMinutes <= 30) {
        setTimeStatus('almost'); // less than 30 min left
      } else {
        setTimeStatus('active');
      }
    } else if (todo.completed) {
      setTimeStatus('completed');
    } else {
      setTimeStatus('active');
    }
  }, [todo]);

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
              onClick={() => onDelete(todo._id)}
              className="block w-full text-left px-3 py-2 hover:bg-red-50 text-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
