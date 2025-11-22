import { useState } from "react";
import { PlayerSetupScreen } from "@/components/player-setup-screen";
import { ThemeConfigScreen } from "@/components/theme-config-screen";
import { RoleRevealScreen } from "@/components/role-reveal-screen";
import { type GameConfig, type GameState, THEMES, type ThemeId, type Player } from "@shared/schema";

type GamePhase = "players" | "config" | "reveal";

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>("players");
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handlePlayersComplete = (names: string[]) => {
    setPlayerNames(names);
    setPhase("config");
  };

  const handleConfigComplete = (theme: ThemeId, imposterCount: number, useHintWord: boolean) => {
    const config: GameConfig = {
      playerCount: playerNames.length,
      theme,
      imposterCount,
      useHintWord
    };

    const themeWords = THEMES[theme].words;
    const randomWordPair = themeWords[Math.floor(Math.random() * themeWords.length)];
    const crewWord = randomWordPair.main;
    const imposterWord = useHintWord ? randomWordPair.hint : null;

    const shuffledIndices = Array.from({ length: playerNames.length }, (_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    const imposterIndices = shuffledIndices.slice(0, imposterCount);

    const players: Player[] = playerNames.map((name, index) => ({
      name,
      role: imposterIndices.includes(index) ? "imposter" : "crewmate",
      word: imposterIndices.includes(index) ? imposterWord : crewWord
    }));

    setGameConfig(config);
    setGameState({
      config,
      players,
      crewWord,
      imposterWord
    });
    setPhase("reveal");
  };

  const handlePlayAgain = () => {
    setPhase("config");
    setGameState(null);
  };

  const handleBackToPlayers = () => {
    setPhase("players");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {phase === "players" && (
          <PlayerSetupScreen 
            initialNames={playerNames}
            onComplete={handlePlayersComplete} 
          />
        )}
        {phase === "config" && (
          <ThemeConfigScreen 
            playerCount={playerNames.length}
            onComplete={handleConfigComplete}
            onBack={handleBackToPlayers}
          />
        )}
        {phase === "reveal" && gameState && (
          <RoleRevealScreen 
            gameState={gameState}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
}
