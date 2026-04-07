import Link from "next/link";
import { HOMEPAGE_INFO } from "@/constants";
import { Button } from "@/components/ui/button";

export default function HeroCtaBlock() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
      <p className="text-xs sm:text-sm text-muted-foreground/80 text-center line-clamp-2">
        {HOMEPAGE_INFO.BASIC_DESC}
      </p>
      <div className="flex gap-2">
        <Button asChild size="sm" className="font-mono text-xs">
          <Link href={HOMEPAGE_INFO.CTA_PRIMARY.href}>
            {HOMEPAGE_INFO.CTA_PRIMARY.label}
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="font-mono text-xs backdrop-blur-sm">
          <a href={HOMEPAGE_INFO.CTA_SECONDARY.href} target="_blank" rel="noopener noreferrer">
            {HOMEPAGE_INFO.CTA_SECONDARY.label}
          </a>
        </Button>
      </div>
    </div>
  );
}
