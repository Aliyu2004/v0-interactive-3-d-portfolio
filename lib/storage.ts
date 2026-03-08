export interface PortfolioState {
  currentSection: string;
  cameraProgress: number;
  voiceEnabled: boolean;
  visitCount: number;
  lastVisit: string;
  hasSeenWelcome: boolean;
}

const STORAGE_KEY = "aliyu-portfolio-state";

const defaultState: PortfolioState = {
  currentSection: "welcome",
  cameraProgress: 0,
  voiceEnabled: false,
  visitCount: 0,
  lastVisit: new Date().toISOString(),
  hasSeenWelcome: false,
};

export function getStoredState(): PortfolioState {
  if (typeof window === "undefined") return defaultState;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    
    const parsed = JSON.parse(stored) as PortfolioState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

export function saveState(state: Partial<PortfolioState>): void {
  if (typeof window === "undefined") return;
  
  try {
    const currentState = getStoredState();
    const newState: PortfolioState = {
      ...currentState,
      ...state,
      lastVisit: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  } catch {
    // localStorage might be unavailable
  }
}

export function incrementVisitCount(): number {
  const state = getStoredState();
  const newCount = state.visitCount + 1;
  saveState({ visitCount: newCount });
  return newCount;
}

export function isReturningVisitor(): boolean {
  const state = getStoredState();
  return state.visitCount > 0;
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage might be unavailable
  }
}

// Haptic feedback helper
export function vibrate(duration: number = 50): void {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(duration);
  }
}
