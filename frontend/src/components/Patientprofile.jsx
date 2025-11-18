import React from 'react';
import { CalendarIcon, HeartIcon, ScaleIcon, UserIcon } from '@heroicons/react/24/outline';

const defaultPatientData = {
  id: 'P-2049',
  name: 'Ava Martinez',
  email: 'ava.martinez@example.com',
  bloodType: 'A+',
  weight: '65',
  height: '168',
  appointments: [
    {
      doctorName: 'Dr. Lewis Hart',
      reason: 'Quarterly check-up',
      date: 'Dec 8, 2025',
      time: '9:30 AM',
    },
    {
      doctorName: 'Dr. Priya Patel',
      reason: 'Nutrition follow-up',
      date: 'Jan 12, 2026',
      time: '1:15 PM',
    },
  ],
};

const PatientProfile = ({ data }) => {
  const profile = data ?? defaultPatientData;
  return (
    <div className="animate-fadeIn p-4">
      {/* Header Section */}
      <div className="bg-[#101f33] rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {profile.name ? profile.name.charAt(0) : 'P'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
            <p className="text-teal-400 font-medium">Patient ID: #{profile.id}</p>
            <p className="text-gray-400">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#101f33] p-5 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-teal-900/30 rounded-lg text-teal-400">
            <HeartIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Blood Type</p>
            <p className="text-xl font-bold text-white">{profile.bloodType || 'O+'}</p>
          </div>
        </div>
        <div className="bg-[#101f33] p-5 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
            <ScaleIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Weight</p>
            <p className="text-xl font-bold text-white">{profile.weight || '70'} kg</p>
          </div>
        </div>
        <div className="bg-[#101f33] p-5 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Height</p>
            <p className="text-xl font-bold text-white">{profile.height || '175'} cm</p>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-[#101f33] rounded-xl p-6 shadow-lg border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-teal-400" />
          Upcoming Appointments
        </h3>
        <div className="space-y-3">
          {profile.appointments && profile.appointments.length > 0 ? (
            profile.appointments.map((apt, index) => (
              <div key={index} className="p-4 bg-[#0a1628] rounded-lg flex justify-between items-center border border-gray-800">
                <div>
                  <p className="font-semibold text-white">{apt.doctorName}</p>
                  <p className="text-sm text-gray-400">{apt.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-teal-400 font-bold">{apt.date}</p>
                  <p className="text-xs text-gray-500">{apt.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;