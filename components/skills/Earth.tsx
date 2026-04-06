"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const CORE_RADIUS = 1.8;
const GLOW_RADIUS = 2.2;
const SEGMENTS = 32;

const glowVertexShader = `
  varying float vFresnel;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    vec3 worldNormal = normalize(normalMatrix * normal);
    vFresnel = pow(1.0 - abs(dot(viewDir, worldNormal)), 3.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const glowFragmentShader = `
  uniform vec3 glowColor;
  uniform float intensity;
  varying float vFresnel;
  void main() {
    gl_FragColor = vec4(glowColor, vFresnel * intensity);
  }
`;

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  const [colorMap, bumpMap] = useTexture([
    "/images/earth/color.jpg",
    "/images/earth/bump.jpg",
  ]);

  const glowUniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color("#60a5fa") },
      intensity: { value: 0.6 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      {/* Textured earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[CORE_RADIUS, SEGMENTS, SEGMENTS]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Atmospheric glow (Fresnel) */}
      <mesh>
        <sphereGeometry args={[GLOW_RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
