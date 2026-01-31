import React from 'react';

const DashbaordHabitProgress = ({ progress, streak }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-4">Habit Progress</h2>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-green-500 rounded-full flex items-center justify-center">
            <span className="font-bold">{progress}%</span>
          </div>
          <span className="mt-2 text-sm">Overall</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">Streak: {streak} Days</p>
    </div>
  );
};

export default DashbaordHabitProgress;
