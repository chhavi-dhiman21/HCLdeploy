import React from 'react';
import Sidebar from '../components/Sidebar';
import WellnessGoals from '../components/WellnessGoals';

const WellnessGoalsPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <WellnessGoals allowCustomGoals />
      </main>
    </div>
  );
};

export default WellnessGoalsPage;

