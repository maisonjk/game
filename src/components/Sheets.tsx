import { useEffect, useState } from 'react';
import { PRICE_FALLBACK, SUPPORT_EMAIL, WORLDS } from '../data';
import { buyUnlock, getPrice, purchasesAvailable, restoreUnlock } from '../lib/purchases';
import { useGame } from '../lib/store';
import { success, tap } from '../lib/haptics';
import { Button, Icon, Sheet } from './ui';

export type LegalPage = 'privacy' | 'terms' | 'support';

/* ---------------- Paywall ---------------- */

export function Paywall({ open, onClose, onLegal }: { open: boolean; onClose: () => void; onLegal: (p: LegalPage) => void }) {
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
    else if (r === 'cancelled') setMsg(null);
    else if (r === 'unavailable') setMsg('Purchases aren’t available right now. Check your connection and try again.');
    else setMsg('Something went wrong with the purchase. You were not charged twice. Try again or tap Restore.');
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

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="text-center -mt-2">
        <div className="mx-auto w-16 h-16 rounded-2xl grid place-items-center bg-gold/15 text-gold border border-gold/40">
          <Icon name="Crown" size={30} />
        </div>
        <h2 className="mt-4 font-display font-black text-3xl uppercase tracking-tight leading-none">Unlock every world</h2>
        <p className="mt-3 text-muted">One purchase. No subscription. Yours forever.</p>
      </div>

      <div className="mt-6 grid gap-2">
        {WORLDS.filter((w) => !w.free).map((w) => (
          <div key={w.id} className="flex items-center gap-3 rounded-2xl bg-panel-2 border border-line p-3">
            <span className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${w.color}18`, color: w.color }}>
              <Icon name={w.icon} size={20} />
            </span>
            <div className="flex-1">
              <div className="font-display font-bold">{w.title}</div>
              <div className="text-xs text-muted">6 scenarios</div>
            </div>
            <Icon name="Check" size={18} className="text-cyan" />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-muted">24 more scenarios, plus every future world we add to this unlock.</p>

      <div className="mt-6">
        {available ? (
          <Button className="w-full" onClick={buy} disabled={!!busy}>
            {busy === 'buy' ? 'Connecting…' : `Unlock for ${price}`}
          </Button>
        ) : (
          <div className="rounded-2xl border border-line bg-panel-2 p-4 text-sm text-muted text-center">Purchases are available in the iPhone app.</div>
        )}
        {msg && (
          <p className="mt-3 text-sm text-pink text-center" role="alert">
            {msg}
          </p>
        )}
        {available && (
          <button onClick={restore} disabled={!!busy} className="mt-3 w-full h-11 text-sm font-semibold text-muted underline underline-offset-4">
            {busy === 'restore' ? 'Restoring…' : 'Restore purchase'}
          </button>
        )}
        <p className="mt-3 pb-6 text-[11px] text-faint text-center leading-relaxed">
          One-time purchase charged to your Apple ID. Ask a parent or guardian before buying. By purchasing you agree to the{' '}
          <button className="underline" onClick={() => onLegal('terms')}>
            Terms
          </button>{' '}
          and{' '}
          <button className="underline" onClick={() => onLegal('privacy')}>
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </Sheet>
  );
}

/* ---------------- Settings ---------------- */

export function Settings({ open, onClose, onPaywall, onLegal }: { open: boolean; onClose: () => void; onPaywall: () => void; onLegal: (p: LegalPage) => void }) {
  const { state, setState, reset } = useGame();
  const [confirmReset, setConfirmReset] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState<string | null>(null);

  const Toggle = ({ on, onChange, label, icon, desc }: { on: boolean; onChange: (v: boolean) => void; label: string; icon: string; desc: string }) => (
    <button role="switch" aria-checked={on} onClick={() => { tap(); onChange(!on); }} className="w-full flex items-center gap-3 py-3 text-left">
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

  const Row = ({ icon, label, onClick, tone }: { icon: string; label: string; onClick: () => void; tone?: string }) => (
    <button onClick={() => { tap(); onClick(); }} className={`w-full flex items-center gap-3 py-3.5 text-left ${tone ?? ''}`}>
      <Icon name={icon} size={20} className={tone ? '' : 'text-muted'} />
      <span className="flex-1 font-semibold">{label}</span>
      <Icon name="ChevronRight" size={18} className="text-faint" />
    </button>
  );

  return (
    <Sheet open={open} onClose={onClose} title="Settings" tall>
      <div className="divide-y divide-line">
        <Toggle on={state.settings.haptics} onChange={(v) => setState((s) => ({ ...s, settings: { ...s.settings, haptics: v } }))} label="Haptics" icon="Vibrate" desc="Little buzzes when you make a move." />
        <Toggle on={state.settings.reduceMotion} onChange={(v) => setState((s) => ({ ...s, settings: { ...s.settings, reduceMotion: v } }))} label="Reduce motion" icon="Eye" desc="Fewer animations and faster text." />
      </div>

      <div className="mt-6 text-[11px] font-bold tracking-[0.2em] uppercase text-faint">Game</div>
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

      <div className="mt-6 rounded-2xl border border-mint/30 bg-mint/5 p-4">
        <div className="flex items-center gap-2 text-mint font-display font-extrabold uppercase">
          <Icon name="LifeBuoy" size={18} /> Need to talk to someone?
        </div>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Social Levels is a game, not therapy or counseling. If you’re going through something hard, talk to a parent, school counselor, or another adult you trust.
        </p>
        <ul className="mt-3 grid gap-2 text-sm">
          <li>
            <a className="font-semibold text-text underline underline-offset-4" href="tel:988">Call or text 988</a>
            <span className="text-muted"> · Suicide & Crisis Lifeline (US, 24/7)</span>
          </li>
          <li>
            <a className="font-semibold text-text underline underline-offset-4" href="sms:741741?&body=HOME">Text HOME to 741741</a>
            <span className="text-muted"> · Crisis Text Line (US)</span>
          </li>
          <li>
            <a className="font-semibold text-text underline underline-offset-4" href="tel:911">Call 911</a>
            <span className="text-muted"> · if you or someone else is in danger</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 text-[11px] font-bold tracking-[0.2em] uppercase text-faint">About</div>
      <div className="divide-y divide-line">
        <Row icon="Shield" label="Privacy Policy" onClick={() => onLegal('privacy')} />
        <Row icon="FileText" label="Terms of Use" onClick={() => onLegal('terms')} />
        <Row icon="Mail" label="Help & Support" onClick={() => onLegal('support')} />
      </div>
      <p className="mt-6 pb-8 text-center text-xs text-faint">
        Social Levels v1.0 · Your progress stays on this device.
        <br />
        {SUPPORT_EMAIL}
      </p>

      {confirmReset && (
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
                }}
              >
                Erase progress
              </Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
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
        <button aria-label="Back" onClick={onClose} className="w-10 h-10 rounded-full grid place-items-center bg-white/5 active:scale-95">
          <Icon name="ChevronLeft" size={22} />
        </button>
        <span className="font-display font-extrabold uppercase">{titles[page]}</span>
      </div>
      <iframe title={titles[page]} src={`./${page}.html`} className="flex-1 w-full bg-ink" />
    </div>
  );
}
