import React, { useState, useEffect } from 'react';
import { X, Volume2, PowerOff, Sparkles, Plus, Trash2, Check, BookmarkPlus, Sliders } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomPreset {
  id: string;
  name: string;
  mix: Record<string, number>;
  createdAt: number;
}

interface DefaultPreset {
  id: string;
  name: string;
  icon: string;
  mix: Record<string, number>;
}

const DEFAULT_PRESETS: DefaultPreset[] = [
  {
    id: 'rain_window_stream',
    name: 'Hujan di Kaca',
    icon: '🪟',
    mix: { rain_window: 0.55, stream: 0.3 }
  },
  {
    id: 'deep_night',
    name: 'Malam Khusyuk',
    icon: '🏕️',
    mix: { night: 0.45, campfire: 0.35, wind: 0.2 }
  },
  {
    id: 'coastal_peace',
    name: 'Pantai Tenang',
    icon: '🌊',
    mix: { ocean: 0.5, wind: 0.25 }
  },
  {
    id: 'dawn_forest',
    name: 'Subuh Asri',
    icon: '🐦',
    mix: { birds: 0.45, stream: 0.35 }
  },
  {
    id: 'gentle_storm',
    name: 'Hujan Badai',
    icon: '⚡',
    mix: { rain: 0.5, thunder: 0.4, rain_window: 0.3 }
  }
];

