import React, { useState } from 'react';
import { X, Calendar, Link, Tag, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface AddOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddOpportunityModal({ isOpen, onClose }: AddOpportunityModalProps) {
  const { addOpportunity } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'job' as 'job' | 'internship' | 'hackathon' | 'scholarship' | 'workshop' | 'other',
    deadline: '',
    url: '',
    tags: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newOpportunity = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
      url: formData.url.trim() || undefined,
      tags: tagsArray,
      priority: formData.priority,
      isCompleted: false
    };

    addOpportunity(newOpportunity);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'job',
      deadline: '',
      url: '',
      tags: '',
      priority: 'medium'
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const categories = [
    { value: 'job', label: 'Job', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
    { value: 'internship', label: 'Internship', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    { value: 'hackathon', label: 'Hackathon', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
    { value: 'scholarship', label: 'Scholarship', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
    { value: 'workshop', label: 'Workshop', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400' },
    { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-green-500' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-500' },
    { value: 'high', label: 'High Priority', color: 'text-red-500' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Opportunity</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-colors ${
                errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
              }`}
              placeholder="Enter opportunity title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-colors resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
              }`}
              placeholder="Describe the opportunity in detail"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Category and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Deadline (optional)
            </label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Link className="w-4 h-4 inline mr-2" />
              URL (optional)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-colors ${
                errors.url ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
              }`}
              placeholder="https://example.com/opportunity"
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Tags (optional)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500"
              placeholder="Enter tags separated by commas (e.g., tech, remote, full-time)"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Preview */}
          {formData.title && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    categories.find(c => c.value === formData.category)?.color
                  }`}>
                    {categories.find(c => c.value === formData.category)?.label}
                  </span>
                  <Star className={`w-4 h-4 ${
                    priorities.find(p => p.value === formData.priority)?.color
                  }`} fill="currentColor" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{formData.title}</h4>
                {formData.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {formData.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg"
            >
              Add Opportunity
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}