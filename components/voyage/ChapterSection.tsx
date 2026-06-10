"use client";

import { useEffect, useRef } from "react";
import WantedPoster from "@/components/voyage/WantedPoster";
import DeedsPanel from "@/components/voyage/DeedsPanel";
import { useInView } from "@/hooks/use-in-view";
import { sfx } from "@/lib/sfx";
import { Experience } from "@/constants/experience";
import { VoyageChapter } from "@/types/worlds";
import { cn } from "@/lib/utils";

interface ChapterSectionProps {
    chapter: VoyageChapter;
    entry: Experience;
    index: number;
}

/** One voyage chapter: ribbon banner, wanted poster, deeds — revealed on scroll. */
export default function ChapterSection({ chapter, entry, index }: ChapterSectionProps) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { threshold: 0.15, failsafeMs: 3000 });
    const alternate = index % 2 === 1;

    useEffect(() => {
        if (inView) sfx.wave();
    }, [inView]);

    return (
        <section ref={ref} className="relative z-[2] grid grid-cols-2 items-start gap-12 py-[90px] max-[900px]:grid-cols-1 max-[900px]:gap-[30px] max-[900px]:py-16">
            <div className={cn("reveal col-span-full mb-2 text-center", inView && "in")}>
                <span className="inline-block -rotate-1 bg-[var(--ink)] px-[22px] py-[7px] font-mono-tech text-xs tracking-[0.3em] text-[var(--paper)]">
                    {chapter.ribbon}
                </span>
                <h2 className="mt-3.5 font-pirata text-[clamp(36px,5vw,58px)] font-normal text-[var(--rust-deep)]">{chapter.seaName}</h2>
                <div className="mt-1 text-lg italic text-[var(--ink-soft)]">{entry.date.replace(/ - /g, " — ")}</div>
            </div>
            <div className={cn("reveal", inView && "in", alternate && "order-2 max-[900px]:order-none")}>
                <WantedPoster chapter={chapter} tiltRight={alternate} revealed={inView} />
            </div>
            <div className={cn("reveal", inView && "in", alternate && "order-1 max-[900px]:order-none")}>
                <DeedsPanel chapter={chapter} entry={entry} />
            </div>
        </section>
    );
}
