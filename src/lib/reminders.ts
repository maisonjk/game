import { Capacitor } from '@capacitor/core';
import type { GameState } from '../types';
import { dailyFor, localDate } from './game';

/**
 * Opt-in Daily Chaos reminders, fully on-device (no server, no push tokens).
 * We schedule up to 7 one-off local notifications, one per upcoming day, at the
 * player's chosen time, and skip any day they've already played. Rescheduled on
 * every launch and after every Daily, so it never nags after you've played.
 */
const native = Capacitor.isNativePlatform();
const IDS = [101, 102, 103, 104, 105, 106, 107];

export const remindersSupported = () => native;

async function plugin() {
  return (await import('@capacitor/local-notifications')).LocalNotifications;
}

/** Ask iOS for permission. Only called when the player turns reminders on. */
export async function requestReminderPermission(): Promise<boolean> {
  if (!native) return false;
  try {
    const ln = await plugin();
    const cur = await ln.checkPermissions();
    if (cur.display === 'granted') return true;
    const res = await ln.requestPermissions();
    return res.display === 'granted';
  } catch {
    return false;
  }
}

export async function syncReminders(state: GameState): Promise<void> {
  if (!native) return;
  try {
    const ln = await plugin();
    await ln.cancel({ notifications: IDS.map((id) => ({ id })) }).catch(() => {});
    const r = state.settings.reminder;
    if (!r?.on) return;
    // Never trigger a permission prompt from a background sync.
    if ((await ln.checkPermissions()).display !== 'granted') return;

    const notifications = planReminders(state, new Date());
    if (notifications.length) await ln.schedule({ notifications });
  } catch (e) {
    console.warn('[reminders] sync failed', e);
  }
}

/** Pure planner (unit-testable): which reminders to schedule from `now`. */
export function planReminders(state: GameState, now: Date) {
  const r = state.settings.reminder;
  const out: { id: number; title: string; body: string; schedule: { at: Date; allowWhileIdle: boolean } }[] = [];
  if (!r?.on) return out;
  for (let i = 0; i < 7; i++) {
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, r.hour, r.minute, 0, 0);
    const key = localDate(at);
    if (at.getTime() <= now.getTime() + 60_000) continue; // time already passed today
    if (state.daily.done[key] !== undefined) continue; // already played that day
    out.push({
      id: IDS[i],
      title: `Daily Chaos: ${dailyFor(key).title}`,
      body: 'Today’s call is up. Takes about 10 seconds.',
      schedule: { at, allowWhileIdle: true },
    });
  }
  return out;
}

export const REMINDER_TIMES = [
  { hour: 15, minute: 30, label: '3:30 PM', hint: 'After school' },
  { hour: 19, minute: 0, label: '7 PM', hint: 'Evening' },
  { hour: 20, minute: 30, label: '8:30 PM', hint: 'Before bed' },
];

export const timeLabel = (hour: number, minute: number) =>
  new Date(2000, 0, 1, hour, minute).toLocaleTimeString(undefined, { hour: 'numeric', minute: minute ? '2-digit' : undefined });
