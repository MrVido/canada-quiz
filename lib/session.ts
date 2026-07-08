const CLIENT_ID_KEY = "canada-quiz-client-id";
const AUDIO_UNLOCKED_KEY = "canada-quiz-audio-unlocked";

function randomId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getClientId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = randomId();
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

export function setAudioUnlocked(): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(AUDIO_UNLOCKED_KEY, "1");
  }
}

export function isAudioUnlocked(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem(AUDIO_UNLOCKED_KEY) === "1";
}
