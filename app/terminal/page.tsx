"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const Terminal = dynamic(() => import("@/components/Terminal/Terminal"), { ssr: false });

export default function TerminalPage() {
  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col z-50">
      {/* Back link */}
      <div className="shrink-0 px-4 pt-3 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-white/30 hover:text-white/60 transition-colors"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          back to portfolio
        </Link>
      </div>

      {/* Terminal fills remaining space */}
      <div className="flex-1 px-4 pb-4 min-h-0">
        <Terminal />
      </div>
    </div>
  );
}
