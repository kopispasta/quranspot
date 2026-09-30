import React, { useState } from 'react';
import { X, CheckCircle2, Circle, Trophy, Target, Clock, RotateCcw, Search, Play, Sparkles } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { SURAHS } from '../data/surahs';

export const KhatamTrackerModal: React.FC = () => {
  const {
    isKhatamModalOpen,
    setIsKhatamModalOpen,
    khatamCompletedSurahs,
    toggleSurahCompleted,
    resetKhatamProgress,
    todayListeningSeconds,
    dailyGoalMinutes,
    setDailyGoalMinutes,
    playSurahById,
    currentSurah,
    isPlaying
  } = usePlayer();

  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isKhatamModalOpen) return null;

  const todayMinutes = Math.floor(todayListeningSeconds / 60);
  const goalPercent = Math.min(100, Math.round((todayMinutes / Math.max(1, dailyGoalMinutes)) * 100));
  const khatamPercent = Math.round((khatamCompletedSurahs.length / 114) * 100);

  const filteredSurahs = SURAHS.filter(s => {
    const isCompleted = khatamCompletedSurahs.includes(s.id);
    if (activeTab === 'completed' && !isCompleted) return false;
    if (activeTab === 'uncompleted' && isCompleted) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.nameSimple.toLowerCase().includes(q) ||
        s.translatedName.toLowerCase().includes(q) ||
        s.id.toString() === q
      );
    }
    return true;
  });

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang progres khatam untuk memulai siklus baru?')) {
      resetKhatamProgress();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div 
        className="w-full max-w-2xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col relative overflow-hidden transition-colors duration-400"
        style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 sm:p-5 border-b shrink-0 relative z-10"
          style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl shadow-inner">
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Target Tilawah & Mode Khatam
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {khatamCompletedSurahs.length}/114 Selesai
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pantau konsistensi tadabbur harian dan capaian khatam Al-Qur'an Anda
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsKhatamModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1 custom-scrollbar">
          
          {/* Top Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1: Daily Listening Goal */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#121626] to-[#0e1220] border border-slate-700/60 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Waktu Tilawah Hari Ini</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  {goalPercent}% Target
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-extrabold text-white font-mono">{todayMinutes}</span>
                <span className="text-xs text-slate-400">/ {dailyGoalMinutes} Menit</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    goalPercent >= 100 
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300' 
                      : 'bg-gradient-to-r from-sky-500 to-indigo-500'
                  }`}
                  style={{ width: `${Math.max(4, goalPercent)}%` }}
                />
              </div>

              {/* Goal Presets */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                <span className="text-slate-400">Atur Target:</span>
                <div className="flex items-center gap-1.5">
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setDailyGoalMinutes(mins)}
                      className={`px-2 py-0.5 rounded-lg font-mono transition ${
                        dailyGoalMinutes === mins
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Khatam 114 Surah Progress */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#181520] to-[#12101a] border border-amber-500/30 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Progres Khatam 114 Surah</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {khatamPercent}% Khatam
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-extrabold text-white font-mono">{khatamCompletedSurahs.length}</span>
                <span className="text-xs text-slate-400">/ 114 Surah Diselesaikan</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(3, khatamPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                <span className="text-slate-400">Sisa {114 - khatamCompletedSurahs.length} surah lagi</span>
                {khatamCompletedSurahs.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="text-slate-500 hover:text-rose-400 flex items-center gap-1 transition"
                    title="Ulangi dari awal"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Tabs & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800 self-start">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'all'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Semua (114)
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'completed'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Selesai ({khatamCompletedSurahs.length})
              </button>
              <button
                onClick={() => setActiveTab('uncompleted')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'uncompleted'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Belum ({114 - khatamCompletedSurahs.length})
              </button>
            </div>

            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari nama atau nomor surah..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* 114 Surahs Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
            {filteredSurahs.map(s => {
              const isCompleted = khatamCompletedSurahs.includes(s.id);
              const isCurrentPlaying = isPlaying && currentSurah.id === s.id;

              return (
                <div
                  key={s.id}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-slate-900/40 border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Checkbox toggle */}
                    <button
                      onClick={() => toggleSurahCompleted(s.id)}
                      className="text-emerald-400 hover:scale-110 transition shrink-0"
                      title={isCompleted ? 'Tandai belum selesai' : 'Tandai sudah selesai'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500/20 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">
                          {s.id}. {s.nameSimple}
                        </span>
                        <span className="font-arabic text-xs text-amber-400 shrink-0">
                          {s.nameArabic}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">
                        {s.translatedName} • {s.versesCount} Ayat
                      </p>
                    </div>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => playSurahById(s.id)}
                    className={`p-1.5 rounded-xl transition shrink-0 ${
                      isCurrentPlaying
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                    title="Putar surah ini"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800/80 bg-[#131522] shrink-0">
          <p className="text-xs text-slate-400">
            Surah otomatis ditandai selesai saat audio selesai diputar.
          </p>
          <button
            onClick={() => setIsKhatamModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20 active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
