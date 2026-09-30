import React from 'react';
import { Play, Pause, MoreHorizontal, BarChart2, Check, Mic2, Sliders, Sparkles } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Surah } from '../data/surahs';
import { Reciter } from '../data/reciter';

interface Props {
  onViewAllClick: () => void;
}

export const HeroReciter: React.FC<Props> = ({ onViewAllClick }) => {
  const {
    reciter,
    recitersList,
    setReciter,
    surahList,
    currentSurah,
    isPlaying,
    togglePlay,
    setCurrentSurah,
    eqPreset,
    setEqPreset,
    setIsEqModalOpen
  } = usePlayer();

  // Top 20 surahs for the featured grid matching Screenshot 1
  const featuredSurahs = surahList.slice(0, 20);

  const handleSurahClick = (surah: Surah) => {
    if (currentSurah.id === surah.id) {
      togglePlay();
    } else {
      setCurrentSurah(surah, true);
    }
  };

  return (
    <div className="mb-10">
      {/* Section Header & Qari Selector Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-white">Qari Pilihan Anda</h2>
          <span 
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: 'var(--theme-bg-pill)',
              borderColor: 'var(--theme-border-accent)',
              color: 'var(--theme-text-accent)'
            }}
          >
            {reciter.style}
          </span>
        </div>

        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold hover:underline transition"
          style={{ color: 'var(--theme-accent)' }}
        >
          Lihat semua 114 surah
        </button>
      </div>

      {/* Switcher Cards between 3 Qaris: Yasser, Sudais, and Abdullah Al-Matrood */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {recitersList.map((r: Reciter) => {
          const isSelected = reciter.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setReciter(r)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left hover:scale-[1.01] active:scale-95 ${
                isSelected ? 'shadow-xl' : 'hover:bg-white/5'
              }`}
              style={isSelected ? {
                backgroundColor: 'var(--theme-bg-pill)',
                borderColor: 'var(--theme-border-accent)',
                boxShadow: '0 8px 24px var(--theme-accent-glow)'
              } : {
                backgroundColor: 'var(--theme-bg-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div 
                  className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2"
                  style={{ borderColor: isSelected ? 'var(--theme-accent)' : 'rgba(255,255,255,0.15)' }}
                >
                  <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 
                    className="text-xs font-bold truncate"
                    style={{ color: isSelected ? 'var(--theme-text-accent)' : '#f8fafc' }}
                  >
                    {r.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">{r.style.split('&')[0]}</p>
                </div>
              </div>

              {isSelected && (
                <div 
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold shadow-md ml-1"
                  style={{ backgroundColor: 'var(--theme-accent)', color: '#090a0f' }}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Voice Equalizer Quick Bar */}
      <div 
        className="p-3 sm:p-4 rounded-2xl border mb-6 transition-all shadow-sm"
        style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Sliders className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
            <h3 className="text-xs font-bold text-white tracking-tight">
              Voice Equalizer (EQ) — Respon Akustik Vokal Qari Real-Time
            </h3>
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase"
              style={{
                backgroundColor: 'var(--theme-bg-pill)',
                borderColor: 'var(--theme-border-accent)',
                color: 'var(--theme-text-accent)'
              }}
            >
              Aktif: {eqPreset}
            </span>
          </div>

          <button
            onClick={() => setIsEqModalOpen(true)}
            className="text-[11px] font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            style={{ color: 'var(--theme-accent)' }}
          >
            <span>Buka Dialog Equalizer</span>
            <span>↗</span>
          </button>
        </div>

        {/* 4 EQ Preset Quick Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'normal', name: 'Normal', icon: '🎙️', desc: 'Flat Studio (0 dB)' },
            { id: 'clear', name: 'Clear Vocal', icon: '✨', desc: 'Tajwid & Makhraj (+8.5dB)' },
            { id: 'warm', name: 'Warm Tadabbur', icon: '🕯️', desc: 'Resonansi Hangat (+8.5dB)' },
            { id: 'studio', name: 'Broadcast', icon: '🎧', desc: 'Full Radio Studio' }
          ].map(p => {
            const isSelected = eqPreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setEqPreset(p.id as any)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between hover:scale-[1.01] active:scale-95 cursor-pointer ${
                  isSelected ? 'shadow-md ring-1' : 'hover:bg-white/5'
                }`}
                style={isSelected ? {
                  backgroundColor: 'var(--theme-bg-pill)',
                  borderColor: 'var(--theme-border-accent)',
                  color: 'var(--theme-text-accent)',
                  boxShadow: '0 0 0 1px var(--theme-border-accent)'
                } : {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderColor: 'var(--theme-border)'
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{p.icon}</span>
                  {isSelected && (
                    <span 
                      className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                      style={{ backgroundColor: 'var(--theme-accent)', color: '#090a0f' }}
                    >
                      Aktif
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{p.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Reciter Featured Card */}
        <div 
          className="w-full lg:w-64 p-6 rounded-3xl border flex flex-col items-center text-center shrink-0 shadow-xl relative overflow-hidden group transition-all"
          style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Avatar with authentic circular crop */}
          <div 
            className="w-32 h-32 rounded-full p-1 mb-4 shadow-lg overflow-hidden border-2"
            style={{ borderColor: 'var(--theme-border-accent)' }}
          >
            <img
              src={reciter.avatar}
              alt={reciter.name}
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition duration-300"
            />
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">{reciter.name}</h3>
          <p className="font-arabic text-sm text-amber-300 mb-1">{reciter.arabicName}</p>
          <p className="text-xs text-slate-400 mb-5 font-medium">{reciter.country}</p>

          <button
            onClick={togglePlay}
            className="w-full py-2.5 px-4 rounded-full active:scale-95 font-bold text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: 'var(--theme-accent)', color: '#090a0f' }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Jeda audio</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Lanjut dengar</span>
              </>
            )}
          </button>
        </div>

        {/* Surahs Grid matching Screenshot 1 (Columns of 5 items) */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 w-full">
          {featuredSurahs.map(surah => {
            const isCurrent = currentSurah.id === surah.id;
            return (
              <div
                key={surah.id}
                onClick={() => handleSurahClick(surah)}
                className={`group flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all border ${
                  isCurrent ? 'shadow-md' : 'hover:scale-[1.01]'
                }`}
                style={isCurrent ? {
                  backgroundColor: 'var(--theme-bg-pill)',
                  borderColor: 'var(--theme-border-accent)'
                } : {
                  backgroundColor: 'var(--theme-bg-card)',
                  borderColor: 'var(--theme-border)'
                }}
              >
                <div className="flex items-center gap-3 min-w-0 pr-1">
                  {/* Number or Equalizer */}
                  <div className="w-8 h-8 rounded-xl bg-slate-800/70 flex items-center justify-center shrink-0 text-xs font-semibold text-slate-400 group-hover:text-white transition">
                    {isCurrent && isPlaying ? (
                      <BarChart2 className="w-4 h-4 text-sky-400 animate-pulse" />
                    ) : (
                      <span>{surah.id}</span>
                    )}
                  </div>

                  {/* Name info */}
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isCurrent ? 'text-sky-400' : 'text-slate-100 group-hover:text-sky-300'}`}>
                      {surah.nameSimple} <span className="font-arabic text-xs font-normal text-slate-400">({surah.nameArabic})</span>
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {surah.translatedName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white p-1 rounded transition shrink-0"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
