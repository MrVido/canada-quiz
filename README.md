# The Great Canadian Chaos Quiz 🇨🇦

A fun, mobile-first multiplayer Canada quiz party game. One room, one code, maximum chaos.

**Room code:** `1234567`

## Stack

- Next.js (App Router)
- Tailwind CSS
- Neon PostgreSQL (via Vercel/Neon integration)
- API polling for multiplayer sync (simple & reliable)

## Quick start

### 1. Database setup

1. Create a [Neon](https://neon.tech) project (or use Vercel Postgres / Neon integration)
2. Copy your `DATABASE_URL` connection string
3. Run the migration:

```bash
cp .env.example .env.local
# Add DATABASE_URL to .env.local
node --env-file=.env.local scripts/migrate.mjs
```

### 2. Media assets

Assets live in `/public` (copied from `/data`):

| File | Purpose |
|------|---------|
| `video.mp4` | End-screen celebration video (loops fullscreen) |
| `ohcanada.mp3` | National anthem (plays once, full song) |
| `canada-puzzle-bg.jpg` | Puzzle reveal background (citizenship photo) |

### 3. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), enter room code `1234567`, pick a nickname, and play.

## Deploy to Vercel

```bash
npx vercel --prod
```

Add environment variable in Vercel dashboard:

- `DATABASE_URL` — your Neon connection string

## How it works

1. **Landing** — Enter room code `1234567`
2. **Lobby** — Pick a nickname; first player is host; host starts the game
3. **Quiz** — 20 multiple-choice questions, synced via API polling
4. **Puzzle background** — Citizenship photo revealed piece-by-piece (5×4 grid, one piece per question)
5. **End screen** — Leaderboard → full photo reveal → looping video + O Canada (with fallback button)

## Reset between events

```sql
UPDATE rooms SET status = 'lobby', current_question = 0, question_started_at = NULL WHERE code = '1234567';
DELETE FROM players WHERE room_code = '1234567';
```

## Delete after the event

```bash
rm -rf canada-quiz
# Delete Vercel project + Neon database from their dashboards
```
