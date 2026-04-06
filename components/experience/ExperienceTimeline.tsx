"use client";

import { motion } from "framer-motion";
import { experience } from "@/constants/experience";
import ExperienceCard from "./ExperienceCard";
import { fadeInLeft, fadeInRight, staggerContainer, DEFAULT_TRANSITION, VIEWPORT_ONCE } from "@/lib/animations";

export default function ExperienceTimeline() {
  return (
    <motion.div
      className="relative"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {/* Center line — desktop only */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-primary/20 to-border" />

      <div className="space-y-8 md:space-y-12">
        {experience.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={exp.id}
              className="relative md:grid md:grid-cols-2 md:gap-8"
              variants={isLeft ? fadeInLeft : fadeInRight}
              transition={DEFAULT_TRANSITION}
            >
              {/* Connector dot — desktop only */}
              <div
                className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                style={{
                  borderColor: exp.color,
                  backgroundColor: `${exp.color}33`,
                }}
              />

              {/* Card positioning: alternate left/right */}
              {isLeft ? (
                <>
                  <div className="md:pr-8">
                    <ExperienceCard experience={exp} />
                  </div>
                  <div className="hidden md:block" />
                </>
              ) : (
                <>
                  <div className="hidden md:block" />
                  <div className="md:pl-8">
                    <ExperienceCard experience={exp} />
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
