import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  MessageSquare,
  Flag,
} from "lucide-react";

// Mock moderation queue
const flaggedContent = [
  {
    id: "1",
    type: "submission",
    content: "Wannan abinci ya yi daɗi sosai!",
    flaggedBy: { name: "Reviewer 1", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reviewer1" },
    contributor: { name: "Amina Bello", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina" },
    reason: "Inappropriate content",
    reasonHa: "Abun ciki mara kyau",
    status: "pending",
    flaggedAt: "2 hours ago",
    priority: "high",
  },
  {
    id: "2",
    type: "comment",
    content: "Spam message repeated multiple times",
    flaggedBy: { name: "Reviewer 2", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reviewer2" },
    contributor: { name: "Ibrahim Musa", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim" },
    reason: "Spam",
    reasonHa: "Takardar banza",
    status: "pending",
    flaggedAt: "5 hours ago",
    priority: "medium",
  },
  {
    id: "3",
    type: "submission",
    content: "Translation appears to be machine-generated",
    flaggedBy: { name: "Reviewer 3", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reviewer3" },
    contributor: { name: "Fatima Abdullahi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima" },
    reason: "Low quality",
    reasonHa: "Inganci ƙasa",
    status: "reviewed",
    flaggedAt: "1 day ago",
    priority: "low",
  },
];

const bannedUsers = [
  {
    id: "1",
    name: "User 123",
    email: "user123@example.com",
    reason: "Multiple violations",
    reasonHa: "Cin zarafi da yawa",
    bannedAt: "2024-05-15",
    bannedBy: "Admin User",
  },
];

export default function Moderation() {
  const { isHausa } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [actionNote, setActionNote] = useState("");

  const pendingItems = flaggedContent.filter((item) => item.status === "pending");
  const reviewedItems = flaggedContent.filter((item) => item.status === "reviewed");

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {isHausa ? "Babba" : "High"}
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
            {isHausa ? "Matsakaici" : "Medium"}
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {isHausa ? "Ƙasa" : "Low"}
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleAction = (action: "approve" | "reject" | "warn") => {
    // Handle moderation action
    setActionNote("");
    setSelectedItem(null);
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isHausa ? "Kula da Abun Ciki" : "Content Moderation"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? "Bita da sarrafa abun ciki da aka yi alama" : "Review and manage flagged content"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Jiran Bita" : "Pending Review"}</p>
                  <p className="text-2xl font-bold text-foreground">{pendingItems.length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "An Bita" : "Reviewed"}</p>
                  <p className="text-2xl font-bold text-foreground">{reviewedItems.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "An Haramta" : "Banned Users"}</p>
                  <p className="text-2xl font-bold text-foreground">{bannedUsers.length}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              {isHausa ? "Jiran Bita" : "Pending"} ({pendingItems.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              {isHausa ? "An Bita" : "Reviewed"} ({reviewedItems.length})
            </TabsTrigger>
            <TabsTrigger value="banned">
              {isHausa ? "An Haramta" : "Banned"} ({bannedUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="w-12 h-12 border border-border">
                        <AvatarImage src={item.contributor.avatar} />
                        <AvatarFallback>{item.contributor.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{item.contributor.name}</h3>
                          {getPriorityBadge(item.priority)}
                          <Badge variant="outline" className="capitalize">{item.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {isHausa ? "Dalili" : "Reason"}: {isHausa ? item.reasonHa : item.reason}
                        </p>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-foreground">{item.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {isHausa ? "An yi alama" : "Flagged"} {item.flaggedAt} {isHausa ? "ta" : "by"} {item.flaggedBy.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAction("approve")}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isHausa ? "Amince" : "Approve"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAction("warn")}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      {isHausa ? "Gargadi" : "Warn"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAction("reject")}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      {isHausa ? "Ƙi" : "Reject"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviewed" className="space-y-4">
            {reviewedItems.map((item) => (
              <Card key={item.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={item.contributor.avatar} />
                      <AvatarFallback>{item.contributor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{item.contributor.name}</p>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                    <Badge variant="outline">{isHausa ? "An Bita" : "Reviewed"}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="banned" className="space-y-4">
            {bannedUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {isHausa ? "Dalili" : "Reason"}: {isHausa ? user.reasonHa : user.reason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{isHausa ? "An Haramta" : "Banned"}: {user.bannedAt}</p>
                      <p>{isHausa ? "Ta" : "By"}: {user.bannedBy}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

