import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const TodaysSummary = ({ completed, total }) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-white p-4 rounded shadow ">
      <h2 className="font-semibold text-lg mb-2">Today's Todo Summary</h2>
      <p className="text-sm mb-2">Completed: {completed} / {total} Tasks</p>
      <div className="flex items-center space-x-2 text-green-500 ">
        <CheckCircleIcon className="w-5 h-5" />
        <span>{percentage === 100 ? 'All Done!' : 'Almost There!'}</span>
      </div>
    </div>
  );
};

export default TodaysSummary;
    