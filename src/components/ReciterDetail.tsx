import React, { useState, useMemo } from 'react';
import {
  Play,
  Pause,
  MapPin,
  CheckCircle,
  Search,
  BarChart2,
  Sparkles,
  Music,
  Share2,
  Heart
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Surah } from '../data/surahs';
import { Reciter } from '../data/reciter';

export const ReciterDetail: React.FC = () => {
  const {
    reciter,
    setReciter,
    recitersList,
    surahList,
    currentSurah,
    isPlaying,
    togglePlay,
    setCurrentSurah,
    favorites,
    toggleFavorite,
    isFavorite
  } = usePlayer();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'makkah' | 'madinah'>('all');

  // Featured / Most listened Surahs
  const popularSurahIds = [1, 18, 55, 67, 36, 56];
  const popularSurahs = popularSurahIds
    .map(id => surahList.find(s => s.id === id))
    .filter((s): s is Surah => s !== undefined);

  const filteredSurahs = useMemo(() => {
    return surahList.filter(s => {
      const matchesSearch =
        s.nameSimple.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.translatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toString() === searchTerm.trim();

      if (!matchesSearch) return false;
      if (filterType === 'makkah') return s.revelationPlace === 'makkah';
      if (filterType === 'madinah') return s.revelationPlace === 'madinah';
      return true;
    });
  }, [surahList, searchTerm, filterType]);

  const handlePlaySurah = (surah: Surah) => {
    if (currentSurah.id === surah.id) {
      togglePlay();
    } else {
      setCurrentSurah(surah, true);
    }
  };

  return (
    <div className="pb-24">
      {/* 1. Qari Switcher Tabs at the top */}
      <div className="mb-6">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Pilih Profil Qari
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
          {recitersList.map((r: Reciter) => {
            const isSelected = reciter.id === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setReciter(r)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? 'bg-[#182033] border-sky-400 shadow-xl shadow-sky-500/15 ring-1 ring-sky-400/50'
                    : 'bg-[#12131b]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#161724]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border ${
                  isSelected ? 'border-sky-400' : 'border-slate-700'
                }`}>
                  <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-sky-400' : 'text-white'}`}>
                      {r.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{r.role}</p>
                </div>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Hero Profile Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-[#161826] via-[#10121d] to-[#0a0b12] p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          {/* Avatar with gold/sky aura */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-sky-400 via-amber-300 to-indigo-500 shadow-2xl shrink-0 group">
            <img
              src={reciter.avatar}
              alt={reciter.name}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2.5">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Qari Terverifikasi</span>
              </span>
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {reciter.country}
              </span>
              <span className="text-[11px] font-semibold text-amber-300 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                {reciter.style}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {reciter.name}
              </h1>
              <span className="font-arabic text-xl sm:text-2xl text-amber-300">
                {reciter.arabicName}
              </span>
            </div>

            <p className="text-xs font-semibold text-sky-300 mb-3">
              {reciter.role}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mb-6 font-normal">
              {reciter.bio}
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => handlePlaySurah(currentSurah)}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition shadow-xl inline-flex items-center gap-2 active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Jeda Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>Putar {currentSurah.nameSimple}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handlePlaySurah(surahList[0])}
                className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition border border-slate-700"
              >
                Mulai Dari Al-Fatihah
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Popular / Recommended Surahs */}
      <div className="mb-10">
        <h3 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <span>Surah Populer Pilihan</span>
          <span className="text-xs font-normal text-slate-400">Paling banyak didengarkan</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularSurahs.map(surah => {
            const isCurrent = currentSurah.id === surah.id;
            return (
              <div
                key={surah.id}
                onClick={() => handlePlaySurah(surah)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isCurrent
                    ? 'bg-[#182033] border-sky-400 shadow-md'
                    : 'bg-[#12131b]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#161724]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                    {isCurrent && isPlaying ? (
                      <BarChart2 className="w-4 h-4 text-sky-400 animate-pulse" />
                    ) : (
                      <span>{surah.id}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isCurrent ? 'text-sky-400' : 'text-white'}`}>
                      {surah.nameSimple}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {surah.translatedName} • {surah.versesCount} Ayat
                    </p>
                  </div>
                </div>

                <span className="font-arabic text-sm text-slate-300">
                  {surah.nameArabic}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Complete 114 Surahs catalog by this Qari */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Seluruh 114 Surah ({reciter.name})
            </h3>
            <p className="text-xs text-slate-400">Audio 30 Juz lengkap dengan kualitas audio 128 kbps</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari surah..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#13141f] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#13141f] p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  filterType === 'all' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType('makkah')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  filterType === 'makkah' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Makkiyah
              </button>
              <button
                onClick={() => setFilterType('madinah')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  filterType === 'madinah' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Madaniyah
              </button>
            </div>
          </div>
        </div>

        {/* Surahs Table / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredSurahs.map(surah => {
            const isCurrent = currentSurah.id === surah.id;
            return (
              <div
                key={surah.id}
                onClick={() => handlePlaySurah(surah)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isCurrent
                    ? 'bg-[#182033] border-sky-400 shadow-md'
                    : 'bg-[#12131b]/70 border-slate-800/80 hover:border-slate-700 hover:bg-[#161724]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-800/80 flex items-center justify-center text-xs font-semibold text-slate-400 group-hover:text-white shrink-0">
                    {isCurrent && isPlaying ? (
                      <BarChart2 className="w-4 h-4 text-sky-400 animate-pulse" />
                    ) : (
                      <span>{surah.id}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isCurrent ? 'text-sky-400' : 'text-white'}`}>
                      {surah.nameSimple}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {surah.translatedName} • {surah.versesCount} Ayat
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-arabic text-sm text-slate-300">
                    {surah.nameArabic}
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(surah.id);
                    }}
                    className={`p-1 rounded-lg transition ${
                      isFavorite(surah.id) ? 'text-rose-500' : 'text-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorite(surah.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
