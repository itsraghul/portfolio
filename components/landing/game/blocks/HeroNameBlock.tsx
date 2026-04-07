import { HOMEPAGE_INFO } from "@/constants";

export default function HeroNameBlock() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono border border-border/60 bg-secondary/50 backdrop-blur-sm text-muted-foreground mb-3">
        {HOMEPAGE_INFO.ROLE}
      </span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
        <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
          {HOMEPAGE_INFO.NAME_INFO.replace("I'm ", "")}
        </span>
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground font-mono max-w-xs">
        {HOMEPAGE_INFO.TAGLINE}
      </p>
    </div>
  );
}
