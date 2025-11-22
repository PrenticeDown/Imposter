import { useState } from "react";
import { SetupScreen } from "@/components/setup-screen";
import { NameEntryScreen } from "@/components/name-entry-screen";
import { RoleRevealScreen } from "@/components/role-reveal-screen";
import { type GameConfig, type GameState, WORD_LIST, type Player } from "@shared/schema";

type GamePhase = "setup" | "names" | "reveal";

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleSetupComplete = (config: GameConfig) => {
    setGameConfig(config);
    setPhase("names");
  };

  const handleNamesComplete = (playerNames: string[]) => {
    if (!gameConfig) return;

    const crewWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    
    let imposterWord: string | null = null;
    if (gameConfig.useHintWord) {
      const availableWords = WORD_LIST.filter(w => w !== crewWord);
      imposterWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    }

    const shuffledIndices = Array.from({ length: playerNames.length }, (_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    const imposterIndices = shuffledIndices.slice(0, gameConfig.imposterCount);

    const players: Player[] = playerNames.map((name, index) => ({
      name,
      role: imposterIndices.includes(index) ? "imposter" : "crewmate",
      word: imposterIndices.includes(index) 
        ? imposterWord 
        : crewWord
    }));

    setGameState({
      config: gameConfig,
      players,
      crewWord,
      imposterWord
    });
    setPhase("reveal");
  };

  const handleNewGame = () => {
    setPhase("setup");
    setGameConfig(null);
    setGameState(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {phase === "setup" && (
          <SetupScreen onComplete={handleSetupComplete} />
        )}
        {phase === "names" && gameConfig && (
          <NameEntryScreen 
            playerCount={gameConfig.playerCount} 
            onComplete={handleNamesComplete}
            onBack={() => setPhase("setup")}
          />
        )}
        {phase === "reveal" && gameState && (
          <RoleRevealScreen 
            gameState={gameState}
            onNewGame={handleNewGame}
          />
        )}
      </div>
    </div>
  );
}
