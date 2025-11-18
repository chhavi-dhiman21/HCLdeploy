import React from 'react';
import GoalCard from './GoalCard';
import { Target, Activity, Clock, Moon } from 'lucide-react';

const stepsGoal = {
  title: 'Steps',
  value: '3,620',
  unit: '',
  goal: '8,000',
  percentage: 45,
  icon: Activity,
  iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
  hoverBorderColor: 'border-red-500/50',
  hoverShadowColor: 'shadow-red-500/10',
  progressColor: 'bg-gradient-to-r from-red-500 to-rose-600',
  subDetails: 'Today',
};

const activeTimeGoal = {
  title: 'Active Time',
  value: '56',
  unit: 'mins',
  goal: null,
  percentage: null,
  icon: Clock,
  iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
  hoverBorderColor: 'border-orange-500/50',
  hoverShadowColor: 'shadow-orange-500/10',
  progressColor: null,
  subDetails: null,
  details: [
    { label: 'Distance', value: '1.23 km', dot: true, valueColor: 'text-green-400' },
  ],
};

const sleepGoal = {
  title: 'Sleep',
  value: '6',
  unit: 'hrs',
  goal: null,
  percentage: null,
  icon: Moon,
  iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
  hoverBorderColor: 'border-purple-500/50',
  hoverShadowColor: 'shadow-purple-500/10',
  progressColor: null,
  subDetails: null,
  details: [
    { label: '11:30 PM - 06:00 AM', value: '', dot: false, valueColor: 'text-slate-400' },
  ],
  // Custom sleep time display
  customValue: (
    <>
      <span className="text-4xl font-bold text-white mr-2">6</span>
      <span className="text-slate-400 mr-3">hrs</span>
      <span className="text-4xl font-bold text-white mr-2">30</span>
      <span className="text-slate-400">mins</span>
    </>
  ),
};

const WellnessGoals = () => {
  return (
    <section className="mb-10">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <Target className="text-blue-400" size={28} />
        Wellness Goals
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GoalCard {...stepsGoal} />
        <GoalCard {...activeTimeGoal} />
        {/* Render sleep goal manually for custom value display, or adjust GoalCard for complexity */}
        <div className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Moon size={24} className="text-white" />
              </div>
              <span className="font-semibold text-lg text-white">Sleep</span>
            </div>
          </div>
          <div className="flex items-baseline mb-3">
            {sleepGoal.customValue}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
            <span className="text-sm text-slate-400">11:30 PM - 06:00 AM</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessGoals;