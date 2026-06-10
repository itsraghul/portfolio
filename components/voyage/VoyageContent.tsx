"use client";

import { useRef } from "react";
import VoyageRoute from "@/components/voyage/VoyageRoute";
import SeaNotes from "@/components/voyage/SeaNotes";
import ChapterSection from "@/components/voyage/ChapterSection";
import { VOYAGE_CHAPTERS } from "@/constants/voyage";
import { experience } from "@/constants/experience";

/** The voyage: sea route + ship + the four career chapters. */
export default function VoyageContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative pt-10">
            <VoyageRoute containerRef={containerRef} />
            <SeaNotes />
            {VOYAGE_CHAPTERS.map((chapter, i) => {
                const entry = experience.find((e) => e.id === chapter.experienceId);
                if (!entry) return null;
                return <ChapterSection key={chapter.experienceId} chapter={chapter} entry={entry} index={i} />;
            })}
        </div>
    );
}
