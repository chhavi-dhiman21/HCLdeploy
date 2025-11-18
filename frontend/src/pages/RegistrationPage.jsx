import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const RegistrationPage = () => {

  const handleRegistration = (formData) => {
    console.log('Account created:', formData);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-8 animate-fadeIn">
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="flex w-full max-w-7xl mx-auto overflow-hidden">
          
          <div className="w-1/2 hidden md:flex flex-col justify-center pr-16">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                <ShieldCheckIcon className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent">
              Turn daily habits into long-term protection
            </h1>
            
            <p className="text-gray-400 text-lg mb-10">
              Track your lifestyle, follow preventive plans, and stay connected with your care team.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full mt-2.5 flex-shrink-0"></div>
                <p className="text-gray-300">Smart reminders for screenings & vaccines.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full mt-2.5 flex-shrink-0"></div>
                <p className="text-gray-300">Share trends with your clinician in one click.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full mt-2.5 flex-shrink-0"></div>
                <p className="text-gray-300">Securely stored, HIPAA-ready architecture.</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-0">
            <RegisterForm onSubmit={handleRegistration} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;