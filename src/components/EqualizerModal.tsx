import React from 'react';
import { X, Sliders, Check, Sparkles, Mic } from 'lucide-react';
import { usePlayer, EqPreset } from '../context/PlayerContext';

interface PresetInfo {
  id: EqPreset;
  name: string;
  badge: string;
  icon: string;
  description: string;
  gains: { low: string; mid: string; high: string };
}

const EQ_PRESETS: PresetInfo[] = [
  {
    id: 'normal',
    name: 'Normal (Murni)',
    badge: 'Direct Native • Layar Mati HP',
    icon: '🎙️',
    description: 'Frekuensi asli hardware tanpa rekayasa filter. Dioptimalkan untuk pemutaran di HP saat layar mati atau terkunci.',
    gains: { low: '0 dB', mid: '0 dB', high: '0 dB' }
  },
  {
    id: 'clear',
    name: 'Clear Vocal & Makhraj',
    badge: 'Artikulasi Tajwid',
    icon: '✨',
    description: 'Peningkatan tajam frekuensi 3.2kHz (+8.5 dB) agar artikulasi huruf hijaiyah dan tajwid terdengar sangat jernih dan tajam',
    gains: { low: '-4.5 dB', mid: '+8.5 dB', high: '+5.5 dB' }
  },
  {
    id: 'warm',
    name: 'Warm Tadabbur',
    badge: 'Resonansi Hangat',
    icon: '🕯️',
    description: 'Kehangatan baritone 250Hz (+8.5 dB) yang menenangkan dan meredam treble untuk tadabbur hening di malam hari',
    gains: { low: '+8.5 dB', mid: '-2.0 dB', high: '-6.5 dB' }
  },
  {
    id: 'studio',
    name: 'Broadcast Studio',
    badge: 'Siaran Radio',
    icon: '🎧',
    description: 'Dinamika suara penuh (full-range) seperti siaran radio live dari Masjidil Haram Makkah',
    gains: { low: '+4.0 dB', mid: '+5.0 dB', high: '+5.5 dB' }
  }
];

export const EqualizerModal: React.FC = () => {
  const { isEqModalOpen, setIsEqModalOpen, eqPreset, setEqPreset } = usePlayer();

  if (!isEqModalOpen) return null;

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
              className="w-10 h-10 rounded-2xl border flex items-center justify-center"
              style={{
                backgroundColor: 'var(--theme-bg-pill)',
                borderColor: 'var(--theme-border-accent)',
                color: 'var(--theme-text-accent)'
              }}
            >
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Equalizer Vokal Qari
                </h2>
                <span 
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: 'var(--theme-bg-pill)',
                    borderColor: 'var(--theme-border-accent)',
                    color: 'var(--theme-text-accent)'
                  }}
                >
                  Web Audio 3-Band
                </span>
              </div>
              <p className="text-xs text-slate-400">Kustomisasi akustik dan kehangatan suara tilawah secara real-time</p>
            </div>
          </div>

          <button
            onClick={() => setIsEqModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets List */}
        <div className="space-y-2.5 my-4 overflow-y-auto max-h-[60vh] pr-1">
          {EQ_PRESETS.map(p => {
            const isSelected = eqPreset === p.id;

            return (
              <div
                key={p.id}
                onClick={() => setEqPreset(p.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected ? 'shadow-lg ring-1' : 'hover:scale-[1.01]'
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
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{p.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white">{p.name}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/40 text-slate-300 border border-white/10">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{p.description}</p>
                    </div>
                  </div>

                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                    style={isSelected ? {
                      backgroundColor: 'var(--theme-accent)',
                      borderColor: 'var(--theme-accent)',
                      color: '#090a0f'
                    } : {
                      borderColor: 'rgba(255,255,255,0.2)',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: 'transparent'
                    }}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* 3-Band Gains Preview */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400">
                  <span className="text-slate-400 font-sans font-semibold">Respons EQ:</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5">Bass 250Hz: {p.gains.low}</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5">Mid 3.2kHz: {p.gains.mid}</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5">Treble 7.5kHz: {p.gains.high}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips Layar Mati HP */}
        <div className="mb-3 p-3 rounded-2xl bg-sky-950/40 border border-sky-500/20 flex items-start gap-2.5 text-xs text-sky-200">
          <span className="text-base shrink-0">📱</span>
          <div>
            <span className="font-bold text-sky-100">Tips Pemutaran Latar Belakang (Layar HP Mati):</span>
            <p className="text-[11px] text-sky-200/80 mt-0.5 leading-relaxed">
              Browser HP (iOS / Android) membatasi Web Audio saat layar dimatikan demi hemat baterai. Gunakan preset <strong>Normal (Murni)</strong> untuk pemutaran tanpa henti dan kontrol penuh di Lock Screen HP.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
          <span className="text-xs text-slate-400">
            Perubahan berlaku instan ke tilawah yang sedang berputar
          </span>
          <button
            onClick={() => setIsEqModalOpen(false)}
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
