"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useProgress } from "@/hooks/use-progress";
import { getProgressForSection } from "@/lib/camera-path";
import { vibrate } from "@/lib/storage";

// UI Components
import { LoadingScreen } from "@/components/ui/loading-screen";
import { NavigationController } from "@/components/ui/navigation-controller";
import { SectionIndicator } from "@/components/ui/section-indicator";
import { SectionContent } from "@/components/ui/section-content";
import { AIAssistant } from "@/components/ui/ai-assistant";
import { SettingsPanel } from "@/components/ui/settings-panel";
import { VoiceNarration } from "@/components/ui/voice-narration";
import { TopNavBar } from "@/components/ui/top-nav-bar";

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

  // Handle section navigation
  const handleNavigate = useCallback(
    (sectionId: string) => {
      vibrate(30);
      const targetProgress = getProgressForSection(sectionId);
      setProgress(targetProgress);
    },
    [setProgress]
  );

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
      {/* 3D Scene (background) */}
      <div className="absolute inset-0 opacity-60">
        <Scene
          progress={progress}
          onProgressChange={setProgress}
          onProjectClick={() => {}}
        />
      </div>

      {/* Top navigation bar */}
      <TopNavBar currentSection={currentSection} onNavigate={handleNavigate} />

      {/* Section indicator (right side) */}
      <SectionIndicator section={currentSection} progress={progress} />

      {/* Main section content (centered, always visible) */}
      <div className="relative z-20 h-full overflow-y-auto">
        <SectionContent section={currentSection} onNavigate={handleNavigate} />
      </div>

      {/* Navigation controller (bottom) */}
      <NavigationController
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      {/* AI Assistant (bottom-left) */}
      <AIAssistant />

      {/* Settings (top-right) */}
      <SettingsPanel
        voiceEnabled={voiceEnabled}
        onVoiceToggle={setVoiceEnabled}
      />

      {/* Voice narration controller */}
      <VoiceNarration currentSection={currentSection} enabled={voiceEnabled} />
    </main>
  );
}
