"use client";

import { ChevronLeftIcon, ChevronRightIcon, ArrowUpIcon } from "lucide-react";
import type { HopInput } from "@/hooks/use-hop-controls";

interface HopMobileControlsProps {
  onInput: (input: Partial<HopInput>) => void;
}

export default function HopMobileControls({ onInput }: HopMobileControlsProps) {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-between items-end px-6 pointer-events-none sm:hidden">
      {/* Directional buttons */}
      <div className="flex gap-2 pointer-events-auto">
        <button
          className="w-14 h-14 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl flex items-center justify-center active:bg-primary/20 active:scale-95 transition-all touch-none"
          onPointerDown={() => onInput({ left: true })}
          onPointerUp={() => onInput({ left: false })}
          onPointerLeave={() => onInput({ left: false })}
        >
          <ChevronLeftIcon className="w-6 h-6 text-foreground/70" />
        </button>
        <button
          className="w-14 h-14 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl flex items-center justify-center active:bg-primary/20 active:scale-95 transition-all touch-none"
          onPointerDown={() => onInput({ right: true })}
          onPointerUp={() => onInput({ right: false })}
          onPointerLeave={() => onInput({ right: false })}
        >
          <ChevronRightIcon className="w-6 h-6 text-foreground/70" />
        </button>
      </div>

      {/* Jump button */}
      <button
        className="w-16 h-16 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl flex items-center justify-center active:bg-primary/30 active:scale-95 transition-all pointer-events-auto touch-none"
        onPointerDown={() => onInput({ jump: true })}
        onPointerUp={() => onInput({ jump: false })}
        onPointerLeave={() => onInput({ jump: false })}
      >
        <ArrowUpIcon className="w-7 h-7 text-primary" />
      </button>
    </div>
  );
}
