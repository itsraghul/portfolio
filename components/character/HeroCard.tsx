"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { HERO_CARD } from "@/constants/character";

/** CSS pixel-art hero avatar built from plain divs. */
function PixelAvatar() {
    return (
        <div className="relative mx-auto mt-2 h-[150px] w-[120px]" aria-hidden="true">
            <div className="relative mx-auto h-[62px] w-[62px] rounded-[10px] border-4 border-[var(--frame-shadow)] bg-[#e8b88a] before:absolute before:-left-1.5 before:-right-1.5 before:-top-3.5 before:h-[18px] before:rounded-t-lg before:border-4 before:border-[var(--frame-shadow)] before:bg-[#2b2b3e] before:content-[''] after:absolute after:left-2.5 after:top-[22px] after:h-2 after:w-2 after:bg-[#1c1c28] after:shadow-[26px_0_0_#1c1c28] after:content-['']" />
            <div className="mx-auto -mt-1 h-[62px] w-[82px] rounded-lg border-4 border-[var(--frame-shadow)] bg-[#2a6fdb]" />
            <div className="absolute -right-1 top-12 h-[78px] w-2.5 rotate-[14deg] border-[3px] border-[var(--frame-shadow)] bg-gradient-to-b from-[#eef2f8] to-[#aab6c8] after:absolute after:-bottom-4 after:-left-[9px] after:h-2.5 after:w-[22px] after:border-[3px] after:border-[var(--frame-shadow)] after:bg-[#8a6422] after:content-['']" />
        </div>
    );
}

/** Hero card: avatar, name, level, animated XP bar. */
export default function HeroCard() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { threshold: 0.1 });

    return (
        <section ref={ref} className="ffbox px-6 py-[26px] text-center">
            <div className="font-pixel text-[11px] text-[var(--gold)]">{HERO_CARD.label}</div>
            <PixelAvatar />
            <h2 className="mt-5 font-pixel text-[15px]">{HERO_CARD.name}</h2>
            <div className="mt-1.5 text-[19px] text-[var(--dim)]">{HERO_CARD.epithet}</div>
            <div className="mt-[18px] flex justify-between text-[21px]">
                <span>LEVEL</span>
                <span className="text-[var(--gold)]">{HERO_CARD.level}</span>
            </div>
            <div className="mt-2 h-3.5 overflow-hidden rounded border-2 border-[rgba(232,232,255,.35)] bg-[var(--frame-shadow)]">
                <i
                    className="block h-full bg-gradient-to-r from-[#d9a514] to-[var(--gold)] [transition:width_1.4s_cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
                    style={{ width: inView ? `${HERO_CARD.xpPct}%` : "0%" }}
                />
            </div>
            <div className="mt-1.5 text-right text-base text-[var(--dim)]">{HERO_CARD.xpCaption}</div>
        </section>
    );
}
