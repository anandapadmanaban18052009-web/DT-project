import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  BriefcaseBusiness,
  ShieldCheck,
  Eye,
  Star,
  Layers,
  ChevronDown,
  Building2,
  Award,
  BookOpen,
  ArrowRight,
  UserCheck,
  GraduationCap,
  X
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { CandidateMatchResult, CandidateProfile } from '../../../types';
import { RecruiterJourneyFlowchart } from '../../flowchart/JourneyFlowcharts';

export const CandidateMatchingPage: React.FC = () => {
  const {
    recruiterJobs,
    selectedJobId,
    setSelectedJobId,
    selectedJob,
    candidateMatches,
    candidates,
    setActiveTab
  } = useApp();

  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleShortlist = (id: string) => {
    setShortlistedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredMatches = candidateMatches.filter(m => {
    const matchesSearch =
      m.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.candidate.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.candidate.collegeName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === 'all') return true;
    if (filterStatus === 'shortlisted') return shortlistedIds.has(m.candidate.id);
    if (filterStatus === 'top') return m.status === 'Top Candidate';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-navy-900 to-slate-900 p-6 sm:p-8 border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>AI Candidate Matching Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Candidate Skill Matching & Scoring
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Compare applicants against required and preferred job competencies using multidimensional skill-overlap and verified portfolio models.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('recruiter-jobs')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
            >
              <BriefcaseBusiness className="w-4 h-4 text-purple-400" />
              <span>Manage Job Posts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Job Selector & Fairness Shield Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Job Dropdown Selector */}
        <div className="lg:col-span-7 bg-navy-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950 border border-purple-800/80 text-purple-400">
              <BriefcaseBusiness className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Target Job Requirement</p>
              <select
                value={selectedJobId}
                onChange={e => setSelectedJobId(e.target.value)}
                className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer mt-0.5"
              >
                {recruiterJobs.map(job => (
                  <option key={job.id} value={job.id} className="bg-navy-900 text-white">
                    {job.title} • {job.company} ({job.experienceLevel})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/60 border border-purple-800/50 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span>{selectedJob?.requiredSkills?.length || 0} Required Skills</span>
          </div>
        </div>

        {/* AI Fairness & Anti-Bias Assurance Banner */}
        <div className="lg:col-span-5 bg-navy-900/60 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Fairness & Bias Shield Active</span>
              <span className="text-[10px] text-emerald-400 font-mono">100% Objective</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ranking is calculated strictly on verified skills, projects, and degree alignment. Gender, age, and personal attributes have zero weight.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates by name, skill, or college..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All Candidates ({candidateMatches.length})
          </button>
          <button
            onClick={() => setFilterStatus('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'top'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Top Candidates
          </button>
          <button
            onClick={() => setFilterStatus('shortlisted')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'shortlisted'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Shortlisted ({shortlistedIds.size})
          </button>
        </div>
      </div>

      {/* Candidate Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((result, idx) => {
          const isShortlisted = shortlistedIds.has(result.candidate.id);
          return (
            <div
              key={result.candidate.id}
              className="rounded-2xl border border-slate-800 bg-navy-900/70 p-5 sm:p-6 hover:border-purple-500/40 transition group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Candidate Info */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-base font-bold text-white shadow-md">
                      {result.candidate.name.charAt(0)}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-bold text-slate-300 flex items-center justify-center">
                      #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                        {result.candidate.name}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                          result.status === 'Top Candidate'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : result.status === 'Strong Match'
                            ? 'bg-purple-950 text-purple-300 border-purple-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>{result.candidate.education}</span>
                      <span className="text-slate-600">•</span>
                      <span>{result.candidate.collegeName}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-cyan-400 font-semibold">{result.candidate.gpa}</span>
                    </p>

                    {/* AI Score Explanation */}
                    <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed max-w-2xl">
                      <span className="text-purple-400 font-bold mr-1">AI Match Insight:</span>
                      {result.explanation}
                    </div>
                  </div>
                </div>

                {/* Match Score & Action Buttons */}
                <div className="flex items-center space-x-4 self-end lg:self-center shrink-0">
                  <div className="text-right">
                    <div className="text-2xl font-black text-white flex items-center gap-1 justify-end">
                      <span
                        className={
                          result.matchScore >= 80
                            ? 'text-emerald-400'
                            : result.matchScore >= 65
                            ? 'text-purple-400'
                            : 'text-slate-300'
                        }
                      >
                        {result.matchScore}%
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Match Fit</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedCandidate(result.candidate)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
                    >
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      <span>View Profile</span>
                    </button>

                    <button
                      onClick={() => toggleShortlist(result.candidate.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isShortlisted
                          ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                          : 'bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/40'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-white' : ''}`} />
                      <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Skills breakdown */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                    Matched Skills ({result.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedSkills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 text-[11px]"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                    Missing Competencies ({result.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingSkills.length === 0 ? (
                      <span className="text-slate-400 text-[11px]">No critical skill gaps</span>
                    ) : (
                      result.missingSkills.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-amber-950/40 text-amber-300 border border-amber-800/40 text-[11px]"
                        >
                          ✕ {s}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recruiter Flowchart */}
      <div className="pt-6">
        <RecruiterJourneyFlowchart />
      </div>

      {/* Detailed Candidate Inspection Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-navy-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-lg font-bold text-white shadow-md">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-400">{selectedCandidate.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Academic Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Degree</p>
                <p className="font-semibold text-white mt-0.5">{selectedCandidate.education}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase">College</p>
                <p className="font-semibold text-white mt-0.5">{selectedCandidate.collegeName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Academic Standing</p>
                <p className="font-semibold text-cyan-400 mt-0.5">GPA {selectedCandidate.gpa}</p>
              </div>
            </div>

            {/* Candidate Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Demonstrated Skills & Programming
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[...selectedCandidate.skills, ...(selectedCandidate.programmingLanguages || [])].map(
                  (skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Projects Portfolio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Verified Projects ({(selectedCandidate.projects || []).length})
              </h4>
              <div className="space-y-2.5">
                {(selectedCandidate.projects || []).map(p => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <h5 className="text-xs font-bold text-cyan-300">{p.name}</h5>
                    <p className="text-xs text-slate-300 mt-1">{p.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
