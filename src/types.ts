export type TabId = 'map' | 'daily' | 'you';

export type ArchetypeId = 'chill' | 'chaos' | 'strategist' | 'connector';

/** How a choice "feels". Drives the play-style readout. */
export type Tone = 'calm' | 'reactive' | 'avoid' | 'humor';

/** The five EQ skills the game trains. */
export type SkillId = 'awareness' | 'control' | 'empathy' | 'voice' | 'boundaries';

export type WorldId = 'chat' | 'school' | 'friends' | 'home' | 'online';

export interface Choice {
  id: string;
  text: string;
  tone: Tone;
  /** 0 = backfires, 3 = high-EQ move */
  score: 0 | 1 | 2 | 3;
  skill: SkillId;
  /** What happens next, shown right after the pick. */
  result: string;
}

export interface Beat {
  prompt: string;
  /** Optional prompt override depending on the tone picked in the previous beat. */
  promptByTone?: Partial<Record<Tone, string>>;
  choices: Choice[];
}

export interface Line {
  /** Speaker name. Empty string = narration. */
  from: string;
  text: string;
  me?: boolean;
}

export interface Lesson {
  skill: SkillId;
  title: string;
  body: string;
  tryThis: string;
}

export interface Scenario {
  id: string;
  world: WorldId;
  title: string;
  hook: string;
  /** 1–5 */
  chaos: number;
  mode: 'chat' | 'scene';
  /** Chat name (for chat mode) or location (for scene mode). */
  place: string;
  lines: Line[];
  beats: [Beat, Beat];
  lesson: Lesson;
  /** Heavy topic: no stars or verdict, skip allowed, resources shown. */
  sensitive?: boolean;
  careNote?: string;
}

export interface DailyChaos {
  id: string;
  title: string;
  setup: string;
  choices: Choice[];
  tip: string;
}

export interface World {
  id: WorldId;
  title: string;
  tagline: string;
  icon: string;
  color: string;
  free: boolean;
}

export interface ScenarioRecord {
  stars: number;
  bestScore: number;
  plays: number;
}

export interface GameState {
  version: 1;
  onboarded: boolean;
  name: string;
  archetype: ArchetypeId | null;
  aura: number;
  skills: Record<SkillId, number>;
  tones: Record<Tone, number>;
  records: Record<string, ScenarioRecord>;
  daily: {
    lastDate: string | null;
    streak: number;
    bestStreak: number;
    done: Record<string, number>; // date -> score
    picks?: Record<string, string>; // date -> choice id
  };
  auraColor: string;
  settings: { haptics: boolean; reduceMotion: boolean };
  unlocked: boolean;
  createdAt: string;
}
