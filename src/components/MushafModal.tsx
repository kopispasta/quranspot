import React, { useEffect, useState } from 'react';
import { X, BookOpen, Loader2, Copy, Check, Bookmark } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const MushafModal: React.FC = () => {
  const {
    currentSurah,
    isMushafOpen,
    setIsMushafOpen,
    verses,
    isLoadingVerses,
    fetchVersesForCurrentSurah,
    mushafBookmark,
    setMushafBookmark
  } = usePlayer();

  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    if (isMushafOpen) {
      fetchVersesForCurrentSurah();
    }
  }, [isMushafOpen, currentSurah.id]);

  // Auto-scroll to bookmarked verse if present
  useEffect(() => {
    if (isMushafOpen && mushafBookmark && mushafBookmark.surahId === currentSurah.id && verses.length > 0) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`verse-${mushafBookmark.verseNumber}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isMushafOpen, verses, mushafBookmark, currentSurah.id]);

  if (!isMushafOpen) return null;

  const handleCopy = (verseText: string, id: number) => {
    navigator.clipboard.writeText(verseText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleBookmark = (verseNumber: number) => {
    const isBookmarked = mushafBookmark?.surahId === currentSurah.id && mushafBookmark?.verseNumber === verseNumber;
    if (isBookmarked) {
      setMushafBookmark(null);
    } else {
      setMushafBookmark({
        surahId: currentSurah.id,
        verseNumber,
        surahName: currentSurah.nameSimple,
        timestamp: Date.now()
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col relative overflow-hidden transition-colors duration-400"
        style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 sm:p-5 border-b shrink-0"
          style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {currentSurah.id}. Surah {currentSurah.nameSimple}
                </h2>
                <span className="font-arabic text-lg text-amber-400 font-semibold">{currentSurah.nameArabic}</span>
              </div>
              <p className="text-xs text-slate-400">
                {currentSurah.translatedName} • {currentSurah.versesCount} Ayat • {currentSurah.revelationPlace === 'makkah' ? 'Makkiyah' : 'Madaniyah'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMushafOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Bismillah for surahs except At-Tawbah (id 9) and Al-Fatihah (id 1, where it is verse 1) */}
          {currentSurah.id !== 9 && currentSurah.id !== 1 && (
            <div className="text-center py-4 text-amber-300 font-arabic text-2xl tracking-wide border-b border-slate-800/60">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </div>
          )}

          {isLoadingVerses ? (
            <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
              <p className="text-sm">Memuat ayat dan terjemahan...</p>
            </div>
          ) : verses.length > 0 ? (
            verses.map(v => {
              const isBookmarked = mushafBookmark?.surahId === currentSurah.id && mushafBookmark?.verseNumber === v.verse_number;

              return (
                <div
                  id={`verse-${v.verse_number}`}
                  key={v.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isBookmarked
                      ? 'bg-[#1b1712] border-amber-500/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/40'
                      : 'border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80'
                  }`}
                >
                  {/* Top Bar: Verse Key & Actions */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-sky-300 bg-sky-950/60 border border-sky-800/50">
                        Ayat {v.verse_number}
                      </span>
                      {isBookmarked && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-300 bg-amber-950/70 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                          <span>🏷️</span>
                          <span>Penanda Terakhir Dibaca</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Bookmark button */}
                      <button
                        onClick={() => handleToggleBookmark(v.verse_number)}
                        className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'text-slate-500 hover:text-amber-400 hover:bg-slate-800'
                        }`}
                        title={isBookmarked ? 'Hapus penanda bacaan' : 'Tandai sebagai terakhir dibaca'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-amber-400' : ''}`} />
                        <span className="text-[11px] hidden sm:inline">
                          {isBookmarked ? 'Tersimpan' : 'Tandai'}
                        </span>
                      </button>

                      {/* Copy button */}
                      <button
                        onClick={() => handleCopy(`${v.text_uthmani}\n${v.translation}`, v.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition"
                        title="Salin Ayat"
                      >
                        {copiedId === v.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <p className="font-arabic text-2xl sm:text-3xl text-right leading-loose mb-3 text-slate-100">
                    {v.text_uthmani}
                  </p>

                  {/* Indonesian Translation */}
                  <p className="text-xs sm:text-sm leading-relaxed pt-2.5 border-t border-slate-800/60 text-slate-400 font-sans">
                    {v.translation}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              Gagal memuat teks ayat. Pastikan koneksi internet aktif.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
