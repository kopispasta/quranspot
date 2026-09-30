import React from 'react';
import { Play, BookOpen, Bookmark, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { SURAHS } from '../data/surahs';
import { RECITERS } from '../data/reciter';

export const ResumeBanner: React.FC = () => {
  const {
    lastPlayed,
    resumeLastPlayed,
    isPlaying,
    currentSurah,
    mushafBookmark,
    openMushafAtBookmark,
    setMushafBookmark
  } = usePlayer();

  if (!lastPlayed && !mushafBookmark) return null;

  const playedSurah = lastPlayed ? SURAHS.find(s => s.id === lastPlayed.surahId) : null;
  const playedReciter = lastPlayed ? RECITERS.find(r => r.id === lastPlayed.reciterId) : null;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isCurrentSurahPlaying = isPlaying && playedSurah && currentSurah.id === playedSurah.id;
  const progressPercent = lastPlayed && lastPlayed.duration > 0
    ? Math.min(100, Math.round((lastPlayed.currentTime / lastPlayed.duration) * 100))
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* Card 1: Resume Audio Listening */}
      {lastPlayed && playedSurah && playedReciter && (
        <div 
          className={`p-5 rounded-3xl border transition-all ${
            mushafBookmark ? 'lg:col-span-2' : 'lg:col-span-3'
          } shadow-xl relative overflow-hidden flex flex-col justify-between`}
          style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
        >
          {/* Subtle background glow */}
          <div 
            className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-20"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold tracking-wide"
                style={{
                  backgroundColor: 'var(--theme-bg-pill)',
                  borderColor: 'var(--theme-border-accent)',
                  color: 'var(--theme-text-accent)'
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Terakhir Didengarkan</span>
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                {progressPercent}% selesai
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                <img
                  src={playedReciter.avatar}
                  alt={playedReciter.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white truncate">
                    {playedSurah.id}. Surah {playedSurah.nameSimple}
                  </h3>
                  <span className="font-arabic text-amber-400 font-semibold text-sm shrink-0">
                    {playedSurah.nameArabic}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {playedReciter.name} • {playedSurah.translatedName}
                </p>
                <p className="text-[11px] font-mono mt-1 font-semibold" style={{ color: 'var(--theme-text-accent)' }}>
                  Posisi: {formatTime(lastPlayed.currentTime)} {lastPlayed.duration > 0 ? `/ ${formatTime(lastPlayed.duration)}` : ''}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-4 border border-white/5">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.max(5, progressPercent)}%`,
                  backgroundColor: 'var(--theme-accent)'
                }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {isCurrentSurahPlaying ? 'Sedang berputar saat ini' : 'Klik untuk melanjutkan dari detik terakhir'}
            </span>
            <button
              onClick={resumeLastPlayed}
              className="ml-auto inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs transition shadow-md active:scale-95 cursor-pointer"
              style={{ backgroundColor: 'var(--theme-accent)', color: '#090a0f' }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isCurrentSurahPlaying ? 'Lanjutkan Putar' : 'Putar Dari Posisi Terakhir'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Card 2: Bookmark Mushaf (Last Read Verse) */}
      {mushafBookmark && (
        <div className={`p-5 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1a1712] to-[#12131b] shadow-xl relative overflow-hidden flex flex-col justify-between ${
          !lastPlayed ? 'lg:col-span-3' : ''
        }`}>
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wide">
                <Bookmark className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>Penanda Bacaan Mushaf</span>
              </span>

              <button
                onClick={() => setMushafBookmark(null)}
                className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition"
                title="Hapus penanda bacaan"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold shrink-0">
                <span>📖</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">
                  Surah {mushafBookmark.surahName}
                </h4>
                <p className="text-xs text-amber-300/90 font-semibold mt-0.5">
                  Ayat ke-{mushafBookmark.verseNumber}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Ditandai untuk tadabbur dan hafalan
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-end">
            <button
              onClick={openMushafAtBookmark}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Buka Ayat Ini</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
