import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ROOM_CODE, TOTAL_QUESTIONS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { clientId, currentQuestion } = await request.json();

    if (!clientId || currentQuestion === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const sql = getDb();

    const host = (await sql`
      SELECT is_host FROM players
      WHERE room_code = ${ROOM_CODE} AND client_id = ${clientId}
    `) as { is_host: boolean }[];

    if (!host[0]?.is_host) {
      return NextResponse.json({ error: "Only the host can advance" }, { status: 403 });
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion >= TOTAL_QUESTIONS) {
      await sql`
        UPDATE rooms SET
          status = 'finished',
          current_question = ${nextQuestion},
          updated_at = now()
        WHERE code = ${ROOM_CODE}
      `;
    } else {
      await sql`
        UPDATE rooms SET
          current_question = ${nextQuestion},
          question_started_at = now(),
          updated_at = now()
        WHERE code = ${ROOM_CODE}
      `;
    }

    return NextResponse.json({ ok: true, nextQuestion });
  } catch (error) {
    console.error("POST /api/game/advance", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 },
    );
  }
}
