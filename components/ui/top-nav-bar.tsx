"use client";

import { sections, type Section } from "@/lib/camera-path";
import { vibrate } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface TopNavBarProps {
  currentSection: Section;
  onNavigate: (sectionId: string) => void;
}

export function TopNavBar({ currentSection, onNavigate }: TopNavBarProps) {
  const handleClick = (sectionId: string) => {
    vibrate(20);
    onNavigate(sectionId);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-cyan-500/20">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              currentSection.id === section.id
                ? "bg-cyan-400/20 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {section.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
