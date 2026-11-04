# Social Levels

An EQ game for teens (13+). Players work through 30 handwritten, branching social scenarios across five worlds, plus a Daily Chaos quick-play with streaks. Every choice trains one of five skills: Self-Awareness, Self-Control, Empathy, Communication, Boundaries.

- **Free:** Group Chat world (6 scenarios), the first scenario of every other world, and Daily Chaos
- **Paid:** one-time "Unlock All Worlds" ($4.99, non-consumable) for the remaining 20 scenarios
- **Privacy:** no accounts, no ads, no analytics. Progress lives on the device.

Stack: React 19 + Vite + Tailwind 4, wrapped for iOS with Capacitor 8. Purchases via RevenueCat.

## Run it

```bash
npm install
npm run dev          # web preview at localhost:3000
npm run lint         # typecheck
```

## Ship to iPhone

```bash
cp .env.example .env.local        # paste the RevenueCat appl_ key
npm run ios                       # builds the web app and syncs it into ios/
npm run ios:open                  # opens Xcode
```

In Xcode: select the **App** target → Signing & Capabilities → Team = your Apple Developer team → add the **In-App Purchase** capability. Then Product → Archive → Distribute App → App Store Connect.

## Launch checklist

| Step | Where | Value |
| --- | --- | --- |
| App record | App Store Connect → Apps → + | Name **Social Levels**, bundle ID `app.sociallevels.ios`, SKU `sociallevels-ios` |
| In-app purchase | App → Monetization → In-App Purchases | Non-Consumable, Product ID `sociallevels_unlock_all`, $4.99, display name "Unlock All Worlds" |
| RevenueCat | app.revenuecat.com | New project → iOS app → paste App Store Connect API key → import product → entitlement `full_access` attached to it → copy the public **appl_** key into `.env.local` |
| Privacy policy URL | App Information | `/privacy.html` on the deployed site |
| Support URL | Version page | `/support.html` on the deployed site |
| Age rating | App Information | 13+ (mild realistic conflict, no user content, no chat, no ads) |
| App Privacy | App Privacy | Data not linked to you: Purchases (App Functionality). No tracking. |
| Category | App Information | Primary: Games → Educational. Secondary: Games → Simulation |

## Project map

```
src/data/        30 scenarios (world-*.ts), 30 daily chaos (daily.ts), worlds/skills/archetypes (meta.ts)
src/lib/game.ts  levels, scoring, streaks, unlocks, badges
src/lib/store.tsx  save/load (Capacitor Preferences on iOS, localStorage on web)
src/lib/purchases.ts  RevenueCat one-time unlock + restore
src/lib/reminders.ts  opt-in on-device Daily Chaos reminders (local notifications, next 7 days, skips played days)
src/components/  Play (MapScreen), Daily, You (profile, skills, play style, badges), ScenarioPlayer, Paywall, Settings
public/          privacy.html, terms.html, support.html (bundled in the app and on the web)
resources/       icon + splash sources (regenerate with `npx @capacitor/assets generate --ios --assetPath resources`)
```

## Adding a scenario

Add an object to the right `src/data/world-*.ts` file, then run `npm run lint`: it checks that no single tone (Steady, Bold, Step Back, Humor) holds more than 40% of the best moves, that Heated/Ghosting (the unhealthy twins of Bold/Step Back) never score above 1 and Bold/Step Back never below 2, and that the longest option isn't usually the right one. Mark heavy topics `sensitive: true` with a `careNote`: they get a skip option, no score, and the crisis resources card. Each scenario has story `lines`, two `beats` with 3–4 choices (each choice: tone, score 0–3, skill, result text), and a `lesson`. Choices are shuffled at play time, so order doesn't matter. Use `{name}` to insert the player's nickname.
