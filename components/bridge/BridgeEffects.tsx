"use client";

import { useEffect } from "react";
import { sfx } from "@/lib/sfx";
import { useKonami } from "@/hooks/use-konami";

const HOVER_LOCK_MS = 180;

/** Site-wide ambient behavior: konami code + hover sounds on [data-sfx-hover]. */
export default function BridgeEffects() {
    useKonami();

    useEffect(() => {
        const locked = new WeakSet<Element>();
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as Element;
            const el = target.closest?.(".bridge-links a, [data-sfx-hover]");
            if (!el || locked.has(el)) return;
            locked.add(el);
            sfx.hover();
            setTimeout(() => locked.delete(el), HOVER_LOCK_MS);
        };
        document.addEventListener("mouseover", onMouseOver);
        return () => document.removeEventListener("mouseover", onMouseOver);
    }, []);

    return null;
}
