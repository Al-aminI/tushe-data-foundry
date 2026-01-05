import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AudioRecorder } from "@/components/AudioRecorder";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockTaskContent } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, Mic, SkipForward, Volume2 } from "lucide-react";

export default function AudioRecordingTask() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [recordings, setRecordings] = useState<Record<number, Blob>>({});
  
  const { prompts } = mockTaskContent.audioRecording;
  const totalPrompts = prompts.length;
  const progressPercent = ((currentPrompt + 1) / totalPrompts) * 100;

  const handleRecordingComplete = (blob: Blob) => {
    setRecordings({ ...recordings, [currentPrompt]: blob });
  };

  const handleNext = () => {
    if (currentPrompt < totalPrompts - 1) {
      setCurrentPrompt(currentPrompt + 1);
    } else {
      navigate("/tasks");
    }
  };

  const currentPromptData = prompts[currentPrompt];

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/tasks")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Button>
          <Badge variant="secondary" className="gap-1.5 task-badge-audio">
            <Mic className="w-4 h-4" />
            {isHausa ? "Yin Rikodi" : "Recording"}
          </Badge>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {isHausa ? `Jumla ${currentPrompt + 1} na ${totalPrompts}` : `Sentence ${currentPrompt + 1} of ${totalPrompts}`}
              </span>
              <span className="font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* Prompt Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              {isHausa ? "Karanta Wannan Jumla" : "Read This Sentence"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-2xl font-medium text-foreground text-center leading-relaxed hausa-text">
              {currentPromptData.text}
            </p>
            <p className="text-sm text-muted-foreground text-center mt-4 italic">
              "{currentPromptData.textEn}"
            </p>
          </CardContent>
        </Card>

        {/* Audio Recorder */}
        <Card>
          <CardContent className="p-6">
            <AudioRecorder onRecordingComplete={handleRecordingComplete} maxDuration={30} />
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">
            {isHausa ? "Shawarwari:" : "Tips:"}
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• {isHausa ? "Yi magana a hankali kuma a sarari" : "Speak slowly and clearly"}</li>
            <li>• {isHausa ? "Nisanta daga hayaniya" : "Find a quiet environment"}</li>
            <li>• {isHausa ? "Riƙe na'urar a nesa daidai" : "Hold device at proper distance"}</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <SkipForward className="w-4 h-4" />
            {t.tasks.interface.skip}
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!recordings[currentPrompt]}
            className="flex-1 h-12 gap-2"
          >
            {currentPrompt < totalPrompts - 1 ? t.tasks.interface.next : t.tasks.interface.submit}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
