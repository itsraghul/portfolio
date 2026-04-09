"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { TrophyIcon, SkullIcon, RotateCcwIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DODGE_WAVES } from "@/constants/game";
import type { GameMode } from "@/types/game";

interface DodgeCompleteProps {
  isGameOver: boolean;
  isComplete: boolean;
  score: number;
  wave: number;
  startTime: number | null;
  onRestart: () => void;
  onModeChange: (mode: GameMode) => void;
}

const CONFETTI_COLORS = [
  "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
  "bg-purple-500", "bg-pink-500", "bg-cyan-500", "bg-orange-500",
];

function ConfettiParticle({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  // Memoize random values so re-renders don't restart animations mid-flight
  const { randomX, randomDelay, size } = useMemo(() => ({
    randomX: (Math.random() - 0.5) * 600,
    randomDelay: Math.random() * 0.5,
    size: 4 + Math.random() * 8,
  }), []);

  return (
    <motion.div
      className={`absolute rounded-full ${color}`}
      style={{ width: size, height: size, left: "50%", top: "40%" }}
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: 0,
        x: randomX,
        y: 300 + Math.random() * 200,
        rotate: 720 * (Math.random() > 0.5 ? 1 : -1),
      }}
      transition={{ duration: 2 + Math.random(), delay: randomDelay, ease: "easeOut" }}
    />
  );
}

export default function DodgeComplete({
  isGameOver,
  isComplete,
  score,
  wave,
  startTime,
  onRestart,
  onModeChange,
}: DodgeCompleteProps) {
  const isVisible = isGameOver || isComplete;
  const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const totalWaves = DODGE_WAVES.length;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm"
        >
          {isComplete && Array.from({ length: 40 }).map((_, i) => (
            <ConfettiParticle key={i} index={i} />
          ))}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
            className="relative max-w-sm mx-4 p-8 rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl text-center shadow-2xl"
          >
            {isComplete ? (
              <TrophyIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            ) : (
              <SkullIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            )}

            <h2 className="text-2xl font-bold font-mono mb-2">
              {isComplete ? "Survived!" : "Eliminated"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {isComplete
                ? "You dodged the entire tech stack!"
                : "The stack got you. Try again?"}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold font-mono text-primary">{score}</span>
                <span className="text-[10px] font-mono text-muted-foreground">Score</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold font-mono text-primary">
                  {wave}/{totalWaves}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">Wave</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold font-mono text-primary">{elapsed}s</span>
                <span className="text-[10px] font-mono text-muted-foreground">Time</span>
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                onClick={onRestart}
                variant="outline"
                size="sm"
                className="font-mono text-xs"
              >
                <RotateCcwIcon className="w-3 h-3 mr-1" /> Play Again
              </Button>
              <Button
                onClick={() => onModeChange("normal")}
                size="sm"
                className="font-mono text-xs"
              >
                <EyeIcon className="w-3 h-3 mr-1" /> View Portfolio
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
