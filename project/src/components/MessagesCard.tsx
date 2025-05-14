import React, { useState } from 'react';
import { Send, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useSound from 'use-sound';

const messages = [
  {
    id: 1,
    sender: 'Ms. Thompson',
    subject: 'Math homework update',
    preview: 'Great progress on the recent algebra assignment...',
    time: '2h ago',
    fullMessage: 'Great progress on the recent algebra assignment. Your child has shown significant improvement in problem-solving skills.'
  },
  {
    id: 2,
    sender: 'Mr. Roberts',
    subject: 'Science project reminder',
    preview: 'Please note the upcoming science fair project deadline...',
    time: '5h ago',
    fullMessage: 'Please note the upcoming science fair project deadline. Materials need to be submitted by next Friday.'
  },
  {
    id: 3,
    sender: 'School Admin',
    subject: 'Parent-Teacher Meeting',
    preview: 'The quarterly parent-teacher meeting is scheduled...',
    time: '1d ago',
    fullMessage: 'The quarterly parent-teacher meeting is scheduled for next week. Please choose your preferred time slot.'
  }
];

const MessagesCard = () => {
  const navigate = useNavigate();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showAllMessages, setShowAllMessages] = useState(false);
  
  // Message notification sound
  const [playMessageSound] = useSound('/message.mp3', { volume: 0.5 });

  const handleReply = (messageId: number) => {
    if (replyText.trim()) {
      playMessageSound();
      toast.success('Reply sent successfully!');
      setReplyText('');
      setSelectedMessage(null);
    } else {
      toast.error('Please enter a message');
    }
  };

  const handleViewAll = () => {
    setShowAllMessages(true);
    navigate('/messages');
  };

  const handleDownloadReport = (messageId: number) => {
    // Simulate report download
    toast.success('Downloading report...');
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/sample-report.pdf';
      link.download = `report-${messageId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Report downloaded successfully!');
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Messages</h2>
        <button 
          onClick={handleViewAll}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
        >
          View All
        </button>
      </div>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-800">{message.sender}</span>
              <span className="text-sm text-gray-500">{message.time}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">{message.subject}</h3>
            <p className="text-sm text-gray-600">
              {selectedMessage === message.id ? message.fullMessage : message.preview}
            </p>
            
            {selectedMessage === message.id ? (
              <div className="mt-3 space-y-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  rows={3}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReply(message.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 flex items-center space-x-1"
                  >
                    <Send size={14} />
                    <span>Send Reply</span>
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedMessage(message.id);
                    playMessageSound();
                  }}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center space-x-1"
                >
                  <Send size={14} />
                  <span>Reply</span>
                </button>
                <button
                  onClick={() => handleDownloadReport(message.id)}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center space-x-1"
                >
                  <Download size={14} />
                  <span>Download Report</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesCard;