import React, { useState, useEffect, useContext } from 'react';
import AppLayout from '../componenets/layouts/AppLayout';
import HabitsProgress from '../componenets/habits/HabitsProgress';
import HabitsList from '../componenets/habits/HabitsList';
import AddHabitForm from '../componenets/forms/AddHabitForm';
import API, { setAuthToken } from '../axios/axios';
import { AuthContext } from '../context/AuthContext';

const HabitsPage = () => {
  const { token } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch habits
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchHabits();
    }
  }, [token]);

  const fetchHabits = async () => {
    try {
      const res = await API.get('/habits', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Add new habit
  const handleAddHabit = habit => setHabits(prev => [...prev, habit]);

  // Delete habit
  const handleDeleteHabit = id => setHabits(prev => prev.filter(h => h._id !== id));

  // Update habit (for Mark Done)
  const handleHabitUpdated = updatedHabit =>
    setHabits(prev => prev.map(h => (h._id === updatedHabit._id ? updatedHabit : h)));

  // Calculate completed today for progress bar
  const completedTodayCount = habits.filter(habit =>
    habit.completedDates?.some(d => new Date(d).toDateString() === new Date().toDateString())
  ).length;

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Today</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Habit
        </button>
      </div>

      <HabitsProgress completed={completedTodayCount} total={habits.length} />

      <h1 className="font-bold text-2xl p-3">Habits</h1>
      <HabitsList
        habits={habits}
        token={token}
        onHabitUpdated={handleHabitUpdated}
        onDelete={handleDeleteHabit}
      />

      <AddHabitForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </AppLayout>
  );
};

export default HabitsPage;
