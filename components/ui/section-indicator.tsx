"use client";

import { cn } from "@/lib/utils";
import { sections, type Section } from "@/lib/camera-path";

interface SectionIndicatorProps {
  section: Section;
  progress: number;
}

export function SectionIndicator({ section, progress }: SectionIndicatorProps) {
  const currentIndex = sections.findIndex(s => s.id === section.id);
  
  return (
    <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 flex flex-col gap-2">
      {/* Section badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-xs font-bold text-cyan-400">
            {currentIndex + 1}
          </span>
          <span className="text-xs text-muted-foreground">of {sections.length}</span>
        </div>
        <div className="h-px w-4 bg-gradient-to-r from-cyan-400 to-transparent" />
      </div>
      
      {/* Section name */}
      <h2 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wider uppercase">
        {section.name}
      </h2>
      
      {/* Section description */}
      <p className="text-sm text-muted-foreground/80 max-w-[200px] leading-relaxed">
        {section.description}
      </p>

      {/* Progress bar */}
      <div className="mt-2 h-1 w-40 rounded-full bg-muted-foreground/20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Mini navigation breadcrumb */}
      <div className="flex items-center gap-1.5 mt-2">
        {sections.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              s.id === section.id
                ? "w-6 bg-cyan-400"
                : i < currentIndex
                  ? "w-2 bg-cyan-400/50"
                  : "w-2 bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
