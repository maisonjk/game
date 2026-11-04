import { useState } from 'react';
import { SCENARIOS_BY_WORLD, WORLDS } from '../data';
import { levelProgress, levelTitle, needsUnlock, nextScenario, scenarioOpen, worldAccessible, worldProgress } from '../lib/game';
import { useGame } from '../lib/store';
import { tap } from '../lib/haptics';
import type { Scenario, WorldId } from '../types';
import { Bar, Button, Card, Eyebrow, Icon, Sheet, Stars } from './ui';

export default function MapScreen({ onPlay, onPaywall }: { onPlay: (s: Scenario) => void; onPaywall: (w?: WorldId) => void }) {
  const { state } = useGame();
  const [openWorld, setOpenWorld] = useState<WorldId | null>(null);
  const next = nextScenario(state);
  const lp = levelProgress(state.aura);
  const nextWorld = next ? WORLDS.find((w) => w.id === next.world)! : null;
  const allFreeDone = !next && !state.unlocked;

  return (
    <div className="px-5 pt-5 pb-32 max-w-lg mx-auto">
      <Eyebrow color="text-muted">Hey {state.name || 'player'}</Eyebrow>
      <h1 className="mt-1 font-display font-black text-[34px] leading-none uppercase tracking-tight">
        LV {lp.level} <span className="text-cyan neon-text-cyan">{levelTitle(lp.level)}</span>
      </h1>
      <div className="mt-3 flex items-center gap-3">
        <Bar pct={lp.pct} className="flex-1" color={state.auraColor} />
        <span className="text-xs font-bold text-muted tabular-nums whitespace-nowrap">{lp.toNext} to LV {lp.level + 1}</span>
      </div>

      {/* Continue card */}
      {next && nextWorld && (
        <button
          onClick={() => {
            tap();
            onPlay(next);
          }}
          className="mt-6 w-full text-left relative overflow-hidden rounded-3xl border p-5 active:scale-[0.99] transition sweep"
          style={{ borderColor: `${nextWorld.color}55`, background: `linear-gradient(135deg, ${nextWorld.color}22, #161b2a 60%)` }}
        >
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: nextWorld.color }}>
            Up next · {nextWorld.title}
          </div>
          <div className="mt-2 font-display font-black text-2xl uppercase leading-tight">{next.title}</div>
          <p className="mt-1.5 text-sm text-muted leading-snug pr-10">{next.hook}</p>
          <span className="absolute right-4 bottom-4 w-12 h-12 rounded-full grid place-items-center text-ink" style={{ background: nextWorld.color }}>
            <Icon name="Play" size={22} className="fill-ink ml-0.5" />
          </span>
        </button>
      )}

      {allFreeDone && (
        <Card className="mt-6 p-5 border-gold/40" style={{ background: 'linear-gradient(135deg, #ffd16622, #161b2a 60%)' }}>
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold">Free scenarios cleared</div>
          <div className="mt-2 font-display font-black text-2xl uppercase leading-tight">20 more are waiting</div>
          <p className="mt-1.5 text-sm text-muted">Replay for 3 stars, keep your Daily Chaos streak, or unlock the rest of School, Friends, Home and Online.</p>
          <Button variant="primary" className="mt-4 w-full" onClick={() => onPaywall()}>
            Unlock all worlds
          </Button>
        </Card>
      )}

      <div className="mt-8 flex items-end justify-between">
        <h2 className="font-display font-black text-xl uppercase tracking-tight">Worlds</h2>
        <span className="text-xs text-faint font-semibold">{Object.keys(state.records).length}/30 cleared</span>
      </div>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3">
        {WORLDS.map((w, i) => {
          const access = worldAccessible(state, w.id);
          const pr = worldProgress(state, w.id);
          return (
            <button
              key={w.id}
              onClick={() => {
                tap();
                setOpenWorld(w.id);
              }}
              className="text-left rounded-3xl bg-panel border border-line p-4 flex items-center gap-4 active:scale-[0.99] transition anim-rise"
              style={{ animationDelay: `${i * 50}ms` }}
              aria-label={`${w.title}. ${pr.done} of ${pr.total} cleared${access ? '' : '. First scenario free'}`}
            >
              <div className="w-14 h-14 rounded-2xl grid place-items-center shrink-0 border" style={{ color: w.color, borderColor: `${w.color}55`, background: `${w.color}12` }}>
                <Icon name={w.icon} size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-lg uppercase tracking-tight">{w.title}</span>
                  {w.free && <span className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded bg-cyan/15 text-cyan">FREE</span>}
                </div>
                <p className="text-[13px] text-muted leading-snug truncate">{w.tagline}</p>
                {access || pr.done > 0 ? (
                  <div className="mt-2 flex items-center gap-2">
                    <Bar pct={pr.done / pr.total} color={w.color} className="flex-1 h-1.5" />
                    <span className="text-[11px] font-bold text-faint tabular-nums">
                      {pr.done}/{pr.total}
                    </span>
                  </div>
                ) : (
                  <div className="mt-2 text-[11px] font-bold tracking-wider uppercase text-gold">1 free · 5 in full game</div>
                )}
              </div>
              <Icon name="ChevronRight" size={20} className="text-faint" />
            </button>
          );
        })}
      </div>

      <WorldSheet worldId={openWorld} onClose={() => setOpenWorld(null)} onPlay={(s) => { setOpenWorld(null); onPlay(s); }} onPaywall={(w) => { setOpenWorld(null); onPaywall(w); }} />
    </div>
  );
}

function WorldSheet({ worldId, onClose, onPlay, onPaywall }: { worldId: WorldId | null; onClose: () => void; onPlay: (s: Scenario) => void; onPaywall: (w: WorldId) => void }) {
  const { state } = useGame();
  if (!worldId) return null;
  const w = WORLDS.find((x) => x.id === worldId)!;
  const list = SCENARIOS_BY_WORLD[worldId];
  const pr = worldProgress(state, worldId);
  return (
    <Sheet open onClose={onClose} title={w.title}>
      <p className="text-muted -mt-1">{w.tagline}</p>
      <div className="mt-2 text-xs font-bold text-faint">
        {pr.done}/{pr.total} cleared · {pr.stars}/{pr.maxStars} stars
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-2 pb-6">
        {list.map((s, i) => {
          const open = scenarioOpen(state, s);
          const paid = needsUnlock(state, s);
          const rec = state.records[s.id];
          return (
            <button
              key={s.id}
              disabled={!open && !paid}
              onClick={() => {
                tap();
                if (paid) onPaywall(worldId);
                else onPlay(s);
              }}
              className="text-left rounded-2xl border border-line bg-panel-2 p-4 flex items-center gap-3 disabled:opacity-45 active:scale-[0.99] transition"
              aria-label={`${s.title}${open ? '' : paid ? ', in the full game' : ', locked. Clear the previous scenario first'}`}
            >
              <span className="w-9 h-9 rounded-xl grid place-items-center font-display font-black text-sm shrink-0" style={{ background: rec ? `${w.color}22` : 'rgba(255,255,255,0.05)', color: rec ? w.color : '#a3adc2' }}>
                {open ? i + 1 : <Icon name="Lock" size={16} />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-base leading-tight">{s.title}</div>
                <div className="text-[13px] text-muted truncate">{s.hook}</div>
              </div>
              {rec ? (rec.plays === 0 ? <span className="text-xs text-muted">Skipped</span> : <Stars n={rec.stars} size={14} />) : open ? <Icon name="Play" size={18} className="text-cyan" /> : paid ? <span className="text-[10px] font-black tracking-widest text-gold">FULL</span> : null}
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}
