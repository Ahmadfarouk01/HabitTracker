import React, { useState } from 'react';
import AppLayout from '../componenets/layouts/AppLayout';
import HabitsProgress from '../componenets/habits/HabitsProgress';
import HabitsList from '../componenets/habits/HabitsList';
import AddHabitForm from '../componenets/forms/AddHabitForm';

const HabitsPage = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Workout', time: '9:00 AM', streak: [true, true, false] },
    { id: 2, name: 'Reading', time: '7:00 AM', streak: [true, false, false] },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Today · Monday</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Habit
        </button>
      </div>

      <HabitsProgress completed={2} total={5} />
      <HabitsList habits={habits} />

      <AddHabitForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </AppLayout>
  );
};

export default HabitsPage;
