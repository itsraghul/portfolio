import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import WorldShell from "@/components/bridge/WorldShell";
import LogEntry from "@/components/captains-log/LogEntry";
import { SOCIAL_LINKS } from "@/constants/bridge";
import {
  LOG_ENTRIES,
  LOG_HEAD,
  LOG_PORTRAIT,
  LOG_PS,
  LOG_SIGNATURE,
  LOG_TALLIES,
  REACH_INTRO,
  REACH_TAG,
  TALLY_TAG,
} from "@/constants/captains-log";

export const metadata: Metadata = {
  title: "Captain's Log — About",
  description:
    "Raghul S — Founding Software Engineer at Velt with 3+ years building across web, blockchain, and more. Get to know me.",
  openGraph: {
    title: "About — Raghul S",
    description:
      "Raghul S — Founding Software Engineer at Velt with 3+ years building across web, blockchain, and more.",
    url: "https://raghuls.dev/about",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://raghuls.dev" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://raghuls.dev/about" },
  ],
};

export default function AboutPage() {
  return (
    <WorldShell world="sea">
      <JsonLd data={breadcrumbSchema} />
      <div className="grain" aria-hidden="true" />
      <div className="edge-burn" aria-hidden="true" />
      <main className="relative z-[2] mx-auto max-w-[760px] px-[26px] pb-[90px] pt-[120px]">
        <header className="text-center">
          <div className="font-mono-tech text-[11.5px] uppercase tracking-[0.32em] text-[var(--ink-soft)]">{LOG_HEAD.overline}</div>
          <h1 className="mt-3 font-pirata text-[clamp(48px,8vw,84px)] font-normal leading-none [text-shadow:2px_2px_0_rgba(176,138,62,.35)]">
            {LOG_HEAD.titlePre}
            <span className="text-[var(--rust)]">{LOG_HEAD.titleAccent}</span>
          </h1>
          <div className="mt-2.5 text-lg italic text-[var(--ink-soft)]">{LOG_HEAD.date}</div>
        </header>

        <div className="mt-11 flex items-center gap-[26px] max-[620px]:flex-col max-[620px]:text-center">
          <div className="h-[132px] w-[132px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#9c7c45] outline outline-2 outline-offset-[5px] outline-[rgba(156,124,69,.4)]">
            <Image
              src="/images/profile-portrait.png"
              alt="Portrait of Raghul S"
              width={132}
              height={132}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-pirata text-[38px] font-normal leading-none">{LOG_PORTRAIT.name}</h2>
            <div className="mt-1 text-[19px] italic text-[var(--rust-deep)]">{LOG_PORTRAIT.epithet}</div>
            <div className="mt-2.5 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{LOG_PORTRAIT.role}</div>
          </div>
        </div>

        {LOG_ENTRIES.map((entry) => (
          <LogEntry key={entry.tag} tag={entry.tag} segments={entry.segments} />
        ))}

        <LogEntry tag={TALLY_TAG}>
          <div className="mt-5 grid grid-cols-3 gap-[18px] max-[620px]:grid-cols-1">
            {LOG_TALLIES.map((tally) => (
              <div key={tally.label} className="border-[1.5px] border-[rgba(120,90,45,.45)] bg-[rgba(255,250,235,.5)] px-3.5 py-[18px] text-center">
                <div className="font-pirata text-[44px] leading-none text-[var(--rust-deep)]">{tally.value}</div>
                <div className="mt-2 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">{tally.label}</div>
              </div>
            ))}
          </div>
        </LogEntry>

        <LogEntry tag={REACH_TAG}>
          <p className="mt-4 text-[20.5px] leading-[1.65] text-[#4a3922]">{REACH_INTRO}</p>
          <div className="mt-5 flex flex-wrap gap-3.5 max-[620px]:justify-center">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2.5 rounded-[3px] bg-[var(--rust-deep)] px-[22px] py-[13px] font-mono-tech text-xs tracking-[0.18em] text-[var(--paper)] no-underline shadow-[0_6px_16px_rgba(126,60,29,.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(126,60,29,.42)] motion-reduce:transition-none"
                data-sfx-hover
              >
                <span className="h-[9px] w-[9px] rounded-full bg-[var(--paper)] opacity-70" aria-hidden="true" />
                {social.label}
              </a>
            ))}
          </div>
        </LogEntry>

        <div className="mt-[60px] text-right">
          <span className="inline-block -rotate-3 font-pirata text-[42px] text-[var(--ink)]">{LOG_SIGNATURE.sig}</span>
          <div className="mt-1 font-mono-tech text-[10.5px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
            {LOG_SIGNATURE.caption}
          </div>
        </div>

        <p className="mt-[50px] border-t border-dashed border-[rgba(120,90,45,.45)] pt-[18px] text-[17px] italic text-[var(--ink-soft)]">
          {LOG_PS.pre}
          <a href={LOG_PS.href} className="text-[var(--rust-deep)] underline">
            {LOG_PS.linkLabel}
          </a>
          {LOG_PS.post}
        </p>
      </main>
    </WorldShell>
  );
}
