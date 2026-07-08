"use client";

import { useCallback, useRef } from "react";
import { setAudioUnlocked } from "@/lib/session";

export function useAudioUnlock() {
  const unlockedRef = useRef(false);

  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) {
      return;
    }
    unlockedRef.current = true;
    setAudioUnlocked();

    const silent = new Audio(
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA",
    );
    silent.play().catch(() => {});
  }, []);

  return unlockAudio;
}
