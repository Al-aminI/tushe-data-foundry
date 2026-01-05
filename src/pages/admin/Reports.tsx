import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Mock reports data
const monthlyReports = [
  {
    month: "January 2024",
    contributors: 12458,
    tasksCompleted: 145892,
    totalPaid: 21883800,
    avgQuality: 94.2,
    newUsers: 1245,
  },
  {
    month: "February 2024",
    contributors: 13210,
    tasksCompleted: 156234,
    totalPaid: 23435100,
    avgQuality: 95.1,
    newUsers: 1456,
  },
  {
    month: "March 2024",
    contributors: 14120,
    tasksCompleted: 168901,
    totalPaid: 25335150,
    avgQuality: 94.8,
    newUsers: 1320,
  },
];

const projectReports = [
  {
    name: "Hausa News Translation",
    tasksCompleted: 12500,
    contributors: 234,
    avgQuality: 96.5,
    totalPaid: 1875000,
    status: "active",
  },
  {
    name: "Speech Recording Campaign",
    tasksCompleted: 8000,
    contributors: 156,
    avgQuality: 92.3,
    totalPaid: 1200000,
    status: "active",
  },
  {
    name: "Sentiment Analysis",
    tasksCompleted: 5000,
    contributors: 89,
    avgQuality: 94.7,
    totalPaid: 750000,
    status: "completed",
  },
];

export default function Reports() {
  const { isHausa } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isHausa ? "Rahotanni" : "Reports"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? "Duba rahotanni da ƙididdiga" : "View reports and analytics"}
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={isHausa ? "Zaɓi Lokaci" : "Select Period"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">{isHausa ? "Yau" : "Daily"}</SelectItem>
                <SelectItem value="weekly">{isHausa ? "Mako" : "Weekly"}</SelectItem>
                <SelectItem value="monthly">{isHausa ? "Wata" : "Monthly"}</SelectItem>
                <SelectItem value="yearly">{isHausa ? "Shekara" : "Yearly"}</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              {isHausa ? "Sauke" : "Export"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">{isHausa ? "Bayanin Gaba ɗaya" : "Overview"}</TabsTrigger>
            <TabsTrigger value="monthly">{isHausa ? "Rahotannin Wata" : "Monthly Reports"}</TabsTrigger>
            <TabsTrigger value="projects">{isHausa ? "Rahotannin Ayyuka" : "Project Reports"}</TabsTrigger>
            <TabsTrigger value="financial">{isHausa ? "Kuɗi" : "Financial"}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Jimlar Masu Gudummawa" : "Total Contributors"}</p>
                      <p className="text-2xl font-bold text-foreground">14,120</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +12.5%
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Ayyukan da aka Kammala" : "Tasks Completed"}</p>
                      <p className="text-2xl font-bold text-foreground">470,027</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +8.3%
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Jimlar An Biya" : "Total Paid"}</p>
                      <p className="text-2xl font-bold text-foreground">₦70.5M</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +15.2%
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Matsakaicin Inganci" : "Avg Quality"}</p>
                      <p className="text-2xl font-bold text-foreground">94.7%</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +0.5%
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            {monthlyReports.map((report, i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.month}</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      {isHausa ? "Sauke" : "Download"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Masu Gudummawa" : "Contributors"}</p>
                      <p className="text-xl font-bold text-foreground">{report.contributors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Ayyuka" : "Tasks"}</p>
                      <p className="text-xl font-bold text-foreground">{report.tasksCompleted.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "An Biya" : "Paid"}</p>
                      <p className="text-xl font-bold text-foreground">₦{(report.totalPaid / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Inganci" : "Quality"}</p>
                      <p className="text-xl font-bold text-foreground">{report.avgQuality}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Sabbin Masu Amfani" : "New Users"}</p>
                      <p className="text-xl font-bold text-foreground">{report.newUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {projectReports.map((report, i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isHausa ? "Aiki" : "Status"}: {report.status}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      {isHausa ? "Sauke" : "Download"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Ayyukan da aka Kammala" : "Tasks Completed"}</p>
                      <p className="text-xl font-bold text-foreground">{report.tasksCompleted.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Masu Gudummawa" : "Contributors"}</p>
                      <p className="text-xl font-bold text-foreground">{report.contributors}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Matsakaicin Inganci" : "Avg Quality"}</p>
                      <p className="text-xl font-bold text-foreground">{report.avgQuality}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHausa ? "Jimlar An Biya" : "Total Paid"}</p>
                      <p className="text-xl font-bold text-foreground">₦{(report.totalPaid / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isHausa ? "Rahoton Kuɗi" : "Financial Summary"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">{isHausa ? "Jimlar An Biya" : "Total Paid Out"}</span>
                    <span className="text-2xl font-bold text-foreground">₦70,554,050</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">{isHausa ? "Jiran Biyan Kuɗi" : "Pending Payouts"}</span>
                    <span className="text-2xl font-bold text-foreground">₦2,450,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">{isHausa ? "Matsakaicin Biyan Kuɗi/Mako" : "Avg Weekly Payout"}</span>
                    <span className="text-2xl font-bold text-foreground">₦2.4M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

