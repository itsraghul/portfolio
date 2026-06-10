import HudPanel from "@/components/bridge/HudPanel";
import { COMMS_CHANNELS } from "@/constants/comms";

const EQ_BARS = 8;

/** Three contact channel cards with animated EQ wave bars. */
export default function ChannelCards() {
    return (
        <div className="mt-11 grid grid-cols-3 gap-[18px] max-[860px]:grid-cols-1">
            {COMMS_CHANNELS.map((channel) => (
                <HudPanel
                    key={channel.title}
                    as="a"
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group block px-[22px] py-6 text-[var(--fg)] no-underline transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[rgba(95,212,255,.5)] hover:shadow-[0_14px_34px_rgba(0,0,0,.4)] motion-reduce:transition-none"
                    data-sfx-hover
                >
                    <div className="font-mono-tech text-[10.5px] tracking-[0.24em] text-[var(--cyan-dim)]">{channel.freq}</div>
                    <h3 className="mt-2 text-[26px] font-bold uppercase tracking-[0.05em]">{channel.title}</h3>
                    <div className="mt-1 text-[15px] font-medium text-[var(--dim)]">{channel.desc}</div>
                    <div className="mt-3.5 flex h-[22px] items-end gap-[3px]" aria-hidden="true">
                        {Array.from({ length: EQ_BARS }, (_, i) => (
                            <i
                                key={i}
                                className="h-full w-1 origin-bottom bg-[rgba(95,212,255,.4)] animate-[eq-bar_1.1s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:scale-y-50"
                                style={{ animationDelay: i % 3 === 2 ? "0.34s" : i % 2 === 1 ? "0.18s" : undefined }}
                            />
                        ))}
                    </div>
                    <span className="mt-4 inline-block font-mono-tech text-[11px] tracking-[0.2em] text-[var(--cyan)] transition-[letter-spacing] duration-200 group-hover:tracking-[0.3em] motion-reduce:transition-none">
                        TUNE IN →
                    </span>
                </HudPanel>
            ))}
        </div>
    );
}
