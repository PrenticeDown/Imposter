import { z } from "zod";

export const WORD_LIST = [
  "Beach", "Mountain", "Forest", "Desert", "Ocean",
  "Pizza", "Burger", "Sushi", "Pasta", "Tacos",
  "Guitar", "Piano", "Drums", "Violin", "Trumpet",
  "Soccer", "Basketball", "Tennis", "Baseball", "Hockey",
  "Paris", "Tokyo", "London", "Rome", "Sydney",
  "Doctor", "Teacher", "Engineer", "Artist", "Chef",
  "Dog", "Cat", "Lion", "Eagle", "Dolphin",
  "Winter", "Summer", "Spring", "Autumn", "Rain",
  "Book", "Movie", "Music", "Dance", "Theater",
  "Car", "Train", "Plane", "Boat", "Bicycle"
];

export interface Player {
  name: string;
  role: "crewmate" | "imposter";
  word: string | null;
}

export interface GameConfig {
  playerCount: number;
  imposterCount: number;
  useHintWord: boolean;
}

export interface GameState {
  config: GameConfig;
  players: Player[];
  crewWord: string;
  imposterWord: string | null;
}

export const gameConfigSchema = z.object({
  playerCount: z.number().min(3).max(10),
  imposterCount: z.number().min(1),
  useHintWord: z.boolean(),
}).refine(
  (data) => data.imposterCount < data.playerCount,
  {
    message: "Number of imposters must be less than total players",
    path: ["imposterCount"],
  }
);

export type GameConfigInput = z.infer<typeof gameConfigSchema>;
