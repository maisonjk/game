import React, { useState } from 'react';

interface Slide {
  id: number;
  bgUrl: string;
  avatarUrl: string;
  username: string;
  caption: string;
  likes: string;
  likesCount: number;
  comments: string;
  actionText: string;
  hasBreakdown: boolean;
  hasChaosTracker: boolean;
  chaosPercent?: number;
}

interface ChaosFeedProps {
  onPlayScenario: () => void;
}

export default function ChaosFeed({ onPlayScenario }: ChaosFeedProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [likedSlides, setLikedSlides] = useState<{ [key: number]: boolean }>({});
  const [likesIncrement, setLikedIncrement] = useState<{ [key: number]: number }>({});
  const [activeOption, setActiveOption] = useState<'silence' | 'yell' | 'run'>('silence');

  const slides: Slide[] = [
    {
      id: 0,
      bgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOz7kyD6SWbkLT6C0FrBs7Og5OuKU-vXirjkBQ18mb_N_38vHUNh5JBg4Y7BaTl5Xf7RwloD1Uo7RfKTRLi4hu_zXgm16L6vMxmPsujEbsMpv3DVyJ-u48Waf2KHpvwwBiv_kemTY0mzfQWwZXE1aViMJ4pXUAwvSU6YqSP9VgK_PJSO6tPCTShcvxGX20X3DzGwcS3GyCp7u8n8cfAej8fWXyPEEm1YApouJAc3nO5dR65-Py6bZrFTJoztcfORg1BYGmGaAuwnc",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHL-039CpjU5wYsMSkTnEIrtUq2spmPb-pr1j2W8TVPNssHcO-AWw3fPyKTnPkhKCKDk8NjcubFOP2MosicxDFTx5jIWx0a5pn9mJQ3Mxbb6sZti81C-NpqNHo7BHvqPz4-du0ChtfxDKpfB4VEwXIuYI9ciPfzp_DQie7NUCWZr4ouSB5ZkrjaTQZ9sEq3rVzni3EQCzEJbwMOiU3GExl20H3gQ8tOhV3484dNwzK-wwBOcR2eZXs3Pe4KIajQ5aaOJP8S0fwJN4",
      username: "@LunaVoid",
      caption: "I chose silence... and it changed everything 😳",
      likes: "12.4K",
      likesCount: 12400,
      comments: "842",
      actionText: "TRY THIS SCENARIO",
      hasBreakdown: true,
      hasChaosTracker: false
    },
    {
      id: 1,
      bgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-BNuRJSzx9KXC9aHEee_y3-t4p5LR_HN1vZvJzc5KKmU0rMgWfjahO9II6Z8AzTrhAwKLDXswQvnpcy5c6ie4odig-9UHqI0NItlqbCOALBSzhxwqFIJDG7zF-2NrG1HC9i1SmYcbP1LplB_DrwHy3Eo9Ooqgj5EZHlRUwKnivwVx5o_eFhMVfc_QOdg3vhtDM9PmmVwgN8SCA8_wFdrl5SVn359ffvGoma6VWC7n_g1h3rIIssmdyqDFnm93LVSJoWMgQ-8Qffo",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWZlh7e74dC7AgKUOFk49W7kuLatgkDgl0wTzzV0s9UWoMOPgWYT0OvdGXpvh_ZMIL38JMlKYP7uoC5ZKy4I3v3cA7-jZ-lqZR515WlxZAc5ntY9Ky6GZVu6iaau3u0Q5vJLN5zjqGUWFk3hHHKb1n5EaRaBYo0M85Jzy8qJllKNa--yFFaSPFEX7hK0oQX4BjuSoIdBgCMj51BsNVZbANoF_o6PUXgLMn_f1AEypGh5AgiouicmdBsDIv-9SOBSaNNeIOQEE_4o",
      username: "@ViperGlint",
      caption: "Main character moment unlocked 💀🔥",
      likes: "45.2K",
      likesCount: 45200,
      comments: "1.2K",
      actionText: "ENTER CHAOS MODE",
      hasBreakdown: false,
      hasChaosTracker: true,
      chaosPercent: 75
    }
  ];

  const handleLike = (id: number) => {
    const isLiked = !!likedSlides[id];
    setLikedSlides({ ...likedSlides, [id]: !isLiked });
    setLikedIncrement({ ...likesIncrement, [id]: isLiked ? 0 : 1 });

    // Haptic feedback trigger
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleSlideChange = (direction: 'up' | 'down') => {
    if (direction === 'down' && activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else if (direction === 'up' && activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div className="relative h-[calc(100vh-160px)] w-full overflow-hidden bg-background text-on-surface select-none">
      
      {/* Scroll Controls (simulate drag/swipe on overlay) */}
      <div className="absolute left-4 top-24 z-30 flex flex-col gap-2">
        <button 
          onClick={() => handleSlideChange('up')} 
          disabled={activeSlide === 0}
          className="w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center active:scale-90 disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-white text-lg">arrow_upward</span>
        </button>
        <button 
          onClick={() => handleSlideChange('down')} 
          disabled={activeSlide === slides.length - 1}
          className="w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center active:scale-90 disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-white text-lg">arrow_downward</span>
        </button>
      </div>

      {slides.map((slide, idx) => {
        const isCurrent = idx === activeSlide;
        const isLiked = !!likedSlides[slide.id];
        const valLikesInt = slide.likesCount + (likesIncrement[slide.id] || 0);

        return (
          <div 
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${
              isCurrent ? 'translate-y-0 opacity-100' : idx < activeSlide ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
            }`}
          >
            {/* Background cinematic rendering */}
            <div className="absolute inset-0 z-0">
              <img src={slide.bgUrl} className="w-full h-full object-cover brightness-[0.4]" alt="Scenery Still" />
            </div>

            {/* Slide 1 Choice Breakdown Graph Overlay */}
            {slide.hasBreakdown && (
              <div className="absolute top-6 left-margin-mobile right-margin-mobile z-10 max-w-sm mx-auto">
                <div className="glass-card rounded-xl p-4 space-y-3 border-primary-container/20">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-extrabold text-[10px] text-primary-container uppercase tracking-wider">Choice Breakdown</span>
                    <div className="bg-primary-container text-on-primary-fixed px-1.5 py-0.5 rounded font-sans font-extrabold text-[8px] tracking-wider select-none">RARE MOMENT</div>
                  </div>
                  
                  {/* Graph blocks matching the values of Yell, Silence (68% highlighted cyan), Run */}
                  <div className="flex items-end gap-2.5 h-16">
                    <button
                      id="chaos-yell-bt"
                      onClick={() => setActiveOption('yell')}
                      className="flex-1 bg-surface-container-highest rounded-t-lg relative overflow-hidden transition-all duration-300 focus:outline-none"
                      style={{ height: activeOption === 'yell' ? '60%' : '40%' }}
                    >
                      <div className={`absolute bottom-0 w-full h-full ${activeOption === 'yell' ? 'bg-secondary-container' : 'bg-outline-variant/65'}`}></div>
                    </button>
                    
                    <button
                      id="chaos-silence-bt"
                      onClick={() => setActiveOption('silence')}
                      className="flex-1 bg-surface-container-highest rounded-t-lg relative overflow-hidden transition-all duration-300 focus:outline-none shadow-[0_0_12px_rgba(0,245,255,0.4)]"
                      style={{ height: activeOption === 'silence' ? '105%' : '75%' }}
                    >
                      <div className={`absolute bottom-0 w-full h-full ${activeOption === 'silence' ? 'bg-primary-container' : 'bg-outline-variant/65'}`}></div>
                    </button>
                    
                    <button
                      id="chaos-run-bt"
                      onClick={() => setActiveOption('run')}
                      className="flex-1 bg-surface-container-highest rounded-t-lg relative overflow-hidden transition-all duration-300 focus:outline-none"
                      style={{ height: activeOption === 'run' ? '45%' : '25%' }}
                    >
                      <div className={`absolute bottom-0 w-full h-full ${activeOption === 'run' ? 'bg-[#efdbff]' : 'bg-outline-variant/30'}`}></div>
                    </button>
                  </div>
                  
                  <div className="flex justify-between font-sans font-extrabold text-[9px] text-[#849495] select-none uppercase tracking-wider">
                    <span className={activeOption === 'yell' ? 'text-secondary font-black' : ''}>YELL</span>
                    <span className={activeOption === 'silence' ? 'text-primary-container font-black' : ''}>SILENCE (68%)</span>
                    <span className={activeOption === 'run' ? 'text-tertiary-fixed font-black' : ''}>RUN</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2 Chaos level Progress bar layout overlay */}
            {slide.hasChaosTracker && (
              <div className="absolute top-6 left-margin-mobile right-margin-mobile z-10 max-w-sm mx-auto">
                <div className="glass-card rounded-xl p-4 space-y-3 border-secondary-container/20">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-extrabold text-[10px] text-secondary uppercase tracking-widest">Chaos Level: HIGH</span>
                    <div className="bg-secondary text-on-secondary px-2 py-0.5 rounded font-sans font-extrabold text-[8px] uppercase tracking-wider select-none">NEW TREND</div>
                  </div>
                  <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive sidebar widget column on right */}
            <div className="absolute right-4 bottom-24 z-20 flex flex-col gap-5 items-center">
              
              {/* Like action widget */}
              <button 
                id={`chaos-like-btn-${slide.id}`}
                onClick={() => handleLike(slide.id)} 
                className="flex flex-col items-center gap-1 group focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center transition-all duration-300 ${
                  isLiked ? 'bg-secondary-container/20 border-secondary scale-110 shadow-[0_0_15px_rgba(255,75,137,0.4)]' : 'bg-surface/50 hover:bg-white/10'
                }`}>
                  <span className={`material-symbols-outlined text-2xl transition-all duration-200 ${
                    isLiked ? 'text-secondary-container scale-110' : 'text-[#dfe2f2]'
                  }`} style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>
                    favorite
                  </span>
                </div>
                <span className="font-sans font-extrabold text-[9px] text-[#dfe2f2]">
                  {isLiked ? 'Liked' : slide.likes}
                </span>
              </button>

              {/* Comment metrics trigger */}
              <button id="chaos-comment-btn" className="flex flex-col items-center gap-1 group focus:outline-none active:scale-95">
                <div className="w-12 h-12 rounded-full glass-panel bg-surface/50 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[#dfe2f2] text-2xl">
                    chat_bubble
                  </span>
                </div>
                <span className="font-sans font-semibold text-[9px] text-[#dfe2f2]">{slide.comments}</span>
              </button>

              {/* Share actions */}
              <button id="chaos-share-btn" className="flex flex-col items-center gap-1 group focus:outline-none active:scale-95">
                <div className="w-12 h-12 rounded-full glass-panel bg-surface/50 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[#dfe2f2] text-2xl">
                    share
                  </span>
                </div>
                <span className="font-sans font-semibold text-[9px] text-[#dfe2f2]">Share</span>
              </button>

              {/* Spinning Remix icon */}
              <button 
                id="chaos-remix-btn"
                onClick={onPlayScenario}
                className="flex flex-col items-center gap-1 group focus:outline-none active:scale-95"
              >
                <div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden animate-[spin_6s_linear_infinite] shadow-[0_0_10px_rgba(255,75,137,0.4)]">
                  <img className="w-full h-full object-cover" src={slide.avatarUrl} alt="Avatar profile graphic" />
                </div>
                <span className="font-sans font-semibold text-[9px] text-secondary">Remix</span>
              </button>

            </div>

            {/* Description card captions and trigger CTA */}
            <div className="absolute bottom-6 left-margin-mobile right-20 z-10 space-y-4">
              <div 
                onClick={onPlayScenario}
                className="flex items-center gap-3 cursor-pointer group w-fit"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden shadow-lg">
                  <img src={slide.avatarUrl} className="w-full h-full rounded-full" alt="User avatar" />
                </div>
                <span className="font-display font-extrabold text-white text-base group-hover:underline drop-shadow-md select-text">
                  {slide.username}
                </span>
              </div>
              
              <p className="font-sans font-medium text-sm text-[#dfe2f2] leading-tight drop-shadow-md select-text">
                {slide.caption}
              </p>
              
              <button
                onClick={onPlayScenario}
                className={`w-full py-4 font-display font-bold text-center rounded-xl flex items-center justify-center gap-2 active:scale-95 duration-150 transition-all ${
                  slide.hasChaosTracker 
                    ? 'bg-secondary text-on-secondary shadow-[0_0_20px_rgba(255,75,137,0.5)] hover:brightness-110'
                    : 'bg-primary-container text-on-primary-fixed block shadow-[0_0_20px_rgba(0,245,255,0.5)] hover:brightness-110'
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {slide.hasChaosTracker ? 'bolt' : 'play_arrow'}
                </span>
                <span className="uppercase text-sm tracking-widest font-extrabold">{slide.actionText}</span>
              </button>
            </div>

          </div>
        );
      })}

    </div>
  );
}
