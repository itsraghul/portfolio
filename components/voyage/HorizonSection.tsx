"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { HORIZON } from "@/constants/voyage";
import { cn } from "@/lib/utils";

/** Closing section: the voyage continues — CTA to the quest log. */
export default function HorizonSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { threshold: 0.1, failsafeMs: 3000 });

    return (
        <section ref={ref} className={cn("reveal relative z-[2] px-5 pb-[130px] pt-[110px] text-center", inView && "in")}>
            <h2 className="font-pirata text-[clamp(40px,6vw,72px)] font-normal text-[var(--ink)]">{HORIZON.title}</h2>
            <p className="mt-2.5 text-xl italic text-[var(--ink-soft)]">{HORIZON.sub}</p>
            <a
                href={HORIZON.href}
                className="mt-[30px] inline-block rounded-[3px] bg-[var(--rust-deep)] px-[30px] py-[15px] font-mono-tech text-[13px] tracking-[0.22em] text-[var(--paper)] no-underline shadow-[0_8px_20px_rgba(126,60,29,.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(126,60,29,.45)] motion-reduce:transition-none"
                data-sfx-hover
            >
                {HORIZON.cta}
            </a>
            <div className="mt-[60px] flex justify-center opacity-50" aria-hidden="true">
                <svg width="220" height="16" viewBox="0 0 220 16">
                    <path
                        d="M0 8 Q14 0 27 8 T55 8 T82 8 T110 8 T137 8 T165 8 T192 8 T220 8"
                        stroke="#6b5536"
                        fill="none"
                        strokeWidth="1.6"
                    />
                </svg>
            </div>
        </section>
    );
}
