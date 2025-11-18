import React, { useState } from 'react';
import { registerUser } from '../controllers/authController';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
      const data = await registerUser(name, email, password);
      
      setSuccess('Registration Successful! Please log in.');
      console.log('Registration successful:', data);
      
      setName('');
      setEmail('');
      setPassword('');
      
    } catch (err) {
      setError(err.message);
      console.error('Registration Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Register
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white py-3 rounded-md transition duration-300 ease-in-out font-semibold ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-500 hover:bg-indigo-600'
        }`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <div className="text-center mt-4">
        <a href="/" className="text-blue-600 hover:underline">
          Already a user? Login here
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;