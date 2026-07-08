import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { calculatePoints } from "@/lib/scoring";
import { ROOM_CODE } from "@/lib/constants";
import type { Player } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { clientId, questionIndex, choiceIndex, questionStartedAt, correctIndex } =
      await request.json();

    if (!clientId || questionIndex === undefined || choiceIndex === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const sql = getDb();

    const rows = (await sql`
      SELECT * FROM players
      WHERE room_code = ${ROOM_CODE} AND client_id = ${clientId}
    `) as Player[];
    const player = rows[0];

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    if (player.answered_question >= questionIndex) {
      return NextResponse.json({ ok: true, alreadyAnswered: true });
    }

    const isCorrect = choiceIndex === correctIndex;
    const elapsedMs = Date.now() - new Date(questionStartedAt).getTime();
    const points = calculatePoints(isCorrect, elapsedMs);

    await sql`
      UPDATE players SET
        score = ${player.score + points},
        answered_question = ${questionIndex},
        selected_choice = ${choiceIndex}
      WHERE id = ${player.id}
    `;

    return NextResponse.json({ ok: true, points });
  } catch (error) {
    console.error("POST /api/game/answer", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 },
    );
  }
}
