import React, { useState } from 'react';
import {
  Cpu,
  Brain,
  FileText,
  Search,
  Network,
  Share2,
  Database,
  Sliders,
  CheckCircle2,
  Layers,
  ArrowRight,
  Code,
  Sparkles,
  Terminal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIEnginePage: React.FC = () => {
  const { profile, currentCareerMatch } = useApp();
  const [activeModule, setActiveModule] = useState<'nlp' | 'ml' | 'ds' | 'recsys' | 'similarity'>('similarity');

  const modules = [
    {
      id: 'nlp' as const,
      name: 'Natural Language Processing (NLP)',
      shortName: 'NLP Module',
      badge: 'Unstructured Extraction',
      description: 'Extracts skills, certifications, and technical entities from resumes and project narratives using tokenization, entity recognition, and dictionary matching.',
      codeSnippet: `# Python / Spacy / HuggingFace Concept
def extract_skills(resume_text):
    doc = nlp(resume_text)
    entities = [ent.text for ent in doc.ents if ent.label_ == "SKILL"]
    return normalize_taxonomy(entities)`
    },
    {
      id: 'similarity' as const,
      name: 'Similarity Matching',
      shortName: 'Similarity Engine',
      badge: 'Vector Comparison',
      description: 'Compares student skill vectors against benchmark competency matrices using weighted Jaccard similarity and Cosine distance on normalized skill spaces.',
      codeSnippet: `# Cosine Similarity Scoring
from sklearn.metrics.pairwise import cosine_similarity
similarity_score = cosine_similarity(
    student_vector,
    target_role_benchmark
)[0][0]`
    },
    {
      id: 'ml' as const,
      name: 'Machine Learning',
      shortName: 'ML Inference',
      badge: 'Predictive Fit',
      description: 'Analyzes multi-variate career suitability, weighting academic department, completed projects, and skill depth to project career readiness.',
      codeSnippet: `# ML Classifier / XGBoost Ranker
y_pred_proba = model.predict_proba(student_features)
career_readiness_pct = round(y_pred_proba[target_class] * 100)`
    },
    {
      id: 'ds' as const,
      name: 'Data Science',
      shortName: 'Analytics Pipeline',
      badge: 'Telemetry & Benchmarking',
      description: 'Processes macroeconomic labor analytics, job listing vacancies, salary trajectories, and skill obsolescence trends across tech sectors.',
      codeSnippet: `# Pandas Data Aggregation
market_demand_df = df.groupby('job_role').agg(
    open_vacancies=('id', 'count'),
    mean_salary=('salary', 'mean'),
    top_demanded_skills=('skills', lambda x: x.mode()[0])
)`
    },
    {
      id: 'recsys' as const,
      name: 'Recommendation System',
      shortName: 'Rec Engine',
      badge: 'Curriculum Generation',
      description: 'Recommends high-affinity career alternatives, project ideas to bridge specific deficits, and step-by-step learning roadmaps.',
      codeSnippet: `# Content-Based Career Recommendation
def recommend_gap_projects(missing_skills, project_corpus):
    scored = [(proj, len(set(proj.skills) & set(missing_skills))) 
              for proj in project_corpus]
    return sorted(scored, key=lambda x: x[1], reverse=True)[:3]`
    }
  ];

  const currentMod = modules.find(m => m.id === activeModule) || modules[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
          <Cpu className="w-4 h-4" />
          <span>SYSTEM ARCHITECTURE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          AI Career Intelligence Engine
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Visualizing the core data science, NLP, and machine learning components powering skill matching
        </p>
      </div>

      {/* Central Visual Architecture Diagram */}
      <div className="rounded-3xl bg-navy-900/90 border border-slate-800 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
            Eightfold Architectural Paradigm
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
            Integrated AI Intelligence Framework
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click any surrounding module to inspect its mathematical formulation and operational logic.
          </p>
        </div>

        {/* Dynamic Connected Node Layout */}
        <div className="relative max-w-4xl mx-auto py-8">
          {/* Central AI Engine Hub */}
          <div className="mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-600 to-purple-600 p-[2px] shadow-2xl shadow-cyan-500/20 flex items-center justify-center relative z-20 animate-pulse-slow">
            <div className="w-full h-full bg-navy-950 rounded-full flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center mb-2">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Core Engine</span>
              <h3 className="text-sm font-extrabold text-white">AI CAREER CORE</h3>
              <p className="text-[10px] text-slate-400 mt-1">Multi-Attribute Match</p>
            </div>
          </div>

          {/* Connected Satellite Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-10 relative z-20">
            {modules.map(mod => {
              const isActive = activeModule === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-center flex flex-col items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-b from-cyan-950/90 to-navy-900 border-cyan-400 shadow-xl shadow-cyan-950/60 ring-2 ring-cyan-500/30'
                      : 'bg-navy-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-slate-800 text-slate-300">
                      {mod.badge}
                    </span>
                    <h4 className="text-xs font-bold text-white">{mod.shortName}</h4>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {mod.name}
                    </p>
                  </div>
                  <button
                    className={`mt-3 text-[10px] font-semibold flex items-center gap-1 ${
                      isActive ? 'text-cyan-300' : 'text-slate-400'
                    }`}
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Module Detail & Code Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Module Overview */}
        <div className="lg:col-span-5 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400">
            <Brain className="w-4 h-4" />
            <span>MODULE DEEP-DIVE</span>
          </div>

          <h3 className="text-xl font-bold text-white">{currentMod.name}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{currentMod.description}</p>

          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">How It Functions in This System:</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Standardizes arbitrary resume input into a canonical skill vector.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Weights primary requirements higher than peripheral credentials.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Produces transparent, explainable recommendations without black-box lock-in.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Code & Architecture Specification */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-6 backdrop-blur-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 font-semibold">{currentMod.id}_implementation_spec.py</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Python 3.11</span>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900/90 text-cyan-300 overflow-x-auto leading-relaxed border border-slate-800/80">
            <code>{currentMod.codeSnippet}</code>
          </pre>

          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800/80 text-[11px] text-slate-400 font-sans">
            <span className="font-semibold text-slate-300">College Project Architecture Note: </span>
            The live prototype in this app uses a pure TypeScript engine (`src/services/careerEngine.ts`), allowing easy client-side execution without requiring paid third-party API keys or heavy GPU servers.
          </div>
        </div>
      </div>
    </div>
  );
};
