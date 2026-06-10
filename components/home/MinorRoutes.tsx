import { MINOR_ROUTES } from "@/constants/home";

/** Secondary route links: about, contact, terminal. */
export default function MinorRoutes() {
    return (
        <div className="mt-[18px] grid grid-cols-3 gap-[18px] max-[860px]:grid-cols-1">
            {MINOR_ROUTES.map((route) => (
                <a
                    key={route.href}
                    href={route.href}
                    className="group flex items-center justify-between gap-2.5 rounded border border-[var(--line)] bg-[rgba(13,22,38,.35)] px-[22px] py-[18px] font-mono-tech text-[12.5px] tracking-[0.18em] text-[var(--dim)] no-underline transition-all duration-200 hover:border-[rgba(95,212,255,.5)] hover:bg-[rgba(95,212,255,.06)] hover:text-[var(--cyan)] motion-reduce:transition-none"
                >
                    <span>{route.label}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                        →
                    </span>
                </a>
            ))}
        </div>
    );
}
