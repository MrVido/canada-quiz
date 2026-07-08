import { ROOM_CODE } from "./constants";
import type { Player, Room } from "./types";

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Request failed");
  }
  return data as T;
}

export async function fetchGameState(): Promise<{
  room: Room | null;
  players: Player[];
}> {
  return api("/api/game");
}

export async function joinRoom(
  clientId: string,
  nickname: string,
): Promise<Player> {
  const { player } = await api<{ player: Player }>("/api/game/join", {
    method: "POST",
    body: JSON.stringify({ clientId, nickname }),
  });
  return player;
}

export async function startGame(clientId: string): Promise<void> {
  await api("/api/game/start", {
    method: "POST",
    body: JSON.stringify({ clientId }),
  });
}

export async function submitAnswer(
  clientId: string,
  questionIndex: number,
  choiceIndex: number,
  questionStartedAt: string,
  correctIndex: number,
): Promise<void> {
  await api("/api/game/answer", {
    method: "POST",
    body: JSON.stringify({
      clientId,
      questionIndex,
      choiceIndex,
      questionStartedAt,
      correctIndex,
    }),
  });
}

export async function advanceQuestion(
  clientId: string,
  currentQuestion: number,
): Promise<void> {
  await api("/api/game/advance", {
    method: "POST",
    body: JSON.stringify({ clientId, currentQuestion }),
  });
}

export function allPlayersAnswered(
  players: Player[],
  questionIndex: number,
): boolean {
  if (players.length === 0) {
    return false;
  }
  return players.every((p) => p.answered_question >= questionIndex);
}
