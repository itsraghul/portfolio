"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openLink } from "@/lib/utils";
import { HOMEPAGE_INFO, FEATURED_STATS } from "@/constants";
import { fadeInUp, staggerContainer, scaleIn, DEFAULT_TRANSITION } from "@/lib/animations";
import ProfilePortrait from "@/public/images/profile-portrait.png";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raghul-s25", icon: LinkedinIcon },
  { label: "GitHub", href: "https://www.github.com/itsraghul", icon: GithubIcon },
  { label: "Email", href: "mailto:raghul2521@gmail.com", icon: Mail },
] as const;

export default function AboutContent() {
  return (
    <div className="max-w-2xl mx-auto mt-12 px-4 pb-16">
      <motion.div
        className="flex flex-col items-center gap-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Profile image */}
        <motion.div
          variants={scaleIn}
          transition={DEFAULT_TRANSITION}
          className="relative"
        >
          <div className="w-36 h-36 rounded-full ring-2 ring-border bg-secondary/30 overflow-hidden">
            <Image
              src={ProfilePortrait}
              alt="Raghul S"
              width={144}
              height={144}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Name & role */}
        <motion.div
          className="text-center"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-mono text-primary">
            {HOMEPAGE_INFO.NAME_INFO}
          </h1>
          <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary/60 to-primary/20" />
          <p className="mt-3 text-sm font-mono text-muted-foreground">
            {HOMEPAGE_INFO.ROLE}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-center text-muted-foreground leading-relaxed max-w-lg"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          {HOMEPAGE_INFO.BASIC_DESC}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 w-full"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          {FEATURED_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-border/50 bg-secondary/20 backdrop-blur-sm p-4"
            >
              <span className="text-2xl font-bold font-mono text-primary">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-xs text-muted-foreground text-center font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex gap-3"
          variants={fadeInUp}
          transition={DEFAULT_TRANSITION}
        >
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <Button
              key={label}
              variant="outline"
              size="icon"
              aria-label={label}
              onClick={() => openLink(href)}
              className="rounded-full w-10 h-10 border-border/60 hover:border-primary/60 hover:text-primary transition-colors"
            >
              <Icon className="w-4 h-4" />
            </Button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
