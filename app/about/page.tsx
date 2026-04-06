"use client";

import { motion } from "framer-motion";
import Skills3DWrapper from "@/components/skills/Skills3DWrapper";
import { fadeInUp, DEFAULT_TRANSITION } from "@/lib/animations";

export default function AboutPage() {
  return (
    <div className="w-screen h-[calc(100vh-4rem)] -mx-4 -mt-6 relative overflow-hidden">
      <Skills3DWrapper />

      <motion.div
        className="absolute top-6 left-0 right-0 z-10 text-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={DEFAULT_TRANSITION}
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-mono text-primary">
          Skills
        </h2>
        <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary/60 to-primary/20" />
        <p className="mt-2 text-sm text-muted-foreground font-mono">
          Drag to orbit. Click a skill to inspect.
        </p>
      </motion.div>
    </div>
  );
}
