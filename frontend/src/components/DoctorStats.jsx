import React from 'react';
import { UsersIcon, CalendarDaysIcon, StarIcon } from '@heroicons/react/24/outline';

const cards = [
  {
    label: 'Active Patients',
    icon: UsersIcon,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    accessor: 'activePatients',
  },
  {
    label: 'Appointments Today',
    icon: CalendarDaysIcon,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/30',
    accessor: 'appointmentsToday',
  },
  {
    label: 'Satisfaction',
    icon: StarIcon,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/30',
    accessor: 'satisfaction',
  },
];

const DoctorStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map(({ label, icon: Icon, color, bg, accessor }) => (
        <div
          key={label}
          className={`bg-[#101f33] p-5 rounded-xl border border-gray-800 flex items-center justify-between ${bg}`}
        >
          <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-3xl font-bold text-white mt-1">
              {stats[accessor]}
              {label === 'Satisfaction' && <span className="text-lg font-normal text-gray-400 ml-1">/ 5</span>}
            </p>
          </div>
          <div className={`p-3 rounded-full bg-[#0a1628] ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      ))}
    </div>
  );
};

DoctorStats.defaultProps = {
  stats: {
    activePatients: 0,
    appointmentsToday: 0,
    satisfaction: 0,
  },
};

export default DoctorStats;

