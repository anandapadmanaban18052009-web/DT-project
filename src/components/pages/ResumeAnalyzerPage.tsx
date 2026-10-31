import React, { useState } from 'react';
import {
  FileSearch,
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  RotateCcw,
  Compass,
  AlertCircle,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { extractSkillsFromText, calculateCareerMatch } from '../../services/careerEngine';
import { CAREER_ROLES } from '../../data/mockData';

const SAMPLE_RESUMES = [
  {
    title: 'Data & Analytics Sample',
    text: `Final year AI & Data Science undergraduate with experience in Python, SQL, Pandas, and Data Visualization. Built analytical dashboards using Power BI and Excel. Completed academic projects in Machine Learning and predictive statistical modeling using Scikit-Learn and Git.`
  },
  {
    title: 'AI & Deep Learning Sample',
    text: `Aspiring AI Engineer specializing in Python, PyTorch, Deep Learning, and LLMs. Experienced with Vector Databases (ChromaDB), LangChain, Prompt Engineering, Docker, and FastAPI microservice integration.`
  },
  {
    title: 'Full Stack Web Developer Sample',
    text: `Computer Science student experienced in JavaScript, TypeScript, React, HTML, CSS, Node.js, and SQL. Built responsive web applications with REST APIs, Git version control, and relational database schemas.`
  }
];

export const ResumeAnalyzerPage: React.FC = () => {
  const { updateProfile, profile, setActiveTab } = useApp();
  const [inputText, setInputText] = useState(
    'Experienced with Python, SQL, Pandas, Machine Learning, and Power BI. Built predictive data pipelines and exploratory dashboards.'
  );
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [suggestedCareers, setSuggestedCareers] = useState<
    { roleTitle: string; category: string; matchScore: number }[]
  >([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [importedAlert, setImportedAlert] = useState(false);

  const handleAnalyze = () => {
    const skills = extractSkillsFromText(inputText);
    setExtractedSkills(skills);

    // Create temporary mock profile to run match engine
    const tempProfile = {
      ...profile,
      skills: skills.length > 0 ? skills : ['Python', 'SQL']
    };

    const matches = CAREER_ROLES.map(role => {
      const result = calculateCareerMatch(tempProfile, role);
      return {
        roleTitle: role.title,
        category: role.category,
        matchScore: result.matchPercentage
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setSuggestedCareers(matches.slice(0, 4));
    setHasAnalyzed(true);
  };

  const handleApplyToProfile = () => {
    if (extractedSkills.length === 0) return;
    const combinedSkills = Array.from(new Set([...profile.skills, ...extractedSkills]));
    updateProfile({
      ...profile,
      skills: combinedSkills
    });
    setImportedAlert(true);
    setTimeout(() => setImportedAlert(false), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const content = event.target?.result as string;
        if (content) {
          setInputText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
            <FileSearch className="w-4 h-4" />
            <span>NATURAL LANGUAGE PROCESSING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Resume / Skill Text Analyzer
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Extract technical competencies from resume text and simulate career compatibility
          </p>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-sm">
          <p className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Keyword Extraction Engine</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            This module implements local keyword-based dictionary matching (80+ taxonomy terms) as a clean proxy for full NLP NER models.
          </p>
        </div>
      </div>

      {/* Main Grid: Input on Left (6 cols), Results on Right (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Input Resume Text</span>
            </h2>

            {/* File Upload Trigger */}
            <label className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition cursor-pointer flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload .txt / .md</span>
              <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={8}
            placeholder="Paste raw resume synopsis, project descriptions, or LinkedIn summary here..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed resize-none"
          />

          {/* Sample Snippet Quick Buttons */}
          <div>
            <p className="text-[11px] text-slate-400 mb-2">Try Pre-loaded Examples:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_RESUMES.map(sample => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => setInputText(sample.text)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleAnalyze}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Extract Skills & Analyze Fit</span>
            </button>
          </div>
        </div>

        {/* Right Column: Analysis Results */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-400" />
                <span>Extracted Skills Output</span>
              </h2>
              <p className="text-xs text-slate-400">Identified technical tags matching taxonomy</p>
            </div>
            {extractedSkills.length > 0 && (
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
                {extractedSkills.length} Identified
              </span>
            )}
          </div>

          {/* Extracted Skills Badges */}
          <div className="min-h-24 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap gap-2 items-center">
            {extractedSkills.length === 0 ? (
              <div className="text-center w-full py-4 text-xs text-slate-400 italic">
                {hasAnalyzed ? 'No recognizable technical skills identified.' : 'Click "Extract Skills & Analyze Fit" to run keyword detection.'}
              </div>
            ) : (
              extractedSkills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{skill}</span>
                </span>
              ))
            )}
          </div>

          {/* Apply to Student Profile CTA */}
          {extractedSkills.length > 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/60">
              <span className="text-xs text-cyan-200">
                Merge extracted skills with your active profile?
              </span>
              <button
                onClick={handleApplyToProfile}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-sm"
              >
                Apply to Profile
              </button>
            </div>
          )}

          {importedAlert && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Skills successfully imported into your active profile!</span>
            </div>
          )}

          {/* Suggested Careers Based on Extracted Text */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Suggested Careers From Resume</span>
            </h3>

            {suggestedCareers.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Run analysis to view career matches.</p>
            ) : (
              <div className="space-y-2.5">
                {suggestedCareers.map(sc => (
                  <div
                    key={sc.roleTitle}
                    className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{sc.roleTitle}</p>
                      <p className="text-[10px] text-slate-400">{sc.category}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 h-full rounded-full"
                          style={{ width: `${sc.matchScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-cyan-300 font-mono w-10 text-right">
                        {sc.matchScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
