import React, { useState } from 'react';
import { Moon, Sun, Bell, MessageSquare, HelpCircle, Info, LogOut, Settings, User, Mail, Edit } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Computer Science student passionate about technology and innovation.'
  });

  const menuItems = [
    {
      icon: Settings,
      label: 'Account Settings',
      action: () => setShowEditProfile(true),
      type: 'button'
    },
    {
      icon: Bell,
      label: 'Push Notifications',
      action: () => setNotificationsEnabled(!notificationsEnabled),
      type: 'toggle',
      enabled: notificationsEnabled
    },
    {
      icon: Mail,
      label: 'Email Notifications',
      action: () => setEmailNotifications(!emailNotifications),
      type: 'toggle',
      enabled: emailNotifications
    },
    {
      icon: theme === 'dark' ? Sun : Moon,
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      action: toggleTheme,
      type: 'button'
    },
    {
      icon: MessageSquare,
      label: 'Send Feedback',
      action: () => alert('Feedback form would open here'),
      type: 'button'
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      action: () => alert('Help center would open here'),
      type: 'button'
    },
    {
      icon: Info,
      label: 'About Stash',
      action: () => alert('About page would open here'),
      type: 'button'
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      action: () => alert('Sign out functionality would be here'),
      type: 'button',
      danger: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{userProfile.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{userProfile.bio}</p>
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className="p-2 text-gray-500 hover:text-purple-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 ${
                item.type === 'button' ? 'cursor-pointer hover:shadow-md' : ''
              } transition-all duration-200`}
              onClick={item.type === 'button' ? item.action : undefined}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.danger 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      item.danger 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <span className={`font-medium ${
                    item.danger 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {item.label}
                  </span>
                </div>

                {item.type === 'toggle' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      item.action();
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.enabled 
                        ? 'bg-purple-500' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* App Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Stash</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Version 1.0.0</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Never miss an opportunity again
          </p>
        </div>
      </div>
    </div>
  );
}