import React, { useState } from 'react';
import { Calendar, Clock, Plus, Check, X, Edit } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Reminders() {
  const { reminders, updateReminder, addReminder, deleteReminder } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  const handleToggleComplete = (id: string, isCompleted: boolean) => {
    updateReminder(id, { isCompleted: !isCompleted });
  };

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.deadline) return;

    addReminder({
      title: newReminder.title,
      description: newReminder.description,
      deadline: new Date(newReminder.deadline),
      isCompleted: false,
      isManual: true
    });

    setNewReminder({ title: '', description: '', deadline: '' });
    setShowAddForm(false);
  };

  const sortedReminders = reminders
    .sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

  const upcomingReminders = reminders.filter(r => !r.isCompleted);
  const completedReminders = reminders.filter(r => r.isCompleted);

  const formatDeadline = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `${days} days left`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reminders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay on top of your deadlines and important dates
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Upcoming Reminders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{upcomingReminders.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{completedReminders.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Reminder</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="Enter reminder title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="Enter reminder description"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Deadline
              </label>
              <input
                type="datetime-local"
                value={newReminder.deadline}
                onChange={(e) => setNewReminder(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleAddReminder}
                className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Add Reminder
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewReminder({ title: '', description: '', deadline: '' });
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-6">
        {sortedReminders.length > 0 ? (
          sortedReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border transition-all duration-200 ${
                reminder.isCompleted
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                  : 'border-gray-100 dark:border-gray-700 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => handleToggleComplete(reminder.id, reminder.isCompleted)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    reminder.isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-purple-500'
                  }`}
                >
                  {reminder.isCompleted && <Check className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        reminder.isCompleted
                          ? 'text-gray-500 dark:text-gray-400 line-through'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {reminder.title}
                      </h3>
                      {reminder.description && (
                        <p className={`text-sm mt-1 ${
                          reminder.isCompleted
                            ? 'text-gray-400 dark:text-gray-500'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {reminder.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {reminder.isManual && (
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${
                        reminder.isCompleted
                          ? 'text-gray-400 dark:text-gray-500'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {reminder.deadline.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {!reminder.isCompleted && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className={`text-sm font-medium ${
                          formatDeadline(reminder.deadline).includes('Overdue') ? 'text-red-500' :
                          formatDeadline(reminder.deadline).includes('today') ? 'text-orange-500' : 'text-green-500'
                        }`}>
                          {formatDeadline(reminder.deadline)}
                        </span>
                      </div>
                    )}

                    <span className={`text-xs px-2 py-1 rounded-full ${
                      reminder.isManual
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {reminder.isManual ? 'Manual' : 'Auto-generated'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No reminders yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Add your first reminder to stay organized
            </p>
          </div>
        )}
      </div>
    </div>
  );
}