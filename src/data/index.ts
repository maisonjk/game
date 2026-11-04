import type { Scenario, WorldId } from '../types';
import { CHAT } from './world-chat';
import { SCHOOL } from './world-school';
import { FRIENDS } from './world-friends';
import { HOME } from './world-home';
import { ONLINE } from './world-online';

export const SCENARIOS: Scenario[] = [...CHAT, ...SCHOOL, ...FRIENDS, ...HOME, ...ONLINE];

export const SCENARIOS_BY_WORLD: Record<WorldId, Scenario[]> = {
  chat: CHAT,
  school: SCHOOL,
  friends: FRIENDS,
  home: HOME,
  online: ONLINE,
};

export const getScenario = (id: string) => SCENARIOS.find((s) => s.id === id);

export { DAILY } from './daily';
export * from './meta';
