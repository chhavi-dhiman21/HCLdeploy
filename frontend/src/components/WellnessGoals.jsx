import React, { useEffect, useMemo, useState } from 'react';
import GoalCard from './GoalCard';
import { Target, Activity, Clock, Moon } from 'lucide-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { fetchWellnessGoals, updateWellnessGoal, addCustomGoal } from '../controllers/wellnessController';
import { useAuth } from '../context/AuthContext.jsx';

const defaultGoals = {
  steps: { current: 3620, target: 8000 },
  activeMinutes: { current: 56, distance: 1.23 },
  sleep: { hours: 6, minutes: 30, schedule: '11:30 PM - 06:00 AM' },
  customGoals: [],
};

const mergeWithDefaults = (incoming = {}) => ({
  steps: { ...defaultGoals.steps, ...(incoming.steps || {}) },
  activeMinutes: { ...defaultGoals.activeMinutes, ...(incoming.activeMinutes || {}) },
  sleep: { ...defaultGoals.sleep, ...(incoming.sleep || {}) },
  customGoals: Array.isArray(incoming.customGoals) ? incoming.customGoals : [],
});

const colorThemes = {
  teal: {
    iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600',
    border: 'hover:border-teal-400/60',
    shadow: 'hover:shadow-teal-500/10',
    progress: 'bg-gradient-to-r from-teal-400 to-emerald-500',
  },
  blue: {
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    border: 'hover:border-blue-400/60',
    shadow: 'hover:shadow-blue-500/10',
    progress: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  },
  purple: {
    iconBg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600',
    border: 'hover:border-purple-400/60',
    shadow: 'hover:shadow-purple-500/10',
    progress: 'bg-gradient-to-r from-purple-500 to-fuchsia-500',
  },
};

