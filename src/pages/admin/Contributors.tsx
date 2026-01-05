import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  ListTodo,
  Calendar,
  DollarSign,
} from "lucide-react";

// Mock contributors data
const mockContributors = [
  {
    id: "1",
    name: "Amina Bello",
    email: "amina@example.com",
    phone: "+234 801 234 5678",
    location: "Kano, Nigeria",
    status: "active",
    level: 12,
    xp: 12450,
    tasksCompleted: 1245,
    qualityScore: 96,
    totalEarnings: 187500,
    joinedDate: "2024-01-15",
    lastActive: "2 hours ago",
    verified: true,
  },
  {
    id: "2",
    name: "Ibrahim Musa",
    email: "ibrahim@example.com",
    phone: "+234 802 345 6789",
    location: "Zaria, Nigeria",
    status: "active",
    level: 10,
    xp: 9870,
    tasksCompleted: 987,
    qualityScore: 94,
    totalEarnings: 148050,
    joinedDate: "2024-02-20",
    lastActive: "5 hours ago",
    verified: true,
  },
  {
    id: "3",
    name: "Fatima Abdullahi",
    email: "fatima@example.com",
    phone: "+234 803 456 7890",
    location: "Sokoto, Nigeria",
    status: "suspended",
    level: 8,
    xp: 6540,
    tasksCompleted: 654,
    qualityScore: 78,
    totalEarnings: 98100,
    joinedDate: "2024-03-10",
    lastActive: "3 days ago",
    verified: false,
  },
  {
    id: "4",
    name: "Yusuf Adamu",
    email: "yusuf@example.com",
    phone: "+234 804 567 8901",
    location: "Kaduna, Nigeria",
    status: "active",
    level: 15,
    xp: 18900,
    tasksCompleted: 1890,
    qualityScore: 98,
    totalEarnings: 283500,
    joinedDate: "2023-12-05",
    lastActive: "1 hour ago",
    verified: true,
  },
  {
    id: "5",
    name: "Zainab Usman",
    email: "zainab@example.com",
    phone: "+234 805 678 9012",
    location: "Bauchi, Nigeria",
    status: "pending",
    level: 1,
    xp: 120,
    tasksCompleted: 12,
    qualityScore: 0,
    totalEarnings: 1800,
    joinedDate: "2024-06-01",
    lastActive: "1 day ago",
    verified: false,
  },
];

// Mock task history for contributors
const getMockTaskHistory = (contributorId: string) => [
  {
    id: "task_1",
    title: "Translate News Article",
    titleHa: "Fassara Labarin Jarida",
    type: "translation",
    status: "completed",
    qualityScore: 96,
    reward: 150,
    completedDate: "2024-12-15",
    reviewed: true,
  },
  {
    id: "task_2",
    title: "Record Hausa Sentences",
    titleHa: "Yi Rikodin Jumlon Hausa",
    type: "audioRecording",
    status: "completed",
    qualityScore: 94,
    reward: 200,
    completedDate: "2024-12-14",
    reviewed: true,
  },
  {
    id: "task_3",
    title: "Classify Text Topics",
    titleHa: "Rarraba Batutuwan Rubutu",
    type: "textClassification",
    status: "completed",
    qualityScore: 98,
    reward: 100,
    completedDate: "2024-12-13",
    reviewed: true,
  },
  {
    id: "task_4",
    title: "Transcribe Audio",
    titleHa: "Rubuta Sauti",
    type: "audioTranscription",
    status: "pending_review",
    qualityScore: null,
    reward: 180,
    completedDate: "2024-12-16",
    reviewed: false,
  },
  {
    id: "task_5",
    title: "Sentiment Analysis",
    titleHa: "Nazarin Ji",
    type: "sentimentAnalysis",
    status: "completed",
    qualityScore: 92,
    reward: 120,
    completedDate: "2024-12-12",
    reviewed: true,
  },
];

