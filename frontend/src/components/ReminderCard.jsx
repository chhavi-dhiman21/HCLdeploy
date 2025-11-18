import React from 'react';
import { Calendar } from 'lucide-react';

const ReminderCard = ({ title, details, date, daysLeft }) => {
  return (
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
            <h4 className="text-white font-semibold mb-2">{title}</h4>
            <p className="text-slate-300">
              {details} <span className="text-blue-400 font-semibold">{date}</span>
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              In {daysLeft} days
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReminderCard;