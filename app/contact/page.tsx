import type { Metadata } from "next";
import WorldShell from "@/components/bridge/WorldShell";
import RadarHeader from "@/components/comms/RadarHeader";
import ChannelCards from "@/components/comms/ChannelCards";
import Composer from "@/components/comms/Composer";
import { COMMS_READOUTS } from "@/constants/comms";

export const metadata: Metadata = {
  title: "Comms",
  description:
    "Open a channel to Raghul S — LinkedIn, GitHub, or a direct transmission. Response time under 24 hours.",
};

export default function ContactPage() {
  return (
    <WorldShell world="ship">
      <div className="scanlines" aria-hidden="true" />
      <main className="relative z-[3] mx-auto max-w-[980px] px-7 pb-20 pt-[116px] max-[860px]:px-[18px]">
        <RadarHeader />
        <ChannelCards />
        <Composer />
        <div className="mt-[38px] flex flex-wrap gap-[26px] font-mono-tech text-[11.5px] tracking-[0.16em] text-[var(--dim)]">
          {COMMS_READOUTS.map((readout) => (
            <span key={readout.label}>
              {readout.label} <b className="font-normal text-[var(--green)]">{readout.value}</b>
            </span>
          ))}
        </div>
      </main>
    </WorldShell>
  );
}
