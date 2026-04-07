import type { Metadata } from "next";
import ProjectsContent from "@/components/projects/ProjectsContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Projects",
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
    <>
      <JsonLd data={breadcrumbSchema} />
      <ProjectsContent />
    </>
  );
}
