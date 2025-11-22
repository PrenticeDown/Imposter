import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { THEMES, type ThemeId } from "@shared/schema";
import { ArrowLeft, Play, Shield } from "lucide-react";

interface ThemeConfigScreenProps {
  playerCount: number;
  onComplete: (theme: ThemeId, imposterCount: number, useHintWord: boolean) => void;
  onBack: () => void;
}

export function ThemeConfigScreen({ playerCount, onComplete, onBack }: ThemeConfigScreenProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>("party");
  const [imposterCount, setImposterCount] = useState<number>(1);
  const [useHintWord, setUseHintWord] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imposterCount < 1) {
      setError("Must have at least 1 imposter");
      return;
    }

    if (imposterCount >= playerCount) {
      setError("Imposters must be less than total players");
      return;
    }

    setError("");
    onComplete(selectedTheme, imposterCount, useHintWord);
  };

  const themes: ThemeId[] = ["party", "celebrities", "r18", "sports", "food"];

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
          <CardTitle className="text-3xl font-bold flex-1 text-center">Game Setup</CardTitle>
          <div className="w-8" />
        </div>
        <CardDescription className="text-center text-base">
          Choose theme and imposter settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Theme</Label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((themeId) => (
                  <Button
                    key={themeId}
                    type="button"
                    variant={selectedTheme === themeId ? "default" : "outline"}
                    className="h-14 text-base font-medium"
                    onClick={() => setSelectedTheme(themeId)}
                    data-testid={`button-theme-${themeId}`}
                  >
                    {THEMES[themeId].name}
                  </Button>
                ))}
              </div>
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
                onChange={(e) => {
                  setImposterCount(parseInt(e.target.value) || 1);
                  setError("");
                }}
                className="text-base h-12"
                data-testid="input-imposter-count"
              />
              {error && (
                <p className="text-sm text-destructive mt-2" data-testid="error-imposter-count">
                  {error}
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
