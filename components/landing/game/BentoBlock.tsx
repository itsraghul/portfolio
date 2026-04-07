"use client";

import { motion } from "framer-motion";
import { HelpCircleIcon } from "lucide-react";
import type { BlockId, BlockSize } from "@/types/game";
import { cn } from "@/lib/utils";

interface BentoBlockProps {
  id: BlockId;
  size: BlockSize;
  label: string;
  isFlipped: boolean;
  isDraggable: boolean;
  onFlip?: () => void;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onBlockDragEnd?: (id: BlockId, event: MouseEvent | TouchEvent | PointerEvent) => void;
  gravityPosition?: { x: number; y: number };
  children: React.ReactNode;
}

const SIZE_CLASSES: Record<BlockSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "2x2": "col-span-2 row-span-2",
};

export default function BentoBlock({
  id,
  size,
  label,
  isFlipped,
  isDraggable,
  onFlip,
  onClick,
  onHoverStart,
  onHoverEnd,
  onBlockDragEnd,
  gravityPosition,
  children,
}: BentoBlockProps) {
  const handleClick = () => {
    if (isFlipped && onFlip) {
      onFlip();
      return;
    }
    onClick?.();
  };

  return (
    <motion.div
      layout
      layoutId={id}
      drag={isDraggable && !isFlipped}
      dragSnapToOrigin
      dragElastic={0.2}
      whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
      onDragEnd={(_, info) => {
        // Use the pointer event from the info's point
        const event = new PointerEvent("pointerup", {
          clientX: info.point.x,
          clientY: info.point.y,
        });
        onBlockDragEnd?.(id, event);
      }}
      whileHover={isDraggable ? { scale: 1.02 } : undefined}
      onClick={handleClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={
        gravityPosition
          ? { x: gravityPosition.x, y: gravityPosition.y }
          : undefined
      }
      className={cn(
        SIZE_CLASSES[size],
        "relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-md overflow-hidden transition-colors",
        isDraggable && "cursor-grab active:cursor-grabbing",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "[perspective:800px]"
      )}
      style={{ minHeight: size === "2x2" ? 280 : 130 }}
      data-cursor="hover"
      data-block-id={id}
    >
      {/* Front face */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ backfaceVisibility: "hidden" }}
      >
        {children}
      </motion.div>

      {/* Back face (flipped state) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-md"
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <HelpCircleIcon className="w-8 h-8 text-muted-foreground/50 mb-2" />
        <span className="text-xs font-mono text-muted-foreground/50">{label}</span>
        <span className="text-[10px] font-mono text-muted-foreground/30 mt-1">Click to reveal</span>
      </motion.div>
    </motion.div>
  );
}
