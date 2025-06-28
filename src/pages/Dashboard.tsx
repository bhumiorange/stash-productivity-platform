import React, { useState } from 'react';
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityModal from '../components/OpportunityModal';
import AddOpportunityModal from '../components/AddOpportunityModal';

export default function Dashboard() {
  const { opportunities, reminders } = useApp();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const totalOpportunities = opportunities.length;
  const activeReminders = reminders.filter(r => !r.isCompleted).length;
  const completedOpportunities = opportunities.filter(o => o.isCompleted).length;

  // Get next upcoming deadline
  const upcomingDeadlines = opportunities
    .filter(o => o.deadline && !o.isCompleted)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime());

  const nextDeadline = upcomingDeadlines[0];

  // Recent opportunities (last 5)
  const recentOpportunities = opportunities
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your opportunities
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Opportunities</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalOpportunities}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Reminders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{activeReminders}</p>
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
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{completedOpportunities}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Deadline Alert */}
      {nextDeadline && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Upcoming Deadline
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {nextDeadline.title}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                Due: {nextDeadline.deadline!.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Opportunities */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Added</h2>
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
            View all
          </button>
        </div>

        {recentOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onClick={() => setSelectedOpportunity(opportunity)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No opportunities yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Add your first opportunity to get started
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Opportunity</span>
            </button>
          </div>
        )}
      </div>

      {/* Opportunity Modal */}
      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          isOpen={true}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}

      {/* Add Opportunity Modal */}
      <AddOpportunityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}