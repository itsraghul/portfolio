"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ring lags behind dot for a trailing effect
  const springX = useSpring(cursorX, { stiffness: 350, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 350, damping: 30 });

  const isFinePointer = useRef(false);

  useEffect(() => {
    // Only activate on non-touch devices
    isFinePointer.current = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer.current) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => {
      const el = document.querySelector(":hover");
      if (el instanceof HTMLElement) {
        const tag = el.tagName.toLowerCase();
        const isCursorable = tag === "a" || tag === "button" || el.dataset.cursor === "hover" ||
          el.closest("a") !== null || el.closest("button") !== null;
        setHovered(isCursorable);
      }
    };

    const onLeave = () => {
      setVisible(false);
      setHovered(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseleave", onLeave);

    // Hide default cursor
    document.documentElement.classList.add("cursor-none-global");

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-none-global");
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-primary/40 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 40 : 28,
          height: hovered ? 40 : 28,
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
      {/* Inner dot — instant */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-primary/80"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 6 : 4,
          height: hovered ? 6 : 4,
          transition: "width 0.15s ease, height 0.15s ease",
        }}
      />
    </>
  );
}
