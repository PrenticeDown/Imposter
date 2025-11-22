import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type GameConfig } from "@shared/schema";
import { Users, Shield } from "lucide-react";

interface SetupScreenProps {
  onComplete: (config: GameConfig) => void;
}

export function SetupScreen({ onComplete }: SetupScreenProps) {
  const [playerCount, setPlayerCount] = useState<number>(5);
  const [imposterCount, setImposterCount] = useState<number>(1);
  const [useHintWord, setUseHintWord] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ playerCount?: string; imposterCount?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { playerCount?: string; imposterCount?: string } = {};

    if (playerCount < 3 || playerCount > 10) {
      newErrors.playerCount = "Player count must be between 3 and 10";
    }

    if (imposterCount < 1) {
      newErrors.imposterCount = "Must have at least 1 imposter";
    }

    if (imposterCount >= playerCount) {
      newErrors.imposterCount = "Imposters must be less than total players";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onComplete({ playerCount, imposterCount, useHintWord });
  };

  const handlePlayerCountChange = (value: string) => {
    const num = parseInt(value) || 0;
    setPlayerCount(num);
    if (num > 0 && imposterCount >= num) {
      setImposterCount(Math.max(1, num - 1));
    }
  };

  return (
    <Card className="border-card-border">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-3xl font-bold text-center">Imposter</CardTitle>
        <CardDescription className="text-center text-base">
          Configure your game settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="player-count" className="text-base font-medium flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                Number of Players
              </Label>
              <Input
                id="player-count"
                type="number"
                min="3"
                max="10"
                value={playerCount}
                onChange={(e) => handlePlayerCountChange(e.target.value)}
                className="text-base h-12"
                data-testid="input-player-count"
              />
              {errors.playerCount && (
                <p className="text-sm text-destructive mt-2" data-testid="error-player-count">
                  {errors.playerCount}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imposter-count" className="text-base font-medium flex items-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                Number of Imposters
              </Label>
              <Input
                id="imposter-count"
                type="number"
                min="1"
                max={Math.max(1, playerCount - 1)}
                value={imposterCount}
                onChange={(e) => setImposterCount(parseInt(e.target.value) || 1)}
                className="text-base h-12"
                data-testid="input-imposter-count"
              />
              {errors.imposterCount && (
                <p className="text-sm text-destructive mt-2" data-testid="error-imposter-count">
                  {errors.imposterCount}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between py-4 px-6 rounded-lg bg-muted/40 border border-border">
              <Label htmlFor="hint-word" className="text-base font-medium cursor-pointer">
                Give imposters a hint word
              </Label>
              <Switch
                id="hint-word"
                checked={useHintWord}
                onCheckedChange={setUseHintWord}
                data-testid="toggle-hint-word"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium"
            data-testid="button-continue"
          >
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
