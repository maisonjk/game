import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PRICE_FALLBACK, SCENARIOS_BY_WORLD, SUPPORT_EMAIL, WORLDS } from '../data';
import { buyUnlock, getPrice, purchasesAvailable, restoreUnlock } from '../lib/purchases';
import { useGame } from '../lib/store';
import { success, tap } from '../lib/haptics';
import type { WorldId } from '../types';
import { Button, Icon, Sheet } from './ui';
import { CrisisCard } from './CrisisCard';

export type LegalPage = 'privacy' | 'terms' | 'support';

/* ---------------- Paywall ---------------- */

export function Paywall({ open, onClose, onLegal, focus }: { open: boolean; onClose: () => void; onLegal: (p: LegalPage) => void; focus?: WorldId | null }) {
  const { state, setState } = useGame();
  const [price, setPrice] = useState(PRICE_FALLBACK);
  const [busy, setBusy] = useState<'buy' | 'restore' | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const available = purchasesAvailable();

  useEffect(() => {
    if (open) {
      setMsg(null);
      getPrice().then(setPrice);
    }
  }, [open]);

  const unlock = () => {
    setState((s) => ({ ...s, unlocked: true }));
    success();
    onClose();
  };

  const buy = async () => {
    setBusy('buy');
    setMsg(null);
    const r = await buyUnlock();
    setBusy(null);
    if (r === 'success') unlock();
    else if (r === 'unavailable') setMsg('Purchases aren’t available right now. Check your connection and try again.');
    else if (r === 'error') setMsg('Something went wrong. You weren’t charged twice. Try again or tap Restore.');
  };

  const restore = async () => {
    setBusy('restore');
    setMsg(null);
    const r = await restoreUnlock();
    setBusy(null);
    if (r === 'restored') unlock();
    else if (r === 'none') setMsg('No previous purchase found on this Apple ID.');
    else setMsg('Couldn’t reach the App Store. Try again in a moment.');
  };

  if (state.unlocked && open) {
    return (
      <Sheet open onClose={onClose} title="All worlds unlocked">
        <p className="text-muted pb-8">You own the full game. Thanks for supporting Social Levels.</p>
      </Sheet>
    );
  }

  const paid = WORLDS.filter((w) => !w.free).sort((a, b) => (a.id === focus ? -1 : b.id === focus ? 1 : 0));
  const teaser = paid.map((w) => SCENARIOS_BY_WORLD[w.id][2]?.title).filter(Boolean).slice(0, 3);

  const footer = (
    <div>
      {available ? (
        <Button className="w-full" onClick={buy} disabled={!!busy}>
          {busy === 'buy' ? 'Connecting…' : `Unlock for ${price}`}
        </Button>
      ) : (
        <div className="rounded-2xl border border-line bg-panel-2 p-3 text-sm text-muted text-center">Purchases are available in the iPhone app.</div>
      )}
      {msg && <p className="mt-2 text-sm text-pink text-center" role="alert">{msg}</p>}
      <div className="mt-1 flex items-center justify-center gap-4">
        {available && (
          <button onClick={restore} disabled={!!busy} className="min-h-11 text-sm font-semibold text-muted underline underline-offset-4">
            {busy === 'restore' ? 'Restoring…' : 'Restore purchase'}
          </button>
        )}
        <button onClick={onClose} className="min-h-11 text-sm font-semibold text-muted">Not now</button>
      </div>
      <p className="text-[11px] text-muted text-center leading-relaxed">
        One-time purchase on your Apple ID. Ask a parent or guardian first.{' '}
        <button className="underline" onClick={() => onLegal('terms')}>Terms</button> ·{' '}
        <button className="underline" onClick={() => onLegal('privacy')}>Privacy</button>
      </p>
    </div>
  );

  return (
    <Sheet open={open} onClose={onClose} footer={footer}>
      <div className="pt-1">
        <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-gold">Full game</div>
        <h2 className="mt-2 font-display font-black text-[34px] uppercase tracking-tight leading-[0.95]">Unlock every world</h2>
        <p className="mt-3 text-muted">You’ve tried the first scenario in each world. Get the other 20, plus Group Chat and Daily Chaos stay free forever. One purchase, no subscription.</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {paid.map((w) => {
          const hi = w.id === focus;
          return (
            <div key={w.id} className="rounded-2xl border p-3.5" style={{ borderColor: hi ? `${w.color}88` : 'rgba(255,255,255,0.09)', background: hi ? `${w.color}14` : '#1d2334' }}>
              <span className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: `${w.color}18`, color: w.color }}>
                <Icon name={w.icon} size={18} />
              </span>
              <div className="mt-2 font-display font-extrabold leading-tight">{w.title}</div>
              <div className="text-xs text-muted">6 scenarios</div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 mb-2 text-sm text-muted">
        Including <span className="text-text">{teaser.join(', ')}</span>, and more.
      </p>
    </Sheet>
  );
}

/* ---------------- Settings ---------------- */

function Toggle({ on, onChange, label, icon, desc }: { on: boolean; onChange: (v: boolean) => void; label: string; icon: string; desc: string }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => { tap(); onChange(!on); }} className="w-full min-h-14 flex items-center gap-3 py-3 text-left">
      <Icon name={icon} size={20} className="text-muted" />
      <span className="flex-1">
        <span className="block font-semibold">{label}</span>
        <span className="block text-xs text-muted">{desc}</span>
      </span>
      <span className={`w-12 h-7 rounded-full p-0.5 transition ${on ? 'bg-cyan' : 'bg-white/15'}`}>
        <span className={`block w-6 h-6 rounded-full bg-white transition ${on ? 'translate-x-5' : ''}`} />
      </span>
    </button>
  );
}

