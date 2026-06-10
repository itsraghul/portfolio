"use client";

import { useEffect } from "react";
import { sfx } from "@/lib/sfx";
import { bridgeToast } from "@/lib/toast";

const SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

let sequenceProgress = 0;

/** True once the full 8-arrow prefix is entered — the next "b" belongs to the
    konami code, so other global key handlers (the quest log's B-for-battle)
    must stay out of the way. Plain arrow use (progress < 8) doesn't suppress. */
export function isKonamiPrimed(): boolean {
    return sequenceProgress >= 8;
}

/** Konami code listener: toggles html.konami-mode + body.konami-mode, fanfare, toast. */
export function useKonami() {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            sequenceProgress = k === SEQUENCE[sequenceProgress] ? sequenceProgress + 1 : k === SEQUENCE[0] ? 1 : 0;
            if (sequenceProgress !== SEQUENCE.length) return;
            sequenceProgress = 0;
            // animation lives on <html> (filter on body would break fixed children);
            // body keeps the class for any state checks (terminal gomugomu shares it)
            const on = document.documentElement.classList.toggle("konami-mode");
            document.body.classList.toggle("konami-mode", on);
            sfx.fanfare();
            bridgeToast(on ? "KONAMI CODE ACCEPTED — REALITY DESTABILIZED" : "REALITY RESTORED");
            window.dispatchEvent(new CustomEvent("rs-konami"));
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);
}
