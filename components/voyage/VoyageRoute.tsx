"use client";

import { RefObject, useEffect, useRef, useState } from "react";

const SVG_WIDTH = 260;
const CENTER_X = SVG_WIDTH / 2;
const CURVE_AMPLITUDE = 95;
const SEGMENTS = 7;
const DESKTOP_QUERY = "(min-width: 901px)";

interface VoyageRouteProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

/** Dashed sea route down the page + a ship that sails it as you scroll.
    Measured client-side after fonts settle; desktop only (hidden ≤900px via CSS). */
export default function VoyageRoute({ containerRef }: VoyageRouteProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const shipRef = useRef<HTMLDivElement>(null);
    const [desktop, setDesktop] = useState(false);

    // track the media query so rotating a tablet (or resizing) re-initializes the route
    useEffect(() => {
        const mq = window.matchMedia(DESKTOP_QUERY);
        setDesktop(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setDesktop(e.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (!desktop) return;
        const container = containerRef.current;
        const svg = svgRef.current;
        const path = pathRef.current;
        const ship = shipRef.current;
        if (!container || !svg || !path || !ship) return;

        let pathLength = 0;
        let svgLeftOffset = 0; // constant between resizes — cached to avoid a second gBCR per frame
        let raf = 0;

        const update = () => {
            try {
                if (!pathLength) return;
                const rect = container.getBoundingClientRect();
                const total = rect.height - window.innerHeight * 0.4;
                const progress = Math.max(0, Math.min(1, (-rect.top + window.innerHeight * 0.55) / total));
                const pt = path.getPointAtLength(progress * pathLength);
                const pt2 = path.getPointAtLength(Math.min(pathLength, progress * pathLength + 14));
                const angle = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
                // transform-only positioning keeps scroll frames on the compositor
                ship.style.transform = `translate(${(svgLeftOffset + pt.x).toFixed(1)}px, ${pt.y.toFixed(1)}px) rotate(${(angle * 0.25).toFixed(2)}deg)`;
            } catch {
                /* getPointAtLength can throw on a zero-length path — skip the frame */
            }
        };

        const buildPath = () => {
            const height = container.scrollHeight;
            svg.setAttribute("height", String(height));
            svg.setAttribute("viewBox", `0 0 ${SVG_WIDTH} ${height}`);
            let d = `M${CENTER_X} 0`;
            for (let i = 1; i <= SEGMENTS; i++) {
                const y = (height / SEGMENTS) * i;
                const x = CENTER_X + (i % 2 === 0 ? -CURVE_AMPLITUDE : CURVE_AMPLITUDE);
                d += ` Q${x} ${y - height / SEGMENTS / 2} ${CENTER_X} ${y}`;
            }
            path.setAttribute("d", d);
            pathLength = path.getTotalLength();
            svgLeftOffset = svg.getBoundingClientRect().left - container.getBoundingClientRect().left;
            update();
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        buildPath();
        void document.fonts.ready.then(buildPath);
        const resizeObserver = new ResizeObserver(buildPath);
        resizeObserver.observe(container);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", buildPath);

        return () => {
            cancelAnimationFrame(raf);
            resizeObserver.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", buildPath);
        };
    }, [containerRef, desktop]);

    return (
        <>
            <svg
                ref={svgRef}
                width={SVG_WIDTH}
                className="pointer-events-none absolute left-1/2 top-0 z-0 h-full -translate-x-1/2 max-[900px]:hidden"
                aria-hidden="true"
            >
                <path
                    ref={pathRef}
                    d=""
                    stroke="var(--rust)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="2 14"
                    strokeLinecap="round"
                    opacity="0.75"
                />
            </svg>
            <div
                ref={shipRef}
                className="pointer-events-none absolute left-0 top-0 z-[3] -ml-[27px] -mt-[27px] h-[54px] w-[54px] will-change-transform max-[900px]:hidden"
                aria-hidden="true"
            >
                <svg viewBox="0 0 54 54" fill="none">
                    <path d="M8 36 L46 36 L40 46 L14 46 Z" fill="#5b3d1e" stroke="#3a2a16" strokeWidth="1.5" />
                    <line x1="27" y1="10" x2="27" y2="36" stroke="#3a2a16" strokeWidth="2" />
                    <path d="M27 12 L41 22 L27 28 Z" fill="#efe1c2" stroke="#3a2a16" strokeWidth="1.5" />
                    <path d="M27 13 L16 21 L27 26 Z" fill="#a5552e" stroke="#3a2a16" strokeWidth="1" />
                </svg>
            </div>
        </>
    );
}
