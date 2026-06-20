import React, { useState } from 'react';
import { Archetype, ArchetypeId } from '../types';

interface ArchetypeSelectorProps {
  onSelected: (id: ArchetypeId) => void;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'chill',
    title: 'Chill Observer',
    emoji: '😎',
    description: 'Loves the vibe, watches the flow, and keeps things balanced.',
    glowClass: 'glow-blue text-primary-fixed hover:border-primary-fixed',
    themeColor: '#00f5ff'
  },
  {
    id: 'chaos',
    title: 'Chaos Reactor',
    emoji: '🔥',
    description: 'Thrives in the noise, creates sparks, and moves at light speed.',
    glowClass: 'glow-red text-secondary hover:border-secondary',
    themeColor: '#ff4b89'
  },
  {
    id: 'strategist',
    title: 'Overthink Strategist',
    emoji: '🧠',
    description: 'Analyzes every thread, plans three moves ahead, and wins the long game.',
    glowClass: 'glow-purple text-tertiary hover:border-tertiary-container',
    themeColor: '#8727df'
  },
  {
    id: 'climber',
    title: 'Social Climber',
    emoji: '💬',
    description: 'The connector, the life of the party, and always on the ascent.',
    glowClass: 'glow-pink text-secondary-fixed-dim hover:border-secondary-fixed',
    themeColor: '#ffb1c3'
  }
];

export default function ArchetypeSelector({ onSelected }: ArchetypeSelectorProps) {
  const [selected, setSelected] = useState<ArchetypeId>('chill');

  const handleConfirm = () => {
    onSelected(selected);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col justify-between py-10 px-margin-mobile max-w-lg mx-auto overflow-y-auto">
      
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-container/10 blur-[100px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Header and Title */}
      <div className="text-center mb-6">
        <h2 className="font-display text-4xl font-extrabold text-primary-container drop-shadow-[0_0_12px_rgba(0,245,255,0.45)] mb-3 leading-tight">
          What kind of player are you?
        </h2>
        <p className="font-sans text-sm text-[#94a3b8] px-4 leading-relaxed">
          Select your social archetype to calibrate your EQ leveling experience.
        </p>
      </div>

      {/* Grid or Slider card selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 px-1">
        {ARCHETYPES.map((arch) => {
          const isCurrent = selected === arch.id;
          return (
            <button
              id={`archetype-card-${arch.id}`}
              key={arch.id}
              onClick={() => setSelected(arch.id)}
              className={`glass-card p-5 rounded-xl border flex flex-col items-center text-center transition-all duration-300 transform select-none relative focus:outline-none ${arch.glowClass} ${
                isCurrent 
                  ? 'border-white bg-white/10 ring-2 scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
                  : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
              }`}
            >
              {/* Giant Emoji bubble */}
              <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                isCurrent ? 'bg-white/20 border-white scale-110' : 'bg-white/5 border-white/10'
              }`}>
                <span className="text-4xl">{arch.emoji}</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold mb-1 tracking-wide">
                {arch.title}
              </h3>

              {/* Tagline */}
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed px-2 flex-grow">
                {arch.description}
              </p>

              {/* Selected overlay pill */}
              <div className={`mt-3 transition-opacity duration-200 ${isCurrent ? 'opacity-100' : 'opacity-0'}`}>
                <span className="font-sans font-bold text-[9px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary-container/20 to-primary-fixed-dim/20 border border-primary-container/40 uppercase tracking-widest">
                  ARCHETYPE SELECTED
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pagination indicators */}
      <div className="flex gap-2 justify-center my-4 items-center">
        {ARCHETYPES.map((arch) => (
          <button
            key={arch.id}
            onClick={() => setSelected(arch.id)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              selected === arch.id ? 'w-8 bg-primary-container' : 'w-2 bg-surface-container-highest'
            }`}
          />
        ))}
      </div>

      {/* Call to action and Start trigger */}
      <div className="w-full mt-4">
        <button
          onClick={handleConfirm}
          className="w-full h-16 bg-primary-container text-on-primary-container font-headline-md font-extrabold rounded-xl shadow-[0_4px_20px_rgba(0,245,255,0.4)] active:scale-95 hover:brightness-110 transition-all duration-150 flex items-center justify-center gap-2 group uppercase tracking-wider"
        >
          <span>Start Leveling</span>
          <span className="material-symbols-outlined text-lg inline-block group-hover:translate-x-1 duration-150" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
        </button>
      </div>

    </div>
  );
}
