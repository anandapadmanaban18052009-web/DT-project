import React from 'react';
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Compass,
  ArrowRight,
  GitFork,
  FolderGit2,
  FileSearch,
  ExternalLink,
  Target,
  BarChart2,
  Briefcase
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const StudentDashboard: React.FC = () => {
  const {
    profile,
    careerMatches,
    currentCareerMatch,
    setSelectedCareerId,
    setActiveTab,
    setIsProfileModalOpen
  } = useApp();

  // Top 3 matching roles for quick display
  const topMatches = careerMatches.slice(0, 4);

  // Radar chart data comparing Student Profile vs Target Role requirement
  const radarData = [
    { subject: 'Python & Lang', student: 90, target: 85, fullMark: 100 },
    { subject: 'SQL & Data', student: 80, target: 90, fullMark: 100 },
    { subject: 'Machine Learning', student: 75, target: 85, fullMark: 100 },
    { subject: 'Statistics & Math', student: 40, target: 80, fullMark: 100 },
    { subject: 'Deep Learning', student: 30, target: 75, fullMark: 100 },
    { subject: 'MLOps / Tools', student: 50, target: 70, fullMark: 100 },
  ];

  const strongSkillsCount = currentCareerMatch.matchingSkills.length;
  const missingSkillsCount = currentCareerMatch.missingSkills.length;
  const totalSkillsCount = profile.skills.length;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 border border-slate-800/90 p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Career Intelligence Active</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Eightfold Prototype</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{profile.name}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Here is your current career intelligence. The system has analyzed your {totalSkillsCount} skills,
              academic department ({profile.department}), and {profile.projects.length} portfolio projects against industry profiles.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
            >
              Update Profile & Skills
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition flex items-center gap-1.5"
            >
              <span>View Learning Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Career Readiness */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden shadow-lg shadow-cyan-950/20 group hover:border-cyan-500/60 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Career Readiness</span>
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/50">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{currentCareerMatch.matchPercentage}%</span>
            <span className="text-xs text-cyan-300 font-semibold">{currentCareerMatch.readinessLevel} Readiness</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${currentCareerMatch.matchPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Target Goal: {profile.careerGoal} *Calculated</p>
        </div>

        {/* Card 2: Skills Identified */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden shadow-lg group hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Skills Identified</span>
            <div className="p-2 rounded-xl bg-blue-950 text-blue-400 border border-blue-800/50">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{totalSkillsCount}</span>
            <span className="text-xs text-slate-400">Technical Assets</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 truncate">
            {profile.skills.slice(0, 3).join(', ')} +{Math.max(0, totalSkillsCount - 3)} more
          </p>
          <p className="text-[10px] text-slate-400 mt-2">*Verified from profile & resume</p>
        </div>

        {/* Card 3: Strong Skills */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-emerald-500/30 backdrop-blur-xl relative overflow-hidden shadow-lg group hover:border-emerald-500/60 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Strong Skills</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/50">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{strongSkillsCount}</span>
            <span className="text-xs text-emerald-300">Direct Fit Matches</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {currentCareerMatch.matchingSkills.slice(0, 3).map(s => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                ✓ {s}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">*Matched against industry benchmark</p>
        </div>

        {/* Card 4: Skill Gaps */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-amber-500/30 backdrop-blur-xl relative overflow-hidden shadow-lg group hover:border-amber-500/60 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Skill Gaps Found</span>
            <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/50">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{missingSkillsCount}</span>
            <span className="text-xs text-amber-300">Improvement Areas</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {currentCareerMatch.missingSkills.slice(0, 2).map(m => (
              <span key={m.skill} className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
                ⚠ {m.skill}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">*Targeted in roadmap</p>
        </div>
      </div>

      {/* Middle Section: Top Career Matches & Radar Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Career Matches Table / Progress Bars */}
        <div className="lg:col-span-7 rounded-2xl bg-navy-900/70 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Top Suitable Career Matches</span>
              </h3>
              <p className="text-xs text-slate-400">Based on multi-attribute skill correlation scoring</p>
            </div>
            <button
              onClick={() => setActiveTab('career-matching')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View All ({careerMatches.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Matches List */}
          <div className="space-y-4">
            {topMatches.map(match => {
              const isSelected = match.career.id === currentCareerMatch.career.id;
              return (
                <div
                  key={match.career.id}
                  onClick={() => {
                    setSelectedCareerId(match.career.id);
                    setActiveTab('career-matching');
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/70 border-cyan-500/60 shadow-md shadow-cyan-950/30'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{match.career.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {match.career.category}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                          Target Goal
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-extrabold text-cyan-400 font-mono">
                      {match.matchPercentage}%
                    </span>
                  </div>

                  {/* Horizontal Progress Bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        match.matchPercentage >= 75
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          : match.matchPercentage >= 60
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}
                      style={{ width: `${match.matchPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span className="truncate max-w-[280px]">
                      Matched: {match.matchingSkills.slice(0, 3).join(', ')}
                    </span>
                    <span className="text-amber-400 font-medium">
                      {match.missingSkills.length} missing skill{match.missingSkills.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-slate-400 italic text-center pt-2">
            * Prototype Match Formula: (Matched Required / Total Required) × 70 + (Important / Total) × 20 + Project Bonus × 10.
          </p>
        </div>

        {/* Right Column (5 cols): Skills Radar & Quick Rationale */}
        <div className="lg:col-span-5 rounded-2xl bg-navy-900/70 border border-slate-800 p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <span>Skill Profile vs Industry Target</span>
            </h3>
            <p className="text-xs text-slate-400">Comparing your proficiency against {currentCareerMatch.career.title}</p>
          </div>

          {/* Recharts Radar */}
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={false} />
                <Radar
                  name="Your Skills"
                  dataKey="student"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="target"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Rationale Box */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Why This Fit?</span>
            </p>
            <p className="leading-relaxed text-slate-400">
              {currentCareerMatch.whyThisCareer}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Examine Skill Gaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <span>Recommended Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Feature Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab('roadmap')}
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-900 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/60 group-hover:scale-110 transition">
              <GitFork className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
          </div>
          <h4 className="text-sm font-bold text-white">Personalized Learning Roadmap</h4>
          <p className="text-xs text-slate-400 mt-1">
            Step-by-step sequential learning curriculum to systematically bridge your missing skills.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('resume-analyzer')}
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-900 border border-slate-800 hover:border-blue-500/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800/60 group-hover:scale-110 transition">
              <FileSearch className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
          </div>
          <h4 className="text-sm font-bold text-white">Resume & Text Skill Extractor</h4>
          <p className="text-xs text-slate-400 mt-1">
            Upload or paste raw resume text to extract technical keywords and generate instant fit scores.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('projects')}
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-900 border border-slate-800 hover:border-purple-500/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center border border-purple-800/60 group-hover:scale-110 transition">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
          </div>
          <h4 className="text-sm font-bold text-white">Recommended Projects to Build</h4>
          <p className="text-xs text-slate-400 mt-1">
            Portfolio projects tailored to your target role designed specifically to prove your weak skills.
          </p>
        </div>
      </div>
    </div>
  );
};
