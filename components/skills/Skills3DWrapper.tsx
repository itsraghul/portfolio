"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SkillsFallback from "./SkillsFallback";

const SkillsScene = dynamic(() => import("./SkillsScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] sm:h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground font-mono text-sm">
        Loading 3D scene...
      </div>
    </div>
  ),
});

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export default function Skills3DWrapper() {
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setSupportsWebGL(detectWebGL());
  }, []);

  if (supportsWebGL === null) {
    return (
      <div className="w-full h-[500px] sm:h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">
          Loading...
        </div>
      </div>
    );
  }

  return supportsWebGL ? <SkillsScene /> : <SkillsFallback />;
}
