import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Building2,
  Calendar,
  Code2,
  FolderGit2,
  Heart,
  Target,
  Edit3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Save,
  Plus,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';

export const MyProfilePage: React.FC = () => {
  const { profile, updateProfile, isProfileCompleted, currentUser, setActiveTab } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [name, setName] = useState(profile.name || currentUser?.name || '');
  const [education, setEducation] = useState(profile.education || '');
  const [collegeName, setCollegeName] = useState(profile.collegeName || '');
  const [department, setDepartment] = useState(profile.department || 'AI & Data Science');
  const [yearOfStudy, setYearOfStudy] = useState(profile.yearOfStudy || '3rd Year');
  const [skillsInput, setSkillsInput] = useState((profile.skills || []).join(', '));
  const [languagesInput, setLanguagesInput] = useState((profile.programmingLanguages || []).join(', '));
  const [interestsInput, setInterestsInput] = useState((profile.interests || []).join(', '));
  const [careerGoal, setCareerGoal] = useState(profile.careerGoal || 'Data Scientist');
  const [projects, setProjects] = useState<Project[]>(profile.projects || []);

  // Save handler
  const handleSave = (e: React.FormEvent) => {
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
      projects,
      isCompleted: true
    });

    setIsEditing(false);
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: 'proj_' + Date.now(),
      name: 'New Project',
      description: 'Project description goes here.',
      technologies: ['Python']
    };
    setProjects([...projects, newProj]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-850 p-6 sm:p-8 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-cyan-500/20">
              {profile.name?.charAt(0) || currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white">{profile.name || currentUser?.name}</h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {isProfileCompleted ? 'Profile Active' : 'Setup Required'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {profile.department || 'AI & Data Science'} • {profile.collegeName || 'Engineering Campus'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25 flex items-center gap-1.5 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Editing' : 'Edit My Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        /* Edit Form */
        <form onSubmit={handleSave} className="rounded-2xl border border-cyan-500/40 bg-navy-900/90 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Update Student Profile Details</h3>
              <p className="text-xs text-slate-400">All 10 profile dimensions will sync with the AI Career Engine.</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">1. Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">2. Education Qualification *</label>
              <input
                type="text"
                required
                placeholder="e.g. B.Tech Computer Science"
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">3. College Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. University College of Engineering"
                value={collegeName}
                onChange={e => setCollegeName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">4. Department *</label>
              <input
                type="text"
                required
                placeholder="e.g. Artificial Intelligence & Data Science"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">5. Current Year of Study *</label>
              <select
                value={yearOfStudy}
                onChange={e => setYearOfStudy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="Final Year">Final Year</option>
                <option value="Graduate / Alum">Graduate / Alum</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">10. Preferred Career Goal *</label>
              <select
                value={careerGoal}
                onChange={e => setCareerGoal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Business Analyst">Business Analyst</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              6. Technical Skills (Comma separated) *
            </label>
            <input
              type="text"
              placeholder="Python, SQL, Pandas, Machine Learning, HTML, CSS"
              value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              7. Programming Languages (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Python, SQL, C++, Java, JavaScript"
              value={languagesInput}
              onChange={e => setLanguagesInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              9. Areas of Interest (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Data Science, Machine Learning, Deep Learning, Analytics"
              value={interestsInput}
              onChange={e => setInterestsInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Projects management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                8. Completed Projects ({projects.length})
              </label>
              <button
                type="button"
                onClick={handleAddProject}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={e => {
                        const copy = [...projects];
                        copy[idx].name = e.target.value;
                        setProjects(copy);
                      }}
                      className="bg-transparent font-bold text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Brief description"
                    value={proj.description}
                    onChange={e => {
                      const copy = [...projects];
                      copy[idx].description = e.target.value;
                      setProjects(copy);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma separated, e.g. Python, Pandas, Streamlit)"
                    value={proj.technologies.join(', ')}
                    onChange={e => {
                      const copy = [...projects];
                      copy[idx].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setProjects(copy);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/30 transition"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      ) : (
        /* Readonly View of all 10 Profile Dimensions */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Dimensions */}
          <div className="rounded-2xl border border-slate-800 bg-navy-900/80 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Academic & Institutional Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Education Degree</p>
                <p className="font-semibold text-white mt-0.5">{profile.education || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">College / Institution</p>
                <p className="font-semibold text-white mt-0.5">{profile.collegeName || 'Not specified'}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Department</p>
                  <p className="font-semibold text-white mt-0.5">{profile.department || 'AI & DS'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Year of Study</p>
                  <p className="font-semibold text-white mt-0.5">{profile.yearOfStudy || '3rd Year'}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Target Career Goal</p>
                <p className="font-bold text-cyan-400 mt-0.5 text-sm">{profile.careerGoal}</p>
              </div>
            </div>
          </div>

          {/* Technical Skills & Languages */}
          <div className="rounded-2xl border border-slate-800 bg-navy-900/80 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Technical Skills & Toolsets</span>
            </h3>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Technical Competencies</p>
              <div className="flex flex-wrap gap-1.5">
                {(profile.skills || []).length === 0 ? (
                  <p className="text-xs text-slate-400">No skills added yet.</p>
                ) : (
                  profile.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Programming Languages</p>
              <div className="flex flex-wrap gap-1.5">
                {(profile.programmingLanguages || []).length === 0 ? (
                  <p className="text-xs text-slate-400">No programming languages specified.</p>
                ) : (
                  profile.programmingLanguages.map((l, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/60 text-xs font-medium"
                    >
                      {l}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Areas of Interest</p>
              <div className="flex flex-wrap gap-1.5">
                {(profile.interests || []).length === 0 ? (
                  <p className="text-xs text-slate-400">No interests selected.</p>
                ) : (
                  profile.interests.map((int, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs"
                    >
                      {int}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Projects Portfolio (Full Width) */}
          <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-navy-900/80 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Verified Completed Projects ({(profile.projects || []).length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(profile.projects || []).length === 0 ? (
                <div className="col-span-2 p-6 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                  <p className="text-xs text-slate-400">No projects added yet.</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-xs text-cyan-400 hover:underline font-bold"
                  >
                    + Add Your First Project
                  </button>
                </div>
              ) : (
                profile.projects.map(p => (
                  <div key={p.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <h4 className="text-xs font-bold text-white">{p.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
