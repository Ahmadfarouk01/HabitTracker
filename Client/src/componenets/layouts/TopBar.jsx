import React from 'react';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <input
        type="text"
        placeholder="Search"
        className="border rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-gray-100 px-4 py-2 rounded">Hubit</button>
    </div>
  );
};

export default Topbar;
    