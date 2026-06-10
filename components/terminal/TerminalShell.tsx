"use client";

import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { TermSegment, useTerminal } from "@/hooks/use-terminal";
import { TERMINAL_PROMPT } from "@/constants/terminal";
import { sfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

function Segment({ segment }: { segment: TermSegment }) {
    const className = cn(
        segment.style === "dim" && "text-[var(--green-dim)] [text-shadow:none]",
        segment.style === "amber" && "text-[var(--amber)] [text-shadow:0_0_6px_rgba(255,210,74,.4)]"
    );
    if (segment.href) {
        return (
            <a
                href={segment.href}
                {...(segment.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[var(--amber)] underline"
            >
                {segment.text}
            </a>
        );
    }
    return <span className={className || undefined}>{segment.text}</span>;
}

/** Green CRT shell: scrolling output + prompt input with command history. */
export default function TerminalShell() {
    const { lines, run, historyUp, historyDown } = useTerminal();
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ block: "end" });
    }, [lines]);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // IME composition: Enter confirms the composition, not the command
        if (e.nativeEvent.isComposing || e.keyCode === 229) return;
        if (e.key === "Enter") {
            run(value);
            setValue("");
            sfx.blip();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = historyUp();
            if (prev !== null) setValue(prev);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = historyDown();
            if (next !== null) setValue(next);
        } else if (e.key.length === 1) {
            sfx.type();
        }
    };

    const onShellClick = (e: MouseEvent) => {
        if (!(e.target as Element).closest("a, button, input")) inputRef.current?.focus();
    };

    return (
        <main
            className="relative z-[3] mx-auto flex min-h-screen max-w-[900px] flex-col px-6 pb-10 pt-[92px]"
            onClick={onShellClick}
        >
            <div
                className="flex-1 whitespace-pre-wrap break-words text-[15.5px] leading-[1.65] tracking-[0.02em]"
                role="log"
                aria-live="polite"
            >
                {lines.map((line) => (
                    <div key={line.id} className="[text-shadow:0_0_6px_rgba(74,222,128,.45)]">
                        {line.segments.map((segment, i) => (
                            <Segment key={i} segment={segment} />
                        ))}
                    </div>
                ))}
                <div ref={endRef} />
            </div>
            <div className="mt-1 flex items-baseline gap-2 text-[15.5px]">
                <span className="whitespace-nowrap [text-shadow:0_0_6px_rgba(74,222,128,.45)]">{TERMINAL_PROMPT}</span>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 border-none bg-transparent font-mono-tech text-[15.5px] max-[860px]:text-base text-[var(--green)] caret-[var(--green)] outline-none [text-shadow:0_0_6px_rgba(74,222,128,.45)]"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Terminal command input"
                />
            </div>
        </main>
    );
}
