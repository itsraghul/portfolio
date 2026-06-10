import { Experience } from "@/constants/experience";
import { VoyageChapter } from "@/types/worlds";

interface DeedsPanelProps {
    chapter: VoyageChapter;
    entry: Experience;
}

/** The chapter's deeds: role line, ✗-bulleted accomplishments, link chips. */
export default function DeedsPanel({ chapter, entry }: DeedsPanelProps) {
    const deeds = [...entry.description, ...(chapter.extraDeeds ?? [])];

    return (
        <div className="relative border-[1.5px] border-[rgba(120,90,45,.4)] bg-[rgba(255,250,235,.55)] px-7 py-[26px] shadow-[0_10px_26px_rgba(80,50,15,.14)] before:pointer-events-none before:absolute before:inset-2.5 before:border before:border-dashed before:border-[rgba(120,90,45,.35)] before:content-['']">
            <h4 className="font-pirata text-2xl font-normal tracking-[0.06em] text-[var(--rust-deep)]">
                {entry.company} — {entry.role}
            </h4>
            <div className="mt-1 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">{chapter.roleLine}</div>
            <ul className="mt-4 grid list-none gap-[11px]">
                {deeds.map((deed) => (
                    <li
                        key={deed}
                        className="relative pl-[26px] text-[17.5px] leading-normal text-[#4a3922] [text-wrap:pretty] before:absolute before:left-0 before:top-px before:font-bold before:text-[var(--rust)] before:content-['✗']"
                    >
                        {deed}
                    </li>
                ))}
            </ul>
            {entry.links.length > 0 && (
                <div className="mt-[18px] flex flex-wrap gap-2.5">
                    {entry.links.map((link) => (
                        <a
                            key={link.url + link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-[3px] border-[1.5px] border-[rgba(126,60,29,.55)] px-3.5 py-[7px] font-mono-tech text-[11.5px] tracking-[0.14em] text-[var(--rust-deep)] no-underline transition-all duration-200 hover:bg-[var(--rust-deep)] hover:text-[var(--paper)] motion-reduce:transition-none"
                        >
                            {link.label.toUpperCase()} ↗
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
