"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { sfx } from "@/lib/sfx";

let veilNavigate: ((href: string) => void) | null = null;

/** Imperative themed navigation (used by the terminal's `go`). */
export function navigateWithVeil(href: string) {
    if (veilNavigate) veilNavigate(href);
    else window.location.href = href;
}

/** Full-screen wipe to the world's overlay color on internal navigation. */
export default function PageVeil() {
    const router = useRouter();
    const pathname = usePathname();
    const [covering, setCovering] = useState(false);
    const [entering, setEntering] = useState(false);
    const failsafe = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const go = useCallback(
        (href: string) => {
            sfx.confirm();
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduced) {
                router.push(href);
                return;
            }
            setCovering(true);
            setTimeout(() => router.push(href), 280);
            // never strand the user behind the veil if navigation stalls
            clearTimeout(failsafe.current);
            failsafe.current = setTimeout(() => setCovering(false), 2500);
        },
        [router]
    );

    useEffect(() => {
        veilNavigate = go;
        return () => {
            veilNavigate = null;
        };
    }, [go]);

    // Capture-phase so we run before next/link's own click handler.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const target = e.target as Element;
            const a = target.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!a) return;
            const href = a.getAttribute("href");
            // allowlist: only same-origin paths — never javascript:/data:/protocol-relative
            if (!href || !href.startsWith("/") || href.startsWith("//")) return;
            if (a.getAttribute("target") === "_blank" || a.hasAttribute("download")) return;
            e.preventDefault(); // enough to stop next/link — propagation stays intact
            if (href === pathname || covering) return;
            go(href);
        };
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [go, pathname, covering]);

    // New route rendered underneath — fade the veil back out.
    useEffect(() => {
        if (!covering) return;
        clearTimeout(failsafe.current);
        setEntering(true);
        const uncover = setTimeout(() => setCovering(false), 60);
        const settle = setTimeout(() => setEntering(false), 560);
        return () => {
            clearTimeout(uncover);
            clearTimeout(settle);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return <div className={cn("bridge-veil", covering && "cover", entering && "enter")} aria-hidden="true" />;
}
