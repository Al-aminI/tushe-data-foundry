import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockTaskContent } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, MessageSquare, SkipForward, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SentimentAnalysisTask() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState(1);
  const totalTasks = 10;

  const { text, textEn, options } = mockTaskContent.sentimentAnalysis;
  const progressPercent = (currentTask / totalTasks) * 100;

  const handleSubmit = () => {
    if (currentTask < totalTasks) {
      setCurrentTask(currentTask + 1);
      setSelectedSentiment(null);
    } else {
      navigate("/tasks");
    }
  };

  const sentimentIcons = {
    positive: ThumbsUp,
    negative: ThumbsDown,
    neutral: Minus,
  };

  const sentimentColors = {
    positive: "border-green-500 bg-green-500/10 text-green-600",
    negative: "border-red-500 bg-red-500/10 text-red-600",
    neutral: "border-gray-400 bg-gray-400/10 text-gray-600",
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/tasks")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Button>
          <Badge variant="secondary" className="gap-1.5 task-badge-text">
            <MessageSquare className="w-4 h-4" />
            {isHausa ? "Nazarin Ji" : "Sentiment"}
          </Badge>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {isHausa ? `Aiki ${currentTask} na ${totalTasks}` : `Task ${currentTask} of ${totalTasks}`}
              </span>
              <span className="font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* Text to analyze */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {isHausa ? "Yaya wannan rubutu yake?" : "How does this text feel?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-foreground leading-relaxed hausa-text text-center py-4">
              "{text}"
            </p>
            <p className="text-sm text-muted-foreground mt-2 text-center italic">
              "{textEn}"
            </p>
          </CardContent>
        </Card>

        {/* Sentiment Options */}
        <div className="grid grid-cols-3 gap-4">
          {options.map((option) => {
            const Icon = sentimentIcons[option.id as keyof typeof sentimentIcons];
            const colorClass = sentimentColors[option.id as keyof typeof sentimentColors];
            
            return (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => setSelectedSentiment(option.id)}
                className={cn(
                  "h-auto py-6 flex-col gap-3 transition-all border-2",
                  selectedSentiment === option.id 
                    ? colorClass 
                    : "hover:border-primary/50"
                )}
              >
                <Icon className={cn(
                  "w-10 h-10",
                  selectedSentiment === option.id && colorClass.split(" ")[2]
                )} />
                <span className="font-medium text-base">
                  {isHausa ? option.nameHa : option.name}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <SkipForward className="w-4 h-4" />
            {t.tasks.interface.skip}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedSentiment}
            className="flex-1 h-12 gap-2"
          >
            {t.tasks.interface.submit}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
