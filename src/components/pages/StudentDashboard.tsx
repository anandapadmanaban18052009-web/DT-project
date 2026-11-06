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
  Briefcase,
  UserCheck,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { computeRadarProficiency } from '../../services/careerEngine';
import { StudentJourneyFlowchart } from '../flowchart/JourneyFlowcharts';
import { BookOpen } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    profile,
    isProfileCompleted,
    careerMatches,
    currentCareerMatch,
    setSelectedCareerId,
    setActiveTab,
    setIsProfileModalOpen
  } = useApp();

  // If user has not completed their profile or has 0 skills: Friendly Empty State
  if (!isProfileCompleted || (profile.skills.length === 0 && (profile.programmingLanguages || []).length === 0)) {
    return (
      <div className="py-12 px-4 max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 border border-cyan-500/30 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized Career Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{currentUser?.name || 'Student'}</span>!
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Your career journey starts here. Complete your profile to discover your career opportunities.
            </p>

            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Tell our AI system about your university background, coursework skills, programming languages,
              and project experience to generate personalized career matching, skill gap analysis, and tailored roadmaps.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab('onboarding')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Complete Your Student Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Step Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-white">Add Your Skills</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              List the programming languages, tools, and frameworks you have practiced.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-white">Attach Projects</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Academic coursework and hobby projects demonstrate practical technology synergy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-white">Unlock Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive your custom compatibility scores, skill-gap alerts, and learning roadmaps.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Active Personalized Dashboard
  const topMatches = careerMatches.slice(0, 4);
  const strongSkillsCount = currentCareerMatch.matchingSkills.length;
  const missingSkillsCount = currentCareerMatch.missingSkills.length;
  const totalSkillsCount = (profile.skills.length || 0) + (profile.programmingLanguages?.length || 0);

  // Compute dynamic radar chart data based on user's actual skills
  const radarData = computeRadarProficiency(profile, currentCareerMatch.career);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 border border-slate-800/90 p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personal Career Intelligence Active</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">Profile 100% Complete</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{profile.name}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Here is your current career intelligence. The system has analyzed your {totalSkillsCount} skills,
              college department ({profile.department || 'Engineering'}), and {profile.projects?.length || 0} projects
              against industry competency benchmarks.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={() => setActiveTab('settings')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
            >
              Update Profile Details
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition flex items-center gap-1.5"
            >
              <span>Personal Roadmap</span>
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
          <p className="text-[10px] text-slate-400 mt-2">Target Goal: {profile.careerGoal}</p>
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
            <span className="text-xs text-slate-400">Verified Assets</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 truncate">
            {profile.skills.slice(0, 3).join(', ')} {profile.skills.length > 3 ? `+${profile.skills.length - 3} more` : ''}
          </p>
          <p className="text-[10px] text-slate-400 mt-2">*From your active student profile</p>
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
            {currentCareerMatch.matchingSkills.length > 0 ? (
              currentCareerMatch.matchingSkills.slice(0, 3).map(s => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  ✓ {s}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-500 italic">No direct matches yet</span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">*Matched for {currentCareerMatch.career.title}</p>
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
            <span className="text-xs text-amber-300">Missing Competencies</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {currentCareerMatch.missingSkills.slice(0, 2).map(m => (
              <span key={m.skill} className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
                ⚠ {m.skill}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">*Targeted in learning roadmap</p>
        </div>
      </div>

      {/* Middle Section: Top Career Matches & Radar Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Career Matches Progress Bars */}
        <div className="lg:col-span-7 rounded-2xl bg-navy-900/70 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Your Career Matches</span>
              </h3>
              <p className="text-xs text-slate-400">Calculated strictly from your skills & projects</p>
            </div>
            <button
              onClick={() => setActiveTab('career-matching')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Explore All ({careerMatches.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
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

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        match.matchPercentage >= 75
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          : match.matchPercentage >= 50
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}
                      style={{ width: `${match.matchPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span className="truncate max-w-[280px]">
                      Matched: {match.matchingSkills.slice(0, 3).join(', ') || 'Building baseline'}
                    </span>
                    <span className="text-amber-400 font-medium">
                      {match.missingSkills.length} missing skill{match.missingSkills.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Dynamic Radar & AI Rationale */}
        <div className="lg:col-span-5 rounded-2xl bg-navy-900/70 border border-slate-800 p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <span>Competency Radar Comparison</span>
            </h3>
            <p className="text-xs text-slate-400">Your profile vs {currentCareerMatch.career.title}</p>
          </div>

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

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Why This Fit?</span>
            </p>
            <p className="leading-relaxed text-slate-400">
              {currentCareerMatch.whyThisCareer}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-slate-800/60">
            <button
              onClick={() => setActiveTab('learn-skills')}
              className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-semibold flex items-center gap-1.5 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Learn Missing Skills</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-3">
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
      </div>

      {/* Student Career Journey Flowchart */}
      <div className="pt-2">
        <StudentJourneyFlowchart />
      </div>

      {/* Feature Tiles */}
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
