import React from 'react';
import { MessageSquare, Calendar, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleMessageTeacher = () => {
    navigate('/messages');
    toast.success('Redirecting to messages');
  };

  const handleRequestMeeting = () => {
    toast.success('Meeting request sent successfully');
  };

  const handleDownloadReport = () => {
    toast.success('Downloading report...');
    // Simulate download delay
    setTimeout(() => {
      toast.success('Report downloaded successfully');
    }, 2000);
  };

  const actions = [
    {
      icon: MessageSquare,
      label: 'Message Teacher',
      description: 'Send a message to your child\'s teacher',
      color: 'bg-blue-500',
      onClick: handleMessageTeacher
    },
    {
      icon: Calendar,
      label: 'Request Meeting',
      description: 'Schedule a parent-teacher meeting',
      color: 'bg-purple-500',
      onClick: handleRequestMeeting
    },
    {
      icon: Download,
      label: 'Download Report',
      description: 'Get the latest progress report',
      color: 'bg-green-500',
      onClick: handleDownloadReport
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              <div className={`${action.color} p-3 rounded-lg text-white`}>
                <Icon size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800">{action.label}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;