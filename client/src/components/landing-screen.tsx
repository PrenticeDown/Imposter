import { Button } from "@/components/ui/button";
import { Play, HelpCircle } from "lucide-react";

interface LandingScreenProps {
  onPlayNow: () => void;
  onHowToPlay: () => void;
}

export function LandingScreen({ onPlayNow, onHowToPlay }: LandingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/icon.png" 
          alt="Imposter Logo" 
          className="w-32 h-32 rounded-2xl shadow-lg"
          data-testid="img-logo"
        />
        <h1 className="text-4xl font-bold text-foreground" data-testid="text-title">
          Imposter
        </h1>
        <p className="text-muted-foreground text-center text-lg max-w-xs">
          Some players don't know the word. Can you spot them?
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          onClick={onPlayNow}
          className="w-full h-14 text-lg font-semibold gap-2"
          data-testid="button-play-now"
        >
          <Play className="w-6 h-6" />
          Play Now
        </Button>

        <Button
          variant="outline"
          onClick={onHowToPlay}
          className="w-full h-12 text-base font-medium gap-2"
          data-testid="button-how-to-play"
        >
          <HelpCircle className="w-5 h-5" />
          How to Play
        </Button>
      </div>
    </div>
  );
}
