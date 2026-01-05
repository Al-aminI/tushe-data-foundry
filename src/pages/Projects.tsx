import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockProjects } from "@/lib/mockData";
import { 
  Folder, 
  Plus, 
  Search, 
  Users, 
  CheckCircle,
  Clock,
  Star,
  MoreVertical,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function Projects() {
  const { isHausa } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || project.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">{isHausa ? "Aiki" : "Active"}</Badge>;
      case "review":
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">{isHausa ? "Bita" : "Review"}</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{isHausa ? "An Kammala" : "Completed"}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Stats
  const totalTasks = mockProjects.reduce((acc, p) => acc + p.totalTasks, 0);
  const completedTasks = mockProjects.reduce((acc, p) => acc + p.completedTasks, 0);
  const avgQuality = Math.round(mockProjects.reduce((acc, p) => acc + p.qualityScore, 0) / mockProjects.length);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isHausa ? "Ayyukan Gudanarwa" : "Project Management"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? "Sarrafa da bibiyar duk ayyukanku" : "Manage and track all your projects"}
            </p>
          </div>
          <Link to="/admin/projects/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {isHausa ? "Sabon Aiki" : "New Project"}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Jimlar Ayyuka" : "Total Projects"}</p>
                  <p className="text-2xl font-bold text-foreground">{mockProjects.length}</p>
                </div>
                <Folder className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Ayyukan da aka Kammala" : "Tasks Completed"}</p>
                  <p className="text-2xl font-bold text-foreground">{completedTasks.toLocaleString()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Ayyuka Masu Jira" : "Pending Tasks"}</p>
                  <p className="text-2xl font-bold text-foreground">{(totalTasks - completedTasks).toLocaleString()}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isHausa ? "Matsakaicin Inganci" : "Avg Quality"}</p>
                  <p className="text-2xl font-bold text-foreground">{avgQuality}%</p>
                </div>
                <Star className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={isHausa ? "Bincika ayyuka..." : "Search projects..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">{isHausa ? "Duka" : "All"}</TabsTrigger>
              <TabsTrigger value="active">{isHausa ? "Aiki" : "Active"}</TabsTrigger>
              <TabsTrigger value="review">{isHausa ? "Bita" : "Review"}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                      {getStatusBadge(project.status)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    
                    <div className="flex items-center gap-6 mt-4 text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {project.contributors}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <CheckCircle className="w-4 h-4" />
                        {project.completedTasks.toLocaleString()} / {project.totalTasks.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {project.qualityScore}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{isHausa ? "Ci gaba" : "Progress"}</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
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

        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isHausa ? "Babu ayyuka" : "No projects found"}
              </h3>
              <p className="text-muted-foreground">
                {isHausa ? "Gwada canja tacewa ko ƙirƙiri sabon aiki" : "Try changing filters or create a new project"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
