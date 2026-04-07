"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { BlockId } from "@/types/game";

interface PhysicsBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
}

const GRAVITY = 0.5;
const DAMPING = 0.7;
const FLOOR_Y = 600;

export function useGravityPhysics(
  blockOrder: BlockId[],
  isActive: boolean
) {
  const [positions, setPositions] = useState<Map<BlockId, { x: number; y: number }>>(new Map());
  const bodiesRef = useRef<Map<BlockId, PhysicsBody>>(new Map());
  const rafRef = useRef<number>(0);

  const initBodies = useCallback(() => {
    const bodies = new Map<BlockId, PhysicsBody>();
    blockOrder.forEach((id, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      bodies.set(id, {
        x: col * 200,
        y: row * 180,
        vx: (Math.random() - 0.5) * 4,
        vy: 0,
        width: 180,
        height: 160,
      });
    });
    bodiesRef.current = bodies;
  }, [blockOrder]);

  useEffect(() => {
    if (!isActive) {
      setPositions(new Map());
      cancelAnimationFrame(rafRef.current);
      return;
    }

    initBodies();

    const step = () => {
      const newPositions = new Map<BlockId, { x: number; y: number }>();

      bodiesRef.current.forEach((body, id) => {
        body.vy += GRAVITY;
        body.x += body.vx;
        body.y += body.vy;

        // Floor collision
        if (body.y + body.height > FLOOR_Y) {
          body.y = FLOOR_Y - body.height;
          body.vy *= -DAMPING;
          body.vx *= 0.95;
          if (Math.abs(body.vy) < 1) body.vy = 0;
        }

        // Wall collision
        if (body.x < 0) { body.x = 0; body.vx *= -DAMPING; }
        if (body.x + body.width > 800) { body.x = 800 - body.width; body.vx *= -DAMPING; }

        newPositions.set(id, { x: body.x, y: body.y });
      });

      // Simple inter-body collision
      const entries = Array.from(bodiesRef.current.entries());
      for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
          const [, a] = entries[i];
          const [, b] = entries[j];
          if (
            a.x < b.x + b.width && a.x + a.width > b.x &&
            a.y < b.y + b.height && a.y + a.height > b.y
          ) {
            const overlapY = Math.min(a.y + a.height - b.y, b.y + b.height - a.y);
            if (a.y < b.y) {
              a.y -= overlapY / 2;
              b.y += overlapY / 2;
            } else {
              a.y += overlapY / 2;
              b.y -= overlapY / 2;
            }
            const tempVy = a.vy;
            a.vy = b.vy * DAMPING;
            b.vy = tempVy * DAMPING;
          }
        }
      }

      setPositions(newPositions);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, initBodies]);

  const applyForce = useCallback((id: BlockId, fx: number, fy: number) => {
    const body = bodiesRef.current.get(id);
    if (body) {
      body.vx += fx;
      body.vy += fy;
    }
  }, []);

  return { positions, applyForce };
}
