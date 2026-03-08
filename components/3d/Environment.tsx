"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Environment() {
  const starsRef = useRef<THREE.Points>(null);

  // Create star field
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Distribute stars in a sphere around the scene
      const radius = 50 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = Math.abs(radius * Math.cos(phi)) + 10; // Keep above ground
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Varying colors - cyan to purple to white
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i3] = 0;
        colors[i3 + 1] = 0.94;
        colors[i3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.5) {
        colors[i3] = 0.55;
        colors[i3 + 1] = 0.36;
        colors[i3 + 2] = 0.96; // Purple
      } else {
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.9;
        colors[i3 + 2] = 1; // White
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return geometry;
  }, []);

  // Slowly rotate stars
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <>
      {/* Ambient light - very dim for atmosphere */}
      <ambientLight intensity={0.15} color="#4a5568" />

      {/* Main directional light */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.3}
        color="#00f0ff"
        castShadow
      />

      {/* Secondary fill light */}
      <directionalLight
        position={[-10, 10, -10]}
        intensity={0.15}
        color="#ff00ff"
      />

      {/* Point lights for accent */}
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00f0ff" distance={20} />
      <pointLight position={[5, 3, 10]} intensity={0.3} color="#ff00ff" distance={15} />
      <pointLight position={[-5, 3, 15]} intensity={0.3} color="#8b5cf6" distance={15} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a1a", 15, 60]} />

      {/* Star field */}
      <points ref={starsRef} geometry={starGeometry}>
        <pointsMaterial
          size={0.5}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </>
  );
}
