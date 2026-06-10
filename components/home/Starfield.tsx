"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    z: number;
    t: number;
}

// mobile URL-bar collapse fires resize with height-only deltas — ignore those
const URL_BAR_DELTA = 120;
const RESIZE_DEBOUNCE_MS = 150;

/** Fixed full-screen canvas of twinkling, slowly drifting stars. */
export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let stars: Star[] = [];
        let raf = 0;
        let resizeTimer: ReturnType<typeof setTimeout>;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const drawFrame = () => {
            ctx.clearRect(0, 0, width, height);
            for (const s of stars) {
                s.t += 0.015;
                const alpha = 0.25 + 0.55 * s.z * (0.6 + 0.4 * Math.sin(s.t));
                ctx.fillStyle = `rgba(160, 215, 255, ${alpha})`;
                const size = s.z > 0.7 ? 2 : 1;
                ctx.fillRect(s.x, s.y, size, size);
                s.y += s.z * 0.12;
                if (s.y > height) s.y = -2;
            }
        };

        const rebuild = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            stars = Array.from({ length: Math.min(220, (width * height) / 9000) }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 0.8 + 0.2,
                t: Math.random() * Math.PI * 2,
            }));
            if (reduce) drawFrame(); // single static frame — no animation loop
        };
        rebuild();

        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const widthChanged = window.innerWidth !== width;
                const heightDelta = Math.abs(window.innerHeight - height);
                if (widthChanged || heightDelta > URL_BAR_DELTA) rebuild();
            }, RESIZE_DEBOUNCE_MS);
        };
        window.addEventListener("resize", onResize);

        if (!reduce) {
            const tick = () => {
                drawFrame();
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden="true" />;
}
