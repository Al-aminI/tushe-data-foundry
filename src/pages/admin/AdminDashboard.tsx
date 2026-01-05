import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Database,
  Star,
  AlertTriangle,
  ArrowRight,
  Folder,
  DollarSign,
} from "lucide-react";

// Mock admin stats
const adminStats = {
  totalContributors: 12458,
  activeToday: 3421,
  pendingReviews: 856,
  tasksCompleted: 145892,
  avgQualityScore: 94.2,
  totalPaidOut: 15250000,
  datasetsPublished: 24,
  projectsActive: 18,
};

const recentActivity = [
  { type: "review", message: "New batch of 150 translations pending review", time: "5 min ago", urgent: true },
  { type: "user", message: "42 new contributors registered today", time: "1 hour ago", urgent: false },
  { type: "quality", message: "Quality score dropped below 90% in Audio Transcription", time: "2 hours ago", urgent: true },
  { type: "payout", message: "Weekly payouts processed - ₦2.4M distributed", time: "3 hours ago", urgent: false },
  { type: "dataset", message: "Hausa-English Translation v2.1 dataset published", time: "5 hours ago", urgent: false },
];

const topProjects = [
  { name: "Hausa News Translation", progress: 78, tasks: 12500, contributors: 234 },
  { name: "Speech Recording Campaign", progress: 45, tasks: 8000, contributors: 156 },
  { name: "Sentiment Analysis", progress: 92, tasks: 5000, contributors: 89 },
];

export default function AdminDashboard() {
  const { isHausa } = useLanguage();

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isHausa ? "Dashodin Gudanarwa" : "Admin Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? "Kula da tsarin Tushe" : "Manage the Tushe platform"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/projects/new">
              <Button className="gap-2">
                <Folder className="w-4 h-4" />
                {isHausa ? "Sabon Aiki" : "New Project"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHausa ? "Masu Gudummawa" : "Contributors"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {adminStats.totalContributors.toLocaleString()}
                  </p>
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.5% {isHausa ? "wannan watan" : "this month"}
                  </p>
                </div>
                <Users className="w-10 h-10 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHausa ? "Ayyukan da aka Kammala" : "Tasks Completed"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {adminStats.tasksCompleted.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +8.3% {isHausa ? "wannan watan" : "this month"}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHausa ? "Jiran Bita" : "Pending Reviews"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {adminStats.pendingReviews.toLocaleString()}
                  </p>
                  <Link to="/admin/quality" className="text-xs text-orange-600 flex items-center gap-1 mt-1 hover:underline">
                    {isHausa ? "Duba yanzu" : "Review now"}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <Clock className="w-10 h-10 text-orange-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHausa ? "An Biya" : "Total Paid Out"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    ₦{(adminStats.totalPaidOut / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-secondary flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    ₦2.4M {isHausa ? "wannan makon" : "this week"}
                  </p>
                </div>
                <DollarSign className="w-10 h-10 text-secondary/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.activeToday.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{isHausa ? "Masu Aiki Yau" : "Active Today"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.avgQualityScore}%</p>
                <p className="text-sm text-muted-foreground">{isHausa ? "Ingancin" : "Avg Quality"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.datasetsPublished}</p>
                <p className="text-sm text-muted-foreground">{isHausa ? "Bayanan" : "Datasets"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Folder className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.projectsActive}</p>
                <p className="text-sm text-muted-foreground">{isHausa ? "Ayyukan Aiki" : "Active Projects"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {isHausa ? "Ayyukan Kwanan Nan" : "Recent Activity"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  {activity.urgent && (
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  )}
                  {!activity.urgent && (
                    <FileText className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  {activity.urgent && (
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/30 shrink-0">
                      {isHausa ? "Gaggawa" : "Urgent"}
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Projects */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                {isHausa ? "Manyan Ayyuka" : "Top Projects"}
              </CardTitle>
              <Link to="/admin/projects">
                <Button variant="ghost" size="sm" className="gap-1">
                  {isHausa ? "Duba Duka" : "View All"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProjects.map((project, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{project.name}</h4>
                    <span className="text-sm font-semibold text-primary">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {project.tasks.toLocaleString()} {isHausa ? "ayyuka" : "tasks"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.contributors} {isHausa ? "masu gudummawa" : "contributors"}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {isHausa ? "Ayyukan Gaggawa" : "Quick Actions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/admin/projects/new">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Folder className="w-5 h-5" />
                  <span className="text-sm">{isHausa ? "Ƙirƙiri Aiki" : "Create Project"}</span>
                </Button>
              </Link>
              <Link to="/admin/quality">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">{isHausa ? "Bitar Inganci" : "Review Queue"}</span>
                </Button>
              </Link>
              <Link to="/admin/contributors">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">{isHausa ? "Sarrafa Mutane" : "Manage Users"}</span>
                </Button>
              </Link>
              <Link to="/admin/datasets">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Database className="w-5 h-5" />
                  <span className="text-sm">{isHausa ? "Buga Dataset" : "Publish Dataset"}</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

