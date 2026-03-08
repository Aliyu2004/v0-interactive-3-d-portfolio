"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Ground() {
  const gridRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create custom grid geometry
  const gridGeometry = useMemo(() => {
    const size = 100;
    const divisions = 50;
    const step = size / divisions;
    const halfSize = size / 2;
    const vertices: number[] = [];

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step;
      // Lines along X
      vertices.push(-halfSize, 0, pos, halfSize, 0, pos);
      // Lines along Z
      vertices.push(pos, 0, -halfSize, pos, 0, halfSize);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  // Custom shader for animated grid
  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#00f0ff") },
        uColor2: { value: new THREE.Color("#ff00ff") },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vPosition;
        
        void main() {
          float dist = length(vPosition.xz);
          float wave = sin(dist * 0.1 - uTime * 0.5) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, wave);
          
          float fade = 1.0 - smoothstep(20.0, 50.0, dist);
          float pulse = sin(uTime * 2.0 + dist * 0.2) * 0.3 + 0.7;
          
          gl_FragColor = vec4(color * pulse, fade * 0.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Animate grid
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Base ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Animated grid overlay */}
      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <primitive object={gridMaterial} ref={materialRef} attach="material" />
      </lineSegments>

      {/* Glow plane beneath grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[30, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}
