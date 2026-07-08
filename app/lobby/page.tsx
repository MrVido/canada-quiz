"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PuzzleBackground } from "@/components/PuzzleBackground";
import { useAudioUnlock } from "@/hooks/useAudioUnlock";
import { useGameSync } from "@/hooks/useGameSync";
import { joinRoom, startGame } from "@/lib/game-api";
import { ROOM_CODE } from "@/lib/constants";
import { getClientId } from "@/lib/session";

export default function LobbyPage() {
  const router = useRouter();
  const unlockAudio = useAudioUnlock();
  const { room, players, loading, error } = useGameSync();
  const [nickname, setNickname] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");
  const clientId = getClientId();

  useEffect(() => {
    const stored = sessionStorage.getItem("roomCode");
    if (stored !== ROOM_CODE) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    if (room?.status === "playing") {
      router.push("/game");
    }
    if (room?.status === "finished") {
      router.push("/game");
    }
  }, [room?.status, router]);

  const me = players.find((p) => p.client_id === clientId);
  const isHost = me?.is_host ?? false;
  const joined = Boolean(me);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    unlockAudio();
    setLocalError("");

    const trimmed = nickname.trim();
    if (trimmed.length < 2) {
      setLocalError("Nickname needs at least 2 characters, eh.");
      return;
    }
    if (trimmed.length > 20) {
      setLocalError("Keep it under 20 characters, friend.");
      return;
    }

    setSubmitting(true);
    try {
      await joinRoom(clientId, trimmed);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Failed to join");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStart = async () => {
    unlockAudio();
    setSubmitting(true);
    try {
      await startGame(clientId);
      router.push("/game");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Failed to start");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-white">Loading lobby...</p>
      </main>
    );
  }

  return (
    <>
      <PuzzleBackground revealedPieces={0} />
      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-xl backdrop-blur">
          <h1 className="text-center text-2xl font-extrabold text-red-700">
            The Lobby 🍁
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500">
            Room {ROOM_CODE}
          </p>

          {(error || localError) && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
              {error || localError}
            </p>
          )}

          {!joined ? (
            <form onSubmit={handleJoin} className="mt-6 space-y-4">
              <label htmlFor="nickname" className="block text-sm font-medium">
                Your nickname
              </label>
              <input
                id="nickname"
                type="text"
                maxLength={20}
                placeholder="e.g. MapleLegend"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg text-gray-900 outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-red-600 py-4 text-lg font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? "Joining..." : "Join the Chaos"}
              </button>
            </form>
          ) : (
            <p className="mt-4 text-center text-green-700">
              Welcome, <strong>{me?.nickname}</strong>!
              {isHost && " You're the host."}
            </p>
          )}

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Players ({players.length})
            </h2>
            <ul className="space-y-2">
              {players.map((player) => (
                <li
                  key={player.id}
                  className={`rounded-xl px-4 py-3 ${
                    player.client_id === clientId
                      ? "bg-red-100 ring-2 ring-red-400"
                      : "bg-gray-50"
                  }`}
                >
                  <span className="font-medium">{player.nickname}</span>
                  {player.is_host && (
                    <span className="ml-2 text-xs font-bold text-red-600">
                      HOST
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {players.length === 0 && (
              <p className="text-center text-gray-400">Waiting for players...</p>
            )}
          </div>

          {joined && isHost && players.length > 0 && (
            <button
              type="button"
              onClick={handleStart}
              disabled={submitting || players.length === 0}
              className="mt-8 w-full rounded-xl bg-red-600 py-4 text-lg font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {submitting ? "Starting..." : "Start the Chaos! 🚀"}
            </button>
          )}

          {joined && !isHost && (
            <p className="mt-8 text-center text-sm text-gray-500">
              Waiting for the host to start the quiz...
            </p>
          )}
        </div>
      </main>
    </>
  );
}
