import { z } from "zod";

export const THEMES = {
  party: {
    name: "Party",
    words: [
      "Birthday", "Wedding", "Celebration", "Dance", "Music",
      "Karaoke", "DJ", "Balloons", "Confetti", "Champagne",
      "Cheers", "Toast", "Cocktail", "Buffet", "Cake",
      "Decorations", "Invitations", "Games", "Photo Booth", "Fireworks",
      "Streamers", "DJ Booth", "Dance Floor", "Bar", "Venue",
      "Host", "Guest", "RSVP", "Gift", "Celebration",
      "Festival", "Carnival", "Parade", "Concert", "Nightclub",
      "Rave", "House Party", "BBQ", "Picnic", "Beach Party"
    ]
  },
  celebrities: {
    name: "Celebrities",
    words: [
      "Actor", "Singer", "Musician", "Director", "Producer",
      "Influencer", "YouTuber", "Streamer", "Model", "Athlete",
      "Author", "Comedian", "Chef", "Designer", "Dancer",
      "Rapper", "Songwriter", "Photographer", "Artist", "Painter",
      "Sculptor", "Politician", "Entrepreneur", "Scientist", "Inventor",
      "Astronaut", "Activist", "Philanthropist", "Nobel Prize", "Oscar",
      "Grammy", "Emmy", "Tony Award", "Golden Globe", "Paparazzi",
      "Red Carpet", "Premiere", "Fan Club", "Autograph", "Selfie"
    ]
  },
  r18: {
    name: "R18",
    words: [
      "Martini", "Whiskey", "Vodka", "Tequila", "Rum",
      "Casino", "Poker", "Blackjack", "Roulette", "Slots",
      "Nightlife", "Club", "Bar", "Lounge", "Speakeasy",
      "Adult Film", "Burlesque", "Cabaret", "Strip Club", "Lingerie",
      "Romance", "Passion", "Desire", "Seduction", "Flirtation",
      "Date Night", "Honeymoon", "Bachelorette", "Bachelor", "Vegas",
      "Sin City", "Wild Night", "After Hours", "VIP", "Bottle Service",
      "Hookup", "Fling", "Affairs", "Scandal", "Secrets",
      "Temptation", "Forbidden", "Risque", "Provocative", "Sultry"
    ]
  },
  sports: {
    name: "Sports",
    words: [
      "Soccer", "Basketball", "Tennis", "Baseball", "Hockey",
      "Football", "Golf", "Swimming", "Running", "Cycling",
      "Volleyball", "Rugby", "Cricket", "Boxing", "Wrestling",
      "Gymnastics", "Skiing", "Snowboarding", "Surfing", "Skateboarding",
      "Track", "Marathon", "Sprint", "Relay", "Hurdles",
      "Championship", "Tournament", "Playoffs", "Finals", "Trophy",
      "Medal", "Stadium", "Arena", "Court", "Field",
      "Coach", "Team", "Captain", "Referee", "Fans",
      "Training", "Practice", "Workout", "Fitness", "Competition"
    ]
  },
  food: {
    name: "Food",
    words: [
      "Pizza", "Burger", "Sushi", "Pasta", "Tacos",
      "Steak", "Chicken", "Seafood", "Salad", "Soup",
      "Sandwich", "Burrito", "Ramen", "Curry", "Stir Fry",
      "Dessert", "Ice Cream", "Cake", "Cookies", "Chocolate",
      "Breakfast", "Brunch", "Lunch", "Dinner", "Snack",
      "Restaurant", "Chef", "Kitchen", "Recipe", "Cooking",
      "Baking", "Grilling", "Roasting", "Frying", "Boiling",
      "Appetizer", "Entree", "Main Course", "Side Dish", "Beverage",
      "Wine", "Coffee", "Tea", "Juice", "Smoothie"
    ]
  }
} as const;

export type ThemeId = keyof typeof THEMES;

export interface Player {
  name: string;
  role: "crewmate" | "imposter";
  word: string | null;
}

export interface GameConfig {
  playerCount: number;
  theme: ThemeId;
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
  theme: z.enum(["party", "celebrities", "r18", "sports", "food"]),
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
