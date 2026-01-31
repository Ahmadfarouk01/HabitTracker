import React from 'react';
import HabitProgress from '../componenets/dashboard/DashboardHabitProgress';
import TodaysSummary from '../componenets/dashboard/TodaysSummary';
import OverallStats from '../componenets/dashboard/OverrallStatus';
import MonthlyOverview from '../componenets/dashboard/MonthlyOverview';
import AppLayout from '../componenets/layouts/AppLayout';

const Dashboard = () => {
  // Sample data
  const habitProgress = 75; // overall completion %
  const streak = 5; // days
  const todayCompleted = 4;
  const todayTotal = 5;
  const completedPercent = 76;
  const completionDays = [
    '2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04',
    '2026-01-05', '2026-01-07', '2026-01-08', '2026-01-10'
  ];

  return (
    <AppLayout>
    <div className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <HabitProgress progress={habitProgress} streak={streak} />
        <TodaysSummary completed={todayCompleted} total={todayTotal} />
        <OverallStats completedPercent={completedPercent} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyOverview completionDays={completionDays} />
      </div>
    </div>
    </AppLayout>
  );
};

export default Dashboard;
