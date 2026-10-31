import React from 'react';
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  Cpu,
  Brain,
  Search,
  Compass,
  AlertTriangle,
  GitFork,
  CheckCircle2,
  Users,
  Target,
  BarChart3,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setIsProfileModalOpen, resetToDemo, setViewMode } = useApp();

  const handleStartAnalysis = () => {
    setIsProfileModalOpen(true);
  };

  const handleExploreDemo = () => {
    resetToDemo();
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 overflow-hidden relative">
      {/* Background Gradients & Mesh Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-500/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-96 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        {/* College Project / Eightfold Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 shadow-lg shadow-cyan-500/10">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">AI & Data Science College Project</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Inspired by Eightfold Talent Intelligence</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find the Career That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Fits Your Skills.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            AI analyzes your skills, projects and interests to discover suitable career paths,
            identify skill gaps and create a personalized learning roadmap.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStartAnalysis}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Analyze My Career</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleExploreDemo}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 shadow-lg transition-all flex items-center justify-center space-x-2 group"
            >
              <PlayCircle className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Explore Demo Profile (Alex Rivera)</span>
            </button>
          </div>
        </div>

        {/* Hero Visual: Pipeline Architecture Flow with Floating Metric Cards */}
        <div className="mt-16 max-w-5xl mx-auto relative">
          {/* Floating Metric Badge 1 (Left) */}
          <div className="hidden sm:flex absolute -left-6 top-8 z-20 items-center space-x-3 p-3.5 rounded-2xl bg-navy-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-xl shadow-cyan-950/50 animate-float">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center border border-cyan-500/30">
              <Target className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-slate-400">Career Match</p>
              <p className="text-xl font-extrabold text-cyan-400">87%</p>
              <p className="text-[9px] text-slate-400">*Demo student calculated</p>
            </div>
          </div>

          {/* Floating Metric Badge 2 (Right Top) */}
          <div className="hidden sm:flex absolute -right-6 top-6 z-20 items-center space-x-3 p-3.5 rounded-2xl bg-navy-900/90 backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-purple-950/50 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center border border-purple-500/30">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-slate-400">Skills Analyzed</p>
              <p className="text-xl font-extrabold text-purple-300">12 Skills</p>
              <p className="text-[9px] text-slate-400">*Extracted & mapped</p>
            </div>
          </div>

          {/* Floating Metric Badge 3 (Right Bottom) */}
          <div className="hidden md:flex absolute -right-2 bottom-8 z-20 items-center space-x-3 p-3.5 rounded-2xl bg-navy-900/90 backdrop-blur-xl border border-amber-500/30 shadow-xl shadow-amber-950/50 animate-float" style={{ animationDelay: '2.5s' }}>
            <div className="w-10 h-10 rounded-xl bg-amber-950 flex items-center justify-center border border-amber-500/30">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-slate-400">Skill Gaps Found</p>
              <p className="text-xl font-extrabold text-amber-400">3 Priority Gaps</p>
              <p className="text-[9px] text-slate-400">*Roadmap generated</p>
            </div>
          </div>

          {/* Central AI Career Pipeline Card */}
          <div className="rounded-3xl bg-gradient-to-b from-navy-850/90 to-navy-900/95 border border-slate-700/70 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 ml-2 font-mono">ai_career_intelligence_pipeline.graph</span>
              </div>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60">
                End-to-End Workforce Engine
              </span>
            </div>

            {/* Pipeline Step Grid: 5 Core Phases */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all text-center flex flex-col items-center justify-center space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/60 group-hover:scale-110 transition">
                  <span className="font-bold text-xs">01</span>
                </div>
                <h4 className="text-sm font-bold text-white">Student Profile</h4>
                <p className="text-[11px] text-slate-400">Skills, Projects, Education & Target</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-5 h-5 text-cyan-500/60 animate-pulse" />
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all text-center flex flex-col items-center justify-center space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800/60 group-hover:scale-110 transition">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">AI Analysis</h4>
                <p className="text-[11px] text-slate-400">NLP extraction & multi-attribute scoring</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-5 h-5 text-blue-500/60 animate-pulse" />
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all text-center flex flex-col items-center justify-center space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center border border-purple-800/60 group-hover:scale-110 transition">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Career Match</h4>
                <p className="text-[11px] text-slate-400">Ranked roles with percentage fit</p>
              </div>
            </div>

            {/* Second Row for remaining 2 steps with connect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/80">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-amber-950 flex items-center justify-center border border-amber-700/60 text-amber-400 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Skill Gap Detection</h4>
                  <p className="text-xs text-slate-300">
                    Pinpoints missing prerequisites prioritized into High, Medium, and Bonus categories.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950 flex items-center justify-center border border-cyan-700/60 text-cyan-400 shrink-0">
                  <GitFork className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Personalized Learning Roadmap</h4>
                  <p className="text-xs text-slate-300">
                    Curated sequential steps with interactive progress tracking and portfolio project prompts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eightfold Inspiration & Problem Statement Spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/80">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
                Problem Statement Focus
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                “Enhancing talent acquisition and management with AI-driven recruitment and workforce solutions.”
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Rather than treating careers as static job boards, our system applies modern AI & Data Science principles.
                By mapping student skill taxonomies directly to modern industry requirements, both candidates and campus recruiters
                gain unprecedented transparency into readiness, skill deficits, and developmental roadmaps.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Dual Student & Recruiter Dashboards</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Weighted Prototype Scoring Engine</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Resume NLP Keyword Extractor</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                <p className="text-xs text-slate-400 font-semibold uppercase">For Students</p>
                <p className="text-sm font-bold text-white mt-1">Discover exact career fit & close knowledge gaps</p>
                <button
                  onClick={handleStartAnalysis}
                  className="mt-3 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Start Career Analysis <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-900/50 text-left">
                <p className="text-xs text-purple-400 font-semibold uppercase">For Campus Recruiters</p>
                <p className="text-sm font-bold text-white mt-1">Post job specs & match ranked candidate pool</p>
                <button
                  onClick={() => {
                    setViewMode('recruiter');
                    setActiveTab('recruiter');
                  }}
                  className="mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  Open Recruiter Mode <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
