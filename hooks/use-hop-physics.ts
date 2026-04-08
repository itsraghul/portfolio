"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { BlockId, PlatformConfig } from "@/types/game";
import { PLATFORM_CONFIGS, GAME_WIDTH, CHAR_SIZE, HOP_SCORE } from "@/constants/game";
import type { HopInput } from "./use-hop-controls";

// Initial camera position: frames the starting character near the lower third of the viewport
const INITIAL_CHAR_Y = PLATFORM_CONFIGS[0].y - CHAR_SIZE;
const INITIAL_CAMERA_Y = INITIAL_CHAR_Y - 350;

const GRAVITY = 0.6;
const JUMP_VEL = -13;
const MOVE_SPEED = 5;
const MAX_FALL = 12;
const CAMERA_LERP = 0.08;
const FALL_DEATH_OFFSET = 150;

interface CharacterState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  facingRight: boolean;
  currentPlatformIdx: number | null;
}

interface PlatformPosition {
  x: number;
  y: number;
}

export interface HopPhysicsState {
  characterPos: { x: number; y: number };
  characterVel: { vx: number; vy: number };
  isGrounded: boolean;
  facingRight: boolean;
  cameraY: number;
  platformPositions: Map<BlockId, PlatformPosition>;
  isGameOver: boolean;
  isComplete: boolean;
  highestPlatformIdx: number;
  score: number;
}

export function useHopPhysics(
  isActive: boolean,
  getInput: () => HopInput,
  onScore: (points: number) => void,
) {
  const [physicsState, setPhysicsState] = useState<HopPhysicsState>(() => createInitialPhysicsState());
  const charRef = useRef<CharacterState>(createInitialChar());
  const cameraYRef = useRef(INITIAL_CAMERA_Y);
  const maxCameraYRef = useRef(INITIAL_CAMERA_Y);
  const visitedPlatformsRef = useRef(new Set<number>([0]));
  const highestIdxRef = useRef(0);
  const gameOverRef = useRef(false);
  const completeRef = useRef(false);
  const scoreRef = useRef(0);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const prevJumpRef = useRef(false);

  const restart = useCallback(() => {
    charRef.current = createInitialChar();
    cameraYRef.current = INITIAL_CAMERA_Y;
    maxCameraYRef.current = INITIAL_CAMERA_Y;
    visitedPlatformsRef.current = new Set([0]);
    highestIdxRef.current = 0;
    gameOverRef.current = false;
    completeRef.current = false;
    scoreRef.current = 0;
    timeRef.current = 0;
    prevJumpRef.current = false;
    setPhysicsState(createInitialPhysicsState());
  }, []);

  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(rafRef.current);
      restart();
      return;
    }

    const step = () => {
      if (gameOverRef.current || completeRef.current) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      timeRef.current += 1 / 60;
      const input = getInput();
      const char = charRef.current;
      const t = timeRef.current;

      // Compute current platform positions (with movement)
      const platPositions = computePlatformPositions(t);

      // Horizontal movement
      if (input.left) {
        char.vx = -MOVE_SPEED;
        char.facingRight = false;
      } else if (input.right) {
        char.vx = MOVE_SPEED;
        char.facingRight = true;
      } else {
        char.vx = 0;
      }

      // Jump — only on rising edge
      if (input.jump && char.isGrounded && !prevJumpRef.current) {
        char.vy = JUMP_VEL;
        char.isGrounded = false;
        char.currentPlatformIdx = null;
      }
      prevJumpRef.current = input.jump;

      // Apply gravity
      char.vy = Math.min(char.vy + GRAVITY, MAX_FALL);

      // Move with platform if standing on one
      if (char.isGrounded && char.currentPlatformIdx !== null) {
        const plat = PLATFORM_CONFIGS[char.currentPlatformIdx];
        const platPos = platPositions.get(plat.blockId);
        if (platPos) {
          // Get prev position to compute delta
          const prevPlatPos = computeSinglePlatformPosition(plat, t - 1 / 60);
          char.x += platPos.x - prevPlatPos.x;
          char.y += platPos.y - prevPlatPos.y;
        }
      }

      // Apply velocity
      char.x += char.vx;
      char.y += char.vy;

      // Wall collision — wrap around
      if (char.x + CHAR_SIZE < 0) char.x = GAME_WIDTH;
      if (char.x > GAME_WIDTH) char.x = -CHAR_SIZE;

      // Platform collision (one-way: only when falling)
      char.isGrounded = false;
      char.currentPlatformIdx = null;

      if (char.vy >= 0) {
        for (let i = 0; i < PLATFORM_CONFIGS.length; i++) {
          const plat = PLATFORM_CONFIGS[i];
          const pp = platPositions.get(plat.blockId)!;
          const platTop = pp.y;
          const platLeft = pp.x;
          const platRight = pp.x + plat.width;

          const charBottom = char.y + CHAR_SIZE;
          const charCenterX = char.x + CHAR_SIZE / 2;

          // Check horizontal overlap (character center within platform)
          if (charCenterX > platLeft && charCenterX < platRight) {
            // Check if character is landing on top of platform
            if (charBottom >= platTop && charBottom <= platTop + plat.height + char.vy + 2) {
              char.y = platTop - CHAR_SIZE;
              char.vy = 0;
              char.isGrounded = true;
              char.currentPlatformIdx = i;

              // Score for new platform
              if (!visitedPlatformsRef.current.has(i)) {
                visitedPlatformsRef.current.add(i);
                let points = HOP_SCORE.PLATFORM_LAND;
                if (i >= 8) points += HOP_SCORE.UPPER_BONUS;
                scoreRef.current += points;
                onScore(points);
              }

              if (i > highestIdxRef.current) {
                highestIdxRef.current = i;
              }

              // Victory check
              if (i === PLATFORM_CONFIGS.length - 1) {
                completeRef.current = true;
                scoreRef.current += HOP_SCORE.VICTORY;
                onScore(HOP_SCORE.VICTORY);
              }

              break;
            }
          }
        }
      }

      // Camera — follow character upward, ratchet
      const targetCameraY = char.y - 350; // keep character ~40% from bottom of 600px viewport
      if (targetCameraY < maxCameraYRef.current) {
        maxCameraYRef.current = targetCameraY;
      }
      cameraYRef.current += (maxCameraYRef.current - cameraYRef.current) * CAMERA_LERP;

      // Fall death
      if (char.y > cameraYRef.current + 600 + FALL_DEATH_OFFSET) {
        gameOverRef.current = true;
      }

      // Build state for rendering
      setPhysicsState({
        characterPos: { x: char.x, y: char.y },
        characterVel: { vx: char.vx, vy: char.vy },
        isGrounded: char.isGrounded,
        facingRight: char.facingRight,
        cameraY: cameraYRef.current,
        platformPositions: platPositions,
        isGameOver: gameOverRef.current,
        isComplete: completeRef.current,
        highestPlatformIdx: highestIdxRef.current,
        score: scoreRef.current,
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, getInput, onScore, restart]);

  return { ...physicsState, restart };
}

