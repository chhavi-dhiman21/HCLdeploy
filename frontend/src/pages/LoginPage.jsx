import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* Image Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
            150 x 150
          </div>
        </div>

        {/* Login Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 ease-in-out font-semibold"
        >
          Login
        </button>

       

        {/* Register Link */}
        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            New User? Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;