import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function Contributors() {
  const { isHausa } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isHausa ? "Masu Gudummawa" : "Contributors"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? "Sarrafa duk masu ba da gudummawa" : "Manage all contributors"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <Card key={contributor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-border">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.name}`} />
                    <AvatarFallback>{contributor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{contributor.name}</h3>
                      {contributor.verified && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {isHausa ? "An Tabbatar" : "Verified"}
                        </Badge>
                      )}
                      {getStatusBadge(contributor.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        {contributor.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4" />
                        {contributor.phone}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {contributor.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">{isHausa ? "Matsayi" : "Level"}: </span>
                        <span className="font-medium text-foreground">{contributor.level}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{isHausa ? "Ayyuka" : "Tasks"}: </span>
                        <span className="font-medium text-foreground">{contributor.tasksCompleted.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{isHausa ? "Inganci" : "Quality"}: </span>
                        <span className="font-medium text-foreground flex items-center gap-1">
                          <Star className="w-3 h-3 text-secondary" />
                          {contributor.qualityScore}%
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{isHausa ? "Jimlar Kuɗi" : "Total Earnings"}: </span>
                        <span className="font-medium text-foreground">₦{contributor.totalEarnings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{isHausa ? "An Shiga" : "Joined"}: {contributor.joinedDate}</p>
                      <p>{isHausa ? "Ayyuka na ƙarshe" : "Last Active"}: {contributor.lastActive}</p>
                    </div>
                    <Button variant="ghost" size="icon">
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
      </div>
    </AdminLayout>
  );
}

