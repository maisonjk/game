import React, { useState, useEffect } from 'react';
import { ScenarioState, Customizations, ArchetypeId } from '../types';

interface ScenarioPlayProps {
  aura: number;
  level: number;
  selectedArchetype: ArchetypeId | null;
  onUpdateStats: (auraDiff: number, levelDiff: number) => void;
  onUpdateCustomizations: (updates: Partial<Customizations>) => void;
  onGoToTab: (tab: 'home' | 'stats' | 'profile') => void;
  onBackToHome: () => void;
}

export default function ScenarioPlay({
  aura,
  level,
  selectedArchetype,
  onUpdateStats,
  onUpdateCustomizations,
  onGoToTab,
  onBackToHome,
}: ScenarioPlayProps) {
  // Multi-step sub navigation within Play tab
  const [step, setStep] = useState<ScenarioState>('chat_setup');
  
  // Custom interactive user choice tracking
  const [setupReaction, setSetupReaction] = useState<'silent' | 'fast' | 'think'>('think');
  const [criticalDecision, setCriticalDecision] = useState<'calm' | 'chaos' | 'leave' | 'joke' | null>(null);
  
  // Chat typing loading state
  const [typingHidden, setTypingHidden] = useState(false);
  const [chatMessagesVisible, setChatMessagesVisible] = useState({
    msg1: false,
    msg2: false,
    msg3: false
  });

  // Animated bars inside outcome screen
  const [barWidth, setBarWidth] = useState('0%');

  useEffect(() => {
    if (step === 'chat_setup') {
      setTypingHidden(false);
      setChatMessagesVisible({ msg1: false, msg2: false, msg3: false });
      
      // Cascade-popup chat messages
      const t1 = setTimeout(() => setChatMessagesVisible(prev => ({ ...prev, msg1: true })), 500);
      const t2 = setTimeout(() => setChatMessagesVisible(prev => ({ ...prev, msg2: true })), 1200);
      const t3 = setTimeout(() => {
        setChatMessagesVisible(prev => ({ ...prev, msg3: true }));
        setTypingHidden(true); // Hide typing indicator
      }, 2200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [step]);

  useEffect(() => {
    if (step === 'outcome_reveal') {
      setTimeout(() => {
        setBarWidth('75%');
      }, 300);
    } else {
      setBarWidth('0%');
    }
  }, [step]);

  // Asset references matching Screen specs
  const kaisAvatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8t75If2ZPhH2tGOKnUM9w8G6BJ6sucXy1pgoFRKbfIAPOFQU3QL31JHKXq1DIZkIvUx4dJcR5GltfQ1AF_lilszNjxulSNcrGQeElCp4csG2FsWliUkf4zXtwf3sTXQyukqaOq5D2k1RzU5rCdygG5WdHh0XPgVVepFpWeSaEtpRtlX37tJcdE55K67sMqQJG6HIy18mZrG_Wi87nore_y2a1h5Ei1X4X4TL30kcqPg14qUNjrDU_9HzR5LyuCforXpoj7IGQXCY";
  
  const targetUserAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuD6Jf6Ux9GWEKy5xYY0LEOJaLcGhW9lJwKAl9DSmcT1p3QNofmzU2G7ZKCxmVK54meiTPWCdYuR_NL93mIageKw0DlslyYRovVCZMvXygb0gZajcADNruxV5JZNQ-9U0mWUJQ0aacCFvSZTU_luiFAqnK_CcDtUES8IjT1bJKAZJUTSPs9pVEqJHKZcBVt8wYpYSGJpYaclnIU8mB2dWg9fCPUTwNb15sAF1zkOSyfZGEzi55xvo32Fu-VgT6J7U4SzTNKQocovyaY";

  const lobbyGroupChatBackground = "https://lh3.googleusercontent.com/aida-public/AB6AXuCLmynCfWAiZ3AFWeSJrfX4tVyz5ibRv-phkPljrkulimTxB4QBhfGj2ZlrdzDu6Anv7rwcxYWZNVhFk8DsrvxeqTynDLXs5Mf-82ltQ667PH7JAIecTxTTcOfPNwUto4SflLPs8vdWqrA005HORGG8_q1BL2q_Gz_RPiXU81JXbVndRNW80Dm_ba_VS5bAD7xxqKxjQqiw9bUkpDel9TFFG5xN446HkfCVj5H4mroW1fl5e3kMUy_IaTZN8gwJQabjkJr5X9OO6QI";

  const criticalDecisionWaveBackground = "https://lh3.googleusercontent.com/aida-public/AB6AXuAXgTHUMk8Io7GvpGbpbVJbOJqvcxO1sPkZzS9FXmMDsF4hsAFiStdalI4_Oi3DfMfJR_SpgXXqwBb3zpzxZFBoEItDAc3aZyoZOvUyaU697ZaCV9HQy8KFRrnb_pvUxsazn1pnkRW2H7wjJBrCkMbE9I6DWmx97UkRLwHS_oSqVowkAge8oZmwhcy1y-MB2Safmvj9Qr6SMOoqlfLpQuF7waBbkpLaeNMdAU4rX5J8q7EiPNvDVfJ2WvWphYW_ZglykItp2v2z_kA";

  const boardRoomPreUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAnJ4l1OyiYAwCcVo3SM-Lz5OMk6bWC-kydlh2Bq4YmEzVDq7eCmSF0a2sJdMXVgBZTsqbhmo1kgzN_bGHiAtFkHiYLKl43R-AzzAVRzNQCctwjzFu7uxgp9TibkFXOdZQ2bBx91HDsmerzAiJiGV2JCbJ8M6dR9tGOdMq8IOqG7c7oOKLqwzfBGoF1YNoMpYercCUAko0-SVUMgejFy_DXzG6n_IdNB3UV1d0KXijRe0WqU-xMzYJq5aHRlcUBYXvpl8m7di3ZywQ";

  const characterAuraArtUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCJXKjJsj3ND6yik8XhoofuuMdDcWGCAP64oghiIFxx9CxT7b-KsrMKLZoUiNPk8oIbR3BO97zVVSSbjRO5a3_QI0RidYIzsNHt3zxnA0i4rRMWC01XaLHxG5x12nWpArt5L5YbxSGNUmwVlylO0WcdgCbZGOUwHSnQic3viDzTyfaDEwGRCcoMKyIADcXKQOVQWxOsYWwgKCv2duDUxEX9wh6ApFxnOfA7NuW0kx3zsLQkI-Hjd8rgswfNh2ZMQPPf0N_X8wcnwAE";

  // Decision state picker triggers
  const handleSelectDecision = (choice: 'calm' | 'chaos' | 'leave' | 'joke') => {
    setCriticalDecision(choice);
    // Rewards/consequences calculation update stats
    if (choice === 'calm') {
      onUpdateStats(50, 1); // Aura + 50, Level up
    } else if (choice === 'chaos') {
      onUpdateStats(-20, 0); // Spiked
    } else {
      onUpdateStats(15, 0); // Neutral adjustment
    }
    setStep('outcome_reveal');
  };

  const handleRestart = () => {
    setCriticalDecision(null);
    setStep('chat_setup');
  };

  // 1. CHAT SETUP SPLASH SCREEN (Screen 12)
  if (step === 'chat_setup') {
    return (
      <div className="relative min-h-[calc(100vh-160px)] w-full py-6 px-margin-mobile overflow-y-auto pb-32">
        <main className="max-w-md mx-auto flex flex-col justify-between">
          
          {/* Header Story Intro */}
          <section className="mb-6 text-center select-none">
            <h2 className="font-display font-extrabold text-3xl mb-1 text-white leading-tight">The Setup</h2>
            <p className="font-sans text-xs text-[#94a3b8]">You just joined "The Squad" group chat. Things get weird fast.</p>
          </section>

          {/* Interactive Chat bubble interface */}
          <div className="glass-card rounded-xl p-4 mb-6 flex-grow min-h-[22rem] flex flex-col justify-end space-y-4">
            
            {/* Msg 1: Kai */}
            {chatMessagesVisible.msg1 && (
              <div className="flex items-end gap-2 animate-[spring-up_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_both]">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center border border-secondary/20 shadow-md">
                  <span className="material-symbols-outlined text-white text-xs select-none">person</span>
                </div>
                <div className="bg-surface-container-high rounded-t-xl rounded-br-xl p-3 max-w-[80%] border border-white/5">
                  <p className="font-sans font-black text-secondary text-[8px] tracking-wider mb-0.5">KAI</p>
                  <p className="font-sans text-xs text-on-surface">Yo, who invited the noob? @everyone</p>
                </div>
              </div>
            )}

            {/* Msg 2: Mira */}
            {chatMessagesVisible.msg2 && (
              <div className="flex items-end gap-2 flex-row-reverse animate-[spring-up_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_both]">
                <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center border border-tertiary/20 shadow-md">
                  <span className="material-symbols-outlined text-white text-xs select-none">bolt</span>
                </div>
                <div className="bg-surface-container-highest rounded-t-xl rounded-bl-xl p-3 max-w-[80%] text-right border border-white/5">
                  <p className="font-sans font-black text-tertiary-fixed-dim text-[8px] tracking-wider mb-0.5">MIRA</p>
                  <p className="font-sans text-xs text-on-surface">Relax Kai. They're just here to watch the chaos.</p>
                </div>
              </div>
            )}

            {/* Msg 3: System alert warning */}
            {chatMessagesVisible.msg3 && (
              <div className="flex items-end gap-2 animate-[spring-up_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_both]">
                <div className="w-8 h-8 rounded-full bg-error-container/30 flex items-center justify-center border border-error/30 shadow-[0_0_12px_rgba(255,180,171,0.2)]">
                  <span className="material-symbols-outlined text-error text-xs select-none">warning</span>
                </div>
                <div className="bg-surface-container-high border border-error/25 rounded-t-xl rounded-br-xl p-3 max-w-[80%]">
                  <p className="font-sans font-black text-error text-[8px] tracking-wider mb-0.5">SYSTEM ALERT</p>
                  <p className="font-sans text-xs italic text-on-surface">User @Kai has uploaded a restricted screenshot of your private EQ profile.</p>
                </div>
              </div>
            )}

            {/* Dynamic typing loading indicator bar */}
            {!typingHidden && (
              <div className="flex items-center gap-1.5 opacity-60 mt-3 pl-10" id="typing-indicator-chat">
                <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:0.5s]"></div>
                <span className="font-sans font-bold text-[8px] tracking-widest text-[#849495] ml-1 uppercase">KAI IS TYPING...</span>
              </div>
            )}

          </div>

          {/* Reaction Teasers Choice */}
          <section className="space-y-3 mb-6 select-none">
            <p className="font-sans font-bold text-[10px] text-center text-primary-fixed mb-1 tracking-[0.25em] uppercase">HOW DO YOU REACT?</p>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: 'silent' as const, emoji: '👀', label: 'Stay silent' },
                { id: 'fast' as const, emoji: '💬', label: 'Respond fast' },
                { id: 'think' as const, emoji: '🧠', label: 'Think first' }
              ].map((cho) => {
                const active = setupReaction === cho.id;
                return (
                  <button
                    id={`reaction-init-btn-${cho.id}`}
                    key={cho.id}
                    onClick={() => setSetupReaction(cho.id)}
                    className={`glass-panel hover:bg-surface-container-highest transition-all duration-300 p-4 rounded-xl flex items-center justify-between group focus:outline-none ${
                      active ? 'border-primary-container ring-1 ring-primary-container bg-white/5 cyan-bloom' : 'border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cho.emoji}</span>
                      <span className="font-sans font-semibold text-sm text-[#dfe2f2]">{cho.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-primary-container text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      chevron_right
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Start CTA Button */}
          <div>
            <button
              onClick={() => setStep('scenario_intro')}
              className="w-full bg-primary-container text-on-primary-container font-headline-md font-extrabold py-5 rounded-xl shadow-[0_4px_30px_rgba(0,245,255,0.4)] active:scale-95 transition-transform hover:brightness-110 flex items-center justify-center gap-2 group uppercase tracking-wider"
            >
              <span>Enter Game</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 duration-150" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </button>
          </div>

          {/* Immersive background trail styling */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
            <img className="w-full h-full object-cover" src={lobbyGroupChatBackground} alt="Art background" />
          </div>

        </main>
      </div>
    );
  }

  // 2. SCENARIO PROBLEM INTRO (Screen 9)
  if (step === 'scenario_intro') {
    return (
      <div className="relative min-h-[calc(100vh-160px)] w-full py-10 px-margin-mobile overflow-y-auto pb-32">
        <main className="max-w-md mx-auto flex flex-col justify-center items-center my-auto min-h-[70vh]">
          
          <div className="w-full glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center border-secondary-container/20">
            {/* Background decor glowing circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Dotted border groups icon bubble */}
            <div className="w-20 h-20 mb-6 rounded-full bg-surface-container-highest border-2 border-secondary/40 border-dashed flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-secondary text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                groups
              </span>
            </div>

            {/* Scenario Header */}
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white glitch-text mb-4 uppercase select-none tracking-tight">
              The Group Chat Problem
            </h2>

            {/* Narrative detail */}
            <div className="glass-panel p-5 rounded-xl mb-8 text-on-surface-variant border-l-4 border-l-secondary text-left w-full">
              <p className="font-sans italic text-sm md:text-base leading-relaxed text-[#dfe2f2]">
                "Someone in the group chat just blamed you for something you didn’t do."
              </p>
            </div>

            {/* Fire Chaos Meter indicator bar */}
            <div className="w-full space-y-2.5 mb-8 select-none">
              <div className="flex justify-between items-end">
                <span className="font-sans font-extrabold text-[10px] text-secondary uppercase tracking-[0.2em]">Chaos Meter</span>
                <span className="font-sans font-black text-[10px] text-secondary-container tracking-wider">HIGH ALERT</span>
              </div>
              <div className="relative h-4 w-full bg-surface-container-highest rounded-full overflow-hidden border border-white/5">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-container to-secondary w-11/12 flex items-center justify-end px-3">
                  <span className="text-[10px] items-center tracking-normal font-sans">🔥🔥🔥🔥🔥🔥🔥🔥</span>
                </div>
              </div>
            </div>

            {/* Continue Start decision button */}
            <button
              onClick={() => setStep('decision_gameplay')}
              className="w-full h-15 bg-primary-container text-on-primary-container font-headline-md font-extrabold rounded-xl shadow-[0_4px_22px_rgba(0,245,255,0.45)] active:scale-95 transition-transform hover:brightness-110 flex items-center justify-center gap-2 group uppercase tracking-wider"
            >
              <span>Start Decision</span>
              <span className="material-symbols-outlined text-lg inline-block group-hover:translate-x-1 duration-150" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </button>

          </div>

        </main>
      </div>
    );
  }

  // 3. DECISION GAMEPLAY (Screen 11)
  if (step === 'decision_gameplay') {
    return (
      <div className="relative min-h-[calc(100vh-160px)] w-full py-6 px-margin-mobile overflow-y-auto pb-32">
        <main className="max-w-md mx-auto space-y-6 flex flex-col justify-between">
          
          {/* NPC Dialogue Box Header */}
          <div className="glass-card rounded-2xl p-4 flex gap-3 border-secondary-container/20 mt-1 select-none">
            <div className="relative w-11 h-11 flex-shrink-0">
              <div className="absolute -inset-1 rounded-full bg-secondary-container/20 blur-md pointer-events-none"></div>
              <img src={kaisAvatarUrl} alt="Kai" className="w-full h-full rounded-full border border-secondary/30 object-cover shadow-md" />
            </div>
            <div className="flex-grow space-y-1">
              <span className="font-display font-extrabold text-sm text-secondary">@Kai_Snoopy</span>
              <p className="font-sans text-xs text-[#dfe2f2] leading-snug">
                Everyone saw what you did in the group chat. Don't even try to deny it lol. 💀
              </p>
              <div className="flex items-center gap-1.5 opacity-65 pt-1.5" id="critical-decision-typing">
                <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-primary-container rounded-full animate-bounce [animation-delay:0.5s]"></div>
                <span className="font-sans font-bold text-[8px] text-[#849495] tracking-widest uppercase">Typing a response...</span>
              </div>
            </div>
          </div>

          {/* Dynamic grid / critical banner background overlay */}
          <section className="relative h-44 w-full rounded-xl overflow-hidden border border-white/10 group select-none">
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent z-10 pointer-events-none"></div>
            <img src={criticalDecisionWaveBackground} className="w-full h-full object-cover opacity-50 animate-pulse" alt="Tension waves" />
            
            {/* Visual glow indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
              <div className="font-sans font-extrabold text-xs text-secondary-container animate-glitch tracking-[0.25em] mb-1.5">
                CRITICAL DECISION
              </div>
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#ff4b89] to-transparent"></div>
            </div>

            {/* Wireframe grids decorative */}
            <div className="absolute top-4 left-4 w-12 h-[1px] bg-primary-container/30 animate-pulse"></div>
            <div className="absolute bottom-6 right-6 w-16 h-[1px] bg-secondary-container/20 animate-pulse delay-300"></div>
          </section>

          {/* Decision header prompts */}
          <div className="text-center select-none">
            <h2 className="font-display font-bold text-xl text-on-surface">What's your move?</h2>
            <p className="font-sans text-xs text-outline mt-1 leading-snug">Choose a card to explore emotional outcomes</p>
          </div>

          {/* horizontal scroll choices grid */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x px-1">
            
            {/* Card Option 1: Chaos */}
            <div className="snap-center flex-shrink-0 w-[270px]">
              <button
                id="sec-choice-btn-1"
                onClick={() => {
                  onUpdateCustomizations({ moodAuraEmoji: '🔥' });
                  onSelectChoiceOption('chaos');
                }}
                className="w-full text-left glass-card rounded-xl p-5 border border-secondary-container/20 hover:border-secondary-container group active:scale-95 transition-all duration-200 flex flex-col justify-between h-52 cursor-pointer focus:outline-none"
              >
                <div className="flex justify-between items-start w-full">
                  <span className="material-symbols-outlined text-secondary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    bolt
                  </span>
                  <div className="bg-secondary-container/15 px-2 py-0.5 rounded text-[8px] font-sans font-bold text-secondary-container border border-secondary-container/30 tracking-widest uppercase">
                    CHAOS HIGH
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-on-surface group-hover:text-secondary-fixed transition-colors">
                    Call them out instantly
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Force the truth into the open. Things might get messy.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 w-full select-none">
                  <span className="text-lg">😡</span>
                  <span className="font-sans font-bold text-[8px] text-outline tracking-wider uppercase">PREDICTION: DRAMA +40</span>
                </div>
              </button>
            </div>

            {/* Card Option 2: Leave Chat risk */}
            <div className="snap-center flex-shrink-0 w-[270px]">
              <button
                id="sec-choice-btn-2"
                onClick={() => {
                  onUpdateCustomizations({ moodAuraEmoji: '💀' });
                  onSelectChoiceOption('leave');
                }}
                className="w-full text-left glass-card rounded-xl p-5 border border-error/20 hover:border-error group active:scale-95 transition-all duration-200 flex flex-col justify-between h-52 cursor-pointer focus:outline-none"
              >
                <div className="flex justify-between items-start w-full">
                  <span className="material-symbols-outlined text-error text-4xl">
                    block
                  </span>
                  <div className="bg-error/15 px-2 py-0.5 rounded text-[8px] font-sans font-bold text-error border border-error/30 tracking-widest uppercase">
                    EMOTIONAL RISK
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-on-surface group-hover:text-error transition-colors">
                    Leave the chat
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Silence is a message, but it leaves you vulnerable to rumors.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 w-full select-none">
                  <span className="text-lg">😶</span>
                  <span className="font-sans font-bold text-[8px] text-outline tracking-wider uppercase">PREDICTION: ISOLATION</span>
                </div>
              </button>
            </div>

            {/* Card Option 3: Calm Aura Gain */}
            <div className="snap-center flex-shrink-0 w-[270px]">
              <button
                id="sec-choice-btn-3"
                onClick={() => {
                  onUpdateCustomizations({ moodAuraEmoji: '💙' });
                  onSelectChoiceOption('calm');
                }}
                className="w-full text-left glass-card rounded-xl p-5 border border-primary-container/20 hover:border-primary-container glow-aura group active:scale-95 transition-all duration-200 flex flex-col justify-between h-52 cursor-pointer focus:outline-none"
              >
                <div className="flex justify-between items-start w-full">
                  <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    psychology
                  </span>
                  <div className="bg-primary-container/15 px-2 py-0.5 rounded text-[8px] font-sans font-bold text-primary-container border border-primary-container/30 tracking-widest uppercase">
                    AURA GAIN
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-on-surface group-hover:text-primary-fixed transition-colors">
                    Ask calmly what happened
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Maintain your frame and de-escalate the situation.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 w-full select-none">
                  <span className="text-lg">🧠</span>
                  <span className="font-sans font-bold text-[8px] text-primary-container tracking-wider uppercase">PREDICTION: AURA +50</span>
                </div>
              </button>
            </div>

            {/* Card Option 4: Make Joke defuse */}
            <div className="snap-center flex-shrink-0 w-[270px]">
              <button
                id="sec-choice-btn-4"
                onClick={() => {
                  onUpdateCustomizations({ moodAuraEmoji: '🌈' });
                  onSelectChoiceOption('joke');
                }}
                className="w-full text-left glass-card rounded-xl p-5 border border-tertiary-container/35 hover:border-tertiary-container group active:scale-95 transition-all duration-200 flex flex-col justify-between h-52 cursor-pointer focus:outline-none"
              >
                <div className="flex justify-between items-start w-full">
                  <span className="material-symbols-outlined text-tertiary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    sentiment_very_satisfied
                  </span>
                  <div className="bg-tertiary-container/15 px-2 py-0.5 rounded text-[8px] font-sans font-bold text-tertiary border border-tertiary-container/35 tracking-widest uppercase">
                    SOCIAL RISK
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-on-surface group-hover:text-tertiary-fixed-dim transition-colors">
                    Make a joke to defuse
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Use humor to break the tension. Might backfire if untimely.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 w-full select-none">
                  <span className="text-lg">😂</span>
                  <span className="font-sans font-bold text-[8px] text-outline tracking-wider uppercase">PREDICTION: POPULARITY ?</span>
                </div>
              </button>
            </div>

          </div>

        </main>
      </div>
    );
  }

  // 4. OUTCOME REVEAL (Screen 7)
  if (step === 'outcome_reveal') {
    const isCalmChoice = criticalDecision === 'calm';
    
    return (
      <div className="relative min-h-[calc(100vh-160px)] w-full py-6 px-margin-mobile overflow-y-auto pb-32">
        <main className="max-w-md mx-auto flex flex-col items-center gap-6">
          
          {/* React sparkles icon head */}
          <div className="w-full flex flex-col items-center justify-center pt-4 select-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary-container/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="relative z-10 p-5 glass-panel rounded-full cyan-bloom border-primary-container/40">
                <span className="material-symbols-outlined text-5xl text-primary-container select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
              </div>
            </div>
            
            <h2 className="mt-6 font-display font-extrabold text-3xl md:text-4xl text-center text-primary-container drop-shadow-[0_0_12px_rgba(0,245,255,0.7)] uppercase select-none leading-none tracking-tight">
              {isCalmChoice ? 'CHILL MOMENT UNLOCKED' : 'CHAOS INSTABILITY TARGETED'}
            </h2>
          </div>

          {/* Narrative outcome box text */}
          <div className="glass-panel p-5 rounded-xl w-full transform hover:scale-[1.02] transition-transform duration-300">
            <p className="font-sans text-sm md:text-base text-on-surface text-center leading-relaxed">
              {isCalmChoice 
                ? "You paused instead of reacting—this reduced conflict and boosted your aura."
                : "You responded under emotional heat! While asserting yourself, you triggered defensive behaviors and created a friction spike."
              }
            </p>
          </div>

          {/* Visual stat bento grids */}
          <div className="grid grid-cols-1 gap-4 w-full">
            
            {/* Aura Progress */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-3 relative overflow-hidden select-none">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    flare
                  </span>
                  <span className="font-sans font-extrabold text-[9px] text-[#849495] tracking-widest uppercase">AURA PROGRESS</span>
                </div>
                <span className="font-display font-black text-xl text-primary-container">
                  {isCalmChoice ? '+50' : '-20'}
                </span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-primary-container to-white rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: isCalmChoice ? barWidth : '30%' }}
                >
                  <div className="h-full w-full animate-pulse bg-white/20"></div>
                </div>
              </div>
            </div>

            {/* Friendship Quality indicator bar */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-2.5 select-none animate-[spring-up_0.5s_ease-out]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-xl">favorite</span>
                  <span className="font-sans font-extrabold text-[9px] text-outline tracking-wider uppercase">FRIENDSHIP STABILITY</span>
                </div>
                <span className="font-sans font-bold text-[10px] text-secondary-fixed-dim uppercase">
                  {isCalmChoice ? 'STEADY' : 'VULNERABLE'}
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className={`h-1.5 flex-1 rounded-full ${isCalmChoice ? 'bg-secondary' : 'bg-secondary'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${isCalmChoice ? 'bg-secondary' : 'bg-outline-variant'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${isCalmChoice ? 'bg-secondary' : 'bg-outline-variant'}`}></div>
                <div className="h-1.5 flex-1 bg-outline-variant rounded-full"></div>
                <div className="h-1.5 flex-1 bg-outline-variant rounded-full"></div>
              </div>
            </div>

            {/* Chaos Control progress */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-2.5 border-l-4 border-l-error select-none">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-xl">bolt</span>
                  <span className="font-sans font-extrabold text-[9px] text-outline tracking-wider uppercase">CHAOS CONTROL</span>
                </div>
                <span className="font-sans font-bold text-[10px] text-error font-extrabold uppercase">
                  {isCalmChoice ? 'MAX' : 'CRITICAL'}
                </span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r rounded-full transition-all duration-1000 ${
                    isCalmChoice ? 'from-error-container to-error w-full' : 'from-error to-red-600 w-1/4'
                  }`}
                ></div>
              </div>
            </div>

          </div>

          {/* Progress confirm CTA to DBT lesson */}
          <button
            onClick={() => setStep('dbt_lesson')}
            className="w-full h-15 bg-primary-container text-on-primary-container font-headline-md font-extrabold rounded-xl shadow-[0_4px_22px_rgba(0,245,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            <span>See what you learned</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>

        </main>
      </div>
    );
  }

  // 5. EVALUATION DBT MICRO LESSON (Screen 10)
  if (step === 'dbt_lesson') {
    const isCalmChoice = criticalDecision === 'calm';

    return (
      <div className="relative min-h-[calc(100vh-160px)] w-full py-6 px-margin-mobile overflow-y-auto pb-32">
        <main className="max-w-md mx-auto flex flex-col justify-between space-y-6">
          
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col space-y-6 border-white/5">
            {/* Decors ambient */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* DBT Label Skill label */}
            <div className="flex items-center select-none w-fit">
              <div className="flex items-center gap-2 bg-surface-container-highest/60 px-4 py-1.5 rounded-full border border-primary-container/20 skill-badge-glow shadow-[0_0_12px_rgba(0,245,255,0.25)]">
                <span className="text-base select-none">🧘</span>
                <span className="font-sans font-bold text-[10px] text-primary-container tracking-widest uppercase">
                  Emotion Regulation
                </span>
              </div>
            </div>

            {/* Lesson Title */}
            <div className="space-y-1.5 select-none">
              <h2 className="font-display font-extrabold text-2xl text-primary-fixed-dim glitch-text leading-tight">
                What just happened?
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary-container to-transparent rounded-full animate-pulse"></div>
            </div>

            {/* Core learning evaluation */}
            <div className="space-y-5">
              
              <div className="flex items-start gap-3">
                <div className={`mt-1.5 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,75,137,0.8)] flex-shrink-0 ${
                  isCalmChoice ? 'bg-primary-container shadow-[#00f5ff]' : 'bg-secondary shadow-[#ff4b89]'
                }`}></div>
                <p className="font-sans text-sm md:text-base text-on-surface leading-relaxed">
                  {isCalmChoice 
                    ? "You paused instead of reacting—this successfully kept drama down."
                    : "You reacted under high emotional intensity, which increased conflict."
                  }
                </p>
              </div>

              {/* Box suggestions option try this instead */}
              <div className="p-5 bg-surface-container-low/40 rounded-xl border-l-4 border-l-primary-container/60 space-y-3.5 select-none shadow-inner">
                <p className="font-sans font-bold text-[10px] text-outline tracking-wider uppercase select-none">TRY THIS INSTEAD</p>
                
                <div className="flex flex-col gap-3 font-semibold text-xs md:text-sm text-[#dfe2f2]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      pause_circle
                    </span>
                    <span>Pause for 3 seconds</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      label
                    </span>
                    <span>Label the emotion</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-xl">
                      send
                    </span>
                    <span>Respond intentionally</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Progress status loader bar */}
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden select-none">
              <div className="bg-gradient-to-r from-primary-container to-white h-full w-2/3 animate-pulse"></div>
            </div>

            {/* Save / Next Level Triggers */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="scen-btn-retry"
                onClick={handleRestart}
                className="flex-1 py-3.5 rounded-full border-2 border-outline-variant text-[#dfe2f2] font-sans font-bold text-xs uppercase hover:bg-outline-variant/15 active:scale-95 hover:border-primary-container/40 transition-all flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>RETRY SCENARIO</span>
              </button>

              <button
                id="scen-btn-next-lvl"
                onClick={() => onGoToTab('stats')}
                className="flex-1 py-3.5 rounded-full bg-primary-container text-on-primary-container font-sans font-bold text-xs uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(0,245,255,0.3)] focus:outline-none"
              >
                <span>NEXT LEVEL</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  arrow_forward
                </span>
              </button>
            </div>

          </div>

        </main>
      </div>
    );
  }

  // 6. SNEAK PEEK LOCKED LEVELS PREVIEW (Screen 8)
  if (step === 'locked_levels') {
    return (
      <div className="relative min-h-[calc(100vh-160px)] w-full py-6 px-margin-mobile overflow-y-auto pb-32">
        <main className="max-w-md mx-auto space-y-6 flex flex-col items-center">
          
          {/* Big lock center icon */}
          <div className="text-center select-none pt-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high border-2 border-primary-container/40 mb-4 shadow-[0_0_20px_rgba(0,245,255,0.25)] animate-pulse">
              <span className="material-symbols-outlined text-4xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
            </div>
            
            <h2 className="font-display font-extrabold text-3xl text-white mb-1.5 glitch-text uppercase">
              Locked Content
            </h2>
            
            <p className="font-sans font-bold text-[10px] text-primary-fixed tracking-widest uppercase">
              Unlock Real World Mode at Social Rank: PRO
            </p>
          </div>

          {/* Stats lock details */}
          <div className="glass-card rounded-xl p-5 w-full border-t border-t-white/10 select-none">
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-[9px] text-[#849495] tracking-wider uppercase">CURRENT RANK</span>
                <span className="font-display font-bold text-lg text-white">Apprentice IV</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-sans font-bold text-[9px] text-primary-container tracking-wider uppercase">PRO RANK</span>
                <span className="font-display font-bold text-lg text-primary-container">75% to Unlock</span>
              </div>
            </div>

            {/* Progress lock meter fill */}
            <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-container to-white w-3/4 relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            <p className="font-sans italic text-[11px] text-[#849495] mt-3.5 text-center">
              Gain +2,400 Social XP to access high-stakes simulations.
            </p>
          </div>

          {/* Sneak peek cards slider */}
          <div className="w-full space-y-4">
            <h3 className="font-sans font-bold text-[10px] text-secondary-fixed pl-1 tracking-[0.15em] uppercase select-none">
              SNEAK PEEK: PRO LEVELS
            </h3>

            {/* Preview Case 1 */}
            <div className="relative rounded-xl overflow-hidden glass-card h-44 flex flex-col justify-end p-5 select-none border-secondary-container/10 group cursor-not-allowed">
              <div className="absolute inset-0 select-none brightness-[0.35] blur-sm transition-all group-hover:blur-[2px]">
                <img src={boardRoomPreUrl} className="w-full h-full object-cover" alt="Preview Corporate" />
              </div>
              <div className="relative z-10 space-y-0.5">
                <div className="flex items-center gap-1.5 text-secondary text-xs">
                  <span className="material-symbols-outlined text-sm">work</span>
                  <span className="font-sans font-bold text-[9px] tracking-wider uppercase">REAL WORLD SIM</span>
                </div>
                <h4 className="font-display font-extrabold text-lg text-white leading-tight">Job Interview Simulation</h4>
                <p className="font-sans text-xs text-[#b9caca]">Face the AI-Board and master executive presence.</p>
              </div>

              <div className="absolute top-4 right-4 bg-surface-container-highest/80 backdrop-blur rounded-full px-2.5 py-0.5 flex items-center gap-1 border border-white/10">
                <span className="material-symbols-outlined text-xs text-secondary">lock</span>
                <span className="font-sans font-bold text-[8px] text-white tracking-widest uppercase">PRO</span>
              </div>
            </div>

            {/* Preview Case 2 */}
            <div className="relative rounded-xl overflow-hidden glass-card h-44 flex flex-col justify-end p-5 select-none border-secondary-container/10 group cursor-not-allowed">
              <div className="absolute inset-0 select-none brightness-[0.35] blur-sm transition-all group-hover:blur-[2px]">
                <img src={characterAuraArtUrl} className="w-full h-full object-cover" alt="Preview Conflict outline" />
              </div>
              <div className="relative z-10 space-y-0.5">
                <div className="flex items-center gap-1.5 text-secondary text-xs">
                  <span className="material-symbols-outlined text-pink-400 text-sm">psychology</span>
                  <span className="font-sans font-bold text-[9px] tracking-wider uppercase">BOSS LEVEL</span>
                </div>
                <h4 className="font-display font-extrabold text-lg text-white leading-tight">Conflict Resolution</h4>
                <p className="font-sans text-xs text-[#b9caca]">De-escalate high-tension social scenarios.</p>
              </div>

              <div className="absolute top-4 right-4 bg-surface-container-highest/80 backdrop-blur rounded-full px-2.5 py-0.5 flex items-center gap-1 border border-white/10">
                <span className="material-symbols-outlined text-xs text-secondary">lock</span>
                <span className="font-sans font-bold text-[8px] text-white tracking-widest uppercase">PRO</span>
              </div>
            </div>

          </div>

          {/* Go Back CTA */}
          <div className="w-full pt-4">
            <button
              onClick={onBackToHome}
              className="w-full py-4.5 bg-primary-container text-on-primary-fixed-variant font-sans font-bold text-xs rounded-xl shadow-[0_4px_20px_rgba(0,245,255,0.3)] hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>Keep Leveling</span>
              <span className="material-symbols-outlined text-lg">trending_up</span>
            </button>
          </div>

        </main>
      </div>
    );
  }

  return null;

  // Internal helper to chain options picker
  function onSelectChoiceOption(type: 'calm' | 'chaos' | 'leave' | 'joke') {
    setCriticalDecision(type);
    
    // Animate details calculations
    if (type === 'calm') {
      onUpdateStats(50, 1);
    } else if (type === 'chaos') {
      onUpdateStats(-25, 0);
    } else if (type === 'leave') {
      onUpdateStats(10, 0);
    } else {
      onUpdateStats(15, 0);
    }

    setStep('outcome_reveal');
  }
}
