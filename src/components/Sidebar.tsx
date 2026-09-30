import React from 'react';
import { Home, Layers, Mic2, Search, Sliders, Moon, Sparkles, Target, Palette } from 'lucide-react';
import { usePlayer, ViewMode } from '../context/PlayerContext';

export const Sidebar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    activeAmbientCount,
    setIsZenMode,
    setIsKhatamModalOpen,
    khatamCompletedSurahs,
    setIsEqModalOpen,
    eqPreset,
    setIsThemeModalOpen,
    theme
  } = usePlayer();

  const navItems: { mode: ViewMode; label: string; icon: React.FC<{ className?: string; style?: React.CSSProperties }> }[] = [
    { mode: 'home', label: 'Beranda', icon: Home },
    { mode: 'collections', label: 'Koleksi', icon: Layers },
    { mode: 'reciter', label: 'Qari', icon: Mic2 },
    { mode: 'search', label: 'Cari Surah', icon: Search },
  ];

  const eqNames: Record<string, string> = {
    normal: 'Normal',
    clear: 'Clear Vocal',
    warm: 'Warm',
    studio: 'Studio'
  };

  const themeDisplay: Record<string, { name: string; dot: string }> = {
    midnight: { name: 'Midnight', dot: '#38bdf8' },
    emerald: { name: 'Emerald', dot: '#10b981' },
    kaaba: { name: 'Ka\'bah', dot: '#f59e0b' },
    monochrome: { name: 'Onyx', dot: '#ffffff' }
  };

  return (
    <aside 
      className="w-64 border-r flex flex-col justify-between p-5 select-none h-screen sticky top-0 shrink-0 hidden md:flex transition-colors duration-400"
      style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
    >
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 cursor-pointer" onClick={() => setViewMode('home')}>
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg text-white font-bold text-lg"
            style={{ backgroundColor: 'var(--theme-accent)', color: '#090a0f' }}
          >
            <span>🌙</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Quranspot
            </h1>
            <p className="text-[11px] font-semibold tracking-wide" style={{ color: 'var(--theme-accent)' }}>
              QURAN & AMBIENT
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'shadow-sm border'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                style={isActive ? {
                  backgroundColor: 'var(--theme-bg-pill)',
                  borderColor: 'var(--theme-border-accent)',
                  color: 'var(--theme-text-accent)'
                } : {}}
              >
                <Icon className="w-4 h-4" style={isActive ? { color: 'var(--theme-accent)' } : {}} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Target & Khatam Nav Item */}
          <button
            onClick={() => setIsKhatamModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <Target className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Target & Khatam</span>
            </div>
            {khatamCompletedSurahs.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {khatamCompletedSurahs.length}/114
              </span>
            )}
          </button>

          {/* Voice EQ Nav Item */}
          <button
            onClick={() => setIsEqModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <Sliders className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" style={{ color: 'var(--theme-accent)' }} />
              <span>Equalizer Vokal</span>
            </div>
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize"
              style={{
                backgroundColor: 'var(--theme-bg-pill)',
                borderColor: 'var(--theme-border-accent)',
                color: 'var(--theme-text-accent)'
              }}
            >
              {eqNames[eqPreset] || eqPreset}
            </span>
          </button>

          {/* Theme Selector Nav Item */}
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <Palette className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Tema Warna</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300">
              <span 
                className="w-2 h-2 rounded-full border border-white/30"
                style={{ backgroundColor: themeDisplay[theme]?.dot || 'var(--theme-accent)' }}
              />
              <span>{themeDisplay[theme]?.name || theme}</span>
            </div>
          </button>
        </nav>

        {/* Focus Mode Banner */}
        <div 
          className="mt-5 p-4 rounded-2xl border relative overflow-hidden transition-colors"
          style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
        >
          <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 opacity-15">
            <Sparkles className="w-20 h-20" style={{ color: 'var(--theme-accent)' }} />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--theme-accent)' }}>
            <Moon className="w-3.5 h-3.5" />
            <span>Zen Ambient Mode</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Dengarkan tilawah di layar penuh dengan visual pemandangan alam dan deburan ambient.
          </p>
          <button
            onClick={() => setIsZenMode(true)}
            className="w-full py-2 px-3 rounded-lg font-semibold text-xs transition shadow-md flex items-center justify-center gap-2 active:scale-95 text-slate-950 font-bold"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            <span>Buka Mode Zen</span>
            <span>✨</span>
          </button>
        </div>
      </div>

      {/* Bottom Tools & Ambient Indicator */}
      <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--theme-border)' }}>
        {/* EQ & Theme Quick Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setIsEqModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-slate-300 hover:text-white text-xs font-medium border transition hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
            title="Pengaturan Equalizer Vokal Qari"
          >
            <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
            <span>Voice EQ</span>
          </button>

          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-slate-300 hover:text-white text-xs font-medium border transition hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
            title="Pilih Tema Visual Aplikasi"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span className="capitalize">{themeDisplay[theme]?.name || theme}</span>
          </button>
        </div>

        {/* Ambient Active Indicator */}
        <div className="flex items-center justify-between text-slate-400 px-1 py-1 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${activeAmbientCount > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-slate-300 font-medium">Ambient Mixer</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/40 text-slate-300 border border-white/10">
            {activeAmbientCount > 0 ? `${activeAmbientCount} Aktif` : 'Mati'}
          </span>
        </div>
      </div>
    </aside>
  );
};
