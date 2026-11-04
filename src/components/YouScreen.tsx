import { useState } from 'react';
import { ARCHETYPES, AURA_COLORS, SCENARIOS, SKILLS, SKILL_ORDER, TONES } from '../data';
import { BADGES, STYLE_MIN_MOVES, levelFromAura, levelTitle, playStyle, totalMoves } from '../lib/game';
import { useGame } from '../lib/store';
import { tap } from '../lib/haptics';
import type { ArchetypeId, Tone } from '../types';
import { Radar } from './StatsScreen';
import { Avatar, Bar, Button, Card, Icon, Sheet } from './ui';

export default function YouScreen({ onSettings }: { onSettings: () => void }) {
  const { state, setState } = useGame();
  const level = levelFromAura(state.aura);
  const arch = ARCHETYPES.find((a) => a.id === state.archetype);
  const style = playStyle(state);
  const moves = totalMoves(state);
  const [editing, setEditing] = useState(false);
  const [allBadges, setAllBadges] = useState(false);
  const [name, setName] = useState(state.name);
  const [arc, setArc] = useState<ArchetypeId | null>(state.archetype);
  const earned = BADGES.filter((b) => b.check(state));
  const cleared = Object.keys(state.records).length;
  const stars = Object.values(state.records).reduce((n, r) => n + r.stars, 0);
  const vals = SKILL_ORDER.map((k) => state.skills[k]);
  const max = Math.max(12, ...vals);
  const owned = (c: { color: string; level: number }) => level >= c.level;

  return (
    <div className="px-5 pt-5 pb-32 max-w-lg mx-auto">
      {/* Player card */}
      <Card className="p-5 relative overflow-hidden">
        <div className="absolute -top-20 -left-10 w-72 h-48 rounded-full blur-[80px] opacity-25 pointer-events-none" style={{ background: state.auraColor }} />
        <div className="relative flex items-center gap-4">
          <Avatar name={state.name} color={state.auraColor} emoji={arch?.emoji} size={76} />
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight truncate">{state.name || 'Player'}</h1>
            <div className="text-sm text-muted">LV {level} · {levelTitle(level)}</div>
            <button
              onClick={() => { tap(); setName(state.name); setArc(state.archetype); setEditing(true); }}
              className="mt-2 min-h-11 -ml-1 px-1 text-sm font-semibold text-cyan flex items-center gap-1.5"
            >
              <Icon name="Pencil" size={14} /> Edit player
            </button>
          </div>
          <button aria-label="Settings" onClick={() => { tap(); onSettings(); }} className="self-start w-11 h-11 grid place-items-center rounded-full bg-white/5 border border-line active:scale-95">
            <Icon name="Settings" size={19} />
          </button>
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { k: 'Aura', v: state.aura },
            { k: 'Cleared', v: `${cleared}/${SCENARIOS.length}` },
            { k: 'Stars', v: stars },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl bg-ink/50 border border-line py-3">
              <div className="font-display font-black text-2xl tabular-nums leading-none">{x.v}</div>
              <div className="mt-1 text-[10px] font-bold tracking-[0.18em] uppercase text-muted">{x.k}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Play style */}
      <SectionTitle>Play style</SectionTitle>
      <Card className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted">You said</div>
            <div className="mt-1 font-display font-extrabold leading-tight" style={{ color: arch?.color }}>{arch?.emoji} {arch?.title}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted">You play</div>
            {style ? (
              <div className="mt-1 font-display font-extrabold leading-tight" style={{ color: TONES[style.tone].color }}>
                {TONES[style.tone].style}
                {style.second && <span className="block text-sm font-semibold text-muted">with a {TONES[style.second].label} streak</span>}
              </div>
            ) : (
              <div className="mt-1 text-sm text-muted">{STYLE_MIN_MOVES - moves} more moves to reveal</div>
            )}
          </div>
        </div>
        {style ? (
          <>
            <div className="mt-4 h-3 rounded-full overflow-hidden flex" aria-hidden>
              {(Object.keys(TONES) as Tone[]).map((t) => (
                <div key={t} style={{ width: `${(state.tones[t] / moves) * 100}%`, background: TONES[t].color }} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {(Object.keys(TONES) as Tone[]).map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: TONES[t].color }} />
                  <span className="text-muted">{TONES[t].label}</span>
                  <span className="ml-auto font-bold tabular-nums">{Math.round((state.tones[t] / moves) * 100)}%</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Bar pct={moves / STYLE_MIN_MOVES} className="mt-4" color="#a3adc2" />
        )}
      </Card>

      {/* Skills */}
      <SectionTitle>Skills</SectionTitle>
      <Card className="p-5">
        {moves === 0 ? <p className="text-sm text-muted">Play your first scenario to see your skill map.</p> : <Radar values={vals} max={max} />}
        <div className="mt-3 grid gap-3">
          {SKILL_ORDER.map((k) => (
            <div key={k}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{SKILLS[k].name}</span>
                <span className="text-muted tabular-nums font-bold">{state.skills[k]}</span>
              </div>
              <Bar pct={state.skills[k] / max} color={SKILLS[k].color} className="mt-1.5" />
              <p className="mt-1 text-[12px] text-muted">{SKILLS[k].blurb}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Badges */}
      <div className="flex items-end justify-between">
        <SectionTitle>Badges</SectionTitle>
        <button onClick={() => { tap(); setAllBadges(true); }} className="mb-3 min-h-11 text-sm font-semibold text-cyan">
          See all {earned.length}/{BADGES.length}
        </button>
      </div>
      <div className="-mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {earned.length === 0 && <div className="text-sm text-muted">Clear your first scenario to earn one.</div>}
        {earned.map((b) => (
          <div key={b.id} className="shrink-0 w-28 rounded-2xl border border-gold/40 p-3" style={{ background: 'linear-gradient(160deg, #ffd16620, #161b2a 70%)' }}>
            <div className="w-9 h-9 rounded-xl grid place-items-center bg-gold/20 text-gold"><Icon name={b.icon} size={18} /></div>
            <div className="mt-2 font-display font-extrabold text-sm uppercase leading-tight">{b.title}</div>
          </div>
        ))}
      </div>

      {/* Aura color */}
      <SectionTitle>Aura color</SectionTitle>
      <Card className="p-5">
        <div className="grid grid-cols-6 gap-2">
          {AURA_COLORS.map((c) => {
            const has = owned(c);
            const on = state.auraColor === c.color;
            return (
              <button
                key={c.color}
                disabled={!has}
                aria-label={`${c.name}${has ? '' : `, unlocks at level ${c.level}`}`}
                aria-pressed={on}
                onClick={() => { tap(); setState((s) => ({ ...s, auraColor: c.color })); }}
                className="aspect-square min-h-11 rounded-full grid place-items-center border-2 transition active:scale-90"
                style={{ background: has ? c.color : 'rgba(255,255,255,0.05)', borderColor: on ? '#fff' : 'transparent' }}
              >
                {!has && <span className="text-[11px] font-black text-muted">{c.level}</span>}
                {on && <Icon name="Check" size={16} className="text-ink" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted">Numbers show the level that unlocks each color.</p>
      </Card>

      <Sheet open={allBadges} onClose={() => setAllBadges(false)} title={`Badges ${earned.length}/${BADGES.length}`}>
        <div className="grid grid-cols-2 gap-3 pb-6">
          {BADGES.map((b) => {
            const got = b.check(state);
            return (
              <div key={b.id} role="img" aria-label={`${b.title}: ${b.desc} ${got ? 'Unlocked' : 'Locked'}`} className={`rounded-2xl border p-4 ${got ? 'border-gold/40' : 'border-line bg-panel-2'}`}>
                <div className={`w-10 h-10 rounded-xl grid place-items-center ${got ? 'bg-gold/20 text-gold' : 'bg-white/5 text-muted'}`}>
                  <Icon name={got ? b.icon : 'Lock'} size={18} />
                </div>
                <div className={`mt-2 font-display font-extrabold uppercase leading-tight ${got ? '' : 'text-muted'}`}>{b.title}</div>
                <div className="mt-1 text-[12px] text-muted leading-snug">{b.desc}</div>
              </div>
            );
          })}
        </div>
      </Sheet>

      <Sheet open={editing} onClose={() => setEditing(false)} title="Edit player">
        <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted" htmlFor="edit-name">Nickname</label>
        <input id="edit-name" value={name} maxLength={36} onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full h-14 rounded-2xl bg-panel-2 border border-line px-4 font-display font-bold text-xl focus:border-cyan focus:outline-none" />
        <div className="mt-5 text-[11px] font-bold tracking-[0.2em] uppercase text-muted">Archetype</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {ARCHETYPES.map((a) => (
            <button key={a.id} aria-pressed={arc === a.id} onClick={() => { tap(); setArc(a.id); }} className="rounded-2xl border p-3 text-left active:scale-[0.98]"
              style={{ borderColor: arc === a.id ? a.color : 'rgba(255,255,255,0.09)', background: arc === a.id ? `${a.color}14` : 'transparent' }}>
              <div className="text-xl" aria-hidden>{a.emoji}</div>
              <div className="mt-1 font-display font-bold text-sm leading-tight">{a.title}</div>
            </button>
          ))}
        </div>
        <Button className="w-full mt-6 mb-4" disabled={!name.trim()} onClick={() => { setState((s) => ({ ...s, name: [...name.trim()].slice(0, 18).join(''), archetype: arc })); setEditing(false); }}>Save</Button>
      </Sheet>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 mb-3 font-display font-black text-lg uppercase tracking-tight">{children}</h2>;
}
