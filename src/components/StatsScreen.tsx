import { ARCHETYPES, SCENARIOS, SKILLS, SKILL_ORDER, TONES } from '../data';
import { levelProgress, levelTitle, liveStreak, playStyle } from '../lib/game';
import { useGame } from '../lib/store';
import type { Tone } from '../types';
import { Bar, Card, Eyebrow } from './ui';

function Radar({ values, max }: { values: number[]; max: number }) {
  const size = 220;
  const c = size / 2;
  const r = 70;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    return [c + Math.cos(a) * r * v, c + Math.sin(a) * r * v];
  };
  const poly = values.map((v, i) => pt(i, max ? Math.max(0.06, v / max) : 0.06).join(',')).join(' ');
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[240px] mx-auto" role="img" aria-label="Skill radar chart">
      {[0.25, 0.5, 0.75, 1].map((k) => (
        <polygon key={k} points={values.map((_, i) => pt(i, k).join(',')).join(' ')} fill="none" stroke="rgba(255,255,255,0.08)" />
      ))}
      {values.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" />;
      })}
      <polygon points={poly} fill="rgba(0,245,255,0.18)" stroke="#00f5ff" strokeWidth="2" strokeLinejoin="round" />
      {SKILL_ORDER.map((k, i) => {
        const [x, y] = pt(i, 1.3);
        return (
          <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={SKILLS[k].color} fontSize="9" fontWeight="700" letterSpacing="1">
            {SKILLS[k].short}
          </text>
        );
      })}
    </svg>
  );
}

export default function StatsScreen() {
  const { state } = useGame();
  const lp = levelProgress(state.aura);
  const style = playStyle(state);
  const arch = ARCHETYPES.find((a) => a.id === state.archetype);
  const vals = SKILL_ORDER.map((k) => state.skills[k]);
  const max = Math.max(12, ...vals);
  const toneTotal = Object.values(state.tones).reduce((a, b) => a + b, 0);
  const cleared = Object.keys(state.records).length;
  const stars = Object.values(state.records).reduce((n, r) => n + r.stars, 0);

  return (
    <div className="px-4 pt-5 pb-28 max-w-lg mx-auto">
      <Eyebrow>Your stats</Eyebrow>
      <h1 className="mt-1 font-display font-black text-[34px] leading-none uppercase tracking-tight">EQ Profile</h1>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          { k: 'Level', v: lp.level, s: levelTitle(lp.level) },
          { k: 'Cleared', v: `${cleared}`, s: `of ${SCENARIOS.length}` },
          { k: 'Stars', v: stars, s: `of ${SCENARIOS.length * 3}` },
        ].map((x) => (
          <Card key={x.k} className="p-3.5">
            <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-faint">{x.k}</div>
            <div className="mt-1 font-display font-black text-3xl tabular-nums leading-none">{x.v}</div>
            <div className="mt-1 text-[11px] text-muted truncate">{x.s}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-lg uppercase">Skills</h2>
          <span className="text-xs text-faint">from {toneTotal} choices</span>
        </div>
        {toneTotal === 0 ? (
          <p className="mt-3 text-sm text-muted">Play your first scenario to see your skill map.</p>
        ) : (
          <div className="mt-2">
            <Radar values={vals} max={max} />
          </div>
        )}
        <div className="mt-3 grid gap-3">
          {SKILL_ORDER.map((k) => (
            <div key={k}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{SKILLS[k].name}</span>
                <span className="text-faint tabular-nums font-bold">{state.skills[k]}</span>
              </div>
              <Bar pct={state.skills[k] / max} color={SKILLS[k].color} className="mt-1.5" />
              <p className="mt-1 text-[12px] text-muted">{SKILLS[k].blurb}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-3 p-5">
        <h2 className="font-display font-extrabold text-lg uppercase">Play style</h2>
        {style ? (
          <>
            <p className="mt-2 text-muted text-sm leading-relaxed">
              You picked <span className="text-text font-semibold">{arch?.title ?? 'no archetype'}</span>. You actually play like{' '}
              <span className="font-semibold" style={{ color: TONES[style.tone].color }}>
                {TONES[style.tone].style}
              </span>{' '}
              ({style.pct}% of your moves).
            </p>
            <div className="mt-4 h-3 rounded-full overflow-hidden flex" aria-hidden>
              {(Object.keys(TONES) as Tone[]).map((t) => (
                <div key={t} style={{ width: `${(state.tones[t] / toneTotal) * 100}%`, background: TONES[t].color }} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.keys(TONES) as Tone[]).map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: TONES[t].color }} />
                  <span className="text-muted">{TONES[t].label}</span>
                  <span className="ml-auto font-bold tabular-nums">{Math.round((state.tones[t] / toneTotal) * 100)}%</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted">Make a few choices and your real play style shows up here.</p>
        )}
      </Card>

      <Card className="mt-3 p-5 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-faint">Daily streak</div>
          <div className="mt-1 font-display font-black text-2xl">{liveStreak(state)} {liveStreak(state) === 1 ? 'day' : 'days'}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-faint">Total aura</div>
          <div className="mt-1 font-display font-black text-2xl text-cyan tabular-nums">{state.aura}</div>
        </div>
      </Card>
    </div>
  );
}
