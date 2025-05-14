import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Math', grade: 85 },
  { subject: 'Science', grade: 92 },
  { subject: 'English', grade: 78 },
  { subject: 'History', grade: 88 },
  { subject: 'Art', grade: 95 },
];

const PerformanceCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Academic Performance</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="grade" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">Weekly Progress: <span className="text-green-600">↑ 5%</span></p>
      </div>
    </div>
  );
};

export default PerformanceCard;