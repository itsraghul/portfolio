"use client";

import { useEffect, useRef, useCallback } from "react";
import type { GameAction, BlockId } from "@/types/game";
import { EASTER_EGGS } from "@/constants/game";
import { toast } from "sonner";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

interface UseEasterEggsProps {
  dispatch: React.Dispatch<GameAction>;
  revealedEggs: Set<string>;
  isGameActive: boolean;
}

export function useEasterEggs({ dispatch, revealedEggs, isGameActive }: UseEasterEggsProps) {
  const konamiIndex = useRef(0);
  const clickCounts = useRef(new Map<BlockId, number>());
  const hoverTimers = useRef(new Map<string, NodeJS.Timeout>());

  const revealEgg = useCallback(
    (eggId: string) => {
      const egg = EASTER_EGGS.find((e) => e.id === eggId);
      if (!egg || revealedEggs.has(eggId)) return;
      dispatch({ type: "REVEAL_EGG", eggId, points: egg.points });
      toast.success(`Easter Egg: ${egg.description}`, {
        description: `+${egg.points} points!`,
      });
    },
    [dispatch, revealedEggs]
  );

  // Konami code listener
  useEffect(() => {
    if (!isGameActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_SEQUENCE[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_SEQUENCE.length) {
          revealEgg("konami");
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameActive, revealEgg]);

  // Device shake detection (mobile)
  useEffect(() => {
    if (!isGameActive) return;

    let lastX = 0, lastY = 0, lastZ = 0;
    let shakeCount = 0;
    const threshold = 15;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc?.x || !acc?.y || !acc?.z) return;

      const deltaX = Math.abs(acc.x - lastX);
      const deltaY = Math.abs(acc.y - lastY);
      const deltaZ = Math.abs(acc.z - lastZ);

      if (deltaX + deltaY + deltaZ > threshold) {
        shakeCount++;
        if (shakeCount > 3) {
          revealEgg("shake-device");
          shakeCount = 0;
        }
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [isGameActive, revealEgg]);

  const handleBlockClick = useCallback(
    (blockId: BlockId) => {
      if (!isGameActive) return;
      const count = (clickCounts.current.get(blockId) || 0) + 1;
      clickCounts.current.set(blockId, count);

      if (blockId === "hero-name" && count >= 3) {
        revealEgg("triple-click-name");
        clickCounts.current.set(blockId, 0);
      }

      // Reset after a delay
      setTimeout(() => clickCounts.current.set(blockId, 0), 1000);
    },
    [isGameActive, revealEgg]
  );

  const handleBlockHoverStart = useCallback(
    (blockId: string) => {
      if (!isGameActive) return;
      const timer = setTimeout(() => revealEgg("hover-patience"), 10000);
      hoverTimers.current.set(blockId, timer);
    },
    [isGameActive, revealEgg]
  );

  const handleBlockHoverEnd = useCallback((blockId: string) => {
    const timer = hoverTimers.current.get(blockId);
    if (timer) {
      clearTimeout(timer);
      hoverTimers.current.delete(blockId);
    }
  }, []);

  return { handleBlockClick, handleBlockHoverStart, handleBlockHoverEnd };
}
