import React from 'react';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import { Collection } from '../data/collections';
import { SURAHS, Surah } from '../data/surahs';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  collection: Collection;
  onBack: () => void;
}

export const CollectionDetail: React.FC<Props> = ({ collection, onBack }) => {
  const { currentSurah, isPlaying, togglePlay, setCurrentSurah } = usePlayer();

  const collectionSurahs = collection.surahIds
    .map(id => SURAHS.find(s => s.id === id))
    .filter((s): s is Surah => s !== undefined);

  const handlePlaySurah = (surah: Surah) => {
    if (currentSurah.id === surah.id) {
      togglePlay();
    } else {
      setCurrentSurah(surah, true);
    }
  };

  const handlePlayAll = () => {
    if (collectionSurahs.length > 0) {
      setCurrentSurah(collectionSurahs[0], true);
    }
  };

  return (
    <div className="pb-16">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </button>

      {/* Hero Header Banner */}
      <div className={`p-8 rounded-3xl bg-gradient-to-r ${collection.gradient} border border-white/10 mb-8 relative overflow-hidden shadow-2xl`}>
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/40 text-white/90 backdrop-blur-md uppercase tracking-wider inline-block mb-3">
            {collection.badge || 'Koleksi Tematik'}
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            {collection.title}
          </h1>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            {collection.description}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayAll}
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition shadow-xl flex items-center gap-2 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>Putar Koleksi ({collectionSurahs.length} Surah)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Surah List in this collection */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          Daftar Surah dalam Koleksi Ini
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {collectionSurahs.map((surah, idx) => {
            const isCurrent = currentSurah.id === surah.id;
            return (
              <div
                key={surah.id}
                onClick={() => handlePlaySurah(surah)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  isCurrent
                    ? 'bg-[#1b2133] border-sky-500/50 shadow-md'
                    : 'bg-[#12131b]/80 hover:bg-[#161724] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isCurrent ? 'text-sky-400' : 'text-white'}`}>
                      {surah.id}. {surah.nameSimple}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {surah.translatedName} • {surah.versesCount} Ayat
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-arabic text-base text-slate-300">
                    {surah.nameArabic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
