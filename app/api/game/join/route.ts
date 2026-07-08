import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ROOM_CODE } from "@/lib/constants";
import type { Player } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { clientId, nickname } = await request.json();

    if (!clientId || !nickname?.trim()) {
      return NextResponse.json({ error: "Missing clientId or nickname" }, { status: 400 });
    }

    const trimmed = nickname.trim();
    if (trimmed.length < 2 || trimmed.length > 20) {
      return NextResponse.json({ error: "Invalid nickname" }, { status: 400 });
    }

    const sql = getDb();

    await sql`
      INSERT INTO rooms (code, status, current_question)
      VALUES (${ROOM_CODE}, 'lobby', 0)
      ON CONFLICT (code) DO NOTHING
    `;

    const existing = (await sql`
      SELECT * FROM players
      WHERE room_code = ${ROOM_CODE} AND client_id = ${clientId}
    `) as Player[];

    if (existing[0]) {
      const updated = (await sql`
        UPDATE players SET nickname = ${trimmed}
        WHERE id = ${existing[0].id}
        RETURNING *
      `) as Player[];
      return NextResponse.json({ player: updated[0] });
    }

    const count = (await sql`
      SELECT COUNT(*)::text AS count FROM players WHERE room_code = ${ROOM_CODE}
    `) as { count: string }[];
    const isHost = Number(count[0]?.count ?? 0) === 0;

    const inserted = (await sql`
      INSERT INTO players (room_code, client_id, nickname, score, is_host, answered_question, selected_choice)
      VALUES (${ROOM_CODE}, ${clientId}, ${trimmed}, 0, ${isHost}, -1, NULL)
      RETURNING *
    `) as Player[];

    return NextResponse.json({ player: inserted[0] });
  } catch (error) {
    console.error("POST /api/game/join", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 },
    );
  }
}
