"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { isAudioUnlocked } from "@/lib/session";

type EndScreenProps = {
  onUnlockAudio: () => void;
};

type Phase = "leaderboard" | "reveal" | "celebration";

export function EndScreen({ onUnlockAudio }: EndScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [phase, setPhase] = useState<Phase>("leaderboard");
  const [audioPlayFailed, setAudioPlayFailed] = useState(false);

  useEffect(() => {
    const leaderboardTimer = setTimeout(() => setPhase("reveal"), 8000);
    return () => clearTimeout(leaderboardTimer);
  }, []);

  useEffect(() => {
    if (phase !== "reveal") {
      return;
    }

    const revealTimer = setTimeout(() => setPhase("celebration"), 3000);
    return () => clearTimeout(revealTimer);
  }, [phase]);

  const startCelebration = useCallback(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => setAudioPlayFailed(true));
    }
  }, []);

  useEffect(() => {
    if (phase !== "celebration") {
      return;
    }

    if (isAudioUnlocked()) {
      startCelebration();
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, [phase, startCelebration]);

  const playAnthem = () => {
    onUnlockAudio();
    setAudioPlayFailed(false);
    startCelebration();
  };

  const showAnthemButton =
    phase === "celebration" && (!isAudioUnlocked() || audioPlayFailed);

  if (phase === "leaderboard") {
    return null;
  }

  if (phase === "reveal") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <Image
          src="/canada-puzzle-bg.jpg"
          alt="Citizenship celebration"
          fill
          priority
          className="object-cover opacity-0 animate-[fadeIn_1s_ease-in_forwards]"
        />
        <p className="absolute bottom-10 text-center text-lg font-bold text-white drop-shadow-lg">
          🇨🇦 Congratulations, eh! 🇨🇦
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <audio ref={audioRef} src="/ohcanada.mp3" preload="auto" />

      {showAnthemButton && (
        <button
          type="button"
          onClick={playAnthem}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-red-700 active:scale-95"
        >
          Play the anthem 🇨🇦
        </button>
      )}
    </div>
  );
}
