import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Moon,
  Heart,
  Sliders,
  Image as ImageIcon,
  Check,
  Mic2,
  Gauge
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  onOpenAmbientMixer: () => void;
  onOpenSleepTimer: () => void;
}

const WALLPAPERS = [
  { id: 'mountain', name: 'Pegunungan Berkabut', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80' },
  { id: 'gradient', name: 'Cosmic Blue Gradient', url: 'gradient' },
  { id: 'rain', name: 'Hutan Hujan', url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1920&q=80' },
  { id: 'sunset', name: 'Lautan Senja', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80' },
];

export const ZenPlayer: React.FC<Props> = ({ onOpenAmbientMixer, onOpenSleepTimer }) => {
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
    speed,
    setSpeed,
    reciterVolume,
    setReciterVolume,
    isReciterMuted,
    toggleReciterMute,
    ambientSounds,
    activeAmbientCount,
    setIsZenMode,
    setIsMushafOpen,
    isFavorite,
    toggleFavorite,
    sleepTimerMinutes,
    setIsSpeedModalOpen
  } = usePlayer();

  const [currentWallpaper, setCurrentWallpaper] = useState(WALLPAPERS[0]);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);

  const activeSound = ambientSounds.find(s => s.isActive);

  const handleToggleReciter = () => {
    const currentIndex = recitersList.findIndex(r => r.id === reciter.id);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % recitersList.length : 0;
    setReciter(recitersList[nextIndex]);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatRemainingTime = (current: number, total: number) => {
    if (isNaN(total) || total <= 0) return '-0:00';
    const remaining = Math.max(0, total - current);
    const mins = Math.floor(remaining / 60);
    const secs = Math.floor(remaining % 60);
    return `-${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between select-none overflow-hidden bg-black animate-in fade-in duration-300">
      {/* Background Layer */}
      {currentWallpaper.url === 'gradient' ? (
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b1a] via-[#091b38] to-[#040813]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.18),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0">
          <img
            src={currentWallpaper.url}
            alt="Scenic Background"
            className="w-full h-full object-cover transition-all duration-700 filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
        </div>
      )}

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={() => setIsZenMode(false)}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/80 hover:text-white flex items-center justify-center transition backdrop-blur-md"
          title="Tutup Mode Zen (Z)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Center Pill: Ambient Sound Badge */}
        <button
          onClick={onOpenAmbientMixer}
          className="px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-white/90 text-xs font-semibold backdrop-blur-xl flex items-center gap-2 transition shadow-lg active:scale-95"
        >
          {activeSound ? (
            <>
              <span>{activeSound.icon}</span>
              <span>{activeSound.name}</span>
              {activeAmbientCount > 1 && (
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">
                  +{activeAmbientCount - 1}
                </span>
              )}
            </>
          ) : (
            <>
              <span>☁️</span>
              <span>Pilih Suara Alam</span>
            </>
          )}
        </button>

        {/* Top Right: Toggle 2 Qaris & Wallpaper */}
        <div className="flex items-center gap-2 relative">
          {/* Quick toggle between Yasser & As-Sudais */}
          <button
            onClick={handleToggleReciter}
            className="px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-white text-xs font-semibold flex items-center gap-2 transition backdrop-blur-md"
            title="Klik untuk beralih Qari (Yasser Al-Dosari, Abdur-Rahman As-Sudais, Abdullah Al-Matrood)"
          >
            <Mic2 className="w-3.5 h-3.5 text-sky-400" />
            <span>{reciter.name.split(' ')[0]}</span>
            <span className="text-[10px] text-white/60">⇄</span>
          </button>

          <button
            onClick={() => setShowWallpaperSelector(prev => !prev)}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/80 hover:text-white flex items-center justify-center transition backdrop-blur-md"
            title="Ganti Wallpaper Pemandangan"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Wallpaper Dropdown */}
          {showWallpaperSelector && (
            <div className="absolute right-0 top-12 w-48 rounded-2xl bg-[#12131f]/95 backdrop-blur-xl border border-white/15 p-2 shadow-2xl z-30 space-y-1">
              {WALLPAPERS.map(wp => (
                <button
                  key={wp.id}
                  onClick={() => {
                    setCurrentWallpaper(wp);
                    setShowWallpaperSelector(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                    currentWallpaper.id === wp.id
                      ? 'bg-sky-500/20 text-sky-400 font-bold'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span>{wp.name}</span>
                  {currentWallpaper.id === wp.id && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Hero: Reciter Avatar & Live Waveform */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 my-auto">
        <div className="relative mb-6">
          {/* Ethereal Audio Pulsing Rings */}
          <div
            className={`absolute -inset-6 rounded-full bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 blur-2xl transition-all duration-700 ${
              isPlaying ? 'animate-pulse scale-125 opacity-70' : 'opacity-0 scale-95'
            }`}
          />
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-sky-400/40 via-amber-400/30 to-indigo-500/40 shadow-2xl relative">
            <img
              src={reciter.avatar}
              alt={reciter.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Audio Bars when playing */}
          {isPlaying && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center gap-1">
              <span className="w-1 h-3 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-5 bg-sky-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-1 h-4 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '75ms' }} />
            </div>
          )}
        </div>

        {/* Surah Titles */}
        <div className="flex items-center gap-3 justify-center mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Surah {currentSurah.nameSimple}
          </h1>
          <button
            onClick={() => toggleFavorite(currentSurah.id)}
            className={`p-1.5 rounded-full transition ${
              isFavorite(currentSurah.id) ? 'text-rose-500' : 'text-white/60 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite(currentSurah.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        <p className="font-arabic text-xl sm:text-2xl text-amber-300 mb-1">
          {currentSurah.nameArabic}
        </p>

        <p className="text-xs text-white/80 font-medium tracking-wide">
          {reciter.name} • {reciter.role}
        </p>
        <p className="text-[11px] text-white/50 mt-0.5">
          {currentSurah.translatedName} • {currentSurah.versesCount} Ayat
        </p>
      </div>

      {/* Bottom Floating Glassmorphism Player Pill */}
      <div className="relative z-20 w-full max-w-xl mx-auto p-4 sm:p-6 mb-4">
        <div className="rounded-3xl bg-black/55 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl text-white">
          {/* Top Row: Speed, Controls, Sleep Timer */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Speed Selector */}
            <button
              onClick={() => setIsSpeedModalOpen(true)}
              className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer"
              title="Atur Kecepatan Audio Qari"
            >
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              <span>{speed % 1 === 0 ? speed.toFixed(0) : (speed * 10) % 1 === 0 ? speed.toFixed(1) : speed.toFixed(2)}x</span>
            </button>

            {/* Playback Controls */}
            <div className="flex items-center gap-5">
              <button
                onClick={prevSurah}
                className="text-white/80 hover:text-white transition active:scale-95"
                title="Sebelumnya"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white hover:bg-slate-200 active:scale-95 text-slate-950 flex items-center justify-center transition shadow-lg shadow-white/20"
                title={isPlaying ? 'Jeda (Spasi)' : 'Putar (Spasi)'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={nextSurah}
                className="text-white/80 hover:text-white transition active:scale-95"
                title="Berikutnya"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Sleep Timer */}
            <button
              onClick={onOpenSleepTimer}
              className={`p-2 rounded-xl transition ${
                sleepTimerMinutes !== null ? 'bg-indigo-500/30 text-indigo-300' : 'text-white/70 hover:text-white'
              }`}
              title="Sleep Timer"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Scrubber Bar */}
          <div className="space-y-1 mb-4">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.5"
              value={currentTime}
              onChange={e => seek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatRemainingTime(currentTime, duration)}</span>
            </div>
          </div>

          {/* Bottom Action Row: Volume, Mushaf ("ق"), Ambient Mixer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleReciterMute}
                className="text-white/70 hover:text-white transition"
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
                className="w-16 sm:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Mushaf Mode ("ق") */}
              <button
                onClick={() => setIsMushafOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-amber-300 font-semibold transition"
                title="Buka Teks Mushaf (Q)"
              >
                <span className="font-arabic text-base leading-none">ق</span>
                <span className="text-[11px] hidden sm:inline">Mushaf</span>
              </button>

              {/* Ambient Mixer */}
              <button
                onClick={onOpenAmbientMixer}
                className="p-1.5 text-white/70 hover:text-white rounded-lg transition"
                title="Ambient Mixer (A)"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Repeat Mode */}
              <button
                onClick={cycleRepeatMode}
                className={`p-1.5 rounded-lg transition ${
                  repeatMode !== 'off' ? 'text-sky-400' : 'text-white/60 hover:text-white'
                }`}
                title="Ulangi"
              >
                {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
