import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface SettingsProps {
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
    setActiveSection(null);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password updated successfully');
    setActiveSection(null);
  };

  const handleNotificationUpdate = () => {
    toast.success('Notification preferences updated');
    setActiveSection(null);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast.success(`Language changed to ${newLanguage}`);
    setActiveSection(null);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
    setActiveSection(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-8 pb-8 ml-64">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>
        
        <div className="bg-white rounded-xl shadow-sm">
          {/* Profile Information */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <button 
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === 'profile' ? null : 'profile')}
              >
                <div className="flex items-center space-x-3">
                  <User className="text-gray-600" size={20} />
                  <span className="font-medium">Profile Information</span>
                </div>
              </button>
              {activeSection === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="p-4 bg-gray-50 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                    Save Changes
                  </button>
                </form>
              )}
              
              <button 
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === 'password' ? null : 'password')}
              >
                <div className="flex items-center space-x-3">
                  <Lock className="text-gray-600" size={20} />
                  <span className="font-medium">Password & Security</span>
                </div>
              </button>
              {activeSection === 'password' && (
                <form onSubmit={handlePasswordUpdate} className="p-4 bg-gray-50 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                    Update Password
                  </button>
                </form>
              )}
              
              <button 
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === 'notifications' ? null : 'notifications')}
              >
                <div className="flex items-center space-x-3">
                  <Bell className="text-gray-600" size={20} />
                  <span className="font-medium">Notifications</span>
                </div>
              </button>
              {activeSection === 'notifications' && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => setNotifications({...notifications, email: !notifications.email})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Push Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => setNotifications({...notifications, push: !notifications.push})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SMS Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => setNotifications({...notifications, sms: !notifications.sms})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <button
                    onClick={handleNotificationUpdate}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                  >
                    Save Preferences
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Preferences */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Preferences</h2>
            <div className="space-y-4">
              <button 
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === 'language' ? null : 'language')}
              >
                <div className="flex items-center space-x-3">
                  <Globe className="text-gray-600" size={20} />
                  <span className="font-medium">Language</span>
                </div>
                <span className="text-sm text-gray-500">{language}</span>
              </button>
              {activeSection === 'language' && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  {['English', 'Spanish', 'French', 'German'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        language === lang ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
              
              <button 
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === 'theme' ? null : 'theme')}
              >
                <div className="flex items-center space-x-3">
                  <Moon className="text-gray-600" size={20} />
                  <span className="font-medium">Theme</span>
                </div>
                <span className="text-sm text-gray-500">{theme}</span>
              </button>
              {activeSection === 'theme' && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  {['Light', 'Dark', 'System'].map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => handleThemeChange(themeOption)}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        theme === themeOption ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {themeOption}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Logout Button */}
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 p-4 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
            >
              <LogOut size={20} />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;