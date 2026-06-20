import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Splash from './components/Splash';
import ArchetypeSelector from './components/ArchetypeSelector';
import LifeMap from './components/LifeMap';
import StatsDashboard from './components/StatsDashboard';
import ProfileIdentity from './components/ProfileIdentity';
import ScenarioPlay from './components/ScenarioPlay';
import ChaosFeed from './components/ChaosFeed';
import { ActiveTab, ArchetypeId, Customizations } from './types';

export default function App() {
  // Splash and start flow state
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    const saved = localStorage.getItem('social_levels_has_started');
    return saved === 'true';
  });

  const [archetypeSelected, setArchetypeSelected] = useState<boolean>(() => {
    const saved = localStorage.getItem('social_levels_arch_selected');
    return saved === 'true';
  });

  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeId | null>(() => {
    return localStorage.getItem('social_levels_arch') as ArchetypeId | null;
  });

  // Numeric gaming states
  const [aura, setAura] = useState<number>(() => {
    const saved = localStorage.getItem('social_levels_aura');
    return saved ? parseInt(saved, 10) : 942;
  });

  const [level, setLevel] = useState<number>(() => {
    const saved = localStorage.getItem('social_levels_level');
    return saved ? parseInt(saved, 10) : 14;
  });

  const [pulseRate, setPulseRate] = useState<number>(124);
  const [streakDays, setStreakDays] = useState<number>(15);

  // Avatar customizations states
  const [customizations, setCustomizations] = useState<Customizations>(() => {
    const saved = localStorage.getItem('social_levels_customs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
         // Fallback
      }
    }
    return {
      moodAura: 'bg-primary-container',
      moodAuraEmoji: '💙',
      dripPack: 'ronin',
      hairIndex: 0
    };
  });

  // Base state managers navigation tabs
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Sync state stats back of updates to localstorage
  useEffect(() => {
    localStorage.setItem('social_levels_has_started', String(hasStarted));
    localStorage.setItem('social_levels_arch_selected', String(archetypeSelected));
    if (selectedArchetype) {
      localStorage.setItem('social_levels_arch', selectedArchetype);
    }
    localStorage.setItem('social_levels_aura', String(aura));
    localStorage.setItem('social_levels_level', String(level));
    localStorage.setItem('social_levels_customs', JSON.stringify(customizations));
  }, [hasStarted, archetypeSelected, selectedArchetype, aura, level, customizations]);

  const handleStartGame = () => {
    setHasStarted(true);
  };

  const handleSelectArchetype = (id: ArchetypeId) => {
    setSelectedArchetype(id);
    setArchetypeSelected(true);
    // Standard starting customization depending on archetype chosen
    if (id === 'chaos') {
      setCustomizations(prev => ({ ...prev, moodAura: 'bg-secondary-container', moodAuraEmoji: '🔥' }));
    } else if (id === 'strategist') {
      setCustomizations(prev => ({ ...prev, moodAura: 'bg-tertiary-container', moodAuraEmoji: '⚡' }));
    } else {
      setCustomizations(prev => ({ ...prev, moodAura: 'bg-primary-container', moodAuraEmoji: '💙' }));
    }
    setActiveTab('home');
  };

  const handleScenarioStart = () => {
    setActiveTab('play');
  };

  const handleUpdateStats = (auraDiff: number, levelDiff: number) => {
    setAura(prev => Math.max(0, prev + auraDiff));
    setLevel(prev => Math.max(1, prev + levelDiff));
    
    // Simulate heart rate changes on interaction
    setPulseRate(prev => Math.min(145, Math.max(88, prev + Math.floor(Math.random() * 15 - 7))));
  };

  const handleUpdateCustomizations = (updates: Partial<Customizations>) => {
    setCustomizations(prev => ({ ...prev, ...updates }));
  };

  const handleResetGameData = () => {
    // Hidden debug helper to reset
    localStorage.clear();
    setHasStarted(false);
    setArchetypeSelected(false);
    setSelectedArchetype(null);
    setAura(942);
    setLevel(14);
    setPulseRate(124);
    setCustomizations({
      moodAura: 'bg-primary-container',
      moodAuraEmoji: '💙',
      dripPack: 'ronin',
      hairIndex: 0
    });
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-[#0f131e] text-on-surface flex flex-col font-sans antialiased pb-24 relative select-none">
      
      {/* Background Atmosphere Layers */}
      <div className="fixed inset-0 bg-grid z-0 opacity-40 pointer-events-none"></div>

      {/* Render top AppBar once gameplay begins */}
      {hasStarted && archetypeSelected ? (
        <Header 
          level={level} 
          activeTab={activeTab} 
          onNavigate={(tab) => setActiveTab(tab)} 
          archetypeSelected={archetypeSelected}
        />
      ) : null}

      {/* Dynamic Screen routing layout state machine */}
      <div className="flex-grow z-10 w-full">
        {!hasStarted ? (
          <Splash onStart={handleStartGame} />
        ) : !archetypeSelected ? (
          <ArchetypeSelector onSelected={handleSelectArchetype} />
        ) : (
          <>
            {activeTab === 'home' && (
              <LifeMap 
                aura={aura} 
                level={level} 
                onSelectScenario={handleScenarioStart}
                onShowLockedLevels={() => setActiveTab('play')} 
              />
            )}

            {activeTab === 'play' && (
              <ScenarioPlay 
                aura={aura} 
                level={level} 
                selectedArchetype={selectedArchetype}
                onUpdateStats={handleUpdateStats}
                onUpdateCustomizations={handleUpdateCustomizations}
                onGoToTab={(tab) => setActiveTab(tab)}
                onBackToHome={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'chaos' && (
              <ChaosFeed onPlayScenario={handleScenarioStart} />
            )}

            {activeTab === 'stats' && (
              <StatsDashboard aura={aura} />
            )}

            {activeTab === 'profile' && (
              <ProfileIdentity 
                aura={aura} 
                level={level} 
                pulseRate={pulseRate}
                streakDays={streakDays}
                selectedArchetype={selectedArchetype}
                customizations={customizations}
                onUpdateCustomizations={handleUpdateCustomizations}
              />
            )}
          </>
        )}
      </div>

      {/* Hidden reset button inside footer for developers testing */}
      {hasStarted && (
        <div className="fixed bottom-26 right-4 z-40 opacity-20 hover:opacity-100 transition-opacity">
          <button 
            onClick={handleResetGameData}
            className="px-2.5 py-1 text-[8px] font-sans font-black text-outline uppercase tracking-wider rounded-lg border border-white/10 hover:border-red-500/40 hover:text-red-400 bg-surface/80 backdrop-blur-md"
          >
            Reset Game
          </button>
        </div>
      )}

      {/* Render Bottom Navigation once gameplay begins */}
      {hasStarted && archetypeSelected ? (
        <BottomNav 
          activeTab={activeTab} 
          onNavigate={(tab) => setActiveTab(tab)} 
        />
      ) : null}
    </div>
  );
}
