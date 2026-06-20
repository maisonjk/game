import React, { useEffect, useState } from 'react';

interface StatsDashboardProps {
  aura: number;
}

export default function StatsDashboard({ aura }: StatsDashboardProps) {
  const [eqAnimDone, setEqAnimDone] = useState(false);

  useEffect(() => {
    // Initial scale transition trigger for the circular progress rings
    setTimeout(() => {
      setEqAnimDone(true);
    }, 150);
  }, []);

  // Base circular parameters for progress ring calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ~263.89
  
  // Custom offsets
  const eqOffset = circumference - (85 / 100) * circumference;
  const vibeOffset = circumference - (72 / 100) * circumference;

  return (
    <div className="relative min-h-[calc(100vh-160px)] w-full py-6 px-margin-mobile overflow-y-auto pb-32">
      <main className="max-w-md mx-auto space-y-6 flex flex-col">
        
        {/* Social Rank block: Main Character */}
        <div className="glass-card main-character-glow rounded-xl p-5 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_#ffb1c3_0%,_transparent_70%)]"></div>
          <span className="font-sans font-extrabold text-[10px] text-secondary-fixed mb-1 tracking-[0.2em] uppercase select-none">
            CURRENT STATUS
          </span>
          <h2 className="font-display text-3xl font-extrabold text-secondary-fixed glitch-text uppercase select-none tracking-tight">
            MAIN CHARACTER
          </h2>
          <div className="flex items-center mt-1.5 gap-1 text-secondary-fixed-dim select-none">
            <span className="material-symbols-outlined text-sm text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-sans font-bold text-[10px] tracking-widest uppercase">
              TOP 1% GLOBALLY
            </span>
          </div>
        </div>

        {/* Dual Progress Rings block */}
        <div className="grid grid-cols-2 gap-card-gap">
          
          {/* EQ Ring */}
          <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center border-l-4 border-l-primary-container shadow-[0_0_20px_rgba(0,245,255,0.15)] relative">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r={radius} stroke="currentColor" strokeWidth="8"></circle>
                <circle 
                  className="text-primary-container transition-all duration-1000 ease-out" 
                  cx="48" 
                  cy="48" 
                  fill="transparent" 
                  r={radius} 
                  stroke="currentColor" 
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={eqAnimDone ? eqOffset : circumference}
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-black text-2xl text-primary-container select-none">85</span>
                <span className="font-sans font-extrabold text-[8px] text-[#849495] tracking-wider uppercase select-none">Index</span>
              </div>
            </div>
            <span className="font-sans font-extrabold text-[10px] text-[#849495] tracking-widest mt-3 uppercase text-center select-none">
              EQ INDEX
            </span>
          </div>

          {/* VIBE / Aura Ring */}
          <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center border-l-4 border-l-secondary shadow-[0_0_20px_rgba(255,75,137,0.1)] relative">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r={radius} stroke="currentColor" strokeWidth="8"></circle>
                <circle 
                  className="text-secondary transition-all duration-1000 ease-out" 
                  cx="48" 
                  cy="48" 
                  fill="transparent" 
                  r={radius} 
                  stroke="currentColor" 
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={eqAnimDone ? vibeOffset : circumference}
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-black text-2xl text-secondary select-none">{aura}</span>
                <span className="font-sans font-extrabold text-[8px] text-[#849495] tracking-wider uppercase select-none">Points</span>
              </div>
            </div>
            <span className="font-sans font-bold text-[10px] text-[#849495] tracking-widest mt-3 uppercase text-center select-none">
              VIBE CHECK
            </span>
          </div>

        </div>

        {/* High Contrast Stats Section */}
        <div className="space-y-4">
          
          {/* Stat 1: Calm */}
          <div className="glass-card rounded-xl p-5 flex items-center justify-between overflow-hidden">
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[10px] text-outline tracking-wider mb-0.5 select-none">CALM DECISIONS</span>
              <span className="font-display font-black text-2xl text-primary-container select-none">78%</span>
            </div>
            {/* Sparkline layout block */}
            <div className="flex items-end gap-1.5 h-10 select-none">
              <div className="w-2.5 bg-primary-container/20 h-4 rounded-full"></div>
              <div className="w-2.5 bg-primary-container/40 h-8 rounded-full"></div>
              <div className="w-2.5 bg-primary-container/60 h-6 rounded-full"></div>
              <div className="w-2.5 bg-primary-container/80 h-9 rounded-full"></div>
              <div className="w-2.5 bg-primary-container h-10 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Stat 2: Reactive */}
          <div className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[10px] text-outline tracking-wider mb-0.5 select-none">REACTIVE SPIKES</span>
              <span className="font-display font-black text-2xl text-secondary select-none">12%</span>
            </div>
            {/* Reactive sparkline spike bars */}
            <div className="flex items-end gap-1.5 h-10 select-none">
              <div className="w-2.5 bg-secondary h-10 rounded-full"></div>
              <div className="w-2.5 bg-secondary/60 h-5 rounded-full"></div>
              <div className="w-2.5 bg-secondary/40 h-7 rounded-full"></div>
              <div className="w-2.5 bg-secondary/20 h-3 rounded-full"></div>
              <div className="w-2.5 bg-secondary/10 h-1.5 rounded-full"></div>
            </div>
          </div>

          {/* Friendship stability trend */}
          <div className="glass-card rounded-xl p-5">
            <span className="font-sans font-extrabold text-[10px] text-outline tracking-widest mb-3 block select-none uppercase">
              FRIENDSHIP STABILITY TREND
            </span>
            <div className="w-full h-16 bg-surface-container-low rounded-lg relative overflow-hidden border border-white/5">
              {/* Stability graphical wave */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path d="M0 35 Q 20 10, 40 25 T 80 5 T 100 15" fill="none" stroke="#00f5ff" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse"></path>
              </svg>
            </div>
          </div>

        </div>

        {/* Streaks achieved */}
        <div className="flex flex-col gap-3">
          <h3 className="font-sans font-bold text-[10px] text-[#94a3b8] tracking-[0.15em] pl-1 uppercase select-none">
            ACHIEVED STREAKS
          </h3>
          <div className="flex flex-wrap gap-2.5">
            
            <div className="glass-card px-4 py-2.5 rounded-full flex items-center gap-2 border-primary-container/30 hover:scale-105 transition-transform duration-200">
              <div className="w-7 h-7 rounded-full bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-base font-extrabold select-none">
                  self_improvement
                </span>
              </div>
              <span className="font-sans font-extrabold text-[9px] text-primary-container uppercase tracking-wider select-none">
                STAYED CALM 10X
              </span>
            </div>

            <div className="glass-card px-4 py-2.5 rounded-full flex items-center gap-2 border-secondary/30 hover:scale-105 transition-transform duration-200">
              <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-base font-extrabold select-none">
                  verified_user
                </span>
              </div>
              <span className="font-sans font-extrabold text-[9px] text-[#ffb1c3] uppercase tracking-wider select-none">
                ESCALATION AVOIDED
              </span>
            </div>

            <div className="glass-card px-4 py-2.5 rounded-full flex items-center gap-2 opacity-40 border-outline/25 select-none">
              <div className="w-7 h-7 rounded-full bg-outline/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-outline text-base select-none">
                  lock
                </span>
              </div>
              <span className="font-sans font-extrabold text-[9px] text-outline uppercase tracking-wider">
                ZEN MASTER
              </span>
            </div>

          </div>
        </div>

        {/* Narrative Card bubble suggestions */}
        <div className="glass-card rounded-xl p-5 relative group cursor-default overflow-hidden mt-1 border-t-2 border-t-primary-container">
          <div className="absolute top-4 right-4 text-primary-container opacity-50 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-lg select-none">auto_awesome</span>
          </div>
          <p className="font-sans text-sm text-[#dfe2f2] leading-relaxed">
            "Your social footprint is radiating <span className="text-primary-container font-extrabold italic">Calm Presence</span>. Last night's group chat drama was handled with 98% efficiency. Keep this pace to unlock <span className="text-secondary-fixed font-bold">Influencer Tier</span>."
          </p>
        </div>

      </main>
    </div>
  );
}
