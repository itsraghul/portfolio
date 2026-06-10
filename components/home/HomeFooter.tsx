import { KONAMI_HINT, SOCIAL_LINKS } from "@/constants/bridge";

/** Home footer: social links + the konami hint. */
export default function HomeFooter() {
    return (
        <footer className="relative z-[3] mx-auto flex max-w-[1060px] flex-wrap items-center justify-between gap-4 px-7 pb-14 pt-2.5 font-mono-tech text-[11.5px] tracking-[0.14em] text-[var(--dim)]">
            <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-[var(--dim)] no-underline transition-colors duration-200 hover:text-[var(--cyan)]"
                    >
                        {social.label}
                    </a>
                ))}
            </div>
            <span className="opacity-55">{KONAMI_HINT}</span>
        </footer>
    );
}
