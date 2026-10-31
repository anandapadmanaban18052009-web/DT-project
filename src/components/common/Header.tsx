import React from 'react';
import {
  Sparkles,
  Cpu,
  UserCheck,
  Briefcase,
  PlayCircle,
  Menu,
  X,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    profile,
    resetToDemo,
    setIsProfileModalOpen,
    isCustomProfile
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-navy-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & System Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                  AI CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">INTELLIGENCE</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  v2.4 Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI-Powered Career & Skill Gap Analyzer • Eightfold Problem Statement
              </p>
            </div>
          </div>

          {/* Center Navigation Shortcuts (for Landing & General) */}
          <div className="hidden lg:flex items-center space-x-1 text-sm font-medium text-slate-300">
            {activeTab === 'landing' ? (
              <>
                <button
                  onClick={() => setActiveTab('about')}
                  className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition"
                >
                  About Eightfold Project
                </button>
                <button
                  onClick={() => setActiveTab('engine')}
                  className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  AI Engine
                </button>
                <button
                  onClick={() => setActiveTab('data-science')}
                  className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition"
                >
                  Market Insights
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2 text-xs bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400">
                <span className="text-cyan-400 font-semibold">{viewMode === 'student' ? 'Student Workspace' : 'Recruiter Workspace'}</span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-slate-200 capitalize font-medium">{activeTab.replace('-', ' ')}</span>
              </div>
            )}
          </div>

          {/* Right Action Suite: Mode Switcher, Demo Button, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* View Mode Toggle: Student vs Recruiter */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <button
                onClick={() => {
                  setViewMode('student');
                  if (activeTab === 'recruiter' || activeTab === 'candidate-matching') {
                    setActiveTab('dashboard');
                  }
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                  viewMode === 'student'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Student Career Seeker View"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('recruiter');
                  setActiveTab('recruiter');
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                  viewMode === 'recruiter'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Recruiter Talent Matching View"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recruiter</span>
              </button>
            </div>

            {/* Quick Demo Reset / Load */}
            <button
              onClick={() => {
                resetToDemo();
                if (activeTab === 'landing') {
                  setActiveTab('dashboard');
                }
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/60 transition shadow-sm"
              title="Loads demo profile (Alex - AI & DS student)"
            >
              <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Demo Student</span>
            </button>

            {/* Profile Avatar / Form Opener */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 hover:bg-slate-800/80 transition"
              title="Edit Profile & Skills"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] flex items-center justify-center overflow-hidden">
                <img
                  src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-[7px]"
                />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-200 leading-tight">
                  {profile.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-cyan-400 leading-tight">
                  {isCustomProfile ? 'Custom' : 'AI & DS'}
                </p>
              </div>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={onMobileMenuToggle}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
