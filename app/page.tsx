"use client"
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


export default function Home() {
  const [showSecond, setShowSecond] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [hideFirstCursor, setHideFirstCursor] = useState(false);
  const [hideSecondCursor, setHideSecondCursor] = useState(false);

  useEffect(() => {

    const timer1 = setTimeout(() => {
      setShowSecond(true);
      setHideFirstCursor(true)
    }, 3000);

    const timer2 = setTimeout(() => {
      setShowParagraph(true)
      setHideSecondCursor(true)
    }, 6000); // Additional 3s delay

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };

  }, []);
  return (
    <div className="max-w-4xl mx-auto mt-8 flex flex-col items-center justify-center">
      <h1 className="font-mono text-6xl mb-6">
        <span className={cn("inline-block overflow-hidden whitespace-nowrap  border-black animate-typing animate-blink",
          hideFirstCursor ? "border-transparent" : "border-r-4"
        )}>
          Hello There!
        </span>
      </h1>
      {showSecond && <h1 className="font-mono text-6xl mb-6">
        <span className={cn("inline-block overflow-hidden leading-[1.5em] whitespace-nowrap border-black animate-typing animate-blink",
          hideSecondCursor ? "border-transparent" : "border-r-4"
        )}>
          {"I'm Raghul S"}
        </span>
      </h1>}

      {showParagraph && <p className="font-mono text-muted-foreground text-xl inline-block overflow-hidden whitespace-nowrap border-r-4 border-black animate-typing animate-blink">
        A Software Developer who likes to build stuff</p>}
    </div>
  );
}
