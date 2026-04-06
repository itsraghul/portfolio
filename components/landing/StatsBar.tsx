"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FEATURED_STATS } from "@/constants";
import { fadeInUp, staggerContainer, DEFAULT_TRANSITION, VIEWPORT_ONCE } from "@/lib/animations";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <motion.section
      className="max-w-4xl mx-auto py-20 px-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {FEATURED_STATS.map((stat) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-md"
            variants={fadeInUp}
            transition={DEFAULT_TRANSITION}
          >
            <span className="text-4xl sm:text-5xl font-bold font-mono text-primary">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm text-muted-foreground mt-2 font-mono">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
