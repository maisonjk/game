import { useEffect, useMemo, useRef, useState } from 'react';
import { completeDaily, dailyFor, levelTitle, liveStreak, localDate, personalize, type RunResult } from '../lib/game';
import { success, warn } from '../lib/haptics';
import { useGame } from '../lib/store';
import type { Choice } from '../types';
import { Icon } from './ui';
import { ResultCard } from './ScenarioPlayer';

function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const mins = Math.max(1, Math.ceil((midnight.getTime() - now.getTime()) / 60000));
  return { label: mins < 60 ? `${mins}m` : `${Math.floor(mins / 60)}h ${mins % 60}m`, today: localDate(now) };
}

export default function DailyScreen({ onBadges }: { onBadges: (r: RunResult) => void }) {
  const { state, setState } = useGame();
  const { label, today } = useCountdown();
  const daily = dailyFor(today);
  const done = state.daily.done[today] !== undefined;
  const pickedId = state.daily.picks?.[today];
  const picked = daily.choices.find((c) => c.id === pickedId) ?? null;
  const [run, setRun] = useState<RunResult | null>(null);
  const choices = useMemo(() => [...daily.choices].sort(() => Math.random() - 0.5), [daily.id]);
  const streak = liveStreak(state, today);
  const p = (t: string) => personalize(t, state.name);
  const resultRef = useRef<HTMLDivElement>(null);

  const pick = (c: Choice) => {
    if (done) return;
    c.score >= 2 ? success() : warn();
    const [n, r] = completeDaily(state, today, c);
    setState(() => n);
    setRun(r);
    onBadges(r);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: state.settings.reduceMotion ? 'auto' : 'smooth', block: 'start' }));
  };

  const week = Array.from({ length: 7 }).map((_, i) => {
    const [y, m, dd] = today.split('-').map(Number);
    const d = new Date(y, m - 1, dd - (6 - i));
    const key = localDate(d);
    return { key, label: d.toLocaleDateString(undefined, { weekday: 'narrow' }), done: state.daily.done[key] !== undefined, today: key === today };
  });
  const leveled = run && run.levelAfter > run.levelBefore;

  return (
    <div className="px-5 pt-5 pb-32 max-w-lg mx-auto">
      <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase">
        <span className="text-pink">Daily Chaos</span>
        <span className="text-muted flex items-center gap-1 tracking-wider">
          <Icon name="Clock" size={12} /> New in {label}
        </span>
      </div>
      <div className="mt-4 w-10 h-1.5 rounded-full bg-pink" />
      <h1 className="mt-3 font-display font-black text-[38px] leading-[0.95] uppercase tracking-tight">{daily.title}</h1>
      <p className="mt-3 text-[17px] leading-relaxed">{p(daily.setup)}</p>

      {!done && (
        <div className="mt-5 grid gap-2">
          {choices.map((c) => (
            <button
              key={c.id}
              onClick={() => pick(c)}
              className="text-left min-h-12 rounded-2xl bg-panel border border-line px-4 py-3.5 text-[15px] leading-snug active:scale-[0.98] active:border-pink transition"
            >
              {p(c.text)}
            </button>
          ))}
        </div>
      )}

      {done && (
        <div ref={resultRef} className="scroll-mt-20">
          {picked ? (
            <>
              <div className="mt-5 rounded-2xl rounded-br-md bg-pink/10 border border-pink/30 px-4 py-2.5 text-[15px] leading-snug">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-pink mb-1">Your call</div>
                {p(picked.text)}
              </div>
              <ResultCard choice={picked} text={p(picked.result)} />
            </>
          ) : (
            <div className="mt-5 rounded-2xl p-4 bg-panel border border-line text-sm text-muted">You made today’s call.</div>
          )}
          {run && run.auraGained > 0 && (
            <div className="mt-3 text-sm text-muted">
              <span className="font-display font-black text-text text-lg tabular-nums">+{run.auraGained}</span> aura
            </div>
          )}
          {leveled && (
            <div className="mt-4 rounded-3xl border border-gold/40 p-5 anim-pop" style={{ background: 'linear-gradient(135deg, #ffd16626, #161b2a 70%)' }}>
              <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-gold">Level up</div>
              <div className="mt-1 font-display font-black text-4xl leading-none">LV {run!.levelAfter}</div>
              <div className="mt-1 font-display font-bold">{levelTitle(run!.levelAfter)}</div>
            </div>
          )}
          <div className="mt-4 rounded-2xl border border-cyan/30 bg-cyan/5 p-4">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan">Takeaway</div>
            <p className="mt-1.5 font-display font-bold text-lg leading-snug">{daily.tip}</p>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl bg-panel border border-line p-4">
        <div className="flex items-center gap-2">
          <Icon name="Flame" size={18} className={streak ? 'text-pink fill-pink/40' : 'text-faint'} />
          <span className="font-display font-black text-lg tabular-nums">{streak}</span>
          <span className="text-sm text-muted">day streak · best {state.daily.bestStreak}</span>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1" role="img" aria-label={`Played ${week.filter((d) => d.done).length} of the last 7 days`}>
          {week.map((d) => (
            <div key={d.key} className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full grid place-items-center ${d.done ? 'bg-pink text-ink' : d.today ? 'border-2 border-pink/60' : 'bg-white/5'}`}>
                {d.done && <Icon name="Check" size={14} strokeWidth={3} />}
              </div>
              <span className={`text-[10px] font-bold ${d.today ? 'text-pink' : 'text-muted'}`}>{d.label}</span>
            </div>
          ))}
        </div>
        {done && (() => {
          const [y, m, dd] = today.split('-').map(Number);
          const tomorrow = dailyFor(localDate(new Date(y, m - 1, dd + 1)));
          return (
            <div className="mt-4 pt-4 border-t border-line flex items-center gap-3">
              <Icon name="Lock" size={16} className="text-muted shrink-0" />
              <p className="text-sm text-muted">
                Tomorrow: <span className="font-display font-extrabold text-text uppercase">{tomorrow.title}</span>. Come back to keep it going.
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
