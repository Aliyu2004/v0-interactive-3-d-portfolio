"use client";

import { useState, useEffect, useCallback } from "react";
import { getStoredState, saveState, incrementVisitCount, isReturningVisitor, type PortfolioState } from "@/lib/storage";
import { getSectionFromProgress, type Section } from "@/lib/camera-path";

interface UseProgressReturn {
  progress: number;
  setProgress: (p: number) => void;
  currentSection: Section;
  isReturning: boolean;
  visitCount: number;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  hasSeenWelcome: boolean;
  markWelcomeSeen: () => void;
}

export function useProgress(): UseProgressReturn {
  const [progress, setProgressState] = useState(0);
  const [voiceEnabled, setVoiceEnabledState] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [visitCount, setVisitCount] = useState(1);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const storedState = getStoredState();
    const returning = isReturningVisitor();
    
    setIsReturning(returning);
    setVoiceEnabledState(storedState.voiceEnabled);
    setHasSeenWelcome(storedState.hasSeenWelcome);
    
    if (returning) {
      // Restore position for returning visitors
      setProgressState(storedState.cameraProgress);
    }
    
    const count = incrementVisitCount();
    setVisitCount(count);
    setIsInitialized(true);
  }, []);

  // Save progress when it changes
  const setProgress = useCallback((p: number) => {
    setProgressState(p);
    if (isInitialized) {
      const section = getSectionFromProgress(p);
      saveState({ cameraProgress: p, currentSection: section.id });
    }
  }, [isInitialized]);

  const setVoiceEnabled = useCallback((enabled: boolean) => {
    setVoiceEnabledState(enabled);
    saveState({ voiceEnabled: enabled });
  }, []);

  const markWelcomeSeen = useCallback(() => {
    setHasSeenWelcome(true);
    saveState({ hasSeenWelcome: true });
  }, []);

  const currentSection = getSectionFromProgress(progress);

  return {
    progress,
    setProgress,
    currentSection,
    isReturning,
    visitCount,
    voiceEnabled,
    setVoiceEnabled,
    hasSeenWelcome,
    markWelcomeSeen,
  };
}
