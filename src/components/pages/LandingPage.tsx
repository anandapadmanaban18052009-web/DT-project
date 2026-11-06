import React from 'react';
import {
  Sparkles,
  ArrowRight,
  UserPlus,
  Cpu,
  Brain,
  Compass,
  AlertTriangle,
  GitFork,
  CheckCircle2,
  Target,
  LogIn,
  Layers,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  LineChart,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab, isAuthenticated, isProfileCompleted } = useApp();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setActiveTab('register');
    } else if (!isProfileCompleted) {
      setActiveTab('onboarding');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogin = () => {
    if (!isAuthenticated) {
      setActiveTab('login');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 overflow-hidden relative pb-16">
      {/* Background Gradients & Mesh Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-500/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-96 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        {/* Project Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 shadow-lg shadow-cyan-500/10">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">AI Career Intelligence System</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Enterprise Talent & Workforce Platform</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Discover the Right Career.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Build the Right Skills.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            An AI-powered platform that connects skills, career opportunities, and personalized learning.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-750 hover:border-cyan-500/50 shadow-lg transition-all flex items-center justify-center space-x-2 group"
            >
              <LogIn className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>{isAuthenticated ? 'My Account' : 'Sign In'}</span>
            </button>
          </div>
        </div>

        {/* Platform Architecture Visual Flow */}
        <div className="mt-16 max-w-5xl mx-auto relative">
          {/* Central AI Career Pipeline Card */}
          <div className="rounded-3xl bg-gradient-to-b from-navy-850/90 to-navy-900/95 border border-slate-700/70 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500/80" />
                <span className="w-3 h-3 rounded-full bg-blue-500/80" />
                <span className="w-3 h-3 rounded-full bg-purple-500/80" />
                <span className="text-xs text-slate-400 ml-2 font-mono">ai_workforce_intelligence_framework.v2</span>
              </div>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60">
                AI & Data Science Core
              </span>
            </div>

            {/* Pipeline Step Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/60">
                  <span className="font-bold text-xs">01</span>
                </div>
                <h4 className="text-sm font-bold text-white">Skill Profiling</h4>
                <p className="text-[11px] text-slate-400">Skills, Projects, Education</p>
              </div>

              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-5 h-5 text-cyan-500/60 animate-pulse" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800/60">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">AI Analysis</h4>
                <p className="text-[11px] text-slate-400">Multi-attribute scoring engine</p>
              </div>

              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-5 h-5 text-blue-500/60 animate-pulse" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center border border-purple-800/60">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Career Alignment</h4>
                <p className="text-[11px] text-slate-400">Match percentage & pathways</p>
              </div>
            </div>

            {/* Second Row for Skill Gaps & Roadmap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/80">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-amber-950 flex items-center justify-center border border-amber-700/60 text-amber-400 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Skill Gap Detection</h4>
                  <p className="text-xs text-slate-300">
                    Pinpoints missing prerequisites prioritized into High, Medium, and Low categories.
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

      {/* Platform Key Capabilities & Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
            Intelligent Workforce Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            An End-to-End Ecosystem for Students and Recruiters
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Inspired by Eightfold talent intelligence, bridging academic preparation with real industry expectations through transparent AI data science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-cyan-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800 mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Personalized Career Mapping</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              AI evaluates your technical skills, programming languages, and practical projects to accurately rank compatibility across Data Science, ML, AI Engineering, and Analytics roles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-purple-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center border border-purple-800 mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Direct Learning Navigation</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              When missing skills are identified, access curated free courses and interactive exercises from freeCodeCamp, W3Schools, Kaggle Learn, and Google ML Education with live progress synchronization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-pink-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-pink-950 text-pink-400 flex items-center justify-center border border-pink-800 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Fairness & Bias Shield</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Recruiter candidate matching is performed strictly against verified competencies, coursework, and projects. Zero consideration is given to protected demographic characteristics.
            </p>
          </div>
        </div>

        {/* Call to action footer */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-navy-900 to-purple-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Ready to explore your career possibilities?</h3>
            <p className="text-xs text-slate-400 mt-1">Create your isolated account in seconds and unlock personalized recommendations.</p>
          </div>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 transition shrink-0"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};
