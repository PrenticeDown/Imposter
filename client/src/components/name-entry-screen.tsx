import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";

interface NameEntryScreenProps {
  playerCount: number;
  onComplete: (names: string[]) => void;
  onBack: () => void;
}

export function NameEntryScreen({ playerCount, onComplete, onBack }: NameEntryScreenProps) {
  const [names, setNames] = useState<string[]>(Array(playerCount).fill(""));
  const [error, setError] = useState<string>("");

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedNames = names.map(n => n.trim());
    
    if (trimmedNames.some(n => n === "")) {
      setError("Please enter all player names");
      return;
    }

    const duplicates = trimmedNames.filter((name, index) => 
      trimmedNames.indexOf(name) !== index
    );
    
    if (duplicates.length > 0) {
      setError("All player names must be unique");
      return;
    }

    setError("");
    onComplete(trimmedNames);
  };

  return (
    <Card className="border-card-border">
      <CardHeader className="space-y-2 pb-6">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <CardTitle className="text-3xl font-bold flex-1 text-center">Player Names</CardTitle>
          <div className="w-8" />
        </div>
        <CardDescription className="text-center text-base">
          Enter the name of each player
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {Array.from({ length: playerCount }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`player-${index}`} className="text-base font-medium">
                  Player {index + 1}
                </Label>
                <Input
                  id={`player-${index}`}
                  type="text"
                  value={names[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Enter name`}
                  className="text-base h-12"
                  data-testid={`input-player-name-${index}`}
                />
              </div>
            ))}
          </div>

          {error && (
            <p className="text-sm text-destructive text-center" data-testid="error-names">
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium gap-2"
            data-testid="button-start-game"
          >
            <Play className="w-5 h-5" />
            Start Game
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
