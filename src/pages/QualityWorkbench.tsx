import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  CheckCircle, 
  XCircle, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Star,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react";

// Mock review queue data
const reviewQueue = [
  {
    id: "rev_1",
    type: "translation",
    contributor: { name: "Fatima Bello", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima" },
    source: "The weather in Nigeria is getting hotter due to climate change.",
    submission: "Yanayin Najeriya yana ƙara zafi saboda sauyin yanayi.",
    submittedAt: "10 min ago",
    quality: 92,
  },
  {
    id: "rev_2",
    type: "transcription",
    contributor: { name: "Musa Abdullahi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Musa" },
    source: "[Audio clip 45s]",
    submission: "Ina son cin abinci a gidan abinci wannan. Abincin yana da kyau sosai.",
    submittedAt: "15 min ago",
    quality: 88,
  },
  {
    id: "rev_3",
    type: "classification",
    contributor: { name: "Zainab Adamu", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab" },
    source: "Shugaban Najeriya ya ziyarci jihar Kano don bude sabon makarantar.",
    submission: "Politics, Education",
    submittedAt: "22 min ago",
    quality: 95,
  },
];

export default function QualityWorkbench() {
  const { isHausa } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [decision, setDecision] = useState<"approve" | "reject" | "edit" | null>(null);

  const currentItem = reviewQueue[currentIndex];
  const totalItems = reviewQueue.length;

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback("");
      setDecision(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFeedback("");
      setDecision(null);
    }
  };

  const handleDecision = (action: "approve" | "reject" | "edit") => {
    setDecision(action);
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return "text-green-600";
    if (quality >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground break-words">
              {isHausa ? "Wurin Bitar Inganci" : "Quality Review Workbench"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground break-words">
              {isHausa ? "Bita da inganta ƙaddamar da masu ba da gudummawa" : "Review and validate contributor submissions"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="secondary" className="gap-1 text-xs sm:text-sm">
              <Clock className="w-3 h-3 shrink-0" />
              <span className="whitespace-nowrap">{totalItems} {isHausa ? "jira" : "pending"}</span>
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">156</p>
                <p className="text-xs text-muted-foreground truncate">{isHausa ? "An Amince" : "Approved"}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <ThumbsDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">23</p>
                <p className="text-xs text-muted-foreground truncate">{isHausa ? "An Ƙi" : "Rejected"}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <Edit3 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">45</p>
                <p className="text-xs text-muted-foreground truncate">{isHausa ? "An Gyara" : "Edited"}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-secondary shrink-0" />
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">91%</p>
                <p className="text-xs text-muted-foreground truncate">{isHausa ? "Matsakaicin" : "Avg Quality"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            {isHausa ? "Baya" : "Previous"}
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalItems}
          </span>
          <Button variant="outline" onClick={handleNext} disabled={currentIndex === totalItems - 1}>
            {isHausa ? "Gaba" : "Next"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Review Card */}
        {currentItem && (
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border border-border shrink-0">
                    <AvatarImage src={currentItem.contributor.avatar} />
                    <AvatarFallback className="text-xs sm:text-sm">{currentItem.contributor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base text-foreground truncate">{currentItem.contributor.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{currentItem.submittedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <Badge variant="secondary" className="capitalize text-xs">{currentItem.type}</Badge>
                  <div className={`flex items-center gap-1 font-semibold text-sm sm:text-base ${getQualityColor(currentItem.quality)}`}>
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                    <span className="whitespace-nowrap">{currentItem.quality}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Source */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  {isHausa ? "Tushe" : "Source"}
                </p>
                <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm sm:text-base text-foreground break-words">{currentItem.source}</p>
                </div>
              </div>

              {/* Submission */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  {isHausa ? "Ƙaddamarwa" : "Submission"}
                </p>
                <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm sm:text-base text-foreground hausa-text break-words">{currentItem.submission}</p>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {isHausa ? "Bayani" : "Feedback"} ({isHausa ? "na zaɓi" : "optional"})
                </p>
                <Textarea
                  placeholder={isHausa ? "Ƙara bayani ga mai ba da gudummawa..." : "Add feedback for the contributor..."}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="resize-none"
                />
              </div>

              {/* Decision Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t">
                <Button
                  variant={decision === "reject" ? "destructive" : "outline"}
                  className="flex-1 h-10 sm:h-12 gap-2 text-xs sm:text-sm"
                  onClick={() => handleDecision("reject")}
                >
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">{isHausa ? "Ƙi" : "Reject"}</span>
                </Button>
                <Button
                  variant={decision === "edit" ? "secondary" : "outline"}
                  className="flex-1 h-10 sm:h-12 gap-2 text-xs sm:text-sm"
                  onClick={() => handleDecision("edit")}
                >
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">{isHausa ? "Gyara" : "Edit"}</span>
                </Button>
                <Button
                  variant={decision === "approve" ? "default" : "outline"}
                  className="flex-1 h-10 sm:h-12 gap-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                  onClick={() => handleDecision("approve")}
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">{isHausa ? "Amince" : "Approve"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Decision */}
        {decision && (
          <Button className="w-full h-12" onClick={handleNext}>
            {isHausa ? "Aika & Ci Gaba" : "Submit & Continue"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </AdminLayout>
  );
}
