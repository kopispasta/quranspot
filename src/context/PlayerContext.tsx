import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Surah, SURAHS } from '../data/surahs';
import { CURRENT_RECITER, RECITERS, Reciter } from '../data/reciter';
import { AmbientSound, INITIAL_AMBIENT_SOUNDS, ambientEngine } from '../audio/ambientEngine';

export type ViewMode = 'home' | 'collections' | 'reciter' | 'search';

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  translation: string;
}

interface PlayerContextType {
  // Surah & Reciter
  currentSurah: Surah;
  reciter: Reciter;
  recitersList: Reciter[];
  setReciter: (r: Reciter) => void;
  surahList: Surah[];
  setCurrentSurah: (surah: Surah, autoplay?: boolean) => void;
  playSurahById: (id: number) => void;

  // Playback
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  currentTime: number;
  duration: number;
  seek: (seconds: number) => void;
  seekRelative: (deltaSeconds: number) => void;
  nextSurah: () => void;
  prevSurah: () => void;

  // Settings
  speed: number;
  setSpeed: (speed: number) => void;
  repeatMode: 'off' | 'one' | 'all';
  cycleRepeatMode: () => void;
  isShuffled: boolean;
  toggleShuffle: () => void;

  // Volumes
  reciterVolume: number;
  setReciterVolume: (vol: number) => void;
  isReciterMuted: boolean;
  toggleReciterMute: () => void;

  // Ambient Engine
  ambientSounds: AmbientSound[];
  toggleAmbientSound: (id: string) => void;
  setAmbientSoundVolume: (id: string, vol: number) => void;
  activeAmbientCount: number;

  // Sleep Timer
  sleepTimerMinutes: number | null;
  setSleepTimer: (minutes: number | null) => void;
  timerRemainingSeconds: number | null;

  // Navigation & Views
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isZenMode: boolean;
  setIsZenMode: (zen: boolean) => void;
  isMushafOpen: boolean;
  setIsMushafOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
  selectedCollectionId: string | null;
  setSelectedCollectionId: (id: string | null) => void;

  // Favorites
  favorites: number[];
  toggleFavorite: (surahId: number) => void;
  isFavorite: (surahId: number) => boolean;

  // Verses / Mushaf (Clean Reader)
  verses: Verse[];
  isLoadingVerses: boolean;
  fetchVersesForCurrentSurah: () => Promise<void>;

  // Last played & Mushaf Bookmark (Resume Playback)
  lastPlayed: LastPlayedSession | null;
  resumeLastPlayed: () => void;
  mushafBookmark: MushafBookmark | null;
  setMushafBookmark: (bm: MushafBookmark | null) => void;
  openMushafAtBookmark: () => void;

  // Khatam & Daily Listening Tracker (Opsi 2)
  khatamCompletedSurahs: number[];
  toggleSurahCompleted: (surahId: number) => void;
  resetKhatamProgress: () => void;
  todayListeningSeconds: number;
  dailyGoalMinutes: number;
  setDailyGoalMinutes: (mins: number) => void;
  isKhatamModalOpen: boolean;
  setIsKhatamModalOpen: (open: boolean) => void;

  // Voice EQ & Visual Themes (Opsi 4)
  eqPreset: EqPreset;
  setEqPreset: (preset: EqPreset) => void;
  isEqModalOpen: boolean;
  setIsEqModalOpen: (open: boolean) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
}

export type EqPreset = 'normal' | 'clear' | 'warm' | 'studio';
export type ThemeMode = 'midnight' | 'emerald' | 'kaaba' | 'monochrome';

export interface LastPlayedSession {
  surahId: number;
  reciterId: string;
  currentTime: number;
  duration: number;
  updatedAt: number;
}

