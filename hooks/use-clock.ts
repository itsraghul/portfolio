"use client";

import { useEffect, useState } from "react";

/** Live HH:MM:SS clock; renders a placeholder until mounted (hydration-safe). */
export function useClock(): string {
    const [time, setTime] = useState("--:--:--");

    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString("en-GB"));
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, []);

    return time;
}
