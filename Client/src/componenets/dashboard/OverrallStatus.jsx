import React from 'react';

const OverrallStatus = ({ completedPercent }) => {
  const circleStyle = {
    strokeDasharray: '251', // circumference 2πr, r=40
    strokeDashoffset: `${251 - (251 * completedPercent) / 100}`,
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col items-center">
      <h2 className="font-semibold text-lg mb-4">Overall Stats</h2>
      <svg className="w-24 h-24">
        <circle cx="50%" cy="50%" r="40" className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="none" />
        <circle
          cx="50%"
          cy="50%"
          r="40"
          strokeWidth="8"
          stroke="green"
          fill="none"
          strokeDasharray="251"
          strokeDashoffset={251 - (251 * completedPercent) / 100}
          strokeLinecap="round"
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-lg font-bold fill-current text-green-500">
          {completedPercent}%
        </text>
      </svg>
    </div>
  );
};

export default OverrallStatus;
