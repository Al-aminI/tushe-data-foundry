import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConfetti } from "@/hooks/useConfetti";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Languages,
  MapPin,
  GraduationCap,
  CheckCircle,
  PartyPopper
} from "lucide-react";

const steps = [
  { id: "welcome", icon: Sparkles },
  { id: "language", icon: Languages },
  { id: "dialect", icon: MapPin },
  { id: "qualification", icon: GraduationCap },
  { id: "complete", icon: PartyPopper },
];

const languageLevels = [
  { id: "native", labelEn: "Native Speaker", labelHa: "Mai Harshen Hausa" },
  { id: "fluent", labelEn: "Fluent", labelHa: "Mai Fasaha" },
  { id: "intermediate", labelEn: "Intermediate", labelHa: "Matsakaici" },
  { id: "basic", labelEn: "Basic", labelHa: "Farko" },
];

const qualificationQuestions = [
  {
    id: 1,
    questionEn: "What is the Hausa word for 'Thank you'?",
    questionHa: "Menene kalmar Turanci don 'Na gode'?",
    options: [
      { id: "a", text: "Sannu" },
      { id: "b", text: "Na gode" },
      { id: "c", text: "Barka" },
      { id: "d", text: "Sai anjima" },
    ],
    correct: "b",
  },
  {
    id: 2,
    questionEn: "Which greeting is used in the morning?",
    questionHa: "Wace gaisuwa ake amfani da ita da safe?",
    options: [
      { id: "a", text: "Barka da dare" },
      { id: "b", text: "Barka da yamma" },
      { id: "c", text: "Ina kwana" },
      { id: "d", text: "Barka da rana" },
    ],
    correct: "c",
  },
];

export default function Onboarding() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const { celebrate } = useConfetti();
  const [currentStep, setCurrentStep] = useState(0);
  const [languageLevel, setLanguageLevel] = useState("");
  const [selectedDialect, setSelectedDialect] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep === steps.length - 2) {
        celebrate();
      }
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  i <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
            ))}
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <Card className="border-border/50 shadow-xl overflow-hidden">
          <CardContent className="p-8">
            {/* Step 0: Welcome */}
            {currentStep === 0 && (
              <div className="text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {t.onboarding.welcome.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {t.onboarding.welcome.subtitle}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm">{isHausa ? "Kammala ayyuka kuma sami kuɗi" : "Complete tasks and earn money"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm">{isHausa ? "Yi aiki a lokacin da ya dace muku" : "Work on your own schedule"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm">{isHausa ? "Tallafa wa ci gaban AI na Afrika" : "Help build African AI"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Language Level */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Languages className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {t.onboarding.language.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {t.onboarding.language.subtitle}
                  </p>
                </div>
                <RadioGroup value={languageLevel} onValueChange={setLanguageLevel} className="space-y-3">
                  {languageLevels.map((level) => (
                    <Label
                      key={level.id}
                      htmlFor={level.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        languageLevel === level.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={level.id} id={level.id} />
                      <span className="font-medium">
                        {isHausa ? level.labelHa : level.labelEn}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Dialect */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {t.onboarding.dialect.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {t.onboarding.dialect.subtitle}
                  </p>
                </div>
                <RadioGroup value={selectedDialect} onValueChange={setSelectedDialect} className="grid grid-cols-2 gap-3">
                  {["Kano", "Sokoto", "Katsina", "Zaria", "Bauchi", "Kaduna"].map((dialect) => (
                    <Label
                      key={dialect}
                      htmlFor={dialect}
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        selectedDialect === dialect
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={dialect} id={dialect} className="sr-only" />
                      <span className="font-medium">{dialect}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Qualification Test */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {t.onboarding.qualification.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {t.onboarding.qualification.instructions}
                  </p>
                </div>
                <div className="space-y-6">
                  {qualificationQuestions.map((question) => (
                    <div key={question.id} className="space-y-3">
                      <p className="font-medium text-foreground">
                        {question.id}. {isHausa ? question.questionHa : question.questionEn}
                      </p>
                      <RadioGroup
                        value={answers[question.id] || ""}
                        onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                        className="grid grid-cols-2 gap-2"
                      >
                        {question.options.map((option) => (
                          <Label
                            key={option.id}
                            htmlFor={`${question.id}-${option.id}`}
                            className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                              answers[question.id] === option.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem
                              value={option.id}
                              id={`${question.id}-${option.id}`}
                              className="sr-only"
                            />
                            {option.text}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Complete */}
            {currentStep === 4 && (
              <div className="text-center space-y-6 animate-bounce-in">
                <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mx-auto shadow-glow">
                  <PartyPopper className="w-12 h-12 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {t.onboarding.complete.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {t.onboarding.complete.subtitle}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                  <div className="text-4xl font-bold text-primary">+100 XP</div>
                  <p className="text-sm text-muted-foreground">
                    {isHausa ? "An ba ku lambar yabo don kammala shigarwa!" : "You've earned a welcome bonus for completing onboarding!"}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.common.back}
                </Button>
              )}
              <Button onClick={handleNext} className="flex-1 h-12 gap-2">
                {currentStep === steps.length - 1 ? (
                  t.onboarding.complete.cta
                ) : (
                  <>
                    {t.common.continue}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
