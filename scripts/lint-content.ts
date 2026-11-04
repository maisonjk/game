/* Content guardrails: run with `npx tsx scripts/lint-content.ts` (part of npm run lint). */
import { SCENARIOS, DAILY } from '../src/data/index.ts';

const problems: string[] = [];
const best: Record<string, number> = { calm: 0, reactive: 0, avoid: 0, humor: 0 };
let beats = 0;
let longestIsBest = 0;

for (const s of SCENARIOS) {
  s.beats.forEach((b, i) => {
    beats++;
    const tops = b.choices.filter((c) => c.score === 3);
    if (!tops.length) problems.push(`${s.id} beat ${i}: no 3-point choice`);
    tops.forEach((c) => best[c.tone]++);
    const longest = [...b.choices].sort((x, y) => y.text.length - x.text.length)[0];
    if (longest.score === 3 && tops.length === 1) longestIsBest++;
    if (s.sensitive && s.chaos === 5 && b.choices.some((c) => c.tone === 'humor' && c.score > 0)) problems.push(`${s.id}: scored joke option in a sensitive scenario`);
    if (new Set(b.choices.map((c) => c.id)).size !== b.choices.length) problems.push(`${s.id} beat ${i}: duplicate ids`);
  });
}
const dailyBest: Record<string, number> = { calm: 0, reactive: 0, avoid: 0, humor: 0 };
for (const d of DAILY) {
  const tops = d.choices.filter((c) => c.score === 3);
  if (!tops.length) problems.push(`daily ${d.id}: no 3-point choice`);
  tops.forEach((c) => dailyBest[c.tone]++);
}
const dailyTotal = Object.values(dailyBest).reduce((a, b) => a + b, 0);
for (const [t, n] of Object.entries(dailyBest)) if (n / dailyTotal > 0.55) problems.push(`daily: tone "${t}" holds ${Math.round((n / dailyTotal) * 100)}% of best moves (max 55%)`);

// A lazy formula ("pick the Steady one, else the joke") must not win most scenarios.
let formulaWins = 0;
let scored = 0;
for (const s of SCENARIOS) {
  if (s.sensitive) continue;
  scored++;
  const pts = s.beats.reduce((n, b) => {
    const calm = b.choices.filter((c) => c.tone === 'calm');
    const pool = calm.length ? calm : b.choices.filter((c) => c.tone === 'humor');
    if (!pool.length) return n;
    return n + pool.reduce((a, c) => a + c.score, 0) / pool.length;
  }, 0);
  if (pts / 6 >= 0.99) formulaWins++;
}
if (formulaWins / scored > 0.6) problems.push(`"Steady else joke" earns 3 stars on ${formulaWins}/${scored} scenarios (max 60%)`);

const total = Object.values(best).reduce((a, b) => a + b, 0);
for (const [t, n] of Object.entries(best)) if (n / total > 0.4) problems.push(`tone "${t}" holds ${Math.round((n / total) * 100)}% of best moves (max 40%)`);
if (longestIsBest / beats > 0.4) problems.push(`longest option is the only best move in ${longestIsBest}/${beats} beats (max 40%)`);

console.log('daily best tones:', dailyBest, `| formula 3-star ${formulaWins}/${scored}`);
console.log('best-move tones:', Object.fromEntries(Object.entries(best).map(([k, v]) => [k, `${Math.round((v / total) * 100)}%`])), `| longest=best ${longestIsBest}/${beats}`);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('content OK');
