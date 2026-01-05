import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskCard } from "@/components/TaskCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockTasks } from "@/lib/mockData";
import { Search, Filter, Mic, FileText, Image, Languages, SlidersHorizontal } from "lucide-react";

export default function Tasks() {
  const { t, isHausa } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.titleHa.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || task.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const taskCounts = {
    all: mockTasks.length,
    text: mockTasks.filter((t) => t.category === "text").length,
    audio: mockTasks.filter((t) => t.category === "audio").length,
    image: mockTasks.filter((t) => t.category === "image").length,
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.tasks.title}</h1>
            <p className="text-muted-foreground">
              {isHausa 
                ? `${filteredTasks.length} ayyuka akwai yanzu`
                : `${filteredTasks.length} tasks available now`
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.common.search + "..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto md:inline-flex">
            <TabsTrigger value="all" className="gap-2">
              <Filter className="w-4 h-4" />
              <span>{t.tasks.filter.all}</span>
              <span className="text-xs bg-muted px-1.5 rounded">{taskCounts.all}</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tasks.filter.text}</span>
              <span className="text-xs bg-muted px-1.5 rounded">{taskCounts.text}</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tasks.filter.audio}</span>
              <span className="text-xs bg-muted px-1.5 rounded">{taskCounts.audio}</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">{t.tasks.filter.image}</span>
              <span className="text-xs bg-muted px-1.5 rounded">{taskCounts.image}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeFilter} className="mt-6">
            {filteredTasks.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredTasks.map((task) => (
                  <Link key={task.id} to={`/tasks/${task.type}`}>
                    <TaskCard {...task} />
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t.dashboard.noTasks}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.dashboard.checkBackLater}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
