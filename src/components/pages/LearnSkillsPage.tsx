import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Code2,
  FolderGit2,
  GraduationCap,
  Layers,
  Check,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SKILL_LEARNING_RESOURCES, getFallbackLearningResource } from '../../data/learningResources';
import { SkillLearningResource } from '../../types';

export const LearnSkillsPage: React.FC = () => {
  const {
    currentCareerMatch,
    selectedCareer,
    currentUser,
    profile,
    updateSkillStatus,
    setActiveTab
  } = useApp();

  const missingSkills = currentCareerMatch.missingSkills || [];
  const skillProgress = currentUser?.skillProgress || {};

  // Currently focused skill for the detailed learning hub
  const [selectedSkillName, setSelectedSkillName] = useState<string>(() => {
    return missingSkills[0]?.skill || 'Statistics';
  });

  // Get active skill resource
  const activeResource: SkillLearningResource =
    SKILL_LEARNING_RESOURCES[selectedSkillName] ||
    getFallbackLearningResource(selectedSkillName);

  const currentStatus = skillProgress[selectedSkillName] || 'Not Started';

  const handleStatusChange = async (status: 'Not Started' | 'In Progress' | 'Completed') => {
    if (updateSkillStatus) {
      await updateSkillStatus(selectedSkillName, status);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-850 p-6 sm:p-8 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dedicated Learning Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Learn Missing Skills
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Targeted curriculum and free verified tutorials from Google ML Education, freeCodeCamp,
              W3Schools, Kaggle Learn, and Microsoft Learn to close your skill gaps for{' '}
              <span className="text-cyan-400 font-bold">{selectedCareer.title}</span>.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-navy-950/80 border border-slate-800 p-3.5 rounded-xl shrink-0">
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-2xl font-black text-white">{missingSkills.length}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Total Gaps</p>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-2xl font-black text-cyan-400">
                {Object.values(skillProgress).filter(s => s === 'In Progress').length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-cyan-400">In Progress</p>
            </div>
            <div className="text-center px-3">
              <p className="text-2xl font-black text-emerald-400">
                {Object.values(skillProgress).filter(s => s === 'Completed').length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-emerald-400">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Skill Directory & Right Active Skill Learning Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Missing Skills Catalog */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Identified Skill Gaps ({missingSkills.length})
            </h3>
            <span className="text-[11px] text-cyan-400">Click to Learn</span>
          </div>

          {missingSkills.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">No Missing Skills Detected!</p>
              <p className="text-xs text-slate-400 mt-1">
                You have matched all benchmark requirements for {selectedCareer.title}.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {missingSkills.map((gap, index) => {
                const isSelected = selectedSkillName === gap.skill;
                const status = skillProgress[gap.skill] || 'Not Started';

                return (
                  <div
                    key={gap.skill}
                    onClick={() => setSelectedSkillName(gap.skill)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 via-navy-850 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10 scale-[1.01]'
                        : 'bg-navy-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center border border-slate-700">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{gap.skill}</h4>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                          status === 'Completed'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : status === 'In Progress'
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-2">
                      {gap.recommendation}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                      <span className="text-slate-500">{gap.category}</span>
                      <span className="text-cyan-400 font-semibold flex items-center gap-1">
                        <span>Learn Skill</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Target Career Switch Helper */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400">Targeting Role</p>
              <p className="text-xs font-bold text-white">{selectedCareer.title}</p>
            </div>
            <button
              onClick={() => setActiveTab('career-matching')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Change Role</span>
            </button>
          </div>
        </div>

        {/* Right Column: Deep Learning Curriculum for Selected Skill */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-navy-900/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            {/* Active Skill Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {activeResource.category}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">
                    Recommended Order #{activeResource.recommendedOrder}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
                  <span>{activeResource.skillName}</span>
                </h2>
              </div>

              {/* Status Selector Buttons */}
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
                {(['Not Started', 'In Progress', 'Completed'] as const).map(status => {
                  const isActive = currentStatus === status;
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? status === 'Completed'
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                            : status === 'In Progress'
                            ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                            : 'bg-slate-700 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {status === 'Completed' && <Check className="w-3.5 h-3.5 inline mr-1" />}
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Why This Skill Is Important */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Why This Skill Is Essential for Your Career
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeResource.importance}
              </p>
            </div>

            {/* Beginner-Friendly Learning Resources (freeCodeCamp, W3Schools, Kaggle, etc.) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Curated Free Learning Resources & Tutorials</span>
                </h3>
                <span className="text-[11px] text-slate-400">100% Free & Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeResource.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {res.provider}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">Free Access</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition line-clamp-2">
                        {res.title}
                      </h4>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 pt-2 border-t border-slate-800/60">
                      <span className="text-[11px] font-medium">{res.type}</span>
                      <span className="flex items-center gap-1 font-bold">
                        <span>Open Resource</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Hands-on Practice Exercises</span>
              </h3>
              <div className="space-y-2.5">
                {activeResource.practiceExercises.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-200">
                          Exercise {i + 1}: {ex.title}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                            ex.difficulty === 'Beginner'
                              ? 'bg-emerald-950 text-emerald-400'
                              : ex.difficulty === 'Intermediate'
                              ? 'bg-amber-950 text-amber-400'
                              : 'bg-rose-950 text-rose-400'
                          }`}
                        >
                          {ex.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{ex.prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini-Project Suggestion */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>Recommended Mini-Project to Master {activeResource.skillName}</span>
              </h3>
              {activeResource.miniProjects.map((proj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 border border-slate-800"
                >
                  <h4 className="text-xs font-bold text-cyan-300">{proj.title}</h4>
                  <p className="text-xs text-slate-300 mt-1">{proj.description}</p>
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="text-cyan-400 font-bold shrink-0">Portfolio Outcome:</span>
                    <span>{proj.expectedOutcome}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-400">
                Marking this skill as <span className="text-emerald-400 font-bold">Completed</span> automatically adds it to your profile and updates your career match percentage.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange('Completed')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Skill Completed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
