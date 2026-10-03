export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  category: 'rain' | 'water' | 'nature' | 'relax';
  description: string;
  volume: number; // 0 to 1
  isActive: boolean;
  audioSrc: string;
}

const BASE_URL = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const INITIAL_AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Hujan Lembut',
    icon: '🌧️',
    category: 'rain',
    description: 'Rintik hujan alami yang tenang membasahi pepohonan',
    volume: 0.45,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/rain.mp3`
  },
  {
    id: 'rain_window',
    name: 'Hujan di Kaca',
    icon: '🪟',
    category: 'rain',
    description: 'Ketukan butir hujan lembut di jendela kaca kamar',
    volume: 0.4,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/rain_window.mp3`
  },
  {
    id: 'stream',
    name: 'Aliran Sungai',
    icon: '💧',
    category: 'water',
    description: 'Gemericik jernih aliran sungai kecil pegunungan',
    volume: 0.4,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/stream.mp3`
  },
  {
    id: 'ocean',
    name: 'Ombak Lautan',
    icon: '🌊',
    category: 'water',
    description: 'Deburan ombak pantai berirama santai dan luas',
    volume: 0.4,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/ocean.mp3`
  },
  {
    id: 'campfire',
    name: 'Api Unggun',
    icon: '🔥',
    category: 'relax',
    description: 'Gemeretak hangat kayu bakar di tengah ketenangan',
    volume: 0.35,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/campfire.mp3`
  },
  {
    id: 'wind',
    name: 'Hutan Pinus & Angin',
    icon: '🌲',
    category: 'nature',
    description: 'Semilir angin sejuk melintasi pepohonan pinus',
    volume: 0.3,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/wind.mp3`
  },
  {
    id: 'night',
    name: 'Malam Pedesaan',
    icon: '🌙',
    category: 'nature',
    description: 'Suasana syahdu malam hari dengan suara jangkrik alami',
    volume: 0.3,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/night.mp3`
  },
  {
    id: 'birds',
    name: 'Kicau Burung Pagi',
    icon: '🐦',
    category: 'nature',
    description: 'Kicauan merdu burung fajar di rimba nan damai',
    volume: 0.3,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/birds.mp3`
  },
  {
    id: 'thunder',
    name: 'Gemuruh Petir',
    icon: '⚡',
    category: 'rain',
    description: 'Dentuman gemuruh petir lembut bergema di kejauhan',
    volume: 0.3,
    isActive: false,
    audioSrc: `${BASE_URL}sounds/thunder.mp3`
  }
];

interface ChannelState {
  sourceNode: AudioBufferSourceNode | null;
  gainNode: GainNode;
  filterNode: BiquadFilterNode;
  targetVolume: number;
  audioElement?: HTMLAudioElement;
  isActive: boolean;
}

const isMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
    (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1);
};

class StudioAmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private channels: Map<string, ChannelState> = new Map();
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private loadingBuffers: Map<string, Promise<AudioBuffer | null>> = new Map();

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('Web Audio API not supported in this environment:', e);
        return null;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  // Pre-load audio buffer in memory for gapless sample-accurate looping
  private async loadBuffer(url: string): Promise<AudioBuffer | null> {
    if (this.bufferCache.has(url)) {
      return this.bufferCache.get(url)!;
    }

    if (this.loadingBuffers.has(url)) {
      return this.loadingBuffers.get(url)!;
    }

    const promise = (async () => {
      try {
        const ctx = this.initContext();
        if (!ctx) return null;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        this.bufferCache.set(url, audioBuffer);
        return audioBuffer;
      } catch (err) {
        console.warn(`Could not load audio buffer for ${url}, falling back to HTMLAudioElement:`, err);
        return null;
      } finally {
        this.loadingBuffers.delete(url);
      }
    })();

    this.loadingBuffers.set(url, promise);
    return promise;
  }

  public setSoundActive(id: string, active: boolean, volume = 0.35) {
    const soundDef = INITIAL_AMBIENT_SOUNDS.find(s => s.id === id);
    if (!soundDef) return;

    if (!active) {
      // Fade out and stop
      const ch = this.channels.get(id);
      if (ch) {
        ch.isActive = false;
        const ctx = this.ctx;
        if (ctx && ch.gainNode) {
          const now = ctx.currentTime;
          ch.gainNode.gain.cancelScheduledValues(now);
          ch.gainNode.gain.setValueAtTime(ch.gainNode.gain.value, now);
          ch.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

          setTimeout(() => {
            if (ch.sourceNode) {
              try {
                ch.sourceNode.stop();
                ch.sourceNode.disconnect();
              } catch {
                // already stopped
              }
              ch.sourceNode = null;
            }
            if (ch.audioElement) {
              ch.audioElement.pause();
              ch.audioElement.currentTime = 0;
            }
            this.channels.delete(id);
          }, 380);
        } else {
          if (ch.audioElement) {
            ch.audioElement.pause();
            ch.audioElement.currentTime = 0;
          }
          this.channels.delete(id);
        }
      }
      return;
    }

    // Sound activated
    if (this.channels.has(id)) {
      this.setSoundVolume(id, volume);
      return;
    }

    // On mobile devices, use direct HTML5 Audio for reliable background/screen-off playback
    if (isMobileDevice()) {
      const audio = new Audio(soundDef.audioSrc);
      audio.loop = true;
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      audio.volume = Math.max(0.001, Math.min(1.0, volume));
      audio.play().catch(e => console.warn(`Autoplay blocked for ${id}:`, e));
      this.channels.set(id, {
        sourceNode: null,
        gainNode: null as unknown as GainNode,
        filterNode: null as unknown as BiquadFilterNode,
        targetVolume: volume,
        audioElement: audio,
        isActive: true
      });
      return;
    }

    const ctx = this.initContext();

    if (!ctx || !this.masterGain) {
      // Direct HTML5 Audio fallback
      const audio = new Audio(soundDef.audioSrc);
      audio.loop = true;
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      audio.volume = Math.max(0.001, Math.min(1.0, volume));
      audio.play().catch(() => {});
      this.channels.set(id, {
        sourceNode: null,
        gainNode: null as unknown as GainNode,
        filterNode: null as unknown as BiquadFilterNode,
        targetVolume: volume,
        audioElement: audio,
        isActive: true
      });
      return;
    }

    // Create channel audio graph
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(15000, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);

    filter.connect(gain);
    gain.connect(this.masterGain);

    const chState: ChannelState = {
      sourceNode: null,
      gainNode: gain,
      filterNode: filter,
      targetVolume: volume,
      isActive: true
    };
    this.channels.set(id, chState);

    // Try loading gapless buffer first
    this.loadBuffer(soundDef.audioSrc).then(buffer => {
      // Check if user cancelled while loading
      if (!chState.isActive) return;

      if (buffer && ctx) {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(filter);
        chState.sourceNode = source;

        const now = ctx.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), now + 0.4);

        source.start(0);
      } else {
        // Fallback to HTMLAudioElement connected to Web Audio
        try {
          const audio = new Audio(soundDef.audioSrc);
          audio.loop = true;
          audio.crossOrigin = 'anonymous';
          const mediaSource = ctx.createMediaElementSource(audio);
          mediaSource.connect(filter);
          chState.audioElement = audio;

          const now = ctx.currentTime;
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), now + 0.4);

          audio.play().catch(e => console.warn(`Autoplay blocked for ${id}:`, e));
        } catch (e) {
          console.error(`Playback failed for ${id}:`, e);
        }
      }
    });
  }

  public setSoundVolume(id: string, volume: number) {
    const ch = this.channels.get(id);
    if (!ch) return;

    ch.targetVolume = volume;
    const bounded = Math.max(0.001, Math.min(1.0, volume));

    if (this.ctx && ch.gainNode) {
      const now = this.ctx.currentTime;
      ch.gainNode.gain.cancelScheduledValues(now);
      ch.gainNode.gain.setValueAtTime(ch.gainNode.gain.value, now);
      ch.gainNode.gain.setTargetAtTime(bounded, now, 0.05);
    } else if (ch.audioElement) {
      ch.audioElement.volume = bounded;
    }
  }

  public setMasterVolume(vol: number) {
    const bounded = Math.max(0, Math.min(1, vol));
    this.channels.forEach(ch => {
      if (ch.audioElement) {
        ch.audioElement.volume = Math.max(0.001, Math.min(1.0, ch.targetVolume * bounded));
      }
    });
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(bounded, now, 0.05);
  }

  public stopAll() {
    this.channels.forEach(ch => {
      ch.isActive = false;
      if (ch.sourceNode) {
        try {
          ch.sourceNode.stop();
          ch.sourceNode.disconnect();
        } catch {
          // ignore
        }
      }
      if (ch.audioElement) {
        try {
          ch.audioElement.pause();
          ch.audioElement.currentTime = 0;
        } catch {
          // ignore
        }
      }
    });
    this.channels.clear();
  }
}

export const ambientEngine = new StudioAmbientAudioEngine();
