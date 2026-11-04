import React, { useState } from 'react';
import {
  Sparkles,
  User,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Code2,
  Terminal,
  FolderGit2,
  Target,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  Layers,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentProfile, Project } from '../../types';
import { CAREER_ROLES } from '../../data/mockData';

const COMMON_TECH_SKILLS = [
  'Machine Learning', 'Deep Learning', 'Statistics', 'Pandas', 'NumPy',
  'Data Visualization', 'Power BI', 'Scikit-Learn', 'PyTorch', 'TensorFlow',
  'Docker', 'SQL', 'Git', 'FastAPI', 'Excel', 'Data Structures', 'Algorithms',
  'Tableau', 'NLP', 'Computer Vision'
];

const COMMON_LANGUAGES = [
  'Python', 'SQL', 'JavaScript', 'TypeScript', 'C++', 'Java', 'R', 'C#', 'Go', 'HTML/CSS'
];

const COMMON_INTERESTS = [
  'Data Science', 'Machine Learning', 'Artificial Intelligence',
  'Predictive Modeling', 'Data Analytics', 'Generative AI & LLMs',
  'Web Development', 'Cloud Computing & MLOps', 'Robotics'
];

export const OnboardingPage: React.FC = () => {
  const { currentUser, updateProfile, setActiveTab } = useApp();

  const [formData, setFormData] = useState<StudentProfile>({
    name: currentUser ? currentUser.name : '',
    education: 'B.Tech in Artificial Intelligence & Data Science',
    collegeName: '',
    department: 'AI & DS',
    yearOfStudy: '3rd Year',
    skills: [],
    programmingLanguages: ['Python', 'SQL'],
    projects: [],
    interests: ['Data Science', 'Machine Learning'],
    careerGoal: 'Data Scientist',
    isCompleted: false
  });

  const [customSkill, setCustomSkill] = useState('');
  const [customLang, setCustomLang] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: []
  });
  const [projTechInput, setProjTechInput] = useState('');

  // Skill toggles
  const handleToggleSkill = (skill: string) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
      };
    });
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
      setCustomSkill('');
    }
  };

  // Language toggles
  const handleToggleLang = (lang: string) => {
    setFormData(prev => {
      const exists = prev.programmingLanguages.includes(lang);
      return {
        ...prev,
        programmingLanguages: exists
          ? prev.programmingLanguages.filter(l => l !== lang)
          : [...prev.programmingLanguages, lang]
      };
    });
  };

  const handleAddCustomLang = () => {
    const trimmed = customLang.trim();
    if (trimmed && !formData.programmingLanguages.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        programmingLanguages: [...prev.programmingLanguages, trimmed]
      }));
      setCustomLang('');
    }
  };

  // Interest toggles
  const handleToggleInterest = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  // Project handling
  const handleAddProject = () => {
    if (!newProject.name.trim()) return;
    const projectToAdd: Project = {
      id: 'proj_' + Date.now(),
      name: newProject.name.trim(),
      description: newProject.description.trim(),
      technologies: newProject.technologies.length > 0 ? newProject.technologies : ['Python', 'SQL']
    };

    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, projectToAdd]
    }));
    setNewProject({ name: '', description: '', technologies: [] });
    setShowAddProject(false);
  };

  const handleRemoveProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProfile: StudentProfile = {
      ...formData,
      isCompleted: true
    };
    updateProfile(finalProfile);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in pb-16">
      {/* Welcome Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 border border-cyan-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Profile Configuration Wizard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome to Your Career Journey!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Please complete your student profile below. Our AI engine uses your 10 academic and skill
            parameters to compute compatibility, identify skill gaps, and generate your custom roadmap.
          </p>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Personal & Academic Details */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-5">
          <div className="flex items-center space-x-2 text-sm font-bold text-cyan-400 border-b border-slate-800 pb-3">
            <GraduationCap className="w-5 h-5" />
            <span>1. Academic & University Background</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                1. Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* 2. Education Qualification */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                2. Education Qualification
              </label>
              <input
                type="text"
                required
                value={formData.education}
                onChange={e => setFormData({ ...formData, education: e.target.value })}
                placeholder="e.g. B.Tech, B.S. in Computer Science, BCA, MCA"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* 3. College Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                3. College / University Name
              </label>
              <input
                type="text"
                required
                value={formData.collegeName}
                onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                placeholder="e.g. State Institute of Technology"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* 4. Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                4. Academic Department
              </label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="AI & DS">Artificial Intelligence & Data Science (AI & DS)</option>
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="Mathematics & Computing">Mathematics & Computing</option>
                <option value="Data Analytics">Data Analytics & Statistics</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Other">Other Engineering / Applied Sciences</option>
              </select>
            </div>

            {/* 5. Year of Study */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                5. Current Year of Study
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Recent Graduate'].map(year => (
                  <button
                    type="button"
                    key={year}
                    onClick={() => setFormData({ ...formData, yearOfStudy: year })}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                      formData.yearOfStudy === year
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                        : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Technical Skills & Languages */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center space-x-2 text-sm font-bold text-purple-400 border-b border-slate-800 pb-3">
            <Code2 className="w-5 h-5" />
            <span>2. Skills & Programming Languages</span>
          </div>

          {/* 6. Technical Skills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                6. Technical Competencies ({formData.skills.length} selected)
              </label>
              <span className="text-[11px] text-slate-400">Click to toggle or type custom</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {COMMON_TECH_SKILLS.map(skill => {
                const selected = formData.skills.includes(skill);
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      selected
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/80 shadow-sm'
                        : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {selected ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>

            <div className="flex space-x-2 pt-1">
              <input
                type="text"
                value={customSkill}
                onChange={e => setCustomSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomSkill();
                  }
                }}
                placeholder="Add other technical skill (e.g. Scikit-Learn, PyTorch, Docker)..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* 7. Programming Languages */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                7. Programming Languages ({formData.programmingLanguages.length} selected)
              </label>
              <span className="text-[11px] text-slate-400">Languages you write code in</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {COMMON_LANGUAGES.map(lang => {
                const selected = formData.programmingLanguages.includes(lang);
                return (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => handleToggleLang(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      selected
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-500/80 shadow-sm'
                        : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {selected ? `✓ ${lang}` : `+ ${lang}`}
                  </button>
                );
              })}
            </div>

            <div className="flex space-x-2 pt-1">
              <input
                type="text"
                value={customLang}
                onChange={e => setCustomLang(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomLang();
                  }
                }}
                placeholder="Add other language (e.g. Rust, Kotlin, Scala)..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={handleAddCustomLang}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                Add Language
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Projects Completed */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-sm font-bold text-cyan-400">
              <FolderGit2 className="w-5 h-5" />
              <span>8. Projects Completed ({formData.projects.length})</span>
            </div>
            <button
              type="button"
              onClick={() => setShowAddProject(!showAddProject)}
              className="text-xs px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddProject ? 'Close' : 'Add Project'}</span>
            </button>
          </div>

          {/* List of projects */}
          {formData.projects.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">
              No projects added yet. Click &quot;Add Project&quot; to include academic coursework or personal portfolio work.
            </p>
          ) : (
            <div className="space-y-3">
              {formData.projects.map(proj => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{proj.name}</h4>
                    <p className="text-xs text-slate-400">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(proj.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Project Sub-form */}
          {showAddProject && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/60 space-y-3">
              <p className="text-xs font-bold text-cyan-300">New Project Details</p>
              <input
                type="text"
                value={newProject.name}
                onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="Project Title (e.g. Sales Demand Forecasting, Sentiment Classifier)"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <textarea
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Description of the methodology, models, and results..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={projTechInput}
                  onChange={e => setProjTechInput(e.target.value)}
                  placeholder="Technologies used (comma separated, e.g. Python, Pandas, Scikit-Learn)"
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (projTechInput.trim()) {
                      const techs = projTechInput.split(',').map(t => t.trim()).filter(Boolean);
                      setNewProject(prev => ({ ...prev, technologies: [...prev.technologies, ...techs] }));
                      setProjTechInput('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-200"
                >
                  Attach Tech
                </button>
              </div>
              {newProject.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {newProject.technologies.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleAddProject}
                  disabled={!newProject.name.trim()}
                  className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold disabled:opacity-50 transition"
                >
                  Save Project
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Interests & Career Goal */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-5">
          <div className="flex items-center space-x-2 text-sm font-bold text-cyan-400 border-b border-slate-800 pb-3">
            <Target className="w-5 h-5" />
            <span>3. Interests & Preferred Career Goal</span>
          </div>

          {/* 9. Areas of Interest */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              9. Areas of Technical Interest
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_INTERESTS.map(interest => {
                const selected = formData.interests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => handleToggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      selected
                        ? 'bg-gradient-to-r from-cyan-600/50 to-blue-600/50 text-cyan-200 border border-cyan-500/70'
                        : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {selected ? `✓ ${interest}` : interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 10. Preferred Career Goal */}
          <div className="space-y-2 pt-3 border-t border-slate-800/80">
            <label className="block text-xs font-semibold text-slate-300">
              10. Preferred Career Goal Target
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CAREER_ROLES.map(role => {
                const isSelected = formData.careerGoal.toLowerCase() === role.title.toLowerCase();
                return (
                  <div
                    key={role.id}
                    onClick={() => setFormData({ ...formData, careerGoal: role.title })}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-500 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <p className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                      {role.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{role.category}</p>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{role.shortDescription}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit & Save Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 max-w-md">
            * All data is saved exclusively to your authenticated user account. You can revisit and update these details anytime in Account Settings.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>Save Profile & Explore My Intelligence Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
