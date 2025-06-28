import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityModal from '../components/OpportunityModal';
import AddOpportunityModal from '../components/AddOpportunityModal';

export default function SmartSort() {
  const { opportunities } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All', count: opportunities.length },
    { id: 'job', label: 'Jobs', count: opportunities.filter(o => o.category === 'job').length },
    { id: 'internship', label: 'Internships', count: opportunities.filter(o => o.category === 'internship').length },
    { id: 'hackathon', label: 'Hackathons', count: opportunities.filter(o => o.category === 'hackathon').length },
    { id: 'scholarship', label: 'Scholarships', count: opportunities.filter(o => o.category === 'scholarship').length },
    { id: 'workshop', label: 'Workshops', count: opportunities.filter(o => o.category === 'workshop').length },
    { id: 'other', label: 'Other', count: opportunities.filter(o => o.category === 'other').length },
  ];

  const filteredOpportunities = opportunities
    .filter(opportunity => {
      const matchesCategory = selectedCategory === 'all' || opportunity.category === selectedCategory;
      const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opportunity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SmartSort</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize and filter your opportunities
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>{category.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category.id
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'} found
          </h2>
        </div>

        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onClick={() => setSelectedOpportunity(opportunity)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No opportunities found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Opportunity</span>
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