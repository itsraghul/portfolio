import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ScrollExperience from "@/components/experience/ScrollExperience";
import { experience } from "@/constants/experience";

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
      {/* Break out of the main layout padding for full-viewport scroll sections */}
      <div className="-mt-6 w-screen overflow-x-clip ml-[calc(50%-50vw)]">
        <ScrollExperience experiences={experience} />
      </div>
    </>
  );
}
