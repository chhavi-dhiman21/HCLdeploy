import React from 'react';

const DashboardHeader = ({ userName, message }) => {
  return (
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-white mb-2">Welcome back, {userName}</h2>
      <p className="text-slate-400">{message}</p>
    </div>
  );
};

export default DashboardHeader;