import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Sep', attendance: 95 },
  { month: 'Oct', attendance: 98 },
  { month: 'Nov', attendance: 92 },
  { month: 'Dec', attendance: 96 },
  { month: 'Jan', attendance: 94 },
];

const AttendanceCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance Overview</h2>
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-sm text-green-600">Present Days</p>
          <p className="text-2xl font-bold text-green-700">87</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-sm text-red-600">Absent Days</p>
          <p className="text-2xl font-bold text-red-700">3</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[85, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#8b5cf6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceCard;