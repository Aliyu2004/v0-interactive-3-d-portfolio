"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useProgress } from "@/hooks/use-progress";
import { getProgressForSection } from "@/lib/camera-path";
import { vibrate } from "@/lib/storage";

// UI Components
import { LoadingScreen } from "@/components/ui/loading-screen";
import { NavigationController } from "@/components/ui/navigation-controller";
import { SectionIndicator } from "@/components/ui/section-indicator";
import { InfoPanel } from "@/components/ui/info-panel";
import { SkillsPanel } from "@/components/ui/skills-panel";
import { AboutPanel } from "@/components/ui/about-panel";
import { TimelinePanel } from "@/components/ui/timeline-panel";
import { ContactPanel } from "@/components/ui/contact-panel";
import { AIAssistant } from "@/components/ui/ai-assistant";
import { SettingsPanel } from "@/components/ui/settings-panel";
import { VoiceNarration } from "@/components/ui/voice-narration";

// Dynamically import 3D Scene to avoid SSR issues
const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const {
    progress,
    setProgress,
    currentSection,
    isReturning,
    visitCount,
    voiceEnabled,
    setVoiceEnabled,
    hasSeenWelcome,
    markWelcomeSeen,
  } = useProgress();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Handle section navigation
  const handleNavigate = useCallback(
    (sectionId: string) => {
      vibrate(30);
      const targetProgress = getProgressForSection(sectionId);
      setProgress(targetProgress);
    },
    [setProgress]
  );

  // Handle project click
  const handleProjectClick = useCallback((projectId: string) => {
    vibrate(50);
    setSelectedProject(projectId);
  }, []);

  // Mark welcome as seen after loading
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    if (!hasSeenWelcome) {
      markWelcomeSeen();
    }
  }, [hasSeenWelcome, markWelcomeSeen]);

  // Show loading screen on initial load
  if (isLoading) {
    return (
      <LoadingScreen
        isReturning={isReturning}
        visitCount={visitCount}
        onComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0a0a1a]">
      {/* 3D Scene */}
      <Scene
        progress={progress}
        onProgressChange={setProgress}
        onProjectClick={handleProjectClick}
      />

      {/* Section indicator */}
      <SectionIndicator section={currentSection} progress={progress} />

      {/* Navigation controller */}
      <NavigationController
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      {/* Context-sensitive panels */}
      <AboutPanel isVisible={currentSection.id === "about"} />
      <SkillsPanel isVisible={currentSection.id === "skills"} />
      <TimelinePanel isVisible={currentSection.id === "timeline"} />
      <ContactPanel isVisible={currentSection.id === "contact"} />

      {/* Project info panel */}
      <InfoPanel
        projectId={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* AI Assistant */}
      <AIAssistant />

      {/* Settings */}
      <SettingsPanel
        voiceEnabled={voiceEnabled}
        onVoiceToggle={setVoiceEnabled}
      />

      {/* Voice narration controller */}
      <VoiceNarration currentSection={currentSection} enabled={voiceEnabled} />

      {/* Welcome hint for first-time visitors */}
      {!isReturning && progress === 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <div className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-cyan-500/20 text-sm text-muted-foreground">
            Scroll or use arrows to navigate
          </div>
        </div>
      )}
    </main>
  );
}
