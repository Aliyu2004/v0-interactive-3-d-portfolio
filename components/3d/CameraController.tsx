"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cameraPath, lookAtTargets, sections } from "@/lib/camera-path";

interface CameraControllerProps {
  progress: number;
  onProgressChange: (progress: number) => void;
}

export default function CameraController({ progress, onProgressChange }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 5));
  const isDragging = useRef(false);
  const lastY = useRef(0);

  // Handle scroll input
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0003;
      const newProgress = Math.max(0, Math.min(1, progress + delta));
      onProgressChange(newProgress);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        lastY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length === 1) {
        const deltaY = lastY.current - e.touches[0].clientY;
        const delta = deltaY * 0.001;
        const newProgress = Math.max(0, Math.min(1, progress + delta));
        onProgressChange(newProgress);
        lastY.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [progress, onProgressChange]);

  // Smoothly animate camera
  useFrame(() => {
    // Get position on path
    const point = cameraPath.getPointAt(progress);
    targetPosition.current.copy(point);

    // Calculate look-at target based on progress
    const sectionIndex = Math.min(
      sections.length - 1,
      Math.floor(progress * sections.length)
    );
    const nextIndex = Math.min(sectionIndex + 1, sections.length - 1);
    const localProgress = (progress * sections.length) % 1;

    targetLookAt.current.lerpVectors(
      lookAtTargets[sectionIndex],
      lookAtTargets[nextIndex],
      localProgress
    );

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05);
    currentLookAt.current.lerp(targetLookAt.current, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
