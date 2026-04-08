"use client";

import { useCallback } from "react";
import { BriefcaseIcon, CpuIcon, FolderOpenIcon } from "lucide-react";
import { FEATURED_STATS } from "@/constants";
import { PROJECTS } from "@/constants/projects";
import { PLATFORM_CONFIGS, GAME_WIDTH, GAME_HEIGHT } from "@/constants/game";
import type { BlockId, GameAction, GameMode } from "@/types/game";
import { useHopControls } from "@/hooks/use-hop-controls";
import { useHopPhysics } from "@/hooks/use-hop-physics";
import HopCharacter from "./HopCharacter";
import HopPlatform from "./HopPlatform";
import HopMobileControls from "./HopMobileControls";
import HopComplete from "./HopComplete";
import HeroNameBlock from "./blocks/HeroNameBlock";
import HeroCtaBlock from "./blocks/HeroCtaBlock";
import StatBlock from "./blocks/StatBlock";
import ProjectBlock from "./blocks/ProjectBlock";
import QuickLinkBlock from "./blocks/QuickLinkBlock";

const FEATURED_PROJECTS = PROJECTS.slice(0, 3);

const QUICK_LINKS = [
  { title: "Experience", description: "My professional journey", href: "/experience", icon: BriefcaseIcon },
  { title: "Skills", description: "Technologies I work with", href: "/about", icon: CpuIcon },
  { title: "Projects", description: "Things I've built", href: "/projects", icon: FolderOpenIcon },
] as const;

function renderBlockContent(id: BlockId) {
  switch (id) {
    case "hero-name":
      return <HeroNameBlock />;
    case "hero-cta":
      return <HeroCtaBlock />;
    case "stat-experience":
      return <StatBlock value={FEATURED_STATS[0].value} suffix={FEATURED_STATS[0].suffix} label={FEATURED_STATS[0].label} />;
    case "stat-projects":
      return <StatBlock value={FEATURED_STATS[1].value} suffix={FEATURED_STATS[1].suffix} label={FEATURED_STATS[1].label} />;
    case "stat-technologies":
      return <StatBlock value={FEATURED_STATS[2].value} suffix={FEATURED_STATS[2].suffix} label={FEATURED_STATS[2].label} />;
    case "project-1":
      return <ProjectBlock project={FEATURED_PROJECTS[0]} />;
    case "project-2":
      return <ProjectBlock project={FEATURED_PROJECTS[1]} />;
    case "project-3":
      return <ProjectBlock project={FEATURED_PROJECTS[2]} />;
    case "quick-experience":
      return <QuickLinkBlock {...QUICK_LINKS[0]} />;
    case "quick-skills":
      return <QuickLinkBlock {...QUICK_LINKS[1]} />;
    case "quick-projects":
      return <QuickLinkBlock {...QUICK_LINKS[2]} />;
  }
}

interface HopGameProps {
  dispatch: React.Dispatch<GameAction>;
  startTime: number | null;
  onModeChange: (mode: GameMode) => void;
}

export default function HopGame({ dispatch, startTime, onModeChange }: HopGameProps) {
  const { getInput, setTouchInput } = useHopControls(true);

  const handleScore = useCallback(
    (points: number) => dispatch({ type: "ADD_SCORE", points }),
    [dispatch]
  );

  const physics = useHopPhysics(true, getInput, handleScore);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[80px] animate-blob" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/15 dark:bg-pink-500/8 rounded-full blur-[80px] animate-blob animation-delay-4000" />
      </div>

      {/* Game viewport */}
      <div
        className="relative mx-auto overflow-hidden rounded-2xl border border-border/30 bg-background/30 backdrop-blur-sm"
        style={{ width: GAME_WIDTH, maxWidth: "100%", height: GAME_HEIGHT }}
      >
        {/* Height indicator */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-muted-foreground/60">
            Height: {physics.highestPlatformIdx + 1}/{PLATFORM_CONFIGS.length}
          </span>
          <div className="w-20 h-1.5 rounded-full bg-muted/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary/60 transition-all duration-300"
              style={{ width: `${((physics.highestPlatformIdx + 1) / PLATFORM_CONFIGS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls hint */}
        <div className="absolute top-3 right-3 z-20 hidden sm:block">
          <span className="text-[10px] font-mono text-muted-foreground/40">
            Arrow keys to move &middot; Space to jump
          </span>
        </div>

        {/* Platforms */}
        {PLATFORM_CONFIGS.map((config, i) => {
          const pos = physics.platformPositions.get(config.blockId);
          if (!pos) return null;
          return (
            <HopPlatform
              key={config.blockId}
              config={config}
              position={pos}
              cameraY={physics.cameraY}
              isActive={i === physics.highestPlatformIdx}
            >
              {renderBlockContent(config.blockId)}
            </HopPlatform>
          );
        })}

        {/* Character */}
        <HopCharacter
          x={physics.characterPos.x}
          y={physics.characterPos.y}
          cameraY={physics.cameraY}
          isGrounded={physics.isGrounded}
          facingRight={physics.facingRight}
          vy={physics.characterVel.vy}
        />
      </div>

      {/* Mobile controls */}
      <HopMobileControls onInput={setTouchInput} />

      {/* Game over / complete overlay */}
      <HopComplete
        isGameOver={physics.isGameOver}
        isComplete={physics.isComplete}
        score={physics.score}
        highestPlatformIdx={physics.highestPlatformIdx}
        startTime={startTime}
        onRestart={physics.restart}
        onModeChange={onModeChange}
      />
    </div>
  );
}
