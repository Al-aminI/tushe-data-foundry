import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockTaskContent } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, Tag, SkipForward, Undo2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Entity {
  start: number;
  end: number;
  type: string;
  text: string;
}

export default function NERTask() {
  const { t, isHausa } = useLanguage();
  const navigate = useNavigate();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState(1);
  const totalTasks = 10;

  const { text, textEn, entityTypes } = mockTaskContent.ner;
  const progressPercent = (currentTask / totalTasks) * 100;

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !selectedType) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();
    
    if (selectedText && selectedText.length > 0) {
      // Simplified entity addition
      const newEntity: Entity = {
        start: text.indexOf(selectedText),
        end: text.indexOf(selectedText) + selectedText.length,
        type: selectedType,
        text: selectedText,
      };
      
      // Check if not overlapping
      const isOverlapping = entities.some(
        (e) => (newEntity.start >= e.start && newEntity.start < e.end) ||
               (newEntity.end > e.start && newEntity.end <= e.end)
      );
      
      if (!isOverlapping && newEntity.start !== -1) {
        setEntities([...entities, newEntity]);
      }
      
      selection.removeAllRanges();
    }
  };

  const removeEntity = (index: number) => {
    setEntities(entities.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (currentTask < totalTasks) {
      setCurrentTask(currentTask + 1);
      setEntities([]);
    } else {
      navigate("/tasks");
    }
  };

  const renderHighlightedText = () => {
    if (entities.length === 0) return text;

    // Sort entities by start position
    const sortedEntities = [...entities].sort((a, b) => a.start - b.start);
    const parts: JSX.Element[] = [];
    let lastEnd = 0;

    sortedEntities.forEach((entity, i) => {
      // Add text before entity
      if (entity.start > lastEnd) {
        parts.push(<span key={`text-${i}`}>{text.slice(lastEnd, entity.start)}</span>);
      }
      
      // Add highlighted entity
      const entityType = entityTypes.find((et) => et.id === entity.type);
      parts.push(
        <span
          key={`entity-${i}`}
          className="px-1 py-0.5 rounded cursor-pointer hover:opacity-80"
          style={{ backgroundColor: `${entityType?.color}30`, color: entityType?.color }}
          onClick={() => removeEntity(i)}
        >
          {entity.text}
          <span className="text-xs ml-1">×</span>
        </span>
      );
      
      lastEnd = entity.end;
    });

    // Add remaining text
    if (lastEnd < text.length) {
      parts.push(<span key="text-end">{text.slice(lastEnd)}</span>);
    }

    return parts;
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-6 w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/tasks")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Button>
          <Badge variant="secondary" className="gap-1.5 task-badge-ner">
            <Tag className="w-4 h-4" />
            {isHausa ? "Alamta Sunayen" : "Named Entities"}
          </Badge>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {isHausa ? `Aiki ${currentTask} na ${totalTasks}` : `Task ${currentTask} of ${totalTasks}`}
              </span>
              <span className="font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* Entity Type Selector */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              {isHausa ? "Zaɓi nau'in entity" : "Select entity type"}
              <Info className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {entityTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "gap-2 transition-all",
                    selectedType === type.id && "ring-2"
                  )}
                  style={{
                    borderColor: type.color,
                    backgroundColor: selectedType === type.id ? `${type.color}20` : undefined,
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  {isHausa ? type.nameHa : type.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Text to annotate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {isHausa ? "Zaɓi kalmomin entity" : "Select entity words"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p 
              className="text-lg text-foreground leading-relaxed hausa-text select-text cursor-text p-4 bg-muted/30 rounded-lg"
              onMouseUp={handleTextSelection}
            >
              {renderHighlightedText()}
            </p>
            <p className="text-sm text-muted-foreground mt-3 italic">"{textEn}"</p>
          </CardContent>
        </Card>

        {/* Entities List */}
        {entities.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {isHausa ? "Entities da aka alamta" : "Marked entities"} ({entities.length})
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEntities([])}
                  className="text-muted-foreground"
                >
                  <Undo2 className="w-4 h-4 mr-1" />
                  {isHausa ? "Share duka" : "Clear all"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {entities.map((entity, i) => {
                  const entityType = entityTypes.find((et) => et.id === entity.type);
                  return (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="gap-1.5 cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: `${entityType?.color}20`, color: entityType?.color }}
                      onClick={() => removeEntity(i)}
                    >
                      {entity.text}
                      <span className="text-xs opacity-60">
                        ({isHausa ? entityType?.nameHa : entityType?.name})
                      </span>
                      <span className="ml-1">×</span>
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <SkipForward className="w-4 h-4" />
            {t.tasks.interface.skip}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={entities.length === 0}
            className="flex-1 h-12 gap-2"
          >
            {t.tasks.interface.submit}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
