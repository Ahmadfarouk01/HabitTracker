import React, { useState } from 'react';
import Modal from '../../componenets/modals/Modal';

const AddTaskForm = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return setError('Task description required');

    onAdd({ text, time });
    setText('');
    setTime('');
    onClose();
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Add New Task</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 flex flex-col">
        <input
          type="text"
          placeholder="Task description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-8 py-2 rounded hover:bg-green-600 cursor-pointer ml-auto"
        >
          Add Task
        </button>
      </form>
    </Modal>
  );
};

export default AddTaskForm;
