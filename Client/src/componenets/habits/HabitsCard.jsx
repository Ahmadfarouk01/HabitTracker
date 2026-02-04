import React, { useState, useEffect } from 'react';
import API from '../../axios/axios';

const HabitCard = ({ habit, onHabitUpdated, onDelete, token }) => {
  const [open, setOpen] = useState(false);
  const [timeStatus, setTimeStatus] = useState('active'); // active, almost, time-passed
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Check completed today
  const completedToday = habit.completedDates?.some(date => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  });

  // Function to compute status
  const computeStatus = () => {
    if (!habit.time || completedToday) return 'active';

    const now = new Date();
    const [hours, minutes] = habit.time.split(':').map(Number);
    const habitTime = new Date();
    habitTime.setHours(hours, minutes, 0, 0);

    const diffMinutes = (habitTime - now) / 60000;

    if (diffMinutes <= 0) return 'time-passed';
    if (diffMinutes <= 30) return 'almost';
    return 'active';
  };

  // Live update every minute
  useEffect(() => {
    setTimeStatus(computeStatus()); // initial
    const interval = setInterval(() => {
      setTimeStatus(computeStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, [habit, completedToday]);

  const handleMarkDone = async () => {
    try {
      const res = await API.patch(
        `/habits/${habit._id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onHabitUpdated(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await API.delete(`/habits/${habit._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(habit._id);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center mb-4 relative">
      <div>
        <h3 className="font-medium text-lg">{habit.title}</h3>
        <p className="text-gray-500">
          {!completedToday && timeStatus === 'almost' && (
            <span className="text-red-500 font-semibold">⚠️ Time almost up!</span>
          )}
          {!completedToday && timeStatus === 'time-passed' && (
            <span className="line-through text-gray-400">⏰ Time passed</span>
          )}
          {timeStatus === 'active' && habit.time}
          {completedToday && <span className="text-green-500 font-semibold">✔️ Done Today</span>}
        </p>

        <div className="flex mt-2 space-x-1">
          {habit.streak?.map((done, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full ${done ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleMarkDone}
          disabled={completedToday || timeStatus === 'time-passed'}
          className={`px-3 py-1 rounded text-white ${
            completedToday || timeStatus === 'time-passed'
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {completedToday ? 'Done Today' : 'Mark Done'}
        </button>

        {/* Dropdown for Delete */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-500 hover:text-black text-xl ml-2"
          >
            ⋮
          </button>

          {open && (
            <div className="absolute right-0 top-10 bg-white border rounded shadow-md w-28 z-10">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className={`block w-full text-left px-3 py-2 text-red-500 ${
                  deleteLoading ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-red-50'
                }`}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
