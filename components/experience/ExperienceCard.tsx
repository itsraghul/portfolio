"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { openLink } from "@/lib/utils";
import type { Experience } from "@/constants/experience";

interface ExperienceCardProps {
  experience: Experience;
}

const VISIBLE_BULLETS = 2;

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const { company, role, date, description, links, logo, color } = experience;
  const [expanded, setExpanded] = useState(false);
  const hasMore = description.length > VISIBLE_BULLETS;
  const visibleItems = expanded ? description : description.slice(0, VISIBLE_BULLETS);

  return (
    <div
      className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-md p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
      style={{ borderLeftWidth: "4px", borderLeftColor: color }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
        <div className="flex items-start gap-3">
          {logo && (
            <Avatar
              className="h-8 w-8 mt-0.5 rounded-lg"
              style={{ backgroundColor: `${color}15` }}
            >
              <AvatarImage src={logo} alt={`${company} logo`} className="object-contain p-1.5" />
              <AvatarFallback
                className="rounded-lg text-xs font-mono font-bold"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {company[0]}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <h3 className="text-lg font-bold font-mono text-primary">{role}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-mono text-muted-foreground">{company}</span>
              {links.map((link) => (
                <button
                  key={link.url}
                  onClick={() => openLink(link.url)}
                  aria-label={`Visit ${link.label}`}
                  className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {link.label}
                  <ExternalLinkIcon className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <span
          className="text-xs font-mono px-3 py-1 rounded-full border border-border/60 bg-secondary/50 text-muted-foreground whitespace-nowrap"
        >
          {date}
        </span>
      </div>

      <ul className="space-y-2">
        {visibleItems.map((item, i) => (
          <motion.li
            key={i}
            initial={i >= VISIBLE_BULLETS ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-secondary-foreground/80 font-mono pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-muted-foreground"
          >
            {item}
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {hasMore && !expanded && (
          <motion.div exit={{ opacity: 0 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(true)}
              className="mt-2 font-mono text-xs text-muted-foreground hover:text-primary"
            >
              Show more <ChevronDownIcon className="w-3.5 h-3.5 ml-1" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
