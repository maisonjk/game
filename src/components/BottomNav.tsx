import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  // Navigation tabs config mapping matching standard screen visuals
  const tabs = [
    { id: 'home' as ActiveTab, label: 'Home', icon: 'map', fillable: true },
    { id: 'play' as ActiveTab, label: 'Play', icon: 'sports_esports', fillable: true },
    { id: 'chaos' as ActiveTab, label: 'Chaos', icon: 'bolt', isSpecialCenter: true },
    { id: 'stats' as ActiveTab, label: 'Stats', icon: 'insights', fillable: true },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: 'person', fillable: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 border-t border-white/10 bg-surface/80 backdrop-blur-2xl rounded-t-lg shadow-[0_-8px_32px_rgba(0,0,0,0.65)] select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        // Custom center chaos button style
        if (tab.isSpecialCenter) {
          return (
            <button
              id={`nav-tab-${tab.id}`}
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center justify-center text-outline-variant hover:text-secondary-fixed transition-colors relative -top-3 focus:outline-none"
            >
              <div className={`w-14 h-14 bg-surface-container-highest rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isActive 
                  ? 'border-secondary-container glow-chaos scale-110 shadow-[0_0_20px_rgba(255,75,137,0.5)]' 
                  : 'border-white/10 hover:border-secondary-container/40'
              }`}>
                <span className={`material-symbols-outlined text-3xl transition-transform ${
                  isActive ? 'text-secondary-container animate-pulse scale-105' : 'text-outline hover:scale-105'
                }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {tab.icon}
                </span>
              </div>
              <span className={`font-sans font-bold text-[10px] uppercase tracking-wider mt-1 transition-all ${
                isActive ? 'text-secondary-container opacity-100' : 'text-outline opacity-60'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        }

        return (
          <button
            id={`nav-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center hover:text-primary-fixed-dim transition-all focus:outline-none py-1 px-3 rounded-xl ${
              isActive 
                ? 'text-primary-container drop-shadow-[0_0_12px_rgba(0,245,255,0.6)] bg-surface-container-highest/60 scale-110 animate-bounce' 
                : 'text-outline-variant opacity-75'
            }`}
          >
            <span 
              className="material-symbols-outlined text-2xl transition-all"
              style={{ fontVariationSettings: tab.fillable && isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="font-sans font-bold text-[10px] uppercase tracking-wider mt-0.5">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
