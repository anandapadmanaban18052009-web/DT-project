import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Sparkles,
  GitFork,
  FolderGit2,
  HelpCircle,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerMatchResult } from '../../types';

export const CareerMatchingPage: React.FC = () => {
  const {
    careerMatches,
    selectedCareerId,
    setSelectedCareerId,
    setActiveTab,
    profile,
    updateProfile
  } = useApp();

  // Find currently selected career detail
  const activeDetailMatch =
    careerMatches.find(m => m.career.id === selectedCareerId) || careerMatches[0];

  const handleSetTargetCareer = (title: string) => {
    updateProfile({
      ...profile,
      careerGoal: title
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>AI MATCHING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Career Compatibility Matching
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Comparing your skill profile with industry standard competency benchmarks
          </p>
        </div>

        {/* Safety Disclaimer Badge */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-xs">
          <p className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Prototype Estimation</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Match percentages indicate estimated skill overlap, not guaranteed job placement.
          </p>
        </div>
      </div>

      {/* Main Grid: Left List (5 cols) + Right Detail View (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of all Careers with Horizontal Progress Bars */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-semibold uppercase">
            <span>Career Path</span>
            <span>Estimated Fit</span>
          </div>

          {careerMatches.map(match => {
            const isSelected = match.career.id === activeDetailMatch.career.id;
            const isGoal = profile.careerGoal.toLowerCase() === match.career.title.toLowerCase();

            return (
              <div
                key={match.career.id}
                onClick={() => setSelectedCareerId(match.career.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-navy-850 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                    : 'bg-navy-900/80 border-slate-800 hover:border-slate-700 hover:bg-navy-850/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-white">{match.career.title}</h3>
                      {isGoal && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold">
                          Current Goal
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{match.career.category}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-white font-mono">
                      {match.matchPercentage}%
                    </span>
                    <p className="text-[10px] text-slate-400">{match.readinessLevel} Fit</p>
                  </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      match.matchPercentage >= 75
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        : match.matchPercentage >= 60
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                    style={{ width: `${match.matchPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/60">
                  <span className="text-emerald-400">✓ {match.matchingSkills.length} matching</span>
                  <span className="text-amber-400">⚠ {match.missingSkills.length} missing</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Drill-Down Card */}
        <div className="lg:col-span-7 rounded-2xl bg-navy-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl space-y-6 sticky top-24">
          {/* Header of Detailed Career */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {activeDetailMatch.career.category}
                </span>
                <span className="text-xs text-slate-400">• Growth: {activeDetailMatch.career.growthRate}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                {activeDetailMatch.career.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                {activeDetailMatch.career.shortDescription}
              </p>
            </div>

            {/* Match Circle / Badge */}
            <div className="flex flex-col items-center sm:items-end justify-center bg-cyan-950/60 border border-cyan-800/80 px-4 py-3 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Estimated Match</span>
              <span className="text-3xl font-black text-cyan-300 font-mono">
                {activeDetailMatch.matchPercentage}%
              </span>
              <span className="text-[10px] text-slate-400">{activeDetailMatch.readinessLevel} Readiness</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Avg Salary</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{activeDetailMatch.career.avgSalary}</p>
            </div>
            <div className="border-x border-slate-800">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Market Demand</p>
              <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">{activeDetailMatch.career.marketDemand}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Missing Skills</p>
              <p className="text-xs sm:text-sm font-bold text-amber-400 mt-0.5">{activeDetailMatch.missingSkills.length} Skills</p>
            </div>
          </div>

          {/* Section: Skills You Have */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Skills You Have ({activeDetailMatch.matchingSkills.length})</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeDetailMatch.matchingSkills.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No direct matching skills yet.</p>
              ) : (
                activeDetailMatch.matchingSkills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-950/70 text-emerald-300 border border-emerald-800/70 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{skill}</span>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Section: Skills You Need */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Skills You Need ({activeDetailMatch.missingSkills.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeDetailMatch.missingSkills.map(missing => (
                <div
                  key={missing.skill}
                  className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start space-x-2"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-white">{missing.skill}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        missing.priority === 'High'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {missing.priority}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">{missing.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Why This Career? */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Why This Career?</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeDetailMatch.whyThisCareer}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <button
              onClick={() => handleSetTargetCareer(activeDetailMatch.career.title)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Set as Target Career Goal
            </button>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('projects')}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold bg-purple-950/80 hover:bg-purple-900/80 text-purple-300 border border-purple-800 transition flex items-center justify-center gap-1"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/30 transition flex items-center justify-center gap-1"
              >
                <span>Follow Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
