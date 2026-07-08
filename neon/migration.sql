-- Neon PostgreSQL schema for The Great Canadian Chaos Quiz

CREATE TABLE IF NOT EXISTS rooms (
  code TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'lobby' CHECK (status IN ('lobby', 'playing', 'finished')),
  current_question INT NOT NULL DEFAULT 0,
  question_started_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT NOT NULL REFERENCES rooms(code) ON DELETE CASCADE,
  client_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  is_host BOOLEAN NOT NULL DEFAULT false,
  answered_question INT NOT NULL DEFAULT -1,
  selected_choice INT,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (room_code, client_id)
);

INSERT INTO rooms (code, status, current_question)
VALUES ('1234567', 'lobby', 0)
ON CONFLICT (code) DO NOTHING;
