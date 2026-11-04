import { useGame } from '../lib/store';
import { levelProgress } from '../lib/game';
import { tap } from '../lib/haptics';
import type { TabId } from '../types';
import { Icon } from './ui';

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00f5ff" />
          <stop offset="1" stopColor="#ff4b89" />
        </linearGradient>
      </defs>
      <rect x="8" y="38" width="12" height="18" rx="3" fill="url(#lg)" opacity="0.55" />
      <rect x="26" y="26" width="12" height="30" rx="3" fill="url(#lg)" opacity="0.8" />
      <rect x="44" y="10" width="12" height="46" rx="3" fill="url(#lg)" />
    </svg>
  );
}

export function Header({ onProfile }: { onProfile: () => void }) {
  const { state } = useGame();
  const lp = levelProgress(state.aura);
  return (
    <header className="sticky top-0 z-40 pt-safe bg-ink/80 backdrop-blur-xl border-b border-line">
      <div className="h-14 px-4 flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <Logo size={26} />
          <span className="font-display font-black text-lg tracking-tight uppercase whitespace-nowrap max-[359px]:hidden">Social Levels</span>
        </div>
        <button
          onClick={() => {
            tap();
            onProfile();
          }}
          aria-label={`Level ${lp.level}, ${state.aura} aura. Open profile`}
          className="flex items-center gap-2 pl-3 pr-1.5 h-11 rounded-full whitespace-nowrap bg-white/5 border border-line active:scale-95 transition"
        >
          <span className="font-display font-extrabold text-sm text-cyan tabular-nums">{state.aura}</span>
          <span className="text-[10px] font-bold text-muted tracking-widest">AURA</span>
          <span className="h-6 px-2 rounded-full grid place-items-center text-[11px] font-display font-black text-ink" style={{ background: state.auraColor }}>
            LV {lp.level}
          </span>
        </button>
      </div>
    </header>
  );
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'map', label: 'Play', icon: 'Map' },
  { id: 'daily', label: 'Daily', icon: 'Zap' },
  { id: 'you', label: 'You', icon: 'User' },
];

export function BottomNav({ tab, onTab, dailyDue }: { tab: TabId; onTab: (t: TabId) => void; dailyDue: boolean }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-ink/90 backdrop-blur-xl border-t border-line pb-safe" aria-label="Main">
      <div className="max-w-lg mx-auto grid grid-cols-3 h-16">
        {TABS.map((t) => {
          const active = tab === t.id;
          if (t.id === 'daily') {
            return (
              <button
                key={t.id}
                aria-label="Daily Chaos"
                aria-current={active ? 'page' : undefined}
                onClick={() => {
                  tap();
                  onTab(t.id);
                }}
                className="relative flex flex-col items-center justify-center"
              >
                <span
                  className={`-mt-7 w-14 h-14 rounded-full grid place-items-center border-2 transition ${
                    active ? 'bg-pink border-pink text-white shadow-[0_0_24px_rgba(255,75,137,0.6)]' : 'bg-panel-2 border-pink/50 text-pink'
                  }`}
                >
                  <Icon name="Zap" size={26} className={active ? 'fill-white' : 'fill-pink/30'} />
                </span>
                {dailyDue && <span className="absolute top-0 right-[34%] w-3 h-3 rounded-full bg-gold border-2 border-ink" aria-label="New daily available" />}
                <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase ${active ? 'text-pink' : 'text-muted'}`}>Daily</span>
              </button>
            );
          }
          return (
            <button
              key={t.id}
              aria-label={t.id === 'map' ? 'Play: worlds map' : t.label}
              aria-current={active ? 'page' : undefined}
              onClick={() => {
                tap();
                onTab(t.id);
              }}
              className={`flex flex-col items-center justify-center gap-1 transition ${active ? 'text-cyan' : 'text-muted'}`}
            >
              <Icon name={t.icon} size={22} strokeWidth={active ? 2.6 : 2} />
              <span className="text-[10px] font-bold tracking-wider uppercase">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
