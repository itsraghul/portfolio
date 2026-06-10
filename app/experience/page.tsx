import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import WorldShell from "@/components/bridge/WorldShell";
import VoyageHeader from "@/components/voyage/VoyageHeader";
import VoyageContent from "@/components/voyage/VoyageContent";
import HorizonSection from "@/components/voyage/HorizonSection";

export const metadata: Metadata = {
  title: "The Voyage — Experience",
  description:
    "3+ years of professional software engineering experience — from founding engineer roles to building products used by thousands.",
  openGraph: {
    title: "Experience — Raghul S",
    description:
      "3+ years of professional software engineering experience — from founding engineer roles to building products used by thousands.",
    url: "https://raghuls.dev/experience",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://raghuls.dev" },
    { "@type": "ListItem", position: 2, name: "Experience", item: "https://raghuls.dev/experience" },
  ],
};

export default function ExperiencePage() {
  return (
    <WorldShell world="sea">
      <JsonLd data={breadcrumbSchema} />
      <div className="grain" aria-hidden="true" />
      <div className="edge-burn" aria-hidden="true" />
      <main className="relative z-[2] mx-auto max-w-[1100px] px-7 pt-[130px]">
        <VoyageHeader />
        <VoyageContent />
        <HorizonSection />
      </main>
    </WorldShell>
  );
}
