export type BlockId =
  | "hero-name"
  | "hero-cta"
  | "stat-experience"
  | "stat-projects"
  | "stat-technologies"
  | "project-1"
  | "project-2"
  | "project-3"
  | "quick-experience"
  | "quick-skills"
  | "quick-projects";

export type BlockSize = "1x1" | "2x1" | "2x2";

export interface BentoBlockConfig {
  id: BlockId;
  label: string;
  size: BlockSize;
  correctPosition: number;
}

export type GameMode = "normal" | "puzzle" | "hop" | "freestyle";

export type PlatformBehavior = "static" | "horizontal" | "vertical";

export interface PlatformConfig {
  blockId: BlockId;
  x: number;
  y: number;
  width: number;
  height: number;
  behavior: PlatformBehavior;
  moveRange?: number;
  moveSpeed?: number;
}

export interface GameState {
  mode: GameMode;
  score: number;
  blockOrder: BlockId[];
  flippedBlocks: Set<BlockId>;
  revealedEggs: Set<string>;
  puzzleSolved: boolean;
  moveCount: number;
  startTime: number | null;
}

export type GameAction =
  | { type: "SET_MODE"; mode: GameMode }
  | { type: "SWAP_BLOCKS"; fromIndex: number; toIndex: number }
  | { type: "FLIP_BLOCK"; id: BlockId }
  | { type: "REVEAL_EGG"; eggId: string; points: number }
  | { type: "ADD_SCORE"; points: number }
  | { type: "RESET" };

export interface EasterEgg {
  id: string;
  trigger: "click-count" | "konami" | "hover-duration" | "shake";
  description: string;
  points: number;
}

export interface ScorePopup {
  id: string;
  points: number;
  x: number;
  y: number;
}
