import React from 'react';
import {
  Cpu,
  UserCheck,
  Briefcase,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Settings,
  UserPlus,
  LogIn,
  Sparkles
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
    currentUser,
    isAuthenticated,
    logout,
    profile
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-navy-950/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & System Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              if (isAuthenticated) {
                setActiveTab(profile.isCompleted ? 'dashboard' : 'onboarding');
              } else {
                setActiveTab('login');
              }
            }}
          >
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
                  v2.5
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Discover Your Skills. Explore Your Career. Build Your Future.
              </p>
            </div>
          </div>

          {/* Center Navigation Shortcuts (for authenticated navigation) */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-2 text-xs bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400">
              <span className="text-cyan-400 font-semibold">
                {viewMode === 'student' ? 'Student Workspace' : 'Recruiter Workspace'}
              </span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-slate-200 capitalize font-medium">{activeTab.replace('-', ' ')}</span>
            </div>
          )}

          {/* Right Action Suite */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isAuthenticated ? (
              <>
                {/* View Mode Toggle: Student vs Recruiter */}
                <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <button
                    onClick={() => {
                      setViewMode('student');
                      if (activeTab === 'recruiter' || activeTab === 'candidate-matching') {
                        setActiveTab(profile.isCompleted ? 'dashboard' : 'onboarding');
                      }
                    }}
                    className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                      viewMode === 'student'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-md shadow-cyan-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Student Career Workspace"
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
                    title="Recruiter Matching Mode"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Recruiter</span>
                  </button>
                </div>

                {/* Profile Pill / Settings Opener */}
                <button
                  onClick={() => setActiveTab('settings')}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 transition"
                  title="Account & Profile Settings"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-semibold text-slate-200 leading-tight">
                      {currentUser?.name?.split(' ')[0] || 'User'}
                    </p>
                    <p className="text-[10px] text-cyan-400 leading-tight">
                      {profile.isCompleted ? 'Profile Active' : 'Setup Profile'}
                    </p>
                  </div>
                </button>

                {/* Log Out Button */}
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    activeTab === 'login'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('register')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTab === 'register'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            {isAuthenticated && (
              <button
                onClick={onMobileMenuToggle}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
