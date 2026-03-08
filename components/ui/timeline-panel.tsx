"use client";

import { portfolioData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface TimelinePanelProps {
  isVisible: boolean;
}

export function TimelinePanel({ isVisible }: TimelinePanelProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 max-w-xs md:max-w-sm">
      <div className="rounded-2xl bg-background/80 backdrop-blur-md border border-fuchsia-500/20 p-4 md:p-6">
        <h3 className="text-lg font-bold text-fuchsia-400 mb-4">Career Journey</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-purple-400" />
          
          {/* Timeline items */}
          <div className="space-y-6">
            {portfolioData.timeline.map((item, index) => (
              <div key={index} className="relative pl-8">
                {/* Dot */}
                <div
                  className={cn(
                    "absolute left-1.5 top-1 w-3 h-3 rounded-full border-2",
                    index === 0 && "bg-cyan-400 border-cyan-400",
                    index === 1 && "bg-fuchsia-400 border-fuchsia-400",
                    index === 2 && "bg-purple-400 border-purple-400",
                    index === 3 && "bg-purple-600 border-purple-600"
                  )}
                  style={{
                    boxShadow: index === 0 ? "0 0 10px rgba(0, 240, 255, 0.5)" : undefined,
                  }}
                />
                
                {/* Content */}
                <div>
                  <span
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider",
                      index === 0 && "text-cyan-400",
                      index === 1 && "text-fuchsia-400",
                      index === 2 && "text-purple-400",
                      index === 3 && "text-purple-600"
                    )}
                  >
                    {item.year}
                  </span>
                  <h4 className="text-sm font-semibold text-foreground mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
