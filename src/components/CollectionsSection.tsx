import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { COLLECTIONS, Collection } from '../data/collections';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  onSelectCollection: (col: Collection) => void;
}

export const CollectionsSection: React.FC<Props> = ({ onSelectCollection }) => {
  const { playSurahById } = usePlayer();

  const handlePlayCollection = (e: React.MouseEvent, col: Collection) => {
    e.stopPropagation();
    if (col.surahIds.length > 0) {
      playSurahById(col.surahIds[0]);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-white">Koleksi Suasana</h2>
        <span className="text-xs text-slate-400 font-medium">Kurasi berdasarkan kebutuhan</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {COLLECTIONS.map(col => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col)}
            className={`group relative rounded-3xl p-4 cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl border border-white/10 flex flex-col justify-between h-44 bg-gradient-to-br ${col.gradient}`}
          >
            {/* Background design elements */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-white/90 backdrop-blur-md border border-white/10 uppercase tracking-wider">
                {col.badge || 'Koleksi'}
              </span>

              {/* Play quick button */}
              <button
                onClick={(e) => handlePlayCollection(e, col)}
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </button>
            </div>

            {/* Title & info */}
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-white transition">
                {col.title}
              </h3>
              <p className="text-[11px] text-white/70 mt-1 line-clamp-2 leading-relaxed">
                {col.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
