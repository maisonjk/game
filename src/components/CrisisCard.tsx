import { Icon } from './ui';

/** Safety resources. Shown in Settings and after sensitive scenarios. */
export function CrisisCard({ intro = true }: { intro?: boolean }) {
  return (
    <div className="rounded-2xl border border-mint/30 bg-mint/5 p-4">
      <div className="flex items-center gap-2 text-mint font-display font-extrabold uppercase">
        <Icon name="LifeBuoy" size={18} /> Need to talk to someone?
      </div>
      {intro && (
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Social Levels is a game, not therapy or counseling. If you’re going through something hard, talk to a parent, school counselor, or another adult you trust.
        </p>
      )}
      <ul className="mt-3 grid gap-2.5 text-sm">
        <li>
          <a className="font-semibold text-text underline underline-offset-4" href="tel:988">Call or text 988</a>
          <span className="text-muted"> · Suicide & Crisis Lifeline (US, 24/7)</span>
        </li>
        <li>
          <a className="font-semibold text-text underline underline-offset-4" href="sms:741741&body=HOME">Text HOME to 741741</a>
          <span className="text-muted"> · Crisis Text Line (US)</span>
        </li>
        <li>
          <a className="font-semibold text-text underline underline-offset-4" href="https://findahelpline.com" target="_blank" rel="noreferrer">findahelpline.com</a>
          <span className="text-muted"> · outside the US</span>
        </li>
        <li>
          <a className="font-semibold text-text underline underline-offset-4" href="tel:911">Call 911</a>
          <span className="text-muted"> · if you or someone else is in danger</span>
        </li>
      </ul>
    </div>
  );
}
