"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";
import Link from "next/link";

export default function ClosingSection() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    reducedMotion ? [1, 1] : [0, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3],
    reducedMotion ? [0, 0] : [30, 0]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.section
      ref={ref}
      className="min-h-[60svh] flex items-center justify-center px-6 md:px-12"
      style={{ opacity, y }}
    >
      <div className="max-w-2xl w-full text-center">
        <p className="text-lg md:text-xl font-mono text-muted-foreground leading-relaxed mb-8">
          Building things that matter. Always learning, always shipping.
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            About Me
          </Link>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-3.5 h-3.5" />
          Back to top
        </button>
      </div>
    </motion.section>
  );
}
