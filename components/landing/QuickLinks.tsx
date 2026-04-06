"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BriefcaseIcon, CpuIcon, FolderOpenIcon } from "lucide-react";
import { fadeInUp, staggerContainer, DEFAULT_TRANSITION, VIEWPORT_ONCE } from "@/lib/animations";

const LINKS = [
  {
    title: "Experience",
    description: "My professional journey and roles",
    href: "/experience",
    icon: BriefcaseIcon,
  },
  {
    title: "Skills",
    description: "Technologies and tools I work with",
    href: "/about",
    icon: CpuIcon,
  },
  {
    title: "Projects",
    description: "Things I've built and shipped",
    href: "/projects",
    icon: FolderOpenIcon,
  },
] as const;

export default function QuickLinks() {
  return (
    <motion.section
      className="max-w-4xl mx-auto py-20 px-4 pb-32"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {LINKS.map((link) => (
          <motion.div
            key={link.title}
            variants={fadeInUp}
            transition={DEFAULT_TRANSITION}
          >
            <Link
              href={link.href}
              className="group flex flex-col items-center p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-md text-center hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 h-full"
            >
              <link.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
              <h3 className="text-lg font-bold font-mono mb-1">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
