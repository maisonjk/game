import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Capacitor } from '@capacitor/core';
import { GameProvider, useGame } from './lib/store';
import { localDate, nextScenario, type RunResult } from './lib/game';
import type { Scenario, TabId } from './types';
import Onboarding, { Splash } from './components/Onboarding';
import { BottomNav, Header } from './components/Chrome';
import MapScreen from './components/MapScreen';
import DailyScreen from './components/DailyScreen';
import StatsScreen from './components/StatsScreen';
import BadgesScreen from './components/BadgesScreen';
import ProfileScreen from './components/ProfileScreen';
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
    <GameProvider fallback={<Splash />}>
      <Game />
    </GameProvider>
  );
}

function Game() {
  const { state } = useGame();
  const [tab, setTab] = useState<TabId>('map');
  const [playing, setPlaying] = useState<Scenario | null>(null);
  const [paywall, setPaywall] = useState(false);
  const [settings, setSettings] = useState(false);
  const [legal, setLegal] = useState<LegalPage | null>(null);
  const [toasts, setToasts] = useState<{ id: number; node: ReactNode }[]>([]);

  const pushToast = useCallback((node: ReactNode) => setToasts((t) => [...t, { id: Date.now() + Math.random(), node }]), []);

  const celebrate = useCallback(
    (r: RunResult) => {
      r.newBadges.forEach((b) =>
        pushToast(
          <>
            <span className="w-8 h-8 rounded-xl grid place-items-center bg-gold/20 text-gold">
              <Icon name={b.icon} size={16} />
            </span>
            <span>
              Badge unlocked: <span className="text-gold">{b.title}</span>
            </span>
          </>,
        ),
      );
    },
    [pushToast],
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  if (!state.onboarded) return <Onboarding />;

  const dailyDue = state.daily.done[localDate()] === undefined;
  const upNext = playing ? nextScenario(state) : null;
  const nextAfter = upNext && upNext.id !== playing?.id ? upNext : null;

  return (
    <div className="min-h-[100dvh] bg-ink">
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="relative">
        <Header onProfile={() => setTab('profile')} />
        <main>
          {tab === 'map' && <MapScreen onPlay={setPlaying} onPaywall={() => setPaywall(true)} />}
          {tab === 'daily' && <DailyScreen onCelebrate={celebrate} />}
          {tab === 'stats' && <StatsScreen />}
          {tab === 'badges' && <BadgesScreen />}
          {tab === 'profile' && <ProfileScreen onSettings={() => setSettings(true)} />}
        </main>
        <BottomNav tab={tab} onTab={setTab} dailyDue={dailyDue} />
      </div>

      {playing && (
        <ScenarioPlayer
          key={playing.id}
          scenario={playing}
          onExit={() => setPlaying(null)}
          hasNext={!!nextAfter}
          onNext={() => setPlaying(nextAfter)}
          onCelebrate={celebrate}
        />
      )}

      <Paywall open={paywall} onClose={() => setPaywall(false)} onLegal={setLegal} />
      <Settings
        open={settings}
        onClose={() => setSettings(false)}
        onPaywall={() => {
          setSettings(false);
          setPaywall(true);
        }}
        onLegal={setLegal}
      />
      <LegalViewer page={legal} onClose={() => setLegal(null)} />

      {toasts[0] && (
        <Toast key={toasts[0].id} onDone={() => setToasts((t) => t.slice(1))}>
          {toasts[0].node}
        </Toast>
      )}
    </div>
  );
}

