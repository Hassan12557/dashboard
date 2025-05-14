import React, { useState } from 'react';
import { Send, Search, Filter, Download } from 'lucide-react';
import useSound from 'use-sound';
import toast from 'react-hot-toast';

const allMessages = [
  {
    id: 1,
    sender: 'Ms. Thompson',
    subject: 'Math homework update',
    preview: 'Great progress on the recent algebra assignment...',
    time: '2h ago',
    fullMessage: 'Great progress on the recent algebra assignment. Your child has shown significant improvement in problem-solving skills.',
    category: 'Academic'
  },
  {
    id: 2,
    sender: 'Mr. Roberts',
    subject: 'Science project reminder',
    preview: 'Please note the upcoming science fair project deadline...',
    time: '5h ago',
    fullMessage: 'Please note the upcoming science fair project deadline. Materials need to be submitted by next Friday.',
    category: 'Academic'
  },
  {
    id: 3,
    sender: 'School Admin',
    subject: 'Parent-Teacher Meeting',
    preview: 'The quarterly parent-teacher meeting is scheduled...',
    time: '1d ago',
    fullMessage: 'The quarterly parent-teacher meeting is scheduled for next week. Please choose your preferred time slot.',
    category: 'Administrative'
  },
  {
    id: 4,
    sender: 'Coach Williams',
    subject: 'Sports Day Information',
    preview: 'Details about the upcoming sports day event...',
    time: '2d ago',
    fullMessage: 'Details about the upcoming sports day event. Your child has been selected for the relay race team.',
    category: 'Sports'
  },
  {
    id: 5,
    sender: 'Art Department',
    subject: 'Art Exhibition',
    preview: 'Your child\'s artwork has been selected for display...',
    time: '3d ago',
    fullMessage: 'Your child\'s artwork has been selected for display in the upcoming school art exhibition.',
    category: 'Arts'
  }
];

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playMessageSound] = useSound('/message.mp3', { volume: 0.5 });

  const categories = ['All', 'Academic', 'Administrative', 'Sports', 'Arts'];

  const filteredMessages = allMessages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || message.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleDownloadReport = (messageId: number) => {
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
    <div className="min-h-screen bg-gray-50 pt-20 px-8 pb-8 ml-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with teachers and staff</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {/* Search and Filter */}
        <div className="p-6 border-b">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="divide-y">
          {filteredMessages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-gray-800">{message.sender}</span>
                  <span className="ml-2 text-sm text-gray-500">• {message.time}</span>
                </div>
                <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">{message.category}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{message.subject}</h3>
              <p className="text-gray-600 mb-4">
                {selectedMessage === message.id ? message.fullMessage : message.preview}
              </p>
              
              {selectedMessage === message.id ? (
                <div className="space-y-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleReply(message.id)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                    >
                      <Send size={16} />
                      <span>Send Reply</span>
                    </button>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setSelectedMessage(message.id);
                      playMessageSound();
                    }}
                    className="text-purple-600 hover:text-purple-700 flex items-center space-x-2"
                  >
                    <Send size={16} />
                    <span>Reply</span>
                  </button>
                  <button
                    onClick={() => handleDownloadReport(message.id)}
                    className="text-purple-600 hover:text-purple-700 flex items-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download Report</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;