export interface MushafBookmark {
  surahId: number;
  verseNumber: number;
  surahName: string;
  timestamp: number;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reciter, setReciterState] = useState<Reciter>(() => {
    const saved = localStorage.getItem('quranspot_reciter');
    if (saved) {
      const found = RECITERS.find(r => r.id === saved);
      if (found) return found;
    }
    return CURRENT_RECITER;
  });

  const [currentSurah, setCurrentSurahState] = useState<Surah>(() => {
    const saved = localStorage.getItem('quranspot_last_surah');
    if (saved) {
      const found = SURAHS.find(s => s.id === parseInt(saved, 10));
      if (found) return found;
    }
    return SURAHS[0]; // Al-Fatihah
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [speed, setSpeedState] = useState<number>(1.0);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [reciterVolume, setReciterVolumeState] = useState<number>(0.9);
  const [isReciterMuted, setIsReciterMuted] = useState<boolean>(false);

  // Ambient state
  const [ambientSounds, setAmbientSounds] = useState<AmbientSound[]>(INITIAL_AMBIENT_SOUNDS);

  // Views & Modals
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [isMushafOpen, setIsMushafOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  // Sleep Timer
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('quranspot_favorites');
      return saved ? JSON.parse(saved) : [1, 18, 55, 67];
    } catch {
      return [1, 18, 55, 67];
    }
  });

  // Last played session tracking
  const [lastPlayed, setLastPlayed] = useState<LastPlayedSession | null>(() => {
    try {
      const saved = localStorage.getItem('quranspot_last_played');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Mushaf last read bookmark
  const [mushafBookmark, setMushafBookmarkState] = useState<MushafBookmark | null>(() => {
    try {
      const saved = localStorage.getItem('quranspot_mushaf_bookmark');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Khatam & Daily Listening Tracker (Opsi 2)
  const getTodayDateStr = () => new Date().toISOString().slice(0, 10);

  const [khatamCompletedSurahs, setKhatamCompletedSurahs] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('quranspot_khatam_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dailyGoalMinutes, setDailyGoalMinutesState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('quranspot_daily_goal');
      return saved ? parseInt(saved, 10) : 30;
    } catch {
      return 30;
    }
  });

  const [todayListeningSeconds, setTodayListeningSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('quranspot_daily_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === new Date().toISOString().slice(0, 10)) {
          return parsed.seconds || 0;
        }
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const [isKhatamModalOpen, setIsKhatamModalOpen] = useState(false);

  // Audio Voice Equalizer & Theme (Opsi 4)
  const [eqPreset, setEqPresetState] = useState<EqPreset>(() => {
    try {
      const saved = localStorage.getItem('quranspot_eq');
      return (saved as EqPreset) || 'normal';
    } catch {
      return 'normal';
    }
  });

  const [isEqModalOpen, setIsEqModalOpen] = useState(false);

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('quranspot_theme');
      return (saved as ThemeMode) || 'midnight';
    } catch {
      return 'midnight';
    }
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    try {
      localStorage.setItem('quranspot_theme', t);
    } catch {}
  };

  const toggleSurahCompleted = (surahId: number) => {
    setKhatamCompletedSurahs(prev => {
      const exists = prev.includes(surahId);
      const next = exists ? prev.filter(id => id !== surahId) : [...prev, surahId];
      try {
        localStorage.setItem('quranspot_khatam_completed', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetKhatamProgress = () => {
    setKhatamCompletedSurahs([]);
    try {
      localStorage.setItem('quranspot_khatam_completed', JSON.stringify([]));
    } catch {}
  };

  const setDailyGoalMinutes = (mins: number) => {
    setDailyGoalMinutesState(mins);
    try {
      localStorage.setItem('quranspot_daily_goal', mins.toString());
    } catch {}
  };



  const eqCtxRef = useRef<AudioContext | null>(null);
  const eqNodesRef = useRef<{
    low: BiquadFilterNode;
    mid: BiquadFilterNode;
    high: BiquadFilterNode;
  } | null>(null);

  const applyEqGains = (preset: EqPreset) => {
    const ctx = eqCtxRef.current;
    const nodes = eqNodesRef.current;
    if (!ctx || !nodes) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    let lowGain = 0;
    let midGain = 0;
    let highGain = 0;

    switch (preset) {
      case 'clear':
        // Makhraj & Tajwid articulation boost: sharp 3.2kHz emphasis, crisp highs, cleaned low boom
        lowGain = -4.5;
        midGain = 8.5;
        highGain = 5.5;
        break;
      case 'warm':
        // Warm Tadabbur: rich resonant baritone chest warmth (250Hz), mellow night highs
        lowGain = 8.5;
        midGain = -2.0;
        highGain = -6.5;
        break;
      case 'studio':
        // Full-frequency broadcast radio studio presence
        lowGain = 4.0;
        midGain = 5.0;
        highGain = 5.5;
        break;
      case 'normal':
      default:
        lowGain = 0;
        midGain = 0;
        highGain = 0;
        break;
    }

    try {
      nodes.low.gain.cancelScheduledValues(now);
      nodes.mid.gain.cancelScheduledValues(now);
      nodes.high.gain.cancelScheduledValues(now);

      nodes.low.gain.setValueAtTime(nodes.low.gain.value, now);
      nodes.mid.gain.setValueAtTime(nodes.mid.gain.value, now);
      nodes.high.gain.setValueAtTime(nodes.high.gain.value, now);

      nodes.low.gain.setTargetAtTime(lowGain, now, 0.02);
      nodes.mid.gain.setTargetAtTime(midGain, now, 0.02);
      nodes.high.gain.setTargetAtTime(highGain, now, 0.02);
    } catch {
      nodes.low.gain.value = lowGain;
      nodes.mid.gain.value = midGain;
      nodes.high.gain.value = highGain;
    }
  };

  const initAudioEq = () => {
    if (eqCtxRef.current || !audioRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      eqCtxRef.current = ctx;

      const source = ctx.createMediaElementSource(audioRef.current);

      const low = ctx.createBiquadFilter();
      low.type = 'lowshelf';
      low.frequency.setValueAtTime(250, ctx.currentTime);

      const mid = ctx.createBiquadFilter();
      mid.type = 'peaking';
      mid.frequency.setValueAtTime(3200, ctx.currentTime);
      mid.Q.setValueAtTime(1.4, ctx.currentTime);

      const high = ctx.createBiquadFilter();
      high.type = 'highshelf';
      high.frequency.setValueAtTime(7500, ctx.currentTime);

      source.connect(low);
      low.connect(mid);
      mid.connect(high);
      high.connect(ctx.destination);

      eqNodesRef.current = { low, mid, high };
      applyEqGains(eqPreset);
    } catch (e) {
      console.warn('Web Audio EQ initialization fallback:', e);
    }
  };

  const lastSaveRef = useRef<number>(0);
  const lastSecRef = useRef<number>(0);

  // Verses / Mushaf Cache
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Synchronized state refs to avoid stale closure during background & lockscreen playback
  const currentSurahRef = useRef(currentSurah);
  currentSurahRef.current = currentSurah;

  const reciterRef = useRef(reciter);
  reciterRef.current = reciter;

  const repeatModeRef = useRef(repeatMode);
  repeatModeRef.current = repeatMode;

  const isShuffledRef = useRef(isShuffled);
  isShuffledRef.current = isShuffled;

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const reciterVolumeRef = useRef(reciterVolume);
  reciterVolumeRef.current = reciterVolume;

  const isReciterMutedRef = useRef(isReciterMuted);
  isReciterMutedRef.current = isReciterMuted;

  const eqPresetRef = useRef(eqPreset);
  eqPresetRef.current = eqPreset;

  const getAudioUrlForSurah = (surahId: number, targetReciter = reciterRef.current) => {
    const formattedId = surahId.toString().padStart(3, '0');
    return `${targetReciter.audioServer}${formattedId}.mp3`;
  };

  // Re-creates clean native HTMLAudioElement to release Web Audio hooks for background playback
  const recreateNativeAudioElement = () => {
    if (!audioRef.current) return;
    const oldAudio = audioRef.current;
    const savedTime = oldAudio.currentTime;
    const wasPlaying = isPlayingRef.current;
    const currentSrc = oldAudio.src;

    oldAudio.pause();
    oldAudio.src = '';

    const newAudio = new Audio();
    newAudio.preload = 'auto';
    newAudio.crossOrigin = 'anonymous';
    newAudio.volume = isReciterMutedRef.current ? 0 : reciterVolumeRef.current;
    newAudio.playbackRate = speedRef.current;
    newAudio.src = currentSrc;
    newAudio.currentTime = savedTime;
    attachAudioListeners(newAudio);
    audioRef.current = newAudio;

    if (wasPlaying) {
      newAudio.play().then(() => {
        setIsPlaying(true);
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
      }).catch(console.warn);
    }
  };

  const setEqPreset = (preset: EqPreset) => {
    setEqPresetState(preset);
    try {
      localStorage.setItem('quranspot_eq', preset);
    } catch {}

    if (preset === 'normal') {
      // Revert completely to pure Direct Native Audio for 100% background stability
      if (eqCtxRef.current) {
        try {
          eqCtxRef.current.close().catch(() => {});
        } catch {}
        eqCtxRef.current = null;
        eqNodesRef.current = null;
        recreateNativeAudioElement();
      }
      return;
    }

    if (!eqCtxRef.current && audioRef.current) {
      initAudioEq();
    }
    applyEqGains(preset);
  };

  // Core listener attacher ensuring background stability and lock screen updates
  const attachAudioListeners = (audio: HTMLAudioElement) => {
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleError = () => {
      console.warn('Audio stream error on reciter URL:', audio.src, audio.error);
    };

    const handleTimeUpdate = () => {
      const time = audio.currentTime || 0;
      setCurrentTime(time);

      // Lock screen scrubber bar & position state
      if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
          try {
            navigator.mediaSession.setPositionState({
              duration: Math.max(0, audio.duration),
              playbackRate: audio.playbackRate || 1.0,
              position: Math.min(Math.max(0, time), audio.duration)
            });
          } catch {}
        }
      }

      const now = Date.now();
      const nowSec = Math.floor(now / 1000);
      if (nowSec !== lastSecRef.current) {
        lastSecRef.current = nowSec;
        setTodayListeningSeconds(prev => {
          const next = prev + 1;
          try {
            localStorage.setItem('quranspot_daily_stats', JSON.stringify({
              date: getTodayDateStr(),
              seconds: next
            }));
          } catch {}
          return next;
        });
      }

      // Persist last played session every ~3s if time > 2
      if (now - lastSaveRef.current > 3000 && time > 2) {
        lastSaveRef.current = now;
        const curSurah = currentSurahRef.current;
        const curReciter = reciterRef.current;
        const session: LastPlayedSession = {
          surahId: curSurah.id,
          reciterId: curReciter.id,
          currentTime: Math.floor(time),
          duration: Math.floor(audio.duration || 0),
          updatedAt: now
        };
        setLastPlayed(session);
        try {
          localStorage.setItem('quranspot_last_played', JSON.stringify(session));
        } catch {}
      }
    };

    const handleEnded = () => {
      const curSurah = currentSurahRef.current;
      setKhatamCompletedSurahs(prev => {
        if (!prev.includes(curSurah.id)) {
          const next = [...prev, curSurah.id];
          try {
            localStorage.setItem('quranspot_khatam_completed', JSON.stringify(next));
          } catch {}
          return next;
        }
        return prev;
      });

      if (repeatModeRef.current === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        // Continuous background progression from surah to surah
        let nextId: number;
        if (isShuffledRef.current) {
          nextId = Math.floor(Math.random() * 114) + 1;
        } else {
          nextId = curSurah.id >= 114 ? 1 : curSurah.id + 1;
        }
        const next = SURAHS.find(s => s.id === nextId) || SURAHS[0];
        setCurrentSurah(next, true);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
      const time = audio.currentTime || 0;
      if (time > 2) {
        const curSurah = currentSurahRef.current;
        const curReciter = reciterRef.current;
        const session: LastPlayedSession = {
          surahId: curSurah.id,
          reciterId: curReciter.id,
          currentTime: Math.floor(time),
          duration: Math.floor(audio.duration || 0),
          updatedAt: Date.now()
        };
        setLastPlayed(session);
        try {
          localStorage.setItem('quranspot_last_played', JSON.stringify(session));
        } catch {}
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  };

  // Setup initial HTML5 Audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.volume = isReciterMuted ? 0 : reciterVolume;
    audio.src = getAudioUrlForSurah(currentSurah.id, reciter);
    audioRef.current = audio;

    const cleanupListeners = attachAudioListeners(audio);

    return () => {
      audio.pause();
      cleanupListeners();
    };
  }, []);

  // Update Media Session (Lockscreen & Control Center)
  useEffect(() => {
    if ('mediaSession' in navigator) {
      try {
        const fullAvatarUrl = reciter.avatar.startsWith('http')
          ? reciter.avatar
          : new URL(reciter.avatar, window.location.href).href;

        navigator.mediaSession.metadata = new MediaMetadata({
          title: `${currentSurah.id}. ${currentSurah.nameSimple} (${currentSurah.nameArabic})`,
          artist: `${reciter.name} • Quranspot`,
          album: `Surah ke-${currentSurah.id} • ${currentSurah.versesCount} Ayat (${currentSurah.translatedName})`,
          artwork: [
            { src: fullAvatarUrl, sizes: '96x96', type: 'image/png' },
            { src: fullAvatarUrl, sizes: '128x128', type: 'image/png' },
            { src: fullAvatarUrl, sizes: '192x192', type: 'image/png' },
            { src: fullAvatarUrl, sizes: '256x256', type: 'image/png' },
            { src: fullAvatarUrl, sizes: '384x384', type: 'image/png' },
            { src: fullAvatarUrl, sizes: '512x512', type: 'image/png' }
          ]
        });

        navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

        navigator.mediaSession.setActionHandler('play', () => play());
        navigator.mediaSession.setActionHandler('pause', () => pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => prevSurah());
        navigator.mediaSession.setActionHandler('nexttrack', () => nextSurah());
        navigator.mediaSession.setActionHandler('seekforward', (details) => {
          seekRelative(details.seekOffset || 10);
        });
        navigator.mediaSession.setActionHandler('seekbackward', (details) => {
          seekRelative(-(details.seekOffset || 10));
        });
        try {
          navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.seekTime !== undefined && details.seekTime !== null) {
              seek(details.seekTime);
            }
          });
        } catch {}
        try {
          navigator.mediaSession.setActionHandler('stop', () => pause());
        } catch {}
      } catch (e) {
        console.warn('MediaSession metadata error:', e);
      }
    }
  }, [currentSurah, reciter, isPlaying]);

  // Handle visibilitychange to ensure background playback resilience
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = isPlayingRef.current ? 'playing' : 'paused';
        }
      } else if (document.visibilityState === 'visible') {
        if (eqCtxRef.current && eqCtxRef.current.state === 'suspended' && isPlayingRef.current) {
          eqCtxRef.current.resume().catch(() => {});
        }
        if (audioRef.current && isPlayingRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Switch Reciter
  const setReciter = (newReciter: Reciter) => {
    setReciterState(newReciter);
    localStorage.setItem('quranspot_reciter', newReciter.id);
    if (audioRef.current) {
      const savedTime = audioRef.current.currentTime;
      const wasPlaying = isPlaying;
      audioRef.current.src = getAudioUrlForSurah(currentSurah.id, newReciter);
      audioRef.current.currentTime = savedTime;
      if (wasPlaying) {
        audioRef.current.play().catch(console.warn);
      }
    }
  };

  // Load new audio source on surah change
  const setCurrentSurah = (surah: Surah, autoplay = true) => {
    setCurrentSurahState(surah);
    try {
      localStorage.setItem('quranspot_last_surah', surah.id.toString());
    } catch {}
    if (audioRef.current) {
      audioRef.current.src = getAudioUrlForSurah(surah.id, reciterRef.current);
      audioRef.current.playbackRate = speedRef.current;
      audioRef.current.volume = isReciterMutedRef.current ? 0 : reciterVolumeRef.current;
      if (autoplay) {
        if (eqPresetRef.current !== 'normal' && !eqCtxRef.current) {
          initAudioEq();
        }
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
          }
        }).catch(err => {
          console.warn('Autoplay prevented by browser:', err);
        });
      }
    }
  };

  const playSurahById = (id: number) => {
    const s = SURAHS.find(item => item.id === id);
    if (s) {
      setCurrentSurah(s, true);
    }
  };

  const play = () => {
    if (eqPresetRef.current !== 'normal' && !eqCtxRef.current) {
      initAudioEq();
    }
    if (audioRef.current) {
      if (!audioRef.current.src || audioRef.current.src === '') {
        audioRef.current.src = getAudioUrlForSurah(currentSurahRef.current.id, reciterRef.current);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
      }).catch(err => console.warn('Play error:', err));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      const bounded = Math.max(0, Math.min(duration || 1000, seconds));
      audioRef.current.currentTime = bounded;
      setCurrentTime(bounded);
    }
  };

  const seekRelative = (deltaSeconds: number) => {
    if (audioRef.current) {
      seek((audioRef.current.currentTime || 0) + deltaSeconds);
    }
  };

  const setSpeed = (val: number) => {
    setSpeedState(val);
    if (audioRef.current) {
      audioRef.current.playbackRate = val;
    }
  };

  const setReciterVolume = (vol: number) => {
    setReciterVolumeState(vol);
    setIsReciterMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const toggleReciterMute = () => {
    if (isReciterMuted) {
      setIsReciterMuted(false);
      if (audioRef.current) audioRef.current.volume = reciterVolume;
    } else {
      setIsReciterMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const cycleRepeatMode = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const toggleShuffle = () => {
    setIsShuffled(prev => !prev);
  };

  const nextSurah = () => {
    let nextId: number;
    if (isShuffled) {
      nextId = Math.floor(Math.random() * 114) + 1;
    } else {
      nextId = currentSurah.id >= 114 ? 1 : currentSurah.id + 1;
    }
    const next = SURAHS.find(s => s.id === nextId) || SURAHS[0];
    setCurrentSurah(next, true);
  };

  const prevSurah = () => {
    if (currentTime > 5 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevId = currentSurah.id <= 1 ? 114 : currentSurah.id - 1;
    const prev = SURAHS.find(s => s.id === prevId) || SURAHS[113];
    setCurrentSurah(prev, true);
  };

  // Ambient sound controls
  const toggleAmbientSound = (id: string) => {
    setAmbientSounds(prev =>
      prev.map(sound => {
        if (sound.id === id) {
          const nextActive = !sound.isActive;
          ambientEngine.setSoundActive(sound.id, nextActive, sound.volume);
          return { ...sound, isActive: nextActive };
        }
        return sound;
      })
    );
  };

  const setAmbientSoundVolume = (id: string, vol: number) => {
    setAmbientSounds(prev =>
      prev.map(sound => {
        if (sound.id === id) {
          ambientEngine.setSoundVolume(sound.id, vol);
          return { ...sound, volume: vol };
        }
        return sound;
      })
    );
  };

  const activeAmbientCount = ambientSounds.filter(s => s.isActive).length;

  // Sleep Timer countdown interval
  const setSleepTimer = (minutes: number | null) => {
    setSleepTimerMinutes(minutes);
    if (minutes === null) {
      setTimerRemainingSeconds(null);
    } else {
      setTimerRemainingSeconds(minutes * 60);
    }
  };

  useEffect(() => {
    if (timerRemainingSeconds === null) return;
    if (timerRemainingSeconds <= 0) {
      pause();
      ambientEngine.stopAll();
      setAmbientSounds(prev => prev.map(s => ({ ...s, isActive: false })));
      setSleepTimer(null);
      return;
    }

    const interval = setInterval(() => {
      setTimerRemainingSeconds(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRemainingSeconds]);

  // Favorites
  const toggleFavorite = (surahId: number) => {
    setFavorites(prev => {
      const exists = prev.includes(surahId);
      const next = exists ? prev.filter(id => id !== surahId) : [...prev, surahId];
      localStorage.setItem('quranspot_favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (surahId: number) => favorites.includes(surahId);

  // Fetch Verses Cleanly (No live sync needed, purely readable Mushaf)
  const fetchVersesForCurrentSurah = async () => {
    setIsLoadingVerses(true);
    try {
      const textRes = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${currentSurah.id}?language=id&words=false&translations=33&fields=text_uthmani&per_page=300`
      );
      const textData = await textRes.json();

      if (textData && textData.verses) {
        interface RawVerse {
          id: number;
          verse_number: number;
          verse_key: string;
          text_uthmani: string;
          translations?: { text: string }[];
        }

        const mapped: Verse[] = textData.verses.map((v: RawVerse) => ({
          id: v.id,
          verse_number: v.verse_number,
          verse_key: v.verse_key,
          text_uthmani: v.text_uthmani,
          translation: v.translations && v.translations[0] ? v.translations[0].text.replace(/<[^>]*>?/gm, '') : ''
        }));

        setVerses(mapped);
      }
    } catch (e) {
      console.error('Failed to load verses:', e);
    } finally {
      setIsLoadingVerses(false);
    }
  };

  const resumeLastPlayed = () => {
    if (!lastPlayed) return;
    const targetSurah = SURAHS.find(s => s.id === lastPlayed.surahId) || currentSurah;
    const targetReciter = RECITERS.find(r => r.id === lastPlayed.reciterId) || reciter;

    if (targetReciter.id !== reciter.id) {
      setReciterState(targetReciter);
      localStorage.setItem('quranspot_reciter', targetReciter.id);
    }

    setCurrentSurahState(targetSurah);
    localStorage.setItem('quranspot_last_surah', targetSurah.id.toString());

    if (audioRef.current) {
      initAudioEq();
      audioRef.current.src = getAudioUrlForSurah(targetSurah.id, targetReciter);
      audioRef.current.currentTime = Math.max(0, lastPlayed.currentTime);
      audioRef.current.playbackRate = speed;
      audioRef.current.volume = isReciterMuted ? 0 : reciterVolume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.warn(err));
    }
  };

  const setMushafBookmark = (bm: MushafBookmark | null) => {
    setMushafBookmarkState(bm);
    try {
      if (bm) {
        localStorage.setItem('quranspot_mushaf_bookmark', JSON.stringify(bm));
      } else {
        localStorage.removeItem('quranspot_mushaf_bookmark');
      }
    } catch {
      // ignore
    }
  };

  const openMushafAtBookmark = () => {
    if (!mushafBookmark) return;
    const targetSurah = SURAHS.find(s => s.id === mushafBookmark.surahId);
    if (targetSurah) {
      setCurrentSurahState(targetSurah);
      localStorage.setItem('quranspot_last_surah', targetSurah.id.toString());
      setIsMushafOpen(true);
    }
  };

  // Keyboard Shortcuts Listener for Desktop Power Users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekRelative(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekRelative(10);
          break;
        case 'KeyM':
          e.preventDefault();
          toggleReciterMute();
          break;
        case 'KeyZ':
          e.preventDefault();
          setIsZenMode(!isZenMode);
          break;
        case 'KeyQ':
          e.preventDefault();
          setIsMushafOpen(!isMushafOpen);
          break;
        case 'Slash':
          if (e.shiftKey) {
            e.preventDefault();
            setIsShortcutsOpen(!isShortcutsOpen);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seekRelative, toggleReciterMute, isZenMode, isMushafOpen, isShortcutsOpen]);

  return (
    <PlayerContext.Provider
      value={{
        currentSurah,
        reciter,
        recitersList: RECITERS,
        setReciter,
        surahList: SURAHS,
        setCurrentSurah,
        playSurahById,
        isPlaying,
        togglePlay,
        play,
        pause,
        currentTime,
        duration,
        seek,
        seekRelative,
        nextSurah,
        prevSurah,
        speed,
        setSpeed,
        repeatMode,
        cycleRepeatMode,
        isShuffled,
        toggleShuffle,
        reciterVolume,
        setReciterVolume,
        isReciterMuted,
        toggleReciterMute,
        ambientSounds,
        toggleAmbientSound,
        setAmbientSoundVolume,
        activeAmbientCount,
        sleepTimerMinutes,
        setSleepTimer,
        timerRemainingSeconds,
        viewMode,
        setViewMode,
        isZenMode,
        setIsZenMode,
        isMushafOpen,
        setIsMushafOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        selectedCollectionId,
        setSelectedCollectionId,
        favorites,
        toggleFavorite,
        isFavorite,
        verses,
        isLoadingVerses,
        fetchVersesForCurrentSurah,
        lastPlayed,
        resumeLastPlayed,
        mushafBookmark,
        setMushafBookmark,
        openMushafAtBookmark,
        khatamCompletedSurahs,
        toggleSurahCompleted,
        resetKhatamProgress,
        todayListeningSeconds,
        dailyGoalMinutes,
        setDailyGoalMinutes,
        isKhatamModalOpen,
        setIsKhatamModalOpen,
        eqPreset,
        setEqPreset,
        isEqModalOpen,
        setIsEqModalOpen,
        theme,
        setTheme,
        isThemeModalOpen,
        setIsThemeModalOpen,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
