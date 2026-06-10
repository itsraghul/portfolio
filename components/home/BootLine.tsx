"use client";

import { useClock } from "@/hooks/use-clock";
import { BOOT_TEXT } from "@/constants/home";

/** Status line: pulsing dot, boot text, rule, live ship clock. */
export default function BootLine() {
    const time = useClock();

    return (
        <div className="mb-[26px] flex items-center gap-3 font-mono-tech text-xs tracking-[0.18em] text-[var(--cyan-dim)]">
            <span
                className="h-[7px] w-[7px] rounded-full bg-[#58e08c] shadow-[0_0_8px_#58e08c] animate-[hud-pulse_2.2s_ease_infinite] motion-reduce:animate-none"
                aria-hidden="true"
            />
            <span>{BOOT_TEXT}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[var(--line)] to-transparent" aria-hidden="true" />
            <span>{time}</span>
        </div>
    );
}
