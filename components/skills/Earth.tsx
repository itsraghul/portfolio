"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const CORE_RADIUS = 1.8;
const WIREFRAME_RADIUS = 1.82;
const GLOW_RADIUS = 2.2;
const SEGMENTS = 24;

/** Generate points for a circle ring in XZ plane */
function circlePoints(radius: number, segments: number): THREE.Vector3[] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
  });
}

/** Generate points for a circle ring in XY plane (meridian) */
function meridianPoints(radius: number, segments: number): THREE.Vector3[] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    );
  });
}

/** Fresnel glow shader for atmospheric effect */
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
  const wireframeRef = useRef<THREE.Mesh>(null);

  const glowUniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color("#4a9eff") },
      intensity: { value: 0.6 },
    }),
    []
  );

  const equatorPts = useMemo(() => circlePoints(CORE_RADIUS * 1.01, 64), []);
  const meridian1Pts = useMemo(() => meridianPoints(CORE_RADIUS * 1.01, 64), []);
  const meridian2Pts = useMemo(
    () =>
      meridianPoints(CORE_RADIUS * 1.01, 64).map(
        (p) => new THREE.Vector3(p.z, p.y, p.x)
      ),
    []
  );

  useFrame((_, delta) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      {/* Core solid sphere */}
      <mesh>
        <sphereGeometry args={[CORE_RADIUS, SEGMENTS, SEGMENTS]} />
        <meshStandardMaterial
          color="#0a1628"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[WIREFRAME_RADIUS, SEGMENTS, SEGMENTS]} />
        <meshBasicMaterial
          color="#4a9eff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Grid lines — equator + 2 meridians */}
      <Line points={equatorPts} color="#6366f1" lineWidth={1} transparent opacity={0.25} />
      <Line points={meridian1Pts} color="#6366f1" lineWidth={1} transparent opacity={0.25} />
      <Line points={meridian2Pts} color="#6366f1" lineWidth={1} transparent opacity={0.25} />

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
