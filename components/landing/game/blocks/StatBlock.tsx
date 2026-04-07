"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface StatBlockProps {
  value: number;
  suffix: string;
  label: string;
}

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

export default function StatBlock({ value, suffix, label }: StatBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <span className="text-3xl sm:text-4xl font-bold font-mono text-primary">
        <CountUp value={value} suffix={suffix} />
      </span>
      <span className="text-xs text-muted-foreground mt-1 font-mono text-center">
        {label}
      </span>
    </div>
  );
}
