import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ProfileModal } from './components/common/ProfileModal';
import { AuthPages } from './components/auth/AuthPages';
import { OnboardingPage } from './components/onboarding/OnboardingPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { LandingPage } from './components/pages/LandingPage';
import { StudentDashboard } from './components/pages/StudentDashboard';
import { MyProfilePage } from './components/pages/MyProfilePage';
import { CareerMatchingPage } from './components/pages/CareerMatchingPage';
import { SkillGapPage } from './components/pages/SkillGapPage';
import { LearnSkillsPage } from './components/pages/LearnSkillsPage';
import { AIEnginePage } from './components/pages/AIEnginePage';
import { ResumeAnalyzerPage } from './components/pages/ResumeAnalyzerPage';
import { RoadmapPage } from './components/pages/RoadmapPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { SkillAssessmentPage } from './components/pages/SkillAssessmentPage';
import { JobManagementPage } from './components/pages/recruiter/JobManagementPage';
import { CandidateMatchingPage } from './components/pages/recruiter/CandidateMatchingPage';
import { DataSciencePage } from './components/pages/DataSciencePage';
import { AboutPage } from './components/pages/AboutPage';
import { CareerAIAssistant } from './components/common/CareerAIAssistant';
import { GuidedTour } from './components/common/GuidedTour';
import { Sparkles, Compass } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, isAuthenticated, isProfileCompleted, currentUser, profile, setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [showWelcomeTourBanner, setShowWelcomeTourBanner] = useState(false);

  // Check if first-time student login who hasn't seen the tour
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === 'student' && !profile.hasCompletedTour && isProfileCompleted) {
      setShowWelcomeTourBanner(true);
    }
  }, [isAuthenticated, currentUser?.role, profile.hasCompletedTour, isProfileCompleted]);

  // If user is not logged in: display the professional Login / Register / Forgot Password screen
  if (!isAuthenticated) {
    if (activeTab === 'landing') {
      return (
        <div className="min-h-screen bg-[#050914] text-slate-100 flex flex-col font-sans">
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <main className="flex-1 w-full overflow-y-auto">
            <LandingPage />
          </main>
        </div>
      );
    }

    if (activeTab === 'about') {
      return (
        <div className="min-h-screen bg-[#050914] text-slate-100 flex flex-col font-sans">
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <main className="flex-1 max-w-7xl mx-auto w-full p-6 overflow-y-auto">
            <AboutPage />
          </main>
        </div>
      );
    }

    return (
      <AuthPages
        initialMode={
          activeTab === 'register'
            ? 'register'
            : activeTab === 'forgot-password'
            ? 'forgot-password'
            : 'login'
        }
      />
    );
  }

  // Strict role-aware and authorized routing
  const renderActiveView = () => {
    const isStudent = currentUser?.role === 'student';
    const isRecruiter = currentUser?.role === 'recruiter';

    // Route Guard: Block Students from accessing Recruiter-only views (unless previewing in guided tour)
    if (!isTourOpen && isStudent && (activeTab === 'recruiter-jobs' || activeTab === 'recruiter-matching')) {
      return isProfileCompleted ? <StudentDashboard /> : <OnboardingPage />;
    }

    // Route Guard: Block Recruiters from accessing Student-only views (unless previewing in guided tour)
    if (
      !isTourOpen &&
      isRecruiter &&
      (activeTab === 'dashboard' ||
        activeTab === 'my-profile' ||
        activeTab === 'resume-analyzer' ||
        activeTab === 'skill-assessment' ||
        activeTab === 'skill-gap' ||
        activeTab === 'learn-skills' ||
        activeTab === 'projects' ||
        activeTab === 'roadmap' ||
        activeTab === 'onboarding')
    ) {
      return <JobManagementPage />;
    }

    switch (activeTab) {
      case 'onboarding':
        return <OnboardingPage />;
      case 'settings':
        return <SettingsPage onStartTour={() => setIsTourOpen(true)} />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'my-profile':
        return <MyProfilePage />;
      case 'career-matching':
        return <CareerMatchingPage />;
      case 'skill-gap':
        return <SkillGapPage />;
      case 'learn-skills':
        return <LearnSkillsPage />;
      case 'engine':
        return <AIEnginePage />;
      case 'resume-analyzer':
        return <ResumeAnalyzerPage />;
      case 'skill-assessment':
        return <SkillAssessmentPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'recruiter-jobs':
        return <JobManagementPage />;
      case 'recruiter-matching':
        return <CandidateMatchingPage />;
      case 'data-science':
        return <DataSciencePage />;
      case 'about':
        return <AboutPage />;
      case 'landing':
        return <LandingPage />;
      default:
        if (isRecruiter) {
          return <JobManagementPage />;
        }
        return isProfileCompleted ? <StudentDashboard /> : <OnboardingPage />;
    }
  };

  const isFullWidthView = activeTab === 'landing';

  return (
    <div className="h-screen max-h-screen bg-[#050914] text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Pinned Top Navigation Header (h-16 shrink-0) */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Layout Area below Header */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* Fixed Left Sidebar (Does NOT scroll with page) */}
        {!isFullWidthView && (
          <Sidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Right Dashboard Content Viewport (The ONLY container that scrolls) */}
        <main
          className={`flex-1 h-full overflow-y-auto ${
            isFullWidthView
              ? 'w-full'
              : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full'
          }`}
        >
          {/* Welcome Assistant First-Time Guided Tour Banner */}
          {showWelcomeTourBanner && currentUser?.role === 'student' && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-purple-950/80 border border-cyan-500/40 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl animate-fade-in">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Welcome to your AI Career Journey!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Let's discover your skills and find the right career path with an interactive 7-step guided tour.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setShowWelcomeTourBanner(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWelcomeTourBanner(false);
                    setIsTourOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/25 transition flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Start Guided Tour</span>
                </button>
              </div>
            </div>
          )}

          {renderActiveView()}

          {/* Discreet Integrated Footer inside scrollable view */}
          <footer className="mt-12 pt-6 border-t border-slate-900 pb-6 text-xs text-slate-400">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 AI Career Intelligence System • Artificial Intelligence & Data Science College Project</p>
              <p className="text-[11px] text-slate-400">
                Inspired by Eightfold Talent Intelligence • Multi-User Isolated Environment
              </p>
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Website-Specific Career AI Assistant */}
      <CareerAIAssistant />

      {/* Interactive Guided Website Tour */}
      <GuidedTour isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />

      {/* Universal Profile Modal */}
      <ProfileModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
