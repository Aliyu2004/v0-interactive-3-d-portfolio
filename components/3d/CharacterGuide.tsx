"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cameraPath } from "@/lib/camera-path";

interface CharacterGuideProps {
  progress: number;
}

export default function CharacterGuide({ progress }: CharacterGuideProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Position character slightly ahead on the path
    const aheadProgress = Math.min(1, progress + 0.08);
    const position = cameraPath.getPointAt(aheadProgress);
    
    // Place on ground level with slight offset
    groupRef.current.position.set(position.x + 0.5, 0.6, position.z);
    
    // Face forward along path
    const lookAhead = cameraPath.getPointAt(Math.min(1, aheadProgress + 0.05));
    groupRef.current.lookAt(lookAhead.x, 0.6, lookAhead.z);

    // Walking animation
    const walkCycle = state.clock.elapsedTime * 8;
    const bobHeight = Math.sin(walkCycle * 2) * 0.02;
    groupRef.current.position.y += bobHeight;

    // Leg animation
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(walkCycle) * 0.5;
      rightLegRef.current.rotation.x = Math.sin(walkCycle + Math.PI) * 0.5;
    }

    // Arm swing
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(walkCycle + Math.PI) * 0.3;
      rightArmRef.current.rotation.x = Math.sin(walkCycle) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body - capsule shape */}
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Eyes - glowing */}
      <mesh position={[0.04, 0.72, 0.1]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.04, 0.72, 0.1]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Left Leg */}
      <group position={[0.06, 0, 0]}>
        <mesh ref={leftLegRef} position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[-0.06, 0, 0]}>
        <mesh ref={rightLegRef} position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Left Arm */}
      <group position={[0.2, 0.35, 0]}>
        <mesh ref={leftArmRef}>
          <capsuleGeometry args={[0.03, 0.12, 4, 8]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[-0.2, 0.35, 0]}>
        <mesh ref={rightArmRef}>
          <capsuleGeometry args={[0.03, 0.12, 4, 8]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Glow effect */}
      <pointLight position={[0, 0.4, 0]} intensity={0.5} color="#00f0ff" distance={3} />
    </group>
  );
}
