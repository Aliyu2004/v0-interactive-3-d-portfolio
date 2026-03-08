"use client";

import { portfolioData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface SkillsPanelProps {
  isVisible: boolean;
}

const categoryColors: Record<string, string> = {
  frontend: "#00f0ff",
  backend: "#ff00ff",
  ai: "#8b5cf6",
  tools: "#00ff88",
};

export function SkillsPanel({ isVisible }: SkillsPanelProps) {
  const groupedSkills = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills>);

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 max-w-xs md:max-w-sm">
      <div className="rounded-2xl bg-background/80 backdrop-blur-md border border-cyan-500/20 p-4 md:p-6">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Technical Skills</h3>
        
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: categoryColors[category] }}
              >
                {category}
              </h4>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={categoryColors[category]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
}

function SkillBar({ name, level, color }: SkillBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted-foreground/20 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${level}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
