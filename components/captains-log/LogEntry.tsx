import { ReactNode } from "react";
import { LogSegment } from "@/types/worlds";

interface LogEntryProps {
    tag: string;
    segments?: LogSegment[];
    children?: ReactNode;
}

/** A journal entry: mono tag rule + serif body (or custom children). */
export default function LogEntry({ tag, segments, children }: LogEntryProps) {
    return (
        <section className="relative mt-[46px]">
            <span className="block border-b-[1.5px] border-[rgba(126,60,29,.4)] pb-2 font-mono-tech text-[11px] uppercase tracking-[0.26em] text-[var(--rust-deep)]">
                {tag}
            </span>
            {segments && (
                <p className="mt-4 text-[20.5px] leading-[1.65] text-[#4a3922] [text-wrap:pretty]">
                    {segments.map((segment, i) =>
                        segment.em ? (
                            <em key={i} className="text-[var(--rust-deep)]">
                                {segment.text}
                            </em>
                        ) : (
                            <span key={i}>{segment.text}</span>
                        )
                    )}
                </p>
            )}
            {children}
        </section>
    );
}
