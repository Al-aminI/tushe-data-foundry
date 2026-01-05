import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flame, Star, Zap } from "lucide-react";

interface ProgressCardProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  qualityScore: number;
  className?: string;
}

export function ProgressCard({
  level,
  xp,
  xpToNextLevel,
  streak,
  qualityScore,
  className,
}: ProgressCardProps) {
  const { isHausa, t } = useLanguage();
  const xpProgress = (xp / xpToNextLevel) * 100;

  const getLevelBadge = () => {
    if (level < 5) return { name: "Bronze", class: "text-amber-600 border-amber-600 bg-amber-600/10" };
    if (level < 10) return { name: "Silver", class: "text-secondary border-secondary bg-secondary/10" };
    if (level < 20) return { name: "Gold", class: "text-primary border-primary bg-primary/10 glow-gold" };
    if (level < 35) return { name: "Platinum", class: "text-accent border-accent bg-accent/10" };
    return { name: "Diamond", class: "text-blue-400 border-blue-400 bg-blue-400/10" };
  };

  const levelBadge = getLevelBadge();

  return (
    <Card className={cn("overflow-hidden bg-card", className)}>
      <CardContent className="p-4 space-y-4">
        {/* Level Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl border-2",
              levelBadge.class
            )}>
              {level}
            </div>
            <div>
              <div className="font-semibold text-foreground">
                {isHausa ? t.dashboard.level : "Level"} {level}
              </div>
              <div className={cn("text-sm font-medium", levelBadge.class.split(' ')[0])}>
                {levelBadge.name}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-primary">
            <Zap className="w-5 h-5" />
            <span className="font-bold">{xp.toLocaleString()} XP</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {isHausa ? "Zuwa Matsayi na gaba" : "To next level"}
            </span>
            <span className="text-muted-foreground">
              {xp.toLocaleString()} / {xpToNextLevel.toLocaleString()}
            </span>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{streak}</div>
              <div className="text-xs text-muted-foreground">
                {isHausa ? t.dashboard.streak : "Day Streak"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{qualityScore}%</div>
              <div className="text-xs text-muted-foreground">
                {isHausa ? t.dashboard.qualityScore : "Quality"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

