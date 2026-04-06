"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, Code2Icon, EarthIcon } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { Button } from "@/components/ui/button";
import { openLink } from "@/lib/utils";
import { fadeInUp, staggerContainer, DEFAULT_TRANSITION, VIEWPORT_ONCE } from "@/lib/animations";

const FEATURED_PROJECTS = PROJECTS.slice(0, 3);

export default function FeaturedWork() {
  return (
    <motion.section
      className="max-w-5xl mx-auto py-20 px-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold font-mono mb-12 text-center"
        variants={fadeInUp}
        transition={DEFAULT_TRANSITION}
      >
        Featured Work
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED_PROJECTS.map((project) => (
          <motion.div
            key={project.name}
            className="group relative flex flex-col rounded-xl border border-border/50 bg-card/50 backdrop-blur-md p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            variants={fadeInUp}
            transition={DEFAULT_TRANSITION}
          >
            <h3 className="text-lg font-bold font-mono mb-2 text-primary">
              {project.name.split(" - ")[0]}
            </h3>
            <p className="text-xs font-mono text-muted-foreground mb-3">
              {project.stack}
            </p>
            <p className="text-sm text-muted-foreground/80 flex-1 line-clamp-3 mb-4">
              {project.description}
            </p>
            <div className="flex gap-2">
              {project.githubLink && (
                <Button
                  onClick={() => openLink(project.githubLink!)}
                  variant="ghost"
                  size="sm"
                  className="font-mono text-xs"
                >
                  <Code2Icon className="w-3.5 h-3.5 mr-1" /> Code
                </Button>
              )}
              {project.websiteLink && (
                <Button
                  onClick={() => openLink(project.websiteLink!)}
                  variant="ghost"
                  size="sm"
                  className="font-mono text-xs"
                >
                  <EarthIcon className="w-3.5 h-3.5 mr-1" /> Live
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-10"
        variants={fadeInUp}
        transition={DEFAULT_TRANSITION}
      >
        <Button asChild variant="ghost" size="lg" className="font-mono group">
          <Link href="/projects">
            View All Projects
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  );
}
