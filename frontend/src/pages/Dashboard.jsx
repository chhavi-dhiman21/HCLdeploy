import React, { useMemo } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import WellnessGoals from '../components/WellnessGoals';
import ReminderCard from '../components/ReminderCard';
import TipOfTheDay from '../components/TipOfTheDay';
import Sidebar from '../components/Sidebar';
import DoctorStats from '../components/DoctorStats';
import DoctorSchedule from '../components/DoctorSchedule';
import { useAuth } from '../context/AuthContext.jsx';

const defaultDoctorStats = {
  activePatients: 48,
  appointmentsToday: 7,
  satisfaction: 4.9,
};

const defaultDoctorAppointments = [
  { patient: 'Ava Reynolds', type: 'Telehealth follow-up', time: '09:30 AM', status: 'Confirmed' },
  { patient: 'Liam Carter', type: 'In-person consult', time: '11:00 AM', status: 'Checked-in' },
  { patient: 'Sophia Patel', type: 'Annual physical', time: '02:15 PM', status: 'Awaiting' },
];

const Dashboard = () => {
  const { user } = useAuth();

  const currentUser = useMemo(() => {
    if (user) return user;
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to parse local user:', error);
      return null;
    }
  }, [user]);

  const userName = useMemo(() => {
    if (currentUser?.username) return currentUser.username;
    return 'Member';
  }, [currentUser]);

  const role = (currentUser?.role || 'patient').toLowerCase();
  const isDoctor = role === 'doctor';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <DashboardHeader
          userName={isDoctor ? `Dr. ${userName}` : userName}
          message={
            isDoctor
              ? 'Here is today’s practice overview'
              : 'Here is your health overview for today'
          }
        />

        {isDoctor ? (
          <>
            <DoctorStats stats={defaultDoctorStats} />
            <DoctorSchedule appointments={defaultDoctorAppointments} />
          </>
        ) : (
          <>
            <WellnessGoals />
            <ReminderCard
              title="Upcoming Appointment"
              details="Annual blood test scheduled for"
              date="January 23rd, 2025"
              daysLeft="66"
            />
            <TipOfTheDay />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;