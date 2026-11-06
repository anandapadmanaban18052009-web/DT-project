import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Layers,
  ArrowRight,
  Sparkles,
  BarChart3,
  GitFork,
  HelpCircle,
  ShieldAlert,
  BookOpen
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const SkillGapPage: React.FC = () => {
  const { currentCareerMatch, profile, setActiveTab } = useApp();
  const [chartView, setChartView] = useState<'radar' | 'bar'>('bar');

  const allUserSkills = useMemo(() => {
    return Array.from(
      new Set([
        ...(profile.skills || []),
        ...(profile.programmingLanguages || [])
      ])
    );
  }, [profile]);

  // Skill strength rating helper
  const getSkillStrength = (skill: string): { level: 'Strong' | 'Intermediate' | 'Beginner'; score: number; color: string } => {
    const s = skill.toLowerCase();
    if (s.includes('python') || s.includes('pandas') || s.includes('sql') || s.includes('react')) {
      return { level: 'Strong', score: 85, color: 'text-emerald-400 border-emerald-800 bg-emerald-950/70' };
    }
    if (s.includes('machine learning') || s.includes('git') || s.includes('javascript')) {
      return { level: 'Intermediate', score: 70, color: 'text-cyan-400 border-cyan-800 bg-cyan-950/70' };
    }
    return { level: 'Beginner', score: 50, color: 'text-blue-400 border-blue-800 bg-blue-950/70' };
  };

  // Dynamically compute competency comparison between user's actual profile and benchmark role requirements
  const comparisonData = useMemo(() => {
    const targetSkills = currentCareerMatch.career.requiredSkills;
    return targetSkills.map(req => {
      const isMatched = allUserSkills.some(
        s => s.toLowerCase() === req.toLowerCase() ||
             s.toLowerCase().includes(req.toLowerCase()) ||
             req.toLowerCase().includes(s.toLowerCase())
      );
      const current = isMatched ? 85 : 20;
      const required = 85;
      return {
        skill: req,
        current,
        required,
        gap: Math.max(0, required - current)
      };
    });
  }, [currentCareerMatch, allUserSkills]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-400 mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>DIAGNOSTIC GAP MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Skill Gap Analysis for {currentCareerMatch.career.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Personalized comparison of your verified competencies vs target role prerequisites
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-sm">
          <p className="font-semibold text-slate-300 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Real Profile Analysis</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            All data reflects your current logged-in account ({profile.name || 'Student'}).
          </p>
        </div>
      </div>

      {/* Main Two-Column Skill Matrix: Acquired vs Missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Your Current Skills */}
        <div className="rounded-2xl bg-navy-900/80 border border-emerald-500/30 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Your Verified Skills</h2>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/60">
              {allUserSkills.length} Total
            </span>
          </div>

          {allUserSkills.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 italic space-y-2">
              <p>No skills recorded in your profile yet.</p>
              <button
                onClick={() => setActiveTab('onboarding')}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-semibold text-xs"
              >
                Add Your Skills
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {allUserSkills.map(skill => {
                const { level, color } = getSkillStrength(skill);
                return (
                  <div
                    key={skill}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{skill}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Active in profile</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${color}`}>
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
            <p className="font-semibold text-slate-200">Matching Status:</p>
            <p className="text-slate-400 mt-1">
              You possess {currentCareerMatch.matchingSkills.length} of {currentCareerMatch.career.requiredSkills.length} required competencies for {currentCareerMatch.career.title}.
            </p>
          </div>
        </div>

        {/* Right: Missing Skills by Priority */}
        <div className="rounded-2xl bg-navy-900/80 border border-amber-500/30 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Missing Competencies</h2>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800/60">
              {currentCareerMatch.missingSkills.length} Action Items
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {currentCareerMatch.missingSkills.length === 0 ? (
              <div className="p-6 text-center text-xs text-emerald-300 font-semibold bg-emerald-950/30 rounded-xl border border-emerald-800">
                🎉 Congratulations! You have satisfied all core requirements for this role.
              </div>
            ) : (
              currentCareerMatch.missingSkills.map(missing => (
                <div
                  key={missing.skill}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 hover:border-amber-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{missing.skill}</span>
                      <span className="text-[10px] text-slate-400">• {missing.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{missing.recommendation}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        missing.priority === 'High'
                          ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                          : 'bg-amber-950/80 text-amber-300 border-amber-800'
                      }`}
                    >
                      {missing.priority}
                    </span>
                    <button
                      onClick={() => setActiveTab('learn-skills')}
                      className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60"
                    >
                      <span>LEARN THIS SKILL</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-amber-300">Dedicated Skill Learning Hub</p>
              <p className="text-[11px] text-slate-400">Access verified tutorials, practice exercises & mini-projects.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('learn-skills')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1 shadow-md shadow-cyan-600/30"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Learn Missing Skills</span>
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition flex items-center gap-1"
              >
                <span>Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Chart: Current Skills vs Required Skills */}
      <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span>Competency Comparison: Your Profile vs Benchmark Requirements</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target requirements for {currentCareerMatch.career.title}
            </p>
          </div>

          {/* Chart Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setChartView('bar')}
              className={`px-3 py-1 rounded-lg transition ${
                chartView === 'bar' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bar Comparison
            </button>
            <button
              onClick={() => setChartView('radar')}
              className={`px-3 py-1 rounded-lg transition ${
                chartView === 'radar' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Radar Profile
            </button>
          </div>
        </div>

        {/* Visual Charts */}
        {chartView === 'bar' ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                <XAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="current" name="Your Profile" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="required" name="Benchmark Requirement" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={comparisonData} outerRadius="75%">
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={false} />
                <Radar name="Your Skills" dataKey="current" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                <Radar name="Required Level" dataKey="required" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-cyan-400" />
              <span>Your Profile Status</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-purple-500" />
              <span>Industry Benchmark Standard</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
