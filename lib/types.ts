export type RoomStatus = "lobby" | "playing" | "finished";

export type Room = {
  code: string;
  status: RoomStatus;
  current_question: number;
  question_started_at: string | null;
  updated_at: string;
};

export type Player = {
  id: string;
  room_code: string;
  client_id: string;
  nickname: string;
  score: number;
  is_host: boolean;
  answered_question: number;
  selected_choice: number | null;
  joined_at: string;
};
