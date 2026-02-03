import React, { useState, useContext } from 'react';
import Modal from '../modals/Modal';
import API, { setAuthToken } from '../../axios/axios';
import { AuthContext } from '../../context/AuthContext';

const AddHabitForm = ({ isOpen, onClose, onAdd }) => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError('You must be logged in');

    try {
      setAuthToken(token);

      const res = await API.post('/habits', {
        title: name, // backend expects "title"
        time,
        streak: []
      });

      // Add habit to HabitsPage
      onAdd(res.data);

      setName('');
      setTime('');
      onClose();
      setError('');
    } catch (err) {
      console.error('Failed to add habit:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Error adding habit');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Add New Habit</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 flex flex-col">
        <input
          type="text"
          placeholder="Habit title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-8 py-2 rounded hover:bg-green-600 cursor-pointer ml-auto"
        >
          Add Habit
        </button>
      </form>
    </Modal>
  );
};

export default AddHabitForm;
