"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Experience } from "@/constants/experience";

interface ChapterNavProps {
  experiences: Experience[];
  sectionRefs: React.RefObject<(HTMLElement | null)[]>;
}

export default function ChapterNav({ experiences, sectionRefs }: ChapterNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const refs = sectionRefs.current;
        if (!refs) return;
        // Pick the most-intersecting visible section from this batch
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            const idx = refs.indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              bestRatio = entry.intersectionRatio;
              bestIdx = idx;
            }
          }
        });
        if (bestIdx !== -1) setActiveIndex(bestIdx);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const refs = sectionRefs.current;
    if (refs) {
      refs.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => observer.disconnect();
  }, [sectionRefs]);

  const scrollToSection = (index: number) => {
    const refs = sectionRefs.current;
    if (refs && refs[index]) {
      refs[index]!.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown" && index < experiences.length - 1) {
      e.preventDefault();
      scrollToSection(index + 1);
    } else if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      scrollToSection(index - 1);
    }
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
      aria-label="Chapter navigation"
    >
      {experiences.map((exp, i) => (
        <button
          key={exp.id}
          onClick={() => scrollToSection(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          aria-label={`${exp.company} — ${exp.role}`}
          className="group relative flex items-center justify-center"
        >
          <span
            className={cn(
              "w-2.5 h-2.5 rounded-full border-[1.5px] transition-all duration-300",
              activeIndex === i
                ? "scale-125"
                : "border-muted-foreground/40 bg-transparent hover:border-muted-foreground"
            )}
            style={
              activeIndex === i
                ? {
                    borderColor: exp.color,
                    backgroundColor: exp.color,
                    boxShadow: `0 0 10px ${exp.color}40`,
                  }
                : undefined
            }
          />
          <span className="absolute right-6 px-3 py-1.5 rounded-md bg-card border border-border text-xs font-mono text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {exp.company} — {exp.date.split(" - ")[0]}
          </span>
        </button>
      ))}
    </nav>
  );
}
