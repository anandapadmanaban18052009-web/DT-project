import React from 'react';
import {
  LayoutDashboard,
  Compass,
  AlertTriangle,
  GitFork,
  FolderGit2,
  FileSearch,
  Cpu,
  BarChart3,
  Info,
  Users,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
  Settings,
  LogOut,
  UserCheck,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    currentUser,
    profile,
    isProfileCompleted,
    currentCareerMatch,
    logout
  } = useApp();

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  const studentNavItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'career-matching',
      label: 'Career Matching',
      icon: <Compass className="w-4 h-4" />,
      badge: isProfileCompleted ? `${currentCareerMatch.matchPercentage}%` : undefined
    },
    {
      id: 'skill-gap',
      label: 'Skill Gap Analysis',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: isProfileCompleted ? `${currentCareerMatch.missingSkills.length} Gaps` : undefined
    },
    { id: 'roadmap', label: 'Personalized Roadmap', icon: <GitFork className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects to Build', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'resume-analyzer', label: 'Resume / Skill Analyzer', icon: <FileSearch className="w-4 h-4" /> },
    { id: 'engine', label: 'AI Career Engine', icon: <Cpu className="w-4 h-4" /> },
    { id: 'data-science', label: 'Data Science & Market', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const recruiterNavItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'recruiter', label: 'Job Requirements', icon: <BriefcaseBusiness className="w-4 h-4" /> },
    { id: 'candidate-matching', label: 'Candidate Matching', icon: <Users className="w-4 h-4" />, badge: 'Active Cohort' },
    { id: 'data-science', label: 'Talent Market Insights', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'engine', label: 'AI Matching Architecture', icon: <Cpu className="w-4 h-4" /> },
  ];

  const navItems = viewMode === 'student' ? studentNavItems : recruiterNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-slate-800/80 bg-navy-900/95 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* User Status / Target Goal Card */}
          {viewMode === 'student' ? (
            isProfileCompleted ? (
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-navy-850 to-slate-900 border border-slate-800 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Target Career
                  </span>
                  <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                    {currentCareerMatch.matchPercentage}% Fit
                  </span>
                </div>
                <p className="text-sm font-bold text-white truncate">{profile.careerGoal}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {profile.skills.length} skills • {profile.projects?.length || 0} projects
                </p>
                <button
                  onClick={() => handleNavClick('settings')}
                  className="mt-3 w-full py-1.5 px-2.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 flex items-center justify-center gap-1.5 transition"
                >
                  <span>Edit Profile & Skills</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/40 via-navy-850 to-slate-900 border border-cyan-500/40 relative overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Setup Needed
                </span>
                <p className="text-xs text-white font-bold mt-1">Profile Not Completed</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Complete your profile to unlock custom matching & roadmaps.
                </p>
                <button
                  onClick={() => handleNavClick('onboarding')}
                  className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center gap-1 shadow-md shadow-cyan-600/30 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Start Onboarding</span>
                </button>
              </div>
            )
          ) : (
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border border-purple-900/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1">
                  <BriefcaseBusiness className="w-3 h-3" /> Recruiter Mode
                </span>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">
                  Eightfold Engine
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">Candidate Scoring Active</p>
              <p className="text-[11px] text-slate-400 mt-1">Comparing job specs with applicant skill pool.</p>
            </div>
          )}

          {/* Section Links */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {viewMode === 'student' ? 'Career Navigation' : 'Talent Navigation'}
            </p>
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? viewMode === 'student'
                        ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'bg-gradient-to-r from-purple-500/15 to-pink-500/10 text-purple-300 border border-purple-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className={isActive ? (viewMode === 'student' ? 'text-cyan-400' : 'text-purple-400') : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? viewMode === 'student'
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : 'bg-purple-500/20 text-purple-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Account & Settings Links */}
          <div className="space-y-1 pt-3 border-t border-slate-800/80">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Account & Settings
            </p>
            <button
              onClick={() => handleNavClick('settings')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Profile & Settings</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-all"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Global / Info Items */}
          <div className="space-y-1 pt-3 border-t border-slate-800/80">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              System Context
            </p>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>About Project</span>
            </button>
            <button
              onClick={() => handleNavClick('landing')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'landing'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span>Landing Page</span>
            </button>
          </div>
        </div>

        {/* System Footer Note */}
        <div className="p-3 border-t border-slate-800/80 bg-navy-950/60">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              User Isolated Session
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">Active</span>
          </div>
        </div>
      </aside>
    </>
  );
};
