"use client";

import { CAT_BADGES, QUESTS } from "@/constants/quests";
import { cn, starRating } from "@/lib/utils";

interface QuestListProps {
    selected: number;
    onSelect: (index: number) => void;
}

/** The selectable quest list with bobbing cursor and category badges. */
export default function QuestList({ selected, onSelect }: QuestListProps) {
    return (
        <section className="ffbox px-2.5 py-4" aria-label="Quest list">
            <div className="px-3.5 pb-3.5 pt-2 font-pixel text-[11px] text-[var(--dim)]">— SELECT A QUEST —</div>
            {QUESTS.map((quest, i) => {
                const badge = CAT_BADGES[quest.category];
                const isSelected = i === selected;
                return (
                    <div
                        key={quest.projectName}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelect(i)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onSelect(i);
                            }
                        }}
                        className={cn(
                            "grid cursor-pointer grid-cols-[22px_1fr_auto] items-center gap-2.5 rounded-md border-2 border-transparent px-3.5 py-[9px] hover:bg-[rgba(255,255,255,.07)]",
                            isSelected && "border-[rgba(255,210,74,.55)] bg-[rgba(255,210,74,.12)]"
                        )}
                    >
                        <span
                            className={cn(
                                "invisible font-pixel text-xs text-[var(--gold)]",
                                isSelected && "visible animate-[cursor-bob_0.8s_steps(2)_infinite] motion-reduce:animate-none"
                            )}
                            aria-hidden="true"
                        >
                            ▶
                        </span>
                        <span>
                            <span className="block text-[22px] leading-[1.1]">{quest.fullTitle}</span>
                            <span className="mt-px flex items-center gap-2.5 text-[15px] text-[var(--dim)]">
                                <span className="tracking-[2px] text-[var(--gold)]">{starRating(quest.stars)}</span>
                                <span className={cn("rounded-[3px] px-1.5 py-1 font-pixel text-[8px]", badge.className)}>{badge.label}</span>
                            </span>
                        </span>
                        <span className="text-[15px] text-[var(--hp)]">✓ CLEAR</span>
                    </div>
                );
            })}
        </section>
    );
}
