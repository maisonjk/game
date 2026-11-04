import type { Choice, DailyChaos, GameState, Scenario, SkillId, Tone } from '../types';
import { DAILY, SCENARIOS, SCENARIOS_BY_WORLD, WORLDS } from '../data';

export const STORAGE_KEY = 'social_levels_save_v1';

export const freshState = (): GameState => ({
  version: 1,
  onboarded: false,
  name: '',
  archetype: null,
  aura: 0,
  skills: { awareness: 0, control: 0, empathy: 0, voice: 0, boundaries: 0 },
  tones: { calm: 0, reactive: 0, avoid: 0, humor: 0 },
  records: {},
  daily: { lastDate: null, streak: 0, bestStreak: 0, done: {} },
  auraColor: '#00f5ff',
  settings: { haptics: true, reduceMotion: false },
  unlocked: false,
  createdAt: new Date().toISOString(),
});

/** Merge a saved blob onto defaults so new fields never crash old saves. */
export function hydrate(raw: string | null): GameState {
  const base = freshState();
  if (!raw) return base;
  try {
    const s = JSON.parse(raw) as Partial<GameState>;
    return {
      ...base,
      ...s,
      skills: { ...base.skills, ...(s.skills ?? {}) },
      tones: { ...base.tones, ...(s.tones ?? {}) },
      records: { ...(s.records ?? {}) },
      daily: { ...base.daily, ...(s.daily ?? {}), done: { ...(s.daily?.done ?? {}) } },
      settings: { ...base.settings, ...(s.settings ?? {}) },
    };
  } catch {
    return base;
  }
}

/* ---------- Levels ---------- */

export const levelFromAura = (aura: number) => Math.floor(Math.sqrt(Math.max(0, aura) / 50)) + 1;
export const auraForLevel = (level: number) => 50 * (level - 1) ** 2;

export function levelProgress(aura: number) {
  const level = levelFromAura(aura);
  const floor = auraForLevel(level);
  const next = auraForLevel(level + 1);
  return { level, into: aura - floor, span: next - floor, pct: (aura - floor) / (next - floor), toNext: next - aura };
}

export const LEVEL_TITLES = [
  'NPC', 'Side Character', 'Rising Player', 'Vibe Reader', 'Room Reader',
  'Calm Operator', 'Social Strategist', 'Main Character', 'EQ Elite', 'Legend',
];
export const levelTitle = (level: number) => LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1];

/* ---------- Dates ---------- */

