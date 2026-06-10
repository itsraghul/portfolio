"use client";

import { useEffect, useRef } from "react";
import HudPanel from "@/components/bridge/HudPanel";
import { useTypedLoop } from "@/hooks/use-typed-loop";
import { HERO_DESC, HERO_LABEL, HOME_CTAS, ROLE_PHRASES, TICKER } from "@/constants/home";
import { cn } from "@/lib/utils";

function TypedRole() {
    const text = useTypedLoop(ROLE_PHRASES);
    return (
        <div className="mt-[18px] flex min-h-[1.5em] items-baseline gap-2.5 font-mono-tech text-[clamp(14px,2vw,18px)] tracking-[0.14em] text-[var(--amber)]">
            <span>{text}</span>
            <span
                className="inline-block h-[1.1em] w-[9px] translate-y-[3px] bg-[var(--amber)] animate-[caret-blink_1s_steps(1)_infinite] motion-reduce:animate-none"
                aria-hidden="true"
            />
        </div>
    );
}

/** The HUD hero: parallax tilt, glowing name, typed role, CTAs, live ticker. */
export default function HeroPanel() {
    const panelRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        // mousemove can outpace the display refresh — apply at most once per frame
        let raf = 0;
        const onMouseMove = (e: MouseEvent) => {
            const dx = e.clientX / window.innerWidth - 0.5;
            const dy = e.clientY / window.innerHeight - 0.5;
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const panel = panelRef.current;
                if (panel) panel.style.transform = `perspective(1100px) rotateY(${dx * 2.4}deg) rotateX(${-dy * 1.8}deg)`;
            });
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <HudPanel as="section" className="will-change-transform px-[56px] pb-12 pt-[54px] max-[860px]:px-[26px] max-[860px]:py-9" ref={panelRef}>
            <div className="mb-[18px] font-mono-tech text-xs tracking-[0.3em] text-[var(--cyan-dim)]">{HERO_LABEL}</div>
            <h1 className="text-[clamp(52px,9vw,96px)] font-bold uppercase leading-[0.95] tracking-[0.02em]">
                Raghul <span className="text-[var(--cyan)] [text-shadow:0_0_26px_rgba(95,212,255,.55)]">S</span>
            </h1>
            <TypedRole />
            <p className="mt-[22px] max-w-[560px] text-[17px] font-medium leading-[1.65] text-[var(--dim)] [text-wrap:pretty]">
                {HERO_DESC}
            </p>
            <div className="mt-[34px] flex flex-wrap gap-3.5">
                {HOME_CTAS.map((cta) => (
                    <a
                        key={cta.href}
                        href={cta.href}
                        className={cn("btn-hud", cta.variant === "solid" ? "btn-hud-solid" : "btn-hud-ghost")}
                        data-sfx-hover
                    >
                        {cta.label}
                    </a>
                ))}
            </div>
            <div className="mt-9 flex items-center gap-2.5 border-t border-dashed border-[rgba(95,212,255,.16)] pt-[22px] font-mono-tech text-[12.5px] tracking-[0.08em] text-[var(--dim)]">
                <span className="rounded-[3px] border border-[rgba(88,224,140,.4)] px-2 py-0.5 text-[10.5px] tracking-[0.2em] text-[#58e08c] animate-[hud-pulse_2.2s_ease_infinite] motion-reduce:animate-none">
                    {TICKER.tag}
                </span>
                <span>
                    {TICKER.text}{" "}
                    <a href={TICKER.link} target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)] hover:underline">
                        {TICKER.linkLabel}
                    </a>
                </span>
            </div>
        </HudPanel>
    );
}
