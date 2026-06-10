import { COMMS_HEAD } from "@/constants/comms";

/** Comms page header: radar sweep + title. */
export default function RadarHeader() {
    return (
        <header className="flex flex-wrap items-center gap-[22px]">
            <div
                className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-full border-[1.5px] border-[var(--line)] bg-[radial-gradient(circle,rgba(95,212,255,.06)_0%,transparent_70%)] before:absolute before:inset-[18px] before:rounded-full before:border before:border-[rgba(95,212,255,.2)] before:content-[''] after:absolute after:inset-[36px] after:rounded-full after:border after:border-[rgba(95,212,255,.25)] after:content-['']"
                aria-hidden="true"
            >
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(95,212,255,.5),transparent_70deg,transparent)] animate-[radar-sweep_3.4s_linear_infinite] motion-reduce:animate-none" />
                <div className="absolute left-[62%] top-[30%] h-[5px] w-[5px] rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)] animate-[radar-blink_3.4s_linear_infinite] motion-reduce:animate-none" />
            </div>
            <div>
                <h1 className="text-[clamp(40px,6vw,62px)] font-bold uppercase leading-[0.95] tracking-[0.03em]">
                    {COMMS_HEAD.titlePre}
                    <span className="text-[var(--cyan)] [text-shadow:0_0_22px_rgba(95,212,255,.5)]">{COMMS_HEAD.titleAccent}</span>
                </h1>
                <div className="mt-2.5 font-mono-tech text-[13px] tracking-[0.18em] text-[var(--dim)]">
                    {COMMS_HEAD.sub}
                    <b className="font-normal text-[var(--green)]">{COMMS_HEAD.subStrong}</b>
                </div>
            </div>
        </header>
    );
}