export function localDate(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function shiftDate(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(y, m - 1, d + days);
  return localDate(dt);
}

export function dailyFor(date: string): DailyChaos {
  const [y, m, d] = date.split('-').map(Number);
  const dayNumber = Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
  return DAILY[((dayNumber % DAILY.length) + DAILY.length) % DAILY.length];
}

/** Streak that is still "alive" today (done today or yesterday). */
export function liveStreak(state: GameState, today = localDate()): number {
  const last = state.daily.lastDate;
  if (!last) return 0;
  if (last === today || last === shiftDate(today, -1)) return state.daily.streak;
  return 0;
}

/* ---------- Unlocks ---------- */

export function worldAccessible(state: GameState, worldId: string) {
  const w = WORLDS.find((x) => x.id === worldId);
  return !!w && (w.free || state.unlocked);
}

/** Within a world, scenarios open one at a time. */
export function scenarioOpen(state: GameState, s: Scenario) {
  if (!worldAccessible(state, s.world)) return false;
  const list = SCENARIOS_BY_WORLD[s.world];
  const i = list.findIndex((x) => x.id === s.id);
  return i === 0 || !!state.records[list[i - 1].id];
}

export function worldProgress(state: GameState, worldId: keyof typeof SCENARIOS_BY_WORLD) {
  const list = SCENARIOS_BY_WORLD[worldId];
  const done = list.filter((s) => state.records[s.id]).length;
  const stars = list.reduce((n, s) => n + (state.records[s.id]?.stars ?? 0), 0);
  return { done, total: list.length, stars, maxStars: list.length * 3 };
}

export function nextScenario(state: GameState): Scenario | null {
  for (const s of SCENARIOS) {
    if (scenarioOpen(state, s) && !state.records[s.id]) return s;
  }
  return null;
}

/* ---------- Scoring ---------- */

export const starsFor = (score: number, max: number) => {
  const r = score / max;
  return r >= 0.83 ? 3 : r >= 0.5 ? 2 : 1;
};

function tally(state: GameState, picks: Choice[]) {
  const skills = { ...state.skills };
  const tones = { ...state.tones };
  for (const p of picks) {
    skills[p.skill as SkillId] += p.score;
    tones[p.tone as Tone] += 1;
  }
  return { skills, tones };
}

export interface RunResult {
  score: number;
  max: number;
  stars: number;
  auraGained: number;
  firstClear: boolean;
  newBest: boolean;
  levelBefore: number;
  levelAfter: number;
  newBadges: Badge[];
}

export function completeScenario(state: GameState, s: Scenario, picks: Choice[]): [GameState, RunResult] {
  const score = picks.reduce((n, p) => n + p.score, 0);
  const max = picks.length * 3;
  const stars = starsFor(score, max);
  const prev = state.records[s.id];
  const firstClear = !prev;
  const newBest = !prev || score > prev.bestScore;
  const auraGained = firstClear ? 20 + 10 * score : newBest ? 10 * (score - prev.bestScore) : 5;

  const { skills, tones } = tally(state, picks);
  const next: GameState = {
    ...state,
    aura: state.aura + auraGained,
    skills,
    tones,
    records: {
      ...state.records,
      [s.id]: {
        stars: Math.max(stars, prev?.stars ?? 0),
        bestScore: Math.max(score, prev?.bestScore ?? 0),
        plays: (prev?.plays ?? 0) + 1,
      },
    },
  };
  return [next, finish(state, next, { score, max, stars, auraGained, firstClear, newBest })];
}

export function completeDaily(state: GameState, date: string, pick: Choice): [GameState, RunResult] {
  const already = state.daily.done[date] !== undefined;
  const auraGained = already ? 0 : 15 + 5 * pick.score;
  const yesterday = shiftDate(date, -1);
  const streak = already
    ? state.daily.streak
    : state.daily.lastDate === yesterday
      ? state.daily.streak + 1
      : 1;
  const { skills, tones } = already ? { skills: state.skills, tones: state.tones } : tally(state, [pick]);
  const next: GameState = {
    ...state,
    aura: state.aura + auraGained,
    skills,
    tones,
    daily: {
      lastDate: date,
      streak,
      bestStreak: Math.max(state.daily.bestStreak, streak),
      done: { ...state.daily.done, [date]: pick.score },
    },
  };
  return [next, finish(state, next, { score: pick.score, max: 3, stars: starsFor(pick.score, 3), auraGained, firstClear: !already, newBest: !already })];
}

function finish(before: GameState, after: GameState, r: Omit<RunResult, 'levelBefore' | 'levelAfter' | 'newBadges'>): RunResult {
  const had = new Set(earnedBadges(before).map((b) => b.id));
  return {
    ...r,
    levelBefore: levelFromAura(before.aura),
    levelAfter: levelFromAura(after.aura),
    newBadges: earnedBadges(after).filter((b) => !had.has(b.id)),
  };
}

/* ---------- Play style ---------- */

export function playStyle(state: GameState): { tone: Tone; pct: number } | null {
  const total = Object.values(state.tones).reduce((a, b) => a + b, 0);
  if (!total) return null;
  const [tone, n] = (Object.entries(state.tones) as [Tone, number][]).sort((a, b) => b[1] - a[1])[0];
  return { tone, pct: Math.round((n / total) * 100) };
}

/* ---------- Badges ---------- */

export interface Badge {
  id: string;
  title: string;
  desc: string;
  icon: string;
  check: (s: GameState) => boolean;
}

const cleared = (s: GameState) => Object.keys(s.records).length;
const perfects = (s: GameState) => Object.values(s.records).filter((r) => r.stars === 3).length;
const worldDone = (s: GameState, w: keyof typeof SCENARIOS_BY_WORLD) =>
  SCENARIOS_BY_WORLD[w].every((x) => s.records[x.id]);

export const BADGES: Badge[] = [
  { id: 'first', title: 'Player One', desc: 'Clear your first scenario.', icon: 'Play', check: (s) => cleared(s) >= 1 },
  { id: 'perfect', title: 'Flawless', desc: 'Get 3 stars on any scenario.', icon: 'Star', check: (s) => perfects(s) >= 1 },
  { id: 'daily3', title: 'On a Roll', desc: 'Hit a 3-day Daily Chaos streak.', icon: 'Flame', check: (s) => s.daily.bestStreak >= 3 },
  { id: 'calm10', title: 'Cool Head', desc: 'Make 10 calm choices.', icon: 'Snowflake', check: (s) => s.tones.calm >= 10 },
  { id: 'w-chat', title: 'Chat Survivor', desc: 'Clear every Group Chat scenario.', icon: 'MessagesSquare', check: (s) => worldDone(s, 'chat') },
  { id: 'w-school', title: 'Hall Monitor', desc: 'Clear every School Halls scenario.', icon: 'School', check: (s) => worldDone(s, 'school') },
  { id: 'w-friends', title: 'Ride or Die', desc: 'Clear every Friend Zone scenario.', icon: 'HeartHandshake', check: (s) => worldDone(s, 'friends') },
  { id: 'w-home', title: 'Peacekeeper', desc: 'Clear every Home Base scenario.', icon: 'House', check: (s) => worldDone(s, 'home') },
  { id: 'w-online', title: 'Logged In', desc: 'Clear every Online Life scenario.', icon: 'Globe', check: (s) => worldDone(s, 'online') },
  { id: 'level5', title: 'Room Reader', desc: 'Reach Level 5.', icon: 'TrendingUp', check: (s) => levelFromAura(s.aura) >= 5 },
  { id: 'daily7', title: 'Week Warrior', desc: 'Hit a 7-day Daily Chaos streak.', icon: 'CalendarCheck', check: (s) => s.daily.bestStreak >= 7 },
  { id: 'perfect10', title: 'Perfectionist', desc: 'Get 3 stars on 10 scenarios.', icon: 'Sparkles', check: (s) => perfects(s) >= 10 },
  { id: 'all', title: 'Main Character', desc: 'Clear all 30 scenarios.', icon: 'Crown', check: (s) => cleared(s) >= SCENARIOS.length },
];

export const earnedBadges = (s: GameState) => BADGES.filter((b) => b.check(s));

/** Replace {name} tokens in scenario text. */
export const personalize = (text: string, name: string) => text.replaceAll('{name}', name || 'me');
