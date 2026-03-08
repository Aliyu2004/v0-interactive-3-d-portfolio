"use client";

import { cn } from "@/lib/utils";
import type { Section } from "@/lib/camera-path";

interface SectionIndicatorProps {
  section: Section;
  progress: number;
}

export function SectionIndicator({ section, progress }: SectionIndicatorProps) {
  return (
    <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 flex flex-col gap-2">
      {/* Section name */}
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-transparent" />
        <h2 className="text-lg md:text-xl font-bold text-cyan-400 tracking-wider uppercase">
          {section.name}
        </h2>
      </div>
      
      {/* Section description */}
      <p className="text-sm text-muted-foreground/80 max-w-[200px] leading-relaxed">
        {section.description}
      </p>

      {/* Progress bar */}
      <div className="mt-2 h-0.5 w-32 rounded-full bg-muted-foreground/20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
