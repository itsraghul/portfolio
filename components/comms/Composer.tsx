"use client";

import { FormEvent, useState } from "react";
import HudPanel from "@/components/bridge/HudPanel";
import { COMPOSER } from "@/constants/comms";
import { CONTACT_EMAIL } from "@/constants/bridge";
import { sfx } from "@/lib/sfx";

// 16px on small screens: iOS Safari auto-zooms when focusing inputs under 16px
const FIELD_CLASSES =
    "rounded-[3px] border border-[var(--line)] bg-[rgba(4,10,18,.65)] px-[15px] py-[13px] font-mono-tech text-sm max-[860px]:text-base text-[var(--fg)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#4a5c70] focus:border-[var(--cyan)] focus:shadow-[0_0_0_1px_rgba(95,212,255,.3),0_0_18px_rgba(95,212,255,.12)] motion-reduce:transition-none";

/** Transmission composer — builds a mailto: and hands off to the mail client. */
export default function Composer() {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [note, setNote] = useState<string>(COMPOSER.note);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const subj = subject.trim() || COMPOSER.fallbackSubject;
        const full = body.trim() + (name.trim() ? `\n\n— ${name.trim()}` : "");
        sfx.success();
        setNote(COMPOSER.sendingNote);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(full)}`;
    };

    const onType = () => sfx.type();

    return (
        <HudPanel as="section" className="mt-[18px] px-8 py-[30px]">
            <div className="font-mono-tech text-xs tracking-[0.26em] text-[var(--cyan-dim)]">{COMPOSER.label}</div>
            <form className="mt-[18px] grid gap-3.5" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-3.5 max-[860px]:grid-cols-1">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onInput={onType}
                        placeholder={COMPOSER.namePlaceholder}
                        autoComplete="name"
                        className={FIELD_CLASSES}
                        aria-label="Your name"
                    />
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        onInput={onType}
                        placeholder={COMPOSER.subjectPlaceholder}
                        className={FIELD_CLASSES}
                        aria-label="Subject"
                    />
                </div>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    onInput={onType}
                    placeholder={COMPOSER.bodyPlaceholder}
                    className={`${FIELD_CLASSES} min-h-[110px] resize-y`}
                    aria-label="Message body"
                />
                <div className="flex flex-wrap items-center gap-[18px]">
                    <button
                        type="submit"
                        className="cursor-pointer rounded-[3px] border border-[var(--cyan)] bg-[var(--cyan)] px-7 py-[13px] font-mono-tech text-[13px] font-bold tracking-[0.2em] text-[#04121c] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_24px_rgba(95,212,255,.5)] motion-reduce:transition-none"
                        data-sfx-hover
                    >
                        {COMPOSER.submitLabel}
                    </button>
                    <span className="font-mono-tech text-[11.5px] tracking-[0.12em] text-[var(--dim)]">{note}</span>
                </div>
            </form>
        </HudPanel>
    );
}
