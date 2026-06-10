"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRIDGE_LINKS } from "@/constants/bridge";
import { sfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

function SpeakerIcon({ muted }: { muted: boolean }) {
    return muted ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
    ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
    );
}

/** Fixed top nav — re-skins per world via the --bridge-* CSS variables. */
export default function BridgeNav() {
    const pathname = usePathname();
    // server renders unmuted; synced after mount to avoid a hydration mismatch
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        setMuted(sfx.muted);
        return sfx.onMuteChange(setMuted);
    }, []);

    const toggleSound = () => {
        const nowMuted = sfx.toggleMuted();
        if (!nowMuted) sfx.confirm();
    };

    return (
        <nav className="bridge-nav" aria-label="Site navigation">
            <Link href="/" className="bridge-logo">
                <span className="bl-mark">RS</span>
                <span className="bl-name">RAGHUL S</span>
            </Link>
            <div className="bridge-links">
                {BRIDGE_LINKS.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(pathname === link.href && "active")}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
            <button
                type="button"
                className="bridge-sound"
                aria-label={muted ? "Unmute sound" : "Mute sound"}
                onClick={toggleSound}
            >
                <SpeakerIcon muted={muted} />
            </button>
        </nav>
    );
}
