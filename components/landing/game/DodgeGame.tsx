"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon } from "lucide-react";
import ProfilePortrait from "@/public/images/profile-portrait.png";
import { GAME_WIDTH, GAME_HEIGHT, CHAR_SIZE, DODGE_WAVES, DODGE_ICONS, INITIAL_LIVES } from "@/constants/game";
import { useDodgeGame } from "@/hooks/use-dodge-game";
import DodgeComplete from "./DodgeComplete";
import type { GameMode } from "@/types/game";

interface DodgeGameProps {
  startTime: number | null;
  onModeChange: (mode: GameMode) => void;
}

function ReducedMotionFallback() {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <p className="font-mono text-muted-foreground text-sm uppercase tracking-widest">
        Dodge the Stack
      </p>
      <div className="flex flex-wrap gap-2 justify-center max-w-xs">
        {DODGE_ICONS.map((icon) => (
          <span
            key={icon.label}
            style={{ color: icon.color, borderColor: `${icon.color}44` }}
            className="font-mono text-sm font-bold px-3 py-1 rounded-full border"
          >
            {icon.label}
          </span>
        ))}
      </div>
      <p className="text-xs font-mono text-muted-foreground/50">
        Animation disabled (prefers-reduced-motion)
      </p>
    </div>
  );
}

export default function DodgeGame({ startTime, onModeChange }: DodgeGameProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  // Hook called unconditionally; pass false when motion is disabled so loop never starts
  const { containerRef, canvasRef, playerDomRef, hudState, waveAnnouncement, restart } =
    useDodgeGame(!prefersReducedMotion);

  if (prefersReducedMotion) return <ReducedMotionFallback />;

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-500/15 dark:bg-red-500/8 rounded-full blur-[80px] animate-blob" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-yellow-500/15 dark:bg-yellow-500/8 rounded-full blur-[80px] animate-blob animation-delay-4000" />
      </div>

      {/* Game viewport */}
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden rounded-2xl border border-border/30 bg-background/30 backdrop-blur-sm cursor-crosshair select-none"
        style={{ width: GAME_WIDTH, maxWidth: "100%", height: GAME_HEIGHT }}
      >
        {/* Canvas — bullets rendered here */}
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="absolute inset-0 w-full h-full"
        />

        {/* Player — DOM overlay (zero-lag position via direct style mutation) */}
        <div
          ref={playerDomRef}
          className="absolute pointer-events-none z-30"
          style={{ width: CHAR_SIZE, height: CHAR_SIZE, left: GAME_WIDTH / 2 - CHAR_SIZE / 2, top: GAME_HEIGHT / 2 - CHAR_SIZE / 2 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-primary/60 shadow-lg shadow-primary/20">
            <Image
              src={ProfilePortrait}
              alt="Player"
              width={CHAR_SIZE}
              height={CHAR_SIZE}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* HUD — lives, wave, score */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
            <HeartIcon
              key={i}
              className={`w-4 h-4 transition-colors duration-300 ${
                i < hudState.lives ? "text-red-500 fill-red-500" : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
          <span className="text-[10px] font-mono text-muted-foreground/60">
            Wave {hudState.wave}/{DODGE_WAVES.length}
          </span>
          <div className="w-24 h-1.5 rounded-full bg-muted/30 overflow-hidden mt-0.5">
            <div
              className="h-full rounded-full bg-primary/60 transition-all duration-300"
              style={{ width: `${(hudState.wave / DODGE_WAVES.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="absolute top-3 right-3 z-20">
          <span className="text-sm font-bold font-mono text-primary/80">{hudState.score}</span>
        </div>

        {/* Move hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
          <span className="text-[10px] font-mono text-muted-foreground/40">
            Move cursor to dodge &middot; Touch to play on mobile
          </span>
        </div>

        {/* Wave announcement overlay */}
        <AnimatePresence>
          {waveAnnouncement !== null && (
            <motion.div
              key={waveAnnouncement}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
            >
              <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest mb-1">
                Incoming
              </span>
              <span className="text-5xl font-bold font-mono text-primary">
                Wave {waveAnnouncement}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game complete overlay */}
      <DodgeComplete
        isGameOver={hudState.isGameOver}
        isComplete={hudState.isComplete}
        score={hudState.score}
        wave={hudState.wave}
        startTime={startTime}
        onRestart={restart}
        onModeChange={onModeChange}
      />
    </div>
  );
}
