import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ROOM_CODE } from "@/lib/constants";
import type { Player, Room } from "@/lib/types";

export async function GET() {
  try {
    const sql = getDb();

    const rooms = (await sql`
      SELECT * FROM rooms WHERE code = ${ROOM_CODE}
    `) as Room[];
    const room = rooms[0] ?? null;

    if (!room) {
      await sql`
        INSERT INTO rooms (code, status, current_question)
        VALUES (${ROOM_CODE}, 'lobby', 0)
        ON CONFLICT (code) DO NOTHING
      `;
      const created = (await sql`
        SELECT * FROM rooms WHERE code = ${ROOM_CODE}
      `) as Room[];
      const players = (await sql`
        SELECT * FROM players WHERE room_code = ${ROOM_CODE} ORDER BY joined_at ASC
      `) as Player[];
      return NextResponse.json({ room: created[0], players });
    }

    const players = (await sql`
      SELECT * FROM players WHERE room_code = ${ROOM_CODE} ORDER BY joined_at ASC
    `) as Player[];

    return NextResponse.json({ room, players });
  } catch (error) {
    console.error("GET /api/game", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 },
    );
  }
}
