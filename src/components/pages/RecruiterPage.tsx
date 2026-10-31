import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Filter,
  GraduationCap,
  Building2,
  Mail,
  ChevronRight,
  X,
  Layers,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CandidateMatchResult, JobRequirement } from '../../types';

export const RecruiterPage: React.FC = () => {
  const {
    recruiterJobs,
    selectedJobId,
    setSelectedJobId,
    selectedJob,
    candidateMatches,
    addJobRequirement
  } = useApp();

  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<CandidateMatchResult | null>(null);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('Nexus AI Labs');
  const [newDept, setNewDept] = useState('Machine Intelligence Squad');
  const [newSkills, setNewSkills] = useState('Python, SQL, Machine Learning, Statistics, Deep Learning');
  const [newPrefSkills, setNewPrefSkills] = useState('FastAPI, Docker, Git');
  const [newDesc, setNewDesc] = useState('Looking for candidates with strong foundational modeling and analytical skills.');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addJobRequirement({
      title: newTitle,
      company: newCompany,
      department: newDept,
      experienceLevel: 'Entry Level',
      requiredSkills: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: newPrefSkills.split(',').map(s => s.trim()).filter(Boolean),
      description: newDesc
    });

    setIsCreateJobOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-purple-400 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>RECRUITER TALENT INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Eightfold Talent Acquisition & Workforce Solutions
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Multi-candidate algorithmic matching and skill gap auditing for campus hiring
          </p>
        </div>

        <button
          onClick={() => setIsCreateJobOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/25 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job Requirement</span>
        </button>
      </div>

      {/* Candidate Matching Engine Pipeline Visual Explanation */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-purple-900/40 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-purple-400">
            <Cpu className="w-4 h-4" />
            <span>CANDIDATE MATCHING ENGINE LOGIC</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
            Prototype Heuristic Model
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-center font-mono">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-full md:w-44 text-slate-300">
            <p className="text-[10px] text-purple-400 font-sans font-bold">INPUT A</p>
            <p className="font-bold text-white">Job Requirements</p>
          </div>
          <span className="text-slate-500 font-sans font-bold">+</span>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-full md:w-44 text-slate-300">
            <p className="text-[10px] text-cyan-400 font-sans font-bold">INPUT B</p>
            <p className="font-bold text-white">Candidate Profile</p>
          </div>
          <span className="text-purple-400">→</span>
          <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/80 w-full md:w-44 text-purple-200">
            <p className="text-[10px] text-purple-300 font-sans font-bold">PROCESSING</p>
            <p className="font-bold">Similarity Analysis</p>
          </div>
          <span className="text-purple-400">→</span>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-full md:w-44 text-slate-300">
            <p className="text-[10px] text-amber-400 font-sans font-bold">DIAGNOSTIC</p>
            <p className="font-bold text-white">Skill Gaps Found</p>
          </div>
          <span className="text-purple-400">→</span>
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 w-full md:w-44 text-emerald-200">
            <p className="text-[10px] text-emerald-300 font-sans font-bold">OUTPUT</p>
            <p className="font-bold">Ranked Candidates</p>
          </div>
        </div>
      </div>

      {/* Job Selector Tabs */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Active Job Requirements ({recruiterJobs.length}):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recruiterJobs.map(job => {
            const isSelected = job.id === selectedJob.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500/80 shadow-md ring-1 ring-purple-500/30'
                    : 'bg-navy-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {job.experienceLevel}
                  </span>
                  <span className="text-[10px] text-slate-400">{job.postedDate}</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{job.title}</h3>
                <p className="text-xs text-slate-400">{job.company}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.requiredSkills.slice(0, 3).map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {s}
                    </span>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <span className="text-[9px] text-slate-400">+{job.requiredSkills.length - 3}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Job Banner & Candidate Matches */}
      <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white">{selectedJob.title}</h2>
              <span className="text-xs text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-800">
                {candidateMatches.length} Candidates Evaluated
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{selectedJob.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 max-w-sm sm:justify-end">
            <span className="text-[11px] text-slate-400 font-semibold mr-1">Required:</span>
            {selectedJob.requiredSkills.map(req => (
              <span key={req} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono">
                {req}
              </span>
            ))}
          </div>
        </div>

        {/* Candidate Matching Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidateMatches.map((res, index) => {
            const { candidate, matchScore, matchedSkills, missingSkills, status } = res;

            return (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidateModal(res)}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-md group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-purple-400 font-mono">#{index + 1}</span>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {candidate.name}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-400">{candidate.department} • {candidate.yearOfStudy}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xl font-black text-cyan-400 font-mono">{matchScore}%</span>
                      <p className="text-[9px] text-slate-400 uppercase font-semibold">Match</p>
                    </div>
                  </div>

                  {/* Horizontal Match Bar */}
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        matchScore >= 85 ? 'bg-cyan-500' : matchScore >= 70 ? 'bg-purple-500' : 'bg-slate-500'
                      }`}
                      style={{ width: `${matchScore}%` }}
                    />
                  </div>

                  {/* Skills summary */}
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-emerald-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Matched Skills:</span>
                      </span>
                      <span className="font-bold">{matchedSkills.length}</span>
                    </div>

                    <div className="flex items-center justify-between text-amber-400">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Missing Requirements:</span>
                      </span>
                      <span className="font-bold">{missingSkills.length}</span>
                    </div>
                  </div>

                  {/* Missing skill tags pills */}
                  {missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {missingSkills.slice(0, 2).map(m => (
                        <span key={m} className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-900/60">
                          Missing: {m}
                        </span>
                      ))}
                      {missingSkills.length > 2 && (
                        <span className="text-[9px] text-slate-400">+{missingSkills.length - 2}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] text-emerald-300 font-semibold">
                      ✓ All core requirements fulfilled!
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    GPA: {candidate.gpa}
                  </span>
                  <span className="text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Drill-Down Inspection Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-navy-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white">{selectedCandidateModal.candidate.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                    {selectedCandidateModal.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedCandidateModal.candidate.education} • GPA {selectedCandidateModal.candidate.gpa}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{selectedCandidateModal.candidate.email}</span>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-3xl font-black text-cyan-400 font-mono">
                    {selectedCandidateModal.matchScore}%
                  </span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Match Score</p>
                </div>
                <button
                  onClick={() => setSelectedCandidateModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Matching & Missing Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Matching Skills ({selectedCandidateModal.matchedSkills.length})</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidateModal.matchedSkills.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                <p className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Missing Requirements ({selectedCandidateModal.missingSkills.length})</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidateModal.missingSkills.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No missing requirements</p>
                  ) : (
                    selectedCandidateModal.missingSkills.map(m => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        ⚠ {m}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Candidate Projects */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Academic & Portfolio Projects ({selectedCandidateModal.candidate.projects.length})
              </h4>
              <div className="space-y-2">
                {selectedCandidateModal.candidate.projects.map(proj => (
                  <div key={proj.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-xs font-bold text-white">{proj.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <p className="text-[11px] text-slate-400">Candidate ranked using Eightfold weighted heuristic model</p>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {isCreateJobOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-navy-900 border border-slate-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create New Job Specification</h3>
              <button onClick={() => setIsCreateJobOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Role Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Prompt & Evaluation Specialist"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={newSkills}
                  onChange={e => setNewSkills(e.target.value)}
                  placeholder="Python, SQL, Machine Learning, Deep Learning"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Skills</label>
                <input
                  type="text"
                  value={newPrefSkills}
                  onChange={e => setNewPrefSkills(e.target.value)}
                  placeholder="Docker, Git, FastAPI"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Synopsis</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateJobOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
                >
                  Publish & Match Candidates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
