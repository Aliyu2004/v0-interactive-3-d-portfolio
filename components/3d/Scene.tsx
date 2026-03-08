"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Environment from "./Environment";
import Ground from "./Ground";
import Buildings from "./Buildings";
import Particles from "./Particles";
import CameraController from "./CameraController";
import CharacterGuide from "./CharacterGuide";
import ProjectBuildings from "./ProjectBuildings";
import { portfolioData } from "@/lib/portfolio-data";

interface SceneProps {
  progress: number;
  onProgressChange: (progress: number) => void;
  onProjectClick: (projectId: string) => void;
}

export default function Scene({ progress, onProgressChange, onProjectClick }: SceneProps) {
  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 1000 }}
      style={{ background: "#0a0a1a" }}
      dpr={[1, 2]}
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        <Environment />
        <Ground />
        <Buildings />
        <Particles />
        <ProjectBuildings 
          projects={portfolioData.projects} 
          onProjectClick={onProjectClick}
        />
        <CharacterGuide progress={progress} />
        <CameraController 
          progress={progress} 
          onProgressChange={onProgressChange}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
