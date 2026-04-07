"use client";

import { RefObject } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function ReadingProgress({ containerRef }: ReadingProgressProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 z-40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="relative w-[2px] h-32 bg-border/40 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary/50 rounded-full origin-top"
          style={{ scaleY, height: "100%" }}
        />
      </div>
      <span className="text-[9px] font-mono text-muted-foreground/30 tracking-widest [writing-mode:vertical-rl] select-none">
        READ
      </span>
    </motion.div>
  );
}
