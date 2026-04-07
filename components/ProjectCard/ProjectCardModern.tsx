"use client";

import { motion } from "framer-motion";
import { Code2Icon, EarthIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { openLink } from "@/lib/utils";
import { fadeInUp, DEFAULT_TRANSITION } from "@/lib/animations";
import type { Project } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  web: "#3b82f6",
  blockchain: "#8b5cf6",
  tools: "#f59e0b",
  game: "#10b981",
};

interface ProjectCardModernProps {
  project: Project;
  className?: string;
}

export default function ProjectCardModern({ project, className = "" }: ProjectCardModernProps) {
  const { name, stack, description, githubLink, websiteLink, category, techDescriptions } = project;
  const accentColor = CATEGORY_COLORS[category ?? "web"] ?? "#3b82f6";
  const techPills = stack.split("|").map((t) => t.trim()).filter(Boolean);

  return (
    <motion.div
      className={`group relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 flex flex-col ${className}`}
      variants={fadeInUp}
      transition={DEFAULT_TRANSITION}
      layout
    >
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono font-bold text-base text-primary leading-tight">
            {name}
          </h3>
          {category && (
            <span
              className="shrink-0 text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
              style={{
                color: accentColor,
                borderColor: accentColor,
                backgroundColor: `${accentColor}10`,
              }}
            >
              {category}
            </span>
          )}
        </div>

        <TooltipProvider delayDuration={200}>
          <div className="flex flex-wrap gap-1.5">
            {techPills.map((tech) => {
              const desc = techDescriptions?.[tech];
              const pill = (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                >
                  {tech}
                </span>
              );
              if (!desc) return pill;
              return (
                <Tooltip key={tech}>
                  <TooltipTrigger asChild>{pill}</TooltipTrigger>
                  <TooltipContent side="top" className="font-mono text-[11px]">
                    {tech} → {desc}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        <div className="flex gap-2 pt-1">
          {githubLink && githubLink.length > 0 && (
            <Button
              onClick={() => openLink(githubLink)}
              variant="ghost"
              size="sm"
              className="font-mono text-xs h-8 px-3 hover:bg-muted"
            >
              <Code2Icon className="w-3.5 h-3.5 mr-1.5" /> Code
            </Button>
          )}
          {websiteLink && websiteLink.length > 0 && (
            <Button
              onClick={() => openLink(websiteLink)}
              variant="ghost"
              size="sm"
              className="font-mono text-xs h-8 px-3 hover:bg-muted"
            >
              <EarthIcon className="w-3.5 h-3.5 mr-1.5" /> Live
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
