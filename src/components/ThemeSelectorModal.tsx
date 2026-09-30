import React from 'react';
import { X, Palette, Check } from 'lucide-react';
import { usePlayer, ThemeMode } from '../context/PlayerContext';

interface ThemeInfo {
  id: ThemeMode;
  name: string;
  tagline: string;
  icon: string;
  primaryBg: string;
  cardBg: string;
  accentColor: string;
}

const THEMES: ThemeInfo[] = [
  {
    id: 'midnight',
    name: 'Midnight Navy',
    tagline: 'Gelap pekat elegan dengan aksen cyan langit malam',
    icon: '🌌',
    primaryBg: '#090a0f',
    cardBg: '#121626',
    accentColor: '#38bdf8'
  },
  {
    id: 'emerald',
    name: 'Emerald Medina',
    tagline: 'Hijau zamrud menyejukkan terinspirasi dari Masjid Nabawi',
    icon: '🌿',
    primaryBg: '#05140e',
    cardBg: '#0b261b',
    accentColor: '#10b981'
  },
  {
    id: 'kaaba',
    name: 'Golden Ka\'bah',
    tagline: 'Hitam kiswah Ka\'bah dengan sentuhan kaligrafi emas hangat',
    icon: '🕋',
    primaryBg: '#0c0a06',
    cardBg: '#211a0d',
    accentColor: '#f59e0b'
  },
  {
    id: 'monochrome',
    name: 'Onyx Minimalist',
    tagline: 'Hitam murni monokrom dengan aksen perak studio minimalis',
    icon: '🖤',
    primaryBg: '#080808',
    cardBg: '#181818',
    accentColor: '#f1f5f9'
  }
];

export const ThemeSelectorModal: React.FC = () => {
  const { isThemeModalOpen, setIsThemeModalOpen, theme, setTheme } = usePlayer();

  if (!isThemeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div 
        className="w-full max-w-lg rounded-3xl border shadow-2xl p-6 relative overflow-hidden flex flex-col transition-colors duration-400"
        style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Glow */}
        <div 
          className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-25"
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
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Tema Visual Quranspot
              </h2>
              <p className="text-xs text-slate-400">Pilih palet nuansa warna tampilan yang menenteramkan pandangan</p>
            </div>
          </div>

          <button
            onClick={() => setIsThemeModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Cards Grid */}
        <div className="space-y-3 my-4 overflow-y-auto max-h-[60vh] pr-1">
          {THEMES.map(t => {
            const isSelected = theme === t.id;

            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'shadow-xl ring-2'
                    : 'hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: t.cardBg,
                  borderColor: isSelected ? t.accentColor : 'rgba(255,255,255,0.1)',
                  boxShadow: isSelected ? `0 8px 30px ${t.accentColor}35` : undefined
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.name}</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">{t.tagline}</p>
                    </div>
                  </div>

                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                    style={isSelected ? {
                      backgroundColor: t.accentColor,
                      borderColor: t.accentColor,
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

                {/* Color swatches */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-2">
                  <span className="text-[10px] text-slate-400 font-medium">Palet:</span>
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: t.primaryBg }}
                      title="Warna Latar"
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: t.cardBg }}
                      title="Warna Kartu"
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: t.accentColor }}
                      title="Warna Aksen"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
          <span className="text-xs text-slate-400">
            Tema tersimpan otomatis di perangkat Anda
          </span>
          <button
            onClick={() => setIsThemeModalOpen(false)}
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
