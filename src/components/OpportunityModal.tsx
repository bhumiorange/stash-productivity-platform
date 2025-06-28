import React from 'react';
import { X, Calendar, ExternalLink, Tag, Clock, Star, Edit, Trash2 } from 'lucide-react';
import { Opportunity } from '../contexts/AppContext';

interface OpportunityModalProps {
  opportunity: Opportunity;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function OpportunityModal({ 
  opportunity, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete 
}: OpportunityModalProps) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(opportunity.category)}`}>
              {opportunity.category}
            </span>
            <Star className={`w-5 h-5 ${getPriorityColor(opportunity.priority)}`} fill="currentColor" />
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-gray-500 hover:text-purple-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {opportunity.title}
          </h2>

          <div className="space-y-4">
            {opportunity.deadline && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Deadline</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {opportunity.deadline.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className={`text-sm font-medium ${
                    formatDeadline(opportunity.deadline).includes('Overdue') ? 'text-red-500' : 
                    formatDeadline(opportunity.deadline).includes('today') ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {formatDeadline(opportunity.deadline)}
                  </span>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {opportunity.description}
              </p>
            </div>

            {opportunity.url && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Link</h3>
                <a
                  href={opportunity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit opportunity</span>
                </a>
              </div>
            )}

            {opportunity.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Added on {opportunity.addedAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}