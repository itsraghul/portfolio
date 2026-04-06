"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { HOMEPAGE_INFO } from "@/constants";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, DEFAULT_TRANSITION } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[80px] animate-blob" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/15 dark:bg-pink-500/8 rounded-full blur-[80px] animate-blob animation-delay-4000" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center px-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Role badge */}
        <motion.div
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-mono border border-border/60 bg-secondary/50 backdrop-blur-sm text-muted-foreground mb-6">
            {HOMEPAGE_INFO.ROLE}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            {HOMEPAGE_INFO.NAME_INFO.replace("I'm ", "")}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl text-muted-foreground font-mono mb-4 max-w-2xl mx-auto"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          {HOMEPAGE_INFO.TAGLINE}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-10"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          {HOMEPAGE_INFO.BASIC_DESC}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          <Button asChild size="lg" className="font-mono text-base px-8">
            <Link href={HOMEPAGE_INFO.CTA_PRIMARY.href}>
              {HOMEPAGE_INFO.CTA_PRIMARY.label}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-mono text-base px-8 backdrop-blur-sm">
            <a href={HOMEPAGE_INFO.CTA_SECONDARY.href} target="_blank" rel="noopener noreferrer">
              {HOMEPAGE_INFO.CTA_SECONDARY.label}
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="w-6 h-6 text-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
