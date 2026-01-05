import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, Coins, Zap, Mic, FileText, Image, Languages, Tag, MessageSquare } from "lucide-react";

interface TaskCardProps {
  id: string;
  type: "translation" | "audioRecording" | "audioTranscription" | "textClassification" | "ner" | "imageCaptioning" | "sentimentAnalysis";
  title: string;
  titleHa: string;
  description: string;
  descriptionHa: string;
  reward: number;
  estimatedTime: string;
  difficulty: "easy" | "medium" | "hard";
  available: number;
  onClick?: () => void;
  className?: string;
}

const taskTypeConfig = {
  translation: { icon: Languages, badgeClass: "bg-primary/10", color: "text-primary" },
  audioRecording: { icon: Mic, badgeClass: "bg-purple-500/10", color: "text-purple-400" },
  audioTranscription: { icon: Mic, badgeClass: "bg-purple-500/10", color: "text-purple-400" },
  textClassification: { icon: FileText, badgeClass: "bg-blue-500/10", color: "text-blue-400" },
  ner: { icon: Tag, badgeClass: "bg-orange-500/10", color: "text-orange-400" },
  imageCaptioning: { icon: Image, badgeClass: "bg-pink-500/10", color: "text-pink-400" },
  sentimentAnalysis: { icon: MessageSquare, badgeClass: "bg-blue-500/10", color: "text-blue-400" },
};

const difficultyConfig = {
  easy: { label: "Easy", labelHa: "Sauƙi", class: "bg-accent/20 text-accent" },
  medium: { label: "Medium", labelHa: "Matsakaici", class: "bg-primary/20 text-primary" },
  hard: { label: "Hard", labelHa: "Wahala", class: "bg-destructive/20 text-destructive" },
};

export function TaskCard({
  type,
  title,
  titleHa,
  description,
  descriptionHa,
  reward,
  estimatedTime,
  difficulty,
  available,
  onClick,
  className,
}: TaskCardProps) {
  const { isHausa, t } = useLanguage();
  const typeConfig = taskTypeConfig[type];
  const diffConfig = difficultyConfig[difficulty];
  const Icon = typeConfig.icon;

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 overflow-hidden bg-card",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
            typeConfig.badgeClass
          )}>
            <Icon className={cn("w-6 h-6", typeConfig.color)} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground truncate">
                {isHausa ? titleHa : title}
              </h3>
              <Badge variant="secondary" className={cn("text-xs shrink-0", diffConfig.class)}>
                {isHausa ? diffConfig.labelHa : diffConfig.label}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {isHausa ? descriptionHa : description}
            </p>
            
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1.5 text-primary font-semibold">
                <Coins className="w-4 h-4" />
                <span>₦{reward}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{estimatedTime}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-muted-foreground ml-auto">
                <Zap className="w-4 h-4 text-accent" />
                <span>{available} {isHausa ? "akwai" : "available"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

