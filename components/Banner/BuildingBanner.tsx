"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, ExternalLinkIcon } from "lucide-react";
import { CURRENTLY_BUILDING } from "@/constants";

const DISMISS_KEY = "building-banner-dismissed";

export default function BuildingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  if (!CURRENTLY_BUILDING.active) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-50 flex items-center justify-center gap-2 bg-primary/8 border-b border-primary/15 px-4 py-2 text-xs font-mono text-muted-foreground"
        >
          {/* Live dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>

          <span className="text-center leading-tight">
            {CURRENTLY_BUILDING.text}
          </span>

          <a
            href={CURRENTLY_BUILDING.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary/70 hover:text-primary transition-colors shrink-0"
          >
            <ExternalLinkIcon className="w-3 h-3" />
          </a>

          <button
            onClick={dismiss}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