function Row({ icon, label, onClick, tone }: { icon: string; label: string; onClick: () => void; tone?: string }) {
  return (
    <button onClick={() => { tap(); onClick(); }} className={`w-full min-h-12 flex items-center gap-3 py-3.5 text-left ${tone ?? ''}`}>
      <Icon name={icon} size={20} className={tone ? '' : 'text-muted'} />
      <span className="flex-1 font-semibold">{label}</span>
      <Icon name="ChevronRight" size={18} className="text-muted" />
    </button>
  );
}

export function Settings({ open, onClose, onPaywall, onLegal, onReset }: { open: boolean; onClose: () => void; onPaywall: () => void; onLegal: (p: LegalPage) => void; onReset: () => void }) {
  const { state, setState, reset } = useGame();
  const [confirmReset, setConfirmReset] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState<string | null>(null);

  return (
    <Sheet open={open} onClose={onClose} title="Settings" tall>
      <div className="divide-y divide-line">
        <Toggle on={state.settings.haptics} onChange={(v) => setState((s) => ({ ...s, settings: { ...s.settings, haptics: v } }))} label="Haptics" icon="Vibrate" desc="Little buzzes when you make a move." />
        <Toggle on={state.settings.reduceMotion} onChange={(v) => setState((s) => ({ ...s, settings: { ...s.settings, reduceMotion: v } }))} label="Reduce motion" icon="Eye" desc="Fewer animations, story shows instantly." />
      </div>

      <div className="mt-6 text-[11px] font-bold tracking-[0.2em] uppercase text-muted">Game</div>
      <div className="divide-y divide-line">
        {!state.unlocked && <Row icon="Crown" label="Unlock all worlds" onClick={onPaywall} tone="text-gold" />}
        {purchasesAvailable() && (
          <Row
            icon="ShoppingBag"
            label="Restore purchase"
            onClick={async () => {
              setRestoreMsg('Checking…');
              const r = await restoreUnlock();
              if (r === 'restored') {
                setState((s) => ({ ...s, unlocked: true }));
                setRestoreMsg('Restored. All worlds unlocked.');
              } else setRestoreMsg(r === 'none' ? 'No previous purchase found.' : 'Couldn’t reach the App Store.');
            }}
          />
        )}
        {restoreMsg && <p className="py-2 text-sm text-cyan" role="status">{restoreMsg}</p>}
        <Row icon="RotateCcw" label="Reset progress" onClick={() => setConfirmReset(true)} tone="text-pink" />
      </div>

      <div className="mt-6">
        <CrisisCard />
      </div>

      <div className="mt-6 text-[11px] font-bold tracking-[0.2em] uppercase text-muted">About</div>
      <div className="divide-y divide-line">
        <Row icon="Shield" label="Privacy Policy" onClick={() => onLegal('privacy')} />
        <Row icon="FileText" label="Terms of Use" onClick={() => onLegal('terms')} />
        <Row icon="Mail" label="Help & Support" onClick={() => onLegal('support')} />
      </div>
      <p className="mt-6 pb-8 text-center text-xs text-muted">
        Social Levels v1.0 · Your progress stays on this device.
        <br />
        {SUPPORT_EMAIL}
      </p>

      {confirmReset &&
        createPortal(
          <div className="fixed inset-0 z-[90] bg-black/70 grid place-items-center px-6 anim-fade" role="alertdialog" aria-modal="true" aria-label="Reset progress?">
            <div className="w-full max-w-sm rounded-3xl bg-panel border border-line p-6 anim-pop">
              <h3 className="font-display font-black text-2xl uppercase">Reset everything?</h3>
              <p className="mt-2 text-muted">This erases your level, aura, stars, streak, and badges on this device. Your purchase stays.</p>
              <div className="mt-6 grid gap-2">
                <Button
                  variant="pink"
                  onClick={async () => {
                    await reset();
                    setConfirmReset(false);
                    onClose();
                    onReset();
                  }}
                >
                  Erase progress
                </Button>
                <Button variant="ghost" onClick={() => setConfirmReset(false)}>Cancel</Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </Sheet>
  );
}

/* ---------------- Legal viewer ---------------- */

export function LegalViewer({ page, onClose }: { page: LegalPage | null; onClose: () => void }) {
  if (!page) return null;
  const titles: Record<LegalPage, string> = { privacy: 'Privacy Policy', terms: 'Terms of Use', support: 'Help & Support' };
  return (
    <div className="fixed inset-0 z-[70] bg-ink flex flex-col pt-safe anim-fade" role="dialog" aria-modal="true" aria-label={titles[page]}>
      <div className="h-14 px-4 flex items-center gap-3 border-b border-line shrink-0">
        <button aria-label="Back" onClick={onClose} className="w-11 h-11 rounded-full grid place-items-center bg-white/5 active:scale-95">
          <Icon name="ChevronLeft" size={22} />
        </button>
        <span className="font-display font-extrabold uppercase">{titles[page]}</span>
      </div>
      <iframe title={titles[page]} src={`./${page}.html`} className="flex-1 w-full bg-ink" />
    </div>
  );
}
