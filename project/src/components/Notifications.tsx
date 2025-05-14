import React, { useState } from 'react';
import { X, Bell, Download } from 'lucide-react';
import useSound from 'use-sound';
import toast from 'react-hot-toast';

const notifications = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting',
    message: 'Upcoming meeting scheduled for next week',
    time: '1 hour ago',
    type: 'info',
    hasReport: true
  },
  {
    id: 2,
    title: 'Assignment Due',
    message: 'Math homework due tomorrow',
    time: '2 hours ago',
    type: 'warning',
    hasReport: false
  },
  {
    id: 3,
    title: 'Report Card',
    message: 'Term report card is now available',
    time: '1 day ago',
    type: 'success',
    hasReport: true
  }
];

interface NotificationsProps {
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onClose }) => {
  const [showAll, setShowAll] = useState(false);
  const [playNotificationSound] = useSound('/notification.mp3', { volume: 0.5 });

  const handleDownloadReport = (notificationId: number) => {
    playNotificationSound();
    toast.success('Downloading report...');
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/sample-report.pdf';
      link.download = `notification-report-${notificationId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Report downloaded successfully!');
    }, 1500);
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 'success':
        return 'bg-green-50 border-l-4 border-green-400';
      default:
        return 'bg-blue-50 border-l-4 border-blue-400';
    }
  };

  return (
    <div className="absolute top-16 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Bell className="text-purple-600" size={20} />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {displayedNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 hover:bg-opacity-80 transition-colors duration-200 ${getNotificationStyle(notification.type)}`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-gray-800">{notification.title}</h3>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            {notification.hasReport && (
              <button
                onClick={() => handleDownloadReport(notification.id)}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center space-x-1"
              >
                <Download size={14} />
                <span>Download Report</span>
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 text-center border-t">
        <button 
          onClick={() => {
            setShowAll(!showAll);
            playNotificationSound();
          }}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          {showAll ? 'Show Less' : 'View All Notifications'}
        </button>
      </div>
    </div>
  );
};

export default Notifications;