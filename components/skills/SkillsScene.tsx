"use client";

import { useState, useCallback, useMemo, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { skills } from "@/constants/about";
import SkillCard3D from "./SkillCard3D";
import SkillDetailPanel from "./SkillDetailPanel";
import Earth from "./Earth";
import type { Card } from "@/types";

const INTRO_PLAYED_KEY = "skills-intro-played";
const TARGET_POSITION = new THREE.Vector3(0, 3, 14);
const START_POSITION = new THREE.Vector3(0, 18, 38);

function CameraIntro({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree();
  const progress = useRef(0);
  const done = useRef(false);

  useEffect(() => {
    camera.position.copy(START_POSITION);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    if (done.current) return;
    progress.current = Math.min(progress.current + delta / 2.8, 1);
    // Smoothstep easing for cinematic feel
    const t = progress.current * progress.current * (3 - 2 * progress.current);
    camera.position.lerpVectors(START_POSITION, TARGET_POSITION, t);
    camera.lookAt(0, 0, 0);
    if (progress.current >= 1) {
      done.current = true;
      sessionStorage.setItem(INTRO_PLAYED_KEY, "1");
      onComplete();
    }
  });

  return null;
}

interface OrbitConfig {
  radius: number;
  speed: number;
  inclination: number;
  phaseOffset: number;
}

/** Generate orbit configurations across 3 bands */
function generateOrbitConfigs(count: number): OrbitConfig[] {
  const bands = [
    { min: 3.5, max: 4.2 },
    { min: 5.0, max: 5.5 },
    { min: 6.2, max: 6.8 },
  ];

  return Array.from({ length: count }, (_, i) => {
    const bandIndex = Math.floor(i / 4) % 3;
    const posInBand = i % 4;
    const band = bands[bandIndex];
    const radius = band.min + (posInBand / 3) * (band.max - band.min);

    return {
      radius,
      speed: 0.35 / Math.sqrt(radius / 3.5),
      inclination: ((i / (count - 1)) - 0.5) * Math.PI * 0.45,
      phaseOffset: (i / count) * Math.PI * 2,
    };
  });
}

/** Generate points for an orbit ring in XZ plane */
function orbitRingPoints(radius: number): THREE.Vector3[] {
  const segments = 64;
  return Array.from({ length: segments + 1 }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
  });
}

function parseRgb(rgb: string): string {
  const [r, g, b] = rgb.split(",").map((s) => s.trim());
  return `rgb(${r}, ${g}, ${b})`;
}

export default function SkillsScene() {
  const [selected, setSelected] = useState<Card | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(INTRO_PLAYED_KEY) === "1";
  });

  const orbitConfigs = useMemo(
    () => generateOrbitConfigs(skills.length),
    []
  );

  const handleSelect = useCallback((skill: Card) => {
    setSelected((prev) => (prev?.index === skill.index ? null : skill));
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: introComplete ? [0, 3, 14] : [0, 18, 38], fov: 45 }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, #0f172a 0%, #020617 70%, #000000 100%)"
            : "radial-gradient(ellipse at center, #f8fafc 0%, #e2e8f0 70%, #cbd5e1 100%)",
        }}
      >
        <Suspense fallback={null}>
        {!introComplete && <CameraIntro onComplete={() => setIntroComplete(true)} />}
        <ambientLight intensity={isDark ? 0.4 : 0.6} />
        <directionalLight position={[10, 5, 10]} intensity={isDark ? 0.8 : 1.0} />
        {isDark && (
          <pointLight position={[-8, -5, -8]} intensity={0.3} color="#6366f1" />
        )}

        {isDark && (
          <Stars
            radius={60}
            depth={60}
            count={5000}
            factor={2}
            saturation={0}
            fade
            speed={0.5}
          />
        )}

        <Earth isDark={isDark} />

        {skills.map((skill, i) => {
          const config = orbitConfigs[i];
          const ringPts = orbitRingPoints(config.radius);
          return (
            <group key={skill.index} rotation={[config.inclination, 0, 0]}>
              {/* Orbit ring */}
              <Line
                points={ringPts}
                color={parseRgb(skill.color)}
                lineWidth={0.8}
                transparent
                opacity={0.1}
              />
              {/* Satellite */}
              <SkillCard3D
                skill={skill}
                orbitConfig={config}
                onSelect={handleSelect}
                isSelected={selected?.index === skill.index}
              />
            </group>
          );
        })}

        <OrbitControls
          enabled={introComplete}
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
        </Suspense>
      </Canvas>

      <SkillDetailPanel skill={selected} onClose={handleClose} />
    </div>
  );
}
