import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-center pt-8">
          <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
            
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;