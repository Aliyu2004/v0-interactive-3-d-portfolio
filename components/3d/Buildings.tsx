"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BuildingData {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  emissiveIntensity: number;
}

export default function Buildings() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate procedural buildings
  const buildings = useMemo<BuildingData[]>(() => {
    const result: BuildingData[] = [];
    const colors = ["#00f0ff", "#ff00ff", "#8b5cf6", "#00ff88"];

    // Left side buildings
    for (let z = -10; z < 30; z += 4) {
      for (let x = -12; x <= -6; x += 3) {
        const height = 2 + Math.random() * 6;
        result.push({
          position: [x + Math.random() * 1, height / 2, z + Math.random() * 2],
          scale: [0.8 + Math.random() * 0.8, height, 0.8 + Math.random() * 0.8],
          color: colors[Math.floor(Math.random() * colors.length)],
          emissiveIntensity: 0.2 + Math.random() * 0.3,
        });
      }
    }

    // Right side buildings
    for (let z = -10; z < 30; z += 4) {
      for (let x = 6; x <= 12; x += 3) {
        const height = 2 + Math.random() * 6;
        result.push({
          position: [x + Math.random() * 1, height / 2, z + Math.random() * 2],
          scale: [0.8 + Math.random() * 0.8, height, 0.8 + Math.random() * 0.8],
          color: colors[Math.floor(Math.random() * colors.length)],
          emissiveIntensity: 0.2 + Math.random() * 0.3,
        });
      }
    }

    return result;
  }, []);

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.5) * 0.001;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))}
    </group>
  );
}

function Building({ position, scale, color, emissiveIntensity }: BuildingData) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Pulse effect
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 
        emissiveIntensity + Math.sin(state.clock.elapsedTime * 2 + position[2]) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Main building body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={scale} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Edge glow lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...scale)]} />
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>

      {/* Window lights */}
      <WindowLights scale={scale} color={color} />
    </group>
  );
}

function WindowLights({ scale, color }: { scale: [number, number, number]; color: string }) {
  const windowGeometry = useMemo(() => {
    const positions: number[] = [];
    const [width, height, depth] = scale;
    const windowSize = 0.15;
    const spacing = 0.4;

    // Windows on front and back
    for (let y = 0.3; y < height - 0.3; y += spacing) {
      for (let x = -width / 2 + 0.2; x < width / 2 - 0.2; x += spacing) {
        if (Math.random() > 0.3) {
          positions.push(x, y - height / 2, depth / 2 + 0.01);
          positions.push(x, y - height / 2, -depth / 2 - 0.01);
        }
      }
    }

    // Windows on sides
    for (let y = 0.3; y < height - 0.3; y += spacing) {
      for (let z = -depth / 2 + 0.2; z < depth / 2 - 0.2; z += spacing) {
        if (Math.random() > 0.3) {
          positions.push(width / 2 + 0.01, y - height / 2, z);
          positions.push(-width / 2 - 0.01, y - height / 2, z);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [scale]);

  return (
    <points geometry={windowGeometry}>
      <pointsMaterial
        color={color}
        size={0.1}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
