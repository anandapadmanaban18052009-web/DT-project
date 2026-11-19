import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  CheckCircle2,
  UserCheck,
  FileSearch,
  Cpu,
  Brain,
  AlertTriangle,
  FolderGit2,
  GitFork,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

interface TourStep {
  tab: NavigationTab;
  title: string;
  subtitle: string;
  description: string;
  highlightIcon: React.ReactNode;
}

const TOUR_STEPS: TourStep[] = [
  {
    tab: 'my-profile',
    title: '1. My Profile',
    subtitle: 'Build Your Career Identity',
    description:
      'Add your university, department, coursework skills, programming languages, and projects. Your profile forms the foundation for all AI Career Engine calculations.',
    highlightIcon: <UserCheck className="w-5 h-5 text-cyan-400" />
  },
  {
    tab: 'resume-analyzer',
    title: '2. Resume Analyzer',
    subtitle: 'Extract & Verify Skills from PDF / DOCX',
    description:
      'Upload your real resume. Our document parsing engine normalizes aliases, extracts technical competencies, and allows you to review and merge verified skills directly into your profile.',
    highlightIcon: <FileSearch className="w-5 h-5 text-purple-400" />
  },
  {
    tab: 'engine',
    title: '3. AI Career Engine',
    subtitle: 'Mathematical Similarity Matching',
    description:
      'Discover your career fit across industry benchmarks (Data Scientist, Analyst, ML Engineer, AI Engineer, Business Analyst) using our 60% Cosine + 40% Weighted Jaccard similarity algorithm.',
    highlightIcon: <Cpu className="w-5 h-5 text-cyan-400" />
  },
  {
    tab: 'skill-assessment',
    title: '4. Skill Assessment',
    subtitle: 'Test Knowledge with MCQs & Charts',
    description:
      'Evaluate your skills through 5 multiple-choice questions per skill. View your accuracy Pie Chart, skill-wise Bar Graph, and earn verified strength boosts in your Career Engine.',
    highlightIcon: <Brain className="w-5 h-5 text-emerald-400" />
  },
  {
    tab: 'skill-gap',
    title: '5. Skill Gap Analysis',
    subtitle: 'Pinpoint Critical Missing Competencies',
    description:
      'Compare what you know against target role prerequisites. Identify core benchmark requirements versus competitive differentiators to optimize your study time.',
    highlightIcon: <AlertTriangle className="w-5 h-5 text-amber-400" />
  },
  {
    tab: 'projects',
    title: '6. Project Recommendations',
    subtitle: 'Tailored 3–4 Portfolio Projects',
    description:
      'Get personalized project suggestions designed specifically to close your skill gaps. Inspect 4-step implementation roadmaps and add projects directly to your portfolio.',
    highlightIcon: <FolderGit2 className="w-5 h-5 text-purple-400" />
  },
  {
    tab: 'roadmap',
    title: '7. Learning Roadmap',
    subtitle: 'Follow Your Curated Career Path',
    description:
      'Track sequential learning milestones from foundations to production deployment with curated courses, books, and practice platforms.',
    highlightIcon: <GitFork className="w-5 h-5 text-cyan-400" />
  }
];

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ isOpen, onClose }) => {
  const { setActiveTab, completeTour } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setActiveTab(TOUR_STEPS[nextIndex].tab);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setActiveTab(TOUR_STEPS[prevIndex].tab);
    }
  };

  const handleFinish = async () => {
    await completeTour();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="rounded-3xl bg-[#090e1f] border border-cyan-500/40 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={handleFinish}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition"
          title="Skip Tour"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center shadow-lg shadow-cyan-950/40">
            {currentStep.highlightIcon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800">
                Tour Step {currentStepIndex + 1} of {TOUR_STEPS.length}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">{currentStep.title}</h3>
            <p className="text-xs text-purple-300 font-medium">{currentStep.subtitle}</p>
          </div>
        </div>

        {/* Step Description */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
          <p>{currentStep.description}</p>
          <p className="text-[11px] text-cyan-400 flex items-center gap-1 font-semibold pt-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Currently previewing: {currentStep.tab.replace('-', ' ').toUpperCase()}</span>
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center space-x-1.5">
          {TOUR_STEPS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentStepIndex(idx);
                setActiveTab(TOUR_STEPS[idx].tab);
              }}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'w-6 bg-cyan-400'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Tour Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handleFinish}
            className="text-xs text-slate-400 hover:text-white font-medium"
          >
            Skip Tour
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 flex items-center gap-1.5"
            >
              <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
