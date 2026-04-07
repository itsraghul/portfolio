import type { Metadata } from "next";
import ExperienceHeader from "@/components/experience/ExperienceHeader";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Experience",
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
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <ExperienceHeader />
        <ExperienceTimeline />
      </div>
    </>
  );
}
