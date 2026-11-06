import React, { useState } from 'react';
import {
  BriefcaseBusiness,
  PlusCircle,
  Building2,
  Trash2,
  Edit3,
  Users,
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Code2,
  ArrowRight,
  GraduationCap,
  Calendar
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { JobRequirement } from '../../../types';
import { RecruiterJourneyFlowchart } from '../../flowchart/JourneyFlowcharts';

export const JobManagementPage: React.FC = () => {
  const {
    recruiterJobs,
    addJobRequirement,
    setSelectedJobId,
    setActiveTab,
    deleteJobRequirement,
    updateJobRequirement
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    department: '',
    experienceLevel: 'Entry Level' as 'Entry Level' | 'Associate' | 'Mid-Senior' | 'Senior',
    experienceRequired: '0 - 2 Years',
    educationRequired: 'B.Tech / B.S. in Computer Science, Data Science, or related field',
    description: '',
    requiredSkillsInput: '',
    preferredSkillsInput: ''
  });

  const handleOpenAdd = () => {
    setEditingJobId(null);
    setFormData({
      title: '',
      company: '',
      department: 'Engineering & Data',
      experienceLevel: 'Entry Level',
      experienceRequired: '0 - 2 Years',
      educationRequired: 'B.Tech / B.S. in Computer Science or related degree',
      description: '',
      requiredSkillsInput: 'Python, SQL, Machine Learning',
      preferredSkillsInput: 'Docker, PyTorch, Git'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job: JobRequirement) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title,
      company: job.company,
      department: job.department,
      experienceLevel: job.experienceLevel,
      experienceRequired: job.experienceRequired || '0 - 2 Years',
      educationRequired: job.educationRequired || 'Bachelor Degree',
      description: job.description,
      requiredSkillsInput: (job.requiredSkills || []).join(', '),
      preferredSkillsInput: (job.preferredSkills || []).join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return;

    const reqSkills = formData.requiredSkillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const prefSkills = formData.preferredSkillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingJobId) {
      if (updateJobRequirement) {
        updateJobRequirement(editingJobId, {
          title: formData.title,
          company: formData.company,
          department: formData.department,
          experienceLevel: formData.experienceLevel,
          experienceRequired: formData.experienceRequired,
          educationRequired: formData.educationRequired,
          description: formData.description,
          requiredSkills: reqSkills,
          preferredSkills: prefSkills
        });
      }
    } else {
      addJobRequirement({
        title: formData.title,
        company: formData.company,
        department: formData.department,
        experienceLevel: formData.experienceLevel,
        experienceRequired: formData.experienceRequired,
        educationRequired: formData.educationRequired,
        description: formData.description,
        requiredSkills: reqSkills,
        preferredSkills: prefSkills
      });
    }

    setIsModalOpen(false);
  };

  const filteredJobs = recruiterJobs.filter(
    j =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-navy-900 to-slate-900 p-6 sm:p-8 border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 text-xs font-semibold">
              <BriefcaseBusiness className="w-3.5 h-3.5" />
              <span>Recruitment Management Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Job Requirements Management
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Create and manage job specifications, define required technical competencies, and launch AI candidate matching against the student talent pool.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job Requirement</span>
          </button>
        </div>
      </div>

      {/* Search & Statistics Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs by title or skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50"
          />
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="text-white font-bold">{filteredJobs.length}</span> active job requirements
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className="rounded-2xl border border-slate-800 bg-navy-900/70 p-6 flex flex-col justify-between hover:border-purple-500/40 transition group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
                  {job.experienceLevel}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(job)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Edit Job Requirement"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {deleteJobRequirement && (
                    <button
                      onClick={() => deleteJobRequirement(job.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition"
                      title="Delete Job"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition line-clamp-1">
                {job.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{job.company}</span>
                <span className="text-slate-600">•</span>
                <span>{job.department}</span>
              </p>

              <p className="text-xs text-slate-300 mt-3 line-clamp-2">
                {job.description}
              </p>

              {/* Required Skills Badges */}
              <div className="mt-4 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Required Competencies ({job.requiredSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {job.requiredSkills.slice(0, 5).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 5 && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      +{job.requiredSkills.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{job.postedDate}</span>
              </span>
              <button
                onClick={() => {
                  setSelectedJobId(job.id);
                  setActiveTab('recruiter-matching');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/40 flex items-center gap-1.5 transition"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Match Candidates</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recruiter Hiring Flowchart Section */}
      <div className="pt-6">
        <RecruiterJourneyFlowchart />
      </div>

      {/* Create / Edit Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-navy-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingJobId ? 'Edit Job Requirement' : 'Post New Job Requirement'}
                </h3>
                <p className="text-xs text-slate-400">Define specifications for AI candidate matching</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Data Scientist"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex AI Labs"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Applied AI"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Experience Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        experienceLevel: e.target.value as any
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Associate">Associate</option>
                    <option value="Mid-Senior">Mid-Senior</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Experience Required</label>
                  <input
                    type="text"
                    placeholder="e.g. 0 - 2 Years"
                    value={formData.experienceRequired}
                    onChange={e => setFormData({ ...formData, experienceRequired: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Minimum Education</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech / B.S. in Computer Science or related degree"
                  value={formData.educationRequired}
                  onChange={e => setFormData({ ...formData, educationRequired: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Required Skills (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Python, SQL, Machine Learning, Statistics"
                  value={formData.requiredSkillsInput}
                  onChange={e => setFormData({ ...formData, requiredSkillsInput: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Preferred Skills (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Docker, PyTorch, Deep Learning, Git"
                  value={formData.preferredSkillsInput}
                  onChange={e => setFormData({ ...formData, preferredSkillsInput: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Job Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe role responsibilities and technical expectations..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 transition"
                >
                  {editingJobId ? 'Save Changes' : 'Post Requirement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
