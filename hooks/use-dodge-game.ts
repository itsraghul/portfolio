"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Bullet, DodgeWaveConfig } from "@/types/game";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  CHAR_SIZE,
  INITIAL_LIVES,
  PLAYER_RADIUS,
  DODGE_BULLET_RADIUS,
  DODGE_INVINCIBILITY_MS,
  DODGE_WAVE_TRANSITION_MS,
  DODGE_SCORE_PER_FRAME,
  DODGE_ICONS,
  DODGE_WAVES,
  DODGE_WAVE_BONUS,
} from "@/constants/game";

interface DodgeGameState {
  bullets: Bullet[];
  score: number;
  wave: number;
  lives: number;
  running: boolean;
  invincibleUntil: number;
  waveStartTime: number;
  lastBulletTime: number;
  frameCount: number;
  isComplete: boolean;
  isGameOver: boolean;
}

export interface DodgeHUDState {
  score: number;
  wave: number;
  lives: number;
  isComplete: boolean;
  isGameOver: boolean;
}

const INITIAL_HUD: DodgeHUDState = {
  score: 0,
  wave: 1,
  lives: INITIAL_LIVES,
  isComplete: false,
  isGameOver: false,
};

function createInitialGameState(): DodgeGameState {
  return {
    bullets: [],
    score: 0,
    wave: 0,
    lives: INITIAL_LIVES,
    running: false,
    invincibleUntil: 0,
    waveStartTime: 0,
    lastBulletTime: 0,
    frameCount: 0,
    isComplete: false,
    isGameOver: false,
  };
}

function spawnBullet(g: DodgeGameState, waveConfig: DodgeWaveConfig, timestamp: number): void {
  const icon = DODGE_ICONS[Math.floor(Math.random() * DODGE_ICONS.length)];
  const pattern = waveConfig.patterns[Math.floor(Math.random() * waveConfig.patterns.length)];
  const speed = waveConfig.speedBase * (0.8 + Math.random() * 0.4);
  const R = DODGE_BULLET_RADIUS;

  let x: number, y: number, vx: number, vy: number;

  switch (pattern) {
    case "right":
      x = GAME_WIDTH + R;
      y = R + Math.random() * (GAME_HEIGHT - 2 * R);
      vx = -speed;
      vy = (Math.random() - 0.5) * speed * 0.5;
      break;
    case "top":
      x = R + Math.random() * (GAME_WIDTH - 2 * R);
      y = -R;
      vx = (Math.random() - 0.5) * speed * 0.5;
      vy = speed;
      break;
    case "bottom":
      x = R + Math.random() * (GAME_WIDTH - 2 * R);
      y = GAME_HEIGHT + R;
      vx = (Math.random() - 0.5) * speed * 0.5;
      vy = -speed;
      break;
    case "left":
      x = -R;
      y = R + Math.random() * (GAME_HEIGHT - 2 * R);
      vx = speed;
      vy = (Math.random() - 0.5) * speed * 0.5;
      break;
    default:
      x = GAME_WIDTH + R;
      y = GAME_HEIGHT / 2;
      vx = -speed;
      vy = 0;
  }

  g.bullets.push({ x, y, vx, vy, label: icon.label, color: icon.color, radius: R });
  g.lastBulletTime = timestamp;
}

function drawBullet(ctx: CanvasRenderingContext2D, b: Bullet, isInvincible: boolean): void {
  ctx.save();

  // Glow ring — larger semi-transparent arc (no shadowBlur: ~3x faster)
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius * 1.7, 0, Math.PI * 2);
  ctx.fillStyle = `${b.color}28`;
  ctx.fill();

  // Bullet body
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fillStyle = b.color;
  ctx.fill();

  // Icon label
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 9px "Geist Mono", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(b.label, b.x, b.y);

  ctx.restore();
}

