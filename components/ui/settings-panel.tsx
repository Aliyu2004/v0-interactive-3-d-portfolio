"use client";

import { useState } from "react";
import { Settings, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { clearState, vibrate } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  voiceEnabled: boolean;
  onVoiceToggle: (enabled: boolean) => void;
}

export function SettingsPanel({ voiceEnabled, onVoiceToggle }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    vibrate(50);
    clearState();
    window.location.reload();
  };

  return (
    <>
      {/* Toggle button */}
      <Button
        onClick={() => {
          vibrate(20);
          setIsOpen(!isOpen);
        }}
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 right-4 md:top-8 md:right-8 z-50 h-10 w-10 rounded-full",
          "bg-background/50 backdrop-blur-sm border border-border/50",
          "hover:bg-background/80 hover:border-cyan-500/30"
        )}
      >
        <Settings className={cn("h-5 w-5 text-muted-foreground transition-transform", isOpen && "rotate-90")} />
      </Button>

      {/* Settings panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed top-16 right-4 md:top-20 md:right-8 z-50 w-64",
            "rounded-xl overflow-hidden",
            "bg-background/95 backdrop-blur-md border border-cyan-500/20",
            "shadow-lg",
            "animate-in slide-in-from-top-2 fade-in duration-200"
          )}
        >
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Settings</h3>

            {/* Voice toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {voiceEnabled ? (
                  <Volume2 className="h-4 w-4 text-cyan-400" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
                <Label htmlFor="voice" className="text-sm text-muted-foreground">
                  Voice Narration
                </Label>
              </div>
              <Switch
                id="voice"
                checked={voiceEnabled}
                onCheckedChange={(checked) => {
                  vibrate(20);
                  onVoiceToggle(checked);
                }}
              />
            </div>

            {/* Reset progress */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Progress
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
