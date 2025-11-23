import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, ArrowRight } from "lucide-react";

interface PlayerSetupScreenProps {
  initialNames: string[];
  onComplete: (names: string[]) => void;
}

export function PlayerSetupScreen({ initialNames, onComplete }: PlayerSetupScreenProps) {
  const [names, setNames] = useState<string[]>(
    initialNames.length > 0 ? initialNames : ["", "", ""]
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (initialNames.length > 0) {
      setNames(initialNames);
    }
  }, [initialNames]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
    setError("");
  };

  const handleAddPlayer = () => {
    if (names.length < 10) {
      setNames([...names, ""]);
      setError("");
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (names.length > 3) {
      const newNames = names.filter((_, i) => i !== index);
      setNames(newNames);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedNames = names.map(n => n.trim());
    
    if (trimmedNames.length < 3) {
      setError("You need at least 3 players");
      return;
    }

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
        <CardTitle className="text-3xl font-bold text-center">Player Setup</CardTitle>
        <CardDescription className="text-center text-base">
          Add players for this game ({names.length} / 10)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3 max-h-[50vh] overflow-y-auto px-1 pr-2 py-1">
            {names.map((name, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                  className="text-base h-12 flex-1"
                  data-testid={`input-player-name-${index}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemovePlayer(index)}
                  disabled={names.length <= 3}
                  className="h-12 w-12 shrink-0"
                  data-testid={`button-remove-player-${index}`}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-sm text-destructive text-center" data-testid="error-players">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddPlayer}
              disabled={names.length >= 10}
              className="flex-1 h-12 text-base font-medium gap-2"
              data-testid="button-add-player"
            >
              <Plus className="w-5 h-5" />
              Add Player
            </Button>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium gap-2"
            data-testid="button-next"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
