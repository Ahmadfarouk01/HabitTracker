import React from 'react';

const HabitCard = ({ habit }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center mb-4">
      <div>
        <h3 className="font-medium">{habit.name}</h3>
        <p className="text-sm text-gray-500">{habit.time}</p>
        <div className="flex mt-2 space-x-1">
          {habit.streak.map((done, idx) => (
            <div key={idx} className={`w-4 h-4 rounded-full ${done ? 'bg-green-500' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
      <button className="bg-green-500 text-white px-3 py-1 rounded">Mark Done</button>
    </div>
  );
};

export default HabitCard;
