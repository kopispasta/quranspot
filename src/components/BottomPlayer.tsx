import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Maximize2,
  BookOpen,
  Moon,
  Heart,
  CloudRain,
  Mic2,
  Keyboard,
  Sliders,
  Palette,
  Gauge
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  onOpenAmbientMixer: () => void;
  onOpenSleepTimer: () => void;
}

export const BottomPlayer: React.FC<Props> = ({ onOpenAmbientMixer, onOpenSleepTimer }) => {
  const {
    currentSurah,
    reciter,
    recitersList,
    setReciter,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    nextSurah,
    prevSurah,
    repeatMode,
    cycleRepeatMode,
    isShuffled,
    toggleShuffle,
    reciterVolume,
    setReciterVolume,
    isReciterMuted,
    toggleReciterMute,
    activeAmbientCount,
    setIsZenMode,
    setIsMushafOpen,
    setIsShortcutsOpen,
    isFavorite,
    toggleFavorite,
    sleepTimerMinutes,
    eqPreset,
    setIsEqModalOpen,
    theme,
    setIsThemeModalOpen,
    speed,
    setIsSpeedModalOpen
  } = usePlayer();

  const handleToggleReciter = () => {
    const currentIndex = recitersList.findIndex(r => r.id === reciter.id);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % recitersList.length : 0;
    setReciter(recitersList[nextIndex]);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t px-4 py-3 select-none transition-colors duration-400"
      style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Metadata & Thumbnail */}
        <div className="flex items-center gap-3 w-full md:w-1/4 shrink-0">
          <div
            onClick={() => setIsZenMode(true)}
            className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shrink-0 cursor-pointer relative group shadow-md"
          >
            <img
              src={reciter.avatar}
              alt={reciter.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 pointer-events-none">
                <span className="w-1 h-3 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-4 bg-sky-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 
                onClick={() => setIsZenMode(true)}
                className="text-xs font-bold text-white truncate cursor-pointer hover:text-sky-400 transition"
              >
                {currentSurah.id}. {currentSurah.nameSimple}
              </h4>
              <span className="font-arabic text-xs text-amber-300 font-semibold shrink-0">
                {currentSurah.nameArabic}
              </span>
            </div>
            
            {/* 2-Qari quick toggle */}
            <div 
              onClick={handleToggleReciter}
              className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-sky-300 transition text-[11px] mt-0.5 group"
              title="Klik untuk beralih Qari (Yasser Al-Dosari, Abdur-Rahman As-Sudais, Abdullah Al-Matrood)"
            >
              <Mic2 className="w-3 h-3 text-slate-500 group-hover:text-sky-400 transition" />
              <span className="truncate">{reciter.name}</span>
              <span className="text-[10px] text-slate-500 group-hover:text-sky-400">⇄</span>
            </div>
          </div>

          <button
            onClick={() => toggleFavorite(currentSurah.id)}
            className={`p-1.5 rounded-lg transition ${
              isFavorite(currentSurah.id) ? 'text-rose-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite(currentSurah.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Center: Playback Controls & Progress Bar */}
        <div className="flex flex-col items-center w-full md:w-2/4 max-w-xl">
          {/* Action buttons */}
          <div className="flex items-center gap-4 mb-1.5">
            {/* Shuffle */}
            <button
              onClick={toggleShuffle}
              className={`p-1.5 rounded-lg transition ${
                isShuffled ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Acak Surah"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>

            {/* Previous */}
            <button
              onClick={prevSurah}
              className="p-1.5 text-slate-300 hover:text-white transition"
              title="Surah Sebelumnya"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-200 active:scale-95 text-slate-950 flex items-center justify-center transition shadow-lg shadow-white/10"
              title={isPlaying ? 'Jeda (Spasi)' : 'Putar (Spasi)'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={nextSurah}
              className="p-1.5 text-slate-300 hover:text-white transition"
              title="Surah Berikutnya"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Repeat */}
            <button
              onClick={cycleRepeatMode}
              className={`p-1.5 rounded-lg transition ${
                repeatMode !== 'off' ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
              }`}
              title={`Ulangi: ${repeatMode === 'one' ? 'Surah Ini' : repeatMode === 'all' ? 'Semua' : 'Mati'}`}
            >
              {repeatMode === 'one' ? <Repeat1 className="w-3.5 h-3.5" /> : <Repeat className="w-3.5 h-3.5" />}
            </button>

            {/* Speed Trigger Button */}
            <button
              onClick={() => setIsSpeedModalOpen(true)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1 border transition hover:scale-105 active:scale-95 cursor-pointer ${
                speed !== 1.0
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white border-white/10 bg-white/5'
              }`}
              title={`Atur Kecepatan Suara Qari (${speed}x)`}
            >
              <Gauge className="w-3 h-3 text-amber-400" />
              <span>{speed % 1 === 0 ? speed.toFixed(0) : (speed * 10) % 1 === 0 ? speed.toFixed(1) : speed.toFixed(2)}x</span>
            </button>
          </div>

          {/* Scrubber Bar */}
          <div className="w-full flex items-center gap-2.5">
            <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>

            <div className="flex-1 h-3 flex items-center cursor-pointer group">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.5"
                value={currentTime}
                onChange={e => seek(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-700/80 rounded-lg appearance-none cursor-pointer group-hover:h-1.5 transition-all"
              />
            </div>

            <span className="text-[11px] font-mono text-slate-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Ambient, EQ, Theme, Mushaf, Sleep, Volume & Zen Mode */}
        <div className="flex items-center justify-end gap-2 w-full md:w-1/4 shrink-0">
          {/* Ambient Sound Trigger */}
          <button
            onClick={onOpenAmbientMixer}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition hover:scale-[1.02] active:scale-95 ${
              activeAmbientCount > 0
                ? 'bg-sky-500/20 text-sky-400 border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            style={activeAmbientCount === 0 ? { backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' } : {}}
            title="Pengaturan Suara Alam (A)"
          >
            <CloudRain className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Ambient</span>
            {activeAmbientCount > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Voice EQ Trigger */}
          <button
            onClick={() => setIsEqModalOpen(true)}
            className="px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border transition hover:scale-[1.02] active:scale-95"
            style={{
              backgroundColor: eqPreset !== 'normal' ? 'var(--theme-bg-pill)' : 'var(--theme-bg-card)',
              borderColor: eqPreset !== 'normal' ? 'var(--theme-border-accent)' : 'var(--theme-border)',
              color: eqPreset !== 'normal' ? 'var(--theme-text-accent)' : '#cbd5e1'
            }}
            title={`Equalizer Vokal Qari (${eqPreset})`}
          >
            <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
            <span className="hidden lg:inline capitalize">{eqPreset === 'normal' ? 'EQ' : eqPreset}</span>
          </button>

          {/* Visual Theme Trigger */}
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="p-1.5 rounded-xl border text-slate-300 hover:text-white transition hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'var(--theme-bg-card)', borderColor: 'var(--theme-border)' }}
            title={`Ganti Tema Visual (${theme})`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Mushaf Mode ("ق") */}
          <button
            onClick={() => setIsMushafOpen(true)}
            className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg transition"
            title="Buka Teks Mushaf & Terjemahan (Q)"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Sleep Timer */}
          <button
            onClick={onOpenSleepTimer}
            className={`p-1.5 rounded-lg transition relative ${
              sleepTimerMinutes !== null ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Timer Tidur"
          >
            <Moon className="w-4 h-4" />
            {sleepTimerMinutes !== null && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>

          {/* Keyboard Shortcuts (?) */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg transition hidden xl:block"
            title="Shortcut Keyboard (?)"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Reciter Volume */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleReciterMute}
              className="text-slate-400 hover:text-white transition"
              title={isReciterMuted ? 'Bunyikan (M)' : 'Bisukan (M)'}
            >
              {isReciterMuted || reciterVolume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isReciterMuted ? 0 : reciterVolume}
              onChange={e => setReciterVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Fullscreen / Zen Mode */}
          <button
            onClick={() => setIsZenMode(true)}
            className="p-1.5 text-slate-400 hover:text-sky-400 rounded-lg transition"
            title="Masuk Mode Zen Layar Penuh (Z)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