const WellnessGoals = ({ allowCustomGoals = false }) => {
  const { updateUser } = useAuth();
  const [goals, setGoals] = useState(defaultGoals);
  const [customGoals, setCustomGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [modalGoal, setModalGoal] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadGoals = async () => {
      try {
        const data = await fetchWellnessGoals();
        if (!isMounted) return;
        const merged = mergeWithDefaults(data.wellnessGoals);
        setGoals(merged);
        setCustomGoals(merged.customGoals);
        updateUser?.({ wellnessGoals: data.wellnessGoals });
      } catch (err) {
        if (!isMounted) return;
        setError(err.response?.data?.message || 'Failed to load wellness goals.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadGoals();
    return () => {
      isMounted = false;
    };
  }, [updateUser]);

  const formattedGoals = useMemo(() => {
    const steps = goals.steps;
    const percentage =
      steps.target > 0 ? Math.min(100, Math.round((steps.current / steps.target) * 100)) : 0;

    return {
      stepsCard: {
        title: 'Steps',
        value: steps.current.toLocaleString('en-US'),
        goal: steps.target.toLocaleString('en-US'),
        percentage,
        icon: Activity,
        iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
        hoverBorderClass: 'hover:border-red-500/50',
        hoverShadowClass: 'hover:shadow-red-500/10',
        progressColor: 'bg-gradient-to-r from-red-500 to-rose-600',
        subDetails: 'Today',
        onClick: () => openModal('steps'),
      },
      activeCard: {
        title: 'Active Time',
        value: goals.activeMinutes.current,
        unit: 'mins',
        icon: Clock,
        iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
        hoverBorderClass: 'hover:border-orange-500/50',
        hoverShadowClass: 'hover:shadow-orange-500/10',
        details: [
          {
            label: 'Distance',
            value: `${goals.activeMinutes.distance} km`,
            dot: true,
            valueColor: 'text-green-400',
          },
        ],
        onClick: () => openModal('activeMinutes'),
      },
      sleepDisplay: {
        hours: goals.sleep.hours,
        minutes: goals.sleep.minutes,
        schedule: goals.sleep.schedule,
      },
    };
  }, [goals]);

  const openModal = (goalKey) => {
    setError(null);
    setStatusMessage(null);
    setModalGoal(goalKey);
    if (goalKey === 'steps') {
      setFormValues({
        current: goals.steps.current,
        target: goals.steps.target,
      });
    } else if (goalKey === 'activeMinutes') {
      setFormValues({
        current: goals.activeMinutes.current,
        distance: goals.activeMinutes.distance,
      });
    } else if (goalKey === 'sleep') {
      setFormValues({
        hours: goals.sleep.hours,
        minutes: goals.sleep.minutes,
        schedule: goals.sleep.schedule,
      });
    } else if (goalKey === 'custom') {
      setFormValues({
        title: '',
        description: '',
        current: 0,
        target: 0,
        unit: '',
        color: 'teal',
      });
    }
  };

  const closeModal = () => {
    setModalGoal(null);
    setFormValues({});
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const buildPayload = () => {
    if (modalGoal === 'steps') {
      return {
        current: Number(formValues.current) || 0,
        target: Math.max(1, Number(formValues.target) || 0),
      };
    }
    if (modalGoal === 'activeMinutes') {
      return {
        current: Number(formValues.current) || 0,
        distance: Number(formValues.distance) || 0,
      };
    }
    if (modalGoal === 'sleep') {
      return {
        hours: Number(formValues.hours) || 0,
        minutes: Number(formValues.minutes) || 0,
        schedule: formValues.schedule || '11:00 PM - 06:00 AM',
      };
    }
    if (modalGoal === 'custom') {
      return {
        title: formValues.title?.trim(),
        description: formValues.description?.trim(),
        current: Number(formValues.current) || 0,
        target: Number(formValues.target) || 0,
        unit: formValues.unit || '',
        color: formValues.color || 'teal',
      };
    }

    return {};
  };

  const handleSaveGoal = async (event) => {
    event.preventDefault();
    if (!modalGoal) return;
    setSaving(true);
    setError(null);
    try {
      const payload = buildPayload();
      let data;
      if (modalGoal === 'custom') {
        data = await addCustomGoal(payload);
        setStatusMessage('New wellness goal added.');
      } else {
        data = await updateWellnessGoal(modalGoal, payload);
        setStatusMessage('Wellness goal updated successfully.');
      }
      const merged = mergeWithDefaults(data.wellnessGoals);
      setGoals(merged);
      setCustomGoals(merged.customGoals);
      updateUser?.({ wellnessGoals: data.wellnessGoals });
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update goal.');
    } finally {
      setSaving(false);
    }
  };

  const renderModalFields = () => {
    if (modalGoal === 'steps') {
      return (
        <>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Current Steps
            <input
              type="number"
              min="0"
              value={formValues.current ?? ''}
              onChange={(e) => handleInputChange('current', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Target Steps
            <input
              type="number"
              min="1"
              value={formValues.target ?? ''}
              onChange={(e) => handleInputChange('target', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </label>
        </>
      );
    }

    if (modalGoal === 'activeMinutes') {
      return (
        <>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Active Minutes
            <input
              type="number"
              min="0"
              value={formValues.current ?? ''}
              onChange={(e) => handleInputChange('current', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Distance (km)
            <input
              type="number"
              min="0"
              step="0.01"
              value={formValues.distance ?? ''}
              onChange={(e) => handleInputChange('distance', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </label>
        </>
      );
    }

    if (modalGoal === 'sleep') {
      return (
        <>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Hours
            <input
              type="number"
              min="0"
              value={formValues.hours ?? ''}
              onChange={(e) => handleInputChange('hours', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Minutes
            <input
              type="number"
              min="0"
              max="59"
              value={formValues.minutes ?? ''}
              onChange={(e) => handleInputChange('minutes', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300 col-span-full">
            Sleep Schedule (e.g. 11:30 PM - 06:00 AM)
            <input
              type="text"
              value={formValues.schedule ?? ''}
              onChange={(e) => handleInputChange('schedule', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </label>
        </>
      );
    }

    return null;
  };

  const renderModalTitle = () => {
    if (modalGoal === 'steps') return 'Update Steps Goal';
    if (modalGoal === 'activeMinutes') return 'Update Active Time';
    if (modalGoal === 'sleep') return 'Update Sleep Goal';
    if (modalGoal === 'custom') return 'Add Custom Goal';
    return '';
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Target className="text-blue-400" size={28} />
            Wellness Goals
          </h3>
          {loading && <span className="text-sm text-slate-400">Syncing...</span>}
        </div>
        {allowCustomGoals && (
          <button
            type="button"
            onClick={() => openModal('custom')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
          >
            + Add Goal
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/40 border border-red-700 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      {statusMessage && (
        <div className="mb-4 p-3 bg-green-900/40 border border-green-700 text-green-200 rounded-lg text-sm">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GoalCard {...formattedGoals.stepsCard} />
        <GoalCard {...formattedGoals.activeCard} />

        <button
          type="button"
          onClick={() => openModal('sleep')}
          className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:ring-offset-slate-900"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Moon size={24} className="text-white" />
              </div>
              <span className="font-semibold text-lg text-white">Sleep</span>
            </div>
          </div>
          <div className="flex items-baseline mb-3">
            <span className="text-4xl font-bold text-white mr-2">{formattedGoals.sleepDisplay.hours}</span>
            <span className="text-slate-400 mr-3">hrs</span>
            <span className="text-4xl font-bold text-white mr-2">{formattedGoals.sleepDisplay.minutes}</span>
            <span className="text-slate-400">mins</span>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
            <span className="text-sm text-slate-400">{formattedGoals.sleepDisplay.schedule}</span>
          </div>
        </button>
      </div>

      {allowCustomGoals && customGoals.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl font-semibold text-white mb-4">Custom Goals</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customGoals.map((goal, index) => {
              const theme = colorThemes[goal.color] || colorThemes.teal;
              const percentage =
                goal.target > 0 ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : null;

              const cardProps = {
                title: goal.title,
                value: goal.current,
                unit: goal.unit,
                goal: goal.target || null,
                percentage,
                icon: Target,
                iconBg: theme.iconBg,
                hoverBorderClass: theme.border,
                hoverShadowClass: theme.shadow,
                progressColor: theme.progress,
                details: goal.description
                  ? [{ label: 'Notes', value: goal.description, valueColor: 'text-slate-300' }]
                  : null,
              };

              return <GoalCard key={`${goal.title}-${index}`} {...cardProps} />;
            })}
          </div>
        </div>
      )}

      {modalGoal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#101f33] border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-white">{renderModalTitle()}</h4>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div className={`grid grid-cols-1 ${modalGoal === 'sleep' ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
                {modalGoal === 'custom' ? (
                  <>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      Goal Title
                      <input
                        type="text"
                        value={formValues.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                        className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      Unit (optional)
                      <input
                        type="text"
                        value={formValues.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      Current Value
                      <input
                        type="number"
                        value={formValues.current}
                        onChange={(e) => handleInputChange('current', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      Target Value
                      <input
                        type="number"
                        value={formValues.target}
                        onChange={(e) => handleInputChange('target', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300 col-span-full">
                      Description
                      <textarea
                        rows="3"
                        value={formValues.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      Color Theme
                      <select
                        value={formValues.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="teal">Teal</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                      </select>
                    </label>
                  </>
                ) : (
                  renderModalFields()
                )}
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
                    saving
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600'
                  }`}
                >
                  {saving ? 'Saving...' : modalGoal === 'custom' ? 'Add Goal' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default WellnessGoals;