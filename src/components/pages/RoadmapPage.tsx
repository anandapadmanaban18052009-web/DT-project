import React from 'react';
import {
  GitFork,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Target,
  Trophy,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoadmapPage: React.FC = () => {
  const {
    currentCareerMatch,
    roadmapStepStatuses,
    updateRoadmapStep,
    setActiveTab,
    profile
  } = useApp();

  const steps = currentCareerMatch.career.learningRoadmap;

  // Calculate completion percentage
  const completedCount = Object.values(roadmapStepStatuses).filter(s => s === 'Completed').length;
  const progressPercent = Math.round((completedCount / (steps.length || 1)) * 100);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
            <GitFork className="w-4 h-4" />
            <span>PERSONALIZED LEARNING CURRICULUM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {currentCareerMatch.career.title} Mastery Roadmap
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tailored step-by-step sequence addressing your {currentCareerMatch.missingSkills.length} identified skill gaps
          </p>
        </div>

        {/* Overall Completion Metric Card */}
        <div className="flex items-center space-x-4 p-3.5 rounded-2xl bg-navy-900/90 border border-slate-800">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Roadmap Progress</p>
            <p className="text-xl font-black text-cyan-300 font-mono">{progressPercent}% Completed</p>
            <p className="text-[10px] text-slate-400">{completedCount} of {steps.length} Steps Finished</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-950 flex items-center justify-center border border-cyan-800/80 text-cyan-400">
            <Trophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Horizontal High-Level Milestone Visual Flow */}
      <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Milestone Progression Path</span>
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2 overflow-x-auto">
          {/* Milestone 0 */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-center w-full md:w-36 shrink-0">
            <p className="text-[10px] font-semibold text-emerald-400">Foundation</p>
            <p className="text-xs font-bold text-white mt-0.5">Current Skills</p>
            <p className="text-[9px] text-slate-400 truncate">
              {profile.skills && profile.skills.length > 0 ? profile.skills.slice(0, 3).join(', ') : 'Your skills'}
            </p>
          </div>

          <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 shrink-0" />

          {/* Steps */}
          {steps.map(step => {
            const status = roadmapStepStatuses[step.step] || step.status;
            const isDone = status === 'Completed';
            const isInProg = status === 'In Progress';

            return (
              <React.Fragment key={step.step}>
                <div
                  className={`p-3 rounded-xl border text-center w-full md:w-36 shrink-0 transition ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-500/50'
                      : isInProg
                      ? 'bg-cyan-950/50 border-cyan-500/60 ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
                >
                  <p className="text-[10px] font-semibold text-cyan-400">Step {step.step}</p>
                  <p className="text-xs font-bold text-white truncate mt-0.5" title={step.title}>
                    {step.title.split(' ')[0]} {step.title.split(' ')[1] || ''}
                  </p>
                  <p className={`text-[9px] font-semibold ${isDone ? 'text-emerald-400' : isInProg ? 'text-cyan-300' : 'text-slate-400'}`}>
                    {status}
                  </p>
                </div>
                <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 shrink-0" />
              </React.Fragment>
            );
          })}

          {/* Final Milestone */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border border-purple-500/40 text-center w-full md:w-36 shrink-0">
            <p className="text-[10px] font-semibold text-purple-300">Goal Target</p>
            <p className="text-xs font-bold text-white mt-0.5">Career Ready</p>
            <p className="text-[9px] text-cyan-300 font-mono">100% Fit</p>
          </div>
        </div>
      </div>

      {/* Detailed Step-by-Step Interactive Cards */}
      <div className="space-y-4">
        {steps.map(step => {
          const currentStatus = roadmapStepStatuses[step.step] || step.status;
          const isCompleted = currentStatus === 'Completed';
          const isInProgress = currentStatus === 'In Progress';

          return (
            <div
              key={step.step}
              className={`rounded-2xl border p-6 transition-all backdrop-blur-xl ${
                isCompleted
                  ? 'bg-navy-900/60 border-emerald-500/40'
                  : isInProgress
                  ? 'bg-navy-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                  : 'bg-navy-900/70 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                      STEP 0{step.step}
                    </span>
                    <span className="text-xs text-slate-400">• {step.category}</span>
                    <span className="text-xs text-slate-400">• Est. {step.estimatedWeeks}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{step.title}</span>
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Status Switcher Action Buttons */}
                <div className="flex items-center space-x-2 shrink-0">
                  {!isCompleted ? (
                    <>
                      <button
                        onClick={() => updateRoadmapStep(step.step, 'In Progress')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                          isInProgress
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {isInProgress ? '● In Progress' : 'Start Learning'}
                      </button>

                      <button
                        onClick={() => updateRoadmapStep(step.step, 'Completed')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Complete</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => updateRoadmapStep(step.step, 'Recommended')}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 transition"
                    >
                      Reopen Step
                    </button>
                  )}
                </div>
              </div>

              {/* Resource recommendations for this step */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Curated Learning Resources:</span>
                </span>
                {step.resources.map(res => (
                  <span
                    key={res.name}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs bg-slate-950/70 border border-slate-800 text-slate-300"
                  >
                    <span className="text-[10px] text-cyan-400 font-mono">[{res.type}]</span>
                    <span>{res.name}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
