import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

const moodData = [
  { date: 'Mon', mood: 'happy', icon: Smile, color: 'text-green-500' },
  { date: 'Tue', mood: 'neutral', icon: Meh, color: 'text-yellow-500' },
  { date: 'Wed', mood: 'happy', icon: Smile, color: 'text-green-500' },
  { date: 'Thu', mood: 'sad', icon: Frown, color: 'text-red-500' },
  { date: 'Fri', mood: 'happy', icon: Smile, color: 'text-green-500' },
];

const MoodTrackerCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Emotional Well-being</h2>
      <div className="space-y-4">
        {moodData.map((day, index) => {
          const Icon = day.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-600">{day.date}</span>
              <div className="flex items-center space-x-2">
                <Icon className={`${day.color}`} size={24} />
                <span className="capitalize text-gray-600">{day.mood}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodTrackerCard;