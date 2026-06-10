"use client";

import { useState } from "react";
import { BattleView } from "@/hooks/use-battle";
import { BATTLE_COPY, ENEMY_NAMEPLATE, HERO_NAMEPLATE } from "@/constants/battle";
import { cn } from "@/lib/utils";

interface ArenaStar {
    left: string;
    top: string;
    opacity: number;
}

function Nameplate({ label, className, children }: { label: string; className: string; children: React.ReactNode }) {
    return (
        <div className={cn("absolute rounded-md border-2 border-[var(--frame)] bg-[rgba(10,10,35,.85)] px-2.5 py-2 font-pixel text-[9px] text-[var(--txt)]", className)}>
            {label}
            {children}
        </div>
    );
}

function Bar({ pct, mp }: { pct: number; mp?: boolean }) {
    return (
        <span className="mt-1.5 block h-[9px] w-[150px] border border-[#444] bg-[var(--frame-shadow)]">
            <i
                className={cn("block h-full transition-[width] [transition-duration:400ms] motion-reduce:transition-none", mp ? "bg-[var(--mp)]" : "bg-[var(--hp)]")}
                style={{ width: `${Math.max(0, pct * 100)}%` }}
            />
        </span>
    );
}

/** The battle arena: starfield backdrop, CSS-sprite combatants, HP/MP bars, damage pops. */
export default function BattleArena({ view }: { view: BattleView }) {
    const [stars] = useState<ArenaStar[]>(() =>
        Array.from({ length: 26 }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 55}%`,
            opacity: 0.3 + Math.random() * 0.7,
        }))
    );

    return (
        <div className="relative h-[300px] border-b-[3px] border-[var(--frame)] bg-[radial-gradient(ellipse_60%_30%_at_72%_78%,rgba(0,0,0,.45),transparent_70%),linear-gradient(180deg,#0d0d33_0%,#181858_70%,#232370_100%)] max-[980px]:h-[230px]">
            <div aria-hidden="true">
                {stars.map((star, i) => (
                    <i key={i} className="absolute h-0.5 w-0.5 bg-[#9b9bf0]" style={star} />
                ))}
            </div>

            <Nameplate label={ENEMY_NAMEPLATE} className="left-[18px] top-[18px]">
                <Bar pct={view.eHp / view.eMax} />
            </Nameplate>

            <div
                className={cn(
                    "absolute right-[13%] top-[17%] text-center",
                    view.enemyState === "hurt" && "[&>div]:animate-[sprite-shake_0.3s_steps(3)] [&>div]:brightness-200 motion-reduce:[&>div]:animate-none",
                    view.enemyState === "dead" && "[&>div]:rotate-90 [&>div]:translate-y-[30px] [&>div]:opacity-25 [&>div]:transition-all [&>div]:[transition-duration:800ms]"
                )}
            >
                <div className="relative mx-auto grid h-[110px] w-[130px] place-items-center rounded-[14px_14px_40%_40%] border-[3px] border-[#6b6b8a] bg-gradient-to-b from-[#3a3a4e] to-[#1e1e2e] before:absolute before:left-6 before:top-[26px] before:h-2.5 before:w-[18px] before:bg-[#ff5b5b] before:shadow-[60px_0_0_#ff5b5b] before:content-[''] after:absolute after:bottom-[18px] after:left-[38px] after:h-1.5 after:w-[50px] after:bg-[#11111c] after:content-['']">
                    <span className="absolute -bottom-1 font-pixel text-[7px] text-[#6b6b8a]">{BATTLE_COPY.enemyTag}</span>
                </div>
            </div>

            <div
                className={cn(
                    "absolute bottom-[14%] left-[13%]",
                    view.heroState === "attack" && "animate-[hero-lunge_0.35s_ease] motion-reduce:animate-none",
                    view.heroState === "hurt" && "animate-[sprite-shake_0.3s_steps(3)] motion-reduce:animate-none"
                )}
            >
                <div className="relative h-[84px] w-16">
                    <div className="mx-auto h-[34px] w-[34px] rounded-md border-[3px] border-[#11113c] bg-[#e8b88a]" />
                    <div className="mx-auto -mt-0.5 h-9 w-11 rounded border-[3px] border-[#11113c] bg-[#2a6fdb]" />
                    <div className="absolute -right-4 top-[26px] h-11 w-[7px] rotate-[18deg] border-2 border-[#11113c] bg-[#cfd6e4]" />
                </div>
            </div>

            <Nameplate label={HERO_NAMEPLATE} className="bottom-[18px] right-[18px]">
                <Bar pct={view.hHp / view.hMax} />
                <Bar pct={view.mp / view.mpMax} mp />
            </Nameplate>

            {view.pops.map((p) => (
                <div
                    key={p.id}
                    className="pointer-events-none absolute z-[3] animate-[dmg-up_0.8s_ease_forwards] font-pixel text-base text-white [text-shadow:2px_2px_0_#000]"
                    style={{ left: p.x, top: p.y, color: p.color }}
                >
                    {p.text}
                </div>
            ))}
        </div>
    );
}
