import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ROOM_CODE } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
    }

    const sql = getDb();

    const host = (await sql`
      SELECT is_host FROM players
      WHERE room_code = ${ROOM_CODE} AND client_id = ${clientId}
    `) as { is_host: boolean }[];

    if (!host[0]?.is_host) {
      return NextResponse.json({ error: "Only the host can start" }, { status: 403 });
    }

    await sql`
      UPDATE rooms SET
        status = 'playing',
        current_question = 0,
        question_started_at = now(),
        updated_at = now()
      WHERE code = ${ROOM_CODE}
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/game/start", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 },
    );
  }
}
