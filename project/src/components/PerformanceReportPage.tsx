import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, Award } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', Math: 85, Science: 92, English: 78, History: 88, Art: 95 },
  { month: 'Feb', Math: 88, Science: 89, English: 82, History: 85, Art: 92 },
  { month: 'Mar', Math: 92, Science: 94, English: 85, History: 90, Art: 88 },
  { month: 'Apr', Math: 86, Science: 91, English: 88, History: 87, Art: 94 },
  { month: 'May', Math: 90, Science: 88, English: 84, History: 92, Art: 90 },
];

const progressData = [
  { week: 'Week 1', progress: 75 },
  { week: 'Week 2', progress: 82 },
  { week: 'Week 3', progress: 88 },
  { week: 'Week 4', progress: 85 },
  { week: 'Week 5', progress: 92 },
];

const PerformanceReportPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const subjects = ['All', 'Math', 'Science', 'English', 'History', 'Art'];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-8 pb-8 ml-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Academic Performance Report</h1>
        <p className="text-gray-600">Comprehensive view of academic progress and achievements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overall Average</p>
              <p className="text-2xl font-bold text-gray-800">88.5%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Best Subject</p>
              <p className="text-2xl font-bold text-gray-800">Science</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Assessment</p>
              <p className="text-2xl font-bold text-gray-800">May 15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Subject Performance</h2>
          <div className="flex space-x-2">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedSubject === subject
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              {selectedSubject === 'All' ? (
                Object.keys(monthlyData[0])
                  .filter(key => key !== 'month')
                  .map((subject, index) => (
                    <Bar
                      key={subject}
                      dataKey={subject}
                      fill={`hsl(${index * 50}, 70%, 60%)`}
                      radius={[4, 4, 0, 0]}
                    />
                  ))
              ) : (
                <Bar dataKey={selectedSubject} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Over Time */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReportPage;