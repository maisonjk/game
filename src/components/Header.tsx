import React from 'react';
import { ActiveTab } from '../types';

interface HeaderProps {
  level: number;
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  archetypeSelected: boolean;
}

export default function Header({ level, activeTab, onNavigate, archetypeSelected }: HeaderProps) {
  // Use user badge image source
  const badgeUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCIDVl5xQ2Gv7ECMr8JOgWnMiE8upXhYvzui5uJB7zA8tlO9ydzmpbJsqYEQfTCKRYvryRa6eJ6COl0YizdVQezSp_zhv1gU2kaSnYa1T50Bwamx3mFdbCJYm7vVWRbEZY_1T7dsE3ekkEmt9sb_J2Kmv7-2guso3RpuH7JaIb8PxE9PV69qDRlO3_RKS7-cV-WenXJ5keQelrselTDGp3WfrAYplA209Y804UHOGazcosLznb8vknuV3nKkJjEhodkeDt0gOw4v5A";

  return (
    <header className="h-20 w-full z-50 sticky top-0 bg-surface/60 border-b border-white/15 backdrop-blur-xl flex justify-between items-center px-margin-mobile shadow-[0_0_15px_rgba(0,220,229,0.25)] transition-all">
      <div 
        className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform" 
        onClick={() => onNavigate('home')}
      >
        <span className="material-symbols-outlined text-primary-container text-3xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
          leaderboard
        </span>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter text-primary-container drop-shadow-[0_0_8px_rgba(0,245,255,0.7)] uppercase select-none">
          Social Levels
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {activeTab === 'home' && archetypeSelected && (
          <div className="hidden sm:flex flex-col items-end mr-1">
            <span className="font-sans font-bold text-[10px] text-primary-fixed tracking-widest uppercase">VIBE MASTER</span>
            <div className="h-1.5 w-20 bg-surface-container-highest rounded-full overflow-hidden mt-1">
              <div className="h-full bg-gradient-to-r from-primary-container to-primary-fixed-dim w-3/4 animate-pulse"></div>
            </div>
          </div>
        )}

        <div 
          onClick={() => onNavigate('profile')}
          className={`relative group cursor-pointer w-11 h-11 rounded-full border-2 transition-all duration-200 overflow-hidden ${
            activeTab === 'profile' 
              ? 'border-primary-container scale-105 shadow-[0_0_12px_rgba(0,245,255,0.5)]' 
              : 'border-primary-container/45 hover:border-primary-container hover:scale-105'
          }`}
        >
          <img 
            alt="User Rank Badge" 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            src={badgeUrl} 
          />
          {archetypeSelected && (
            <div className="absolute -bottom-1 -right-1 bg-primary-container text-on-primary-fixed text-[8px] font-extrabold px-1.5 rounded-full border border-surface shadow-[0_0_4px_rgba(0,0,0,0.8)]">
              LVL {level}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
