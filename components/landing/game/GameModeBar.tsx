"use client";

import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  PuzzleIcon,
  ArrowUpIcon,
  MoveIcon,
  GamepadIcon,
  ZapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GameMode } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameModeBarProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const MODES: { mode: GameMode; icon: React.ElementType; label: string }[] = [
  { mode: "normal", icon: BriefcaseIcon, label: "Normal" },
  { mode: "puzzle", icon: PuzzleIcon, label: "Puzzle" },
  { mode: "hop", icon: ArrowUpIcon, label: "Hop" },
  { mode: "dodge", icon: ZapIcon, label: "Dodge" },
  { mode: "freestyle", icon: MoveIcon, label: "Freestyle" },
];

export default function GameModeBar({ currentMode, onModeChange }: GameModeBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
      <div className="flex items-center gap-1 px-2 py-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-1 px-2">
          <GamepadIcon className="w-4 h-4 text-muted-foreground" />
          <Badge variant="outline" className="font-mono text-[10px] hidden sm:inline-flex">
            {currentMode}
          </Badge>
        </div>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {MODES.map(({ mode, icon: Icon, label }) => (
          <Button
            key={mode}
            variant={currentMode === mode ? "default" : "ghost"}
            size="sm"
            onClick={() => onModeChange(mode)}
            className={cn(
              "font-mono text-xs gap-1.5 h-8",
              currentMode === mode && "shadow-md"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        ))}
      </div>
      </motion.div>
    </div>
  );
}
