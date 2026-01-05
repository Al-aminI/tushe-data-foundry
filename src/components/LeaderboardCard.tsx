import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardCardProps {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  region: string;
  isCurrentUser?: boolean;
  className?: string;
}

export function LeaderboardCard({
  rank,
  name,
  avatar,
  points,
  region,
  isCurrentUser = false,
  className,
}: LeaderboardCardProps) {
  const { isHausa } = useLanguage();

  const getRankDisplay = () => {
    if (rank === 1) {
      return (
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center glow-gold">
          <Trophy className="w-5 h-5 text-primary-foreground" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <Medal className="w-5 h-5 text-secondary-foreground" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Award className="w-5 h-5 text-accent-foreground" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        <span className="text-sm font-bold text-muted-foreground">{rank}</span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 rounded-xl transition-colors",
        isCurrentUser 
          ? "bg-primary/10 border border-primary/20" 
          : "hover:bg-muted/50",
        className
      )}
    >
      {getRankDisplay()}
      
      <Avatar className="w-10 h-10 border-2 border-border">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-muted text-muted-foreground">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-medium truncate text-foreground",
            isCurrentUser && "text-primary"
          )}>
            {name}
          </span>
          {isCurrentUser && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {isHausa ? "Kai" : "You"}
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">{region}</span>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-foreground">{points.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">{isHausa ? "maki" : "pts"}</div>
      </div>
    </div>
  );
}

