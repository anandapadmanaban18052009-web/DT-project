import React, { useState } from 'react';
import {
  FolderGit2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Plus,
  Target,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecommendedProject } from '../../types';

export const ProjectsPage: React.FC = () => {
  const { currentCareerMatch, profile, updateProfile, setActiveTab } = useApp();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const recommendedProjects = currentCareerMatch.career.recommendedProjects;

  const handleAddProjectToProfile = (project: RecommendedProject) => {
    // Check if already in student projects
    const alreadyExists = profile.projects.some(p => p.name === project.title);
    if (!alreadyExists) {
      const updated = {
        ...profile,
        projects: [
          ...profile.projects,
          {
            id: `proj-added-${Date.now()}`,
            name: project.title,
            description: project.description,
            technologies: project.skills
          }
        ],
        // also add project skills to student skills if not present
        skills: Array.from(new Set([...profile.skills, ...project.skills]))
      };
      updateProfile(updated);
    }
    setAddedIds(prev => [...prev, project.id]);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-purple-400 mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>PORTFOLIO ACCELERATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Projects to Build for {currentCareerMatch.career.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Recommended portfolio projects strategically selected to close your missing skills
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProjects.map((project, index) => {
          const isAdded = addedIds.includes(project.id) || profile.projects.some(p => p.name === project.title);

          return (
            <div
              key={project.id}
              className="rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-purple-500/50 p-6 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-lg transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-purple-300">
                    Project 0{index + 1}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
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

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.skills.map(s => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Gap Closing Reason */}
                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-200 space-y-1">
                  <p className="font-semibold text-purple-300 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3" />
                    <span>Why This Closes Your Gap:</span>
                  </p>
                  <p className="text-[11px] text-slate-300 leading-snug">{project.reason}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleAddProjectToProfile(project)}
                  disabled={isAdded}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    isAdded
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Added to Profile & Score Boosted</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Simulate Building This Project</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
