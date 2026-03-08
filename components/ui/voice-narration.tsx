"use client";

import { useEffect, useRef } from "react";
import { useVoiceNarration } from "@/hooks/use-voice-narration";
import type { Section } from "@/lib/camera-path";

interface VoiceNarrationProps {
  currentSection: Section;
  enabled: boolean;
}

export function VoiceNarration({ currentSection, enabled }: VoiceNarrationProps) {
  const { speak, stop, isSupported } = useVoiceNarration();
  const lastSectionRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !isSupported) {
      stop();
      return;
    }

    // Only speak when section changes
    if (lastSectionRef.current !== currentSection.id) {
      lastSectionRef.current = currentSection.id;
      
      // Small delay to let the camera settle
      const timeout = setTimeout(() => {
        speak(currentSection.narration);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentSection.id, currentSection.narration, enabled, isSupported, speak, stop]);

  // Stop speech when disabled
  useEffect(() => {
    if (!enabled) {
      stop();
    }
  }, [enabled, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return null;
}
