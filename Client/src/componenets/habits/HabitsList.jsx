import React from 'react';
import HabitCard from './HabitsCard';

const HabitsList = ({ habits, onHabitUpdated, onDelete, token }) => {
  if (!habits || !Array.isArray(habits)) return null;

  return (
    <div>
      {habits.map(habit => (
        <HabitCard
          key={habit._id}
          habit={habit}
          token={token}
          onHabitUpdated={onHabitUpdated}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HabitsList;
