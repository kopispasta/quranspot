import React from 'react';
import { X, Gauge, RotateCcw, Minus, Plus, Zap, Check } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface SpeedPreset {
  value: number;
  label: string;
  badge?: string;
  desc: string;
}

const SPEED_PRESETS: SpeedPreset[] = [
  { value: 0.5, label: '0.5x', desc: 'Sangat Lambat (Analisis Makhraj Detail)' },
  { value: 0.75, label: '0.75x', desc: 'Lambat Khusyuk (Penghayatan Tajwid)' },
  { value: 0.85, label: '0.85x', badge: 'Tartil', desc: 'Tartil Tadabbur (Menghafal & Menyimak)' },
  { value: 1.0, label: '1.0x', badge: 'Normal', desc: 'Tempo Orisinal Rekaman Qari' },
  { value: 1.15, label: '1.15x', desc: 'Sedikit Cepat (Mengalir Santai)' },
  { value: 1.25, label: '1.25x', badge: 'Muraja\'ah', desc: 'Muraja\'ah Hadr (Mengulang Hafalan)' },
  { value: 1.5, label: '1.5x', desc: 'Tilawah Efisien (Fokus Simakan Cepat)' },
  { value: 1.75, label: '1.75x', desc: 'Akselerasi Tinggi' },
  { value: 2.0, label: '2.0x', badge: 'Maks', desc: 'Review Hafalan Ekstra Cepat' },
];

export const SpeedModal: React.FC = () => {
  const { isSpeedModalOpen, setIsSpeedModalOpen, speed, setSpeed } = usePlayer();

  if (!isSpeedModalOpen) return null;

  const handleStep = (delta: number) => {
    const next = Math.round((speed + delta) * 100) / 100;
    setSpeed(Math.max(0.5, Math.min(2.0, next)));
  };

  const getSpeedCategory = (val: number) => {
    if (val <= 0.85) {
      return {
        icon: '🐢',
        title: 'Tartil Khusyuk & Belajar Tajwid',
        desc: 'Makhraj huruf terdengar sangat jelas dan renggang, sangat ideal untuk menyimak dan menghafal ayat baru.'
      };
    }
    if (val <= 1.05) {
      return {
        icon: '🎙️',
        title: 'Tempo Alami Qari',
        desc: 'Kecepatan standar orisinal studio dari lantunan tilawah qari.'
      };
    }
    if (val <= 1.35) {
      return {
        icon: '⚡',
        title: 'Muraja\'ah Hadr Lancar',
        desc: 'Tempo lebih dinamis untuk mempercepat pengulangan hafalan tanpa kehilangan artikulasi lafaz.'
      };
    }
    return {
      icon: '🚀',
      title: 'Khatam Akselerasi',
      desc: 'Tempo tinggi untuk review hafalan intensif dan tilawah khatam efisien.'
    };
  };

  const category = getSpeedCategory(speed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div 
        className="w-full max-w-lg rounded-3xl border shadow-2xl p-6 relative overflow-hidden flex flex-col transition-colors duration-400"
        style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Glow */}
        <div 
          className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl border flex items-center justify-center shadow-inner"
              style={{
                backgroundColor: 'var(--theme-bg-pill)',
                borderColor: 'var(--theme-border-accent)',
                color: 'var(--theme-text-accent)'
              }}
            >
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Kecepatan Suara Qari
                </h2>
                <span 
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: 'var(--theme-bg-pill)',
                    borderColor: 'var(--theme-border-accent)',
                    color: 'var(--theme-text-accent)'
                  }}
                >
                  0.5x - 2.0x
                </span>
              </div>
              <p className="text-xs text-slate-400">Atur tempo tilawah sesuai kebutuhan muraja'ah & kenyamanan telinga</p>
            </div>
          </div>

          <button
            onClick={() => setIsSpeedModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Speed Indicator & Fine Stepper */}
        <div className="my-5 p-4 rounded-2xl border bg-black/30 flex flex-col items-center gap-3" style={{ borderColor: 'var(--theme-border)' }}>
          {/* Big Number & Category Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight" style={{ color: 'var(--theme-text-accent)' }}>
                {speed.toFixed(2)}
              </span>
              <span className="text-2xl font-mono font-bold text-slate-400">x</span>
            </div>

            <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <span>{category.icon}</span>
              <span className="font-bold text-white">{category.title}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 max-w-sm px-2">
              {category.desc}
            </p>
          </div>

          {/* Stepper Buttons & Continuous Slider */}
          <div className="w-full flex items-center gap-3 pt-2">
            <button
              onClick={() => handleStep(-0.05)}
              disabled={speed <= 0.5}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition shrink-0 cursor-pointer"
              title="Perlambat 0.05x"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="flex-1 relative flex items-center">
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={speed}
                onChange={e => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            <button
              onClick={() => handleStep(0.05)}
              disabled={speed >= 2.0}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition shrink-0 cursor-pointer"
              title="Percepat 0.05x"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Reset button if not 1.0 */}
          {speed !== 1.0 && (
            <button
              onClick={() => setSpeed(1.0)}
              className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>Kembalikan ke Normal (1.0x)</span>
            </button>
          )}
        </div>

        {/* Quick Presets Grid */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">Preset Pilihan Cepat:</span>
            <span className="text-[10px] text-slate-400 font-mono">Pilih instan</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {SPEED_PRESETS.map(p => {
              const isSelected = Math.abs(speed - p.value) < 0.02;

              return (
                <button
                  key={p.value}
                  onClick={() => setSpeed(p.value)}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                    isSelected ? 'shadow-md ring-1 ring-white/20' : 'hover:scale-[1.02] active:scale-95'
                  }`}
                  style={isSelected ? {
                    backgroundColor: 'var(--theme-bg-pill)',
                    borderColor: 'var(--theme-border-accent)',
                    color: 'var(--theme-text-accent)'
                  } : {
                    backgroundColor: 'var(--theme-bg-card)',
                    borderColor: 'var(--theme-border)'
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono font-bold text-sm text-white">{p.label}</span>
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                    ) : p.badge ? (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-slate-300 border border-white/10">
                        {p.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 line-clamp-1 truncate">
                    {p.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Natural Pitch Note */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200/90 mb-4">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Nada dan karakter vokal qari <strong>tetap alami</strong> (pitch-preserved) tanpa efek distorsi suara robot atau chipmunk pada kecepatan berapa pun.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 shrink-0">
          <span className="text-xs text-slate-400">
            Shortcut keyboard: <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-sky-400 font-mono text-[10px]">[</kbd> dan <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-sky-400 font-mono text-[10px]">]</kbd>
          </span>
          <button
            onClick={() => setIsSpeedModalOpen(false)}
            className="px-5 py-2 rounded-xl font-bold text-xs transition shadow-md active:scale-95 cursor-pointer"
            style={{ backgroundColor: 'var(--theme-accent)', color: '#090a0f' }}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