export default function Contributors() {
  const { isHausa } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedContributor, setSelectedContributor] = useState<typeof mockContributors[0] | null>(null);

  const filteredContributors = mockContributors.filter((contributor) => {
    const matchesSearch =
      contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && contributor.status === "active") ||
      (activeTab === "suspended" && contributor.status === "suspended") ||
      (activeTab === "pending" && contributor.status === "pending");
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            {isHausa ? "Aiki" : "Active"}
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {isHausa ? "An Dakatar" : "Suspended"}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
            {isHausa ? "Jiran" : "Pending"}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    total: mockContributors.length,
    active: mockContributors.filter((c) => c.status === "active").length,
    suspended: mockContributors.filter((c) => c.status === "suspended").length,
    pending: mockContributors.filter((c) => c.status === "pending").length,
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {isHausa ? "Masu Gudummawa" : "Contributors"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? "Sarrafa duk masu ba da gudummawa" : "Manage all contributors"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Jimlar" : "Total"}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Masu Aiki" : "Active"}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "An Dakatar" : "Suspended"}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.suspended}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Jiran" : "Pending"}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={isHausa ? "Bincika masu gudummawa..." : "Search contributors..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">{isHausa ? "Duka" : "All"}</TabsTrigger>
              <TabsTrigger value="active">{isHausa ? "Masu Aiki" : "Active"}</TabsTrigger>
              <TabsTrigger value="suspended">{isHausa ? "An Dakatar" : "Suspended"}</TabsTrigger>
              <TabsTrigger value="pending">{isHausa ? "Jiran" : "Pending"}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Contributors List */}
        <div className="space-y-4">
          {filteredContributors.map((contributor) => (
            <Card 
              key={contributor.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedContributor(contributor)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-border">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.name}`} />
                    <AvatarFallback>{contributor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="font-semibold text-sm sm:text-base text-foreground">{contributor.name}</h3>
                      {contributor.verified && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {isHausa ? "An Tabbatar" : "Verified"}
                        </Badge>
                      )}
                      {getStatusBadge(contributor.status)}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{contributor.email}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{contributor.phone}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{contributor.location}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                      <div className="min-w-0">
                        <span className="text-muted-foreground">{isHausa ? "Matsayi" : "Level"}: </span>
                        <span className="font-medium text-foreground whitespace-nowrap">{contributor.level}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-muted-foreground">{isHausa ? "Ayyuka" : "Tasks"}: </span>
                        <span className="font-medium text-foreground whitespace-nowrap">{contributor.tasksCompleted.toLocaleString()}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-muted-foreground">{isHausa ? "Inganci" : "Quality"}: </span>
                        <span className="font-medium text-foreground flex items-center gap-1 whitespace-nowrap">
                          <Star className="w-3 h-3 text-secondary shrink-0" />
                          {contributor.qualityScore}%
                        </span>
                      </div>
                      <div className="min-w-0 col-span-2 sm:col-span-1">
                        <span className="text-muted-foreground">{isHausa ? "Jimlar Kuɗi" : "Total Earnings"}: </span>
                        <span className="font-medium text-foreground whitespace-nowrap">₦{contributor.totalEarnings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <div className="text-left sm:text-right text-xs sm:text-sm text-muted-foreground">
                      <p>{isHausa ? "An Shiga" : "Joined"}: {contributor.joinedDate}</p>
                      <p>{isHausa ? "Ayyuka na ƙarshe" : "Last Active"}: {contributor.lastActive}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContributors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isHausa ? "Babu masu gudummawa" : "No contributors found"}
              </h3>
              <p className="text-muted-foreground">
                {isHausa ? "Gwada canja tacewa" : "Try changing filters"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Contributor Tasks Dialog */}
        <Dialog open={!!selectedContributor} onOpenChange={(open) => !open && setSelectedContributor(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] sm:w-full flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContributor?.name}`} />
                  <AvatarFallback className="text-xs sm:text-sm">{selectedContributor?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base sm:text-lg font-semibold break-words">{selectedContributor?.name}</span>
                    {selectedContributor?.verified && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30 text-xs shrink-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {isHausa ? "An Tabbatar" : "Verified"}
                      </Badge>
                    )}
                  </div>
                  <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">
                    {isHausa ? "Duba tarihin ayyukan mai gudummawa" : "View contributor's task history"}
                  </DialogDescription>
                </div>
              </DialogTitle>
            </DialogHeader>

            {selectedContributor && (
              <ScrollArea className="flex-1 pr-2 sm:pr-4 -mr-2 sm:-mr-4">
                <div className="space-y-4 sm:space-y-6">
                  {/* Contributor Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <ListTodo className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{isHausa ? "Ayyuka" : "Tasks"}</p>
                            <p className="text-base sm:text-lg font-bold truncate">{selectedContributor.tasksCompleted.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{isHausa ? "Inganci" : "Quality"}</p>
                            <p className="text-base sm:text-lg font-bold truncate">{selectedContributor.qualityScore}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{isHausa ? "Matsayi" : "Level"}</p>
                            <p className="text-base sm:text-lg font-bold truncate">{selectedContributor.level}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{isHausa ? "Jimlar Kuɗi" : "Total Earnings"}</p>
                            <p className="text-base sm:text-lg font-bold truncate">₦{selectedContributor.totalEarnings.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task History */}
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 break-words">
                      {isHausa ? "Tarihin Ayyuka" : "Task History"}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {getMockTaskHistory(selectedContributor.id).map((task) => (
                        <Card key={task.id} className="hover:shadow-sm transition-shadow">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                              <div className="flex-1 min-w-0 w-full sm:w-auto">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <h4 className="font-medium text-sm sm:text-base text-foreground break-words flex-1 min-w-0">
                                    {isHausa ? task.titleHa : task.title}
                                  </h4>
                                  <Badge variant="outline" className="text-xs shrink-0">
                                    {task.type}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1 whitespace-nowrap">
                                    <Calendar className="w-3 h-3 shrink-0" />
                                    {task.completedDate}
                                  </span>
                                  <span className="flex items-center gap-1 whitespace-nowrap">
                                    <DollarSign className="w-3 h-3 shrink-0" />
                                    ₦{task.reward}
                                  </span>
                                  {task.qualityScore !== null && (
                                    <span className="flex items-center gap-1 whitespace-nowrap">
                                      <Star className="w-3 h-3 text-secondary shrink-0" />
                                      {task.qualityScore}%
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2 shrink-0 w-full sm:w-auto">
                                {task.status === "completed" && task.reviewed ? (
                                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {isHausa ? "An Kammala" : "Completed"}
                                  </Badge>
                                ) : (
                                  <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {isHausa ? "Jiran Bita" : "Pending Review"}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

