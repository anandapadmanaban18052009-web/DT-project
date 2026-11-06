import React, { useState } from 'react';
import {
  UserPlus,
  UserCheck,
  Code2,
  Cpu,
  Compass,
  AlertTriangle,
  GitFork,
  Hammer,
  GraduationCap,
  Building2,
  FileSpreadsheet,
  Users,
  SearchCheck,
  Trophy,
  Eye,
  CheckCircle2,
  CheckSquare,
  ArrowRight,
  Info
} from 'lucide-react';

interface FlowStep {
  step: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const StudentJourneyFlowchart: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4);

  const steps: FlowStep[] = [
    { step: 1, title: 'Student Registration', desc: 'Secure account setup with isolated credential storage', icon: <UserPlus className="w-4 h-4 text-cyan-400" /> },
    { step: 2, title: 'Create Student Profile', desc: 'College, degree, year of study, and academic background', icon: <UserCheck className="w-4 h-4 text-cyan-400" /> },
    { step: 3, title: 'Enter Skills & Projects', desc: 'Core programming languages, toolsets, and demonstrated work', icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
    { step: 4, title: 'AI Career Analysis', desc: 'Multi-dimensional engine compares against industry benchmarks', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { step: 5, title: 'Career Role Matching', desc: 'Percentage alignment across Data Science, ML, AI, & Analytics', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
    { step: 6, title: 'Skill Gap Identification', desc: 'Categorized priority gaps (High, Medium, Low) flagged', icon: <AlertTriangle className="w-4 h-4 text-cyan-400" /> },
    { step: 7, title: 'Personalized Roadmap', desc: 'Structured milestones with direct links to learning platforms', icon: <GitFork className="w-4 h-4 text-cyan-400" /> },
    { step: 8, title: 'Build Projects & Skills', desc: 'Hands-on portfolio assignments to close identified gaps', icon: <Hammer className="w-4 h-4 text-cyan-400" /> },
    { step: 9, title: 'Career Readiness', desc: 'Industry-qualified profile ready for talent acquisition pipelines', icon: <GraduationCap className="w-4 h-4 text-cyan-400" /> }
  ];

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-navy-900/90 via-navy-850 to-slate-900 p-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-cyan-400 uppercase">Interactive Architecture</span>
          </div>
          <h3 className="text-lg font-extrabold text-white mt-1">Student Career Journey Flowchart</h3>
          <p className="text-xs text-slate-400">Nine end-to-end stages from enrollment to industry readiness.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-xl">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Click any node to inspect stage metadata</span>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2 relative">
        {steps.map((s, idx) => {
          const isSelected = activeStep === s.step;
          return (
            <div key={s.step} className="flex flex-col items-center">
              <button
                onClick={() => setActiveStep(s.step)}
                className={`w-full text-left p-3 rounded-xl border transition-all h-full flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400/80 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center border border-slate-700">
                      {s.step}
                    </span>
                    <div className="p-1 rounded-lg bg-navy-950 border border-slate-800">
                      {s.icon}
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 leading-tight mb-1">{s.title}</h4>
                </div>
                <div className="mt-2 text-[10px] text-cyan-400 font-mono">
                  {isSelected ? '● Active View' : 'Stage ' + s.step}
                </div>
              </button>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute" style={{ left: `calc(${((idx + 1) / 9) * 100}% - 8px)`, top: '38%' }}>
                  <ArrowRight className="w-4 h-4 text-slate-600 -translate-x-1/2" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <div className="mt-5 p-4 rounded-xl bg-navy-950/70 border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
            {activeStep}
          </div>
          <div>
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{steps[activeStep - 1].title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                Phase {activeStep <= 3 ? '1: Profile & Skills' : activeStep <= 6 ? '2: AI Intelligence' : '3: Skill Growth'}
              </span>
            </h5>
            <p className="text-xs text-slate-300 mt-0.5">{steps[activeStep - 1].desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Integrated in Live Workspace</span>
        </div>
      </div>
    </div>
  );
};

export const RecruiterJourneyFlowchart: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4);

  const steps: FlowStep[] = [
    { step: 1, title: 'Recruiter Registration', desc: 'Enterprise organizational setup & talent cohort workspace', icon: <Building2 className="w-4 h-4 text-purple-400" /> },
    { step: 2, title: 'Create Job Requirement', desc: 'Title, department, company, experience, and educational requirements', icon: <FileSpreadsheet className="w-4 h-4 text-purple-400" /> },
    { step: 3, title: 'Define Required Skills', desc: 'Mandatory technical skills and preferred secondary competencies', icon: <Code2 className="w-4 h-4 text-purple-400" /> },
    { step: 4, title: 'AI Candidate Matching', desc: 'Automated retrieval & multi-vector applicant scoring', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
    { step: 5, title: 'Candidate Skill Analysis', desc: 'Comparison of candidate projects, verified skills, and job spec', icon: <SearchCheck className="w-4 h-4 text-purple-400" /> },
    { step: 6, title: 'Candidate Ranking', desc: 'Objective fit score ordering (Top Candidate, Strong Match, Potential)', icon: <Trophy className="w-4 h-4 text-purple-400" /> },
    { step: 7, title: 'View Candidate Profiles', desc: 'In-depth profile inspection: GPA, university, projects, and skills', icon: <Eye className="w-4 h-4 text-purple-400" /> },
    { step: 8, title: 'Shortlist Candidates', desc: 'Curate high-potential applicant lists for technical interviews', icon: <CheckSquare className="w-4 h-4 text-purple-400" /> },
    { step: 9, title: 'Recruitment Decision', desc: 'Data-driven hiring conclusion with zero demographic bias', icon: <CheckCircle2 className="w-4 h-4 text-purple-400" /> }
  ];

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-navy-900/90 via-navy-850 to-slate-900 p-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-purple-400 uppercase">Recruitment Intelligence</span>
          </div>
          <h3 className="text-lg font-extrabold text-white mt-1">Recruiter Hiring Journey Flowchart</h3>
          <p className="text-xs text-slate-400">Nine structured phases inspired by Eightfold Talent Acquisition architecture.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/60 border border-purple-800/60 px-3 py-1.5 rounded-xl">
          <Info className="w-4 h-4 text-purple-400" />
          <span>Click any node to inspect stage metadata</span>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2 relative">
        {steps.map((s, idx) => {
          const isSelected = activeStep === s.step;
          return (
            <div key={s.step} className="flex flex-col items-center">
              <button
                onClick={() => setActiveStep(s.step)}
                className={`w-full text-left p-3 rounded-xl border transition-all h-full flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-500/15 border-purple-400/80 shadow-lg shadow-purple-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center border border-slate-700">
                      {s.step}
                    </span>
                    <div className="p-1 rounded-lg bg-navy-950 border border-slate-800">
                      {s.icon}
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 leading-tight mb-1">{s.title}</h4>
                </div>
                <div className="mt-2 text-[10px] text-purple-400 font-mono">
                  {isSelected ? '● Active View' : 'Stage ' + s.step}
                </div>
              </button>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute" style={{ left: `calc(${((idx + 1) / 9) * 100}% - 8px)`, top: '38%' }}>
                  <ArrowRight className="w-4 h-4 text-slate-600 -translate-x-1/2" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <div className="mt-5 p-4 rounded-xl bg-navy-950/70 border border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold">
            {activeStep}
          </div>
          <div>
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{steps[activeStep - 1].title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800">
                Phase {activeStep <= 3 ? '1: Specification' : activeStep <= 6 ? '2: AI Matching' : '3: Selection & Decision'}
              </span>
            </h5>
            <p className="text-xs text-slate-300 mt-0.5">{steps[activeStep - 1].desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Fairness & Bias Shield Enabled</span>
        </div>
      </div>
    </div>
  );
};
