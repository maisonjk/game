import { useState } from 'react';
import { useGame } from '../lib/store';
import { REMINDER_TIMES, remindersSupported, requestReminderPermission, timeLabel } from '../lib/reminders';
import { tap } from '../lib/haptics';
import { Button, Icon } from './ui';

function useReminderControls() {
  const { state, setState } = useGame();
  const [msg, setMsg] = useState<string | null>(null);
  const r = state.settings.reminder ?? { on: false, hour: 19, minute: 0 };

  const enable = async (hour: number, minute: number) => {
    const ok = await requestReminderPermission();
    if (!ok) {
      setMsg('Notifications are off for Social Levels. You can turn them on in iPhone Settings → Notifications.');
      setState((s) => ({ ...s, settings: { ...s.settings, reminderAsked: true } }));
      return false;
    }
    setMsg(null);
    setState((s) => ({ ...s, settings: { ...s.settings, reminderAsked: true, reminder: { on: true, hour, minute } } }));
    return true;
  };
  const disable = () => setState((s) => ({ ...s, settings: { ...s.settings, reminderAsked: true, reminder: { ...r, on: false } } }));
  const dismiss = () => setState((s) => ({ ...s, settings: { ...s.settings, reminderAsked: true } }));
  return { r, msg, enable, disable, dismiss };
}

/** One-time offer, shown under a finished Daily after the player's 3rd day. */
export function ReminderOffer() {
  const { state } = useGame();
  const { msg, enable, dismiss } = useReminderControls();
  const [pick, setPick] = useState(1);
  const [done, setDone] = useState(false);
  const played = Object.keys(state.daily.done).length;
  if (!remindersSupported() || (state.settings.reminderAsked && !done) || played < 3) return null;

  if (done) {
    return (
      <div className="mt-4 rounded-2xl border border-cyan/30 bg-cyan/5 p-4 text-sm anim-pop" role="status">
        <span className="font-semibold text-cyan">Reminder set.</span> <span className="text-muted">Change it anytime in You → Settings.</span>
      </div>
    );
  }
  return (
    <div className="mt-4 rounded-2xl border border-line bg-panel p-4 anim-rise">
      <div className="flex items-center gap-2 font-display font-extrabold uppercase">
        <Icon name="Bell" size={18} className="text-gold" /> Want a nudge?
      </div>
      <p className="mt-1.5 text-sm text-muted">One reminder a day, only if you haven’t played yet. Pick a time:</p>
      <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Reminder time">
        {REMINDER_TIMES.map((t, i) => (
          <button
            key={t.label}
            role="radio"
            aria-checked={pick === i}
            onClick={() => { tap(); setPick(i); }}
            className={`min-h-14 rounded-xl border px-2 py-2 text-center transition ${pick === i ? 'border-cyan bg-cyan/10' : 'border-line bg-ink/40'}`}
          >
            <div className="font-display font-extrabold text-sm">{t.label}</div>
            <div className="text-[11px] text-muted">{t.hint}</div>
          </button>
        ))}
      </div>
      {msg && <p className="mt-3 text-sm text-pink" role="alert">{msg}</p>}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="ghost" onClick={dismiss}>No thanks</Button>
        <Button
          onClick={async () => {
            const t = REMINDER_TIMES[pick];
            if (await enable(t.hour, t.minute)) setDone(true);
          }}
        >
          Remind me
        </Button>
      </div>
    </div>
  );
}

/** Settings row: toggle plus time choice. */
export function ReminderSetting() {
  const { r, msg, enable, disable } = useReminderControls();
  if (!remindersSupported()) return null;
  return (
    <div className="py-3">
      <button
        role="switch"
        aria-checked={r.on}
        onClick={() => { tap(); if (r.on) disable(); else void enable(r.hour, r.minute); }}
        className="w-full min-h-14 flex items-center gap-3 text-left"
      >
        <Icon name="Bell" size={20} className="text-muted" />
        <span className="flex-1">
          <span className="block font-semibold">Daily reminder</span>
          <span className="block text-xs text-muted">{r.on ? `Around ${timeLabel(r.hour, r.minute)}, skipped on days you’ve played.` : 'Off. One nudge a day if you want it.'}</span>
        </span>
        <span className={`w-12 h-7 rounded-full p-0.5 transition ${r.on ? 'bg-cyan' : 'bg-white/15'}`}>
          <span className={`block w-6 h-6 rounded-full bg-white transition ${r.on ? 'translate-x-5' : ''}`} />
        </span>
      </button>
      {r.on && (
        <div className="mt-2 grid grid-cols-3 gap-2 pl-8" role="radiogroup" aria-label="Reminder time">
          {REMINDER_TIMES.map((t) => {
            const on = r.hour === t.hour && r.minute === t.minute;
            return (
              <button key={t.label} role="radio" aria-checked={on} onClick={() => { tap(); void enable(t.hour, t.minute); }}
                className={`min-h-11 rounded-xl border text-sm font-semibold ${on ? 'border-cyan bg-cyan/10 text-cyan' : 'border-line text-muted'}`}>
                {t.label}
              </button>
            );
          })}
        </div>
      )}
      {msg && <p className="mt-2 text-sm text-pink" role="alert">{msg}</p>}
    </div>
  );
}
