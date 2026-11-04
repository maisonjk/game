import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { SKILLS, TONES, WORLDS } from '../data';
import { completeScenario, levelTitle, personalize, type RunResult } from '../lib/game';
import { success, tap, thud, warn } from '../lib/haptics';
import { useGame } from '../lib/store';
import type { Choice, Scenario } from '../types';
import { Button, Eyebrow, Icon, IconButton, Stars } from './ui';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = 'intro' | 'story' | 'beat0' | 'result0' | 'beat1' | 'result1' | 'outcome' | 'lesson';

export default function ScenarioPlayer({
  scenario,
  onExit,
  onNext,
  hasNext,
  onCelebrate,
}: {
  scenario: Scenario;
  onExit: () => void;
  onNext: () => void;
  hasNext: boolean;
  onCelebrate: (r: RunResult) => void;
}) {
  const { state, setState } = useGame();
  const world = WORLDS.find((w) => w.id === scenario.world)!;
  const name = state.name;
  const p = (t: string) => personalize(t, name);

  const [phase, setPhase] = useState<Phase>('intro');
  const [shown, setShown] = useState(0);
  const [picks, setPicks] = useState<Choice[]>([]);
  const [result, setResult] = useState<RunResult | null>(null);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const choiceSets = useMemo(() => scenario.beats.map((b) => shuffle(b.choices)), [scenario]);
  const endRef = useRef<HTMLDivElement>(null);
  const reduce = state.settings.reduceMotion;

  // Reveal story lines one at a time
  useEffect(() => {
    if (phase !== 'story') return;
    if (shown >= scenario.lines.length) {
      const t = setTimeout(() => setPhase('beat0'), reduce ? 0 : 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((n) => n + 1), reduce ? 60 : shown === 0 ? 300 : 900);
    return () => clearTimeout(t);
  }, [phase, shown, scenario.lines.length, reduce]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'end' });
  }, [shown, phase, picks.length, reduce]);

  const pick = (beat: 0 | 1, c: Choice) => {
    if (c.score >= 2) thud();
    else warn();
    const next = [...picks.slice(0, beat), c];
    setPicks(next);
    setPhase(beat === 0 ? 'result0' : 'result1');
  };

  const finish = () => {
    const [n, r] = completeScenario(state, scenario, picks);
    setState(() => n);
    setResult(r);
    success();
    onCelebrate(r);
    setPhase('outcome');
  };

  const beat1Prompt = () => {
    const b = scenario.beats[1];
    const t = picks[0]?.tone;
    return p((t && b.promptByTone?.[t]) || b.prompt);
  };

  const isChat = scenario.mode === 'chat';

  /* ---------------- Intro card ---------------- */
  if (phase === 'intro') {
    return (
      <Shell onClose={onExit} world={world.title} color={world.color}>
        <div className="flex-1 flex flex-col justify-center anim-rise">
          <div className="w-16 h-16 rounded-2xl grid place-items-center border" style={{ borderColor: `${world.color}66`, background: `${world.color}14`, color: world.color }}>
            <Icon name={world.icon} size={30} />
          </div>
          <Eyebrow color="text-muted">
            <span className="mt-6 block">{world.title}</span>
          </Eyebrow>
          <h1 className="mt-2 font-display font-black text-[40px] leading-[0.95] uppercase tracking-tight glitch">{scenario.title}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">{p(scenario.hook)}</p>
          <div className="mt-8">
            <div className="flex justify-between text-[11px] font-bold tracking-[0.2em] uppercase">
              <span className="text-muted">Chaos meter</span>
              <span className="text-pink">{['Low', 'Mild', 'Spicy', 'High', 'Critical'][scenario.chaos - 1]}</span>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-1.5" aria-label={`Chaos level ${scenario.chaos} of 5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-2.5 rounded-full" style={{ background: i <= scenario.chaos ? '#ff4b89' : 'rgba(255,255,255,0.08)', boxShadow: i <= scenario.chaos ? '0 0 10px #ff4b8988' : 'none' }} />
              ))}
            </div>
          </div>
        </div>
        <Button className="w-full" onClick={() => setPhase('story')}>
          Play
        </Button>
      </Shell>
    );
  }

  /* ---------------- Outcome ---------------- */
  if (phase === 'outcome') {
    const score = picks.reduce((n, c) => n + c.score, 0);
    const stars = result?.stars ?? (score >= 5 ? 3 : score >= 3 ? 2 : 1);
    const verdict = stars === 3 ? 'Main character energy' : stars === 2 ? 'Solid read' : 'Rough round';
    return (
      <Shell onClose={onExit} world={world.title} color={world.color}>
        <div className="flex-1 flex flex-col items-center justify-center text-center anim-pop pt-2">
          <Eyebrow color="text-muted">Round complete</Eyebrow>
          <div className="mt-4">
            <Stars n={stars} size={44} />
          </div>
          <h2 className="mt-4 font-display font-black text-3xl uppercase tracking-tight text-cyan neon-text-cyan">{verdict}</h2>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display font-black text-5xl tabular-nums">+{result?.auraGained ?? 0}</span>
            <span className="font-bold text-faint tracking-widest text-sm">AURA</span>
          </div>
          {result && result.levelAfter > result.levelBefore && (
            <div className="mt-3 px-4 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold font-display font-extrabold uppercase text-sm">
              Level up: LV {result.levelAfter} · {levelTitle(result.levelAfter)}
            </div>
          )}
          <div className="mt-8 w-full grid gap-2 text-left">
            {picks.map((c, i) => (
              <div key={i} className="rounded-2xl bg-panel border border-line p-4 flex gap-3 items-start">
                <span className="mt-1 w-2.5 h-2.5 rounded-full shrink-0" style={{ background: TONES[c.tone].color }} />
                <div className="flex-1">
                  <div className="text-[11px] font-bold tracking-widest uppercase text-faint">
                    Move {i + 1} · {TONES[c.tone].label} · {SKILLS[c.skill].name}
                  </div>
                  <div className="mt-1 text-sm text-text leading-snug">{p(c.text)}</div>
                </div>
                <span className="font-display font-black text-lg tabular-nums" style={{ color: c.score >= 2 ? '#00f5ff' : '#ff4b89' }}>
                  {c.score}/3
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full mt-6" onClick={() => setPhase('lesson')}>
          Skill drop
        </Button>
      </Shell>
    );
  }

  /* ---------------- Lesson ---------------- */
  if (phase === 'lesson') {
    const sk = SKILLS[scenario.lesson.skill];
    return (
      <Shell onClose={onExit} world={world.title} color={world.color}>
        <div className="flex-1 flex flex-col justify-center anim-rise">
          <Eyebrow color="text-muted">Skill drop</Eyebrow>
          <div className="mt-3 inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold" style={{ borderColor: `${sk.color}66`, color: sk.color, background: `${sk.color}12` }}>
            <span className="w-2 h-2 rounded-full" style={{ background: sk.color }} />
            {sk.name}
          </div>
          <h2 className="mt-4 font-display font-black text-[36px] leading-[1] uppercase tracking-tight">{scenario.lesson.title}</h2>
          <p className="mt-5 text-[17px] text-muted leading-relaxed">{p(scenario.lesson.body)}</p>
          <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/5 p-5">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-cyan">Try this IRL</div>
            <p className="mt-2 font-display font-bold text-xl leading-snug">{p(scenario.lesson.tryThis)}</p>
          </div>
        </div>
        <div className="grid gap-3 mt-6">
          {hasNext && (
            <Button className="w-full" onClick={onNext}>
              Next scenario
            </Button>
          )}
          <Button variant="ghost" className="w-full" onClick={onExit}>
            Back to map
          </Button>
        </div>
      </Shell>
    );
  }

  /* ---------------- Story + beats ---------------- */
  const beat0 = scenario.beats[0];
  return (
    <Shell onClose={() => setConfirmQuit(true)} world={world.title} color={world.color} title={isChat ? p(scenario.place) : undefined}>
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar -mx-1 px-1 pb-4" aria-live="polite">
        {!isChat && (
          <div className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-faint py-2">
            <Icon name="Map" size={12} className="inline mr-1 -mt-0.5" />
            {scenario.place}
          </div>
        )}
        <div className="grid gap-2.5 pt-2">
          {scenario.lines.slice(0, shown).map((l, i) => (
            <StoryLine key={i} line={{ ...l, text: p(l.text) }} chat={isChat} />
          ))}
          {phase === 'story' && shown < scenario.lines.length && <Typing />}
        </div>

        {picks[0] && <ChosenBubble text={p(picks[0].text)} />}
        {(phase === 'result0' || picks.length > 0) && picks[0] && <ResultCard choice={picks[0]} text={p(picks[0].result)} />}

        {(phase === 'beat1' || phase === 'result1') && (
          <div className="mt-6 anim-rise">
            <div className="flex items-center gap-3 my-3" aria-hidden>
              <div className="flex-1 h-px bg-line" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-faint">Round 2</span>
              <div className="flex-1 h-px bg-line" />
            </div>
            <p className="font-display font-bold text-lg leading-snug">{beat1Prompt()}</p>
          </div>
        )}
        {picks[1] && <ChosenBubble text={p(picks[1].text)} />}
        {phase === 'result1' && picks[1] && <ResultCard choice={picks[1]} text={p(picks[1].result)} />}
        <div ref={endRef} />
      </div>

      {/* Action area */}
      <div className="shrink-0 pt-2">
        {phase === 'beat0' && <ChoiceList prompt={p(beat0.prompt)} choices={choiceSets[0]} onPick={(c) => pick(0, c)} p={p} />}
        {phase === 'result0' && (
          <Button className="w-full" onClick={() => setPhase('beat1')}>
            Continue
          </Button>
        )}
        {phase === 'beat1' && <ChoiceList choices={choiceSets[1]} onPick={(c) => pick(1, c)} p={p} />}
        {phase === 'result1' && (
          <Button className="w-full" onClick={finish}>
            See results
          </Button>
        )}
      </div>

      {confirmQuit && (
        <div className="fixed inset-0 z-[90] bg-black/70 grid place-items-center px-6 anim-fade" role="alertdialog" aria-modal="true" aria-label="Quit scenario?">
          <div className="w-full max-w-sm rounded-3xl bg-panel border border-line p-6 anim-pop">
            <h3 className="font-display font-black text-2xl uppercase">Quit this round?</h3>
            <p className="mt-2 text-muted">Your choices in this scenario won’t be saved.</p>
            <div className="mt-6 grid gap-2">
              <Button variant="pink" onClick={onExit}>
                Quit
              </Button>
              <Button variant="ghost" onClick={() => setConfirmQuit(false)}>
                Keep playing
              </Button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children, onClose, world, color, title }: { children: ReactNode; onClose: () => void; world: string; color: string; title?: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-ink flex flex-col pt-safe pb-safe">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[320px] rounded-full blur-[110px] opacity-25 pointer-events-none" style={{ background: color }} />
      <div className="relative w-full max-w-lg mx-auto px-5 flex items-center justify-between h-14 shrink-0">
        <IconButton icon="X" label="Close scenario" onClick={onClose} />
        <div className="text-center">
          <div className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color }}>
            {world}
          </div>
          {title && <div className="font-display font-bold text-sm text-text truncate max-w-[200px]">{title}</div>}
        </div>
        <div className="w-11" />
      </div>
      <div className="relative flex-1 w-full max-w-lg mx-auto px-5 pb-3 flex flex-col min-h-0 overflow-y-auto no-scrollbar">{children}</div>
    </div>
  );
}

function StoryLine({ line, chat }: { line: { from: string; text: string; me?: boolean }; chat: boolean }) {
  if (!line.from) {
    return <p className="anim-rise text-center text-[15px] italic text-muted px-4 py-1 leading-relaxed">{line.text}</p>;
  }
  if (line.me) {
    return (
      <div className="anim-rise flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-cyan text-ink px-4 py-2.5 text-[15px] font-medium leading-snug">{line.text}</div>
      </div>
    );
  }
  const hue = [...line.from].reduce((n, ch) => n + ch.charCodeAt(0), 0) % 360;
  return (
    <div className="anim-rise flex gap-2.5 items-end">
      <div className="w-8 h-8 rounded-full grid place-items-center text-xs font-display font-black shrink-0" style={{ background: `hsl(${hue} 70% 22%)`, color: `hsl(${hue} 90% 75%)` }} aria-hidden>
        {line.from.replace('@', '')[0]?.toUpperCase()}
      </div>
      <div className="max-w-[78%]">
        <div className="text-[11px] font-bold text-faint mb-0.5 ml-1">{line.from}</div>
        <div className={`rounded-2xl rounded-bl-md px-4 py-2.5 text-[15px] leading-snug ${chat ? 'bg-panel-2' : 'bg-panel border border-line'}`}>{line.text}</div>
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex gap-1 px-4 py-3 w-16 rounded-2xl bg-panel-2 ml-10" aria-label="Typing">
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted" />
    </div>
  );
}

function ChosenBubble({ text }: { text: string }) {
  return (
    <div className="mt-4 flex justify-end anim-rise">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-cyan/15 border border-cyan/40 text-text px-4 py-2.5 text-[15px] leading-snug">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan mb-1">Your move</div>
        {text}
      </div>
    </div>
  );
}

function ResultCard({ choice, text }: { choice: Choice; text: string }) {
  const good = choice.score >= 2;
  const color = good ? '#00f5ff' : '#ff4b89';
  return (
    <div className="mt-3 rounded-2xl p-4 border anim-pop" style={{ borderColor: `${color}55`, background: `${color}0d` }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color }}>
          {choice.score === 3 ? 'Great read' : choice.score === 2 ? 'Good move' : choice.score === 1 ? 'Mixed results' : 'Backfired'}
        </span>
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-faint">
          {TONES[choice.tone].label} · +{choice.score} {SKILLS[choice.skill].short}
        </span>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed">{text}</p>
    </div>
  );
}

function ChoiceList({ prompt, choices, onPick, p }: { prompt?: string; choices: Choice[]; onPick: (c: Choice) => void; p: (s: string) => string }) {
  return (
    <div className="anim-rise">
      {prompt && <p className="font-display font-bold text-lg leading-snug mb-3">{prompt}</p>}
      <div className="grid gap-2 max-h-[52vh] overflow-y-auto no-scrollbar">
        {choices.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              tap();
              onPick(c);
            }}
            className="text-left rounded-2xl bg-panel border border-line px-4 py-3.5 text-[15px] leading-snug active:scale-[0.98] active:border-cyan hover:border-cyan/50 transition"
          >
            {p(c.text)}
          </button>
        ))}
      </div>
    </div>
  );
}
