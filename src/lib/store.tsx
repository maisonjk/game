import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { GameState } from '../types';
import { STORAGE_KEY, freshState, hydrate } from './game';
import { load, remove, save } from './storage';
import { setHapticsEnabled } from './haptics';
import { checkUnlocked } from './purchases';

interface Ctx {
  state: GameState;
  setState: (fn: (s: GameState) => GameState) => void;
  reset: () => Promise<void>;
}

const GameCtx = createContext<Ctx | null>(null);

export function GameProvider({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [state, setRaw] = useState<GameState | null>(null);
  const ref = useRef<GameState | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const s = hydrate(await load(STORAGE_KEY));
      if (!alive) return;
      ref.current = s;
      setRaw(s);
      // The store is the source of truth for the unlock (restores across reinstalls).
      const owned = await checkUnlocked();
      if (alive && owned && !s.unlocked) setState((p) => ({ ...p, unlocked: true }));
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setState = useCallback((fn: (s: GameState) => GameState) => {
    setRaw((prev) => {
      if (!prev) return prev;
      const next = fn(prev);
      ref.current = next;
      void save(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(async () => {
    const keepUnlock = ref.current?.unlocked ?? false;
    await remove(STORAGE_KEY);
    const s = { ...freshState(), unlocked: keepUnlock };
    ref.current = s;
    setRaw(s);
    await save(STORAGE_KEY, JSON.stringify(s));
  }, []);

  useEffect(() => {
    if (state) {
      setHapticsEnabled(state.settings.haptics);
      document.documentElement.classList.toggle('reduce-motion', state.settings.reduceMotion);
    }
  }, [state?.settings.haptics, state?.settings.reduceMotion]);

  if (!state) return <>{fallback}</>;
  return <GameCtx.Provider value={{ state, setState, reset }}>{children}</GameCtx.Provider>;
}

export function useGame() {
  const c = useContext(GameCtx);
  if (!c) throw new Error('useGame outside provider');
  return c;
}
