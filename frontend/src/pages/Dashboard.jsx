import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import WellnessGoals from '../components/WellnessGoals';
import ReminderCard from '../components/ReminderCard';
import TipOfTheDay from '../components/TipOfTheDay';
import Sidebar from '../components/Sidebar';



const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 lg:ml-0 overflow-y-auto">
        
        {/* Welcome Header */}
        <DashboardHeader
          userName="David" 
          message="Here's your health overview for today" 
        />

        {/* Wellness Goals Section */}
        <WellnessGoals />

        {/* Preventive Care Reminders Section */}
        <ReminderCard
          title="Upcoming Appointment"
          details="Annual blood test scheduled for"
          date="January 23rd, 2025"
          daysLeft="66"
        />

        {/* Health Tip of the Day Section */}
        <TipOfTheDay
        />
        
      </main>
    </div>
  );
};

export default Dashboard;