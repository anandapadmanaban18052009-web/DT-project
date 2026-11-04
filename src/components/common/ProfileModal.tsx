import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  GraduationCap,
  Building2,
  Code2,
  FolderGit2,
  Target,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentProfile, Project } from '../../types';
import { CAREER_ROLES } from '../../data/mockData';

const COMMON_SKILLS = [
  'Python', 'SQL', 'Pandas', 'Machine Learning', 'Deep Learning', 'Statistics',
  'NumPy', 'Data Visualization', 'Power BI', 'Scikit-Learn', 'PyTorch', 'Docker',
  'JavaScript', 'HTML', 'CSS', 'React', 'Git', 'FastAPI', 'Excel'
];

const COMMON_LANGUAGES = [
  'Python', 'SQL', 'JavaScript', 'TypeScript', 'C++', 'Java', 'R', 'Go'
];

const COMMON_INTERESTS = [
  'Data Science', 'Machine Learning', 'Artificial Intelligence',
  'Deep Learning & Vision', 'Data Analytics & BI', 'Web Development',
  'Cloud & MLOps', 'Robotics & Automation'
];

export const ProfileModal: React.FC = () => {
  const {
    isProfileModalOpen,
    setIsProfileModalOpen,
    profile,
    updateProfile,
    setActiveTab
  } = useApp();

  const [formData, setFormData] = useState<StudentProfile>({
    ...profile,
    collegeName: profile.collegeName || '',
    programmingLanguages: profile.programmingLanguages || []
  });

  useEffect(() => {
    setFormData({
      ...profile,
      collegeName: profile.collegeName || '',
      programmingLanguages: profile.programmingLanguages || []
    });
  }, [profile, isProfileModalOpen]);

  const [skillInput, setSkillInput] = useState('');
  const [langInput, setLangInput] = useState('');

  // New project local form
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: []
  });
  const [projTechInput, setProjTechInput] = useState('');

  if (!isProfileModalOpen) return null;

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddLang = (lang: string) => {
    const trimmed = lang.trim();
    if (trimmed && !formData.programmingLanguages.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        programmingLanguages: [...prev.programmingLanguages, trimmed]
      }));
      setLangInput('');
    }
  };

  const handleRemoveLang = (langToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      programmingLanguages: prev.programmingLanguages.filter(l => l !== langToRemove)
    }));
  };

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

  const handleAddProject = () => {
    if (!newProject.name.trim()) return;
    const projectToAdd: Project = {
      id: `p-${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
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
    updateProfile({
      ...formData,
      isCompleted: true
    });
    setIsProfileModalOpen(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl bg-navy-900 border border-slate-700/80 shadow-2xl shadow-cyan-950/40 overflow-hidden my-6">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-navy-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-navy-900 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Student Career Profile & Skills</h2>
              <p className="text-xs text-slate-400">Configure your academic background, skills & career aspirations</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Personal & Academic Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm font-semibold text-cyan-400 border-b border-slate-800 pb-2">
              <User className="w-4 h-4" />
              <span>Personal & Academic Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Degree / Qualification</label>
                <input
                  type="text"
                  required
                  value={formData.education}
                  onChange={e => setFormData({ ...formData, education: e.target.value })}
                  placeholder="e.g. B.Tech in Artificial Intelligence & Data Science"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">College / University</label>
                <input
                  type="text"
                  required
                  value={formData.collegeName}
                  onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="e.g. State Institute of Technology"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="AI & DS">Artificial Intelligence & Data Science (AI & DS)</option>
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="Mathematics & Computing">Mathematics & Computing</option>
                  <option value="Other">Other Engineering / Science</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Year of Study</label>
                <select
                  value={formData.yearOfStudy}
                  onChange={e => setFormData({ ...formData, yearOfStudy: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="Final Year">Final Year (Senior)</option>
                  <option value="Recent Graduate">Recent Graduate / Alum</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Skills & Languages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-semibold text-cyan-400 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4" />
                <span>Technical Skills ({formData.skills.length} added)</span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal">Click tags or type custom</span>
            </div>

            {/* Current Active Skills */}
            <div className="flex flex-wrap gap-2 min-h-12 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
              {formData.skills.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No technical skills added yet.</p>
              ) : (
                formData.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800/70 shadow-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-cyan-400 hover:text-cyan-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Custom Skill Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(skillInput);
                  }
                }}
                placeholder="Type skill & press Enter (e.g. Scikit-Learn, PyTorch, Docker)"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(skillInput)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition"
              >
                Add Skill
              </button>
            </div>

            {/* Suggested Skill Quick-Chips */}
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SKILLS.map(s => {
                const isSelected = formData.skills.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => (isSelected ? handleRemoveSkill(s) : handleAddSkill(s))}
                    className={`text-xs px-2.5 py-1 rounded-lg transition ${
                      isSelected
                        ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-700'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {isSelected ? `✓ ${s}` : `+ ${s}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Programming Languages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-semibold text-purple-400 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4" />
                <span>Programming Languages ({formData.programmingLanguages.length})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 min-h-10 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
              {formData.programmingLanguages.map(lang => (
                <span
                  key={lang}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-purple-950/80 text-purple-300 border border-purple-800/70"
                >
                  <span>{lang}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLang(lang)}
                    className="text-purple-400 hover:text-purple-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={langInput}
                onChange={e => setLangInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLang(langInput);
                  }
                }}
                placeholder="Type language & press Enter (e.g. Python, SQL, C++, Java)..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => handleAddLang(langInput)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition"
              >
                Add Language
              </button>
            </div>
          </div>

          {/* Section 4: Projects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-semibold text-purple-400 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <FolderGit2 className="w-4 h-4" />
                <span>Academic & Portfolio Projects ({formData.projects.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddProject(!showAddProject)}
                className="text-xs px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900/80 text-purple-300 border border-purple-800/80 transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddProject ? 'Cancel' : 'Add Project'}</span>
              </button>
            </div>

            {/* List of Projects */}
            <div className="space-y-3">
              {formData.projects.map(proj => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{proj.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(proj.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Project Sub-form */}
            {showAddProject && (
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-900/50 space-y-3">
                <p className="text-xs font-semibold text-purple-300">New Project Details</p>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Project Title (e.g. Credit Card Fraud Detector)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <textarea
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Short description of what the project does, algorithms used, and results..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={projTechInput}
                    onChange={e => setProjTechInput(e.target.value)}
                    placeholder="Tech used (comma separated, e.g. Python, Scikit-Learn)"
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
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleAddProject}
                    disabled={!newProject.name.trim()}
                    className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold disabled:opacity-50 transition"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Interests & Career Goal */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm font-semibold text-cyan-400 border-b border-slate-800 pb-2">
              <Target className="w-4 h-4" />
              <span>Interests & Target Career Goal</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Areas of Interest</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_INTERESTS.map(interest => {
                  const selected = formData.interests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => handleToggleInterest(interest)}
                      className={`text-xs px-3 py-1.5 rounded-xl transition ${
                        selected
                          ? 'bg-gradient-to-r from-cyan-600/40 to-blue-600/40 text-cyan-200 border border-cyan-500/50'
                          : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {selected ? `✓ ${interest}` : interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Career Role Goal</label>
              <select
                value={formData.careerGoal}
                onChange={e => setFormData({ ...formData, careerGoal: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-sm text-cyan-300 font-semibold focus:outline-none focus:border-cyan-400"
              >
                {CAREER_ROLES.map(role => (
                  <option key={role.id} value={role.title}>
                    {role.title} — ({role.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-[11px] text-slate-400 max-w-sm">
              * Saved directly to your personal authenticated account.
            </p>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
