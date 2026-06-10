import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import WorldShell from "@/components/bridge/WorldShell";
import QuestLog from "@/components/quests/QuestLog";
import { PLAYER_INFO, QUESTS_HEAD } from "@/constants/quests";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quest Log — Projects",
  description:
    "8+ projects built across web, blockchain, tools, and games by Raghul S — Founding Engineer at Velt.",
  openGraph: {
    title: "Projects — Raghul S",
    description:
      "8+ projects built across web, blockchain, tools, and games by Raghul S — Founding Engineer at Velt.",
    url: "https://raghuls.dev/projects",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://raghuls.dev" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://raghuls.dev/projects" },
  ],
};

export default function ProjectsPage() {
  return (
    <WorldShell world="game">
      <JsonLd data={breadcrumbSchema} />
      <div className="gridbg" aria-hidden="true" />
      <main className="relative z-[2] mx-auto max-w-[1180px] px-6 pb-[70px] pt-[100px]">
        <header className="flex flex-wrap items-stretch justify-between gap-[18px]">
          <div className="ffbox min-w-[300px] flex-1 px-7 py-[22px]">
            <h1 className="font-pixel text-[clamp(20px,3.4vw,34px)] tracking-[0.04em] text-[var(--gold)] [text-shadow:3px_3px_0_var(--frame-shadow)]">
              {QUESTS_HEAD.title}
            </h1>
            <div className="mt-2.5 text-[22px] text-[var(--dim)]">{QUESTS_HEAD.sub}</div>
          </div>
          <div className="ffbox grid min-w-[264px] content-center gap-[7px] px-6 py-[18px]">
            {PLAYER_INFO.map((row) => (
              <div key={row.k} className="flex justify-between gap-6 text-[21px]">
                <span className="whitespace-nowrap text-[var(--dim)]">{row.k}</span>
                <span className={cn("whitespace-nowrap text-right", row.gold ? "text-[var(--gold)]" : "text-[var(--txt)]")}>
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </header>
        <QuestLog />
      </main>
    </WorldShell>
  );
}
