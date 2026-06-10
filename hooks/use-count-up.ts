"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Counts from 0 to target with cubic-out easing once `started` is true. */
export function useCountUp(target: number, started: boolean, durationMs = 1300): number {
    const [value, setValue] = useState(0);
    const reduced = useReducedMotion();

    useEffect(() => {
        if (!started) return;
        if (reduced) {
            setValue(target);
            return;
        }
        let raf = 0;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / durationMs);
            setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [started, target, durationMs, reduced]);

    return value;
}
