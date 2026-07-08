"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PuzzleBackground } from "@/components/PuzzleBackground";
import { useAudioUnlock } from "@/hooks/useAudioUnlock";
import { ROOM_CODE, WRONG_CODE_MESSAGES } from "@/lib/constants";

export default function LandingPage() {
  const router = useRouter();
  const unlockAudio = useAudioUnlock();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    unlockAudio();

    if (code.trim() !== ROOM_CODE) {
      const msg =
        WRONG_CODE_MESSAGES[
          Math.floor(Math.random() * WRONG_CODE_MESSAGES.length)
        ];
      setError(msg);
      return;
    }

    sessionStorage.setItem("roomCode", ROOM_CODE);
    router.push("/lobby");
  };

  return (
    <>
      <PuzzleBackground revealedPieces={0} />
      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-xl backdrop-blur">
          <div className="mb-6 text-center">
            <span className="text-5xl">🍁</span>
            <h1 className="mt-2 text-2xl font-extrabold text-red-700 sm:text-3xl">
              The Great Canadian Chaos Quiz
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter the secret room code to join the party, eh?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="room-code" className="sr-only">
                Room code
              </label>
              <input
                id="room-code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={7}
                placeholder="Room code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-widest text-gray-900 outline-none transition focus:border-red-500"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-4 text-lg font-bold text-white transition hover:bg-red-700 active:scale-[0.98]"
            >
              Enter the Room 🇨🇦
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
