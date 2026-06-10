import type { Metadata } from "next";
import WorldShell from "@/components/bridge/WorldShell";
import TerminalShell from "@/components/terminal/TerminalShell";

export const metadata: Metadata = {
  title: "Terminal",
  description: "Secure shell to the captain's quarters — type help to see available commands.",
};

export default function TerminalPage() {
  return (
    <WorldShell world="crt">
      <div className="crt-lines" aria-hidden="true" />
      <div className="crt-glow" aria-hidden="true" />
      <TerminalShell />
    </WorldShell>
  );
}
