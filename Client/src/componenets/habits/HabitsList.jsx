import React from 'react';
import HabitCard from '../habits/HabitsCard';

const HabitsList = ({ habits }) => {
  return (
    <div>
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitsList;
