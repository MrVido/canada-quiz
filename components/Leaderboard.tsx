"use client";

import type { Player } from "@/lib/types";

type LeaderboardProps = {
  players: Player[];
  highlightClientId?: string;
  title?: string;
};

export function Leaderboard({
  players,
  highlightClientId,
  title = "Final Leaderboard",
}: LeaderboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur">
      <h2 className="mb-4 text-center text-xl font-bold text-red-700">
        {title}
      </h2>
      <ol className="space-y-2">
        {sorted.map((player, index) => {
          const isMe = player.client_id === highlightClientId;
          return (
            <li
              key={player.id}
              className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                isMe ? "bg-red-100 ring-2 ring-red-500" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-red-600">
                  #{index + 1}
                </span>
                <span className="font-medium text-gray-900">
                  {player.nickname}
                  {player.is_host && (
                    <span className="ml-2 text-xs text-red-500">HOST</span>
                  )}
                  {isMe && (
                    <span className="ml-2 text-xs text-gray-500">(you)</span>
                  )}
                </span>
              </div>
              <span className="font-bold text-red-700">{player.score} pts</span>
            </li>
          );
        })}
      </ol>
      {sorted.length === 0 && (
        <p className="text-center text-gray-500">No players yet.</p>
      )}
    </div>
  );
}
