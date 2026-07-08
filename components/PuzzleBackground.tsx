"use client";

import { TOTAL_QUESTIONS } from "@/lib/constants";

const COLS = 5;
const ROWS = 4;
const IMAGE = "/canada-puzzle-bg.jpg";

type PuzzleBackgroundProps = {
  revealedPieces: number;
};

function PuzzlePiece({
  index,
  revealed,
}: {
  index: number;
  revealed: boolean;
}) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);

  return (
    <div className="relative overflow-hidden border border-white/5">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url('${IMAGE}')`,
          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
          backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(0.85)",
        }}
      />
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background:
            "linear-gradient(135deg, rgba(120, 10, 30, 0.92) 0%, rgba(30, 30, 50, 0.95) 100%)",
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? "none" : "auto",
        }}
      />
    </div>
  );
}

export function PuzzleBackground({ revealedPieces }: PuzzleBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
          <PuzzlePiece key={i} index={i} revealed={revealedPieces > i} />
        ))}
      </div>
    </div>
  );
}
