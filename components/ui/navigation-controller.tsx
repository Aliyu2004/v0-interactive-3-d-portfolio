"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sections, getNextSection, getPreviousSection, type Section } from "@/lib/camera-path";
import { vibrate } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface NavigationControllerProps {
  currentSection: Section;
  onNavigate: (sectionId: string) => void;
}

export function NavigationController({ currentSection, onNavigate }: NavigationControllerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleSectionClick = (sectionId: string) => {
    vibrate(20);
    onNavigate(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile-friendly section menu */}
      <div className="fixed right-4 bottom-24 md:right-8 md:bottom-8 z-50 flex flex-col items-center gap-2">
        {/* Menu toggle button (mobile) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            vibrate(20);
            setIsMenuOpen(!isMenuOpen);
          }}
          className="md:hidden h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border border-cyan-500/20 text-cyan-400"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Section dots (desktop) */}
        <div className="hidden md:flex flex-col items-center gap-1 mb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "group relative flex items-center"
              )}
              aria-label={`Go to ${section.name}`}
            >
              <span className={cn(
                "absolute right-full mr-3 px-2 py-1 rounded text-xs font-medium whitespace-nowrap",
                "opacity-0 group-hover:opacity-100 transition-opacity",
                "bg-background/90 backdrop-blur-sm border border-cyan-500/20",
                currentSection.id === section.id ? "text-cyan-400" : "text-foreground"
              )}>
                {section.name}
              </span>
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentSection.id === section.id
                    ? "w-3 h-3 bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                    : "bg-muted-foreground/30 hover:bg-cyan-400/50"
                )}
              />
            </button>
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

      {/* Mobile full-screen menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
            <h2 className="text-lg text-muted-foreground mb-4">Navigate to</h2>
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "flex items-center gap-4 px-6 py-3 rounded-xl transition-all w-full max-w-xs",
                  "border",
                  currentSection.id === section.id
                    ? "bg-cyan-400/20 border-cyan-400/50 text-cyan-400"
                    : "bg-background/50 border-muted-foreground/20 text-foreground hover:border-cyan-400/30"
                )}
              >
                <span className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  currentSection.id === section.id
                    ? "bg-cyan-400 text-background"
                    : "bg-muted-foreground/20 text-muted-foreground"
                )}>
                  {index + 1}
                </span>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{section.name}</div>
                  <div className="text-xs text-muted-foreground">{section.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
