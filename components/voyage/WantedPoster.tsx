"use client";

import CrewMark from "@/components/voyage/CrewMark";
import { useCountUp } from "@/hooks/use-count-up";
import { VoyageChapter } from "@/types/worlds";
import { cn } from "@/lib/utils";

interface WantedPosterProps {
    chapter: VoyageChapter;
    /** Even chapters tilt the other way. */
    tiltRight: boolean;
    revealed: boolean;
}

/** Parchment WANTED poster with pin, mug placeholder, epithet and bounty count-up. */
export default function WantedPoster({ chapter, tiltRight, revealed }: WantedPosterProps) {
    const bounty = useCountUp(chapter.bounty, revealed, 1500);

    return (
        <article
            className={cn(
                "relative border-2 border-[#9c7c45] bg-gradient-to-b from-[#f3e6c8] to-[#e8d3a8] px-[26px] pb-6 pt-[30px] text-center outline outline-[6px] -outline-offset-[12px] outline-[#d9c294] shadow-[0_14px_34px_rgba(80,50,15,.28),inset_0_0_60px_rgba(150,110,50,.18)] transition-[transform,box-shadow] duration-300 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(80,50,15,.36),inset_0_0_60px_rgba(150,110,50,.18)] motion-reduce:transition-none",
                tiltRight ? "rotate-[1.2deg]" : "rotate-[-1.2deg]"
            )}
            data-sfx-hover
        >
            <span
                className="absolute -top-[11px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#d8b25e,#8a6422)] shadow-[0_3px_5px_rgba(0,0,0,.3)]"
                aria-hidden="true"
            />
            <h3 className="font-pirata text-[56px] font-normal leading-none tracking-[0.08em]">WANTED</h3>
            <div className="mt-1.5 font-mono-tech text-[11px] tracking-[0.42em] text-[var(--ink-soft)]">{chapter.aliveLine}</div>
            <div className="relative mx-auto mt-[18px] grid aspect-[4/3.4] w-[78%] place-items-center overflow-hidden border-2 border-[#9c7c45] bg-[radial-gradient(ellipse_at_50%_42%,rgba(243,230,200,.9)_0%,rgba(243,230,200,0)_68%),repeating-linear-gradient(45deg,#e6d2a9_0_12px,#dfc89a_12px_24px)]">
                <div className="h-[92%] w-[92%] [filter:drop-shadow(1px_2px_0_rgba(110,70,25,.18))]">
                    <CrewMark id={chapter.crewMark} />
                </div>
                <span className="absolute bottom-1.5 left-0 right-0 text-center font-mono-tech text-[9.5px] tracking-[0.18em] text-[#8a6f44]">
                    {chapter.markCaption}
                </span>
            </div>
            <div className="mt-4 font-pirata text-[30px] font-normal tracking-[0.04em]">RAGHUL S</div>
            <div className="mt-0.5 text-lg italic text-[var(--rust-deep)]">{chapter.epithet}</div>
            <div className="mt-3.5 flex items-baseline justify-center gap-2 border-t-2 border-[#9c7c45] pt-3">
                <span className="font-pirata text-[30px] text-[var(--ink)]">฿</span>
                <span className="font-pirata text-4xl tracking-[0.05em] text-[var(--ink)]">{bounty.toLocaleString("en-US")}</span>
            </div>
            <div className="mt-2.5 font-mono-tech text-[10.5px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{chapter.crew}</div>
            <span className="absolute bottom-[84px] right-3.5 -rotate-[14deg] rounded border-[3px] border-[rgba(165,85,46,.75)] px-3 py-1.5 font-mono-tech text-[13px] font-bold tracking-[0.2em] text-[rgba(165,85,46,.85)]">
                {chapter.stamp}
            </span>
        </article>
    );
}
