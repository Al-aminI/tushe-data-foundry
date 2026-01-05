import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockTaskContent } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, Image as ImageIcon, SkipForward, ZoomIn, ZoomOut } from "lucide-react";

export default function ImageCaptioningTask() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [currentTask, setCurrentTask] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const totalTasks = 10;

  const { imageUrl, guidelines, guidelinesHa } = mockTaskContent.imageCaptioning;
  const progressPercent = (currentTask / totalTasks) * 100;

  const handleSubmit = () => {
    if (currentTask < totalTasks) {
      setCurrentTask(currentTask + 1);
      setCaption("");
    } else {
      navigate("/tasks");
    }
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/tasks")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Button>
          <Badge variant="secondary" className="gap-1.5 task-badge-image">
            <ImageIcon className="w-4 h-4" />
            {isHausa ? "Bayyana Hoto" : "Image Captioning"}
          </Badge>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {isHausa ? `Hoto ${currentTask} na ${totalTasks}` : `Image ${currentTask} of ${totalTasks}`}
              </span>
              <span className="font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* Image Display */}
        <Card className="overflow-hidden">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt="Task image"
              className={`w-full object-cover transition-all duration-300 ${isZoomed ? "h-96" : "h-64"}`}
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </Button>
          </div>
        </Card>

        {/* Caption Input */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {isHausa ? "Bayyana hoton a Hausa" : "Describe the image in Hausa"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={isHausa ? "Rubuta bayanin hoton nan..." : "Write your caption here..."}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {caption.length}/500 {isHausa ? "haruffa" : "characters"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {isHausa ? "Jagora: " : "Guidelines: "}
            </span>
            {isHausa ? guidelinesHa : guidelines}
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
            disabled={caption.length < 10}
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
