import { useState } from 'react';
import { ARCHETYPES, SKILLS, SKILL_ORDER } from '../data';
import { useGame } from '../lib/store';
import { success, tap } from '../lib/haptics';
import type { ArchetypeId } from '../types';
import { Logo } from './Chrome';
import { Button, Eyebrow, Icon } from './ui';

export function Splash() {
  return (
    <div className="min-h-[100dvh] grid place-items-center bg-ink">
      <div className="flex flex-col items-center gap-4 anim-fade">
        <Logo size={64} />
        <div className="font-display font-black text-3xl tracking-tight uppercase">Social Levels</div>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const { setState } = useGame();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [arch, setArch] = useState<ArchetypeId | null>(null);

  const finish = () => {
    if (!arch) return;
    success();
    const color = ARCHETYPES.find((a) => a.id === arch)!.color;
    setState((s) => ({ ...s, onboarded: true, name: [...name.trim()].slice(0, 18).join(''), archetype: arch, auraColor: color === '#ff4b89' ? color : '#00f5ff' }));
  };

  return (
    <div className="min-h-[100dvh] bg-ink bg-grid flex flex-col pt-safe pb-safe">
      <div className="flex-1 w-full max-w-lg mx-auto px-6 flex flex-col">
        {/* progress */}
        <div className="flex gap-1.5 pt-4" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-cyan' : 'bg-white/10'}`} />
          ))}
        </div>

        {step === 0 && (
          <div key="s0" className="flex-1 flex flex-col anim-rise">
            <div className="flex-1 flex flex-col justify-center">
              <Logo size={72} />
              <h1 className="mt-6 font-display font-black text-[44px] leading-[0.95] tracking-tight uppercase">
                Real life
                <br />
                is a <span className="text-cyan neon-text-cyan">game.</span>
              </h1>
              <p className="mt-5 text-muted text-[17px] leading-relaxed">
                Play through group chat drama, friend fights, and awkward moments. Make the call. See what happens. Level up the skills that actually matter.
              </p>
              <p className="mt-3 text-[13px] text-muted">A game for practicing social skills. Not therapy or counseling.</p>
              <div className="mt-8 grid grid-cols-5 gap-2">
                {SKILL_ORDER.map((k) => (
                  <div key={k} className="rounded-xl border border-line bg-panel py-2.5 text-center">
                    <div className="w-2 h-2 rounded-full mx-auto" style={{ background: SKILLS[k].color }} />
                    <div className="mt-1.5 text-[9px] font-bold tracking-wider text-muted">{SKILLS[k].short}</div>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full mb-2" onClick={() => setStep(1)}>
              Start
            </Button>
          </div>
        )}

        {step === 1 && (
          <div key="s1" className="flex-1 flex flex-col anim-rise">
            <div className="flex-1 flex flex-col justify-center">
              <Eyebrow>Player setup</Eyebrow>
              <h2 className="mt-2 font-display font-black text-4xl uppercase tracking-tight">What should we call you?</h2>
              <p className="mt-3 text-muted">A first name or nickname. It stays on this phone.</p>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && name.trim() && setStep(2)}
                maxLength={36}
                autoComplete="off"
                autoCapitalize="words"
                placeholder="Nickname"
                className="mt-8 w-full h-16 rounded-2xl bg-panel border border-line px-5 font-display font-bold text-2xl text-text placeholder:text-faint focus:border-cyan focus:outline-none"
              />
            </div>
            <Button className="w-full mb-2" disabled={!name.trim()} onClick={() => setStep(2)}>
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div key="s2" className="flex-1 flex flex-col anim-rise">
            <div className="pt-6">
              <Eyebrow>Pick your archetype</Eyebrow>
              <h2 className="mt-2 font-display font-black text-[32px] uppercase tracking-tight leading-none">How do you usually play it?</h2>
              <p className="mt-3 text-muted">Go with your gut. The game will show you how you actually play.</p>
            </div>
            <div className="mt-5 grid gap-2 flex-1 content-start pb-4">
              {ARCHETYPES.map((a) => {
                const on = arch === a.id;
                return (
                  <button
                    key={a.id}
                    aria-pressed={on}
                    onClick={() => {
                      tap();
                      setArch(a.id);
                    }}
                    className="text-left rounded-2xl border p-3 flex items-center gap-3 transition active:scale-[0.98]"
                    style={{
                      borderColor: on ? a.color : 'rgba(255,255,255,0.09)',
                      background: on ? `${a.color}14` : '#161b2a',
                      boxShadow: on ? `0 0 24px ${a.color}33` : 'none',
                    }}
                  >
                    <span className="text-2xl" aria-hidden>
                      {a.emoji}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display font-extrabold text-base" style={{ color: on ? a.color : undefined }}>
                        {a.title}
                      </span>
                      <span className="block text-[13px] text-muted leading-snug">{a.description}</span>
                    </span>
                    {on && <Icon name="Check" size={20} className="text-text" />}
                  </button>
                );
              })}
            </div>
            <div className="sticky bottom-0 -mx-6 px-6 pt-3 pb-2 bg-gradient-to-t from-ink via-ink to-ink/0">
            <Button className="w-full" disabled={!arch} onClick={finish}>
              Play my first scenario
            </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
