import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coins, Zap, Clock, ChevronRight } from "lucide-react";

interface DailyChallengeCardProps {
  id: string;
  title: string;
  titleHa: string;
  description: string;
  descriptionHa: string;
  reward: number;
  xpReward: number;
  progress: number;
  total: number;
  expiresAt: string;
  onClaim?: () => void;
  className?: string;
}

export function DailyChallengeCard({
  title,
  titleHa,
  description,
  descriptionHa,
  reward,
  xpReward,
  progress,
  total,
  expiresAt,
  onClaim,
  className,
}: DailyChallengeCardProps) {
  const { isHausa } = useLanguage();
  const progressPercent = (progress / total) * 100;
  const isCompleted = progress >= total;

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 bg-card",
      isCompleted && "border-primary/50 bg-primary/5",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">
              {isHausa ? titleHa : title}
            </h4>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isHausa ? descriptionHa : description}
            </p>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{progress} / {total}</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{getTimeRemaining()}</span>
                </div>
              </div>
              <Progress 
                value={progressPercent} 
                className={cn("h-2", isCompleted && "bg-primary/20")} 
              />
            </div>
          </div>
          
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 text-primary font-semibold">
              <Coins className="w-4 h-4" />
              <span>₦{reward}</span>
            </div>
            <div className="flex items-center gap-1 text-accent text-sm mt-0.5">
              <Zap className="w-3 h-3" />
              <span>+{xpReward} XP</span>
            </div>
          </div>
        </div>

        {isCompleted && (
          <Button 
            onClick={onClaim}
            className="w-full mt-4 bg-gradient-gold"
          >
            {isHausa ? "Karɓi Lada" : "Claim Reward"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