export const AmbientMixerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { ambientSounds, toggleAmbientSound, setAmbientSoundVolume, activeAmbientCount } = usePlayer();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rain' | 'water' | 'nature' | 'relax'>('all');
  
  // Custom Presets
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>(() => {
    try {
      const saved = localStorage.getItem('quranspot_custom_ambient_presets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSavingPreset, setIsSavingPreset] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('quranspot_custom_ambient_presets', JSON.stringify(customPresets));
    } catch (e) {
      console.warn('Could not save custom presets:', e);
    }
  }, [customPresets]);

  if (!isOpen) return null;

  const applyPreset = (mix: Record<string, number>) => {
    ambientSounds.forEach(sound => {
      const targetVol = mix[sound.id];
      if (targetVol !== undefined) {
        if (!sound.isActive) toggleAmbientSound(sound.id);
        setAmbientSoundVolume(sound.id, targetVol);
      } else {
        if (sound.isActive) toggleAmbientSound(sound.id);
      }
    });
  };

  const handleSaveCurrentMix = () => {
    const activeSounds = ambientSounds.filter(s => s.isActive);
    if (activeSounds.length === 0) {
      setSaveError('Aktifkan minimal 1 suara alam terlebih dahulu');
      return;
    }
    if (!newPresetName.trim()) {
      setSaveError('Ketik nama racikan Anda');
      return;
    }

    const mix: { [key: string]: number } = {};
    activeSounds.forEach(s => {
      mix[s.id] = s.volume;
    });

    const newPreset: CustomPreset = {
      id: `custom_${Date.now()}`,
      name: newPresetName.trim(),
      mix,
      createdAt: Date.now()
    };

    setCustomPresets(prev => [newPreset, ...prev]);
    setNewPresetName('');
    setIsSavingPreset(false);
    setSaveError('');
  };

  const deleteCustomPreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomPresets(prev => prev.filter(p => p.id !== id));
  };

  const turnOffAll = () => {
    ambientSounds.forEach(s => {
      if (s.isActive) toggleAmbientSound(s.id);
    });
  };

  const filteredSounds = ambientSounds.filter(s => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div 
        className="w-full max-w-xl rounded-3xl border shadow-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-400"
        style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Ambient atmospheric background glows */}
        <div 
          className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xl shadow-inner">
              <span>🌧️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Studio Ambient Soundscapes
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Gapless HD
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>9 suara alam beresolusi tinggi</span>
                <span>•</span>
                <span className={activeAmbientCount > 0 ? 'text-sky-400 font-semibold' : 'text-slate-500'}>
                  {activeAmbientCount > 0 ? `${activeAmbientCount} Suara Mengalun` : 'Semua Nonaktif'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto pr-1 my-3 space-y-4 flex-1 custom-scrollbar">
          
          {/* Quick Presets Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Preset Suasana Kurasi</span>
              </label>
              <button
                onClick={() => {
                  setIsSavingPreset(!isSavingPreset);
                  setSaveError('');
                }}
                className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>{isSavingPreset ? 'Tutup' : 'Simpan Racikan'}</span>
              </button>
            </div>

            {/* Save Custom Preset Input */}
            {isSavingPreset && (
              <div className="p-3 mb-3 rounded-2xl bg-sky-950/40 border border-sky-500/40 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-slate-300 mb-2 font-medium">
                  Simpan kombinasi {activeAmbientCount} suara alam yang sedang aktif saat ini:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nama racikan... (cth: Hujan Kaca + Sungai)"
                    value={newPresetName}
                    onChange={e => {
                      setNewPresetName(e.target.value);
                      setSaveError('');
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleSaveCurrentMix()}
                    autoFocus
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={handleSaveCurrentMix}
                    className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition flex items-center gap-1 shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan</span>
                  </button>
                </div>
                {saveError && (
                  <p className="text-[11px] text-rose-400 font-medium mt-1.5">{saveError}</p>
                )}
              </div>
            )}

            {/* Default Curated Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {DEFAULT_PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.mix)}
                  className="px-2.5 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 text-xs font-semibold text-slate-200 transition text-left flex items-center gap-2 group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{p.icon}</span>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>

            {/* Custom Saved Presets (if any) */}
            {customPresets.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Racikan Pilihan Saya ({customPresets.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {customPresets.map(preset => (
                    <div
                      key={preset.id}
                      onClick={() => applyPreset(preset.mix)}
                      className="cursor-pointer pl-3 pr-2 py-1.5 rounded-xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/30 text-xs font-semibold text-sky-200 transition flex items-center gap-2 group"
                    >
                      <span>✨</span>
                      <span>{preset.name}</span>
                      <button
                        onClick={e => deleteCustomPreset(preset.id, e)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition"
                        title="Hapus racikan"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                Semua ({ambientSounds.length})
              </button>
              <button
                onClick={() => setSelectedCategory('rain')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 ${
                  selectedCategory === 'rain'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                🌧️ Hujan & Badai
              </button>
              <button
                onClick={() => setSelectedCategory('water')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 ${
                  selectedCategory === 'water'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                💧 Air & Laut
              </button>
              <button
                onClick={() => setSelectedCategory('nature')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 ${
                  selectedCategory === 'nature'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                🌲 Suasana Rimba
              </button>
              <button
                onClick={() => setSelectedCategory('relax')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition shrink-0 ${
                  selectedCategory === 'relax'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                🔥 Relaksasi
              </button>
            </div>
          </div>

          {/* Sound Cards Grid */}
          <div className="space-y-2.5">
            {filteredSounds.map(sound => (
              <div
                key={sound.id}
                className={`p-3 sm:p-3.5 rounded-2xl border transition-all ${
                  sound.isActive
                    ? 'bg-gradient-to-r from-[#141b2d] to-[#121626] border-sky-400/80 shadow-lg shadow-sky-950/40 ring-1 ring-sky-400/30'
                    : 'bg-slate-900/40 border-slate-800/70 hover:border-slate-700/80 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition ${
                      sound.isActive 
                        ? 'bg-sky-500/20 border border-sky-400/40 shadow-inner' 
                        : 'bg-slate-800/60 border border-slate-700/40'
                    }`}>
                      <span>{sound.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs sm:text-sm font-bold text-white truncate">{sound.name}</h3>
                        {sound.isActive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">{sound.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleAmbientSound(sound.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                      sound.isActive
                        ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400'
                        : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {sound.isActive ? 'Menyala' : 'Aktifkan'}
                  </button>
                </div>

                {/* Smooth Volume Slider */}
                {sound.isActive && (
                  <div className="flex items-center gap-3 pt-1 border-t border-slate-800/50 mt-2">
                    <Volume2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <input
                      type="range"
                      min="0.05"
                      max="1"
                      step="0.05"
                      value={sound.volume}
                      onChange={e => setAmbientSoundVolume(sound.id, parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                    />
                    <span className="text-xs font-mono text-sky-400 font-bold w-10 text-right shrink-0">
                      {Math.round(sound.volume * 100)}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-800/80 shrink-0 mt-1 relative z-10">
          <button
            onClick={turnOffAll}
            disabled={activeAmbientCount === 0}
            className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl transition ${
              activeAmbientCount > 0
                ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 cursor-pointer'
                : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <PowerOff className="w-3.5 h-3.5" />
            <span>Matikan Semua</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-md shadow-sky-500/25 active:scale-95"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
