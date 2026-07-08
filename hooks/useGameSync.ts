"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchGameState } from "@/lib/game-api";
import type { Player, Room } from "@/lib/types";

const POLL_MS = 1500;

export function useGameSync() {
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const { room: roomData, players: playerData } = await fetchGameState();
    setRoom(roomData);
    setPlayers(playerData);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        await refresh();
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e.message : "Failed to connect");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    init();
    const interval = setInterval(() => {
      refresh().catch(() => {});
    }, POLL_MS);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refresh]);

  return { room, players, loading, error, refresh };
}
