import React, { useState } from 'react';

const DayTabs = ({ days, onSelect }) => {
  const [selected, setSelected] = useState('Today');

  const handleSelect = (day) => {
    setSelected(day);
    onSelect(day);
  };

  return (
    <div className="flex space-x-2 mb-4">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => handleSelect(day)}
          className={`px-4 py-2 rounded ${selected === day ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DayTabs;
