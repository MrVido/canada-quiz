"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Leaderboard } from "@/components/Leaderboard";
import { isAudioUnlocked } from "@/lib/session";
import type { Player } from "@/lib/types";

type EndScreenProps = {
  onUnlockAudio: () => void;
  players: Player[];
  highlightClientId: string;
  isHost: boolean;
  onPlayAgain: () => void;
  resetting: boolean;
};

const LEADERBOARD_OVERLAY_MS = 3500;

export function EndScreen({
  onUnlockAudio,
  players,
  highlightClientId,
  isHost,
  onPlayAgain,
  resetting,
}: EndScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlayFailed, setAudioPlayFailed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const needsAnthemButton = !isAudioUnlocked() || audioPlayFailed;

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
    if (isAudioUnlocked()) {
      startCelebration();
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, [startCelebration]);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), LEADERBOARD_OVERLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const playAnthem = () => {
    onUnlockAudio();
    setAudioPlayFailed(false);
    startCelebration();
  };

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

      {showOverlay && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 p-6 transition-opacity duration-500">
          <Leaderboard players={players} highlightClientId={highlightClientId} />
          {isHost && (
            <button
              type="button"
              onClick={onPlayAgain}
              disabled={resetting}
              className="w-full max-w-md rounded-xl bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-red-700 disabled:opacity-50"
            >
              {resetting ? "Resetting..." : "Play Again! 🇨🇦"}
            </button>
          )}
          {!isHost && (
            <p className="text-center text-sm text-white drop-shadow">
              Waiting for the host to start a new round...
            </p>
          )}
        </div>
      )}

      {!showOverlay && isHost && (
        <button
          type="button"
          onClick={onPlayAgain}
          disabled={resetting}
          className="absolute top-4 right-4 z-10 rounded-full bg-red-600/90 px-5 py-2 text-sm font-bold text-white shadow-lg backdrop-blur transition hover:bg-red-700 disabled:opacity-50"
        >
          {resetting ? "Resetting..." : "Play Again 🇨🇦"}
        </button>
      )}

      {needsAnthemButton && (
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
