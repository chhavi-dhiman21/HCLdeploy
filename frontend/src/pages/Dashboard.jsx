import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar - Fixed on larger screens, takes full width on small screens */}
      <aside className="bg-blue-600 text-white w-full lg:w-64 p-6 flex flex-col items-center lg:items-start shadow-lg lg:shadow-none">
        <h1 className="text-2xl font-bold mb-8">Health</h1>
        <nav className="w-full">
          <ul className="space-y-4 text-lg">
            <li>
              <a href="#" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-200">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-200">
                My Profile
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-200">
                Wellness Goals
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-200">
                Messages
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-200">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10">
        {/* Welcome Header */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Welcome, David</h2>

        {/* Wellness Goals Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-6">Wellness Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Steps Goal Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 text-2xl">🏃‍♂️</span> {/* Icon placeholder */}
                  <span className="font-medium text-lg">Steps</span>
                </div>
                <span className="text-gray-500 text-sm">Now</span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold mr-2">3620</span>
                <span className="text-gray-500">/ 8000 steps</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-red-500 text-sm">40%</span> {/* Assuming 3620/8000 is approx 40% */}
            </div>

            {/* Active Time Goal Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500 text-2xl">⏰</span> {/* Icon placeholder */}
                  <span className="font-medium text-lg">Active Time</span>
                </div>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold mr-2">56</span>
                <span className="text-gray-500">mins</span>
                <span className="ml-auto text-green-600">1.23km</span> {/* This part needs adjustment if it's not active time related */}
              </div>
              {/* Progress bar could go here if needed, omitted for brevity based on image */}
            </div>

            {/* Sleep Goal Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-500 text-2xl">😴</span> {/* Icon placeholder */}
                  <span className="font-medium text-lg">Sleep</span>
                </div>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold mr-2">6</span>
                <span className="text-gray-500">hrs</span>
                <span className="text-3xl font-bold ml-2 mr-2">30</span>
                <span className="text-gray-500">mins</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">11:30 PM - 06:00 AM</span>
                {/* Visual representation of sleep cycle could go here */}
              </div>
            </div>
          </div>
        </section>

        {/* Preventive Care Reminders */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-6">Preventive Care Reminders</h3>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <ul className="list-disc list-inside space-y-2">
              <li>Upcoming Annual blood test on 23rd Jan 2025</li>
            </ul>
          </div>
        </section>

        {/* Health Tip of the Day */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Health Tip of the Day</h3>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <p className="text-gray-700">Stay hydrated! Aim to drink at least 8 glasses of water per day.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;