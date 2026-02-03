import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import LogoutButton from '../../buttons/LogoutButton';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <div>
        {/* Mobile Close Button */}
        {closeSidebar && (
          <button
            className="md:hidden mb-4 text-gray-600"
            onClick={closeSidebar}
          >
            Close
          </button>
        )}

        <h1 className="text-2xl font-bold mb-6">Routino</h1>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 p-2 rounded font-medium ${
              isActive('/dashboard') ? 'bg-blue-100' : 'hover:bg-gray-100'
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

          
        </nav>
      </div>

      <div className="text-gray-500 flex flex-col gap-1">
        <span className="text-2xl text-center">Welcome</span>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
