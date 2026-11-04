import type { Choice, SkillId, Tone } from '../types';

/** Compact choice builder: c(id, text, tone, score, skill, result) */
export const c = (
  id: string,
  text: string,
  tone: Tone,
  score: 0 | 1 | 2 | 3,
  skill: SkillId,
  result: string,
): Choice => ({ id, text, tone, score, skill, result });
