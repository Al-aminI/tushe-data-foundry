import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  CheckCircle, 
  Clock, 
  PlayCircle,
  FileText,
  Mic,
  Image,
  Languages,
  Tag,
  MessageSquare
} from "lucide-react";

// Mock task history data
const mockTaskHistory = [
  {
    id: "hist_1",
    type: "translation",
    title: "Translate News Article",
    titleHa: "Fassara Labarin Jarida",
    status: "completed" as const,
    completedAt: "2025-01-05 14:30",
    reward: 150,
    timeSpent: "4 min",
  },
  {
    id: "hist_2",
    type: "audioRecording",
    title: "Record Hausa Sentences",
    titleHa: "Yi Rikodin Jumlon Hausa",
    status: "in_progress" as const,
    progress: 60,
    reward: 200,
    timeSpent: "5 min",
  },
  {
    id: "hist_3",
    type: "textClassification",
    title: "Classify Text Topics",
    titleHa: "Rarraba Batutuwan Rubutu",
    status: "completed" as const,
    completedAt: "2025-01-05 12:15",
    reward: 100,
    timeSpent: "3 min",
  },
  {
    id: "hist_4",
    type: "sentimentAnalysis",
    title: "Analyze Sentiment",
    titleHa: "Nazarin Ji",
    status: "in_progress" as const,
    progress: 30,
    reward: 80,
    timeSpent: "1 min",
  },
  {
    id: "hist_5",
    type: "imageCaptioning",
    title: "Describe Images",
    titleHa: "Bayyana Hotuna",
    status: "completed" as const,
    completedAt: "2025-01-04 16:45",
    reward: 120,
    timeSpent: "4 min",
  },
  {
    id: "hist_6",
    type: "translation",
    title: "Translate Health Article",
    titleHa: "Fassara Labarin Lafiya",
    status: "completed" as const,
    completedAt: "2025-01-04 10:20",
    reward: 150,
    timeSpent: "6 min",
  },
  {
    id: "hist_7",
    type: "ner",
    title: "Mark Named Entities",
    titleHa: "Alamta Sunayen Wurare",
    status: "completed" as const,
    completedAt: "2025-01-03 15:00",
    reward: 220,
    timeSpent: "11 min",
  },
  {
    id: "hist_8",
    type: "audioRecording",
    title: "Record Proverbs",
    titleHa: "Yi Rikodin Karin Magana",
    status: "completed" as const,
    completedAt: "2025-01-03 11:30",
    reward: 180,
    timeSpent: "7 min",
  },
];

const getTaskIcon = (type: string) => {
  switch (type) {
    case "translation":
      return <Languages className="w-5 h-5" />;
    case "audioRecording":
    case "audioTranscription":
      return <Mic className="w-5 h-5" />;
    case "imageCaptioning":
      return <Image className="w-5 h-5" />;
    case "ner":
      return <Tag className="w-5 h-5" />;
    case "sentimentAnalysis":
      return <MessageSquare className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

const getTaskColor = (type: string) => {
  switch (type) {
    case "translation":
      return "bg-primary/10 text-primary";
    case "audioRecording":
    case "audioTranscription":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "imageCaptioning":
      return "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400";
    case "ner":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    case "sentimentAnalysis":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function History() {
  const { isHausa } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const completedCount = mockTaskHistory.filter((t) => t.status === "completed").length;
  const inProgressCount = mockTaskHistory.filter((t) => t.status === "in_progress").length;

  const filteredTasks = mockTaskHistory.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return task.status === "completed";
    if (activeTab === "in_progress") return task.status === "in_progress";
    return true;
  });

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isHausa ? "Tarihin Ayyuka" : "Task History"}
          </h1>
          <p className="text-muted-foreground">
            {isHausa 
              ? `Kun kammala ayyuka ${completedCount}, ${inProgressCount} suna ci gaba`
              : `${completedCount} tasks completed, ${inProgressCount} in progress`
            }
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              <p className="text-sm text-muted-foreground">
                {isHausa ? "An Kammala" : "Completed"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
              <p className="text-sm text-muted-foreground">
                {isHausa ? "Ana Ci Gaba" : "In Progress"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <Card>
          <CardHeader className="pb-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">
                  {isHausa ? "Duka" : "All"}
                </TabsTrigger>
                <TabsTrigger value="in_progress">
                  {isHausa ? "Ana Ci Gaba" : "In Progress"}
                </TabsTrigger>
                <TabsTrigger value="completed">
                  {isHausa ? "An Kammala" : "Completed"}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTaskColor(task.type)}`}>
                  {getTaskIcon(task.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground truncate">
                      {isHausa ? task.titleHa : task.title}
                    </h3>
                    {task.status === "completed" ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {isHausa ? "An Kammala" : "Done"}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.progress}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>₦{task.reward}</span>
                    <span>•</span>
                    <span>{task.timeSpent}</span>
                    {task.status === "completed" && task.completedAt && (
                      <>
                        <span>•</span>
                        <span>{task.completedAt}</span>
                      </>
                    )}
                  </div>
                </div>

                {task.status === "in_progress" && (
                  <Link to={`/tasks/${task.type}`}>
                    <Button size="sm" className="gap-2">
                      <PlayCircle className="w-4 h-4" />
                      {isHausa ? "Ci Gaba" : "Continue"}
                    </Button>
                  </Link>
                )}
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {isHausa ? "Babu ayyuka a wannan rukunin" : "No tasks in this category"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}