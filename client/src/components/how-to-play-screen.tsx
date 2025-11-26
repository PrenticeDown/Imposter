import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Target, Users, MessageCircle, Vote, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HowToPlayScreenProps {
  onBack: () => void;
  onPlayNow: () => void;
}

export function HowToPlayScreen({ onBack, onPlayNow }: HowToPlayScreenProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[800px]">
      <Card className="border-card-border flex-1 flex flex-col overflow-hidden">
        <CardHeader className="space-y-2 pb-4 shrink-0">
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
            <CardTitle className="text-2xl font-bold flex-1 text-center">How to Play</CardTitle>
            <div className="w-8" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden px-4 pb-4">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6 pb-4">
              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Objective</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-13">
                  Everyone gets the same secret word... except the Imposter. Your job is to spot the Imposter before they fool the group.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h2 className="text-xl font-semibold">Setup</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground pl-13">
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 mt-1 shrink-0 text-primary/70" />
                    <span>Tap <strong className="text-foreground">Play Now</strong> and add each player's name.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 text-center shrink-0 text-primary/70">🎭</span>
                    <span>Choose a theme (e.g. Party, Movies, R18).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 text-center shrink-0 text-primary/70">🕵️</span>
                    <span>Select how many Imposters you want.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 text-center shrink-0 text-primary/70">🔐</span>
                    <span>The app secretly gives everyone a word. One player sees <strong className="text-foreground">"You are the Imposter"</strong> instead.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h2 className="text-xl font-semibold">Give Clues</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground pl-13">
                  <li className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 mt-1 shrink-0 text-primary/70" />
                    <span>Players take turns saying short clues about the word (you can't say the word itself).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 text-center shrink-0 text-primary/70">🎭</span>
                    <span>The Imposter has to bluff and sound like they know the word.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h2 className="text-xl font-semibold">Discuss & Vote</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground pl-13">
                  <li className="flex items-start gap-2">
                    <Vote className="w-4 h-4 mt-1 shrink-0 text-primary/70" />
                    <span>After a few clues, everyone talks and then votes on who they think the Imposter is.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 text-center shrink-0 text-primary/70">✋</span>
                    <span>Majority vote = the group's final choice.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <h2 className="text-xl font-semibold">Reveal & Score</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground pl-13">
                  <li className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 mt-1 shrink-0 text-primary/70" />
                    <span>If the group catches the Imposter → <strong className="text-foreground">Group wins!</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 text-center shrink-0 text-primary/70">😈</span>
                    <span>If they get it wrong → <strong className="text-foreground">Imposter wins!</strong></span>
                  </li>
                </ul>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="pt-4 shrink-0">
        <Button
          onClick={onPlayNow}
          className="w-full h-12 text-base font-medium gap-2"
          data-testid="button-play-now-bottom"
        >
          <Play className="w-5 h-5" />
          Play Now
        </Button>
      </div>
    </div>
  );
}
