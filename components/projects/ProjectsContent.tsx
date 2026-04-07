"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/constants/projects";
import ProjectCardModern from "@/components/ProjectCard/ProjectCardModern";
import { staggerContainer, fadeInUp, DEFAULT_TRANSITION } from "@/lib/animations";

const CATEGORIES = ["all", "web", "blockchain", "tools", "game"] as const;

export default function ProjectsContent() {
  const [filter, setFilter] = useState("all");

  const featured = PROJECTS.filter((p) => p.featured);
  const filtered =
    filter === "all"
      ? PROJECTS.filter((p) => !p.featured)
      : PROJECTS.filter((p) => p.category === filter && !p.featured);

  return (
    <div className="max-w-6xl mx-auto w-full mt-8">
      <motion.div
        className="mb-10 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={DEFAULT_TRANSITION}
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-mono text-primary">
          My Projects
        </h2>
        <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary/60 to-primary/20" />
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ ...DEFAULT_TRANSITION, delay: 0.1 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border transition-all duration-200 ${
              filter === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {filter === "all" && featured.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {featured.map((project) => (
            <ProjectCardModern
              key={project.name}
              project={project}
              className="min-h-[260px]"
            />
          ))}
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCardModern key={project.name} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
