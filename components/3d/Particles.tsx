"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  // Create particle system
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Distribute particles in a volume
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = Math.random() * 15 + 1;
      positions[i3 + 2] = Math.random() * 50 - 10;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = Math.random() * 0.01 + 0.005;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Cyan to magenta colors
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i3] = 0;
        colors[i3 + 1] = 0.94;
        colors[i3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.7) {
        colors[i3] = 1;
        colors[i3 + 1] = 0;
        colors[i3 + 2] = 1; // Magenta
      } else {
        colors[i3] = 0.55;
        colors[i3 + 1] = 0.36;
        colors[i3 + 2] = 0.96; // Purple
      }
    }

    return { positions, velocities, colors };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  // Animate particles
  useFrame(() => {
    if (!particlesRef.current) return;

    const positionAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Move particles
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Reset particles that go too high or out of bounds
      if (posArray[i3 + 1] > 20) {
        posArray[i3 + 1] = 1;
        posArray[i3] = (Math.random() - 0.5) * 40;
        posArray[i3 + 2] = Math.random() * 50 - 10;
      }

      // Horizontal bounds
      if (Math.abs(posArray[i3]) > 25) {
        velocities[i3] *= -1;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
