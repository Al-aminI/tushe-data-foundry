import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockDatasets } from "@/lib/mockData";
import { 
  Database, 
  Search, 
  Download,
  FileText,
  Mic,
  Tag,
  Star,
  ExternalLink,
  Filter
} from "lucide-react";

export default function Datasets() {
  const { isHausa } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDatasets = mockDatasets.filter((dataset) =>
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "translation":
        return <FileText className="w-5 h-5" />;
      case "audio":
        return <Mic className="w-5 h-5" />;
      case "ner":
        return <Tag className="w-5 h-5" />;
      default:
        return <Database className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "translation":
        return <Badge className="task-badge-translation">{isHausa ? "Fassara" : "Translation"}</Badge>;
      case "audio":
        return <Badge className="task-badge-audio">{isHausa ? "Sauti" : "Audio"}</Badge>;
      case "ner":
        return <Badge className="task-badge-ner">{isHausa ? "Sunaye" : "NER"}</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isHausa ? "Cibiyar Bayanai" : "Dataset Hub"}
            </h1>
            <p className="text-muted-foreground">
              {isHausa ? "Bincika da sauke bayanan harshen Hausa" : "Browse and download Hausa language datasets"}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{mockDatasets.length}</p>
              <p className="text-sm text-muted-foreground">{isHausa ? "Bayanan da Ake Samu" : "Available Datasets"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">
                {mockDatasets.reduce((acc, d) => acc + d.samples, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{isHausa ? "Jimlar Samfuri" : "Total Samples"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">
                {mockDatasets.reduce((acc, d) => acc + d.downloads, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{isHausa ? "Saukewa" : "Downloads"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={isHausa ? "Bincika bayanan..." : "Search datasets..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            {isHausa ? "Tace" : "Filter"}
          </Button>
        </div>

        {/* Datasets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <Card key={dataset.id} className="group hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    dataset.type === "translation" ? "bg-primary/10 text-primary" :
                    dataset.type === "audio" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600" :
                    "bg-orange-100 dark:bg-orange-900/30 text-orange-600"
                  }`}>
                    {getTypeIcon(dataset.type)}
                  </div>
                  {getTypeBadge(dataset.type)}
                </div>
                <CardTitle className="text-lg mt-3">{dataset.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{dataset.description}</p>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">{isHausa ? "Girma" : "Size"}</p>
                    <p className="font-medium text-foreground">{dataset.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isHausa ? "Samfuri" : "Samples"}</p>
                    <p className="font-medium text-foreground">{dataset.samples.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isHausa ? "Inganci" : "Quality"}</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 text-secondary" />
                      {dataset.qualityScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isHausa ? "Saukewa" : "Downloads"}</p>
                    <p className="font-medium text-foreground">{dataset.downloads.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">
                    {isHausa ? "Lasisi:" : "License:"} {dataset.license}
                  </p>
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2" size="sm">
                      <Download className="w-4 h-4" />
                      {isHausa ? "Sauke" : "Download"}
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDatasets.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isHausa ? "Babu bayanai" : "No datasets found"}
              </h3>
              <p className="text-muted-foreground">
                {isHausa ? "Gwada wani bincike" : "Try a different search term"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
