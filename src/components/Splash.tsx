import React, { useEffect, useState } from 'react';

interface SplashProps {
  onStart: () => void;
}

export default function Splash({ onStart }: SplashProps) {
  const [clicked, setClicked] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Periodic random glitch text trigger
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (clicked) return;
    setClicked(true);
    
    // Simulate haptic vibration
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(25);
    }

    // Trigger parent after delay to allow visual ripple scaleout
    setTimeout(() => {
      onStart();
    }, 550);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center overflow-hidden bg-surface-container-lowest py-8">
      {/* Scanline & ambient orbs */}
      <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-transparent via-[#00f5ff]/25 to-transparent animate-[scanline_4s_linear_infinite] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-container/10 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-transparent to-surface-container-lowest opacity-90 pointer-events-none"></div>

      <main className="relative z-20 flex flex-col items-center text-center px-6 max-w-md w-full my-auto transition-all duration-500">
        
        {/* Title Logo Group */}
        <div className="mb-12 cursor-default group">
          <div className="relative">
            {/* Holographic Logo mark */}
            <div className="flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-primary-container text-7xl drop-shadow-[0_0_15px_rgba(0,245,255,0.85)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                leaderboard
              </span>
            </div>
            
            {/* Main neon title */}
            <h1 className={`font-display text-4xl md:text-5xl font-extrabold tracking-tighter text-primary-container drop-shadow-[0_0_12px_rgba(0,245,255,0.7)] ${
              glitchActive ? 'animate-glitch' : ''
            }`}>
              SOCIAL LEVELS
            </h1>
            
            {/* Tagline */}
            <p className="font-sans font-extrabold text-[11px] mt-4 text-secondary-container tracking-[0.25em] opacity-90 uppercase truncate">
              Real Life is a Game.
            </p>
          </div>
        </div>

        {/* Tap to Start Power Action Button */}
        <div 
          onClick={handleStart}
          className="mt-16 group relative cursor-pointer"
        >
          {/* Pulsing Aura rings */}
          <div className="absolute -inset-10 bg-primary-container/5 rounded-full blur-2xl group-hover:bg-primary-container/12 transition-all duration-500 animate-pulse"></div>
          
          <button className="relative flex flex-col items-center gap-4 transition-all duration-300 group-active:scale-90">
            {/* Interlacing orbital borders */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 border border-primary-container/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
              <div className="absolute w-32 h-32 border border-secondary-container/10 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
            </div>

            {/* Glowing power icon */}
            <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-white/20 flex items-center justify-center shadow-lg group-hover:shadow-primary-container/40 group-hover:border-primary-container/40 transition-all duration-300">
              <span className="material-symbols-outlined text-primary-container text-3xl">
                power_settings_new
              </span>
            </div>

            <span className="font-sans font-bold text-xs text-on-surface-variant tracking-[0.2em] group-hover:text-primary-container transition-colors uppercase mt-1 select-none">
              Tap to Start
            </span>
          </button>
        </div>
      </main>

      {/* Ripple element on trigger click */}
      {clicked && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-container/25 z-40 pointer-events-none animate-[ping_0.6s_ease-out_forwards]" style={{ width: '150vw', height: '150px' }}></div>
      )}

      {/* Floating System Specs Footer */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-40 select-none pointer-events-none">
        <span className="font-sans font-semibold text-[10px] text-outline tracking-wider">SYS.VER_2.0.4</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f5ff]"></div>
          <span className="font-sans font-semibold text-[10px] text-outline tracking-wider">CONNECTED</span>
        </div>
      </div>
    </div>
  );
}
