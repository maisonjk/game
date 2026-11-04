import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

/**
 * Durable key/value storage.
 * Native: Capacitor Preferences (UserDefaults), which iOS doesn't purge like WebView localStorage.
 * Web: localStorage, wrapped so private mode never crashes the app.
 */
const native = Capacitor.isNativePlatform();

export async function load(key: string): Promise<string | null> {
  try {
    if (native) return (await Preferences.get({ key })).value;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function save(key: string, value: string): Promise<void> {
  try {
    if (native) await Preferences.set({ key, value });
    else localStorage.setItem(key, value);
  } catch {
    /* storage full or blocked: game keeps running in memory */
  }
}

export async function remove(key: string): Promise<void> {
  try {
    if (native) await Preferences.remove({ key });
    else localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
