"use client";

import { useReducer, useCallback } from "react";
import type { GameState, GameAction, GameMode, BlockId } from "@/types/game";
import { CORRECT_ORDER, SCORE_VALUES, PUZZLE_FLIPPED_COUNT } from "@/constants/game";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = shuffleArray(arr);
  return shuffled.slice(0, count);
}

function isPuzzleSolved(order: BlockId[]): boolean {
  return order.every((id, i) => id === CORRECT_ORDER[i]);
}

function createInitialState(mode: GameMode = "normal"): GameState {
  const blockOrder = mode === "puzzle" ? shuffleArray([...CORRECT_ORDER]) : [...CORRECT_ORDER];
  const flippedBlocks = new Set<BlockId>(
    mode === "puzzle" ? pickRandomItems([...CORRECT_ORDER], PUZZLE_FLIPPED_COUNT) : []
  );

  return {
    mode,
    score: 0,
    blockOrder,
    flippedBlocks,
    revealedEggs: new Set(),
    puzzleSolved: false,
    moveCount: 0,
    startTime: mode === "puzzle" ? Date.now() : null,
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_MODE":
      return createInitialState(action.mode);

    case "SWAP_BLOCKS": {
      const newOrder = [...state.blockOrder];
      [newOrder[action.fromIndex], newOrder[action.toIndex]] = [
        newOrder[action.toIndex],
        newOrder[action.fromIndex],
      ];
      const correctBonus =
        newOrder[action.toIndex] === CORRECT_ORDER[action.toIndex]
          ? SCORE_VALUES.CORRECT_PLACEMENT
          : 0;
      const scoreAdd = state.mode === "puzzle" ? SCORE_VALUES.DRAG_BLOCK + correctBonus : 0;
      const solved = state.mode === "puzzle" && isPuzzleSolved(newOrder);

      return {
        ...state,
        blockOrder: newOrder,
        moveCount: state.moveCount + 1,
        score: state.score + scoreAdd + (solved ? SCORE_VALUES.PUZZLE_COMPLETE : 0),
        puzzleSolved: solved,
      };
    }

    case "FLIP_BLOCK": {
      const newFlipped = new Set(state.flippedBlocks);
      newFlipped.delete(action.id);
      return {
        ...state,
        flippedBlocks: newFlipped,
        score: state.score + (state.mode === "puzzle" ? SCORE_VALUES.FLIP_CARD : 0),
      };
    }

    case "REVEAL_EGG": {
      if (state.revealedEggs.has(action.eggId)) return state;
      const newEggs = new Set(state.revealedEggs);
      newEggs.add(action.eggId);
      return { ...state, revealedEggs: newEggs, score: state.score + action.points };
    }

    case "ADD_SCORE":
      return { ...state, score: state.score + action.points };

    case "RESET":
      return createInitialState("normal");

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, "normal", createInitialState);

  const isGameActive = state.mode !== "normal";

  const correctCount = state.blockOrder.reduce(
    (count, id, i) => count + (id === CORRECT_ORDER[i] ? 1 : 0),
    0
  );

  const setMode = useCallback((mode: GameMode) => dispatch({ type: "SET_MODE", mode }), []);

  return { state, dispatch, isGameActive, correctCount, setMode };
}
