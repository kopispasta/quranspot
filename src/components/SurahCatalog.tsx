import React, { useState, useMemo } from 'react';
import { Search, Play, Pause, Heart, BarChart2, Filter } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Surah } from '../data/surahs';

export const SurahCatalog: React.FC = () => {
  const { surahList, currentSurah, isPlaying, togglePlay, setCurrentSurah, favorites, toggleFavorite, isFavorite } = usePlayer();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'makkah' | 'madinah' | 'favorites'>('all');

  const filteredSurahs = useMemo(() => {
    return surahList.filter(surah => {
      const matchesSearch =
        surah.nameSimple.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.translatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.id.toString() === searchTerm.trim();

      if (!matchesSearch) return false;

      if (filterType === 'favorites') return isFavorite(surah.id);
      if (filterType === 'makkah') return surah.revelationPlace === 'makkah';
      if (filterType === 'madinah') return surah.revelationPlace === 'madinah';

      return true;
    });
  }, [surahList, searchTerm, filterType, favorites]);

  const handlePlaySurah = (surah: Surah) => {
    if (currentSurah.id === surah.id) {
      togglePlay();
    } else {
      setCurrentSurah(surah, true);
    }
  };

  return (
    <div className="pb-12">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Daftar 114 Surah</h2>
          <p className="text-xs text-slate-400">Lantunan lengkap 30 Juz oleh Sheikh Yasser Al-Dosari</p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama surah atau nomor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
          />
        </div>
      </div>

      {/* Tabs / Filter buttons */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterType('all')}
          className="px-3.5 py-1.5 rounded-full font-medium transition cursor-pointer"
          style={filterType === 'all' ? {
            backgroundColor: 'var(--theme-accent)',
            color: '#090a0f',
            fontWeight: 700
          } : {
            backgroundColor: 'var(--theme-bg-card)',
            borderColor: 'var(--theme-border)',
            color: '#94a3b8'
          }}
        >
          Semua Surah (114)
        </button>
        <button
          onClick={() => setFilterType('makkah')}
          className="px-3.5 py-1.5 rounded-full font-medium transition cursor-pointer"
          style={filterType === 'makkah' ? {
            backgroundColor: 'var(--theme-accent)',
            color: '#090a0f',
            fontWeight: 700
          } : {
            backgroundColor: 'var(--theme-bg-card)',
            borderColor: 'var(--theme-border)',
            color: '#94a3b8'
          }}
        >
          Makkiyah
        </button>
        <button
          onClick={() => setFilterType('madinah')}
          className="px-3.5 py-1.5 rounded-full font-medium transition cursor-pointer"
          style={filterType === 'madinah' ? {
            backgroundColor: 'var(--theme-accent)',
            color: '#090a0f',
            fontWeight: 700
          } : {
            backgroundColor: 'var(--theme-bg-card)',
            borderColor: 'var(--theme-border)',
            color: '#94a3b8'
          }}
        >
          Madaniyah
        </button>
        <button
          onClick={() => setFilterType('favorites')}
          className="px-3.5 py-1.5 rounded-full font-medium transition flex items-center gap-1.5 cursor-pointer"
          style={filterType === 'favorites' ? {
            backgroundColor: '#f43f5e',
            color: '#ffffff',
            fontWeight: 700
          } : {
            backgroundColor: 'var(--theme-bg-card)',
            borderColor: 'var(--theme-border)',
            color: '#94a3b8'
          }}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Favorit ({favorites.length})</span>
        </button>
      </div>

      {/* Grid of Surahs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSurahs.map(surah => {
          const isCurrent = currentSurah.id === surah.id;
          const isFav = isFavorite(surah.id);

          return (
            <div
              key={surah.id}
              onClick={() => handlePlaySurah(surah)}
              className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition border ${
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
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                {/* Number & Play Icon */}
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:bg-sky-500 group-hover:text-slate-950 transition">
                  {isCurrent && isPlaying ? (
                    <BarChart2 className="w-4 h-4 text-sky-400 group-hover:text-slate-950 animate-pulse" />
                  ) : (
                    <span className="text-xs font-bold text-slate-300 group-hover:hidden">
                      {surah.id}
                    </span>
                  )}
                  <Play className="w-4 h-4 hidden group-hover:block fill-current ml-0.5" />
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs font-bold truncate ${isCurrent ? 'text-sky-400' : 'text-white'}`}>
                      {surah.nameSimple}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-medium">
                      {surah.revelationPlace === 'makkah' ? 'Makkiyah' : 'Madaniyah'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {surah.translatedName} • {surah.versesCount} Ayat
                  </p>
                </div>
              </div>

              {/* Arabic Name & Favorite Action */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-arabic text-base text-slate-300 group-hover:text-amber-300 transition">
                  {surah.nameArabic}
                </span>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(surah.id);
                  }}
                  className={`p-1.5 rounded-lg transition ${
                    isFav ? 'text-rose-500' : 'text-slate-600 hover:text-slate-300'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
