import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import PerformanceReportPage from './components/PerformanceReportPage';
import AttendancePage from './components/AttendancePage';
import EmotionalReportPage from './components/EmotionalReportPage';
import MessagesPage from './components/MessagesPage';
import ChildInfoForm from './components/ChildInfoForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [childName, setChildName] = useState<string>('');
  const [showChildForm, setShowChildForm] = useState<boolean>(false);

  const handleSignUp = () => {
    setShowChildForm(true);
  };

  const handleChildInfoComplete = (name: string) => {
    setChildName(name);
    setIsLoggedIn(true);
    setShowChildForm(false);
  };

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        {!isLoggedIn ? (
          showChildForm ? (
            <Routes>
              <Route path="*" element={<ChildInfoForm onComplete={handleChildInfoComplete} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
              <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )
        ) : (
          <div className="flex">
            <Sidebar onLogout={() => setIsLoggedIn(false)} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard childName={childName} />} />
              <Route path="/performance" element={<PerformanceReportPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/emotional" element={<EmotionalReportPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/settings" element={<Settings onLogout={() => setIsLoggedIn(false)} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        )}
      </Router>
    </>
  );
}

export default App;