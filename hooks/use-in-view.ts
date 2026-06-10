"use client";

import { RefObject, useEffect, useState } from "react";

interface UseInViewOptions {
    /** Fraction of the viewport height the element must cross (0–1). */
    threshold?: number;
    /** Force in-view after this many ms so content never stays hidden. */
    failsafeMs?: number;
}

/** One-shot in-view detection with a failsafe timer. */
export function useInView<T extends Element>(
    ref: RefObject<T | null>,
    { threshold = 0.15, failsafeMs = 2500 }: UseInViewOptions = {}
): boolean {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (inView) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) setInView(true);
            },
            { rootMargin: `0px 0px -${Math.round(threshold * 100)}% 0px` }
        );
        observer.observe(el);
        const failsafe = setTimeout(() => setInView(true), failsafeMs);

        return () => {
            observer.disconnect();
            clearTimeout(failsafe);
        };
    }, [ref, inView, threshold, failsafeMs]);

    return inView;
}
