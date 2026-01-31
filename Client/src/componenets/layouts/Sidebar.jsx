import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  // Helper to highlight active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">Habits</h1>
        <nav className="space-y-3">
          <Link 
            to="/dashboard" 
            className={`flex items-center space-x-2 p-2 rounded font-medium ${
              isActive('/') ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <HomeIcon className="w-5 h-5" /> <span>Dashboard</span>
          </Link>

          <Link 
            to="/habits" 
            className={`flex items-center space-x-2 p-2 rounded font-medium ${
              isActive('/habits') ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <ClipboardDocumentListIcon className="w-5 h-5" /> <span>Habits</span>
          </Link>

          <Link 
            to="/todo" 
            className={`flex items-center space-x-2 p-2 rounded font-medium ${
              isActive('/todo') ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <ClipboardDocumentListIcon className="w-5 h-5" /> <span>To-Do</span>
          </Link>

          <Link 
            to="/analytics" 
            className={`flex items-center space-x-2 p-2 rounded font-medium ${
              isActive('/analytics') ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <ChartBarIcon className="w-5 h-5" /> <span>Analytics</span>
          </Link>

          <Link 
            to="/settings" 
            className={`flex items-center space-x-2 p-2 rounded font-medium ${
              isActive('/settings') ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" /> <span>Settings</span>
          </Link>
        </nav>
      </div>

      <div className="text-sm text-gray-500">
        Police<br />
        police@example.com
      </div>
    </div>
  );
};

export default Sidebar;
