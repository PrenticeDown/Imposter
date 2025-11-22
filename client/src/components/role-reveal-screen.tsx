import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RoleModal } from "@/components/role-modal";
import { type GameState, type Player } from "@shared/schema";
import { RefreshCw } from "lucide-react";

interface RoleRevealScreenProps {
  gameState: GameState;
  onNewGame: () => void;
}

export function RoleRevealScreen({ gameState, onNewGame }: RoleRevealScreenProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <>
      <Card className="border-card-border">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold text-center">Players</CardTitle>
          <CardDescription className="text-center text-base">
            Tap your name to see your role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {gameState.players.map((player, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-14 text-lg font-medium justify-start px-6 hover-elevate active-elevate-2"
                onClick={() => handlePlayerClick(player)}
                data-testid={`button-player-${index}`}
              >
                {player.name}
              </Button>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full h-12 text-base font-medium gap-2 mt-6"
            onClick={onNewGame}
            data-testid="button-new-game"
          >
            <RefreshCw className="w-5 h-5" />
            New Game
          </Button>
        </CardContent>
      </Card>

      {selectedPlayer && (
        <RoleModal 
          player={selectedPlayer} 
          useHintWord={gameState.config.useHintWord}
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
}
