"use client";

import { X, ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type Project = typeof portfolioData.projects[number];

interface InfoPanelProps {
  projectId: string | null;
  onClose: () => void;
}

export function InfoPanel({ projectId, onClose }: InfoPanelProps) {
  const project = portfolioData.projects.find((p) => p.id === projectId);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "relative w-full max-w-lg rounded-2xl overflow-hidden",
          "bg-[#0a0a1a]/95 border backdrop-blur-md",
          "animate-in fade-in zoom-in-95 duration-300"
        )}
        style={{
          borderColor: project.color + "40",
          boxShadow: `0 0 30px ${project.color}30`,
        }}
      >
        {/* Header glow */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <div className="mb-6">
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: project.color }}
            >
              {project.title}
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Code className="h-4 w-4" style={{ color: project.color }} />
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: project.color + "20",
                    color: project.color,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          {project.link !== "#" && (
            <Button
              asChild
              className="w-full gap-2"
              style={{
                backgroundColor: project.color,
                color: "#0a0a1a",
              }}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                View Project
              </a>
            </Button>
          )}
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 opacity-20 blur-2xl pointer-events-none"
          style={{ backgroundColor: project.color }}
        />
      </div>
    </div>
  );
}
