import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ProfileModal } from './components/common/ProfileModal';
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
  const { activeTab, viewMode } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
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
      default:
        return <StudentDashboard />;
    }
  };

  const isLanding = activeTab === 'landing';

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (rendered when not on landing page) */}
        {!isLanding && (
          <Sidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Dynamic Page Content Viewport */}
        <main
          className={`flex-1 overflow-y-auto ${
            isLanding ? 'w-full' : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full'
          }`}
        >
          {renderActiveView()}
        </main>
      </div>

      {/* Universal Profile Modal */}
      <ProfileModal />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 bg-navy-950/90 py-4 px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AI Career Intelligence System • AI & Data Science College Project</p>
          <p className="text-[11px] text-slate-400">
            Inspired by Eightfold Talent Intelligence • Non-commercial educational prototype
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
