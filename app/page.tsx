import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import WorldShell from "@/components/bridge/WorldShell";
import Starfield from "@/components/home/Starfield";
import BootLine from "@/components/home/BootLine";
import HeroPanel from "@/components/home/HeroPanel";
import StatRings from "@/components/home/StatRings";
import DestinationPorts from "@/components/home/DestinationPorts";
import MinorRoutes from "@/components/home/MinorRoutes";
import HomeFooter from "@/components/home/HomeFooter";

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
    <WorldShell world="ship">
      <JsonLd data={personSchema} />
      <Starfield />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <main className="relative z-[3] mx-auto max-w-[1060px] px-7 pb-20 pt-[120px] max-[860px]:px-[18px] max-[860px]:pb-[60px] max-[860px]:pt-24">
        <BootLine />
        <HeroPanel />
        <StatRings />
        <DestinationPorts />
        <MinorRoutes />
      </main>
      <HomeFooter />
    </WorldShell>
  );
}
