"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { TrophyIcon, MoveIcon, TimerIcon } from "lucide-react";
import type { ScorePopup } from "@/types/game";

interface ScoreDisplayProps {
  score: number;
  moveCount: number;
  startTime: number | null;
  correctCount: number;
  totalBlocks: number;
  isPuzzleMode: boolean;
}

export default function ScoreDisplay({
  score,
  moveCount,
  startTime,
  correctCount,
  totalBlocks,
  isPuzzleMode,
}: ScoreDisplayProps) {
  const [popups, setPopups] = useState<ScorePopup[]>([]);
  const prevScore = useRef(score);
  const [elapsed, setElapsed] = useState(0);

  // Score pop-up animation
  useEffect(() => {
    const diff = score - prevScore.current;
    if (diff > 0) {
      const popup: ScorePopup = {
        id: `${Date.now()}-${Math.random()}`,
        points: diff,
        x: 0,
        y: 0,
      };
      setPopups((prev) => [...prev, popup]);
      setTimeout(() => {
        setPopups((prev) => prev.filter((p) => p.id !== popup.id));
      }, 1000);
    }
    prevScore.current = score;
  }, [score]);

  // Elapsed time counter
  useEffect(() => {
    if (!startTime || !isPuzzleMode) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isPuzzleMode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 right-4 z-40 flex flex-col items-end gap-2"
    >
      {/* Score */}
      <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
        <TrophyIcon className="w-4 h-4 text-yellow-500" />
        <span className="font-mono text-sm font-bold">{score}</span>

        <AnimatePresence>
          {popups.map((popup) => (
            <motion.span
              key={popup.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -30 }}
              exit={{ opacity: 0 }}
              className="absolute -top-2 right-2 text-xs font-mono font-bold text-green-500"
            >
              +{popup.points}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Moves */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-card/80 backdrop-blur-md">
        <MoveIcon className="w-3 h-3 text-muted-foreground" />
        <span className="font-mono text-xs">{moveCount} moves</span>
      </div>

      {/* Timer (puzzle mode) */}
      {isPuzzleMode && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-card/80 backdrop-blur-md">
          <TimerIcon className="w-3 h-3 text-muted-foreground" />
          <span className="font-mono text-xs">{elapsed}s</span>
        </div>
      )}

      {/* Progress (puzzle mode) */}
      {isPuzzleMode && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-card/80 backdrop-blur-md">
          <span className="font-mono text-xs text-muted-foreground">
            {correctCount}/{totalBlocks} correct
          </span>
          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(correctCount / totalBlocks) * 100}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
