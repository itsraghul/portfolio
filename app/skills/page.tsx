import type { Metadata } from "next";
import SkillsContent from "@/components/skills/SkillsContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Skills",
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
    <>
      <JsonLd data={breadcrumbSchema} />
      <SkillsContent />
    </>
  );
}
