"use client";

import { useEffect, useRef, useState } from "react";
import QuestList from "@/components/quests/QuestList";
import QuestDetail from "@/components/quests/QuestDetail";
import BattleOverlay from "@/components/quests/battle/BattleOverlay";
import { BATTLE_BUTTON_LABEL, HINTBAR_ITEMS, QUESTS } from "@/constants/quests";
import { isKonamiPrimed } from "@/hooks/use-konami";
import { sfx } from "@/lib/sfx";

/** Quest log orchestrator: selection state, keyboard navigation, boss battle. */
export default function QuestLog() {
    const [selected, setSelected] = useState(0);
    const [battleOpen, setBattleOpen] = useState(false);
    const selectedRef = useRef(selected);
    selectedRef.current = selected;
    const listRef = useRef<HTMLDivElement>(null);

    const select = (i: number, sound = true) => {
        setSelected((i + QUESTS.length) % QUESTS.length);
        if (sound) sfx.blip();
    };

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (battleOpen || e.metaKey || e.ctrlKey || e.altKey) return;
            const target = e.target as HTMLElement;
            if (/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName) || target.isContentEditable) return;
            // arrows drive quest selection only when focus is on the page body or
            // inside the quest list — never steal page scrolling from elsewhere
            const arrowsActive = target === document.body || listRef.current?.contains(target);
            if (e.key === "ArrowDown" && arrowsActive) {
                e.preventDefault();
                setSelected((s) => (s + 1) % QUESTS.length);
                sfx.blip();
            } else if (e.key === "ArrowUp" && arrowsActive) {
                e.preventDefault();
                setSelected((s) => (s - 1 + QUESTS.length) % QUESTS.length);
                sfx.blip();
            } else if (e.key === "Enter") {
                const site = QUESTS[selectedRef.current].site;
                if (site) window.open(site, "_blank", "noopener");
            } else if ((e.key === "b" || e.key === "B") && !isKonamiPrimed()) {
                setBattleOpen(true);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [battleOpen]);

    return (
        <>
            <div ref={listRef} className="mt-5 grid grid-cols-[410px_1fr] items-start gap-5 max-[980px]:grid-cols-1">
                <QuestList selected={selected} onSelect={select} />
                <QuestDetail quest={QUESTS[selected]} />
            </div>

            <div className="ffbox mt-5 flex flex-wrap gap-[26px] px-5 py-3 text-[19px] text-[var(--dim)]">
                {HINTBAR_ITEMS.map((item) => (
                    <span key={item.text}>
                        {item.key && <b className="font-normal text-[var(--txt)]">{item.key}</b>} {item.text}
                    </span>
                ))}
            </div>

            <div className="mt-[26px] flex justify-center">
                <button type="button" className="pxbtn pxbtn-danger" onClick={() => setBattleOpen(true)} data-sfx-hover>
                    {BATTLE_BUTTON_LABEL}
                </button>
            </div>

            <BattleOverlay open={battleOpen} onClose={() => setBattleOpen(false)} />
        </>
    );
}
