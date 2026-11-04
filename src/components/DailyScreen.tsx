import { useEffect, useMemo, useState } from 'react';
import { SKILLS, TONES } from '../data';
import { completeDaily, dailyFor, liveStreak, localDate, personalize, type RunResult } from '../lib/game';
import { success, tap, warn } from '../lib/haptics';
import { useGame } from '../lib/store';
import type { Choice } from '../types';
import { Card, Eyebrow, Icon } from './ui';

function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const mins = Math.max(0, Math.round((midnight.getTime() - now.getTime()) / 60000));
  return { label: `${Math.floor(mins / 60)}h ${mins % 60}m`, today: localDate(now) };
}

export default function DailyScreen({ onCelebrate }: { onCelebrate: (r: RunResult) => void }) {
  const { state, setState } = useGame();
  const { label, today } = useCountdown();
  const daily = dailyFor(today);
  const doneScore = state.daily.done[today];
  const done = doneScore !== undefined;
  const [picked, setPicked] = useState<Choice | null>(null);
  const choices = useMemo(() => [...daily.choices].sort(() => Math.random() - 0.5), [daily.id]);
  const streak = liveStreak(state, today);
  const p = (t: string) => personalize(t, state.name);

  const pick = (c: Choice) => {
    if (done) return;
    c.score >= 2 ? success() : warn();
    setPicked(c);
    const [n, r] = completeDaily(state, today, c);
    setState(() => n);
    onCelebrate(r);
  };

  // Last 7 days strip
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = localDate(d);
    return { key, label: d.toLocaleDateString(undefined, { weekday: 'narrow' }), done: state.daily.done[key] !== undefined, today: key === today };
  });

  return (
    <div className="px-4 pt-5 pb-28 max-w-lg mx-auto">
      <Eyebrow color="text-pink">Daily Chaos</Eyebrow>
      <div className="mt-1 flex items-end justify-between">
        <h1 className="font-display font-black text-[34px] leading-none uppercase tracking-tight">One call. Every day.</h1>
      </div>

      <Card className="mt-5 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl grid place-items-center bg-pink/15 text-pink border border-pink/30 shrink-0">
            <Icon name="Flame" size={24} className={streak ? 'fill-pink/40' : ''} />
          </div>
          <div className="flex-1">
            <div className="font-display font-black text-2xl tabular-nums leading-none whitespace-nowrap">
              {streak} <span className="text-base text-muted font-bold">day streak</span>
            </div>
            <div className="text-xs text-faint mt-1">Best: {state.daily.bestStreak}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1" aria-label="Last 7 days">
          {week.map((d) => (
            <div key={d.key} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full grid place-items-center ${d.done ? 'bg-pink text-white' : d.today ? 'border-2 border-pink/60' : 'bg-white/5'}`}>
                {d.done && <Icon name="Check" size={15} strokeWidth={3} />}
              </div>
              <span className={`text-[10px] font-bold ${d.today ? 'text-pink' : 'text-faint'}`}>{d.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-5 rounded-3xl border border-pink/30 p-5 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #ff4b8922, #161b2a 55%)' }}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-pink">Today</span>
          <span className="text-[11px] font-bold tracking-wider text-faint flex items-center gap-1">
            <Icon name="Clock" size={12} /> New in {label}
          </span>
        </div>
        <h2 className="mt-3 font-display font-black text-3xl uppercase leading-none glitch">{daily.title}</h2>
        <p className="mt-3 text-[17px] leading-relaxed">{p(daily.setup)}</p>

        {!done && (
          <div className="mt-5 grid gap-2">
            {choices.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  tap();
                  pick(c);
                }}
                className="text-left rounded-2xl bg-ink/60 border border-line px-4 py-3.5 text-[15px] leading-snug active:scale-[0.98] active:border-pink transition"
              >
                {p(c.text)}
              </button>
            ))}
          </div>
        )}

        {done && (
          <div className="mt-5 anim-pop">
            {picked ? (
              <div className="rounded-2xl p-4 border" style={{ borderColor: picked.score >= 2 ? '#00f5ff55' : '#ff4b8955', background: picked.score >= 2 ? '#00f5ff0d' : '#ff4b890d' }}>
                <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase">
                  <span style={{ color: picked.score >= 2 ? '#00f5ff' : '#ff4b89' }}>{picked.score === 3 ? 'Great read' : picked.score === 2 ? 'Good move' : picked.score === 1 ? 'Mixed results' : 'Backfired'}</span>
                  <span className="text-faint">
                    {TONES[picked.tone].label} · +{picked.score} {SKILLS[picked.skill].short}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed">{p(picked.result)}</p>
              </div>
            ) : (
              <div className="rounded-2xl p-4 bg-ink/50 border border-line text-sm text-muted">You already made today’s call. Score: {doneScore}/3.</div>
            )}
            <div className="mt-4 rounded-2xl border border-cyan/30 bg-cyan/5 p-4">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan">Takeaway</div>
              <p className="mt-1.5 font-display font-bold text-lg leading-snug">{daily.tip}</p>
            </div>
            <p className="mt-4 text-center text-sm text-muted">Come back tomorrow to keep the streak alive.</p>
          </div>
        )}
      </div>
    </div>
  );
}
