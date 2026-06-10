import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import WorldShell from "@/components/bridge/WorldShell";
import HeroCard from "@/components/character/HeroCard";
import EquipmentPanel from "@/components/character/EquipmentPanel";
import AttributeBars from "@/components/character/AttributeBars";
import InventoryGrid from "@/components/character/InventoryGrid";
import { SHEET_HEAD } from "@/constants/character";

export const metadata: Metadata = {
  title: "Character Sheet — Skills",
  description:
    "Raghul S's technical skills across 12+ technologies — React, Next.js, TypeScript, Node.js, blockchain, and more.",
  openGraph: {
    title: "Skills — Raghul S",
    description:
      "Raghul S's technical skills across 12+ technologies — React, Next.js, TypeScript, Node.js, blockchain, and more.",
    url: "https://raghuls.dev/skills",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://raghuls.dev" },
    { "@type": "ListItem", position: 2, name: "Skills", item: "https://raghuls.dev/skills" },
  ],
};

export default function SkillsPage() {
  return (
    <WorldShell world="game">
      <JsonLd data={breadcrumbSchema} />
      <div className="gridbg" aria-hidden="true" />
      <main className="relative z-[2] mx-auto max-w-[1180px] px-6 pb-[70px] pt-[100px]">
        <header className="ffbox flex flex-wrap items-baseline gap-[22px] px-7 py-[22px]">
          <h1 className="font-pixel text-[clamp(18px,3vw,30px)] text-[var(--gold)] [text-shadow:3px_3px_0_var(--frame-shadow)]">
            {SHEET_HEAD.title}
          </h1>
          <span className="text-[22px] text-[var(--dim)]">{SHEET_HEAD.sub}</span>
        </header>
        <div className="mt-5 grid grid-cols-[330px_1fr] items-start gap-5 max-[980px]:grid-cols-1">
          <div className="grid gap-5">
            <HeroCard />
            <EquipmentPanel />
          </div>
          <div className="grid gap-5">
            <AttributeBars />
            <InventoryGrid />
          </div>
        </div>
      </main>
    </WorldShell>
  );
}
