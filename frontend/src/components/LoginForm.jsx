import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../controllers/authController';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  UserIcon, 
  LockClosedIcon, 
  XCircleIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await loginUser(username, password);
      login(data.user, data.token);
      setSuccess('Login Successful! Redirecting...');
      console.log('Login successful:', data);

      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 800);
    } catch (err) {
      setError(err.message);
      console.error('Login Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#101f33] p-8 md:p-10 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Sign In
        </h2>

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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 bg-[#0a1628] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || success} // Disable button on success too
          className={`w-full text-white py-3 rounded-md transition duration-300 ease-in-out font-semibold ${
            loading || success
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 focus:ring-offset-[#101f33]`}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="text-center mt-6">
          <a href="/register" className="text-sm font-medium text-teal-400 hover:text-teal-300">
            Don't have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;