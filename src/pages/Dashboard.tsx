import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TaskCard } from "@/components/TaskCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockUser, mockTasks, mockRecentActivity } from "@/lib/mockData";
import { 
  Coins, 
  CheckCircle, 
  ChevronRight,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const { t, isHausa } = useLanguage();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-primary">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                {t.dashboard.greeting}, {mockUser.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {isHausa ? "Bari mu ci gaba da aiki" : "Let's continue your great work"}
              </p>
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t.dashboard.tasksCompleted}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">12</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t.dashboard.earned}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">₦2,450</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/30 flex items-center justify-center">
                  <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{isHausa ? "Lokaci" : "Time Active"}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">2.5h</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Tasks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{t.dashboard.availableTasks}</CardTitle>
                <Link to="/tasks">
                  <Button variant="ghost" size="sm" className="gap-1">
                    {t.dashboard.viewAll}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTasks.slice(0, 3).map((task) => (
                  <Link key={task.id} to={`/tasks/${task.type}`}>
                    <TaskCard {...task} className="hover:bg-muted/50" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t.dashboard.recentActivity}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity
                    .filter((a) => a.type === "task_completed")
                    .slice(0, 5)
                    .map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-green-100 dark:bg-green-900/30">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{activity.description}</p>
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
