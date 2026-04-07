import type { BentoBlockConfig, BlockId, EasterEgg } from "@/types/game";

export const BENTO_BLOCKS: BentoBlockConfig[] = [
  { id: "hero-name", label: "Identity", size: "2x2", correctPosition: 0 },
  { id: "hero-cta", label: "Connect", size: "2x1", correctPosition: 1 },
  { id: "stat-experience", label: "Years", size: "1x1", correctPosition: 2 },
  { id: "stat-projects", label: "Projects", size: "1x1", correctPosition: 3 },
  { id: "stat-technologies", label: "Tech", size: "1x1", correctPosition: 4 },
  { id: "project-1", label: "Mock Data", size: "1x1", correctPosition: 5 },
  { id: "project-2", label: "DataForge", size: "1x1", correctPosition: 6 },
  { id: "project-3", label: "Hearty Foods", size: "1x1", correctPosition: 7 },
  { id: "quick-experience", label: "Experience", size: "1x1", correctPosition: 8 },
  { id: "quick-skills", label: "Skills", size: "2x1", correctPosition: 9 },
  { id: "quick-projects", label: "Projects", size: "1x1", correctPosition: 10 },
];

export const CORRECT_ORDER: BlockId[] = BENTO_BLOCKS.map((b) => b.id);

export const SCORE_VALUES = {
  DRAG_BLOCK: 10,
  FLIP_CARD: 15,
  CORRECT_PLACEMENT: 25,
  EASTER_EGG: 100,
  PUZZLE_COMPLETE: 500,
} as const;

export const PUZZLE_FLIPPED_COUNT = 4;

export const EASTER_EGGS: EasterEgg[] = [
  { id: "konami", trigger: "konami", description: "Entered the Konami Code!", points: 100 },
  { id: "triple-click-name", trigger: "click-count", description: "Found the secret triple-click!", points: 50 },
  { id: "shake-device", trigger: "shake", description: "Shook things up!", points: 75 },
  { id: "hover-patience", trigger: "hover-duration", description: "Patience is a virtue!", points: 50 },
];
