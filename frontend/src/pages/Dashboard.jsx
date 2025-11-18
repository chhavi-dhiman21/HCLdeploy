import React, { useState } from 'react';
import { LayoutDashboard, User, Target, MessageSquare, LogOut, Menu, X, TrendingUp, Clock, Moon, Calendar, Lightbulb, Activity } from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Profile', icon: User },
    { name: 'Wellness Goals', icon: Target },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Logout', icon: LogOut },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 lg:w-80
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          text-white p-6 
          flex flex-col
          shadow-2xl lg:shadow-none
          border-r border-slate-700/50
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold">H</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Health
            </h1>
          </div>
          <p className="text-slate-400 text-sm ml-13">Your wellness companion</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              
              return (
                <li key={item.name}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item.name);
                      setIsMobileOpen(false);
                    }}
                    className={`
                      group flex items-center gap-4 px-4 py-3.5 rounded-xl
                      transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 translate-x-1' 
                        : 'hover:bg-slate-800/50 hover:translate-x-1'
                      }
                    `}
                  >
                    <Icon 
                      size={22} 
                      className={`
                        transition-all duration-300
                        ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}
                      `}
                    />
                    <span className={`
                      text-base font-medium transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                    `}>
                      {item.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">David</p>
              <p className="text-xs text-slate-400">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 lg:ml-0 overflow-y-auto">
        {/* Welcome Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-white mb-2">Welcome back, David</h2>
          <p className="text-slate-400">Here's your health overview for today</p>
        </div>

        {/* Wellness Goals Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="text-blue-400" size={28} />
            Wellness Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Steps Goal Card */}
            <div className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity size={24} className="text-white" />
                  </div>
                  <span className="font-semibold text-lg text-white">Steps</span>
                </div>
                <span className="text-slate-400 text-sm px-3 py-1 bg-slate-800/50 rounded-full">Today</span>
              </div>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-white mr-2">3,620</span>
                <span className="text-slate-400">/ 8,000</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 mb-3 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 h-3 rounded-full transition-all duration-500 shadow-lg shadow-red-500/50" style={{ width: '45%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400 text-sm font-semibold">45% Complete</span>
                <TrendingUp size={16} className="text-green-400" />
              </div>
            </div>

            {/* Active Time Goal Card */}
            <div className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock size={24} className="text-white" />
                  </div>
                  <span className="font-semibold text-lg text-white">Active Time</span>
                </div>
              </div>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-white mr-2">56</span>
                <span className="text-slate-400">mins</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-sm">Distance</span>
                </div>
                <span className="text-green-400 font-semibold">1.23 km</span>
              </div>
            </div>

            {/* Sleep Goal Card */}
            <div className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Moon size={24} className="text-white" />
                  </div>
                  <span className="font-semibold text-lg text-white">Sleep</span>
                </div>
              </div>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-white mr-2">6</span>
                <span className="text-slate-400 mr-3">hrs</span>
                <span className="text-4xl font-bold text-white mr-2">30</span>
                <span className="text-slate-400">mins</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                <span className="text-sm text-slate-400">11:30 PM - 06:00 AM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Preventive Care Reminders */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calendar className="text-blue-400" size={28} />
            Preventive Care Reminders
          </h3>
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Calendar size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">Upcoming Appointment</h4>
                <p className="text-slate-300">Annual blood test scheduled for <span className="text-blue-400 font-semibold">January 23rd, 2025</span></p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  In 66 days
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health Tip of the Day */}
        <section>
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="text-yellow-400" size={28} />
            Health Tip of the Day
          </h3>
          <div className="bg-gradient-to-br from-yellow-500/10 to-amber-600/10 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Lightbulb size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">Stay Hydrated!</h4>
                <p className="text-slate-300 leading-relaxed">Aim to drink at least 8 glasses of water per day. Proper hydration helps maintain energy levels, supports cognitive function, and promotes overall wellness.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;