"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sections, getNextSection, getPreviousSection, type Section } from "@/lib/camera-path";
import { vibrate } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface NavigationControllerProps {
  currentSection: Section;
  onNavigate: (sectionId: string) => void;
}

export function NavigationController({ currentSection, onNavigate }: NavigationControllerProps) {
  const prevSection = getPreviousSection(currentSection.id);
  const nextSection = getNextSection(currentSection.id);

  const handlePrev = () => {
    if (prevSection) {
      vibrate(30);
      onNavigate(prevSection.id);
    }
  };

  const handleNext = () => {
    if (nextSection) {
      vibrate(30);
      onNavigate(nextSection.id);
    }
  };

  return (
    <div className="fixed right-4 bottom-24 md:right-8 md:bottom-8 z-50 flex flex-col items-center gap-2">
      {/* Section indicator */}
      <div className="flex flex-col items-center gap-1 mb-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => {
              vibrate(20);
              onNavigate(section.id);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentSection.id === section.id
                ? "w-3 h-3 bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                : "bg-muted-foreground/30 hover:bg-cyan-400/50"
            )}
            aria-label={`Go to ${section.name}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-col gap-1 rounded-xl bg-background/80 p-1 backdrop-blur-md border border-cyan-500/20">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          disabled={!prevSection}
          className={cn(
            "h-12 w-12 rounded-lg transition-all",
            prevSection
              ? "text-cyan-400 hover:bg-cyan-400/20 hover:text-cyan-300"
              : "text-muted-foreground/30"
          )}
          aria-label="Previous section"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={!nextSection}
          className={cn(
            "h-12 w-12 rounded-lg transition-all",
            nextSection
              ? "text-cyan-400 hover:bg-cyan-400/20 hover:text-cyan-300"
              : "text-muted-foreground/30"
          )}
          aria-label="Next section"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
