import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { type Player } from "@shared/schema";
import { Shield, Users } from "lucide-react";

interface RoleModalProps {
  player: Player;
  useHintWord: boolean;
  onClose: () => void;
}

export function RoleModal({ player, useHintWord, onClose }: RoleModalProps) {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setTimeout(onClose, 200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [onClose]);

  const isImposter = player.role === "imposter";

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      data-testid="modal-role-reveal"
    >
      <Card 
        className="w-full max-w-sm border-card-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="pt-8 pb-8 px-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {isImposter ? (
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-destructive" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>

            <h2 
              className={`text-2xl font-bold uppercase tracking-wide ${
                isImposter ? 'text-destructive' : 'text-primary'
              }`}
              data-testid="text-role"
            >
              {isImposter ? 'Imposter' : 'Crewmate'}
            </h2>

            <div className="space-y-2">
              {isImposter ? (
                useHintWord && player.word ? (
                  <>
                    <p className="text-base text-muted-foreground">
                      Your hint word is:
                    </p>
                    <p className="text-xl font-medium text-foreground" data-testid="text-word">
                      {player.word}
                    </p>
                  </>
                ) : (
                  <p className="text-base text-muted-foreground italic" data-testid="text-no-word">
                    You do not have a word.
                  </p>
                )
              ) : (
                <>
                  <p className="text-base text-muted-foreground">
                    Your word is:
                  </p>
                  <p className="text-xl font-medium text-foreground" data-testid="text-word">
                    {player.word}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Hiding in {countdown}...
              </p>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
