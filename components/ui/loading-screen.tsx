"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  isReturning: boolean;
  visitCount: number;
  onComplete: () => void;
}

export function LoadingScreen({ isReturning, visitCount, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(1, elapsed / duration);
      setProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a1a] transition-opacity duration-500 opacity-0 pointer-events-none" />
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a1a] transition-opacity duration-500",
        progress >= 1 && "opacity-0"
      )}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "moveGrid 20s linear infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Logo/Name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider">
            <span className="text-cyan-400">ALIYU</span>
            <span className="text-white"> YUNUS</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase">
            Portfolio Experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-1 rounded-full bg-muted-foreground/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="animate-pulse">Initializing 3D Environment</span>
          <span className="inline-flex">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: "100ms" }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: "200ms" }}>.</span>
          </span>
        </div>

        {/* Welcome message for returning visitors */}
        {isReturning && (
          <div className="mt-4 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
            <p className="text-sm text-cyan-400">
              Welcome back! Visit #{visitCount}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes moveGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
}
