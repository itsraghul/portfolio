"use client";

import { useRef, useState } from "react";
import { Float, Html, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Card } from "@/types";

interface SkillCard3DProps {
  skill: Card;
  position: [number, number, number];
  onSelect: (skill: Card) => void;
}

function parseColor(rgb: string): THREE.Color {
  const [r, g, b] = rgb.split(",").map((s) => parseInt(s.trim()) / 255);
  return new THREE.Color(r, g, b);
}

export default function SkillCard3D({ skill, position, onSelect }: SkillCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = parseColor(skill.color);
  const targetScale = hovered ? 1.15 : 1;

  useFrame(() => {
    if (!meshRef.current) return;
    const s = meshRef.current.scale.x;
    const next = THREE.MathUtils.lerp(s, targetScale, 0.1);
    meshRef.current.scale.setScalar(next);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <RoundedBox
          ref={meshRef}
          args={[1.6, 1.6, 0.2]}
          radius={0.1}
          smoothness={4}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
          onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
        >
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.35}
            roughness={0.15}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="flex flex-col items-center gap-1 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.logo} alt={skill.name} width={40} height={40} />
            <span className="text-xs font-mono font-semibold text-foreground whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        </Html>
      </group>
    </Float>
  );
}
