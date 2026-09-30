import React from 'react';
import { Search, Sparkles, CloudRain, Moon, Keyboard, Target, Sliders, Palette } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  onOpenAmbientMixer: () => void;
  onOpenSleepTimer: () => void;
}

export const Header: React.FC<Props> = ({ onOpenAmbientMixer, onOpenSleepTimer }) => {
  const {
    setViewMode,
    activeAmbientCount,
    setIsZenMode,
    reciter,
    recitersList,
    setReciter,
    setIsShortcutsOpen,
    sleepTimerMinutes,
    setIsKhatamModalOpen,
    todayListeningSeconds,
    khatamCompletedSurahs,
    setIsEqModalOpen,
    eqPreset,
    setIsThemeModalOpen,
    theme
  } = usePlayer();

  const handleToggleReciter = () => {
    const currentIndex = recitersList.findIndex(r => r.id === reciter.id);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % recitersList.length : 0;
    setReciter(recitersList[nextIndex]);
  };

  const todayMinutes = Math.floor(todayListeningSeconds / 60);

  const eqLabels: Record<string, { label: string; icon: string }> = {
    normal: { label: 'Normal', icon: '🎙️' },
    clear: { label: 'Clear Vocal', icon: '✨' },
    warm: { label: 'Warm Tadabbur', icon: '🕯️' },
    studio: { label: 'Studio', icon: '🎧' }
  };

  const themeLabels: Record<string, { label: string; dot: string }> = {
    midnight: { label: 'Midnight', dot: '#38bdf8' },
    emerald: { label: 'Emerald', dot: '#10b981' },
    kaaba: { label: 'Ka\'bah', dot: '#f59e0b' },
    monochrome: { label: 'Onyx', dot: '#ffffff' }
  };

  return (
    <header 
      className="sticky top-0 z-30 backdrop-blur-xl border-b px-4 sm:px-6 py-3 flex items-center justify-between gap-3 transition-colors duration-400"
      style={{ backgroundColor: 'var(--theme-bg-header)', borderColor: 'var(--theme-border)' }}
    >
      {/* Search Bar / Mode Title */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div 
          onClick={() => setViewMode('search')}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border hover:border-slate-600 cursor-pointer transition text-slate-400 text-xs"
          style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span>Cari surah, nomor, atau terjemahan...</span>
        </div>
      </div>

      {/* Right Action Shortcuts */}
      <div className="flex items-center gap-2">
        {/* 3-Qari Switcher Pill */}
        <button
          onClick={handleToggleReciter}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold text-slate-200 transition shadow-sm hover:scale-[1.02] active:scale-95"
          style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
          title="Klik untuk beralih Qari (Yasser Al-Dosari, Abdur-Rahman As-Sudais, Abdullah Al-Matrood)"
        >
          <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-white/20">
            <img src={reciter.avatar} alt={reciter.name} className="w-full h-full object-cover" />
          </div>
          <span className="hidden sm:inline">{reciter.name.split(' ')[0]}</span>
          <span className="text-[10px] text-slate-400">⇄</span>
        </button>

        {/* Target & Khatam Button */}
        <button
          onClick={() => setIsKhatamModalOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition hover:scale-[1.02] active:scale-95 ${
            khatamCompletedSurahs.length > 0 || todayMinutes > 0
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm'
              : 'border-slate-700/60 text-slate-300 hover:text-white'
          }`}
          style={khatamCompletedSurahs.length === 0 && todayMinutes === 0 ? { backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' } : {}}
          title="Target Tilawah & Mode Khatam"
        >
          <Target className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline">Target</span>
          {todayMinutes > 0 && (
            <span className="text-[10px] font-mono font-bold bg-emerald-500/20 px-1.5 py-0.2 rounded-full">
              {todayMinutes}m
            </span>
          )}
        </button>

        {/* Ambient Mixer button */}
        <button
          onClick={onOpenAmbientMixer}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition hover:scale-[1.02] active:scale-95 ${
            activeAmbientCount > 0
              ? 'bg-sky-500/20 border-sky-500/40 text-sky-300 shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
          style={activeAmbientCount === 0 ? { backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' } : {}}
          title="Suara Alam (A)"
        >
          <CloudRain className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden md:inline">Ambient</span>
          {activeAmbientCount > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>

        {/* Voice EQ Prominent Button */}
        <button
          onClick={() => setIsEqModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition shadow-sm hover:scale-[1.02] active:scale-95"
          style={{
            backgroundColor: eqPreset !== 'normal' ? 'var(--theme-bg-pill)' : 'var(--theme-bg-card)',
            borderColor: eqPreset !== 'normal' ? 'var(--theme-border-accent)' : 'var(--theme-border)',
            color: eqPreset !== 'normal' ? 'var(--theme-text-accent)' : '#cbd5e1'
          }}
          title={`Buka Equalizer Vokal Qari (${eqLabels[eqPreset]?.label || eqPreset})`}
        >
          <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
          <span className="hidden sm:inline">EQ:</span>
          <span className="font-bold">{eqLabels[eqPreset]?.label || eqPreset}</span>
        </button>

        {/* Visual Theme Prominent Button */}
        <button
          onClick={() => setIsThemeModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition shadow-sm hover:scale-[1.02] active:scale-95"
          style={{
            backgroundColor: 'var(--theme-bg-card)',
            borderColor: 'var(--theme-border)',
            color: '#f8fafc'
          }}
          title={`Ganti Tema Warna Aplikasi (${themeLabels[theme]?.label || theme})`}
        >
          <span 
            className="w-2.5 h-2.5 rounded-full border border-white/30 shrink-0" 
            style={{ backgroundColor: themeLabels[theme]?.dot || 'var(--theme-accent)' }} 
          />
          <span className="hidden sm:inline">Tema:</span>
          <span className="font-bold">{themeLabels[theme]?.label || theme}</span>
        </button>

        {/* Sleep Timer button */}
        <button
          onClick={onOpenSleepTimer}
          className={`p-2 rounded-full border transition hover:scale-105 active:scale-95 ${
            sleepTimerMinutes !== null
              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
              : 'text-slate-300 hover:text-white'
          }`}
          style={sleepTimerMinutes === null ? { backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' } : {}}
          title="Sleep Timer"
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        {/* Shortcuts button */}
        <button
          onClick={() => setIsShortcutsOpen(true)}
          className="p-2 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white transition hidden xl:block"
          title="Shortcut Keyboard (?)"
        >
          <Keyboard className="w-3.5 h-3.5" />
        </button>

        {/* Zen Mode Button */}
        <button
          onClick={() => setIsZenMode(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs transition shadow-md shadow-sky-500/20 active:scale-95"
          title="Masuk Mode Zen (Z)"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Zen</span>
        </button>
      </div>
    </header>
  );
};
