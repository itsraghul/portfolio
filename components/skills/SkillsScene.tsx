"use client";

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import { skills } from "@/constants/about";
import SkillCard3D from "./SkillCard3D";
import SkillDetailPanel from "./SkillDetailPanel";
import type { Card } from "@/types";

/** Fibonacci sphere: distributes N points evenly on a sphere of given radius */
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }
  return points;
}

const positions = fibonacciSphere(skills.length, 5);

export default function SkillsScene() {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleSelect = useCallback((skill: Card) => {
    setSelected((prev) => (prev?.index === skill.index ? null : skill));
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[0, -10, 5]} intensity={0.3} color="#8b5cf6" />

        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        {skills.map((skill, i) => (
          <SkillCard3D
            key={skill.index}
            skill={skill}
            position={positions[i]}
            onSelect={handleSelect}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
        <Environment preset="city" />
      </Canvas>

      <SkillDetailPanel skill={selected} onClose={handleClose} />
    </div>
  );
}
