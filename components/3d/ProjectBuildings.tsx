"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { portfolioData } from "@/lib/portfolio-data";

type Project = typeof portfolioData.projects[number];

interface ProjectBuildingsProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

export default function ProjectBuildings({ projects, onProjectClick }: ProjectBuildingsProps) {
  return (
    <group>
      {projects.map((project, index) => (
        <ProjectBuilding
          key={project.id}
          project={project}
          index={index}
          onClick={() => onProjectClick(project.id)}
        />
      ))}
    </group>
  );
}

interface ProjectBuildingProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectBuilding({ project, index, onClick }: ProjectBuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseY = 1.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Floating animation
    meshRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime + index) * 0.1;
    
    // Rotation on hover
    if (hovered) {
      meshRef.current.rotation.y += 0.01;
    }
    
    // Pulse effect
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = hovered 
      ? 0.8 
      : 0.4 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
  });

  return (
    <group position={[project.position.x, 0, project.position.z]}>
      {/* Main building structure */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive={project.color}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glowing edges */}
      <lineSegments position={[0, baseY, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 3, 1.5)]} />
        <lineBasicMaterial color={project.color} linewidth={2} />
      </lineSegments>

      {/* Top beacon */}
      <mesh position={[0, baseY + 1.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={project.color} />
      </mesh>

      {/* Ground light ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={hovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0, 2, 0]}
        intensity={hovered ? 2 : 1}
        color={project.color}
        distance={5}
      />

      {/* Hover label */}
      {hovered && (
        <Html
          position={[0, 3.5, 0]}
          center
          style={{
            pointerEvents: "none",
          }}
        >
          <div className="flex flex-col items-center gap-1 rounded-lg bg-background/90 px-4 py-2 backdrop-blur-sm border border-cyan-500/30">
            <span className="text-sm font-bold text-cyan-400 whitespace-nowrap">
              {project.title}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Click to view
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
