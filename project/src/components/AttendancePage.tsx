import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

const monthlyData = [
  { month: 'Sep', attendance: 95 },
  { month: 'Oct', attendance: 98 },
  { month: 'Nov', attendance: 92 },
  { month: 'Dec', attendance: 96 },
  { month: 'Jan', attendance: 94 },
];

const attendanceBreakdown = [
  { name: 'Present', value: 87 },
  { name: 'Absent', value: 3 },
  { name: 'Late', value: 5 },
];

const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

const AttendancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('All');
  const months = ['All', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-8 pb-8 ml-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance Overview</h1>
        <p className="text-gray-600">Detailed attendance records and patterns</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-green-600">87</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Absent Days</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-yellow-600">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Attendance Rate</h2>
          <div className="flex space-x-2">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedMonth === month
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Attendance Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {attendanceBreakdown.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                <span className="text-gray-700">{item.name}</span>
                <span className="font-semibold text-gray-900">{item.value} days</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;