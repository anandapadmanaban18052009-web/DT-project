import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Plus,
  Target,
  ExternalLink,
  Eye,
  X,
  ListOrdered,
  Award,
  BookOpen,
  Clock,
  Bookmark,
  Play,
  Check,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CatalogProject, getRecommendedProjectsForStudent } from '../../data/projectCatalog';
import { HelperSticker } from '../common/HelperSticker';

export const ProjectsPage: React.FC = () => {
  const { currentCareerMatch, profile, updateProfile, setActiveTab, updateProjectStatus } = useApp();
  const [selectedModalProject, setSelectedModalProject] = useState<CatalogProject | null>(null);

  // Status tracking map (persisted in student profile or local state)
  const [projectStatuses, setProjectStatuses] = useState<Record<string, 'Not Started' | 'In Progress' | 'Saved' | 'Completed'>>(() => {
    const statuses: Record<string, 'Not Started' | 'In Progress' | 'Saved' | 'Completed'> = {};
    (profile.projects || []).forEach(p => {
      if (p.status) statuses[p.name.toLowerCase()] = p.status;
      else statuses[p.name.toLowerCase()] = 'Completed';
    });
    return statuses;
  });

  // Filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'In Progress' | 'Saved' | 'Completed'>('all');

  // Intelligently recommend exactly 3 or 4 projects based on student's actual profile
  const recommendedProjects: CatalogProject[] = useMemo(() => {
    return getRecommendedProjectsForStudent(profile, currentCareerMatch.missingSkills);
  }, [profile, currentCareerMatch.missingSkills]);

  const handleUpdateStatus = (project: CatalogProject, status: 'Not Started' | 'In Progress' | 'Saved' | 'Completed') => {
    setProjectStatuses(prev => ({
      ...prev,
      [project.title.toLowerCase()]: status
    }));

    const existingProjects = profile.projects || [];
    const index = existingProjects.findIndex(p => p.name.toLowerCase() === project.title.toLowerCase());

    if (index >= 0) {
      const updated = existingProjects.map((p, idx) =>
        idx === index ? { ...p, status } : p
      );
      updateProfile({
        ...profile,
        projects: updated
      });
    } else {
      const newProj = {
        id: `proj-${Date.now()}`,
        name: project.title,
        description: project.description,
        technologies: project.skills,
        status,
        savedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      updateProfile({
        ...profile,
        projects: [...existingProjects, newProj],
        skills: status === 'Completed' ? Array.from(new Set([...(profile.skills || []), ...project.skills])) : profile.skills
      });
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return recommendedProjects;
    return recommendedProjects.filter(p => {
      const status = projectStatuses[p.title.toLowerCase()] || 'Not Started';
      return status === activeFilter;
    });
  }, [recommendedProjects, activeFilter, projectStatuses]);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-purple-400 mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>PORTFOLIO ACCELERATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Recommended Projects for {profile.careerGoal || currentCareerMatch.career.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Exactly {recommendedProjects.length} tailored project recommendations designed to help you build skills for your preferred career
          </p>
        </div>

        <button
          onClick={() => setActiveTab('career-matching')}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Change Target Role</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* AI Helper Sticker */}
      <HelperSticker featureId="projects" />

      {/* Filter Tabs & Quick Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-lg transition ${
              activeFilter === 'all'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Recommendations ({recommendedProjects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('In Progress')}
            className={`px-3 py-1 rounded-lg transition ${
              activeFilter === 'In Progress'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Progress
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('Saved')}
            className={`px-3 py-1 rounded-lg transition ${
              activeFilter === 'Saved'
                ? 'bg-amber-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('Completed')}
            className={`px-3 py-1 rounded-lg transition ${
              activeFilter === 'Completed'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Career Target: <span className="text-purple-300 font-semibold">{profile.careerGoal || 'Data Scientist'}</span>
        </span>
      </div>

      {/* Projects Grid: Exactly 3 or 4 suitable projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => {
          const currentStatus = projectStatuses[project.title.toLowerCase()] || 'Not Started';

          return (
            <div
              key={project.id}
              className="rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-purple-500/50 p-6 backdrop-blur-xl flex flex-col justify-between space-y-5 shadow-lg transition-all group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-800 text-purple-300">
                      Recommendation #{index + 1}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {project.domain}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Status Pill */}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        currentStatus === 'Completed'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : currentStatus === 'In Progress'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                          : currentStatus === 'Saved'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {currentStatus}
                    </span>

                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        project.difficulty === 'Advanced'
                          ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                          : project.difficulty === 'Intermediate'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      }`}
                    >
                      {project.difficulty}
                    </span>
                  </div>
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Duration & Prerequisites Row */}
                <div className="flex items-center space-x-4 text-xs text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Duration: {project.suggestedDuration || '2–3 Weeks'}</span>
                  </span>
                </div>

                {/* Technologies Required */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-cyan-400" />
                    <span>Technologies Required:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map(s => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills You Will Develop */}
                {project.skillsDeveloped && project.skillsDeveloped.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                      <Award className="w-3 h-3 text-purple-400" />
                      <span>Skills You Will Develop:</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skillsDeveloped.map(s => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 rounded bg-purple-950/50 text-purple-200 border border-purple-900/40 font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Why This Project is Recommended */}
                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-200 space-y-1">
                  <p className="font-semibold text-purple-300 flex items-center gap-1.5 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Why This Project is Recommended:</span>
                  </p>
                  <p className="text-[11px] text-slate-300 leading-snug">{project.reason}</p>
                </div>

                {/* Expected Project Outcome */}
                {project.expectedOutcome && (
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs space-y-1">
                    <p className="font-semibold text-cyan-300 flex items-center gap-1.5 text-[11px]">
                      <Target className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Expected Outcome:</span>
                    </p>
                    <p className="text-[11px] text-slate-300 leading-snug">{project.expectedOutcome}</p>
                  </div>
                )}
              </div>

              {/* 4 Requested Action Buttons: View Details, Start, Save, Mark Completed */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedModalProject(project)}
                    className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Project Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(project, currentStatus === 'In Progress' ? 'Not Started' : 'In Progress')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      currentStatus === 'In Progress'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{currentStatus === 'In Progress' ? 'In Progress' : 'Start This Project'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(project, currentStatus === 'Saved' ? 'Not Started' : 'Saved')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      currentStatus === 'Saved'
                        ? 'bg-amber-950 text-amber-300 border border-amber-700'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{currentStatus === 'Saved' ? 'Saved' : 'Save Project'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(project, 'Completed')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      currentStatus === 'Completed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{currentStatus === 'Completed' ? 'Completed' : 'Mark as Completed'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: View Full Project Details Page & Implementation Roadmap */}
      {selectedModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="rounded-2xl bg-[#090e1f] border border-slate-700 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedModalProject(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 border-b border-slate-800 pb-4 pr-8">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  {selectedModalProject.domain}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    selectedModalProject.difficulty === 'Advanced'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : selectedModalProject.difficulty === 'Intermediate'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}
                >
                  {selectedModalProject.difficulty} Level
                </span>
                <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{selectedModalProject.suggestedDuration || '2–3 Weeks'}</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {selectedModalProject.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedModalProject.description}
              </p>
            </div>

            {/* Technologies & Skills Developed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  <span>Technologies Required</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedModalProject.skills.map(s => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Skills You Will Develop</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedModalProject.skillsDeveloped?.map(s => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-purple-950/50 text-purple-200 border border-purple-900/40 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Recommended & Expected Outcome */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-900/50 text-xs space-y-1">
                <p className="font-semibold text-purple-300 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why This Project is Suitable for You</span>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedModalProject.reason}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/25 border border-cyan-900/50 text-xs space-y-1">
                <p className="font-semibold text-cyan-300 flex items-center gap-1.5 text-xs">
                  <Target className="w-3.5 h-3.5" />
                  <span>Expected Project Outcome</span>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedModalProject.expectedOutcome}</p>
              </div>
            </div>

            {/* Step-by-Step Implementation Overview (Roadmap) */}
            {selectedModalProject.implementationSteps && selectedModalProject.implementationSteps.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-cyan-400" />
                  <span>Step-by-Step Implementation Roadmap</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedModalProject.implementationSteps.map(step => (
                    <div
                      key={step.step}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {step.step}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-white">{step.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedModalProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Close
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedModalProject, 'In Progress');
                    setSelectedModalProject(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start Project</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedModalProject, 'Completed');
                    setSelectedModalProject(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-500/20 transition flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Completed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
