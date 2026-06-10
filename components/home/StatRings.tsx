"use client";

import { useRef } from "react";
import HudPanel from "@/components/bridge/HudPanel";
import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import { STAT_RINGS } from "@/constants/home";
import { StatRing } from "@/types/worlds";

const RADIUS = 24;
const CIRC = 2 * Math.PI * RADIUS;

function StatCard({ stat, started }: { stat: StatRing; started: boolean }) {
    const value = useCountUp(stat.value, started);

    return (
        <HudPanel className="flex items-center gap-[18px] px-6 py-[26px] transition-colors hover:border-[rgba(95,212,255,.45)]" data-sfx-hover>
            <svg width="58" height="58" viewBox="0 0 58 58" className="shrink-0" aria-hidden="true">
                <circle cx="29" cy="29" r={RADIUS} fill="none" strokeWidth="4" className="stroke-[rgba(95,212,255,.12)]" />
                <circle
                    cx="29"
                    cy="29"
                    r={RADIUS}
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="origin-center -rotate-90 stroke-[var(--cyan)] [filter:drop-shadow(0_0_4px_rgba(95,212,255,.6))] [transition:stroke-dashoffset_1.4s_cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
                    strokeDasharray={CIRC}
                    strokeDashoffset={started ? CIRC * (1 - stat.pct) : CIRC}
                />
            </svg>
            <div>
                <div className="text-[34px] font-bold leading-none text-[var(--fg)]">
                    {value}
                    {stat.suffix}
                </div>
                <div className="mt-1.5 font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[var(--dim)]">{stat.label}</div>
            </div>
        </HudPanel>
    );
}

/** Three animated stat rings with count-ups, triggered on scroll into view. */
export default function StatRings() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { threshold: 0.1 });

    return (
        <div ref={ref} className="mt-[18px] grid grid-cols-3 gap-[18px] max-[860px]:grid-cols-1">
            {STAT_RINGS.map((stat) => (
                <StatCard key={stat.label} stat={stat} started={inView} />
            ))}
        </div>
    );
}
