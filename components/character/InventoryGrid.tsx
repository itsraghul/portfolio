"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { EMPTY_SLOTS, INVENTORY, INVENTORY_HINT, INVENTORY_LABEL, RARITY_STYLES } from "@/constants/character";
import { sfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

/** 14-slot tech inventory with rarity tiers and a detail inspector. */
export default function InventoryGrid() {
    const [active, setActive] = useState<number | null>(null);

    const select = (i: number) => {
        setActive(i);
        sfx.coin();
    };

    const activeItem = active !== null ? INVENTORY[active] : null;
    const activeRarity = activeItem ? RARITY_STYLES[activeItem.rarity] : null;

    return (
        <section className="ffbox px-[26px] py-[22px]">
            <div className="font-pixel text-[11px] text-[var(--gold)]">{INVENTORY_LABEL}</div>
            <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
                {INVENTORY.map((item, i) => {
                    const rarity = RARITY_STYLES[item.rarity];
                    return (
                        <div
                            key={item.name}
                            role="button"
                            tabIndex={0}
                            onClick={() => select(i)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    select(i);
                                }
                            }}
                            onMouseEnter={() => sfx.hover()}
                            className={cn(
                                "grid aspect-square cursor-pointer place-items-center rounded-lg border-2 bg-[rgba(0,0,20,.45)] transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-[3px] hover:!border-[var(--gold)] hover:shadow-[0_6px_16px_rgba(0,0,10,.5)] motion-reduce:transition-none",
                                active === i && "!border-[var(--gold)] bg-[rgba(255,210,74,.12)]"
                            )}
                            style={{ borderColor: `${rarity.fg}55` }}
                            aria-label={`Inspect ${item.name}`}
                        >
                            <img src={item.icon} alt={item.name} className="h-[46%] w-[46%] object-contain" />
                            <span className="-mt-1.5 text-[15px] text-[var(--dim)]">{item.name}</span>
                        </div>
                    );
                })}
                {Array.from({ length: EMPTY_SLOTS }, (_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="aspect-square rounded-lg border-2 border-dashed border-[rgba(232,232,255,.25)] bg-[rgba(0,0,20,.45)] opacity-40"
                        aria-hidden="true"
                    />
                ))}
            </div>
            <div
                className="mt-4 flex min-h-[58px] items-center gap-3 rounded-lg border-2 border-[rgba(232,232,255,.22)] bg-[rgba(0,0,20,.45)] px-4 py-3 text-[21px] text-[#cdd2ff]"
                aria-live="polite"
            >
                {activeItem && activeRarity ? (
                    <>
                        <span
                            className="whitespace-nowrap rounded-[3px] px-2 py-[5px] font-pixel text-[9px]"
                            style={{ background: activeRarity.bg, color: activeRarity.fg, border: `1px solid ${activeRarity.fg}` }}
                        >
                            {activeRarity.label}
                        </span>
                        <span>
                            <b className="font-normal text-[var(--txt)]">{activeItem.name}</b> — {activeItem.flavor}
                        </span>
                    </>
                ) : (
                    <span className="text-[var(--dim)]">{INVENTORY_HINT}</span>
                )}
            </div>
        </section>
    );
}
