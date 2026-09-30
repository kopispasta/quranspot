import React, { useState } from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroReciter } from './components/HeroReciter';
import { CollectionsSection } from './components/CollectionsSection';
import { SurahCatalog } from './components/SurahCatalog';
import { CollectionDetail } from './components/CollectionDetail';
import { ReciterDetail } from './components/ReciterDetail';
import { BottomPlayer } from './components/BottomPlayer';
import { ZenPlayer } from './components/ZenPlayer';
import { AmbientMixerModal } from './components/AmbientMixerModal';
import { SleepTimerModal } from './components/SleepTimerModal';
import { MushafModal } from './components/MushafModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ResumeBanner } from './components/ResumeBanner';
import { KhatamTrackerModal } from './components/KhatamTrackerModal';
import { EqualizerModal } from './components/EqualizerModal';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { Collection } from './data/collections';

const MainContent: React.FC = () => {
  const { viewMode, setViewMode, isZenMode, theme } = usePlayer();
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isAmbientModalOpen, setIsAmbientModalOpen] = useState(false);
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col font-sans transition-colors duration-400 bg-theme-main"
      style={{ backgroundColor: 'var(--theme-bg-main)' }}
    >
      <div className="flex flex-1">
        {/* Sidebar Nav (Desktop) */}
        <Sidebar />

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onOpenAmbientMixer={() => setIsAmbientModalOpen(true)}
            onOpenSleepTimer={() => setIsSleepModalOpen(true)}
          />

          <main className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto pb-32">
            {selectedCollection ? (
              <CollectionDetail
                collection={selectedCollection}
                onBack={() => setSelectedCollection(null)}
              />
            ) : viewMode === 'home' ? (
              <>
                <ResumeBanner />
                <HeroReciter onViewAllClick={() => setViewMode('search')} />
                <CollectionsSection
                  onSelectCollection={col => setSelectedCollection(col)}
                />
              </>
            ) : viewMode === 'collections' ? (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Koleksi Pilihan</h2>
                  <p className="text-xs text-slate-400">Pilih suasana mendengarkan yang paling sesuai dengan aktivitas Anda</p>
                </div>
                <CollectionsSection
                  onSelectCollection={col => setSelectedCollection(col)}
                />
              </div>
            ) : viewMode === 'reciter' ? (
              <ReciterDetail />
            ) : (
              <SurahCatalog />
            )}
          </main>
        </div>
      </div>

      {/* Persistent Audio Player Bar */}
      <BottomPlayer
        onOpenAmbientMixer={() => setIsAmbientModalOpen(true)}
        onOpenSleepTimer={() => setIsSleepModalOpen(true)}
      />

      {/* Fullscreen Zen Ambient Mode */}
      {isZenMode && (
        <ZenPlayer
          onOpenAmbientMixer={() => setIsAmbientModalOpen(true)}
          onOpenSleepTimer={() => setIsSleepModalOpen(true)}
        />
      )}

      {/* Ambient Sound Mixer Modal */}
      <AmbientMixerModal
        isOpen={isAmbientModalOpen}
        onClose={() => setIsAmbientModalOpen(false)}
      />

      {/* Sleep Timer Modal */}
      <SleepTimerModal
        isOpen={isSleepModalOpen}
        onClose={() => setIsSleepModalOpen(false)}
      />

      {/* Mushaf & Translation Reader Modal */}
      <MushafModal />

      {/* Desktop Keyboard Shortcuts Cheatsheet Modal */}
      <ShortcutsModal />

      {/* Target & Khatam Tracker Modal */}
      <KhatamTrackerModal />

      {/* Voice Equalizer Modal */}
      <EqualizerModal />

      {/* Visual Theme Selector Modal */}
      <ThemeSelectorModal />
    </div>
  );
};

export default function App() {
  return (
    <PlayerProvider>
      <MainContent />
    </PlayerProvider>
  );
}
