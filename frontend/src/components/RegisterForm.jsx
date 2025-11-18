import React, { useState } from 'react';
import { registerUser } from '../controllers/authController';
import { 
  UserIcon, 
  LockClosedIcon, 
  XCircleIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await registerUser(username, password, role);
      setSuccess('Registration Successful! Please log in.');
      console.log('Registration successful:', data);
      setUsername('');
      setPassword('');
      setRole('patient');
    } catch (err) {
      setError(err.message);
      console.error('Registration Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Wrapper to create the dark page background and center the form
    <div className="min-h-screen bg-[#0a1628] text-white flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit} 
          className="bg-[#101f33] p-8 md:p-10 rounded-xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Register
          </h2>

          {/* Modernized Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md flex items-center gap-2">
              <XCircleIcon className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-700 text-green-300 rounded-md flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Modernized Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 bg-[#0a1628] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-300 mb-3">
              Registering as
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Patient', value: 'patient', helper: 'Track your wellness journey' },
                { label: 'Doctor', value: 'doctor', helper: 'Manage and guide patients' },
              ].map((option) => {
                const isActive = role === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      isActive
                        ? 'border-teal-400 bg-teal-400/10 shadow-lg shadow-teal-500/20'
                        : 'border-gray-700 hover:border-teal-400/60 hover:bg-white/5'
                    }`}
                  >
                    <p className="text-white font-semibold">{option.label}</p>
                    <p className="text-xs text-gray-400 mt-1">{option.helper}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modernized Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 bg-[#0a1628] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              />
            </div>
          </div>

          {/* Modernized Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-md transition duration-300 ease-in-out font-semibold ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 focus:ring-offset-[#101f33]`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Modernized Link */}
          <div className="text-center mt-6">
            <a href="/" className="text-sm font-medium text-teal-400 hover:text-teal-300">
              Already a user? Login here
            </a>
          </div>
        </form>
      </div>

    </div>
  );
};

export default RegisterForm;