import React, { useState } from 'react';
import { Smile, Meh, Frown, TrendingUp, Heart, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyMoodData = [
  { day: 'Mon', mood: 'happy', score: 5 },
  { day: 'Tue', mood: 'neutral', score: 3 },
  { day: 'Wed', mood: 'happy', score: 5 },
  { day: 'Thu', mood: 'sad', score: 1 },
  { day: 'Fri', mood: 'happy', score: 5 },
];

const monthlyTrendData = [
  { week: 'Week 1', average: 4.2 },
  { week: 'Week 2', average: 3.8 },
  { week: 'Week 3', average: 4.5 },
  { week: 'Week 4', average: 4.0 },
];

const EmotionalReportPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const periods = ['This Week', 'Last Week', 'This Month', 'Last Month'];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
        return <Smile className="text-green-500" size={24} />;
      case 'neutral':
        return <Meh className="text-yellow-500" size={24} />;
      case 'sad':
        return <Frown className="text-red-500" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-8 pb-8 ml-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Emotional Well-being Report</h1>
        <p className="text-gray-600">Track and understand emotional patterns and well-being</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Heart className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-gray-800">4.2/5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mood Trend</p>
              <p className="text-2xl font-bold text-green-600">↑ Positive</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Happy Days</p>
              <p className="text-2xl font-bold text-gray-800">15/20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Mood Tracker */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Daily Mood Tracker</h2>
          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedPeriod === period
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {weeklyMoodData.map((day, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">{day.day}</p>
              {getMoodIcon(day.mood)}
              <p className="text-sm font-medium mt-2">{day.mood.charAt(0).toUpperCase() + day.mood.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Monthly Mood Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmotionalReportPage;