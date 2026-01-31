import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const MonthlyOverview = ({ completionDays = [] }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDayStatus = (day) => {
    // completionDays is an array of dates like '2026-01-31'
    const dateStr = format(day, 'yyyy-MM-dd');
    return completionDays.includes(dateStr) ? 'bg-green-500' : 'bg-gray-200';
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">Monthly Overview</h2>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day.toString()} className={`w-8 h-8 flex items-center justify-center text-sm rounded ${getDayStatus(day)}`}>
            <span className="text-white">{day.getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyOverview;