function drawInvincibilityRing(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  timestamp: number,
  invincibleUntil: number,
): void {
  const remaining = invincibleUntil - timestamp;
  if (remaining <= 0) return;
  const alpha = Math.min(0.6, remaining / DODGE_INVINCIBILITY_MS);
  const pulse = 0.8 + 0.2 * Math.sin(timestamp * 0.01);
  ctx.beginPath();
  ctx.arc(px, py, (CHAR_SIZE / 2 + 6) * pulse, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 255, 100, ${alpha})`;
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function useDodgeGame(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerDomRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const waveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameRef = useRef<DodgeGameState>(createInitialGameState());
  const playerPosRef = useRef({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
  const hudStateRef = useRef<DodgeHUDState>(INITIAL_HUD);
  const restartRef = useRef<() => void>(() => {});

  const [hudState, setHudState] = useState<DodgeHUDState>(INITIAL_HUD);
  const [waveAnnouncement, setWaveAnnouncement] = useState<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(rafRef.current);
      if (waveTimeoutRef.current !== null) clearTimeout(waveTimeoutRef.current);
      gameRef.current = createInitialGameState();
      hudStateRef.current = INITIAL_HUD;
      setHudState(INITIAL_HUD);
      setWaveAnnouncement(null);
      return;
    }

    function updateHUD(): void {
      const g = gameRef.current;
      const next: DodgeHUDState = {
        score: g.score,
        wave: g.wave + 1,
        lives: g.lives,
        isComplete: g.isComplete,
        isGameOver: g.isGameOver,
      };
      const cur = hudStateRef.current;
      if (
        next.score !== cur.score ||
        next.wave !== cur.wave ||
        next.lives !== cur.lives ||
        next.isComplete !== cur.isComplete ||
        next.isGameOver !== cur.isGameOver
      ) {
        hudStateRef.current = next;
        setHudState(next);
      }
    }

    function resumeLoop(): void {
      const g = gameRef.current;
      g.bullets = [];
      g.running = true;
      g.waveStartTime = performance.now();
      g.lastBulletTime = performance.now();
      setWaveAnnouncement(null);
      rafRef.current = requestAnimationFrame(tick);
    }

    function advanceWave(): void {
      const g = gameRef.current;
      cancelAnimationFrame(rafRef.current);
      g.running = false;
      g.score += DODGE_WAVE_BONUS * (g.wave + 1);
      g.wave += 1;
      updateHUD();
      setWaveAnnouncement(g.wave + 1);
      waveTimeoutRef.current = setTimeout(resumeLoop, DODGE_WAVE_TRANSITION_MS);
    }

    function tick(timestamp: number): void {
      const g = gameRef.current;
      if (!g.running) return;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      const waveConfig: DodgeWaveConfig | undefined = DODGE_WAVES[g.wave];
      // Guard against out-of-bounds wave index (e.g. from double-advance race)
      if (!waveConfig) {
        g.running = false;
        g.isComplete = true;
        updateHUD();
        return;
      }

      // Wave duration check
      if (timestamp - g.waveStartTime > waveConfig.durationMs) {
        if (g.wave < DODGE_WAVES.length - 1) {
          advanceWave();
          return;
        } else {
          g.running = false;
          g.isComplete = true;
          updateHUD();
          return;
        }
      }

      // Spawn bullets on interval
      if (timestamp - g.lastBulletTime > waveConfig.spawnIntervalMs) {
        spawnBullet(g, waveConfig, timestamp);
      }

      // Score per frame (wave-weighted)
      g.frameCount += 1;
      g.score += DODGE_SCORE_PER_FRAME * (g.wave + 1);

      const player = playerPosRef.current;
      const isInvincible = timestamp < g.invincibleUntil;

      // Move bullets, check collision, draw
      for (let i = g.bullets.length - 1; i >= 0; i--) {
        const b = g.bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        const offscreen =
          b.x < -(DODGE_BULLET_RADIUS + 10) ||
          b.x > GAME_WIDTH + DODGE_BULLET_RADIUS + 10 ||
          b.y < -(DODGE_BULLET_RADIUS + 10) ||
          b.y > GAME_HEIGHT + DODGE_BULLET_RADIUS + 10;

        if (offscreen) {
          g.bullets.splice(i, 1);
          continue;
        }

        // Collision (circle-circle)
        if (!isInvincible) {
          const dx = b.x - player.x;
          const dy = b.y - player.y;
          if (dx * dx + dy * dy < (PLAYER_RADIUS + b.radius) * (PLAYER_RADIUS + b.radius)) {
            g.bullets.splice(i, 1);
            g.lives -= 1;
            g.invincibleUntil = timestamp + DODGE_INVINCIBILITY_MS;
            if (g.lives <= 0) {
              g.running = false;
              g.isGameOver = true;
              updateHUD();
              ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
              return;
            }
            updateHUD();
            continue;
          }
        }

        drawBullet(ctx, b, isInvincible);
      }

      // Invincibility ring around player
      if (isInvincible) {
        drawInvincibilityRing(ctx, player.x, player.y, timestamp, g.invincibleUntil);
      }

      // Throttled HUD update (~10x/sec)
      if (g.frameCount % 6 === 0) {
        updateHUD();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    function startLoop(): void {
      cancelAnimationFrame(rafRef.current);
      const now = performance.now();
      gameRef.current = {
        bullets: [],
        score: 0,
        wave: 0,
        lives: INITIAL_LIVES,
        running: true,
        invincibleUntil: 0,
        waveStartTime: now,
        lastBulletTime: now,
        frameCount: 0,
        isComplete: false,
        isGameOver: false,
      };
      playerPosRef.current = { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
      if (playerDomRef.current) {
        playerDomRef.current.style.left = `${GAME_WIDTH / 2 - CHAR_SIZE / 2}px`;
        playerDomRef.current.style.top = `${GAME_HEIGHT / 2 - CHAR_SIZE / 2}px`;
      }
      hudStateRef.current = INITIAL_HUD;
      setHudState(INITIAL_HUD);
      setWaveAnnouncement(null);
      document.fonts.ready.then(() => {
        if (!unmounted) rafRef.current = requestAnimationFrame(tick);
      });
    }

    restartRef.current = startLoop;

    // Input event listeners (owned by hook)
    let unmounted = false;
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const scaleX = GAME_WIDTH / rect.width;
      const scaleY = GAME_HEIGHT / rect.height;
      const x = Math.max(0, Math.min(GAME_WIDTH, (e.clientX - rect.left) * scaleX));
      const y = Math.max(0, Math.min(GAME_HEIGHT, (e.clientY - rect.top) * scaleY));
      playerPosRef.current = { x, y };
      if (playerDomRef.current) {
        playerDomRef.current.style.left = `${x - CHAR_SIZE / 2}px`;
        playerDomRef.current.style.top = `${y - CHAR_SIZE / 2}px`;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const scaleX = GAME_WIDTH / rect.width;
      const scaleY = GAME_HEIGHT / rect.height;
      const x = Math.max(0, Math.min(GAME_WIDTH, (touch.clientX - rect.left) * scaleX));
      const y = Math.max(0, Math.min(GAME_HEIGHT, (touch.clientY - rect.top) * scaleY));
      playerPosRef.current = { x, y };
      if (playerDomRef.current) {
        playerDomRef.current.style.left = `${x - CHAR_SIZE / 2}px`;
        playerDomRef.current.style.top = `${y - CHAR_SIZE / 2}px`;
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    startLoop();

    return () => {
      unmounted = true;
      cancelAnimationFrame(rafRef.current);
      if (waveTimeoutRef.current !== null) clearTimeout(waveTimeoutRef.current);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [isActive]);

  const restart = useCallback(() => restartRef.current(), []);

  return { containerRef, canvasRef, playerDomRef, hudState, waveAnnouncement, restart };
}
