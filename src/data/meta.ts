import type { ArchetypeId, SkillId, Tone, World } from '../types';

export const WORLDS: World[] = [
  { id: 'chat', title: 'Group Chat', tagline: 'Read receipts. Screenshots. Drama at 1 a.m.', icon: 'MessagesSquare', color: '#00f5ff', free: true },
  { id: 'school', title: 'School Halls', tagline: 'Group projects, teachers, and the lunch table.', icon: 'School', color: '#ff4b89', free: false },
  { id: 'friends', title: 'Friend Zone', tagline: 'Loyalty tests and the friendships worth keeping.', icon: 'HeartHandshake', color: '#dcb8ff', free: false },
  { id: 'home', title: 'Home Base', tagline: 'Parents, siblings, and the house rules.', icon: 'House', color: '#ffd166', free: false },
  { id: 'online', title: 'Online Life', tagline: 'Comments, clout, and logging off.', icon: 'Globe', color: '#6effa8', free: false },
];

export const SKILLS: Record<SkillId, { name: string; short: string; color: string; blurb: string }> = {
  awareness: { name: 'Self-Awareness', short: 'AWARE', color: '#00f5ff', blurb: 'Naming what you feel before it runs the show.' },
  control: { name: 'Self-Control', short: 'CONTROL', color: '#ff4b89', blurb: 'Pausing between the trigger and the move.' },
  empathy: { name: 'Empathy', short: 'EMPATHY', color: '#dcb8ff', blurb: 'Reading what someone else is going through.' },
  voice: { name: 'Communication', short: 'VOICE', color: '#ffd166', blurb: 'Saying the real thing, clearly and kindly.' },
  boundaries: { name: 'Boundaries', short: 'LIMITS', color: '#6effa8', blurb: 'Protecting your peace without starting a war.' },
};

export const SKILL_ORDER: SkillId[] = ['awareness', 'control', 'empathy', 'voice', 'boundaries'];

export const TONES: Record<Tone, { label: string; style: string; color: string }> = {
  calm: { label: 'Steady', style: 'Steady Hand', color: '#00f5ff' },
  reactive: { label: 'Bold', style: 'Straight Shooter', color: '#ff4b89' },
  avoid: { label: 'Step Back', style: 'Low-Key', color: '#6effa8' },
  humor: { label: 'Humor', style: 'Comic Relief', color: '#ffd166' },
  heated: { label: 'Heated', style: 'Short Fuse', color: '#ff8a3d' },
  ghost: { label: 'Ghosting', style: 'Ghost Mode', color: '#9aa6b2' },
};

/** Display order for tone breakdowns. */
export const TONE_ORDER: Tone[] = ['calm', 'reactive', 'avoid', 'humor', 'heated', 'ghost'];

export const ARCHETYPES: { id: ArchetypeId; title: string; emoji: string; description: string; color: string }[] = [
  { id: 'chill', title: 'Chill Observer', emoji: '😎', description: 'Watches the room, keeps the peace, rarely loses it.', color: '#00f5ff' },
  { id: 'chaos', title: 'Chaos Reactor', emoji: '🔥', description: 'Feels everything at full volume and says it fast.', color: '#ff4b89' },
  { id: 'strategist', title: 'Overthink Strategist', emoji: '🧠', description: 'Drafts the text nine times. Plays the long game.', color: '#dcb8ff' },
  { id: 'connector', title: 'The Connector', emoji: '💬', description: 'Knows everyone, keeps the group together.', color: '#ffd166' },
];

/** Aura colors unlock as you level up. */
export const AURA_COLORS: { color: string; name: string; level: number }[] = [
  { color: '#00f5ff', name: 'Cyan', level: 1 },
  { color: '#ff4b89', name: 'Hot Pink', level: 1 },
  { color: '#dcb8ff', name: 'Lilac', level: 3 },
  { color: '#ffd166', name: 'Gold', level: 5 },
  { color: '#6effa8', name: 'Mint', level: 7 },
  { color: '#ff8a3d', name: 'Ember', level: 9 },
];

export const SUPPORT_EMAIL = 'innerlink24@gmail.com';
export const PRODUCT_ID = 'sociallevels_unlock_all';
export const ENTITLEMENT_ID = 'full_access';
export const PRICE_FALLBACK = '$4.99';
