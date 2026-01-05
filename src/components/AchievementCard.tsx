import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

interface AchievementCardProps {
  id: string;
  name: string;
  nameHa: string;
  description: string;
  descriptionHa: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  total: number;
  onClick?: () => void;
  className?: string;
}

const rarityConfig = {
  common: { 
    label: "Common", 
    labelHa: "Na Yau da Kullum", 
    class: "text-muted-foreground",
    bgClass: "bg-muted",
    borderClass: "border-muted-foreground/20"
  },
  rare: { 
    label: "Rare", 
    labelHa: "Da Wuya", 
    class: "text-blue-400",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/30"
  },
  epic: { 
    label: "Epic", 
    labelHa: "Mai Ban Mamaki", 
    class: "text-purple-400",
    bgClass: "bg-purple-500/10",
    borderClass: "border-purple-500/30"
  },
  legendary: { 
    label: "Legendary", 
    labelHa: "Tarihi", 
    class: "text-primary",
    bgClass: "bg-primary/20",
    borderClass: "border-primary/50 glow-gold"
  },
};

export function AchievementCard({
  name,
  nameHa,
  description,
  descriptionHa,
  icon,
  rarity,
  unlocked,
  progress,
  total,
  onClick,
  className,
}: AchievementCardProps) {
  const { isHausa } = useLanguage();
  const config = rarityConfig[rarity];
  const progressPercent = (progress / total) * 100;

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 border-2 overflow-hidden bg-card",
        unlocked ? config.borderClass : "border-border/30 opacity-75",
        unlocked && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform",
            unlocked ? config.bgClass : "bg-muted grayscale",
            unlocked && "group-hover:scale-110"
          )}>
            {icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "font-semibold truncate",
                unlocked ? "text-foreground" : "text-muted-foreground"
              )}>
                {isHausa ? nameHa : name}
              </h3>
              {unlocked && (
                <span className={cn("text-xs font-medium", config.class)}>
                  {isHausa ? config.labelHa : config.label}
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
              {isHausa ? descriptionHa : description}
            </p>
            
            {!unlocked && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{progress} / {total}</span>
                  <span className="text-muted-foreground">{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

