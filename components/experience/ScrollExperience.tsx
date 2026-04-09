"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ListIcon, ClapperboardIcon } from "lucide-react";
import type { Experience } from "@/constants/experience";
import ChapterSection from "./ChapterSection";
import ChapterNav from "./ChapterNav";
import ScrollProgress from "./ScrollProgress";
import ClosingSection from "./ClosingSection";
import ExperienceCard from "./ExperienceCard";

interface ScrollExperienceProps {
  experiences: Experience[];
}

export default function ScrollExperience({ experiences }: ScrollExperienceProps) {
  const [viewMode, setViewMode] = useState<"cinematic" | "compact">("cinematic");
  const [showScrollHint, setShowScrollHint] = useState(true);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Read URL param on mount only (avoids hydration mismatch)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "compact") {
      setViewMode("compact");
    }
  }, []);

  // Hide scroll hint after 2s or on first scroll
  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 2000);
    const handleScroll = () => setShowScrollHint(false);
    window.addEventListener("scroll", handleScroll, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Keyboard navigation between chapters
  useEffect(() => {
    if (viewMode !== "cinematic") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const refs = sectionRefs.current;
        if (!refs.length) return;

        // Find which section is most visible
        let currentIndex = 0;
        let maxIntersection = 0;
        refs.forEach((ref, i) => {
          if (!ref) return;
          const rect = ref.getBoundingClientRect();
          const visible = Math.max(
            0,
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
          );
          if (visible > maxIntersection) {
            maxIntersection = visible;
            currentIndex = i;
          }
        });

        const nextIndex =
          e.key === "ArrowDown"
            ? Math.min(currentIndex + 1, refs.length - 1)
            : Math.max(currentIndex - 1, 0);

        if (nextIndex !== currentIndex && refs[nextIndex]) {
          e.preventDefault();
          refs[nextIndex]!.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode]);

  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    []
  );

  const toggleView = () => {
    const next = viewMode === "cinematic" ? "compact" : "cinematic";
    setViewMode(next);
    const url = new URL(window.location.href);
    if (next === "compact") {
      url.searchParams.set("view", "compact");
    } else {
      url.searchParams.delete("view");
    }
    window.history.replaceState({}, "", url.toString());
  };

  if (experiences.length === 0) {
    return (
      <div className="min-h-[60svh] flex items-center justify-center">
        <p className="text-muted-foreground font-mono text-sm">No experience entries yet.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* View mode toggle */}
      <button
        onClick={toggleView}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-full border border-border/60 bg-card/80 backdrop-blur-md text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        aria-label={viewMode === "cinematic" ? "Switch to compact view" : "Switch to cinematic view"}
      >
        {viewMode === "cinematic" ? (
          <>
            <ListIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compact</span>
          </>
        ) : (
          <>
            <ClapperboardIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cinematic</span>
          </>
        )}
      </button>

      {viewMode === "cinematic" ? (
        <>
          <ScrollProgress />
          <ChapterNav experiences={experiences} sectionRefs={sectionRefs} />

          {/* Scroll hint overlay */}
          <AnimatePresence>
            {showScrollHint && (
              <motion.div
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-muted-foreground/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs font-mono">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chapter sections */}
          {experiences.map((exp, i) => (
            <div key={exp.id} ref={setSectionRef(i) as React.Ref<HTMLDivElement>}>
              <ChapterSection experience={exp} index={i} />
            </div>
          ))}

          <ClosingSection />
        </>
      ) : (
        /* Compact / skim mode */
        <div className="max-w-5xl mx-auto mt-8 px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-primary">
              My Experience
            </h2>
            <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary/60 to-primary/20" />
          </motion.div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExperienceCard experience={exp} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
