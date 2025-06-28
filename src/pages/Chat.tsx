import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Stash AI assistant. I can help you with information about your opportunities, deadlines, and reminders. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('deadline') || lowerInput.includes('due')) {
      return "You have 2 upcoming deadlines: Google Internship application due February 15th, and Meta Hackathon registration due February 20th. Would you like me to show you more details about any of these?";
    }
    
    if (lowerInput.includes('reminder') || lowerInput.includes('remind')) {
      return "I can help you set up reminders for your opportunities. You currently have 2 active reminders. Would you like me to create a new reminder or show you your existing ones?";
    }
    
    if (lowerInput.includes('opportunity') || lowerInput.includes('opportunities')) {
      return "You have 3 saved opportunities: 1 internship, 1 hackathon, and 1 scholarship. The Google internship has the highest priority. Would you like me to show you details about any specific opportunity?";
    }
    
    if (lowerInput.includes('stats') || lowerInput.includes('analytics')) {
      return "Here are your Stash stats: 3 total opportunities saved, 2 active reminders, 0 completed applications. You're doing great at discovering opportunities - now let's help you act on them!";
    }
    
    return "I'm here to help you manage your opportunities! You can ask me about your deadlines, reminders, opportunity details, or I can help you set up new reminders. What would you like to know?";
  };

  const quickActions = [
    "Show my upcoming deadlines",
    "What opportunities do I have?",
    "Help me set a reminder",
    "Show my analytics"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-t-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Stash AI Assistant</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-purple-500' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' 
                      ? 'text-purple-100' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Quick actions:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setInputValue(action)}
                className="text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm text-gray-700 dark:text-gray-300"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 rounded-b-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your opportunities..."
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}