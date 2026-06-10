"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { ATTRIBUTES } from "@/constants/character";

/** Attribute stat bars that fill when scrolled into view. */
export default function AttributeBars() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { threshold: 0.1 });

    return (
        <section ref={ref} className="ffbox px-[26px] py-[22px]">
            <div className="font-pixel text-[11px] text-[var(--gold)]">— ATTRIBUTES —</div>
            <div className="mt-4 grid gap-3.5">
                {ATTRIBUTES.map((attr) => (
                    <div key={attr.name} className="grid grid-cols-[150px_1fr_46px] items-center gap-3.5">
                        <span className="text-[21px] text-[var(--txt)]">{attr.name}</span>
                        <span className="h-4 overflow-hidden rounded border-2 border-[rgba(232,232,255,.3)] bg-[var(--frame-shadow)]">
                            <i
                                className="block h-full [transition:width_1.2s_cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
                                style={{ width: inView ? `${attr.value}%` : "0%", background: attr.color }}
                            />
                        </span>
                        <span className="text-right text-xl text-[var(--gold)]">{attr.value}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
