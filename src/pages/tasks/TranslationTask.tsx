import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockTaskContent } from "@/lib/mockData";
import { 
  ArrowLeft, 
  ArrowRight, 
  Languages, 
  Lightbulb, 
  BookOpen,
  Copy,
  Check,
  SkipForward
} from "lucide-react";

export default function TranslationTask() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const [translation, setTranslation] = useState("");
  const [currentTask, setCurrentTask] = useState(1);
  const [showGlossary, setShowGlossary] = useState(false);
  const totalTasks = 10;

  const { source, targetLanguage, glossary } = mockTaskContent.translation;
  const progressPercent = (currentTask / totalTasks) * 100;

  const handleSubmit = () => {
    if (currentTask < totalTasks) {
      setCurrentTask(currentTask + 1);
      setTranslation("");
    } else {
      navigate("/tasks");
    }
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/tasks")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Button>
          <Badge variant="secondary" className="gap-1.5">
            <Languages className="w-4 h-4" />
            {isHausa ? "Fassara" : "Translation"}
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Source Text */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600">
                    EN
                  </span>
                  {isHausa ? "Rubutun Asali" : "Source Text"}
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{source}</p>
            </CardContent>
          </Card>

          {/* Translation Input */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  HA
                </span>
                {isHausa ? "Fassarar Ku" : "Your Translation"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={isHausa ? "Rubuta fassarar nan..." : "Type your translation here..."}
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="min-h-[150px] resize-none"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {translation.length} {isHausa ? "haruffa" : "characters"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Glossary */}
        <Card>
          <CardHeader 
            className="pb-2 cursor-pointer" 
            onClick={() => setShowGlossary(!showGlossary)}
          >
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              {isHausa ? "Kamus" : "Glossary"}
              <Badge variant="outline" className="ml-auto">
                {glossary.length} {isHausa ? "kalmomi" : "terms"}
              </Badge>
            </CardTitle>
          </CardHeader>
          {showGlossary && (
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {glossary.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium text-foreground">{item.term}</p>
                    <p className="text-sm text-primary">{item.translation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <SkipForward className="w-4 h-4" />
            {t.tasks.interface.skip}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!translation.trim()}
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
