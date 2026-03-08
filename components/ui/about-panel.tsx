"use client";

import Image from "next/image";
import { portfolioData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface AboutPanelProps {
  isVisible: boolean;
}

export function AboutPanel({ isVisible }: AboutPanelProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 max-w-xs md:max-w-sm">
      <div className="rounded-2xl bg-background/80 backdrop-blur-md border border-cyan-500/20 p-4 md:p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 blur-md opacity-50" />
            <Image
              src={portfolioData.personal.profileImage}
              alt={portfolioData.personal.name}
              width={100}
              height={100}
              className="relative rounded-full border-2 border-cyan-400/50 object-cover"
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-foreground">
            {portfolioData.personal.name}
          </h3>
          <p className="text-sm text-cyan-400">{portfolioData.personal.title}</p>
        </div>

        {/* Headline */}
        <p className="text-lg font-semibold text-center text-foreground mb-3">
          {portfolioData.about.headline}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {portfolioData.about.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2">
          {portfolioData.about.highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-foreground">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
