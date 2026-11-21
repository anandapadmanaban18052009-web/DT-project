import React, { useState } from 'react';
import { Sparkles, HelpCircle, Info, X, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import { FEATURE_GUIDES, FeatureGuideItem } from '../../data/helpGuideData';

interface HelperStickerProps {
  featureId?: string;
  tip?: string;
  badge?: string;
  details?: string;
  variant?: 'cyan' | 'purple' | 'amber' | 'emerald';
  className?: string;
}

export const HelperSticker: React.FC<HelperStickerProps> = ({
  featureId,
  tip,
  badge = 'AI Helper',
  details,
  variant = 'cyan',
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If featureId is provided, pull from centralized FEATURE_GUIDES
  const guideItem: FeatureGuideItem | undefined = featureId ? FEATURE_GUIDES[featureId] : undefined;

  const displayTip = guideItem ? guideItem.stickerNote : tip || '';
  const displayBadge = guideItem ? 'AI Helper' : badge;
  const displayVariant = guideItem ? guideItem.badgeVariant : variant;

  const colors = {
    cyan: {
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-800/60',
      text: 'text-cyan-200',
      badge: 'bg-cyan-950 text-cyan-400 border-cyan-800',
      icon: 'text-cyan-400',
      accent: 'border-cyan-500/40'
    },
    purple: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-800/60',
      text: 'text-purple-200',
      badge: 'bg-purple-950 text-purple-400 border-purple-800',
      icon: 'text-purple-400',
      accent: 'border-purple-500/40'
    },
    amber: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-800/60',
      text: 'text-amber-200',
      badge: 'bg-amber-950 text-amber-400 border-amber-800',
      icon: 'text-amber-400',
      accent: 'border-amber-500/40'
    },
    emerald: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-800/60',
      text: 'text-emerald-200',
      badge: 'bg-emerald-950 text-emerald-400 border-emerald-800',
      icon: 'text-emerald-400',
      accent: 'border-emerald-500/40'
    }
  }[displayVariant];

  return (
    <>
      <div
        className={`p-3 rounded-2xl border backdrop-blur-md flex items-center justify-between gap-3 text-xs shadow-md transition ${colors.bg} ${colors.border} ${className}`}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 flex items-center gap-1.5 shadow-sm ${colors.badge}`}
          >
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>{displayBadge}</span>
          </span>
          <p className={`text-xs ${colors.text} leading-snug font-medium`}>{displayTip}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition shrink-0 flex items-center gap-1 text-[11px] font-medium"
          title="Open feature explanation & guide"
          aria-label="Open feature explanation"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Guide</span>
        </button>
      </div>

      {/* Feature Explanation Modal (Reopenable anytime) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-xl rounded-3xl bg-[#090e1f] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl shadow-cyan-950/60 relative space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800/90 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {guideItem?.featureName || 'Feature Explanation'}
                  </h3>
                  <p className="text-xs text-cyan-400 font-medium">Interactive AI Guidance</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
                aria-label="Close explanation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* How Feature Works */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>How This Feature Works</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-navy-900/60 border border-slate-800/80 p-3.5 rounded-xl">
                {guideItem?.explanation || details || displayTip}
              </p>
            </div>

            {/* Step-by-Step Usage Instructions */}
            {guideItem?.instructions && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Simple Usage Instructions</span>
                </div>
                <div className="space-y-1.5">
                  {guideItem.instructions.map((inst, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/60"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Example */}
            {guideItem?.example && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Example in Action</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/20 border border-amber-800/40 p-3 rounded-xl">
                  {guideItem.example}
                </p>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/30 transition"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const HelpIconButton: React.FC<{ featureId: string; className?: string }> = ({
  featureId,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const guideItem = FEATURE_GUIDES[featureId];

  if (!guideItem) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition flex items-center gap-1.5 text-xs font-medium ${className}`}
        title={`Help guide for ${guideItem.featureName}`}
        aria-label={`Help guide for ${guideItem.featureName}`}
      >
        <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-[11px] text-slate-300">Help</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-xl rounded-3xl bg-[#090e1f] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl shadow-cyan-950/60 relative space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800/90 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{guideItem.featureName}</h3>
                  <p className="text-xs text-cyan-400 font-medium">Interactive AI Guidance</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>How This Feature Works</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-navy-900/60 border border-slate-800/80 p-3.5 rounded-xl">
                {guideItem.explanation}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Simple Usage Instructions</span>
              </div>
              <div className="space-y-1.5">
                {guideItem.instructions.map((inst, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Example in Action</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/20 border border-amber-800/40 p-3 rounded-xl">
                {guideItem.example}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
