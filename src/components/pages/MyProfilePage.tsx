import React, { useState, useMemo } from 'react';
import {
  User,
  GraduationCap,
  Building2,
  Calendar,
  Code2,
  FolderGit2,
  Target,
  Edit3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Globe,
  Award,
  ShieldCheck,
  Lock,
  Unlock,
  Check,
  X,
  FileCheck2,
  BookOpen,
  TrendingUp,
  Brain,
  Layers,
  Database,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project, LearningGoal } from '../../types';
import { ALL_ASSESSMENT_SKILLS } from '../../data/assessmentQuestions';

export const MyProfilePage: React.FC = () => {
  const {
    profile,
    updateProfile,
    isProfileCompleted,
    currentUser,
    currentCareerMatch,
    setActiveTab,
    addLearningGoal,
    toggleLearningGoal,
    deleteLearningGoal,
    setProfilePrivacy
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [name, setName] = useState(profile.name || currentUser?.name || '');
  const [education, setEducation] = useState(profile.education || 'B.Tech / B.S. in Computer Science');
  const [collegeName, setCollegeName] = useState(profile.collegeName || 'National Institute of Technology');
  const [department, setDepartment] = useState(profile.department || 'AI & Data Science');
  const [yearOfStudy, setYearOfStudy] = useState(profile.yearOfStudy || 'Final Year');
  const [skillsInput, setSkillsInput] = useState((profile.skills || []).join(', '));
  const [languagesInput, setLanguagesInput] = useState((profile.programmingLanguages || []).join(', '));
  const [interestsInput, setInterestsInput] = useState((profile.interests || []).join(', '));
  const [careerGoal, setCareerGoal] = useState(profile.careerGoal || 'Data Scientist');

  // Custom project modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjGithub, setNewProjGithub] = useState('');
  const [newProjLive, setNewProjLive] = useState('');
  const [newProjStatus, setNewProjStatus] = useState<'In Progress' | 'Completed'>('Completed');

  // Learning Goal input state
  const [newGoalTitle, setNewGoalTitle] = useState('');

  // Save basic profile edits
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const programmingLanguages = languagesInput.split(',').map(s => s.trim()).filter(Boolean);
    const interests = interestsInput.split(',').map(s => s.trim()).filter(Boolean);

    updateProfile({
      ...profile,
      name: name.trim(),
      education: education.trim(),
      collegeName: collegeName.trim(),
      department: department.trim(),
      yearOfStudy,
      skills,
      programmingLanguages,
      interests,
      careerGoal,
      isCompleted: true
    });

    setIsEditing(false);
  };

  // Add Project to Portfolio
  const handleAddProject = () => {
    if (!newProjTitle.trim()) return;

    const newProject: Project = {
      id: 'proj_' + Date.now(),
      name: newProjTitle.trim(),
      description: newProjDesc.trim() || 'Applied technical portfolio project.',
      technologies: newProjTech.split(',').map(t => t.trim()).filter(Boolean),
      githubUrl: newProjGithub.trim() || undefined,
      liveUrl: newProjLive.trim() || undefined,
      status: newProjStatus,
      savedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    const updatedProjects = [...(profile.projects || []), newProject];
    const mergedSkills = Array.from(new Set([...(profile.skills || []), ...newProject.technologies]));

    updateProfile({
      ...profile,
      projects: updatedProjects,
      skills: mergedSkills,
      isCompleted: true
    });

    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
    setNewProjGithub('');
    setNewProjLive('');
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    const updated = (profile.projects || []).filter(p => p.id !== id);
    updateProfile({
      ...profile,
      projects: updated
    });
  };

  // Handle Add Learning Goal
  const handleCreateLearningGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    await addLearningGoal(newGoalTitle.trim());
    setNewGoalTitle('');
  };

  // Calculate Profile Completion %
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (profile.name) score += 15;
    if (profile.education) score += 15;
    if (profile.department) score += 15;
    if (profile.skills && profile.skills.length > 0) score += 20;
    if (profile.programmingLanguages && profile.programmingLanguages.length > 0) score += 15;
    if (profile.projects && profile.projects.length > 0) score += 20;
    return Math.min(100, score);
  }, [profile]);

  // Categorized Skills for Skill Portfolio
  const categorizedSkillPortfolio = useMemo(() => {
    const all = Array.from(new Set([...(profile.skills || []), ...(profile.programmingLanguages || [])]));

    const progLangsList = ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'R', 'Go', 'SQL'];
    const dsToolsList = ['Pandas', 'NumPy', 'Statistics', 'Data Visualization', 'Tableau', 'Power BI', 'Excel', 'DAX'];
    const aiList = ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Natural Language Processing', 'Generative AI', 'PyTorch', 'TensorFlow', 'Computer Vision', 'LangChain'];
    const webDevList = ['React', 'Node.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'FastAPI', 'Express', 'Flask'];
    const dbList = ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'];
    const devOpsList = ['Docker', 'Git', 'GitHub', 'Kubernetes', 'Linux', 'AWS', 'CI/CD'];
    const softList = ['Problem Solving', 'Communication', 'Leadership', 'Teamwork', 'Collaboration'];

    const getSource = (skillName: string): 'manual' | 'resume' | 'assessment' => {
      if (profile.assessmentSkillScores && profile.assessmentSkillScores[skillName] !== undefined) {
        return 'assessment';
      }
      if (profile.skillSources && profile.skillSources[skillName]) {
        return profile.skillSources[skillName];
      }
      return 'manual';
    };

    return {
      programming: all.filter(s => progLangsList.some(p => p.toLowerCase() === s.toLowerCase())).map(s => ({ name: s, source: getSource(s) })),
      dataScience: all.filter(s => dsToolsList.some(p => p.toLowerCase() === s.toLowerCase())).map(s => ({ name: s, source: getSource(s) })),
      ai: all.filter(s => aiList.some(p => p.toLowerCase() === s.toLowerCase())).map(s => ({ name: s, source: getSource(s) })),
      webDev: all.filter(s => webDevList.some(p => p.toLowerCase() === s.toLowerCase())).map(s => ({ name: s, source: getSource(s) })),
      databases: all.filter(s => dbList.some(p => p.toLowerCase() === s.toLowerCase())).map(s => ({ name: s, source: getSource(s) })),
      tools: all.filter(s => devOpsList.some(p => p.toLowerCase() === s.toLowerCase())).map(s => ({ name: s, source: getSource(s) })),
      soft: all.filter(s => softList.some(p => p.toLowerCase() === s.toLowerCase())).map(s => ({ name: s, source: getSource(s) }))
    };
  }, [profile.skills, profile.programmingLanguages, profile.assessmentSkillScores, profile.skillSources]);

  // Skill Confidence Overview (assessment-tested scores)
  const assessmentScores = profile.assessmentSkillScores || {};
  const testedSkills = Object.entries(assessmentScores);

  // Dynamic Achievements calculation
  const achievements = useMemo(() => {
    const list = [
      {
        id: 'ach-profile',
        title: 'Career Identity Established',
        description: 'Completed foundational student profile details.',
        icon: 'UserCheck',
        isUnlocked: isProfileCompleted
      },
      {
        id: 'ach-resume',
        title: 'Resume Entity Extractor',
        description: 'Analyzed resume document and verified extracted skills.',
        icon: 'FileSearch',
        isUnlocked: (profile.skills || []).length >= 5
      },
      {
        id: 'ach-test',
        title: 'Competency Tested',
        description: 'Completed practical MCQ Skill Assessment evaluation.',
        icon: 'Brain',
        isUnlocked: (profile.assessmentHistory || []).length > 0
      },
      {
        id: 'ach-project',
        title: 'Portfolio Builder',
        description: 'Added practical portfolio projects to showcase skills.',
        icon: 'FolderGit2',
        isUnlocked: (profile.projects || []).length > 0
      },
      {
        id: 'ach-goal',
        title: 'Milestone Achieved',
        description: 'Completed a personal learning roadmap goal.',
        icon: 'Award',
        isUnlocked: (profile.learningGoals || []).some(g => g.completed)
      }
    ];
    return list;
  }, [isProfileCompleted, profile.skills, profile.assessmentHistory, profile.projects, profile.learningGoals]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. CAREER IDENTITY CARD (Header Banner) */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-850 p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            {/* Avatar Initials */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-xl shadow-cyan-500/25 shrink-0 border border-cyan-300/30">
              {profile.name?.charAt(0) || currentUser?.name?.charAt(0) || 'U'}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {profile.name || currentUser?.name || 'Student Profile'}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {profile.careerGoal || 'Data Scientist'} Aspirant
                </span>
                {profile.isPublic ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <Globe className="w-2.5 h-2.5" /> Public Portfolio
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Private
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                {profile.education || 'Undergraduate'} • {profile.department || 'Computer Science & AI'}
              </p>
              <p className="text-xs text-slate-400">
                {profile.collegeName || 'National Engineering Campus'} • {profile.yearOfStudy || 'Final Year'}
              </p>
            </div>
          </div>

          {/* Profile Completion & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            {/* Completion Radial / Counter */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-32">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
                {completionPercentage}%
              </span>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                Profile Completeness
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/25 transition flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
              </button>

              <button
                type="button"
                onClick={() => setProfilePrivacy(!profile.isPublic)}
                className="p-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title={profile.isPublic ? 'Switch to Private' : 'Make Portfolio Public'}
              >
                {profile.isPublic ? <Globe className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form (collapsible) */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-navy-900/90 border border-cyan-500/40 backdrop-blur-xl space-y-5 animate-fade-in shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-cyan-400" />
              <span>Edit Personal & Academic Information</span>
            </h3>
            <span className="text-xs text-slate-400">All fields update your Career Engine calculations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Education</label>
              <input
                type="text"
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">College / University</label>
              <input
                type="text"
                value={collegeName}
                onChange={e => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Year of Study</label>
              <select
                value={yearOfStudy}
                onChange={e => setYearOfStudy(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="Final Year">Final Year</option>
                <option value="Graduate / Alum">Graduate / Alum</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Career Goal</label>
              <select
                value={careerGoal}
                onChange={e => setCareerGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Business Analyst">Business Analyst</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Technical Skills (comma-separated)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={e => setSkillsInput(e.target.value)}
                placeholder="Python, SQL, Pandas, Machine Learning, Tableau..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Programming Languages (comma-separated)
              </label>
              <input
                type="text"
                value={languagesInput}
                onChange={e => setLanguagesInput(e.target.value)}
                placeholder="Python, SQL, C++, Java, JavaScript..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/25 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. CAREER GOAL TRACKER & PROGRESS */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 backdrop-blur-xl shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Career Goal Tracker: {profile.careerGoal || 'Data Scientist'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live algorithmic matching score calculated by the AI Career Engine
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('career-matching')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore Benchmarks</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Current Compatibility Fit
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-cyan-400 font-mono">
                {currentCareerMatch.matchPercentage}%
              </span>
              <span className="text-xs text-slate-400">Match</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Based on {currentCareerMatch.matchingSkills.length} matching skills in your profile.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
              Missing Core Skills
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-rose-400 font-mono">
                {currentCareerMatch.missingSkills.length}
              </span>
              <span className="text-xs text-slate-400">Identified Gaps</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Top gap: <span className="text-rose-300 font-semibold">{currentCareerMatch.missingSkills[0]?.skill || 'None'}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Recommended Next Step
              </span>
              <p className="text-xs text-white font-medium mt-1 leading-snug">
                {currentCareerMatch.nextSteps[0] || 'Take a skill assessment to verify competencies.'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 pt-1"
            >
              <span>View Gap Breakdown</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. SKILL PORTFOLIO (Categorized with Source Badges) */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 backdrop-blur-xl shadow-lg space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Skill Portfolio by Category</span>
            </h3>
            <p className="text-xs text-slate-400">
              Verified source badges show whether each skill was manually entered, extracted from resume, or tested in assessment
            </p>
          </div>

          <div className="flex items-center space-x-2 text-[10px]">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-600" /> Manual
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Resume
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Assessment Tested
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Programming Languages */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>Programming Languages ({categorizedSkillPortfolio.programming.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categorizedSkillPortfolio.programming.length > 0 ? (
                categorizedSkillPortfolio.programming.map(s => (
                  <span
                    key={s.name}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono flex items-center gap-1 ${
                      s.source === 'assessment'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        : s.source === 'resume'
                        ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.source === 'assessment' && <Sparkles className="w-2.5 h-2.5 text-emerald-400" />}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-500 italic">No programming languages listed</span>
              )}
            </div>
          </div>

          {/* Data Science Tools */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Data Science & Analytics ({categorizedSkillPortfolio.dataScience.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categorizedSkillPortfolio.dataScience.length > 0 ? (
                categorizedSkillPortfolio.dataScience.map(s => (
                  <span
                    key={s.name}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono flex items-center gap-1 ${
                      s.source === 'assessment'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        : s.source === 'resume'
                        ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.source === 'assessment' && <Sparkles className="w-2.5 h-2.5 text-emerald-400" />}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-500 italic">No data science tools listed</span>
              )}
            </div>
          </div>

          {/* AI & Machine Learning */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>AI & Machine Learning ({categorizedSkillPortfolio.ai.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categorizedSkillPortfolio.ai.length > 0 ? (
                categorizedSkillPortfolio.ai.map(s => (
                  <span
                    key={s.name}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono flex items-center gap-1 ${
                      s.source === 'assessment'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        : s.source === 'resume'
                        ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.source === 'assessment' && <Sparkles className="w-2.5 h-2.5 text-emerald-400" />}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-500 italic">No AI/ML skills listed</span>
              )}
            </div>
          </div>

          {/* Databases */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Databases ({categorizedSkillPortfolio.databases.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categorizedSkillPortfolio.databases.length > 0 ? (
                categorizedSkillPortfolio.databases.map(s => (
                  <span
                    key={s.name}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono flex items-center gap-1 ${
                      s.source === 'assessment'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        : s.source === 'resume'
                        ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.source === 'assessment' && <Sparkles className="w-2.5 h-2.5 text-emerald-400" />}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-500 italic">No database skills listed</span>
              )}
            </div>
          </div>

          {/* Web & Cloud Tools */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Web & Cloud Frameworks ({categorizedSkillPortfolio.webDev.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categorizedSkillPortfolio.webDev.length > 0 ? (
                categorizedSkillPortfolio.webDev.map(s => (
                  <span
                    key={s.name}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono flex items-center gap-1 ${
                      s.source === 'assessment'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        : s.source === 'resume'
                        ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.source === 'assessment' && <Sparkles className="w-2.5 h-2.5 text-emerald-400" />}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-500 italic">No web/cloud tools listed</span>
              )}
            </div>
          </div>

          {/* Soft & Collaboration Skills */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Professional & Soft Skills ({categorizedSkillPortfolio.soft.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categorizedSkillPortfolio.soft.length > 0 ? (
                categorizedSkillPortfolio.soft.map(s => (
                  <span
                    key={s.name}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                  >
                    {s.name}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-500 italic">Problem Solving, Communication, Teamwork</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. SKILL CONFIDENCE OVERVIEW (Assessment-Tested Scores) */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 backdrop-blur-xl shadow-lg space-y-4">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-400" />
              <span>Skill Confidence Overview</span>
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated strictly through submitted MCQ Skill Assessment tests. Untested skills are marked as "Not Yet Assessed".
            </p>
          </div>

          <button
            onClick={() => setActiveTab('skill-assessment')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Take Skill Assessment</span>
          </button>
        </div>

        {testedSkills.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <p className="text-xs text-slate-300 font-semibold">No Skills Assessed Yet</p>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto">
              Take the Skill Assessment test to evaluate your actual practical knowledge, generate accuracy charts, and verify your strengths.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {testedSkills.map(([skill, score]) => {
              let label = 'Needs Improvement';
              let color = 'text-rose-400 border-rose-800 bg-rose-950/80';
              if (score >= 80) {
                label = 'Strong';
                color = 'text-emerald-400 border-emerald-800 bg-emerald-950/80';
              } else if (score >= 60) {
                label = 'Good';
                color = 'text-cyan-400 border-cyan-800 bg-cyan-950/80';
              } else if (score >= 40) {
                label = 'Developing';
                color = 'text-amber-400 border-amber-800 bg-amber-950/80';
              }

              return (
                <div key={skill} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{skill}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
                      {label}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Assessed Score</span>
                    <span className="font-mono font-bold text-white">{score}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. PROJECT PORTFOLIO (With GitHub, Live Links & Status) */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 backdrop-blur-xl shadow-lg space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              <span>Project Portfolio ({profile.projects?.length || 0})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Demonstrated engineering and data projects showcasing practical mastery
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsProjectModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/25 transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>

        {(!profile.projects || profile.projects.length === 0) ? (
          <div className="p-8 text-center rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <FolderGit2 className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-300 font-semibold">No Projects Added Yet</p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Add your coursework or capstone projects, or check out Recommended Projects to build new solutions.
            </p>
            <button
              onClick={() => setActiveTab('projects')}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition mt-2"
            >
              Browse Recommended Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.projects.map(proj => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {proj.status || 'Completed'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-slate-500 hover:text-rose-400 transition"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white">{proj.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[10px]">{proj.savedDate || 'Portfolio Project'}</span>
                  <div className="flex items-center space-x-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-cyan-400 transition"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-purple-400 transition"
                        title="Live Demonstration"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. ACHIEVEMENTS & LEARNING GOALS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Achievements Section (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl shadow-lg space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Career Milestones & Achievements</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Dynamically unlocked based on actual completed activities
            </p>
          </div>

          <div className="space-y-2.5">
            {achievements.map(ach => (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center space-x-3 transition ${
                  ach.isUnlocked
                    ? 'bg-slate-950/70 border-cyan-800/60 text-white'
                    : 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    ach.isUnlocked
                      ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                      : 'bg-slate-900 text-slate-600 border-slate-800'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold">{ach.title}</h5>
                    <span className="text-[9px] uppercase font-bold tracking-wider">
                      {ach.isUnlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Learning Goals (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl shadow-lg space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Personal Learning Goals</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Set actionable study targets to track your personal growth
            </p>
          </div>

          {/* Add Goal Form */}
          <form onSubmit={handleCreateLearningGoal} className="flex gap-2">
            <input
              type="text"
              value={newGoalTitle}
              onChange={e => setNewGoalTitle(e.target.value)}
              placeholder="e.g. Master SQL Window Functions, Complete PyTorch CNN..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!newGoalTitle.trim()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md disabled:opacity-40 transition shrink-0"
            >
              Add Goal
            </button>
          </form>

          {/* Goals List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {(!profile.learningGoals || profile.learningGoals.length === 0) ? (
              <p className="text-xs text-slate-500 italic text-center py-6">
                No active learning goals. Type a goal above to get started!
              </p>
            ) : (
              profile.learningGoals.map(goal => (
                <div
                  key={goal.id}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                >
                  <label className="flex items-center space-x-2.5 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleLearningGoal(goal.id)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 cursor-pointer"
                    />
                    <span className={`text-xs ${goal.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {goal.title}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => deleteLearningGoal(goal.id)}
                    className="text-slate-600 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL: ADD CUSTOM PROJECT */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="rounded-2xl bg-[#090e1f] border border-slate-700 p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-purple-400" />
                <span>Add Portfolio Project</span>
              </h3>
              <p className="text-xs text-slate-400">
                Showcase your practical engineering work to recruiters and boost your AI Career Engine score
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  value={newProjTitle}
                  onChange={e => setNewProjTitle(e.target.value)}
                  placeholder="e.g. Brain MRI Tumor Segmentation Pipeline"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                <textarea
                  value={newProjDesc}
                  onChange={e => setNewProjDesc(e.target.value)}
                  rows={3}
                  placeholder="Describe your model, dataset, architecture, and metric outcomes..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Technologies Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={newProjTech}
                  onChange={e => setNewProjTech(e.target.value)}
                  placeholder="Python, PyTorch, Docker, FastAPI..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo Link (optional)</label>
                  <input
                    type="url"
                    value={newProjGithub}
                    onChange={e => setNewProjGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL (optional)</label>
                  <input
                    type="url"
                    value={newProjLive}
                    onChange={e => setNewProjLive(e.target.value)}
                    placeholder="https://app.example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddProject}
                disabled={!newProjTitle.trim()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/25 transition disabled:opacity-40"
              >
                Add to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
