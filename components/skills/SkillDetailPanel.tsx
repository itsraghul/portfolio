"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import type { Card } from "@/types";

interface SkillDetailPanelProps {
  skill: Card | null;
  onClose: () => void;
}

export default function SkillDetailPanel({ skill, onClose }: SkillDetailPanelProps) {
  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-6 py-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={skill.logo} alt={skill.name} width={48} height={48} />
          <div>
            <h3 className="text-lg font-bold font-mono text-primary">{skill.name}</h3>
            <div
              className="w-12 h-1 rounded-full mt-1"
              style={{ backgroundColor: `rgb(${skill.color})` }}
            />
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
