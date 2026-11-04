import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Capacitor } from '@capacitor/core';
import { GameProvider, useGame } from './lib/store';
import { localDate, needsUnlock, nextInWorld, nextScenario, type RunResult } from './lib/game';
import { SCENARIOS } from './data';
import type { Scenario, TabId, WorldId } from './types';
import Onboarding, { Splash } from './components/Onboarding';
import { BottomNav, Header } from './components/Chrome';
import MapScreen from './components/MapScreen';
import DailyScreen from './components/DailyScreen';
import YouScreen from './components/YouScreen';
import ScenarioPlayer from './components/ScenarioPlayer';
import { LegalViewer, Paywall, Settings, type LegalPage } from './components/Sheets';
import { Icon, Toast } from './components/ui';

export default function App() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    import('@capacitor/status-bar').then(({ StatusBar, Style }) => StatusBar.setStyle({ style: Style.Dark }).catch(() => {}));
    import('@capacitor/splash-screen').then(({ SplashScreen }) => SplashScreen.hide().catch(() => {}));
  }, []);
  return (
    <ErrorBoundary>
      <GameProvider fallback={<Splash />}>
        <Root />
      </GameProvider>
    </ErrorBoundary>
  );
}

/** Last line of defense: never leave a teen staring at a blank screen. */
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-[100dvh] bg-ink text-text grid place-items-center px-8 text-center">
        <div>
          <div className="font-display font-black text-3xl uppercase">Something glitched</div>
          <p className="mt-3 text-muted">Tap below to reload. Your progress is saved on this phone.</p>
          <button className="mt-6 min-h-12 px-6 rounded-2xl bg-cyan text-ink font-display font-extrabold uppercase" onClick={() => location.reload()}>
            Reload
          </button>
        </div>
      </div>
    );
  }
}

function Root() {
  const { state } = useGame();
  // Re-mount the whole game after a reset so no stale tab/scroll state survives.
  return <Game key={state.createdAt} />;
}

function Game() {
  const { state } = useGame();
  const [tab, setTab] = useState<TabId>('map');
  const [playing, setPlaying] = useState<{ s: Scenario; auto?: boolean } | null>(null);
  const [paywall, setPaywall] = useState<{ open: boolean; focus?: WorldId | null }>({ open: false });
  const [settings, setSettings] = useState(false);
  const [legal, setLegal] = useState<LegalPage | null>(null);
  const [toasts, setToasts] = useState<{ id: number; node: ReactNode }[]>([]);
  const wasOnboarded = useRef(state.onboarded);
  // Re-render each minute so the Daily dot reappears after midnight.
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(t);
  }, []);

  // First run: go straight from onboarding into scenario 1.
  useEffect(() => {
    if (!wasOnboarded.current && state.onboarded) {
      wasOnboarded.current = true;
      window.scrollTo({ top: 0 });
      setTab('map');
      setPlaying({ s: SCENARIOS[0], auto: true });
    }
  }, [state.onboarded]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  const badgeToasts = useCallback((r: RunResult) => {
    r.newBadges.forEach((b) =>
      setToasts((t) => [
        ...t,
        {
          id: Date.now() + Math.random(),
          node: (
            <>
              <span className="w-8 h-8 rounded-xl grid place-items-center bg-gold/20 text-gold">
                <Icon name={b.icon} size={16} />
              </span>
              <span>
                New badge: <span className="text-gold">{b.title}</span>
              </span>
            </>
          ),
        },
      ]),
    );
  }, []);

  if (!state.onboarded) return <Onboarding />;

  const dailyDue = state.daily.done[localDate()] === undefined;
  const current = playing?.s ?? null;
  const upNext = current ? nextScenario(state) : null;
  const next = upNext && upNext.id !== current?.id ? upNext : null;
  const after = current ? nextInWorld(current) : null;
  const lockedNext = after && needsUnlock(state, after) ? after : null;
  const openPaywall = (focus?: WorldId | null) => setPaywall({ open: true, focus: focus ?? null });

  return (
    <div className="min-h-[100dvh] bg-ink">
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="relative" id="app-chrome">
        <Header onProfile={() => setTab('you')} />
        <main>
          {tab === 'map' && <MapScreen onPlay={(s) => setPlaying({ s })} onPaywall={openPaywall} />}
          {tab === 'daily' && <DailyScreen onBadges={badgeToasts} />}
          {tab === 'you' && <YouScreen onSettings={() => setSettings(true)} />}
        </main>
        <BottomNav tab={tab} onTab={setTab} dailyDue={dailyDue} />
      </div>

      {current && (
        <ScenarioPlayer
          key={current.id + (playing?.auto ? '-auto' : '')}
          scenario={current}
          autoStart={playing?.auto}
          onExit={() => {
            setPlaying(null);
            setTab('map');
          }}
          next={next}
          lockedNext={lockedNext}
          onNext={(s) => setPlaying({ s })}
          onPaywall={() => {
            setPlaying(null);
            openPaywall(lockedNext?.world);
          }}
        />
      )}

      <Paywall open={paywall.open} focus={paywall.focus} onClose={() => setPaywall({ open: false })} onLegal={setLegal} />
      <Settings
        open={settings}
        onClose={() => setSettings(false)}
        onPaywall={() => {
          setSettings(false);
          openPaywall();
        }}
        onLegal={setLegal}
        onReset={() => setTab('map')}
      />
      <LegalViewer page={legal} onClose={() => setLegal(null)} />

      {toasts[0] && !current && (
        <Toast key={toasts[0].id} onDone={() => setToasts((t) => t.slice(1))}>
          {toasts[0].node}
        </Toast>
      )}
    </div>
  );
}
