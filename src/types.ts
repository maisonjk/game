export type ActiveTab = 'home' | 'play' | 'chaos' | 'stats' | 'profile';

export type ArchetypeId = 'chill' | 'chaos' | 'strategist' | 'climber';

export interface Archetype {
  id: ArchetypeId;
  title: string;
  emoji: string;
  description: string;
  glowClass: string;
  themeColor: string;
}

export type ScenarioState = 
  | 'splash'            // Start screen
  | 'archetype_select'  // Screen 1: Choose archetype
  | 'chat_setup'        // Screen 12: Chat setup
  | 'scenario_intro'    // Screen 9: Scenario problem intro
  | 'decision_gameplay' // Screen 11: Main decision choices
  | 'outcome_reveal'    // Screen 7: Results of the decision
  | 'dbt_lesson'        // Screen 10: Evaluation & DBT lesson
  | 'locked_levels';    // Screen 8: Preview of locked states

export interface Customizations {
  moodAura: string;
  moodAuraEmoji: string;
  dripPack: 'ronin' | 'griptape' | 'voidwalker';
  hairIndex: number;
}

export interface UserState {
  archetypeSelected: boolean;
  selectedArchetype: ArchetypeId | null;
  aura: number;
  level: number;
  pulseRate: number;
  streakDays: number;
  calmDecisionsPercentage: number;
  reactiveSpikesPercentage: number;
  customizations: Customizations;
  currentScenarioCompleted: boolean;
  scenarioChoicesSelected: string | null;
}
