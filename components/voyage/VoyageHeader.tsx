import { VOYAGE_HEAD } from "@/constants/voyage";

/** Sea-chart page header with the wobbling compass. */
export default function VoyageHeader() {
    return (
        <header className="relative pb-[30px] text-center">
            <div className="font-mono-tech text-xs uppercase tracking-[0.34em] text-[var(--ink-soft)]">{VOYAGE_HEAD.overline}</div>
            <h1 className="mt-3.5 font-pirata text-[clamp(56px,9vw,110px)] font-normal leading-none text-[var(--ink)] [text-shadow:2px_2px_0_rgba(176,138,62,.35)]">
                {VOYAGE_HEAD.titlePre}
                <span className="text-[var(--rust)]">{VOYAGE_HEAD.titleAccent}</span>
            </h1>
            <p className="mt-3 text-[21px] italic text-[var(--ink-soft)]">{VOYAGE_HEAD.sub}</p>
            <div className="mx-auto mt-[26px] h-[86px] w-[86px]" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" className="h-full w-full animate-[compass-wobble_7s_ease-in-out_infinite] motion-reduce:animate-none">
                    <circle cx="50" cy="50" r="46" stroke="#6b5536" strokeWidth="2" />
                    <circle cx="50" cy="50" r="36" stroke="#6b5536" strokeWidth="1" strokeDasharray="3 5" />
                    <line x1="50" y1="8" x2="50" y2="92" stroke="#6b5536" strokeWidth="1.5" />
                    <line x1="8" y1="50" x2="92" y2="50" stroke="#6b5536" strokeWidth="1.5" />
                    <polygon points="50,16 55,50 50,58 45,50" fill="#a5552e" />
                    <circle cx="50" cy="50" r="5" fill="#3a2a16" />
                    <text x="50" y="13" textAnchor="middle" fontSize="11" fill="#3a2a16" fontFamily="serif">
                        N
                    </text>
                </svg>
            </div>
        </header>
    );
}
