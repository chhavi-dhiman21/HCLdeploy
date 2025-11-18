import React from 'react';
import { BriefcaseIcon, ClockIcon, StarIcon, UsersIcon } from '@heroicons/react/24/outline';

const DoctorProfile = ({ data }) => {
  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="bg-[#101f33] rounded-xl p-6 mb-6 shadow-lg border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-600 rounded-xl flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            Dr.
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{data.name}</h2>
            <p className="text-green-400 font-medium text-lg">{data.specialization || 'General Practitioner'}</p>
            <p className="text-gray-400">License: {data.licenseNumber}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#101f33] p-5 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-400">Patients</p>
            <UsersIcon className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{data.patientCount || '0'}</p>
          <p className="text-xs text-gray-500 mt-1">+12 this month</p>
        </div>
        
        <div className="bg-[#101f33] p-5 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-400">Experience</p>
            <BriefcaseIcon className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{data.experience || '0'} <span className="text-lg font-normal text-gray-500">Years</span></p>
        </div>

        <div className="bg-[#101f33] p-5 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-400">Rating</p>
            <StarIcon className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{data.rating || '4.9'}</p>
        </div>
      </div>

      {/* Schedule / Availability */}
      <div className="bg-[#101f33] rounded-xl p-6 shadow-lg border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ClockIcon className="w-6 h-6 text-green-400" />
          Today's Schedule
        </h3>
        <div className="grid grid-cols-1 gap-3">
           {/* Mock schedule data */}
           <div className="p-4 bg-[#0a1628] rounded-lg border-l-4 border-green-500 flex justify-between items-center">
              <span className="text-gray-300">09:00 AM - 01:00 PM</span>
              <span className="text-sm bg-green-900/30 text-green-400 px-2 py-1 rounded">Available</span>
           </div>
           <div className="p-4 bg-[#0a1628] rounded-lg border-l-4 border-red-500 flex justify-between items-center">
              <span className="text-gray-300">02:00 PM - 04:00 PM</span>
              <span className="text-sm bg-red-900/30 text-red-400 px-2 py-1 rounded">Surgery</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;