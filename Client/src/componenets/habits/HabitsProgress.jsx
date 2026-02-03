import React from 'react';

const HabitsProgress = ({ completed, total }) => {
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="mb-4">
      <p className="text-gray-700 mb-1">{`${completed} / ${total} habits completed`}</p>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-green-500 h-2 rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default HabitsProgress;
