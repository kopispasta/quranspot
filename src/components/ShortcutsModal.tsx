import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const ShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen } = usePlayer();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: 'Spasi', desc: 'Putar atau jeda audio tilawah' },
    { key: '← / →', desc: 'Mundur / Maju 10 detik' },
    { key: '[ / ]', desc: 'Perlambat / Percepat tempo suara qari' },
    { key: 'M', desc: 'Bisukan / Bunyikan volume suara qari' },
    { key: 'Z', desc: 'Buka / Tutup Mode Zen layar penuh' },
    { key: 'Q', desc: 'Buka teks Mushaf dan terjemahan berjalan' },
    { key: 'R', desc: 'Ganti pilihan qari' },
    { key: '?', desc: 'Buka / Tutup panduan shortcut ini' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl border shadow-2xl p-6 relative transition-colors duration-400"
        style={{ backgroundColor: 'var(--theme-bg-sidebar)', borderColor: 'var(--theme-border)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Shortcut Keyboard</h2>
              <p className="text-xs text-slate-400">Navigasi cepat untuk pengguna desktop</p>
            </div>
          </div>
          <button
            onClick={() => setIsShortcutsOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 my-4">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800"
            >
              <span className="text-xs text-slate-300">{s.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-sky-400 shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsShortcutsOpen(false)}
          className="w-full mt-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
