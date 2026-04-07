"use client";

import { useRef, useCallback } from "react";
import { BriefcaseIcon, CpuIcon, FolderOpenIcon } from "lucide-react";
import { FEATURED_STATS } from "@/constants";
import { PROJECTS } from "@/constants/projects";
import { BENTO_BLOCKS } from "@/constants/game";
import type { BlockId, GameState, GameAction } from "@/types/game";
import BentoBlock from "./BentoBlock";
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

interface BentoGridProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  onBlockClick?: (id: BlockId) => void;
  onBlockHoverStart?: (id: string) => void;
  onBlockHoverEnd?: (id: string) => void;
  gravityPositions?: Map<BlockId, { x: number; y: number }>;
}

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

export default function BentoGrid({
  state,
  dispatch,
  onBlockClick,
  onBlockHoverStart,
  onBlockHoverEnd,
  gravityPositions,
}: BentoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isDraggable = state.mode !== "normal";

  const handleDragEnd = useCallback(
    (draggedId: BlockId, event: MouseEvent | TouchEvent | PointerEvent) => {
      if (!gridRef.current) return;

      // Find which block element we're over
      const point = "touches" in event
        ? { x: (event as TouchEvent).changedTouches[0].clientX, y: (event as TouchEvent).changedTouches[0].clientY }
        : { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };

      const elements = document.elementsFromPoint(point.x, point.y);
      const targetBlock = elements.find(
        (el) => el.getAttribute("data-block-id") && el.getAttribute("data-block-id") !== draggedId
      );

      if (targetBlock) {
        const targetId = targetBlock.getAttribute("data-block-id") as BlockId;
        const fromIndex = state.blockOrder.indexOf(draggedId);
        const toIndex = state.blockOrder.indexOf(targetId);
        if (fromIndex !== -1 && toIndex !== -1) {
          dispatch({ type: "SWAP_BLOCKS", fromIndex, toIndex });
        }
      }
    },
    [state.blockOrder, dispatch]
  );

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[80px] animate-blob" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/15 dark:bg-pink-500/8 rounded-full blur-[80px] animate-blob animation-delay-4000" />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {state.blockOrder.map((id) => {
          const config = BENTO_BLOCKS.find((b) => b.id === id)!;
          const isFlipped = state.flippedBlocks.has(id);

          return (
            <BentoBlock
              key={id}
              id={id}
              size={config.size}
              label={config.label}
              isFlipped={isFlipped}
              isDraggable={isDraggable}
              onFlip={() => dispatch({ type: "FLIP_BLOCK", id })}
              onClick={() => onBlockClick?.(id)}
              onHoverStart={() => onBlockHoverStart?.(id)}
              onHoverEnd={() => onBlockHoverEnd?.(id)}
              onBlockDragEnd={handleDragEnd}
              gravityPosition={gravityPositions?.get(id)}
            >
              {renderBlockContent(id)}
            </BentoBlock>
          );
        })}
      </div>
    </div>
  );
}
