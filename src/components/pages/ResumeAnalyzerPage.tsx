import React, { useState } from 'react';
import {
  FileSearch,
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Tag,
  Code2,
  Database,
  Layers,
  Award,
  TrendingDown,
  Briefcase,
  Check,
  X,
  Loader2,
  RefreshCw,
  FolderGit2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Cloud,
  Users,
  Plus,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { extractSkillsFromText, ExtractedResumeSkills, calculateCareerMatch } from '../../services/careerEngine';
import { CAREER_ROLES } from '../../data/mockData';
import { HelperSticker } from '../common/HelperSticker';

const SAMPLE_RESUMES = [
  {
    title: 'Data & Analytics Sample',
    filename: 'Sample_Data_Analyst_Resume.docx',
    text: `Priya Sharma | Final Year B.Tech in AI & Data Science
Education: B.Tech in Artificial Intelligence & Data Science, GPA: 8.9/10
Technical Skills:
- Programming Languages: Python programming, SQL, C++
- Data & Analytics: Pandas library, NumPy, Data Visualization, Power BI, Advanced Excel, Statistics
- Frameworks & ML: Scikit-Learn, Machine Learning algorithms, Linear Regression, Random Forest
- Databases: PostgreSQL, MySQL, Relational Database Design
- Tools & Cloud: Git, GitHub, Jupyter Notebooks, Docker

Projects:
1. Student Performance Early Warning System: Developed predictive regression models using Python and Pandas to forecast student grades with 84% accuracy. Created interactive Power BI dashboards for faculty advisors.
2. Sales Data Analysis Dashboard: Wrote complex SQL queries with Window Functions to analyze retail sales velocity and customer retention cohorts.`
  },
  {
    title: 'AI & Deep Learning Sample',
    filename: 'Sample_AI_Engineer_Resume.pdf',
    text: `Marcus Chen | Aspiring AI & Machine Learning Engineer
Education: B.S. in Computer Science & Statistics (Final Year)
Technical Skills:
- Languages: Python, C++, SQL
- AI & Machine Learning: Deep Learning, PyTorch, Neural Networks, Natural Language Processing, Generative AI, LLMs
- Tools & Cloud: Docker, FastAPI, Git, Linux, LangChain, Vector Databases, ChromaDB
- Data Science: Pandas, NumPy, Statistics, Mathematics

Projects:
1. Multi-Document RAG Knowledge Assistant: Built an enterprise Q&A assistant utilizing LangChain, OpenAI embeddings, and Chroma vector database for semantic retrieval over 500+ research papers.
2. Brain MRI Tumor Segmentation: Implemented U-Net neural network with PyTorch for medical image segmentation achieving 0.91 Dice coefficient. Containerized model using Docker and exposed inference via FastAPI.`
  },
  {
    title: 'Full Stack Web Sample',
    filename: 'Sample_FullStack_Resume.docx',
    text: `Alex Rivera | Software Developer
Education: B.Tech in Computer Science & Engineering
Technical Skills:
- Languages: JavaScript, TypeScript, Python, HTML, CSS, SQL
- Frameworks & Web: React, React.js, Node.js, Express, REST APIs, Tailwind CSS
- Databases: MongoDB, MySQL, SQLite
- Cloud & Tools: Git, GitHub, Docker, Postman, Linux

Projects:
1. Collaborative Kanban Project Board: Built full-stack React and Node.js web application with persistent task management, authentication, and responsive drag-and-drop mechanics.`
  }
];

export const ResumeAnalyzerPage: React.FC = () => {
  const { updateProfile, profile, setActiveTab } = useApp();

  const [inputText, setInputText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [fileSizeBytes, setFileSizeBytes] = useState<number | null>(null);
  const [showRawTextPreview, setShowRawTextPreview] = useState(false);

  // Analysis state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStage, setProgressStage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Extracted data structure
  const [analysisResult, setAnalysisResult] = useState<ExtractedResumeSkills | null>(null);
  const [suggestedCareers, setSuggestedCareers] = useState<
    { roleTitle: string; category: string; matchScore: number }[]
  >([]);

  // Review before Profile Update Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSkillsForProfile, setSelectedSkillsForProfile] = useState<string[]>([]);
  const [customSkillToAdd, setCustomSkillToAdd] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Format bytes for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Run skill extraction and matching on given text
  const performSkillAnalysis = (textToAnalyze: string) => {
    setErrorMessage(null);

    if (!textToAnalyze || textToAnalyze.trim().length < 15) {
      setErrorMessage(
        'Unable to extract readable text from this resume. Please upload a valid PDF or DOCX file.'
      );
      setAnalysisResult(null);
      setSuggestedCareers([]);
      return;
    }

    const result = extractSkillsFromText(textToAnalyze, profile.careerGoal);
    setAnalysisResult(result);

    if (result.allSkills.length === 0) {
      setErrorMessage(
        'No relevant skills were identified. Please check the resume content.'
      );
      setSuggestedCareers([]);
      return;
    }

    // Initialize selected skills for review modal with all extracted skills
    setSelectedSkillsForProfile(result.allSkills);

    // Calculate career recommendations based on student's actual profile augmented with extracted skills
    const simulatedProfile = {
      ...profile,
      skills: Array.from(new Set([...(profile.skills || []), ...result.allSkills])),
      programmingLanguages: Array.from(
        new Set([...(profile.programmingLanguages || []), ...result.programmingLanguages])
      )
    };

    const matches = CAREER_ROLES.map(role => {
      const match = calculateCareerMatch(simulatedProfile, role);
      return {
        roleTitle: role.title,
        category: role.category,
        matchScore: match.matchPercentage
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setSuggestedCareers(matches.slice(0, 5));
  };

  // Handle file upload (PDF, DOCX, TXT, MD)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setErrorMessage(null);
    setAnalysisResult(null);
    setSuggestedCareers([]);

    const fileName = file.name;
    const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt', '.md'];

    // 1. Validate File Type
    if (!allowedExtensions.includes(ext)) {
      setErrorMessage(
        `Unsupported file format "${ext}". Supported formats are PDF and DOCX documents.`
      );
      return;
    }

    // 2. Validate File Size (10MB maximum)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage(
        `File size (${formatFileSize(file.size)}) exceeds the maximum allowed limit of 10 MB. Please upload a smaller resume.`
      );
      return;
    }

    setUploadedFileName(fileName);
    setFileSizeBytes(file.size);
    setIsProcessing(true);
    setProgressPercent(15);
    setProgressStage('Uploading and reading document binary...');

    try {
      if (ext === '.txt' || ext === '.md') {
        // Plain text file: read on client directly
        const reader = new FileReader();
        reader.onload = event => {
          setProgressPercent(60);
          setProgressStage('Extracting text content...');
          const content = event.target?.result as string;
          setInputText(content);
          setTimeout(() => {
            setProgressPercent(90);
            setProgressStage('Analyzing technical competencies & normalizing taxonomy...');
            performSkillAnalysis(content);
            setProgressPercent(100);
            setIsProcessing(false);
          }, 300);
        };
        reader.onerror = () => {
          setIsProcessing(false);
          setErrorMessage('Could not read the uploaded text file. Please try again.');
        };
        reader.readAsText(file);
      } else {
        // PDF or DOCX: Send base64 payload to backend extractor
        setProgressPercent(30);
        setProgressStage('Converting document to secure payload...');

        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64Data = btoa(binary);

        setProgressPercent(55);
        setProgressStage('Parsing document text streams...');

        const response = await fetch('/api/resume/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: fileName,
            base64Data,
            fileType: file.type
          })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setIsProcessing(false);
          setErrorMessage(
            data.message ||
              'Unable to extract readable text from this resume. Please upload a valid PDF or DOCX file.'
          );
          return;
        }

        setProgressPercent(85);
        setProgressStage('Extracting competencies across 8 technical domains...');

        const extractedText = data.text || '';
        setInputText(extractedText);
        performSkillAnalysis(extractedText);

        setProgressPercent(100);
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.error('File parsing error:', err);
      setIsProcessing(false);
      setErrorMessage(
        'Server extraction connection failed. Please ensure the backend server is running, or paste your resume text directly into the text box below.'
      );
    }
  };

  // Open the review modal
  const handleOpenReviewModal = () => {
    if (!analysisResult || analysisResult.allSkills.length === 0) return;
    setSelectedSkillsForProfile(analysisResult.allSkills);
    setIsReviewModalOpen(true);
  };

  // Toggle individual skill in review modal
  const handleToggleSkillSelection = (skill: string) => {
    setSelectedSkillsForProfile(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Select all / Deselect all
  const handleSelectAllSkills = () => {
    if (!analysisResult) return;
    setSelectedSkillsForProfile(analysisResult.allSkills);
  };

  const handleDeselectAllSkills = () => {
    setSelectedSkillsForProfile([]);
  };

  // Add custom manual skill in review modal
  const handleAddManualCustomSkill = () => {
    if (!customSkillToAdd.trim()) return;
    const clean = customSkillToAdd.trim();
    if (!selectedSkillsForProfile.includes(clean)) {
      setSelectedSkillsForProfile(prev => [...prev, clean]);
    }
    setCustomSkillToAdd('');
  };

  // Confirm and update profile with selected extracted skills
  const handleConfirmProfileUpdate = () => {
    if (selectedSkillsForProfile.length === 0) return;

    const currentSkills = profile.skills || [];
    const mergedSkills = Array.from(new Set([...currentSkills, ...selectedSkillsForProfile]));

    // Update skill sources tag in profile
    const currentSources = profile.skillSources ? { ...profile.skillSources } : {};
    selectedSkillsForProfile.forEach(s => {
      if (!currentSources[s]) currentSources[s] = 'resume';
    });

    // Detect if any selected skills are programming languages
    const progLangsList = ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'R', 'Go', 'SQL'];
    const currentLangs = profile.programmingLanguages || [];
    const newLangs = selectedSkillsForProfile.filter(s => progLangsList.includes(s));
    const mergedLangs = Array.from(new Set([...currentLangs, ...newLangs]));

    updateProfile({
      ...profile,
      skills: mergedSkills,
      programmingLanguages: mergedLangs,
      skillSources: currentSources,
      isCompleted: true
    });

    setIsReviewModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
            <FileSearch className="w-4 h-4" />
            <span>RESUME SKILL ANALYZER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Resume Skill Analyzer & Entity Extractor
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Upload PDF or DOCX resumes to extract real text, classify technical competencies across 8 domains, and review before updating your profile
          </p>
        </div>

        {/* Informative engine badge */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-sm">
          <p className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero Hallucination Guarantee</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Extracts only skills actually present in the resume. Never generates fake skills.
          </p>
        </div>
      </div>

      {/* AI Helper Sticker */}
      <HelperSticker featureId="resume-analyzer" />

      {/* Success notification banner */}
      {showSuccessToast && (
        <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-700 text-emerald-200 text-xs flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Profile Successfully Updated!</p>
              <p className="text-emerald-300">
                Your approved resume skills have been added to your profile. The AI Career Engine has recalculated your career match scores!
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition"
          >
            View Dashboard
          </button>
        </div>
      )}

      {/* Main Grid: Upload & Text on Left (6 cols), Analysis Output on Right (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Upload & Input Panel */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Resume Upload & Input</span>
            </h2>

            {uploadedFileName && (
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 truncate max-w-xs">
                {uploadedFileName} {fileSizeBytes ? `(${formatFileSize(fileSizeBytes)})` : ''}
              </span>
            )}
          </div>

          {/* Drag & Drop / File Upload Card */}
          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 text-center bg-slate-950/60 transition group cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt,.md"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white">
                Upload Resume (PDF, DOCX)
              </p>
              <p className="text-xs text-slate-400 max-w-xs">
                Drop your resume file here or click to browse. Max size 10 MB.
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-[10px] font-mono uppercase bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-800">
                  PDF
                </span>
                <span className="text-[10px] font-mono uppercase bg-slate-900 text-purple-300 px-2 py-0.5 rounded border border-slate-800">
                  DOCX
                </span>
              </div>
            </div>
          </div>

          {/* Processing Progress Bar */}
          {isProcessing && (
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/80 space-y-2 animate-pulse">
              <div className="flex items-center justify-between text-xs font-semibold text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{progressStage}</span>
                </span>
                <span className="font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-white text-xs">Extraction Notice</p>
                <p className="text-rose-200 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Manual Textarea or Editable Extracted Text */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Or Paste / Edit Resume Text:
              </label>
              {inputText.length > 0 && (
                <span className="text-[10px] text-slate-500 font-mono">
                  {inputText.length} characters
                </span>
              )}
            </div>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              rows={6}
              placeholder="Paste raw resume text, project descriptions, or coursework summary here..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed resize-none"
            />
          </div>

          {/* Try Pre-loaded Examples */}
          <div>
            <p className="text-[11px] text-slate-400 mb-2">Try Sample Student Resumes:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_RESUMES.map(sample => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => {
                    setUploadedFileName(sample.filename);
                    setFileSizeBytes(sample.text.length);
                    setInputText(sample.text);
                    performSkillAnalysis(sample.text);
                  }}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-cyan-400" />
                  <span>{sample.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => performSkillAnalysis(inputText)}
            disabled={isProcessing || !inputText.trim()}
            className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            <span>Extract Skills & Analyze Resume</span>
          </button>
        </div>

        {/* Right Column: Analysis Results Panel */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-400" />
                <span>Resume Analysis Results</span>
              </h2>
              <p className="text-xs text-slate-400">
                Organized across 8 technical domains with origin tracking
              </p>
            </div>

            {analysisResult && analysisResult.allSkills.length > 0 && (
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                {analysisResult.allSkills.length} Skills Detected
              </span>
            )}
          </div>

          {!analysisResult ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-slate-500 flex items-center justify-center mx-auto">
                <FileSearch className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">
                No Resume Analyzed Yet
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Upload a PDF/DOCX resume on the left or click a sample resume to inspect categorized skills, experience detection, and career compatibility.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Profile Update Callout Button */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-purple-950/40 border border-cyan-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Review Your Extracted Skills</span>
                  </p>
                  <p className="text-[11px] text-cyan-200">
                    Verify skills, remove incorrect items, or add missing ones before saving.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenReviewModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 transition flex items-center gap-1.5 shrink-0"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Update My Profile With Extracted Skills</span>
                </button>
              </div>

              {/* Extracted Resume Text Preview (Collapsible) */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                <button
                  type="button"
                  onClick={() => setShowRawTextPreview(!showRawTextPreview)}
                  className="w-full flex items-center justify-between text-slate-300 hover:text-white font-semibold text-[11px]"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Extracted Resume Text Preview ({inputText.length} characters)</span>
                  </span>
                  {showRawTextPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showRawTextPreview && (
                  <pre className="p-3 rounded-lg bg-black/60 border border-slate-900 text-[10px] text-slate-400 font-mono overflow-x-auto max-h-36 whitespace-pre-wrap">
                    {inputText}
                  </pre>
                )}
              </div>

              {/* Education & Experience Detected */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    <span>Detected Education</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.detectedEducation && analysisResult.detectedEducation.length > 0 ? (
                      analysisResult.detectedEducation.map(e => (
                        <span key={e} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {e}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">No formal degree parsed</span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-purple-300 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span>Identified Experience</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.identifiedExperience.map(exp => (
                      <span key={exp} className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* THE 8 REQUIRED CATEGORIES */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Skills Classified into 8 Domains</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. Programming Languages */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-purple-300 flex items-center gap-1">
                      <Code2 className="w-3 h-3" />
                      <span>1. Programming Languages ({analysisResult.programmingLanguages.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.programmingLanguages.length > 0 ? (
                        analysisResult.programmingLanguages.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">None</span>
                      )}
                    </div>
                  </div>

                  {/* 2. Frameworks and Libraries */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-cyan-300 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span>2. Frameworks & Libraries ({analysisResult.frameworksAndLibraries.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.frameworksAndLibraries.length > 0 ? (
                        analysisResult.frameworksAndLibraries.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">None</span>
                      )}
                    </div>
                  </div>

                  {/* 3. Databases */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-blue-300 flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      <span>3. Databases ({analysisResult.databaseSkills.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.databaseSkills.length > 0 ? (
                        analysisResult.databaseSkills.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">None</span>
                      )}
                    </div>
                  </div>

                  {/* 4. Data Science Tools */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      <span>4. Data Science Tools ({analysisResult.dataScienceTools.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.dataScienceTools.length > 0 ? (
                        analysisResult.dataScienceTools.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">None</span>
                      )}
                    </div>
                  </div>

                  {/* 5. AI and Machine Learning */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-pink-300 flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      <span>5. AI & Machine Learning ({analysisResult.aiAndMachineLearning.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.aiAndMachineLearning.length > 0 ? (
                        analysisResult.aiAndMachineLearning.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">None</span>
                      )}
                    </div>
                  </div>

                  {/* 6. Cloud and Development Tools */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-teal-300 flex items-center gap-1">
                      <Cloud className="w-3 h-3" />
                      <span>6. Cloud & Dev Tools ({analysisResult.cloudAndDevTools.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.cloudAndDevTools.length > 0 ? (
                        analysisResult.cloudAndDevTools.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">None</span>
                      )}
                    </div>
                  </div>

                  {/* 7. Soft Skills */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>7. Soft Skills ({analysisResult.softSkills.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.softSkills.length > 0 ? (
                        analysisResult.softSkills.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">None</span>
                      )}
                    </div>
                  </div>

                  {/* 8. Projects and Experience */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-indigo-300 flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3" />
                      <span>8. Projects & Experience Mentions</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.projectsAndExperience.length > 0 ? (
                        analysisResult.projectsAndExperience.map(p => (
                          <span key={p} className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 truncate max-w-full">
                            {p}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">Academic projects detected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Needing Improvement (compared to target goal) */}
              {analysisResult.skillsNeedingImprovement.length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/60 space-y-1.5">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                    <span>Skills Needing Improvement for {profile.careerGoal || 'Data Scientist'}</span>
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Prerequisites not detected in the resume text:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysisResult.skillsNeedingImprovement.map(gap => (
                      <span
                        key={gap}
                        className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono"
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Review Your Extracted Skills Before Adding to Profile */}
      {isReviewModalOpen && analysisResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="rounded-2xl bg-[#090e1f] border border-slate-700 p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 border-b border-slate-800 pb-3 pr-8">
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>STUDENT VERIFICATION REQUIRED</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Review Your Extracted Skills
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accept, remove incorrect skills, or add missing ones. Only confirmed skills will be merged into your profile.
              </p>
            </div>

            {/* Manual Add Input */}
            <div className="flex gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <input
                type="text"
                value={customSkillToAdd}
                onChange={e => setCustomSkillToAdd(e.target.value)}
                placeholder="Add a missing skill manually (e.g. PyTorch, Docker)..."
                className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddManualCustomSkill}
                disabled={!customSkillToAdd.trim()}
                className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition disabled:opacity-40 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Selection Controls */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-300 font-medium">
                {selectedSkillsForProfile.length} skills selected for profile
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleSelectAllSkills}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Select All
                </button>
                <span className="text-slate-600">•</span>
                <button
                  type="button"
                  onClick={handleDeselectAllSkills}
                  className="text-slate-400 hover:text-slate-300 font-semibold"
                >
                  Deselect All
                </button>
              </div>
            </div>

            {/* Interactive Checkbox List */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2 max-h-64 overflow-y-auto">
              {Array.from(new Set([...analysisResult.allSkills, ...selectedSkillsForProfile])).map(skill => {
                const isSelected = selectedSkillsForProfile.includes(skill);
                const isAlreadyInProfile = (profile.skills || []).some(
                  s => s.toLowerCase() === skill.toLowerCase()
                );
                const origin = analysisResult.skillOrigins?.[skill] || 'Skills Section';

                return (
                  <label
                    key={skill}
                    className={`flex items-center justify-between p-2.5 rounded-lg border transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-800/80 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSkillSelection(skill)}
                        className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-medium">{skill}</span>
                        <span className="text-[10px] text-slate-500 block">Identified in: {origin}</span>
                      </div>
                    </div>

                    {isAlreadyInProfile && (
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Already in profile
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmProfileUpdate}
                disabled={selectedSkillsForProfile.length === 0}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 transition flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm & Update Profile ({selectedSkillsForProfile.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
