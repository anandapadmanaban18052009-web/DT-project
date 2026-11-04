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
import { CareerMatchingPage } from './components/pages/CareerMatchingPage';
import { SkillGapPage } from './components/pages/SkillGapPage';
import { AIEnginePage } from './components/pages/AIEnginePage';
import { ResumeAnalyzerPage } from './components/pages/ResumeAnalyzerPage';
import { RoadmapPage } from './components/pages/RoadmapPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { RecruiterPage } from './components/pages/RecruiterPage';
import { DataSciencePage } from './components/pages/DataSciencePage';
import { AboutPage } from './components/pages/AboutPage';

const MainContent: React.FC = () => {
  const { activeTab, isAuthenticated, isProfileCompleted } = useApp();
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

  // If user is authenticated, route between authenticated views
  const renderActiveView = () => {
    switch (activeTab) {
      case 'onboarding':
        return <OnboardingPage />;
      case 'settings':
        return <SettingsPage />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'career-matching':
        return <CareerMatchingPage />;
      case 'skill-gap':
        return <SkillGapPage />;
      case 'engine':
        return <AIEnginePage />;
      case 'resume-analyzer':
        return <ResumeAnalyzerPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'recruiter':
      case 'candidate-matching':
        return <RecruiterPage />;
      case 'data-science':
        return <DataSciencePage />;
      case 'about':
        return <AboutPage />;
      case 'landing':
        return <LandingPage />;
      default:
        return isProfileCompleted ? <StudentDashboard /> : <OnboardingPage />;
    }
  };

  const isFullWidthView = activeTab === 'landing';

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (rendered on authenticated dashboard pages) */}
        {!isFullWidthView && (
          <Sidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Dynamic Viewport */}
        <main
          className={`flex-1 overflow-y-auto ${
            isFullWidthView ? 'w-full' : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full'
          }`}
        >
          {renderActiveView()}
        </main>
      </div>

      {/* Universal Profile Modal */}
      <ProfileModal />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-navy-950/90 py-3.5 px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AI Career Intelligence System • AI & Data Science College Project</p>
          <p className="text-[11px] text-slate-400">
            Inspired by Eightfold Talent Intelligence • Multi-User Isolated Environment
          </p>
        </div>
      </footer>
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
