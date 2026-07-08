import { BASE_POINTS, MIN_POINTS, TIME_PENALTY_PER_SEC } from "./constants";

export function calculatePoints(
  isCorrect: boolean,
  elapsedMs: number,
): number {
  if (!isCorrect) {
    return 0;
  }

  const elapsedSec = elapsedMs / 1000;
  const points = Math.round(BASE_POINTS - elapsedSec * TIME_PENALTY_PER_SEC);
  return Math.max(MIN_POINTS, points);
}
