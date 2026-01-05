import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check,
  FileText,
  Mic,
  Languages,
  Image,
  Tag,
  MessageSquare,
  Settings,
  DollarSign,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

const taskTypes = [
  { id: "translation", icon: Languages, name: "Translation", nameHa: "Fassara" },
  { id: "audioRecording", icon: Mic, name: "Audio Recording", nameHa: "Yin Rikodin Sauti" },
  { id: "audioTranscription", icon: Mic, name: "Audio Transcription", nameHa: "Rubuta Sauti" },
  { id: "textClassification", icon: FileText, name: "Text Classification", nameHa: "Rarraba Rubutu" },
  { id: "sentimentAnalysis", icon: MessageSquare, name: "Sentiment Analysis", nameHa: "Nazarin Ji" },
  { id: "imageCaptioning", icon: Image, name: "Image Captioning", nameHa: "Bayyana Hoto" },
  { id: "ner", icon: Tag, name: "Named Entity Recognition", nameHa: "Ganewa Sunan" },
];

const steps = [
  { id: "basics", title: "Basic Info", titleHa: "Bayani" },
  { id: "type", title: "Task Type", titleHa: "Nau'in Aiki" },
  { id: "guidelines", title: "Guidelines", titleHa: "Jagora" },
  { id: "rewards", title: "Rewards", titleHa: "Lada" },
  { id: "review", title: "Review", titleHa: "Bita" },
];

export default function ProjectWizard() {
  const { isHausa } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    taskType: "",
    guidelines: "",
    exampleCount: 3,
    rewardPerTask: 100,
    qualityThreshold: 80,
  });

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/admin/projects");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedTaskType = taskTypes.find((t) => t.id === formData.taskType);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/projects")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isHausa ? "Ƙirƙiri Sabon Aiki" : "Create New Project"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? steps[currentStep].titleHa : steps[currentStep].title} - {isHausa ? `Mataki ${currentStep + 1} na ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  i <= currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2",
                  i < currentStep ? "bg-primary text-primary-foreground border-primary" :
                  i === currentStep ? "border-primary text-primary" :
                  "border-muted text-muted-foreground"
                )}>
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden md:inline">{isHausa ? step.titleHa : step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label>{isHausa ? "Sunan Aiki" : "Project Name"}</Label>
                  <Input
                    placeholder={isHausa ? "Shigar da sunan aiki" : "Enter project name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Bayani" : "Description"}</Label>
                  <Textarea
                    placeholder={isHausa ? "Bayyana aikin" : "Describe the project"}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Task Type */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-muted-foreground">
                  {isHausa ? "Zaɓi nau'in aikin da kuke so" : "Select the type of task you want to create"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {taskTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      onClick={() => setFormData({ ...formData, taskType: type.id })}
                      className={cn(
                        "h-auto py-4 flex-col gap-2 justify-start",
                        formData.taskType === type.id && "border-primary bg-primary/5 ring-2 ring-primary"
                      )}
                    >
                      <type.icon className="w-6 h-6" />
                      <span className="text-sm font-medium">
                        {isHausa ? type.nameHa : type.name}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Guidelines */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label>{isHausa ? "Jagoran Aiki" : "Task Guidelines"}</Label>
                  <Textarea
                    placeholder={isHausa ? "Rubuta jagora don masu ba da gudummawa" : "Write guidelines for contributors"}
                    value={formData.guidelines}
                    onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
                    className="min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Adadin Misalai" : "Number of Examples"}</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[formData.exampleCount]}
                      onValueChange={([value]) => setFormData({ ...formData, exampleCount: value })}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-8 text-center font-medium">{formData.exampleCount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Rewards */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label>{isHausa ? "Lada ga Kowace Aiki (₦)" : "Reward per Task (₦)"}</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[formData.rewardPerTask]}
                      onValueChange={([value]) => setFormData({ ...formData, rewardPerTask: value })}
                      max={500}
                      min={50}
                      step={10}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-bold text-lg">₦{formData.rewardPerTask}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{isHausa ? "Iyakar Inganci (%)" : "Quality Threshold (%)"}</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[formData.qualityThreshold]}
                      onValueChange={([value]) => setFormData({ ...formData, qualityThreshold: value })}
                      max={100}
                      min={50}
                      step={5}
                      className="flex-1"
                    />
                    <span className="w-12 text-center font-medium">{formData.qualityThreshold}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{isHausa ? "Sunan Aiki" : "Project Name"}</p>
                    <p className="font-medium text-foreground">{formData.name || "-"}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{isHausa ? "Nau'in Aiki" : "Task Type"}</p>
                    <p className="font-medium text-foreground">
                      {selectedTaskType ? (isHausa ? selectedTaskType.nameHa : selectedTaskType.name) : "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{isHausa ? "Lada" : "Reward"}</p>
                    <p className="font-medium text-foreground">₦{formData.rewardPerTask} / {isHausa ? "aiki" : "task"}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{isHausa ? "Iyakar Inganci" : "Quality Threshold"}</p>
                    <p className="font-medium text-foreground">{formData.qualityThreshold}%</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 h-12">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isHausa ? "Baya" : "Back"}
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1 h-12 gap-2">
            {currentStep === steps.length - 1 ? (
              <>
                {isHausa ? "Ƙirƙiri Aiki" : "Create Project"}
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                {isHausa ? "Gaba" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
