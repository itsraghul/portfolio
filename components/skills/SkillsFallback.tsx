"use client";

import { motion } from "framer-motion";
import { skills } from "@/constants/about";
import { fadeInUp, staggerContainer, DEFAULT_TRANSITION, VIEWPORT_ONCE } from "@/lib/animations";

export default function SkillsFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.index}
            className="flex flex-col items-center gap-2 p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-md hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            variants={fadeInUp}
            transition={DEFAULT_TRANSITION}
            style={{ borderBottomColor: `rgb(${skill.color})`, borderBottomWidth: "3px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.logo} alt={skill.name} width={48} height={48} />
            <span className="text-sm font-mono font-semibold text-primary">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
