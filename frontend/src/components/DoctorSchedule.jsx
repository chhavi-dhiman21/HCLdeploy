import React from 'react';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const DoctorSchedule = ({ appointments }) => {
  return (
    <div className="bg-[#101f33] rounded-xl p-6 shadow-lg border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <ClockIcon className="w-6 h-6 text-teal-400" />
        Today's Appointments
      </h3>
      <div className="space-y-4">
        {appointments.map((apt, index) => (
          <div
            key={`${apt.time}-${index}`}
            className="p-4 bg-[#0a1628] rounded-lg border border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div>
              <p className="text-white font-semibold">{apt.patient}</p>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <MapPinIcon className="w-4 h-4 text-teal-400" />
                {apt.type}
              </p>
            </div>
            <div className="text-right">
              <p className="text-teal-400 font-semibold">{apt.time}</p>
              <p className="text-gray-500 text-sm">{apt.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DoctorSchedule.defaultProps = {
  appointments: [],
};

export default DoctorSchedule;