function createInitialChar(): CharacterState {
  const startPlat = PLATFORM_CONFIGS[0];
  return {
    x: startPlat.x + startPlat.width / 2 - CHAR_SIZE / 2,
    y: startPlat.y - CHAR_SIZE,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    currentPlatformIdx: 0,
  };
}

function createInitialPhysicsState(): HopPhysicsState {
  const char = createInitialChar();
  return {
    characterPos: { x: char.x, y: char.y },
    characterVel: { vx: 0, vy: 0 },
    isGrounded: true,
    facingRight: true,
    cameraY: INITIAL_CAMERA_Y,
    platformPositions: computePlatformPositions(0),
    isGameOver: false,
    isComplete: false,
    highestPlatformIdx: 0,
    score: 0,
  };
}

function computeSinglePlatformPosition(plat: PlatformConfig, t: number): PlatformPosition {
  let x = plat.x;
  let y = plat.y;
  if (plat.behavior === "horizontal" && plat.moveRange && plat.moveSpeed) {
    x += Math.sin(t * plat.moveSpeed) * plat.moveRange;
  } else if (plat.behavior === "vertical" && plat.moveRange && plat.moveSpeed) {
    y += Math.sin(t * plat.moveSpeed) * plat.moveRange;
  }
  return { x, y };
}

function computePlatformPositions(t: number): Map<BlockId, PlatformPosition> {
  const map = new Map<BlockId, PlatformPosition>();
  for (const plat of PLATFORM_CONFIGS) {
    map.set(plat.blockId, computeSinglePlatformPosition(plat, t));
  }
  return map;
}
