"use client";

import { Quest } from "@/types/worlds";
import { starRating } from "@/lib/utils";

/** The selected quest's detail panel: description, rewards, action buttons. */
export default function QuestDetail({ quest }: { quest: Quest }) {
    return (
        <section className="ffbox flex min-h-[540px] flex-col px-[30px] py-[26px] max-[980px]:min-h-0" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-3.5">
                <h2 className="max-w-[30ch] font-pixel text-[clamp(14px,2vw,20px)] leading-normal text-[var(--txt)] [text-shadow:2px_2px_0_var(--frame-shadow)]">
                    {quest.fullTitle}
                </h2>
                <span className="whitespace-nowrap rounded border-2 border-[var(--hp)] px-2.5 py-[7px] font-pixel text-[10px] text-[var(--hp)]">
                    ✓ QUEST CLEAR
                </span>
            </div>
            <div className="mt-2.5 text-2xl tracking-[4px] text-[var(--gold)]">{starRating(quest.stars)}</div>
            <p className="mt-4 text-[23px] leading-[1.42] text-[#cdd2ff] [text-wrap:pretty]">{quest.desc}</p>
            <div className="mt-auto pt-[22px]">
                <div className="mb-3 font-pixel text-[11px] text-[var(--gold)]">REWARDS OBTAINED</div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
                    {quest.rewards.map((reward) => (
                        <div
                            key={reward.name}
                            className="flex items-start gap-2.5 rounded-md border-2 border-[rgba(232,232,255,.22)] bg-[rgba(0,0,20,.4)] px-3 py-2.5"
                        >
                            <span
                                className="mt-[5px] h-3.5 w-3.5 shrink-0 bg-[var(--gold)] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
                                aria-hidden="true"
                            />
                            <span>
                                <span className="block text-[21px] leading-[1.05] text-[var(--txt)]">{reward.name}</span>
                                <span className="block text-base leading-tight text-[var(--dim)]">{reward.desc}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-[22px] flex flex-wrap gap-3">
                {quest.site && (
                    <a className="pxbtn pxbtn-gold" href={quest.site} target="_blank" rel="noopener noreferrer" data-sfx-hover>
                        WORLD MAP ↗
                    </a>
                )}
                {quest.git && (
                    <a className="pxbtn" href={quest.git} target="_blank" rel="noopener noreferrer" data-sfx-hover>
                        VIEW SCROLL ↗
                    </a>
                )}
            </div>
        </section>
    );
}
