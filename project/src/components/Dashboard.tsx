import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import PerformanceCard from './PerformanceCard';
import AttendanceCard from './AttendanceCard';
import MoodTrackerCard from './MoodTrackerCard';
import MessagesCard from './MessagesCard';
import QuickActions from './QuickActions';
import Notifications from './Notifications';

interface DashboardProps {
  childName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ childName }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white h-16 fixed top-0 right-0 left-64 px-8 flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Hello, Parent!</h1>
          <p className="text-sm text-gray-600">Viewing {childName}'s Progress</p>
        </div>
        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} className="text-gray-600" />
          </button>
          {showNotifications && (
            <Notifications onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-8 pb-8 ml-64">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceCard />
          <AttendanceCard />
          <MoodTrackerCard />
          <MessagesCard />
        </div>
        <div className="mt-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;