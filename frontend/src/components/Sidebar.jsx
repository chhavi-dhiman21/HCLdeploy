import React, { useState } from 'react';
import { LayoutDashboard, User, Target, MessageSquare, LogOut, Menu, X } from 'lucide-react';

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
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
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
        {/* Logo/Header */}
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

        {/* Navigation */}
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

        {/* Bottom Card */}
        <div className="mt-8 p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">John Doe</p>
              <p className="text-xs text-slate-400">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;