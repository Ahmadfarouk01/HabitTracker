import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0  bg-opacity-100"
          onClick={() => setIsSidebarOpen(false)}
        />
        {/* Sidebar panel with slide animation */}
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-white shadow-md p-4 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="p-6 bg-gray-50 flex-1 overflow-auto">
          {/* Mobile Hamburger */}
          <div className="md:hidden mb-4">
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
