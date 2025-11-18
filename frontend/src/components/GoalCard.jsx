import React from 'react';
import { TrendingUp } from 'lucide-react';

const GoalCard = ({ title, value, unit, goal, percentage, icon: Icon, iconBg, hoverBorderClass, hoverShadowClass, progressColor, details, subDetails }) => {
  const progressStyle = {
    // Only use inline style for dynamic CSS properties like width
    width: `${percentage}%`,
  };

  // We are using hoverBorderClass and hoverShadowClass (which are Tailwind classes)
  // directly in the className for dynamic styling.
  return (
    <div 
      // Apply hover classes dynamically in the className string
      className={`
        group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl 
        border border-slate-700/50 
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
        ${hoverBorderClass} 
        ${hoverShadowClass}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${iconBg}`}>
            <Icon size={24} className="text-white" />
          </div>
          <span className="font-semibold text-lg text-white">{title}</span>
        </div>
        {subDetails && <span className="text-slate-400 text-sm px-3 py-1 bg-slate-800/50 rounded-full">{subDetails}</span>}
      </div>

      <div className="flex items-baseline mb-3">
        <span className="text-4xl font-bold text-white mr-2">{value}</span>
        {unit && <span className="text-slate-400">{unit}</span>}
        {goal && <span className="text-slate-400 mr-2">/ {goal}</span>}
      </div>

      {percentage !== undefined && percentage !== null && (
        <>
          <div className="w-full bg-slate-800 rounded-full h-3 mb-3 overflow-hidden">
            {/* The progressColor prop should contain the full Tailwind background class (e.g., 'bg-gradient-to-r from-red-500 to-rose-600') */}
            <div className={`${progressColor} h-3 rounded-full transition-all duration-500 shadow-lg shadow-red-500/50`} style={progressStyle}></div>
          </div>
          <div className="flex items-center justify-between">
            {/* Use Tailwind's text color utility classes for dynamic styling */}
            <span className={`text-sm font-semibold 
              ${progressColor.includes('red') ? 'text-red-400' : progressColor.includes('orange') ? 'text-orange-400' : 'text-blue-400'}
            `}>
              {percentage}% Complete
            </span>
            <TrendingUp size={16} className="text-green-400" />
          </div>
        </>
      )}

      {details && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center gap-2">
              {detail.dot && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
              <span className="text-slate-400 text-sm">{detail.label}</span>
              <span className={`${detail.valueColor || 'text-green-400'} font-semibold`}>{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalCard;