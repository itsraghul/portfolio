"use client";

import { useEffect, useRef } from "react";
import BattleArena from "@/components/quests/battle/BattleArena";
import BattleMenu from "@/components/quests/battle/BattleMenu";
import { useBattle } from "@/hooks/use-battle";
import { sfx } from "@/lib/sfx";

interface BattleOverlayProps {
    open: boolean;
    onClose: () => void;
}

/** Full-screen boss battle vs THE LEGACY CODEBASE. */
export default function BattleOverlay({ open, onClose }: BattleOverlayProps) {
    const { view, doMove } = useBattle(open);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const trigger = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();
        document.documentElement.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            // minimal focus trap: keep Tab cycling inside the dialog
            if (e.key === "Tab" && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
                if (!focusables.length) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.documentElement.style.overflow = "";
            trigger?.focus?.();
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[1500] flex items-center justify-center bg-[rgba(4,4,16,.9)] p-5"
            role="dialog"
            aria-modal="true"
            aria-label="Boss battle"
        >
            <div ref={dialogRef} className="ffbox relative w-[min(860px,96vw)] overflow-hidden">
                <button
                    ref={closeRef}
                    type="button"
                    className="pxbtn absolute right-4 top-3.5 z-[2]"
                    onClick={() => {
                        sfx.back();
                        onClose();
                    }}
                    aria-label="Close battle"
                >
                    ✕
                </button>
                <BattleArena view={view} />
                <BattleMenu message={view.message} onMove={doMove} />
            </div>
        </div>
    );
}
