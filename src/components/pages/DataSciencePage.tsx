import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Activity,
  Layers,
  Sparkles,
  Info,
  Database
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  SKILL_DISTRIBUTION_DATA,
  CAREER_DEMAND_DATA,
  SKILL_GAP_PREVALENCE,
  CAREER_MATCH_SPREAD
} from '../../data/mockData';

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export const DataSciencePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>DATA SCIENCE ANALYTICS SUITE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Talent Market & Skill Distribution Insights
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Quantitative analysis of tech labor supply, demand indices, and recurring academic skill gaps
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-sm">
          <p className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sample Industry Dataset</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Synthetic sample corpus of 1,200 tech candidate profiles and 4,800 active job postings for college demo purposes.
          </p>
        </div>
      </div>

      {/* 4 Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Skill Distribution vs Industry Demand */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Candidate Skill Prevalence vs Market Demand Index</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Sample N=1,200</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Candidate possess rate (teal) plotted against employer demand index (blue)
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_DISTRIBUTION_DATA.slice(0, 7)} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#94a3b8" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="candidatesCount" name="% Candidates with Skill" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demandIndex" name="Market Demand Index" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            * Finding: While 84% know Python, only 38% have rigorous Statistics foundations despite a 86% demand index.
          </p>
        </div>

        {/* Chart 2: Career Demand & Open Vacancy Volume */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Job Vacancy Volume by Role</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Q3 Industry Telemetry</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active openings across major tech centers
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CAREER_DEMAND_DATA} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 10 }}>
                <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis dataKey="role" type="category" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="openJobs" name="Open Positions" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            * Software Dev & Data Analyst roles dominate hiring volume, with AI Engineer displaying highest growth rate (+45%).
          </p>
        </div>

        {/* Chart 3: Skill Gap Frequency in College Cohorts */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Skill Gap Frequency Among Undergraduates</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Curriculum Deficits</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Percentage of surveyed senior students lacking specific industry requirements
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_GAP_PREVALENCE} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 9 }} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="gapFrequency" name="% Cohort with Skill Gap" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            * 74% of graduates lack hands-on Docker/MLOps experience; 68% lack formal applied statistics validation.
          </p>
        </div>

        {/* Chart 4: Career Match Distribution */}
        <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-purple-400" />
                <span>Distribution of Student Match Scores</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Cohort Fit Spread</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              How students score upon first onboarding across target roles
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CAREER_MATCH_SPREAD}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="matchRange"
                  label={({ matchRange, percent }) => `${matchRange} (${(percent * 100).toFixed(0)}%)`}
                >
                  {CAREER_MATCH_SPREAD.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-slate-400 italic text-center">
            * The majority of students (62%) fall in the 70–89% range, needing 2-3 focused roadmaps to reach full readiness.
          </p>
        </div>
      </div>
    </div>
  );
};
