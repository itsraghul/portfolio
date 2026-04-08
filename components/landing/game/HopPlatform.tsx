"use client";

import type { PlatformConfig } from "@/types/game";
import { cn } from "@/lib/utils";

interface HopPlatformProps {
  config: PlatformConfig;
  position: { x: number; y: number };
  cameraY: number;
  isActive: boolean;
  children: React.ReactNode;
}

export default function HopPlatform({
  config,
  position,
  cameraY,
  isActive,
  children,
}: HopPlatformProps) {
  const screenY = position.y - cameraY;

  return (
    <div
      className={cn(
        "absolute rounded-xl border border-border/50 bg-card/70 backdrop-blur-md overflow-hidden",
        "transition-shadow duration-300",
        isActive && "border-primary/40 shadow-lg shadow-primary/10",
      )}
      style={{
        left: position.x,
        top: screenY,
        width: config.width,
        height: config.height,
      }}
      data-block-id={config.blockId}
    >
      {/* Scaled-down bento content */}
      <div
        className="origin-top-left pointer-events-none"
        style={{
          transform: `scale(${config.height > 50 ? 0.35 : 0.3})`,
          width: config.width / 0.3,
          height: config.height / 0.3,
        }}
      >
        {children}
      </div>

      {/* Platform label overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-mono text-foreground/70 bg-card/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {config.blockId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()).replace(/^(Stat |Quick |Project |Hero )/, "")}
        </span>
      </div>

      {/* Movement indicator */}
      {config.behavior !== "static" && (
        <div className="absolute top-1 right-1">
          <span className="text-[8px] font-mono text-muted-foreground/50">
            {config.behavior === "horizontal" ? "↔" : "↕"}
          </span>
        </div>
      )}
    </div>
  );
}
