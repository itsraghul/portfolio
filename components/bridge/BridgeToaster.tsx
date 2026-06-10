"use client";

import { useEffect, useRef, useState } from "react";
import { onBridgeToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

/** The single bottom-center toast pill, themed by --bridge-* vars. */
export default function BridgeToaster() {
    const [message, setMessage] = useState("");
    const [on, setOn] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        return onBridgeToast(({ message, duration }) => {
            setMessage(message);
            requestAnimationFrame(() => setOn(true));
            clearTimeout(hideTimer.current);
            hideTimer.current = setTimeout(() => setOn(false), duration);
        });
    }, []);

    return (
        <div className={cn("bridge-toast", on && "on")} role="status" aria-live="polite">
            {message}
        </div>
    );
}
