import React from 'react';
import { X, Moon, Check, Clock } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SleepTimerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { sleepTimerMinutes, setSleepTimer, timerRemainingSeconds } = usePlayer();

  if (!isOpen) return null;

  const timerOptions = [
    { label: '15 Menit', minutes: 15 },
    { label: '30 Menit', minutes: 30 },
    { label: '45 Menit', minutes: 45 },
    { label: '60 Menit (1 Jam)', minutes: 60 },
    { label: '90 Menit', minutes: 90 },
  ];

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-3xl border shadow-2xl p-6 relative transition-colors duration-400"
        style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Timer Pengantar Tidur</h2>
              <p className="text-xs text-slate-400">Hentikan audio otomatis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current status if active */}
        {timerRemainingSeconds !== null && (
          <div className="my-4 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-indigo-300 text-xs">
              <Clock className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Sisa waktu sebelum berhenti:</span>
            </div>
            <span className="font-mono font-bold text-sm text-indigo-300">
              {formatSeconds(timerRemainingSeconds)}
            </span>
          </div>
        )}

        {/* Timer options list */}
        <div className="space-y-2 my-4">
          {timerOptions.map(opt => {
            const isSelected = sleepTimerMinutes === opt.minutes;
            return (
              <button
                key={opt.minutes}
                onClick={() => {
                  setSleepTimer(opt.minutes);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-500/50 text-white'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
              </button>
            );
          })}
        </div>

        {/* Turn Off Button */}
        {sleepTimerMinutes !== null && (
          <button
            onClick={() => {
              setSleepTimer(null);
              onClose();
            }}
            className="w-full mt-2 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 font-semibold text-xs transition"
          >
            Matikan Sleep Timer
          </button>
        )}
      </div>
    </div>
  );
};
