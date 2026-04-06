"use client";

import { motion } from "framer-motion";
import ResumeButton from "@/components/ResumeButton/ResumeButton";
import Skills3DWrapper from "@/components/skills/Skills3DWrapper";
import { fadeInUp, DEFAULT_TRANSITION } from "@/lib/animations";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <motion.div
        className="mb-8 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={DEFAULT_TRANSITION}
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-mono text-primary">
          Skills
        </h2>
        <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary/60 to-primary/20" />
        <p className="mt-4 text-sm text-muted-foreground font-mono">
          Drag to orbit. Click a card to inspect.
        </p>
      </motion.div>

      <Skills3DWrapper />

      <motion.div
        className="flex items-center justify-center gap-3 mt-8 pb-8"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={DEFAULT_TRANSITION}
      >
        <span className="font-mono text-sm text-muted-foreground">
          To know more about me, check the social links below or
        </span>
        <ResumeButton fileLink={process.env.NEXT_PUBLIC_RESUME_LINK ?? ""} />
      </motion.div>
    </div>
  );
}
