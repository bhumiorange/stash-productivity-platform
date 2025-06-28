import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 lg:fixed lg:h-full">
          <Navigation />
        </div>
        
        {/* Main Content */}
        <div className="lg:ml-64 flex-1 min-h-screen pb-20 lg:pb-0">
          <main className="p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <Navigation />
        </div>
      </div>
    </div>
  );
}