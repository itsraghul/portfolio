"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { ExternalLinkIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { openLink } from "@/lib/utils";
import { computeRevealThresholds } from "@/lib/scrollUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Experience } from "@/constants/experience";

interface ChapterSectionProps {
  experience: Experience;
  index: number;
}

/** Smooth reveal: fades from 0→1 over a scroll range, with spring smoothing */
function useSmoothReveal(
  progress: MotionValue<number>,
  threshold: number,
  isDesktop: boolean,
  reducedMotion: boolean
) {
  const raw = useTransform(progress, (v) => {
    if (reducedMotion || !isDesktop) return 1;
    const fadeRange = 0.06;
    if (v < threshold) return 0;
    if (v > threshold + fadeRange) return 1;
    return (v - threshold) / fadeRange;
  });
  return useSpring(raw, { stiffness: 120, damping: 20 });
}

/** Smooth slide-up reveal: returns both opacity and y offset */
function useSlideReveal(
  progress: MotionValue<number>,
  threshold: number,
  isDesktop: boolean,
  reducedMotion: boolean
) {
  const opacity = useSmoothReveal(progress, threshold, isDesktop, reducedMotion);
  const y = useTransform(progress, (v) => {
    if (reducedMotion || !isDesktop) return 0;
    const fadeRange = 0.06;
    if (v < threshold) return 24;
    if (v > threshold + fadeRange) return 0;
    return 24 * (1 - (v - threshold) / fadeRange);
  });
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 });
  return { opacity, y: smoothY };
}

export default function ChapterSection({ experience, index }: ChapterSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    reducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );

  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    reducedMotion ? [1, 1, 1, 1] : [0.96, 1, 1, 0.96]
  );

  const { company, role, date, description, links, logo, color } = experience;
  const thresholds = computeRevealThresholds(description.length);

  const companyReveal = useSlideReveal(scrollYProgress, thresholds.company, isDesktop, reducedMotion);
  const roleReveal = useSlideReveal(scrollYProgress, thresholds.role, isDesktop, reducedMotion);
  const dateReveal = useSlideReveal(scrollYProgress, thresholds.date, isDesktop, reducedMotion);

  // Chapter number parallax: moves slower than content
  const chapterNumY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [-40, 40]
  );
  const chapterNumOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    reducedMotion ? [0.06, 0.06, 0.06, 0.06] : [0, 0.08, 0.08, 0]
  );

  const chapterNum = String(index + 1).padStart(2, "0");

  return (
    <motion.section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center px-6 md:px-12 overflow-hidden"
      style={{
        opacity: sectionOpacity,
        scale: sectionScale,
        background: `radial-gradient(ellipse at ${index % 2 === 0 ? "30%" : "70%"} 50%, ${color}0A 0%, transparent 60%)`,
      }}
    >
      {/* Faint chapter number — positioned behind content, parallax */}
      <motion.span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] md:text-[260px] font-extrabold leading-none select-none pointer-events-none"
        style={{
          color: `${color}`,
          opacity: chapterNumOpacity,
          y: chapterNumY,
        }}
      >
        {chapterNum}
      </motion.span>

      {/* Content — centered */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-6"
          style={{ opacity: companyReveal.opacity, y: companyReveal.y }}
        >
          <Avatar
            className="h-12 w-12 rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            {logo ? (
              <AvatarImage src={logo} alt={`${company} logo`} className="object-contain p-2" />
            ) : null}
            <AvatarFallback
              className="rounded-xl text-sm font-mono font-bold"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {company[0]}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Company */}
        <motion.p
          className="text-xs font-mono uppercase tracking-[4px] text-muted-foreground mb-4"
          style={{ opacity: companyReveal.opacity, y: companyReveal.y }}
        >
          {company}
        </motion.p>

        {/* Role */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold font-mono leading-tight mb-5"
          style={{
            opacity: roleReveal.opacity,
            y: roleReveal.y,
            color: `${color}CC`,
          }}
        >
          {role}
        </motion.h2>

        {/* Date */}
        <motion.span
          className="inline-block text-xs font-mono px-4 py-1.5 rounded-full border border-border/60 bg-secondary/30 text-muted-foreground mb-10"
          style={{ opacity: dateReveal.opacity, y: dateReveal.y }}
        >
          {date}
        </motion.span>

        {/* Divider line */}
        <motion.div
          className="mx-auto w-12 h-px mb-10"
          style={{
            opacity: dateReveal.opacity,
            backgroundColor: `${color}30`,
          }}
        />

        {/* Description bullets — left-aligned text within centered container */}
        <div className="text-left space-y-4 max-w-lg mx-auto">
          {description.map((item, i) => (
            <DescriptionLine
              key={i}
              text={item}
              progress={scrollYProgress}
              threshold={thresholds.bullets[i] ?? 0.5}
              color={color}
              isDesktop={isDesktop}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Links */}
        <LinksRow
          links={links}
          progress={scrollYProgress}
          thresholds={thresholds}
          isDesktop={isDesktop}
          reducedMotion={reducedMotion}
        />
      </div>
    </motion.section>
  );
}

function LinksRow({
  links,
  progress,
  thresholds,
  isDesktop,
  reducedMotion,
}: {
  links: Experience["links"];
  progress: MotionValue<number>;
  thresholds: ReturnType<typeof computeRevealThresholds>;
  isDesktop: boolean;
  reducedMotion: boolean;
}) {
  const lastBullet = thresholds.bullets[thresholds.bullets.length - 1] ?? 0.5;
  const reveal = useSlideReveal(progress, lastBullet + 0.03, isDesktop, reducedMotion);

  if (links.length === 0) return null;

  return (
    <motion.div
      className="flex justify-center gap-3 mt-8"
      style={{ opacity: reveal.opacity, y: reveal.y }}
    >
      {links.map((link) => (
        <button
          key={link.url}
          onClick={() => openLink(link.url)}
          className="inline-flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        >
          {link.label}
          <ExternalLinkIcon className="w-3 h-3" />
        </button>
      ))}
    </motion.div>
  );
}

function DescriptionLine({
  text,
  progress,
  threshold,
  color,
  isDesktop,
  reducedMotion,
}: {
  text: string;
  progress: MotionValue<number>;
  threshold: number;
  color: string;
  isDesktop: boolean;
  reducedMotion: boolean;
}) {
  const reveal = useSlideReveal(progress, threshold, isDesktop, reducedMotion);

  return (
    <motion.p
      className="text-sm md:text-[15px] leading-relaxed text-secondary-foreground/80 pl-5 relative"
      style={{ opacity: reveal.opacity, y: reveal.y }}
    >
      <span
        className="absolute left-0 top-0"
        style={{ color: `${color}80` }}
      >
        ▹
      </span>
      {text}
    </motion.p>
  );
}
