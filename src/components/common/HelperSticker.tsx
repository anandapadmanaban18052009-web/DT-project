import React, { useState } from 'react';
import { Sparkles, HelpCircle, Info, X } from 'lucide-react';

interface HelperStickerProps {
  tip: string;
  badge?: string;
  details?: string;
  variant?: 'cyan' | 'purple' | 'amber' | 'emerald';
  className?: string;
}

export const HelperSticker: React.FC<HelperStickerProps> = ({
  tip,
  badge = 'AI Helper Tip',
  details,
  variant = 'cyan',
  className = ''
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const colors = {
    cyan: {
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-800/60',
      text: 'text-cyan-200',
      badge: 'bg-cyan-950 text-cyan-400 border-cyan-800',
      icon: 'text-cyan-400'
    },
    purple: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-800/60',
      text: 'text-purple-200',
      badge: 'bg-purple-950 text-purple-400 border-purple-800',
      icon: 'text-purple-400'
    },
    amber: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-800/60',
      text: 'text-amber-200',
      badge: 'bg-amber-950 text-amber-400 border-amber-800',
      icon: 'text-amber-400'
    },
    emerald: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-800/60',
      text: 'text-emerald-200',
      badge: 'bg-emerald-950 text-emerald-400 border-emerald-800',
      icon: 'text-emerald-400'
    }
  }[variant];

  return (
    <div
      className={`p-2.5 rounded-xl border backdrop-blur-md flex items-center justify-between gap-3 text-xs shadow-sm transition ${colors.bg} ${colors.border} ${className}`}
    >
      <div className="flex items-center space-x-2.5">
        <span
          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 flex items-center gap-1 ${colors.badge}`}
        >
          <Sparkles className="w-2.5 h-2.5" />
          <span>{badge}</span>
        </span>
        <p className={`text-xs ${colors.text} leading-snug`}>{tip}</p>
      </div>

      {details && (
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowPopover(!showPopover)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="More information"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {showPopover && (
            <div className="absolute right-0 bottom-full mb-2 w-64 p-3 rounded-xl bg-[#090e1f] border border-slate-700 shadow-2xl z-30 text-xs text-slate-300 space-y-1.5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="font-bold text-white text-[11px] flex items-center gap-1">
                  <Info className="w-3 h-3 text-cyan-400" />
                  <span>Feature Context</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPopover(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">{details}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
