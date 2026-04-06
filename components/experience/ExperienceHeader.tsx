"use client";

import { motion } from "framer-motion";
import { fadeInUp, DEFAULT_TRANSITION } from "@/lib/animations";

export default function ExperienceHeader() {
  return (
    <motion.div
      className="mb-12 text-center"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={DEFAULT_TRANSITION}
    >
      <h2 className="text-3xl sm:text-4xl font-bold font-mono text-primary">
        My Experience
      </h2>
      <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary/60 to-primary/20" />
    </motion.div>
  );
}
