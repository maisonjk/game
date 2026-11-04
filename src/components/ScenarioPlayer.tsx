import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { SCENARIOS_BY_WORLD, SKILLS, TONES, WORLDS } from '../data';
import { AURA_COLORS } from '../data/meta';
import { completeScenario, levelTitle, personalize, skipScenario, type RunResult } from '../lib/game';
import { success, thud, warn } from '../lib/haptics';
import { useGame } from '../lib/store';
import type { Choice, Scenario } from '../types';
import { Button, Icon, IconButton, Stars, useModal } from './ui';
import { CrisisCard } from './CrisisCard';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Reading time per line: short lines move fast, long narration gets room. */
const lineDelay = (text: string) => Math.min(2000, Math.max(600, 350 + text.length * 22));

export const RESULT_LABEL = (score: number) => (score === 3 ? 'Landed' : score === 2 ? 'Worked' : score === 1 ? 'Mixed' : 'Didn’t land');
export const RESULT_COLOR = (score: number) => (score >= 2 ? '#00f5ff' : score === 1 ? '#ffd166' : '#ff4b89');

type Phase = 'intro' | 'story' | 'beat0' | 'result0' | 'beat1' | 'result1' | 'outcome' | 'lesson';

export default function ScenarioPlayer({
  scenario,
  onExit,
  onNext,
  next,
  lockedNext,
  onPaywall,
  autoStart,
}: {
  scenario: Scenario;
  onExit: () => void;
  onNext: (s: Scenario) => void;
  next: Scenario | null;
  lockedNext: Scenario | null;
  onPaywall: () => void;
  autoStart?: boolean;
}) {
  const { state, setState } = useGame();
  const world = WORLDS.find((w) => w.id === scenario.world)!;
  const index = SCENARIOS_BY_WORLD[scenario.world].findIndex((s) => s.id === scenario.id) + 1;
  const p = useCallback((t: string) => personalize(t, state.name), [state.name]);
  const replay = !!state.records[scenario.id];
  const instant = state.settings.reduceMotion || replay;
  const firstEver = Object.keys(state.records).length === 0;

  const [phase, setPhase] = useState<Phase>(autoStart && !scenario.sensitive ? 'story' : 'intro');
  const [shown, setShown] = useState(instant && autoStart ? scenario.lines.length : 0);
  const [picks, setPicks] = useState<Choice[]>([]);
  const [result, setResult] = useState<RunResult | null>(null);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const choiceSets = useMemo(() => scenario.beats.map((b) => shuffle(b.choices)), [scenario]);
  const promptRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const startStory = () => {
    setShown(instant ? scenario.lines.length : 0);
    setPhase('story');
  };

  // Reveal lines one at a time, paced by length
  useEffect(() => {
    if (phase !== 'story') return;
    if (shown >= scenario.lines.length) {
      const t = setTimeout(() => setPhase('beat0'), instant ? 0 : 350);
      return () => clearTimeout(t);
    }
    const prev = shown === 0 ? '' : scenario.lines[shown - 1].text;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 250 : lineDelay(prev));
    return () => clearTimeout(t);
  }, [phase, shown, scenario.lines, instant]);

  const advance = () => {
    if (phase === 'story' && shown < scenario.lines.length) setShown((n) => n + 1);
  };

  // Keep the eye where the action is
  useEffect(() => {
    const behavior: ScrollBehavior = state.settings.reduceMotion ? 'auto' : 'smooth';
    if (phase === 'beat0' || phase === 'beat1') promptRef.current?.scrollIntoView({ behavior, block: 'start' });
    else if (phase === 'result0' || phase === 'result1') resultRef.current?.scrollIntoView({ behavior, block: 'center' });
    else if (phase === 'story') endRef.current?.scrollIntoView({ behavior, block: 'end' });
  }, [phase, shown, state.settings.reduceMotion]);

  const pick = (beat: 0 | 1, c: Choice) => {
    if (c.score >= 2) thud();
    else warn();
    setPicks((prev) => [...prev.slice(0, beat), c]);
    setPhase(beat === 0 ? 'result0' : 'result1');
  };

  const finish = () => {
    const [n, r] = completeScenario(state, scenario, picks);
    setState(() => n);
    setResult(r);
    if (!scenario.sensitive) success();
    setPhase('outcome');
  };

  const skip = () => {
    setState((s) => skipScenario(s, scenario));
    onExit();
  };

  const tryClose = () => {
    if (picks.length > 0 && phase !== 'outcome' && phase !== 'lesson') setConfirmQuit(true);
    else onExit();
  };

  const beat1Prompt = () => {
    const b = scenario.beats[1];
    const first = picks[0];
    return p((first && b.promptByChoice?.[first.id]) || (first && b.promptByTone?.[first.tone]) || b.prompt);
  };
  const isChat = scenario.mode === 'chat';

  /* ---------------- Intro ---------------- */
  if (phase === 'intro') {
    return (
      <Shell page="intro" onClose={onExit} world={world.title} color={world.color}
        footer={
          scenario.sensitive ? (
            <div className="grid gap-2">
              <Button className="w-full" onClick={startStory}>Play</Button>
              <Button variant="ghost" className="w-full" onClick={skip}>Skip for now</Button>
            </div>
          ) : (
            <Button className="w-full" onClick={startStory}>Play</Button>
          )
        }>
        <div className="flex-1 flex flex-col justify-end pb-8 anim-rise min-h-[60vh]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl grid place-items-center border" style={{ borderColor: `${world.color}66`, background: `${world.color}14`, color: world.color }}>
              <Icon name={world.icon} size={24} />
            </div>
            <span className="font-display font-bold text-sm tabular-nums tracking-[0.2em] text-muted">
              {String(index).padStart(2, '0')} / {String(SCENARIOS_BY_WORLD[scenario.world].length).padStart(2, '0')}
            </span>
          </div>
          <div className="mt-8 w-10 h-1.5 rounded-full" style={{ background: world.color }} />
          <h1 className="mt-4 font-display font-black text-[42px] leading-[0.92] uppercase tracking-tight">{scenario.title}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">{p(scenario.hook)}</p>
          {scenario.sensitive ? (
            <div className="mt-8 rounded-2xl border border-mint/30 bg-mint/5 p-4 flex gap-3">
              <Icon name="LifeBuoy" size={20} className="text-mint shrink-0 mt-0.5" />
              <p className="text-[15px] text-text leading-relaxed">
                <span className="font-semibold">Heads up.</span> {scenario.careNote} You can skip it and keep going.
              </p>
            </div>
          ) : (
            <div className="mt-8" role="img" aria-label={`Chaos level ${scenario.chaos} of 5`}>
              <div className="flex justify-between text-[11px] font-bold tracking-[0.2em] uppercase">
                <span className="text-muted">Chaos meter</span>
                <span className="text-pink">{['Low', 'Mild', 'Spicy', 'High', 'Critical'][scenario.chaos - 1]}</span>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-2.5 rounded-full" style={{ background: i <= scenario.chaos ? '#ff4b89' : 'rgba(255,255,255,0.08)' }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Shell>
    );
  }

  /* ---------------- Outcome ---------------- */
  if (phase === 'outcome') {
    const score = picks.reduce((n, c) => n + c.score, 0);
    const stars = result?.stars ?? 1;
    const verdict = stars === 3 ? 'Main character energy' : stars === 2 ? 'Solid read' : 'Rough round';
    const verdictColor = stars === 3 ? '#00f5ff' : stars === 2 ? '#e6e9f5' : '#a3adc2';
    const leveled = result && result.levelAfter > result.levelBefore;
    const newColor = leveled ? AURA_COLORS.find((c) => c.level > result!.levelBefore && c.level <= result!.levelAfter) : undefined;
    const footer = (
      <div className="grid gap-2">
        <Button className="w-full" onClick={() => setPhase('lesson')}>Skill drop</Button>
        {!scenario.sensitive && stars < 3 && (
          <Button variant="ghost" className="w-full" onClick={() => { setPicks([]); setResult(null); startStory(); }}>
            Replay for 3 stars
          </Button>
        )}
      </div>
    );
    return (
      <Shell page="outcome" onClose={onExit} world={world.title} color={world.color} footer={footer}>
        <div className="flex flex-col items-center text-center anim-pop pt-4">
          <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted">Scenario complete</div>
          {scenario.sensitive ? (
            <>
              <h2 className="mt-5 font-display font-black text-3xl uppercase tracking-tight">You showed up.</h2>
              <p className="mt-3 text-muted leading-relaxed max-w-sm">
                Conversations like this are hard, and there’s no score for them. Being there and bringing in a trusted adult is what matters.
              </p>
              <div className="mt-6 w-full text-left">
                <CrisisCard />
              </div>
            </>
          ) : (
            <>
              <div className="mt-4"><Stars n={stars} size={40} /></div>
              <h2 className="mt-4 font-display font-black text-3xl uppercase tracking-tight" style={{ color: verdictColor }}>{verdict}</h2>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display font-black text-5xl tabular-nums">+{result?.auraGained ?? 0}</span>
                <span className="font-bold text-faint tracking-widest text-sm">AURA</span>
              </div>
              {result && !result.firstClear && !result.newBest && <div className="mt-1 text-xs text-faint">Practice run · aura only for a new best</div>}
              <div className="mt-1 text-xs text-faint tabular-nums">{score}/6 points</div>
            </>
          )}

          {!scenario.sensitive && (
            <div className="mt-6 w-full grid gap-2 text-left">
              {picks.map((c, i) => {
                const best = scenario.beats[i].choices.filter((x) => x.score === 3).sort((a, b) => a.text.length - b.text.length)[0];
                return (
                  <div key={i} className="rounded-2xl bg-panel border border-line p-4">
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <div className="text-[11px] font-bold tracking-widest uppercase text-muted">
                          Move {i + 1} · <span style={{ color: TONES[c.tone].color }}>{TONES[c.tone].label}</span> · {SKILLS[c.skill].name}
                        </div>
                        <div className="mt-1 text-[15px] leading-snug">{p(c.text)}</div>
                      </div>
                      <span className="font-display font-black text-lg tabular-nums" style={{ color: RESULT_COLOR(c.score) }}>{c.score}/3</span>
                    </div>
                    {c.score < 3 && best && (
                      <details className="mt-3 group" open>
                        <summary className="cursor-pointer list-none text-sm font-semibold text-cyan flex items-center gap-1 min-h-11">
                          <Icon name="ChevronRight" size={16} className="transition group-open:rotate-90" /> See a higher-EQ move
                        </summary>
                        <div className="mt-1 pl-5 border-l-2 border-cyan/40">
                          <div className="text-[11px] font-bold tracking-widest uppercase" style={{ color: TONES[best.tone].color }}>{TONES[best.tone].label}</div>
                          <p className="mt-1 text-[15px] leading-snug">{p(best.text)}</p>
                          <p className="mt-1 text-sm text-muted leading-snug">{p(best.result)}</p>
                        </div>
                      </details>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {leveled && (
            <div className="mt-6 w-full rounded-3xl border border-gold/40 p-5 anim-pop" style={{ background: 'linear-gradient(135deg, #ffd16626, #161b2a 70%)' }}>
              <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-gold">Level up</div>
              <div className="mt-1 font-display font-black text-5xl leading-none">LV {result!.levelAfter}</div>
              <div className="mt-1 font-display font-bold text-lg">{levelTitle(result!.levelAfter)}</div>
              {newColor && (
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
                  <span className="w-4 h-4 rounded-full" style={{ background: newColor.color }} /> New aura color: {newColor.name}
                </div>
              )}
            </div>
          )}
          {!scenario.sensitive && result && result.newBadges.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {result.newBadges.map((b) => (
                <span key={b.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-sm font-semibold">
                  <Icon name={b.icon} size={14} /> New badge: {b.title}
                </span>
              ))}
            </div>
          )}

        </div>
      </Shell>
    );
  }

  /* ---------------- Lesson ---------------- */
  if (phase === 'lesson') {
    const sk = SKILLS[scenario.lesson.skill];
    const lockedWorld = lockedNext ? WORLDS.find((w) => w.id === lockedNext.world)! : null;
    const footer = (
      <div className="grid gap-2">
        {next ? (
          <Button className="w-full" onClick={() => onNext(next)}>Next: {next.title}</Button>
        ) : null}
        <Button variant={next ? 'ghost' : 'primary'} className="w-full" onClick={onExit}>Back to map</Button>
      </div>
    );
    return (
      <Shell page="lesson" onClose={onExit} world={world.title} color={world.color} footer={footer}>
        <div className="pt-6 anim-rise">
          <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted">Skill drop</div>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold" style={{ borderColor: `${sk.color}66`, color: sk.color, background: `${sk.color}12` }}>
            <span className="w-2 h-2 rounded-full" style={{ background: sk.color }} />
            {sk.name}
          </div>
          <h2 className="mt-4 font-display font-black text-[36px] leading-[0.95] uppercase tracking-tight">{scenario.lesson.title}</h2>
          <p className="mt-5 text-[17px] text-muted leading-relaxed">{p(scenario.lesson.body)}</p>
          <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/5 p-5">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-cyan">Try this IRL</div>
            <p className="mt-2 font-display font-bold text-xl leading-snug">{p(scenario.lesson.tryThis)}</p>
          </div>
          {lockedNext && lockedWorld && !state.unlocked && (
            <div className="mt-6 rounded-2xl border border-gold/30 p-5" style={{ background: 'linear-gradient(135deg, #ffd16618, #161b2a 70%)' }}>
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold">Next in {lockedWorld.title}</div>
              <div className="mt-1 font-display font-extrabold text-xl flex items-center gap-2">
                {lockedNext.title} <Icon name="Lock" size={16} className="text-faint" />
              </div>
              <p className="mt-1 text-sm text-muted">{lockedNext.hook}</p>
              <Button variant="outline" className="w-full mt-4" onClick={onPaywall}>See what’s in the full game</Button>
            </div>
          )}
        </div>
      </Shell>
    );
  }

  /* ---------------- Story + beats (one scroll) ---------------- */
  const showBeat1 = phase === 'beat1' || phase === 'result1';
  const footer =
    phase === 'result0' ? (
      <Button className="w-full" onClick={() => setPhase('beat1')}>Continue</Button>
    ) : phase === 'result1' ? (
      <Button className="w-full" onClick={finish}>See results</Button>
    ) : null;

  return (
    <Shell onClose={tryClose} world={world.title} color={world.color} title={isChat ? p(scenario.place) : undefined} footer={footer} onTapBody={advance}>
      <div aria-live="polite" className="pb-4">
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
          {phase === 'story' && firstEver && shown < scenario.lines.length && (
            <div className="text-center text-[11px] text-faint pt-1">Tap to skip ahead</div>
          )}
        </div>

        {phase === 'beat0' && <Prompt refEl={promptRef} n={1} text={p(scenario.beats[0].prompt)} />}
        {phase === 'beat0' && <ChoiceList choices={choiceSets[0]} onPick={(c) => pick(0, c)} p={p} />}
        {picks[0] && (
          <>
            <ChosenBubble text={p(picks[0].text)} />
            <div ref={resultRef}><ResultCard choice={picks[0]} text={p(picks[0].result)} neutral={scenario.sensitive} /></div>
          </>
        )}

        {showBeat1 && <Prompt refEl={promptRef} n={2} text={beat1Prompt()} divider />}
        {phase === 'beat1' && <ChoiceList choices={choiceSets[1]} onPick={(c) => pick(1, c)} p={p} />}
        {picks[1] && phase === 'result1' && (
          <>
            <ChosenBubble text={p(picks[1].text)} />
            <div ref={resultRef}><ResultCard choice={picks[1]} text={p(picks[1].result)} neutral={scenario.sensitive} /></div>
          </>
        )}
        <div ref={endRef} />
      </div>

      {confirmQuit && (
        <div className="fixed inset-0 z-[90] bg-black/70 grid place-items-center px-6 anim-fade" role="alertdialog" aria-modal="true" aria-label="Quit scenario?">
          <div className="w-full max-w-sm rounded-3xl bg-panel border border-line p-6 anim-pop">
            <h3 className="font-display font-black text-2xl uppercase">Quit this round?</h3>
            <p className="mt-2 text-muted">The moves you’ve made in this scenario won’t be saved.</p>
            <div className="mt-6 grid gap-2">
              <Button variant="pink" onClick={onExit}>Quit</Button>
              <Button variant="ghost" onClick={() => setConfirmQuit(false)}>Keep playing</Button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children, onClose, world, color, title, footer, onTapBody, page = 'play' }: { children: ReactNode; onClose: () => void; world: string; color: string; title?: string; footer?: ReactNode; onTapBody?: () => void; page?: string }) {
  const dialog = useRef<HTMLDivElement>(null);
  useModal(true, dialog, 'chrome');
  return (
    <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${world}${title ? `: ${title}` : ''}`} className="fixed inset-0 z-50 bg-ink flex flex-col pt-safe outline-none">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[320px] rounded-full blur-[110px] opacity-25 pointer-events-none" style={{ background: color }} />
      <div className="relative w-full max-w-lg mx-auto px-4 flex items-center justify-between h-14 shrink-0">
        <IconButton icon="X" label="Close scenario" onClick={onClose} />
        <div className="text-center min-w-0">
          <div className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color }}>{world}</div>
          {title && <div className="font-display font-bold text-sm text-text truncate max-w-[200px]">{title}</div>}
        </div>
        <div className="w-11" />
      </div>
      <div key={page} className="relative flex-1 min-h-0 overflow-y-auto no-scrollbar" onClick={onTapBody}>
        <div className="w-full max-w-lg mx-auto px-5 min-h-full flex flex-col">{children}</div>
      </div>
      {footer && (
        <div className="relative shrink-0 bg-gradient-to-t from-ink via-ink to-ink/80 pt-3 pb-safe">
          <div className="w-full max-w-lg mx-auto px-5">{footer}</div>
        </div>
      )}
      {!footer && <div className="pb-safe shrink-0" />}
    </div>
  );
}

function Prompt({ refEl, n, text, divider }: { refEl: React.RefObject<HTMLDivElement | null>; n: number; text: string; divider?: boolean }) {
  return (
    <div ref={refEl} className="mt-6 scroll-mt-3 anim-rise">
      {divider && <div className="h-px bg-line mb-5" aria-hidden />}
      <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-cyan">Your move · {n}/2</div>
      <p className="mt-1.5 font-display font-bold text-xl leading-snug">{text}</p>
    </div>
  );
}

function StoryLine({ line, chat }: { line: { from: string; text: string; me?: boolean }; chat: boolean }) {
  if (!line.from) return <p className="anim-rise text-center text-[15px] italic text-muted px-4 py-1 leading-relaxed">{line.text}</p>;
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
        <div className="text-[11px] font-bold text-muted mb-0.5 ml-1">{line.from}</div>
        <div className={`rounded-2xl rounded-bl-md px-4 py-2.5 text-[15px] leading-snug ${chat ? 'bg-panel-2' : 'bg-panel border border-line'}`}>{line.text}</div>
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex gap-1 px-4 py-3 w-16 rounded-2xl bg-panel-2 ml-10" role="status" aria-label="Typing">
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted" />
    </div>
  );
}

function ChosenBubble({ text }: { text: string }) {
  return (
    <div className="mt-5 flex justify-end anim-rise">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-cyan/15 border border-cyan/40 text-text px-4 py-2.5 text-[15px] leading-snug">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan mb-1">Your move</div>
        {text}
      </div>
    </div>
  );
}

export function ResultCard({ choice, text, neutral }: { choice: Choice; text: string; neutral?: boolean }) {
  const color = neutral ? '#a3adc2' : RESULT_COLOR(choice.score);
  return (
    <div className="mt-3 rounded-2xl p-4 border anim-pop" style={{ borderColor: `${color}55`, background: `${color}0d` }}>
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color }}>{neutral ? 'What happened' : RESULT_LABEL(choice.score)}</span>
      <p className="mt-1.5 text-[15px] leading-relaxed">{text}</p>
    </div>
  );
}

function ChoiceList({ choices, onPick, p }: { choices: Choice[]; onPick: (c: Choice) => void; p: (s: string) => string }) {
  // Ignore taps for a moment after choices appear, so tap-to-skip can't pick a move by accident.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 450);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="mt-4 grid gap-2 anim-rise">
      {choices.map((c) => (
        <button
          key={c.id}
          onClick={(e) => {
            e.stopPropagation();
            if (armed) onPick(c);
          }}
          className="text-left min-h-12 rounded-2xl bg-panel border border-line px-4 py-3.5 text-[15px] leading-snug active:scale-[0.98] active:border-cyan hover:border-cyan/50 transition"
        >
          {p(c.text)}
        </button>
      ))}
    </div>
  );
}
