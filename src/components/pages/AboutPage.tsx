import React from 'react';
import {
  Info,
  Sparkles,
  BookOpen,
  Cpu,
  Target,
  Code2,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Layers,
  Terminal,
  FileCode2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
          <Info className="w-4 h-4" />
          <span>PROJECT DOCUMENTATION & MOTIVATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          AI Career Intelligence System
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          An Artificial Intelligence & Data Science College Capstone Project inspired by Eightfold’s Talent Intelligence Paradigm
        </p>
      </div>

      {/* 3 Pillars Grid: Problem, Inspiration, Solution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* The Problem */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center border border-rose-800/60 font-bold">
            !
          </div>
          <h3 className="text-base font-bold text-white">The Problem</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Students frequently possess scattered technical skills, coursework credentials, and portfolio projects,
            yet lack objective clarity on which specific industry careers align with their profile, or exactly
            which critical gaps prevent them from clearing recruitment benchmarks.
          </p>
        </div>

        {/* The Inspiration */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-purple-500/30 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center border border-purple-800/60 font-bold">
            8F
          </div>
          <h3 className="text-base font-bold text-white">Eightfold Inspiration</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Inspired by the Eightfold enterprise problem statement:
            <span className="italic text-purple-300 block mt-1">
              “Enhancing talent acquisition and management with AI-driven recruitment and workforce solutions.”
            </span>
            Shifting from static keyword search to holistic competency taxonomies.
          </p>
        </div>

        {/* The Proposed Solution */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-cyan-500/30 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/60 font-bold">
            AI
          </div>
          <h3 className="text-base font-bold text-white">Proposed Solution</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            An end-to-end AI & Data Science web application that parses a student's profile or resume,
            computes transparent compatibility scores against industry benchmarks, identifies prioritized skill gaps,
            and serves an actionable step-by-step roadmap.
          </p>
        </div>
      </div>

      {/* Technologies Used Section */}
      <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <span>Core Technologies & AI Principles</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-cyan-300">React + Vite</p>
            <p className="text-[11px] text-slate-400 mt-1">Responsive component-driven architecture</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-cyan-300">TypeScript</p>
            <p className="text-[11px] text-slate-400 mt-1">Strict type definitions & schema safety</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-cyan-300">Tailwind CSS</p>
            <p className="text-[11px] text-slate-400 mt-1">Dark navy AI SaaS design system</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-cyan-300">Recharts</p>
            <p className="text-[11px] text-slate-400 mt-1">Radars, bars, and talent telemetry charts</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-purple-300">NLP Concepts</p>
            <p className="text-[11px] text-slate-400 mt-1">Resume text tokenization & skill entity extraction</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-purple-300">Similarity Matching</p>
            <p className="text-[11px] text-slate-400 mt-1">Normalized multi-attribute Jaccard overlap</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-purple-300">Recommendation System</p>
            <p className="text-[11px] text-slate-400 mt-1">Content-based project & roadmap generation</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p className="text-xs font-bold text-purple-300">Machine Learning Design</p>
            <p className="text-[11px] text-slate-400 mt-1">Suitability scoring & ranking pipeline</p>
          </div>
        </div>
      </div>

      {/* Academic Transparency & Extensibility Notice */}
      <div className="rounded-2xl bg-slate-950 border border-cyan-500/30 p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 text-sm font-bold text-cyan-400">
          <Terminal className="w-5 h-5" />
          <span>Extensibility & Real ML Model Integration Guide</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          In this college prototype, the scoring algorithm and keyword extractor are intentionally decoupled
          from the presentation components and isolated inside <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">src/services/careerEngine.ts</code>.
        </p>

        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Steps to Swap in a Trained Machine Learning Model:
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
            <li>
              <strong className="text-white">Train an embedding model:</strong> Use Python with <code className="text-cyan-300">sentence-transformers (all-MiniLM-L6-v2)</code> to vectorize candidate resumes and role competency descriptions.
            </li>
            <li>
              <strong className="text-white">Deploy a lightweight API:</strong> Host a FastAPI microservice returning cosine similarities:
              <pre className="p-2.5 rounded bg-slate-900 text-cyan-300 font-mono mt-1 text-[11px]">
                similarity = cosine_similarity(student_embedding, role_embedding)
              </pre>
            </li>
            <li>
              <strong className="text-white">Update careerEngine.ts:</strong> Change <code className="text-cyan-300">calculateCareerMatch()</code> to invoke your FastAPI endpoint asynchronously instead of the weighted formula.
            </li>
          </ol>
        </div>
      </div>

      {/* Safety & Accuracy Principle */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/90 flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-300">Responsible AI & Evaluation Principle:</p>
          <p className="leading-relaxed">
            This system utilizes non-deterministic guidance terminology such as “Estimated Fit”, “Recommended Pathway”,
            and “Potential Match”. It does not guarantee employment or predict academic certainty, adhering to
            ethical AI guidelines in talent technology.
          </p>
        </div>
      </div>
    </div>
  );
};
