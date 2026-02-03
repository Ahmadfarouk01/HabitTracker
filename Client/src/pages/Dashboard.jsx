import React, { useState, useEffect, useContext } from 'react';
import HabitProgress from '../componenets/dashboard/DashboardHabitProgress';
import TodaysSummary from '../componenets/dashboard/TodaysSummary';
import OverallStats from '../componenets/dashboard/OverrallStatus';
import MonthlyOverview from '../componenets/dashboard/MonthlyOverview';
import AppLayout from '../componenets/layouts/AppLayout';
import { AuthContext } from '../context/AuthContext';
import API, { setAuthToken } from '../axios/axios';
import { format } from 'date-fns';

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [habitProgress, setHabitProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [todaySummary, setTodaySummary] = useState({ completed: 0, total: 0 });
  const [monthlyCompletion, setMonthlyCompletion] = useState([]);

  useEffect(() => {
    if (!token) return;

    // Set the token for all requests
    setAuthToken(token);

    const loadDashboard = async () => {
      try {
        // 1️⃣ Habits Progress
        const habitRes = await API.get('/habits/habit-progress');
        setHabitProgress(habitRes.data.progress);
        setStreak(habitRes.data.streak);

        // 2️⃣ Today's Summary (Todos Only)
        const todoRes = await API.get('/todos/today-summary');
        setTodaySummary(todoRes.data);

        // 3️⃣ Monthly Overview (Habits Only)
        const monthStr = format(new Date(), 'yyyy-MM');
        const monthRes = await API.get(`/habits/monthly-overview?month=${monthStr}`);
        setMonthlyCompletion(monthRes.data.completionDays);
      } catch (err) {
        console.error('Failed to load dashboard:', err.response?.data?.message || err.message);
      }
    };

    loadDashboard();
  }, [token]);

  return (
    <AppLayout>
      <div className="bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <HabitProgress progress={habitProgress} streak={streak} />
          <TodaysSummary completed={todaySummary.completed} total={todaySummary.total} />
          {/* <OverallStats completedPercent={0} /> Leave for later */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonthlyOverview completionDays={monthlyCompletion} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
