import { DESTINATIONS, DESTINATIONS_HEAD } from "@/constants/home";
import { DestinationPort, PortVariant } from "@/types/worlds";
import { cn } from "@/lib/utils";

const VARIANT_STYLES: Record<PortVariant, { card: string; tag: string; copy: string; go: string }> = {
    sea: {
        card: "bg-gradient-to-br from-[#f4e8cf] to-[#e9d8b4] text-[#4a3520] border-[#c9b288] hover:shadow-[0_18px_44px_rgba(233,216,180,.16)]",
        tag: "text-[#a5552e]",
        copy: "text-[#7c684c]",
        go: "text-[#a5552e]",
    },
    game: {
        card: "bg-gradient-to-b from-[#20206a] to-[#11113f] text-white border-[#4747b8] hover:shadow-[0_18px_44px_rgba(71,71,184,.3)]",
        tag: "text-[#ffd24a]",
        copy: "text-[#a9a9e6]",
        go: "text-[#ffd24a]",
    },
    stats: {
        card: "bg-gradient-to-b from-[#163a2c] to-[#0c2018] text-[#eafff3] border-[#2c7a55] hover:shadow-[0_18px_44px_rgba(44,122,85,.3)]",
        tag: "text-[#58e08c]",
        copy: "text-[#8fc4a8]",
        go: "text-[#58e08c]",
    },
};

function PortDeco({ variant }: { variant: PortVariant }) {
    if (variant === "sea") {
        return (
            <span
                className="absolute -bottom-[26px] -right-[26px] h-[130px] w-[130px] rounded-full border-2 border-dashed border-[rgba(165,85,46,.35)] before:absolute before:inset-[18px] before:rounded-full before:border-[1.5px] before:border-[rgba(165,85,46,.25)] before:content-['']"
                aria-hidden="true"
            />
        );
    }
    if (variant === "game") {
        const shades = ["bg-[rgba(255,210,74,.22)]", "bg-[rgba(255,210,74,.65)]", "bg-[rgba(255,210,74,.22)]", "bg-[rgba(255,210,74,.45)]", "bg-[rgba(255,210,74,.22)]", "bg-[rgba(255,210,74,.22)]"];
        return (
            <span className="absolute bottom-4 right-[18px] grid grid-cols-[repeat(3,14px)] gap-1" aria-hidden="true">
                {shades.map((shade, i) => (
                    <i key={i} className={cn("h-3.5 w-3.5", shade)} />
                ))}
            </span>
        );
    }
    const heights = [14, 26, 20, 34, 28];
    return (
        <span className="absolute bottom-[18px] right-5 flex items-end gap-[5px]" aria-hidden="true">
            {heights.map((h, i) => (
                <i key={i} className="w-[9px] bg-[rgba(88,224,140,.4)]" style={{ height: h }} />
            ))}
        </span>
    );
}

function PortCard({ port }: { port: DestinationPort }) {
    const styles = VARIANT_STYLES[port.variant];
    return (
        <a
            href={port.href}
            className={cn(
                "group relative block min-h-[250px] overflow-hidden rounded border p-6 no-underline backdrop-blur-[10px] transition-[transform,box-shadow,border-color] [transition-duration:250ms] ease-out hover:-translate-y-[5px] motion-reduce:transition-none",
                styles.card
            )}
        >
            <PortDeco variant={port.variant} />
            <span className={cn("font-mono-tech text-[10.5px] tracking-[0.26em]", styles.tag)}>{port.tag}</span>
            <h3 className="mt-2 text-[27px] font-bold uppercase tracking-[0.04em]">{port.title}</h3>
            <p className={cn("mt-2 text-[14.5px] font-medium leading-[1.55]", styles.copy)}>{port.copy}</p>
            <span
                className={cn(
                    "absolute bottom-5 left-6 font-mono-tech text-[11.5px] tracking-[0.22em] opacity-85 transition-[letter-spacing] [transition-duration:250ms] group-hover:tracking-[0.34em] motion-reduce:transition-none",
                    styles.go
                )}
            >
                {port.cta}
            </span>
        </a>
    );
}

/** "Select destination" — three portal cards previewing the other worlds. */
export default function DestinationPorts() {
    return (
        <>
            <div className="mb-6 mt-[72px] flex items-center gap-3.5 font-mono-tech text-[13px] tracking-[0.3em] text-[var(--cyan-dim)]">
                {DESTINATIONS_HEAD}
                <span className="h-px flex-1 bg-gradient-to-r from-[var(--line)] to-transparent" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-3 gap-[18px] max-[860px]:grid-cols-1">
                {DESTINATIONS.map((port) => (
                    <PortCard key={port.href} port={port} />
                ))}
            </div>
        </>
    );
}
