import React, { useState, useEffect } from 'react';
import { HeartHandshake, RefreshCw } from 'lucide-react';

const mockFetchRandomHealthTip = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const tips = [
    { category: "Nutrition", tip: "Eat a rainbow! Incorporating a variety of colorful fruits and vegetables ensures you get a wide range of vitamins and antioxidants." },
    { category: "Sleep Hygiene", tip: "Establish a consistent bedtime routine. Even 30 minutes of winding down before bed can significantly improve sleep quality." },
    { category: "Mental Wellness", tip: "Practice the 5-4-3-2-1 grounding technique to manage stress and anxiety: 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste." },
    { category: "Fitness", tip: "Aim for at least 150 minutes of moderate-intensity aerobic exercise or 75 minutes of vigorous-intensity exercise per week." }
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return {
    success: true,
    tip: randomTip,
    error: null,
  };
};

const HealthTipDisplay = () => {
  const fetchTipFunction = mockFetchRandomHealthTip; 
    
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTip = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTipFunction(); 
      
      if (result.success) {
        setTip(result.tip);
      } else {
        setError(result.error || 'Failed to fetch tip.');
        setTip(null);
      }
    } catch (e) {
      setError('An unexpected network error occurred.');
    }
    setLoading(false);
  };

  useEffect(() => {
    getTip();
  }, []);

  const CardContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 h-40">
          <RefreshCw size={24} className="text-blue-400 animate-spin mb-3" />
          <p className="text-slate-400">Loading your daily tip...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-8 h-40">
          <p className="text-red-400 font-semibold mb-2">Error</p>
          <p className="text-slate-300 text-center">{error}</p>
        </div>
      );
    }
    
    if (!tip) return null;

    return (
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
          <HeartHandshake size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-blue-400 font-semibold mb-1 text-sm uppercase tracking-wider">
            {tip.category}
          </h4>
          <p className="text-white text-lg font-medium">
            {tip.tip}
          </p>
          
          <button 
            onClick={getTip}
            disabled={loading}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 text-sm hover:bg-slate-700 hover:text-white transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            New Tip
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="mb-10 w-full">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <HeartHandshake className="text-blue-400" size={28} />
        Daily Health Insight
      </h3>
      
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300">
        <CardContent />
      </div>
    </section>
  );
};

const App = () => {
    return (
      <div className="min-h-screen bg-slate-950 p-8 font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          .font-sans { font-family: 'Inter', sans-serif; }
        `}</style>
        <HealthTipDisplay />
      </div>
    );
};

export default App;