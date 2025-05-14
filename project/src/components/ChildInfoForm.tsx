import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ChildInfoFormProps {
  onComplete: (childName: string) => void;
}

const ChildInfoForm: React.FC<ChildInfoFormProps> = ({ onComplete }) => {
  const [childName, setChildName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (childName.trim()) {
      onComplete(childName);
      toast.success('Child information saved successfully!');
      navigate('/dashboard');
    } else {
      toast.error('Please enter your child\'s name');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h1>
          <p className="text-gray-600">Please provide your child's information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Child's Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your child's name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChildInfoForm;