import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, Mic, SkipForward, Play, Pause, Volume2, Rewind, FastForward } from "lucide-react";
import { useState as useStateRef, useRef, useEffect } from "react";

export default function AudioTranscriptionTask() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const [transcription, setTranscription] = useState("");
  const [currentTask, setCurrentTask] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45); // Mock 45 second audio
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const totalTasks = 5;

  const progressPercent = (currentTask / totalTasks) * 100;
  const audioProgress = (currentTime / duration) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (currentTask < totalTasks) {
      setCurrentTask(currentTask + 1);
      setTranscription("");
      setCurrentTime(0);
    } else {
      navigate("/tasks");
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Simulate audio playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + playbackSpeed, duration));
      }, 1000);
    }
    if (currentTime >= duration) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, playbackSpeed]);

  const skipBack = () => setCurrentTime(Math.max(0, currentTime - 5));
  const skipForward = () => setCurrentTime(Math.min(duration, currentTime + 5));

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/tasks")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Button>
          <Badge variant="secondary" className="gap-1.5 task-badge-audio">
            <Mic className="w-4 h-4" />
            {isHausa ? "Rubuta Sauti" : "Transcription"}
          </Badge>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {isHausa ? `Sauti ${currentTask} na ${totalTasks}` : `Audio ${currentTask} of ${totalTasks}`}
              </span>
              <span className="font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* Audio Player */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              {isHausa ? "Mai Kunna Sauti" : "Audio Player"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Waveform visualization (mock) */}
            <div className="h-20 bg-muted/50 rounded-xl flex items-center justify-center gap-0.5 px-4">
              {Array.from({ length: 60 }, (_, i) => {
                const isActive = (i / 60) * 100 <= audioProgress;
                const height = Math.sin((i / 60) * Math.PI * 4) * 0.5 + 0.5;
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-muted-foreground/30"}`}
                    style={{ height: `${height * 100}%` }}
                  />
                );
              })}
            </div>

            {/* Time and progress */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={([value]) => setCurrentTime(value)}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" onClick={skipBack}>
                <Rewind className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                onClick={togglePlayback}
                className="w-16 h-16 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" fill="currentColor" />
                ) : (
                  <Play className="w-7 h-7" fill="currentColor" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={skipForward}>
                <FastForward className="w-5 h-5" />
              </Button>
            </div>

            {/* Playback speed */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">{isHausa ? "Gudu:" : "Speed:"}</span>
              {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
                <Button
                  key={speed}
                  variant={playbackSpeed === speed ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlaybackSpeed(speed)}
                  className="h-8 px-3"
                >
                  {speed}x
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transcription Input */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {isHausa ? "Rubuta abin da kuke ji" : "Type what you hear"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={isHausa ? "Rubuta fassarar sauti nan..." : "Type the audio transcription here..."}
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="min-h-[150px] resize-none hausa-text"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {transcription.split(/\s+/).filter(Boolean).length} {isHausa ? "kalmomi" : "words"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard shortcuts hint */}
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{isHausa ? "Gajerun Hanyoyi:" : "Shortcuts:"}</span>{" "}
            {isHausa 
              ? "Tab don kunna/tsaya, Ctrl+← don komawa baya, Ctrl+→ don ci gaba"
              : "Tab to play/pause, Ctrl+← to rewind, Ctrl+→ to forward"
            }
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <SkipForward className="w-4 h-4" />
            {t.tasks.interface.skip}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={transcription.trim().length < 10}
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
