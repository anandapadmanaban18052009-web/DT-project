import React, { useState, useMemo } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BarChart2,
  PieChart as PieIcon,
  BookOpen,
  Calendar,
  Check,
  AlertTriangle,
  Play,
  TrendingUp,
  History,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';
import {
  ASSESSMENT_SKILL_CATEGORIES,
  ASSESSMENT_QUESTION_BANK,
  ALL_ASSESSMENT_SKILLS
} from '../../data/assessmentQuestions';
import { HelperSticker } from '../common/HelperSticker';
import { AssessmentQuestion, AssessmentResult } from '../../types';

export const SkillAssessmentPage: React.FC = () => {
  const { profile, saveAssessmentResult, setActiveTab, currentUser } = useApp();

  // Mode: 'select' | 'test' | 'results' | 'history'
  const [viewMode, setViewMode] = useState<'select' | 'test' | 'results' | 'history'>('select');

  // Selected skills for assessment
  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    // Default to user's profile skills that exist in our bank, or first 2 skills
    const fromProfile = (profile.skills || []).filter(s =>
      ALL_ASSESSMENT_SKILLS.some(as => as.toLowerCase() === s.toLowerCase())
    );
    return fromProfile.length > 0 ? fromProfile.slice(0, 3) : ['Python', 'SQL'];
  });

  // Test session state
  const [testQuestions, setTestQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Active result state
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);

  // Handle skill toggle in selection
  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Select all profile skills
  const handleSelectProfileSkills = () => {
    const profileMatches = ALL_ASSESSMENT_SKILLS.filter(s =>
      (profile.skills || []).some(ps => ps.toLowerCase() === s.toLowerCase()) ||
      (profile.programmingLanguages || []).some(pl => pl.toLowerCase() === s.toLowerCase())
    );
    if (profileMatches.length > 0) {
      setSelectedSkills(profileMatches);
    } else {
      setSelectedSkills(['Python', 'SQL', 'Machine Learning']);
    }
  };

  // Select all / clear
  const handleClearSkills = () => setSelectedSkills([]);
  const handleSelectAllSkills = () => setSelectedSkills([...ALL_ASSESSMENT_SKILLS]);

  // Start the assessment test
  const handleStartTest = () => {
    if (selectedSkills.length === 0) return;

    // Generate 5 questions per selected skill from question bank
    const generated: AssessmentQuestion[] = [];
    selectedSkills.forEach(skill => {
      const bank = ASSESSMENT_QUESTION_BANK[skill] || [];
      // Pick up to 5 questions (if bank has more, shuffle)
      const shuffled = [...bank].sort(() => 0.5 - Math.random()).slice(0, 5);
      generated.push(...shuffled);
    });

    // Shuffle the full test questions
    const finalQuestions = generated.sort(() => 0.5 - Math.random());

    setTestQuestions(finalQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setViewMode('test');
  };

  // Answer selection
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Submit test and calculate scores
  const handleSubmitTest = async () => {
    setIsSubmitting(true);

    let totalCorrect = 0;
    const skillStats: Record<string, { correct: number; total: number }> = {};

    selectedSkills.forEach(s => {
      skillStats[s] = { correct: 0, total: 0 };
    });

    testQuestions.forEach(q => {
      if (!skillStats[q.skill]) {
        skillStats[q.skill] = { correct: 0, total: 0 };
      }
      skillStats[q.skill].total += 1;

      const studentAnswer = userAnswers[q.id];
      if (studentAnswer !== undefined && studentAnswer === q.correctIndex) {
        totalCorrect += 1;
        skillStats[q.skill].correct += 1;
      }
    });

    const totalQuestions = testQuestions.length;
    const incorrectAnswers = totalQuestions - totalCorrect;
    const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    const skillScores: Record<string, number> = {};
    Object.entries(skillStats).forEach(([skill, stat]) => {
      skillScores[skill] = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    });

    const result: AssessmentResult = {
      id: 'asmt_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      selectedSkills: [...selectedSkills],
      totalQuestions,
      correctAnswers: totalCorrect,
      incorrectAnswers,
      overallPercentage,
      skillScores,
      userAnswers: { ...userAnswers }
    };

    setCurrentResult(result);
    await saveAssessmentResult(result);

    setIsSubmitting(false);
    setShowConfirmModal(false);
    setViewMode('results');
  };

  // Performance Category Helper
  const getPerformanceCategory = (score: number) => {
    if (score >= 80) {
      return {
        label: 'Strong Understanding',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/80',
        border: 'border-emerald-800'
      };
    }
    if (score >= 60) {
      return {
        label: 'Good Understanding',
        color: 'text-cyan-400',
        bg: 'bg-cyan-950/80',
        border: 'border-cyan-800'
      };
    }
    if (score >= 40) {
      return {
        label: 'Basic Understanding',
        color: 'text-amber-400',
        bg: 'bg-amber-950/80',
        border: 'border-amber-800'
      };
    }
    return {
      label: 'Needs Improvement',
      color: 'text-rose-400',
      bg: 'bg-rose-950/80',
      border: 'border-rose-800'
    };
  };

  // Active question in test
  const activeQuestion = testQuestions[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;

  // Chart data for current result
  const pieData = useMemo(() => {
    if (!currentResult) return [];
    return [
      { name: 'Correct Answers', value: currentResult.correctAnswers, color: '#06b6d4' },
      { name: 'Incorrect Answers', value: currentResult.incorrectAnswers, color: '#f43f5e' }
    ];
  }, [currentResult]);

  const barData = useMemo(() => {
    if (!currentResult) return [];
    return Object.entries(currentResult.skillScores).map(([skill, score]) => ({
      skill,
      score,
      category: getPerformanceCategory(score).label
    }));
  }, [currentResult]);

  // Assessment History
  const historyList: AssessmentResult[] = useMemo(() => {
    return profile.assessmentHistory || currentUser?.assessmentHistory || [];
  }, [profile.assessmentHistory, currentUser?.assessmentHistory]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-1">
            <Brain className="w-4 h-4" />
            <span>KNOWLEDGE VERIFICATION SYSTEM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            MY SKILL ASSESSMENT
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Test your practical competency on selected skills with verified MCQs, charts, and tailored learning recommendations
          </p>
        </div>

        {/* View mode switcher tabs */}
        <div className="flex items-center space-x-2">
          {viewMode !== 'test' && (
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('select')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  viewMode === 'select'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Take Assessment
              </button>
              {currentResult && (
                <button
                  onClick={() => setViewMode('results')}
                  className={`px-3 py-1.5 rounded-lg transition font-medium ${
                    viewMode === 'results'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Latest Results
                </button>
              )}
              <button
                onClick={() => setViewMode('history')}
                className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                  viewMode === 'history'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History ({historyList.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Persistent AI Helper Sticker */}
      <HelperSticker featureId="skill-assessment" />

      {/* =========================================================================
          VIEW 1: SELECT SKILLS SCREEN
          ========================================================================= */}
      {viewMode === 'select' && (
        <div className="space-y-6">
          {/* Quick Guidance Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-850 border border-cyan-500/30 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Select Skills to Evaluate</span>
              </h3>
              <p className="text-xs text-slate-300">
                Choose the technical competencies you want to test. Each selected skill includes 5 targeted practical multiple-choice questions.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSelectProfileSkills}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition flex items-center gap-1.5"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Select My Profile Skills</span>
              </button>
              <button
                type="button"
                onClick={handleSelectAllSkills}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearSkills}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Skill Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ASSESSMENT_SKILL_CATEGORIES.map(cat => (
              <div
                key={cat.category}
                className="rounded-2xl bg-navy-900/80 border border-slate-800 p-5 backdrop-blur-xl space-y-4 shadow-lg"
              >
                <div className="border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-white flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {cat.skills.filter(s => selectedSkills.includes(s)).length}/{cat.skills.length}
                    </span>
                  </h4>
                </div>

                <div className="space-y-2">
                  {cat.skills.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    const isInProfile = (profile.skills || []).some(
                      ps => ps.toLowerCase() === skill.toLowerCase()
                    );

                    return (
                      <label
                        key={skill}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-600 text-white shadow-sm'
                            : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSkill(skill)}
                            className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 cursor-pointer"
                          />
                          <span className="text-xs font-semibold">{skill}</span>
                        </div>

                        {isInProfile && (
                          <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-900">
                            In Profile
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer Bar */}
          <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-navy-900/95 border border-cyan-500/40 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-sm">
                {selectedSkills.length}
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {selectedSkills.length} Skills Selected • {selectedSkills.length * 5} Total Questions
                </p>
                <p className="text-[11px] text-slate-400">
                  {selectedSkills.length === 0
                    ? 'Please select at least 1 skill to generate questions.'
                    : `Estimated duration: ~${selectedSkills.length * 4} minutes (4 options per question)`}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartTest}
              disabled={selectedSkills.length === 0}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Skill Assessment Test</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: TEST RUNNER SCREEN (One Question at a Time)
          ========================================================================= */}
      {viewMode === 'test' && activeQuestion && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Test Header Progress */}
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400 font-bold">
                  Question {currentQuestionIndex + 1} of {testQuestions.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px]">
                  {activeQuestion.skill}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                  {activeQuestion.difficulty}
                </span>
              </div>

              <span className="text-slate-400 text-xs">
                {answeredCount} of {testQuestions.length} Answered
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.round(((currentQuestionIndex + 1) / testQuestions.length) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="rounded-2xl bg-navy-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
                Question {currentQuestionIndex + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {activeQuestion.question}
              </h2>
            </div>

            {/* 4 Multiple Choice Answer Options */}
            <div className="space-y-3 pt-2">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = userAnswers[activeQuestion.id] === idx;
                const optionLetters = ['A', 'B', 'C', 'D'];

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(activeQuestion.id, idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-950/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 pr-4">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border transition ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 group-hover:border-slate-700'
                        }`}
                      >
                        {optionLetters[idx]}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        {option}
                      </span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400'
                          : 'border-slate-700 bg-transparent'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Question Navigation Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-2">
                {currentQuestionIndex < testQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(testQuestions.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-md shadow-cyan-600/25 transition"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(true)}
                    className="px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Test</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Jump Palette */}
          <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
            <p className="text-[11px] font-semibold text-slate-400">Question Palette:</p>
            <div className="flex flex-wrap gap-1.5">
              {testQuestions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center border ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 ring-2 ring-cyan-500/30'
                        : isAnswered
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Submit Button (always visible) */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="text-xs text-slate-400 hover:text-emerald-400 underline font-medium"
            >
              Ready to submit test ({answeredCount}/{testQuestions.length} answered)? Click here.
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Submission */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="rounded-2xl bg-[#090e1f] border border-slate-700 p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Submit Skill Assessment?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You have answered <span className="text-cyan-400 font-bold">{answeredCount}</span> of{' '}
                <span className="font-bold text-white">{testQuestions.length}</span> questions.
                {answeredCount < testQuestions.length && (
                  <span className="block text-amber-400 mt-1">
                    Warning: You have {testQuestions.length - answeredCount} unanswered questions which will be counted as incorrect.
                  </span>
                )}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Back to Questions
              </button>
              <button
                type="button"
                onClick={handleSubmitTest}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 transition flex items-center gap-1.5"
              >
                {isSubmitting ? 'Calculating...' : 'Confirm & Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: ASSESSMENT RESULTS SCREEN (Charts, Breakdown, Recommendations)
          ========================================================================= */}
      {viewMode === 'results' && currentResult && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Score Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
                <CheckCircle2 className="w-3 h-3" />
                <span>Test Completed • {currentResult.date}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Assessment Results Overview
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Your performance has been evaluated against practical industry questions. Results have been automatically integrated into your AI Career Engine profile.
              </p>
            </div>

            <div className="flex items-center space-x-6 shrink-0">
              <div className="text-center p-4 rounded-2xl bg-slate-950/80 border border-slate-800 min-w-32">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
                  {currentResult.overallPercentage}%
                </span>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                  Overall Score
                </p>
              </div>

              <div className="text-left space-y-1 text-xs">
                <p className="text-slate-300">
                  <span className="text-emerald-400 font-bold">{currentResult.correctAnswers}</span> Correct
                </p>
                <p className="text-slate-300">
                  <span className="text-rose-400 font-bold">{currentResult.incorrectAnswers}</span> Incorrect
                </p>
                <p className="text-slate-400">
                  Total: <span className="text-white font-bold">{currentResult.totalQuestions}</span> MCQs
                </p>
              </div>
            </div>
          </div>

          {/* Charts Row: Pie Chart on Left, Bar Graph on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pie Chart: Correct vs Incorrect */}
            <div className="lg:col-span-5 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4 shadow-lg">
              <div className="border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-cyan-400" />
                  <span>Accuracy Ratio (Pie Chart)</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Proportion of correct vs incorrect answers across the test
                </p>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={45}
                      paddingAngle={4}
                      label={({ name, percent }: { name?: string; percent?: number }) =>
                        `${(name || '').split(' ')[0]}: ${((percent || 0) * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0a0f1d',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        fontSize: '12px'
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value: string) => (
                        <span className="text-xs text-slate-300">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/80">
                  <p className="font-bold text-cyan-300 text-lg">{currentResult.correctAnswers}</p>
                  <p className="text-[10px] text-slate-400">Correct ({currentResult.overallPercentage}%)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/80">
                  <p className="font-bold text-rose-300 text-lg">{currentResult.incorrectAnswers}</p>
                  <p className="text-[10px] text-slate-400">
                    Incorrect ({100 - currentResult.overallPercentage}%)
                  </p>
                </div>
              </div>
            </div>

            {/* Bar Graph: Skill-wise Breakdown */}
            <div className="lg:col-span-7 rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4 shadow-lg">
              <div className="border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-purple-400" />
                  <span>Skill-Wise Performance (Bar Graph)</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Individual skill scores plotted on a 0–100% percentage scale
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{ top: 15, right: 20, left: -10, bottom: 25 }}
                  >
                    <XAxis
                      dataKey="skill"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      angle={-25}
                      textAnchor="end"
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      domain={[0, 100]}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, 'Score']}
                      contentStyle={{
                        backgroundColor: '#0a0f1d',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {barData.map((entry, index) => {
                        let fill = '#06b6d4';
                        if (entry.score >= 80) fill = '#10b981';
                        else if (entry.score >= 60) fill = '#06b6d4';
                        else if (entry.score >= 40) fill = '#f59e0b';
                        else fill = '#f43f5e';
                        return <Cell key={`bar-${index}`} fill={fill} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Category Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] pt-1">
                <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                  80–100%: Strong
                </div>
                <div className="p-1.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-300">
                  60–79%: Good
                </div>
                <div className="p-1.5 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
                  40–59%: Basic
                </div>
                <div className="p-1.5 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
                  0–39%: Needs Work
                </div>
              </div>
            </div>
          </div>

          {/* Skill Performance Categories & Personalized Next Steps */}
          <div className="rounded-2xl bg-navy-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4 shadow-lg">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Skill Performance Categories & Learning Recommendations</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted recommendations generated from your test results to accelerate your readiness for {profile.careerGoal || 'Data Scientist'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(currentResult.skillScores).map(([skill, score]) => {
                const category = getPerformanceCategory(score);
                const isWeak = score < 60;

                return (
                  <div
                    key={skill}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${category.bg} ${category.color} ${category.border}`}>
                            {category.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-white">
                            {score}%
                          </span>
                        </div>
                      </div>

                      {/* Recommendation text */}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {score >= 80
                          ? `Demonstrated strength in ${skill}. Build advanced production projects to showcase this competency to recruiters.`
                          : score >= 60
                          ? `Solid foundation in ${skill}. Practice intermediate algorithmic exercises to solidify full mastery.`
                          : score >= 40
                          ? `Basic understanding detected. Review core syntax, common library patterns, and foundational exercises.`
                          : `Needs improvement. High priority learning gap for your career benchmark. Review tutorials and beginner practice problems.`}
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        {isWeak ? 'Action Recommended' : 'Verified Strength'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('learn-skills')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                          isWeak
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-sm'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Improve This Skill</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Introductory assessment transparency disclaimer */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5 text-xs">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Assessment Methodology Note</span>
              </p>
              <p className="text-[11px] leading-relaxed">
                This test is an introductory assessment designed to evaluate foundational and intermediate conceptual understanding. Scores reflect performance on this specific evaluation and serve as evidence weights for the AI Career Engine, not professional certifications.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setViewMode('select')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake / Select Different Skills</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 flex items-center justify-center gap-1.5 transition"
              >
                <span>View Career Match Updates on Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: ASSESSMENT HISTORY SCREEN
          ========================================================================= */}
      {viewMode === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                <span>Your Assessment History</span>
              </h3>
              <p className="text-xs text-slate-400">
                Past test submissions recorded for {currentUser?.name || 'this account'}
              </p>
            </div>

            <button
              onClick={() => setViewMode('select')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Take New Assessment</span>
            </button>
          </div>

          {historyList.length === 0 ? (
            <div className="py-16 text-center space-y-3 rounded-2xl bg-navy-900/40 border border-slate-800">
              <Brain className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No Assessment History Found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You haven't completed any skill assessments yet. Take an assessment to test your knowledge and track your progress over time.
              </p>
              <button
                onClick={() => setViewMode('select')}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition"
              >
                Start First Test
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {historyList.map((hist, idx) => (
                <div
                  key={hist.id || idx}
                  className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{hist.date}</span>
                      </span>
                      <span className="text-[10px] text-slate-500">•</span>
                      <span className="text-xs text-slate-400">
                        {hist.totalQuestions} Questions Evaluated
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {hist.selectedSkills.map(s => {
                        const score = hist.skillScores?.[s];
                        return (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                          >
                            {s} {score !== undefined ? `(${score}%)` : ''}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xl font-black text-cyan-400 font-mono">
                        {hist.overallPercentage}%
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {hist.correctAnswers} / {hist.totalQuestions} Correct
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentResult(hist);
                        setViewMode('results');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
