import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About",
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
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutContent />
    </>
  );
}
