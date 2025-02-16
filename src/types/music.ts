
export type MusicalKey = 
  | "1A" | "2A" | "3A" | "4A" | "5A" | "6A" | "7A" | "8A" | "9A" | "10A" | "11A" | "12A"
  | "1B" | "2B" | "3B" | "4B" | "5B" | "6B" | "7B" | "8B" | "9B" | "10B" | "11B" | "12B";

export type Track = {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: MusicalKey;
  duration: string;
  energy: number; // 1-10
  albumArt: string;
};

export type SetTrack = Track & {
  position: number;
};
