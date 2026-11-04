import { useState } from 'react';
import { ARCHETYPES, AURA_COLORS, TONES } from '../data';
import { levelFromAura, levelTitle, playStyle } from '../lib/game';
import { useGame } from '../lib/store';
import { tap } from '../lib/haptics';
import type { ArchetypeId } from '../types';
import { Avatar, Button, Card, Eyebrow, Icon, Sheet } from './ui';

export default function ProfileScreen({ onSettings }: { onSettings: () => void }) {
  const { state, setState } = useGame();
  const level = levelFromAura(state.aura);
  const arch = ARCHETYPES.find((a) => a.id === state.archetype);
  const style = playStyle(state);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(state.name);
  const [arc, setArc] = useState<ArchetypeId | null>(state.archetype);

  const owned = (c: { color: string; level: number }) => level >= c.level || c.color === arch?.color;

  return (
    <div className="px-4 pt-5 pb-28 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <Eyebrow>Player card</Eyebrow>
        <button
          onClick={() => {
            tap();
            onSettings();
          }}
          className="h-10 px-3 rounded-full bg-white/5 border border-line flex items-center gap-2 text-sm font-semibold active:scale-95"
          aria-label="Settings"
        >
          <Icon name="Settings" size={17} /> Settings
        </button>
      </div>

      <Card className="mt-4 p-6 text-center relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full blur-[80px] opacity-30" style={{ background: state.auraColor }} />
        <div className="relative flex flex-col items-center">
          <Avatar name={state.name} color={state.auraColor} emoji={arch?.emoji} size={104} />
          <h1 className="mt-4 font-display font-black text-3xl uppercase tracking-tight">{state.name || 'Player'}</h1>
          <div className="mt-1 text-sm text-muted">
            LV {level} · {levelTitle(level)}
          </div>
          <button
            onClick={() => {
              tap();
              setName(state.name);
              setArc(state.archetype);
              setEditing(true);
            }}
            className="mt-4 h-9 px-4 rounded-full border border-line text-sm font-semibold flex items-center gap-2 active:scale-95"
          >
            <Icon name="Pencil" size={14} /> Edit
          </button>
        </div>
      </Card>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-faint">You said</div>
          <div className="mt-2 text-2xl" aria-hidden>
            {arch?.emoji}
          </div>
          <div className="mt-1 font-display font-extrabold leading-tight" style={{ color: arch?.color }}>
            {arch?.title}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-faint">You play</div>
          {style ? (
            <>
              <div className="mt-2 font-display font-black text-2xl tabular-nums" style={{ color: TONES[style.tone].color }}>
                {style.pct}%
              </div>
              <div className="mt-1 font-display font-extrabold leading-tight">{TONES[style.tone].style}</div>
            </>
          ) : (
            <div className="mt-2 text-sm text-muted">Play a round to find out.</div>
          )}
        </Card>
      </div>

      <Card className="mt-3 p-5">
        <h2 className="font-display font-extrabold text-lg uppercase">Aura color</h2>
        <p className="text-sm text-muted mt-1">New colors unlock as you level up.</p>
        <div className="mt-4 grid grid-cols-6 gap-2">
          {AURA_COLORS.map((c) => {
            const has = owned(c);
            const on = state.auraColor === c.color;
            return (
              <button
                key={c.color}
                disabled={!has}
                aria-label={`${c.name}${has ? '' : `, unlocks at level ${c.level}`}`}
                aria-pressed={on}
                onClick={() => {
                  tap();
                  setState((s) => ({ ...s, auraColor: c.color }));
                }}
                className="aspect-square rounded-full grid place-items-center border-2 transition active:scale-90"
                style={{ background: has ? c.color : 'rgba(255,255,255,0.05)', borderColor: on ? '#fff' : 'transparent', boxShadow: on ? `0 0 16px ${c.color}` : 'none' }}
              >
                {!has && <span className="text-[10px] font-black text-faint">{c.level}</span>}
                {on && <Icon name="Check" size={16} className="text-ink" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </Card>

      <Sheet open={editing} onClose={() => setEditing(false)} title="Edit player">
        <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-faint" htmlFor="edit-name">
          Nickname
        </label>
        <input
          id="edit-name"
          value={name}
          maxLength={18}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full h-14 rounded-2xl bg-panel-2 border border-line px-4 font-display font-bold text-xl focus:border-cyan focus:outline-none"
        />
        <div className="mt-5 text-[11px] font-bold tracking-[0.2em] uppercase text-faint">Archetype</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {ARCHETYPES.map((a) => (
            <button
              key={a.id}
              aria-pressed={arc === a.id}
              onClick={() => {
                tap();
                setArc(a.id);
              }}
              className="rounded-2xl border p-3 text-left active:scale-[0.98]"
              style={{ borderColor: arc === a.id ? a.color : 'rgba(255,255,255,0.09)', background: arc === a.id ? `${a.color}14` : 'transparent' }}
            >
              <div className="text-xl" aria-hidden>
                {a.emoji}
              </div>
              <div className="mt-1 font-display font-bold text-sm leading-tight">{a.title}</div>
            </button>
          ))}
        </div>
        <Button
          className="w-full mt-6 mb-4"
          disabled={!name.trim()}
          onClick={() => {
            setState((s) => ({ ...s, name: name.trim().slice(0, 18), archetype: arc }));
            setEditing(false);
          }}
        >
          Save
        </Button>
      </Sheet>
    </div>
  );
}
