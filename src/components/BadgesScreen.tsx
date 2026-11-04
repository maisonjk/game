import { BADGES } from '../lib/game';
import { useGame } from '../lib/store';
import { Eyebrow, Icon } from './ui';

export default function BadgesScreen() {
  const { state } = useGame();
  const earned = BADGES.filter((b) => b.check(state)).length;
  return (
    <div className="px-4 pt-5 pb-28 max-w-lg mx-auto">
      <Eyebrow color="text-gold">Badges</Eyebrow>
      <h1 className="mt-1 font-display font-black text-[34px] leading-none uppercase tracking-tight">
        {earned}/{BADGES.length} unlocked
      </h1>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {BADGES.map((b, i) => {
          const got = b.check(state);
          return (
            <div
              key={b.id}
              className={`rounded-3xl border p-4 anim-rise ${got ? 'border-gold/40' : 'border-line bg-panel'}`}
              style={{ animationDelay: `${i * 30}ms`, background: got ? 'linear-gradient(160deg, #ffd16620, #161b2a 70%)' : undefined }}
              aria-label={`${b.title}: ${b.desc} ${got ? 'Unlocked' : 'Locked'}`}
            >
              <div className={`w-12 h-12 rounded-2xl grid place-items-center ${got ? 'bg-gold/20 text-gold' : 'bg-white/5 text-faint'}`}>
                <Icon name={got ? b.icon : 'Lock'} size={22} />
              </div>
              <div className={`mt-3 font-display font-extrabold uppercase leading-tight ${got ? '' : 'text-muted'}`}>{b.title}</div>
              <div className="mt-1 text-[12px] text-muted leading-snug">{b.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
