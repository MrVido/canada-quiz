"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { EndScreen } from "@/components/EndScreen";
import { PuzzleBackground } from "@/components/PuzzleBackground";
import { useAudioUnlock } from "@/hooks/useAudioUnlock";
import { useGameSync } from "@/hooks/useGameSync";
import {
  advanceQuestion,
  allPlayersAnswered,
  resetGame,
  submitAnswer,
} from "@/lib/game-api";
import { QUESTION_TIME_MS, ROOM_CODE, TOTAL_QUESTIONS } from "@/lib/constants";
import { questions } from "@/lib/questions";
import { getClientId } from "@/lib/session";
import type { Player } from "@/lib/types";

export default function GamePage() {
  const router = useRouter();
  const unlockAudio = useAudioUnlock();
  const { room, players, loading, error } = useGameSync();
  const clientId = getClientId();
  const me = players.find((p) => p.client_id === clientId);

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_MS);
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const advancingRef = useRef(false);
  const lastQuestionRef = useRef(-1);

  useEffect(() => {
    const stored = sessionStorage.getItem("roomCode");
    if (stored !== ROOM_CODE) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    if (!room) {
      return;
    }
    if (room.status === "lobby") {
      router.replace("/lobby");
    }
  }, [room, router]);

  const questionIndex = room?.current_question ?? 0;
  const question = questions[questionIndex];
  const isFinished = room?.status === "finished";
  const hasAnswered =
    me !== undefined && me.answered_question >= questionIndex;
  const answeredCount = players.filter(
    (p) => p.answered_question >= questionIndex,
  ).length;

  useEffect(() => {
    if (questionIndex !== lastQuestionRef.current) {
      lastQuestionRef.current = questionIndex;
      setSelectedChoice(null);
      setShowFeedback(false);
      setTimeLeft(QUESTION_TIME_MS);
      advancingRef.current = false;
    }
  }, [questionIndex]);

  const tryAdvance = useCallback(async () => {
    if (!room || advancingRef.current || room.status !== "playing") {
      return;
    }
    if (!allPlayersAnswered(players, questionIndex)) {
      return;
    }
    if (!me?.is_host) {
      return;
    }

    advancingRef.current = true;
    try {
      await advanceQuestion(clientId, questionIndex);
    } finally {
      advancingRef.current = false;
    }
  }, [room, players, questionIndex, me?.is_host, clientId]);

  const handleTimeout = useCallback(async () => {
    if (!me || !room || !question || hasAnswered || submitting) {
      return;
    }

    setSubmitting(true);
    setSelectedChoice(-1);
    setFeedbackCorrect(false);
    setShowFeedback(true);

    try {
      const startedAt =
        room.question_started_at ?? new Date().toISOString();
      await submitAnswer(
        clientId,
        questionIndex,
        -1,
        startedAt,
        question.answerIndex,
      );
    } finally {
      setSubmitting(false);
    }
  }, [
    me,
    room,
    question,
    hasAnswered,
    submitting,
    clientId,
    questionIndex,
  ]);

  useEffect(() => {
    if (
      !room ||
      room.status !== "playing" ||
      !question ||
      hasAnswered ||
      showFeedback
    ) {
      return;
    }

    const startedAt = room.question_started_at
      ? new Date(room.question_started_at).getTime()
      : Date.now();

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, QUESTION_TIME_MS - elapsed);
      setTimeLeft(remaining);
    };

    tick();
    const interval = setInterval(tick, 200);

    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, QUESTION_TIME_MS - elapsed);
    const timeoutId = setTimeout(() => {
      void handleTimeout();
    }, remaining);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [room, question, hasAnswered, showFeedback, handleTimeout, questionIndex]);

  useEffect(() => {
    if (!showFeedback || !hasAnswered) {
      return;
    }

    const timer = setTimeout(() => {
      void tryAdvance();
    }, 2500);

    return () => clearTimeout(timer);
  }, [showFeedback, hasAnswered, tryAdvance]);

  async function handleAnswer(choiceIndex: number) {
    if (
      !me ||
      !room ||
      !question ||
      hasAnswered ||
      submitting ||
      showFeedback
    ) {
      return;
    }

    unlockAudio();
    setSubmitting(true);
    setSelectedChoice(choiceIndex);

    const isCorrect = choiceIndex === question.answerIndex;
    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);

    try {
      const startedAt =
        room.question_started_at ?? new Date().toISOString();
      await submitAnswer(
        clientId,
        questionIndex,
        choiceIndex,
        startedAt,
        question.answerIndex,
      );
    } finally {
      setSubmitting(false);
    }
  }

  const handlePlayAgain = async () => {
    if (!me?.is_host) {
      return;
    }
    unlockAudio();
    setResetting(true);
    try {
      await resetGame(clientId);
      router.replace("/lobby");
    } finally {
      setResetting(false);
    }
  };

  if (loading || !room) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-white">Loading quiz...</p>
      </main>
    );
  }

  const revealedPieces = isFinished
    ? TOTAL_QUESTIONS
    : Math.max(0, questionIndex);

  return (
    <>
      <PuzzleBackground revealedPieces={revealedPieces} />

      {isFinished ? (
        <EndScreen
          onUnlockAudio={unlockAudio}
          players={players}
          highlightClientId={clientId}
          isHost={me?.is_host ?? false}
          onPlayAgain={handlePlayAgain}
          resetting={resetting}
        />
      ) : (
        <main className="flex min-h-screen flex-col p-4 pt-6 sm:p-6">
          <div className="mx-auto w-full max-w-lg flex-1">
            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mb-4 flex items-center justify-between text-sm text-white drop-shadow">
              <span>
                Question {questionIndex + 1}/{TOTAL_QUESTIONS}
              </span>
              <span>
                {answeredCount}/{players.length} answered
              </span>
            </div>

            <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-red-500 transition-all duration-200"
                style={{
                  width: `${(timeLeft / QUESTION_TIME_MS) * 100}%`,
                }}
              />
            </div>

            {question && (
              <div className="rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur">
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {question.question}
                </h2>

                <div className="mt-6 space-y-3">
                  {question.choices.map((choice, idx) => {
                    const isSelected = selectedChoice === idx;
                    const isCorrectChoice = idx === question.answerIndex;
                    let style =
                      "border-2 border-gray-200 bg-white hover:border-red-400";

                    if (showFeedback) {
                      if (isCorrectChoice) {
                        style = "border-2 border-green-500 bg-green-50";
                      } else if (isSelected && !isCorrectChoice) {
                        style = "border-2 border-red-500 bg-red-50";
                      } else {
                        style = "border-2 border-gray-100 bg-gray-50 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={hasAnswered || submitting || showFeedback}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full rounded-xl px-4 py-4 text-left font-medium text-gray-900 transition active:scale-[0.98] disabled:cursor-not-allowed ${style}`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div
                    className={`mt-6 rounded-xl p-4 ${
                      feedbackCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <p className="font-bold">
                      {feedbackCorrect ? "Correct! 🎉" : "Nice try, eh! 😅"}
                    </p>
                    <p className="mt-1 text-sm">{question.explanation}</p>
                    {!feedbackCorrect && (
                      <p className="mt-2 text-sm">
                        Correct answer:{" "}
                        <strong>{question.choices[question.answerIndex]}</strong>
                      </p>
                    )}
                  </div>
                )}

                {hasAnswered && !showFeedback && (
                  <p className="mt-4 text-center text-gray-500">
                    Answer submitted. Waiting for feedback...
                  </p>
                )}

                {showFeedback && me?.is_host && (
                  <button
                    type="button"
                    onClick={tryAdvance}
                    disabled={!allPlayersAnswered(players, questionIndex)}
                    className="mt-6 w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                  >
                    {allPlayersAnswered(players, questionIndex)
                      ? questionIndex + 1 >= TOTAL_QUESTIONS
                        ? "Finish Quiz 🏁"
                        : "Next Question →"
                      : `Waiting for players (${answeredCount}/${players.length})`}
                  </button>
                )}

                {showFeedback && !me?.is_host && (
                  <p className="mt-6 text-center text-sm text-gray-500">
                    {allPlayersAnswered(players, questionIndex)
                      ? "Next question coming up..."
                      : `Waiting for others (${answeredCount}/${players.length})`}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-white/80 p-4 backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
                Live scores
              </p>
              <MiniScores players={players} clientId={clientId} />
            </div>
          </div>
        </main>
      )}
    </>
  );
}

function MiniScores({
  players,
  clientId,
}: {
  players: Player[];
  clientId: string;
}) {
  const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map((p) => (
        <span
          key={p.id}
          className={`rounded-full px-3 py-1 text-sm ${
            p.client_id === clientId
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {p.nickname}: {p.score}
        </span>
      ))}
    </div>
  );
}
