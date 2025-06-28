import React, { createContext, useContext, useState } from 'react';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: 'job' | 'internship' | 'hackathon' | 'scholarship' | 'workshop' | 'other';
  deadline?: Date;
  url?: string;
  tags: string[];
  addedAt: Date;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  isCompleted: boolean;
  opportunityId?: string;
  isManual: boolean;
}

interface AppContextType {
  opportunities: Opportunity[];
  reminders: Reminder[];
  addOpportunity: (opportunity: Omit<Opportunity, 'id' | 'addedAt'>) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: '1',
      title: 'Software Engineer Internship at Google',
      description: 'Join our team of engineers working on cutting-edge technology. This internship offers hands-on experience with large-scale systems.',
      category: 'internship',
      deadline: new Date('2024-02-15'),
      url: 'https://careers.google.com',
      tags: ['tech', 'software', 'internship'],
      addedAt: new Date('2024-01-10'),
      isCompleted: false,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Meta Hackathon 2024',
      description: 'Build the future of social technology. 48-hour hackathon with $50K in prizes.',
      category: 'hackathon',
      deadline: new Date('2024-02-20'),
      url: 'https://metameta.com/hackathon',
      tags: ['hackathon', 'tech', 'social'],
      addedAt: new Date('2024-01-12'),
      isCompleted: false,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Merit Scholarship Program',
      description: 'Full tuition scholarship for outstanding students. Covers tuition, books, and living expenses.',
      category: 'scholarship',
      deadline: new Date('2024-03-01'),
      tags: ['scholarship', 'education'],
      addedAt: new Date('2024-01-08'),
      isCompleted: false,
      priority: 'high'
    }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Google Internship Application Due',
      description: 'Submit application for Software Engineer Internship',
      deadline: new Date('2024-02-15'),
      isCompleted: false,
      opportunityId: '1',
      isManual: false
    },
    {
      id: '2',
      title: 'Meta Hackathon Registration',
      description: 'Register for Meta Hackathon 2024',
      deadline: new Date('2024-02-20'),
      isCompleted: false,
      opportunityId: '2',
      isManual: false
    }
  ]);

  const addOpportunity = (opportunity: Omit<Opportunity, 'id' | 'addedAt'>) => {
    const newOpportunity: Opportunity = {
      ...opportunity,
      id: Date.now().toString(),
      addedAt: new Date()
    };
    setOpportunities(prev => [newOpportunity, ...prev]);

    // Auto-create reminder if deadline exists
    if (opportunity.deadline) {
      const reminder: Reminder = {
        id: Date.now().toString() + '_reminder',
        title: `${opportunity.title} - Deadline`,
        description: `Don't forget about: ${opportunity.title}`,
        deadline: opportunity.deadline,
        isCompleted: false,
        opportunityId: newOpportunity.id,
        isManual: false
      };
      setReminders(prev => [reminder, ...prev]);
    }
  };

  const updateOpportunity = (id: string, updates: Partial<Opportunity>) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === id ? { ...opp, ...updates } : opp
    ));
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(opp => opp.id !== id));
    setReminders(prev => prev.filter(reminder => reminder.opportunityId !== id));
  };

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString()
    };
    setReminders(prev => [newReminder, ...prev]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, ...updates } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  return (
    <AppContext.Provider value={{
      opportunities,
      reminders,
      addOpportunity,
      updateOpportunity,
      deleteOpportunity,
      addReminder,
      updateReminder,
      deleteReminder
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}