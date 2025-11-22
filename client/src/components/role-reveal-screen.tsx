import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RoleModal } from "@/components/role-modal";
import { type GameState, type Player } from "@shared/schema";
import { RefreshCw, CheckCircle } from "lucide-react";

interface RoleRevealScreenProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

export function RoleRevealScreen({ gameState, onPlayAgain }: RoleRevealScreenProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [viewedPlayers, setViewedPlayers] = useState<Set<string>>(new Set());

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setViewedPlayers(prev => new Set(Array.from(prev).concat(player.name)));
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
            {gameState.players.map((player, index) => {
              const hasViewed = viewedPlayers.has(player.name);
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full h-14 text-lg font-medium justify-between px-6 hover-elevate active-elevate-2 ${
                    hasViewed ? 'bg-muted/50' : ''
                  }`}
                  onClick={() => handlePlayerClick(player)}
                  data-testid={`button-player-${index}`}
                >
                  <span>{player.name}</span>
                  {hasViewed && (
                    <CheckCircle className="w-5 h-5 text-primary" data-testid={`icon-viewed-${index}`} />
                  )}
                </Button>
              );
            })}
          </div>

          <Button
            variant="default"
            className="w-full h-12 text-base font-medium gap-2 mt-6"
            onClick={onPlayAgain}
            data-testid="button-play-again"
          >
            <RefreshCw className="w-5 h-5" />
            Play Again
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
