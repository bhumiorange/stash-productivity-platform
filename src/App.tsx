import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SmartSort from './pages/SmartSort';
import Chat from './pages/Chat';
import Reminders from './pages/Reminders';
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="smart-sort" element={<SmartSort />} />
                <Route path="chat" element={<Chat />} />
                <Route path="reminders" element={<Reminders />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;