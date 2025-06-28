import React from 'react';
import { Calendar, ExternalLink, Tag, Clock, Star } from 'lucide-react';
import { Opportunity } from '../contexts/AppContext';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
}

export default function OpportunityCard({ opportunity, onClick }: OpportunityCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'job': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'internship': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'hackathon': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'scholarship': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'workshop': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

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
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(opportunity.category)}`}>
            {opportunity.category}
          </span>
          <Star className={`w-4 h-4 ${getPriorityColor(opportunity.priority)}`} fill="currentColor" />
        </div>
        {opportunity.url && (
          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-purple-500 transition-colors" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {opportunity.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
        {opportunity.description}
      </p>

      {opportunity.deadline && (
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {opportunity.deadline.toLocaleDateString()}
          </span>
          <Clock className="w-4 h-4 text-orange-500 ml-2" />
          <span className={`text-sm font-medium ${
            formatDeadline(opportunity.deadline).includes('Overdue') ? 'text-red-500' : 
            formatDeadline(opportunity.deadline).includes('today') ? 'text-orange-500' : 'text-green-500'
          }`}>
            {formatDeadline(opportunity.deadline)}
          </span>
        </div>
      )}

      {opportunity.tags.length > 0 && (
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {opportunity.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {opportunity.tags.length > 3 && (
              <span className="text-xs text-gray-400">+{opportunity.tags.length - 3}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}