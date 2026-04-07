import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import GameHomeClient from "@/components/landing/GameHomeClient";

export const metadata: Metadata = {
  title: "Raghul S — Founding Engineer @ Velt",
  description:
    "Raghul S is a Founding Software Engineer at Velt, dedicated to innovation and transformation through the boundless possibilities of technology.",
  openGraph: {
    title: "Raghul S — Founding Engineer @ Velt",
    description:
      "Raghul S is a Founding Software Engineer at Velt, dedicated to innovation and transformation through the boundless possibilities of technology.",
    url: "https://raghuls.dev",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Raghul S",
  jobTitle: "Founding Software Engineer",
  worksFor: { "@type": "Organization", name: "Velt" },
  url: "https://raghuls.dev",
  sameAs: [
    "https://www.linkedin.com/in/raghul-s25",
    "https://www.github.com/itsraghul",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema} />
      <GameHomeClient />
    </>
  );
}
