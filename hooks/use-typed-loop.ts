"use client";

import { useEffect, useState } from "react";
import { sfx } from "@/lib/sfx";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TYPE_MS = 62;
const DELETE_MS = 26;
const PAUSE_MS = 2600;
const START_DELAY_MS = 500;

/** Endless type/delete loop over phrases; static first phrase when motion is reduced. */
export function useTypedLoop(phrases: readonly string[]): string {
    const [text, setText] = useState("");
    const reduced = useReducedMotion();

    useEffect(() => {
        if (reduced || phrases.length === 0) {
            setText(phrases[0] ?? "");
            return;
        }
        let phrase = 0;
        let chars = 0;
        let deleting = false;
        let timer: ReturnType<typeof setTimeout>;

        const loop = () => {
            const cur = phrases[phrase];
            let delay = deleting ? DELETE_MS : TYPE_MS;
            if (!deleting) {
                chars++;
                // no perpetual ticking from a backgrounded tab
                if (chars % 2 === 0 && document.visibilityState === "visible") sfx.type();
                if (chars === cur.length) {
                    deleting = true;
                    delay = PAUSE_MS;
                }
            } else {
                chars--;
                if (chars === 0) {
                    deleting = false;
                    phrase = (phrase + 1) % phrases.length;
                }
            }
            setText(cur.slice(0, chars));
            timer = setTimeout(loop, delay);
        };
        timer = setTimeout(loop, START_DELAY_MS);
        return () => clearTimeout(timer);
    }, [phrases, reduced]);

    return text;
}
