import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockTaskContent } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, FileText, SkipForward, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TextClassificationTask() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState(1);
  const totalTasks = 10;

  const { text, textEn, labels } = mockTaskContent.textClassification;
  const progressPercent = (currentTask / totalTasks) * 100;

  const handleSubmit = () => {
    if (currentTask < totalTasks) {
      setCurrentTask(currentTask + 1);
      setSelectedLabel(null);
    } else {
      navigate("/tasks");
    }
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/tasks")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Button>
          <Badge variant="secondary" className="gap-1.5 task-badge-text">
            <FileText className="w-4 h-4" />
            {isHausa ? "Rarraba Rubutu" : "Classification"}
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

        {/* Text to classify */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {isHausa ? "Rubutun da za a rarraba" : "Text to classify"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground leading-relaxed hausa-text">{text}</p>
            <p className="text-sm text-muted-foreground mt-3 italic">"{textEn}"</p>
          </CardContent>
        </Card>

        {/* Labels */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {isHausa ? "Zaɓi nau'in" : "Select category"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {labels.map((label) => (
                <Button
                  key={label.id}
                  variant="outline"
                  onClick={() => setSelectedLabel(label.id)}
                  className={cn(
                    "h-auto py-4 justify-start gap-3 transition-all",
                    selectedLabel === label.id && "border-primary bg-primary/5 ring-2 ring-primary"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedLabel === label.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                  )}>
                    {selectedLabel === label.id && <Check className="w-4 h-4 text-primary-foreground" />}
                  </div>
                  <span className="font-medium">{isHausa ? label.nameHa : label.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <SkipForward className="w-4 h-4" />
            {t.tasks.interface.skip}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedLabel}
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
