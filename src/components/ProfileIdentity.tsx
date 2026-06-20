import React, { useState } from 'react';
import { Customizations, ActiveTab, ArchetypeId } from '../types';

interface ProfileIdentityProps {
  aura: number;
  level: number;
  pulseRate: number;
  streakDays: number;
  selectedArchetype: ArchetypeId | null;
  customizations: Customizations;
  onUpdateCustomizations: (updates: Partial<Customizations>) => void;
}

export default function ProfileIdentity({
  aura,
  level,
  pulseRate,
  streakDays,
  selectedArchetype,
  customizations,
  onUpdateCustomizations,
}: ProfileIdentityProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [particleActive, setParticleActive] = useState(false);

  // Asset links directly from design specs
  const profileAvatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBYtJd4VFqEy27_zNRWuhRIi1NZdSRTsMaP0owh_9UKvJQXGPIoVor9SRPfUka5cxBuO8m6sEgpj4S1vBBie9DVPzb3MA7QfOGiOTUO2Ue1-tDZDxGbqHuar7qPKWOu1g57UoDMjJvoBFafEtEvtFOIwMwH--Lj3KvRdmcBL71d9MM_QHNEFM1zIbbtJrEfq4_uX5V43PV_iah1YnNu7V-OM4vFkRidXoCpkKVNXCAtt9NGRVjO7CCEJdUFSd17rLNk2ZUSUWKrtQA";
  
  const character3dUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDCyzOzcW1WASZIrnSlnyg56XyLA3ezAX7t7E7jPsz7hKKA-NaIhEBRZ5CCmxFuwb0z_5ectJaHBKH7Wd_g6gFqhaZ_iqos49pqOGtVeUbRnDxWaDi5VpWWAkaKmS4TNI8vPpl3xuxBbxXs1wWbaOJ0uXt-kVk7N_y4N_H0gNGPKahLt3FgYu17ZliWQMvNLdzIcEpj30wv_kaxbijXLVH8r0QnpylLN_HFfQzkZsVABpigKUeAHnv-y3GsmQbHIdwshbBu9HaUj8U";

  // Skin textures from screen 2
  const cyberPulseUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuD-aHkuamVDA_y4323K0_2R-nKtWuFGwJoGb-RvwWTMV-D5P1wvXUSx6ezgYamUEPJ9Fpezjp625IONvZhwbEPziLuqHc_EVs2ukqJKt9U1BLWEWPip-LO1hTyu35xoXfNxMcnlhXwrgnyXB-rrrEh46n1FAWdQJCJ5joGTIcPnt3YqyxT_oxBkJtgWApDPM9mhWXJDsW1bwgopFniHKMpWEdAWaQ_J0FUY8mk3tEBENmj7aJvolaW6uJurUAMLP735Or6N5mHmARo";
  const voidStalkerUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAPfQ1hP82KvHLZMFa1b38Ba4X8A9ML1LUGGRFKm_ijLC53snpjx9C76ACNJq58e9Ff05__0wq95YIB69pTvKqD2XHyVB1jOlW1URftqeAQv58MMySOz6WVD-Sz5gCzMRVO9w9wALjfCPPFQtDFl7CscKsteNyDsQg9W5_yB5kljaQpmHxfc00YU6rB34wL__-KX2Fjzl3mTvXJdg0hOiXJNKiELLPEJrhxtFEKmtV3O0-Xl-cXNNTATIOObCW7w5wsaUiMp2g5ga4";
  const pinkFuryUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAKV41CvO71aX585VtpM6NYY3dKko6FGe0hL45Jg39MRAJ8hBZMkD6o2iF4wTuVhBGcdGrjQnStbB9LlNLyUtRJNiMc6dh6Ughg9z3c32pQGd4TxQi6F2Pegq9g-Na2wkHZnrcdCuBhzUN4xbg8Tmml8VrqVJVS5OAe6l6gLSWmKgh8RCnM0yk64Ldy7xuQDkdRse0Jq_ckSJpw5rHrka4Q4cxvecgJx8NtSMHZWIkJIj2AJuK7wr95COIcGy31FadlzILUtr4jDoI";

  // Outfit drip thumbnails
  const neonRoninDripUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBribN8J2sFM4dkPVF5nNMjnMxhg-JBHWv4OZ1a5AvK7XjDtuiavNW2s07taoDcebQ-BB0kxgEezVMR8YvXvy3ArTjHNNydjLg6iVLID2yiTlTsPX_XtBRCZ-xhWX5gcsA5R_4z9LgOoxGgQ492LahohkUR22NR86Y8ieDfSyz1uChXq1h_sKXlidR4rf5iHYk-xeJG2hqg9vbWNHc0RDtZKIcoiYPN3gUa7ZV0fdwzOA3i-cVL9KagX9An6EtpmR-qg_2rS56kiaY";
  const gripTapeDripUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-RAW04s8uzj03Z18LrAQGm-8fRuCvsC6hFQI7GTEzBxh9WT8N8iD7T0EuUPS5jBClLNRJ-iPxBhoV5uvuJMzBnLQvoa2ddifT7Iz9c3hj5EAm9zaqcxgPxjbMLeq5qC2DnVWBzc1-rjOysZTHSlcx5sCw4ITr0DRgrR-y-wkSH4CgeqFMUQ1d90evi4giW9TuXwdYSPqjOvWtAmKdO8zt8tsrFUxEfyME59KKbj--LvmoQXCsenmAPpp_GDmUkpCXk86aj0qc0Q";
  const voidWalkerDripUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZXGFR-Ze2xZjuBFk5gzRmYxgxKUdOiYYjKk14sUSJnu9hDRI4FdVQ-EcG0Hm7h80pRD7Zn4TZnH8joFmAXDrJw7ANawQRpc_4KUaC3h7aW6UvwiX1ah636pPVyJnmIT-KqeGR1Mf9m_tGggZQMRAsAGs6T5hNXItPu_c2rIMwTr7Oldw5EK5blwqmZIk8LZV3pW8Ovs7dJsTJDMcgmTK0TkFyCNDOZQ9U0B9YELhEfWxl4pVOdS5dQSgNArI1b-cz1usipEZJqk";

  // Hair thumbnails from design
  const hairAssets = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAokbkEQhCu-JcXfDt9doZKtMPgrk03uEDNgJbX-0doCijjQ-PeSQbotVYCbk_D5lkSC3wL1P2TJzHKRKdzAqc2Si-2vTMOeSgEXn3F2KT6YBhWgUCTFvHyw8GO2PFRYfazFDS7JRhMp5SYexE8RIwPi7DXlVYXlEB2CN224AvoO9viNSZmnIHanaUq-PzsYZ1t6daHM3GFiQxsq4lGzHFpasvPvVBCb1bbQ-BpNmQGuKaKst8PvFT9l2jWHppmU6PJZaD4eu7rSDo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC6liXvc6_8vqa27-XAxTxUnj6Yshv_SGVxT-YAbBeWM1QGm7vX_Z2xxmTWSYwQExiSuEYncN2OoOsWxUlpqqCaBfDtqJ5RaeVyicc3cHRpI3wip7wPQkH3afzRQgg34lmj2UWUO7Y_zuMWvev0aTGaHy6-CORgYCM0JgVChHRp5XQ3ccVQ0iwNQFdkq9g4nsSsYCaDCwyuiTqIdHg-BV8sKhwCVTmpjzM-YUGBGxnXuFMWBBW3XQ5QwFjzX3RfFomnjYglBmUztn8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDvLSodZM6srFV5-JvWv9F7-vLbfMOV9COqBhvdhu3uPkfk71iVELnPl-KEaWlNe_e_YbLe4jWqUaqBaX-fMbVkovtp5giKN7WGGjcSNkvItndKs5OGNUIP4DMiJ2eiATsnTd5aIkGSlqNsMjRu3Hr5ezf55fv83Vrt7Uk8TwdRC7BGhA8VaGq1mJjOnPafBAc_kDAQAjY-0HM5HRpML34at_Tg2RD1Ky_HAYK7wSGQnYZ6xlK2cfDaPx48GwkiU86rcxLaT8coGNk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0wSkEa5fodPM3CPzuonLFXLGd-5GMS1ob9tcX_AnYktuCznd_2my_yjfGQqad3IYgFWFZy0u3BeMwtVmSgUoEYrKs_bob14zitAZg6E8FmQNYbYPHodeIWQ9atDTWYnI0MQnF35EcN_0W7c-rQpvtPyNk2jRhJ7uqYvLwkLo2uQ1f5CbELcGSBIp8nFrU5z5x3GjXnQdxZmWiQvn3iYYuFeJfcFlQpAowFE4B7ZDAyveQXZl1z-xcCHSxuHdApFfqcPSK4n53zjc"
  ];

  const handleConfirmIdentity = () => {
    setParticleActive(true);
    setTimeout(() => {
      setParticleActive(false);
      setIsEditing(false);
    }, 1200);
  };

  // Render builder screen (Screen 4)
  if (isEditing) {
    return (
      <div className="relative min-h-[calc(100vh-160px)] w-full py-6 overflow-y-auto pb-32">
        <main className="max-w-md mx-auto px-margin-mobile flex flex-col items-center">
          
          {/* Character showcase stage */}
          <section className="relative w-full aspect-[4/5] flex flex-col items-center justify-center mb-8 overflow-visible">
            {/* Active Aura outer layer */}
            <div className={`absolute inset-0 rounded-full blur-[65px] opacity-40 transition-all duration-700 pointer-events-none scale-110 z-0 ${customizations.moodAura}`}></div>
            
            {/* Volumetric outline light rays */}
            <div className="absolute inset-8 rounded-full border border-primary-container/25 animate-[spin_10s_linear_infinite]"></div>
            
            {/* Roblox 3D figure preview rendering */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <img 
                id="avatar-preview-3d"
                alt="Identity customizer" 
                className="w-4/5 h-4/5 object-contain drop-shadow-[0_20px_50px_rgba(0,245,255,0.4)] transition-opacity duration-300"
                src={character3dUrl} 
              />
              <div className="w-36 h-3.5 bg-black/40 rounded-full blur-md -mt-4"></div>
            </div>

            {/* Float confirmation label pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface-container-high/90 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-2 select-none">
              <span className="font-sans font-bold text-[10px] tracking-wider text-primary-fixed uppercase">
                IDENTITY: UNCONFIRMED
              </span>
            </div>
          </section>

          {/* Builder selection controls */}
          <div className="w-full space-y-6">
            
            {/* Aura select panel */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1 select-none">
                <h3 className="font-display font-bold text-lg text-primary">Mood Aura</h3>
                <span className="font-sans font-bold text-[9px] text-outline tracking-wider uppercase">SELECT EFFECT</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {[
                  { class: 'bg-[#ff4b89]', emoji: '🔥' },
                  { class: 'bg-[#00f5ff]', emoji: '💙' },
                  { class: 'bg-[#8727df]', emoji: '⚡' },
                  { class: 'bg-yellow-400', emoji: '🌈' },
                  { class: 'bg-[#849495]', emoji: '💀' }
                ].map((aur, i) => (
                  <button
                    id={`custom-aura-btn-${i}`}
                    key={i}
                    onClick={() => onUpdateCustomizations({ moodAura: aur.class, moodAuraEmoji: aur.emoji })}
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-surface-container-low border hover:border-primary-container transition-all flex items-center justify-center text-2xl active:scale-90 focus:outline-none ${
                      customizations.moodAuraEmoji === aur.emoji ? 'border-primary-container bg-white/5 ring-1 ring-primary-container shadow-[0_0_12px_rgba(0,245,255,0.3)]' : 'border-white/5'
                    }`}
                  >
                    {aur.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Drip packs outfits */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1 select-none">
                <h3 className="font-display font-bold text-lg text-primary">Drip Packs</h3>
                <span className="font-sans font-bold text-[9px] text-outline tracking-wider uppercase">SEASON 1</span>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
                
                {/* Packs items */}
                {[
                  { id: 'ronin', title: 'Neon Ronin', label: 'LEGENDARY', color: 'text-primary-fixed-dim border-primary-container/30', img: neonRoninDripUrl },
                  { id: 'griptape', title: 'Grip Tape', label: 'COMMON', color: 'text-outline border-white/5', img: gripTapeDripUrl },
                  { id: 'voidwalker', title: 'Void Walker', label: 'EPIC', color: 'text-secondary-container border-secondary-container/30', img: voidWalkerDripUrl }
                ].map((pack) => (
                  <button
                    id={`custom-pack-card-${pack.id}`}
                    key={pack.id}
                    onClick={() => onUpdateCustomizations({ dripPack: pack.id as any })}
                    className={`flex-shrink-0 w-36 text-left rounded-xl bg-surface-container-high/40 p-3 border hover:border-primary-container transition-all group flex flex-col justify-between ${
                      customizations.dripPack === pack.id ? 'border-primary-container bg-white/5 shadow-[0_0_15px_rgba(0,245,255,0.25)]' : 'border-white/5'
                    }`}
                  >
                    <div className="w-full h-20 bg-surface-container-highest rounded-lg overflow-hidden mb-2">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={pack.img} alt={pack.title} />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-xs text-on-surface truncate">{pack.title}</p>
                      <p className={`font-sans font-black text-[9px] tracking-wider mt-0.5 ${pack.color}`}>{pack.label}</p>
                    </div>
                  </button>
                ))}

              </div>
            </div>

            {/* Hair categories */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1 select-none">
                <h3 className="font-display font-bold text-lg text-primary">Hair Styles</h3>
                <span className="font-sans font-bold text-[9px] text-outline tracking-wider uppercase">HAIR DYE UNLOCKED</span>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
                {hairAssets.map((hair, idx) => (
                  <button
                    id={`custom-hair-btn-${idx}`}
                    key={idx}
                    onClick={() => onUpdateCustomizations({ hairIndex: idx })}
                    className={`flex-shrink-0 w-16 h-16 rounded-full bg-surface-container-high border-2 overflow-hidden hover:border-primary-container transition-all active:scale-95 focus:outline-none ${
                      customizations.hairIndex === idx ? 'border-primary-container scale-105 shadow-[0_0_12px_rgba(0,245,255,0.4)]' : 'border-white/10'
                    }`}
                  >
                    <img className="w-full h-full scale-150 object-cover" src={hair} alt={`Hair style ${idx}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Save trigger button */}
            <div className="pt-6 pb-4 flex justify-center">
              <button
                onClick={handleConfirmIdentity}
                className="w-full max-w-sm h-16 bg-primary-container text-on-primary-container font-display text-sm font-extrabold rounded-xl shadow-[0_4px_25px_rgba(0,245,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 group uppercase tracking-widest relative"
              >
                <span>{particleActive ? 'IDENTITY CONFIRMED!' : 'Confirm Identity'}</span>
                {!particleActive && (
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 duration-150">
                    arrow_forward
                  </span>
                )}
              </button>
            </div>

          </div>

        </main>

        {/* Confirmed identity particles display overlay */}
        {particleActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
            <div className="text-center font-display font-extrabold text-2xl text-primary-container drop-shadow-[0_0_10px_#00f5ff]">
              CONFIRMING IDENTITY SYSTEM...
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Profile View (Screen 2)
  return (
    <div className="relative min-h-[calc(100vh-160px)] w-full py-6 px-margin-mobile overflow-y-auto pb-32">
      <main className="max-w-md mx-auto space-y-8 flex flex-col">
        
        {/* Profile identity avatar rendering */}
        <section className="flex flex-col items-center">
          <div className="relative w-56 h-56 mb-4">
            
            {/* Floating aura glows */}
            <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-3xl animate-aura-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-primary-container/20 animate-[spin_12s_linear_infinite]"></div>
            
            {/* Main Avatar profile container */}
            <div className="relative w-full h-full rounded-full border-4 border-primary-container p-1 glass-card animate-float overflow-hidden flex items-center justify-center">
              <img 
                alt="Identity Avatar" 
                className="w-11/12 h-11/20 object-contain hover:scale-105 transition-transform duration-300" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYtJd4VFqEy27_zNRWuhRIi1NZdSRTsMaP0owh_9UKvJQXGPIoVor9SRPfUka5cxBuO8m6sEgpj4S1vBBie9DVPzb3MA7QfOGiOTUO2Ue1-tDZDxGbqHuar7qPKWOu1g57UoDMjJvoBFafEtEvtFOIwMwH--Lj3KvRdmcBL71d9MM_QHNEFM1zIbbtJrEfq4_uX5V43PV_iah1YnNu7V-OM4vFkRidXoCpkKVNXCAtt9NGRVjO7CCEJdUFSd17rLNk2ZUSUWKrtQA" 
              />
            </div>

            {/* Rank circular element */}
            <div className="absolute bottom-2 right-2 w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_15px_rgba(255,75,137,0.7)] z-10 select-none">
              <span className="font-display font-black text-base text-on-secondary-container">99</span>
            </div>
          </div>

          {/* Persona description banners */}
          <div className="text-center space-y-2 select-none w-full">
            <div className="inline-block px-3 py-1 bg-surface-container-highest/60 border border-primary-container/40 rounded-full mb-1">
              <span className="font-sans font-bold text-[10px] text-primary-container uppercase tracking-wider">
                LEVEL {level} ARCHITECT
              </span>
            </div>
            
            <h2 className="font-display text-3xl font-extrabold text-on-surface glitch-text select-none tracking-tight">
              THE CALM ONE
            </h2>
            
            <p className="font-sans font-extrabold text-[10px] text-outline tracking-[0.25em] uppercase">
              SECONDARY: <span className="text-secondary select-all">CHAOS CONTROLLER</span>
            </p>
          </div>

          {/* Action to edit avatar */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full py-4 bg-primary-container text-on-primary-container font-headline-md font-extrabold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-150 shadow-[0_4px_15px_rgba(0,245,255,0.35)] hover:brightness-110 uppercase text-sm tracking-widest"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
              edit_square
            </span>
            <span>Edit Avatar</span>
          </button>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-1 select-none">
            <span className="font-sans font-extrabold text-[9px] text-[#849495] tracking-widest uppercase">PULSE RATE</span>
            <span className="font-display font-black text-3xl text-primary-container">{pulseRate}</span>
          </div>
          <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-1 select-none">
            <span className="font-sans font-extrabold text-[9px] text-[#849495] tracking-widest uppercase">STREAK</span>
            <span className="font-display font-black text-3xl text-secondary">{streakDays}d</span>
          </div>
        </section>

        {/* Skins unlocked */}
        <section className="space-y-3">
          <div className="flex justify-between items-center px-1 select-none">
            <h3 className="font-display font-bold text-lg text-on-surface">SKINS UNLOCKED</h3>
            <span className="font-sans font-bold text-[9px] text-primary-container tracking-wider uppercase">VIEW ALL</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1.5 snap-x">
            
            {/* Skin index card 1 */}
            <div className="snap-start min-w-[124px] glass-card rounded-xl p-3 flex flex-col items-center justify-between border hover:border-primary-container transition-all">
              <div className="w-20 h-20 bg-surface-container-highest rounded-lg overflow-hidden flex items-center justify-center">
                <img className="w-16 h-16 object-contain" src={cyberPulseUrl} alt="Cyber Skin" />
              </div>
              <span className="font-sans font-bold text-[9px] text-primary-container uppercase tracking-wider mt-2.5 antialiased">
                CYBER PULSE
              </span>
            </div>

            {/* Skin index card 2 */}
            <div className="snap-start min-w-[124px] glass-card rounded-xl p-3 flex flex-col items-center justify-between opacity-50 border border-white/5 select-none grayscale">
              <div className="w-20 h-20 bg-surface-container-highest rounded-lg overflow-hidden flex items-center justify-center">
                <img className="w-16 h-16 object-contain" src={voidStalkerUrl} alt="Ghost Skin" />
              </div>
              <span className="font-sans font-bold text-[9px] text-outline uppercase tracking-wider mt-2.5">
                VOID STALKER
              </span>
            </div>

            {/* Skin index card 3 */}
            <div className="snap-start min-w-[124px] glass-card rounded-xl p-3 flex flex-col items-center justify-between border hover:border-secondary transition-all">
              <div className="w-20 h-20 bg-surface-container-highest rounded-lg overflow-hidden flex items-center justify-center font-bold">
                <img className="w-16 h-16 object-contain" src={pinkFuryUrl} alt="Neon Skin" />
              </div>
              <span className="font-sans font-bold text-[9px] text-secondary uppercase tracking-wider mt-2.5 antialiased">
                PINK FURY
              </span>
            </div>

          </div>
        </section>

        {/* Unlocked States index */}
        <section className="space-y-3">
          <h3 className="font-display font-bold text-lg text-on-surface select-none">EMOTIONAL STATES</h3>
          <div className="space-y-3">
            
            <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-primary-container shadow-[0_0_12px_rgba(0,245,255,0.15)] relative">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    waves
                  </span>
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-on-surface">Zen Master</p>
                  <p className="font-sans font-bold text-[8px] text-[#849495] tracking-wider uppercase mt-px">UNLOCKED AT LVL 10</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-secondary shadow-[0_0_12px_rgba(255,75,137,0.1)] relative">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    bolt
                  </span>
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-on-surface">Chaos Engine</p>
                  <p className="font-sans font-bold text-[8px] text-[#849495] tracking-wider uppercase mt-px">UNLOCKED AT LVL 25</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-outline opacity-40 select-none relative">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-outline/25 flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline text-lg">
                    lock
                  </span>
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-on-surface">Hyper Focus</p>
                  <p className="font-sans font-bold text-[8px] text-outline tracking-wider uppercase mt-px">REACH LVL 50</p>
                </div>
              </div>
              <div className="h-2 w-16 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-outline w-3/4 shadow-inner"></div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
