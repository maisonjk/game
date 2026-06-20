import React from 'react';

interface LifeMapProps {
  aura: number;
  level: number;
  onSelectScenario: () => void;
  onShowLockedLevels: () => void;
}

export default function LifeMap({ aura, level, onSelectScenario, onShowLockedLevels }: LifeMapProps) {
  // Configured isometric floating nodes
  const nodes = [
    {
      id: 'school',
      title: 'School Drama',
      icon: 'school',
      cornerGradient: 'border-secondary',
      bubbleShadow: 'bg-secondary/30',
      delay: '-1s',
      position: 'top-[31%] left-[10%] md:left-[15%]',
      size: 'w-24 h-24 md:w-28 md:h-28',
      desc: '🏫 School Drama',
      locked: false,
      action: onSelectScenario
    },
    {
      id: 'group_chat',
      title: 'Group Chat Chaos',
      icon: 'forum',
      cornerGradient: 'border-primary-container',
      bubbleShadow: 'bg-primary-container/30',
      delay: '-2.5s',
      position: 'top-[44%] right-[8%] md:right-[15%]',
      size: 'w-28 h-28 md:w-32 md:h-32',
      badge: '9+',
      desc: '📱 Group Chat Chaos',
      locked: false,
      action: onSelectScenario
    },
    {
      id: 'crush',
      title: 'Crush Zone',
      icon: 'favorite',
      cornerGradient: 'border-tertiary-fixed-dim',
      bubbleShadow: 'bg-[#ffb1c3]/30',
      delay: '-4s',
      position: 'bottom-[42%] left-[10%] md:left-[15%]',
      size: 'w-24 h-24',
      desc: '💔 Crush Zone',
      locked: false,
      action: onSelectScenario
    },
    {
      id: 'internet',
      title: 'Internet Comments Arena',
      icon: 'public',
      cornerGradient: 'border-primary',
      bubbleShadow: 'bg-primary/30',
      delay: '-5.5s',
      position: 'bottom-[25%] right-[10%] md:right-[15%]',
      size: 'w-28 h-28 md:w-32 md:h-32',
      desc: '🌐 Internet Comments',
      locked: false,
      action: onSelectScenario
    },
    {
      id: 'real_world',
      title: 'Real World Mode',
      icon: 'lock',
      cornerGradient: 'border-outline',
      bubbleShadow: 'bg-outline/20',
      delay: '0s',
      position: 'top-[50%] left-[50%] -translate-x-1/2 -translate-y-[62%] md:-translate-y-[55%]',
      size: 'w-32 h-32 md:w-36 md:h-36',
      desc: '🧑‍💼 Real World Mode',
      locked: true,
      action: onShowLockedLevels
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-160px)] w-full overflow-hidden bg-[radial-gradient(circle_at_center,_#161b2a_0%,_#0f131e_100%)] select-none">
      
      {/* Embedded ambient lines grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#3a494a 1px, transparent 1px), linear-gradient(90deg, #3a494a 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          transform: 'rotateX(55deg) scale(1.6)',
          transformOrigin: 'top'
        }}
      ></div>

      {/* Central Aura Hub Stat Screen */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary-container/15 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="glass-panel w-28 h-28 rounded-full flex flex-col items-center justify-center border-2 border-primary-container/40 relative z-10 transition-transform duration-300 hover:scale-105">
            <span className="font-sans font-bold text-[10px] text-primary-fixed-dim uppercase tracking-widest">Aura</span>
            <span className="font-display text-4xl font-extrabold text-primary-container leading-none">
              {aura}
            </span>
          </div>
        </div>

        <div className="mt-3 px-5 py-1.5 glass-panel rounded-full flex items-center gap-2 border-primary-container/20">
          <span className="material-symbols-outlined text-primary-container text-sm animate-pulse-glow" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          <span className="font-sans font-extrabold text-[10px] text-on-surface uppercase tracking-wider">
            EQ LEVEL {level}
          </span>
        </div>
      </div>

      {/* Isometric Mapping System Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-full h-full max-w-lg mx-auto">
          
          {nodes.map((node) => (
            <button
              id={`life-node-${node.id}`}
              key={node.id}
              onClick={node.action}
              style={{ animationDelay: node.delay }}
              className={`absolute select-none focus:outline-none pointer-events-auto cursor-pointer animate-isometric-float hover:scale-110 active:scale-95 group transition-all duration-300 ${node.position}`}
            >
              <div 
                className={`${node.size} glass-panel rounded-xl flex flex-col items-center justify-center border-t-4 shadow-xl transition-all ${node.cornerGradient} ${
                  node.locked ? 'opacity-40 grayscale' : 'hover:brightness-110 hover:border-white shadow-[0_4px_16px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Icon display space */}
                <span className={`material-symbols-outlined text-3xl mb-1 transition-transform group-hover:scale-115 ${
                  node.locked ? 'text-outline' : 'text-primary-container font-extrabold'
                }`} style={{ fontVariationSettings: node.locked ? undefined : "'FILL' 1" }}>
                  {node.icon}
                </span>

                {/* Subtitle tag */}
                <p className={`font-sans font-black text-[9px] uppercase tracking-wider text-center px-1.5 ${
                  node.locked ? 'text-outline-variant' : 'text-white'
                }`}>
                  {node.desc}
                </p>

                {/* Small indicator inside node for locking requirements */}
                {node.locked && (
                  <p className="text-[7px] text-outline mt-1 font-sans font-bold uppercase tracking-widest scale-90">
                    Level 20
                  </p>
                )}

                {/* Optional hot notifications badge */}
                {node.badge && (
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-error shadow-[0_0_12px_rgba(255,180,171,0.6)] border border-surface rounded-full flex items-center justify-center text-[9px] font-extrabold text-on-error">
                    {node.badge}
                  </div>
                )}
              </div>

              {/* Pseudo isometric shadow effect underneath cards */}
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full blur-md ${node.bubbleShadow}`}></div>
            </button>
          ))}

        </div>
      </div>

      {/* Dynamic bottom story navigation link option */}
      <div className="absolute bottom-24 left-0 w-full flex justify-center px-margin-mobile z-40">
        <button
          onClick={onSelectScenario}
          className="w-full max-w-md h-16 bg-gradient-to-r from-primary-container via-primary-fixed to-primary-container bg-[length:200%_auto] animate-[shimmer_5s_linear_infinite] rounded-xl flex items-center justify-center gap-2.5 shadow-[0_8px_32px_rgba(0,245,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden"
        >
          <span className="font-display font-extrabold text-on-primary-container text-base uppercase tracking-wider z-10 selection:bg-transparent">
            Continue Story
          </span>
          <span className="material-symbols-outlined text-on-primary-container z-10 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

    </div>
  );
}
