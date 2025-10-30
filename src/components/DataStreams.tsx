import { Mic, FileText, Languages, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const streams = [
  {
    icon: Mic,
    title: "Speech",
    description: "120K+ labeled samples",
  },
  {
    icon: FileText,
    title: "Text",
    description: "Authentic Hausa corpus",
  },
  {
    icon: Languages,
    title: "Translation",
    description: "STEM multilingual data",
  },
  {
    icon: Cpu,
    title: "Models",
    description: "5+ NLP models released",
  },
];

const DataStreams = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Data <span className="text-primary">Streams</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streams.map((stream) => (
            <Card
              key={stream.title}
              className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] group cursor-pointer"
            >
              <stream.icon className="h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">{stream.title}</h3>
              <p className="text-muted-foreground text-sm">{stream.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataStreams;
