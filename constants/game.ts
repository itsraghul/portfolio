import type { BentoBlockConfig, BlockId, EasterEgg, PlatformConfig } from "@/types/game";

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

// Game world dimensions (used by hop mode)
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const CHAR_SIZE = 48;

// Platform layout for hop mode — bottom to top
// Y values increase upward; 0 is the ground level
const PLATFORM_SPACING = 130;

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  { blockId: "hero-name",         x: 200, y: 0 * PLATFORM_SPACING,  width: 400, height: 60, behavior: "static" },
  { blockId: "hero-cta",          x: 250, y: 1 * PLATFORM_SPACING,  width: 300, height: 50, behavior: "static" },
  { blockId: "stat-experience",   x: 80,  y: 2 * PLATFORM_SPACING,  width: 150, height: 40, behavior: "static" },
  { blockId: "stat-projects",     x: 500, y: 3 * PLATFORM_SPACING,  width: 150, height: 40, behavior: "horizontal", moveRange: 150, moveSpeed: 1.5 },
  { blockId: "stat-technologies", x: 200, y: 4 * PLATFORM_SPACING,  width: 150, height: 40, behavior: "static" },
  { blockId: "project-1",         x: 450, y: 5 * PLATFORM_SPACING,  width: 150, height: 40, behavior: "horizontal", moveRange: 150, moveSpeed: 1.2 },
  { blockId: "project-2",         x: 100, y: 6 * PLATFORM_SPACING,  width: 150, height: 40, behavior: "vertical",   moveRange: 30,  moveSpeed: 1.0 },
  { blockId: "project-3",         x: 350, y: 7 * PLATFORM_SPACING,  width: 150, height: 40, behavior: "horizontal", moveRange: 120, moveSpeed: 1.8 },
  { blockId: "quick-experience",  x: 150, y: 8 * PLATFORM_SPACING,  width: 150, height: 40, behavior: "static" },
  { blockId: "quick-skills",      x: 250, y: 9 * PLATFORM_SPACING,  width: 300, height: 50, behavior: "vertical",   moveRange: 20,  moveSpeed: 0.8 },
  { blockId: "quick-projects",    x: 300, y: 10 * PLATFORM_SPACING, width: 150, height: 40, behavior: "static" },
];

export const HOP_SCORE = {
  PLATFORM_LAND: 50,
  UPPER_BONUS: 25,
  VICTORY: 500,
} as const;

export const EASTER_EGGS: EasterEgg[] = [
  { id: "konami", trigger: "konami", description: "Entered the Konami Code!", points: 100 },
  { id: "triple-click-name", trigger: "click-count", description: "Found the secret triple-click!", points: 50 },
  { id: "shake-device", trigger: "shake", description: "Shook things up!", points: 75 },
  { id: "hover-patience", trigger: "hover-duration", description: "Patience is a virtue!", points: 50 },
];
