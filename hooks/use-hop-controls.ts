"use client";

import { useEffect, useRef, useCallback } from "react";

export interface HopInput {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export function useHopControls(isActive: boolean) {
  const keysRef = useRef(new Set<string>());
  const touchRef = useRef<HopInput>({ left: false, right: false, jump: false });

  useEffect(() => {
    if (!isActive) {
      keysRef.current.clear();
      touchRef.current = { left: false, right: false, jump: false };
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "Space", "KeyA", "KeyD", "KeyW"].includes(e.code)) {
        e.preventDefault();
        keysRef.current.add(e.code);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive]);

  const getInput = useCallback((): HopInput => {
    const keys = keysRef.current;
    const touch = touchRef.current;
    return {
      left: keys.has("ArrowLeft") || keys.has("KeyA") || touch.left,
      right: keys.has("ArrowRight") || keys.has("KeyD") || touch.right,
      jump: keys.has("ArrowUp") || keys.has("Space") || keys.has("KeyW") || touch.jump,
    };
  }, []);

  const setTouchInput = useCallback((input: Partial<HopInput>) => {
    touchRef.current = { ...touchRef.current, ...input };
  }, []);

  return { getInput, setTouchInput };
}
