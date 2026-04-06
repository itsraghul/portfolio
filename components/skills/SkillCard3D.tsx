"use client";

import { useRef, useState, useMemo } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Card } from "@/types";

interface OrbitConfig {
  radius: number;
  speed: number;
  inclination: number;
  phaseOffset: number;
}

interface SkillCard3DProps {
  skill: Card;
  orbitConfig: OrbitConfig;
  onSelect: (skill: Card) => void;
  isSelected: boolean;
}

function parseColor(rgb: string): THREE.Color {
  const [r, g, b] = rgb.split(",").map((s) => parseInt(s.trim()) / 255);
  return new THREE.Color(r, g, b);
}

const haloVertexShader = `
  varying float vFresnel;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    vec3 worldNormal = normalize(normalMatrix * normal);
    vFresnel = pow(1.0 - abs(dot(viewDir, worldNormal)), 2.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const haloFragmentShader = `
  uniform vec3 glowColor;
  uniform float intensity;
  varying float vFresnel;
  void main() {
    gl_FragColor = vec4(glowColor, vFresnel * intensity);
  }
`;

export default function SkillCard3D({
  skill,
  orbitConfig,
  onSelect,
  isSelected,
}: SkillCard3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const color = useMemo(() => parseColor(skill.color), [skill.color]);

  const haloUniforms = useMemo(
    () => ({
      glowColor: { value: color.clone() },
      intensity: { value: 0.7 },
    }),
    [color]
  );

  const targetScale = hovered || isSelected ? 1.4 : 1;
  const targetEmissive = hovered || isSelected ? 1.0 : 0.5;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    // Orbital position
    const elapsed = state.clock.elapsedTime;
    const angle = orbitConfig.phaseOffset + elapsed * orbitConfig.speed;
    const x = Math.cos(angle) * orbitConfig.radius;
    const z = Math.sin(angle) * orbitConfig.radius;
    groupRef.current.position.set(x, 0, z);

    // Smooth scale
    const s = meshRef.current.scale.x;
    const next = THREE.MathUtils.lerp(s, targetScale, 0.08);
    groupRef.current.scale.setScalar(next);

    // Emissive intensity
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      targetEmissive,
      0.08
    );

    // Pulse when selected
    if (isSelected) {
      const pulse = 1 + Math.sin(elapsed * 3) * 0.08;
      groupRef.current.scale.setScalar(next * pulse);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core glowing sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
      >
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <shaderMaterial
          vertexShader={haloVertexShader}
          fragmentShader={haloFragmentShader}
          uniforms={haloUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Label */}
      <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div
          className="flex flex-col items-center gap-1 select-none"
          style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={skill.logo} alt={skill.name} width={32} height={32} />
          <span className="text-xs font-mono font-semibold text-foreground whitespace-nowrap">
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
}
