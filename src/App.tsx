import React, { useState } from 'react';
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
import { JobManagementPage } from './components/pages/recruiter/JobManagementPage';
import { CandidateMatchingPage } from './components/pages/recruiter/CandidateMatchingPage';
import { DataSciencePage } from './components/pages/DataSciencePage';
import { AboutPage } from './components/pages/AboutPage';

const MainContent: React.FC = () => {
  const { activeTab, isAuthenticated, isProfileCompleted, currentUser } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Role-aware and view-aware routing
  const renderActiveView = () => {
    switch (activeTab) {
      case 'onboarding':
        return <OnboardingPage />;
      case 'settings':
        return <SettingsPage />;
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
        if (currentUser?.role === 'recruiter') {
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
