import { Mic, FileText, Languages, Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const pillars = [
  {
    icon: Mic,
    name: "TusheSpeech",
    tagline: "Giving Voice to Hausa AI",
    description: "Comprehensive speech datasets capturing the diversity of Hausa dialects and accents.",
  },
  {
    icon: FileText,
    name: "TusheText",
    tagline: "Words That Understand",
    description: "Authentic Hausa text corpus for natural language understanding and generation.",
  },
  {
    icon: Languages,
    name: "TusheTranslate",
    tagline: "Bridging Languages",
    description: "STEM-focused multilingual translation datasets connecting Hausa to global knowledge.",
  },
  {
    icon: Cpu,
    name: "TusheModels",
    tagline: "Intelligence Built on Truth",
    description: "Open-source NLP models trained on authentic Hausa data for real-world applications.",
  },
];

const Pillars = () => {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-center mb-6 text-primary">
          Our Pillars of Intelligence
        </h2>
        
        <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          The building blocks of Hausa AI, each dedicated to a specific aspect of language intelligence
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar) => (
            <Card
              key={pillar.name}
              className="bg-card border-border hover:border-accent transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--accent)/0.3)] group cursor-pointer"
            >
              <CardHeader>
                <pillar.icon className="h-16 w-16 text-accent mb-4 transition-transform group-hover:scale-110 glow-green" />
                <CardTitle className="text-2xl font-display text-primary">{pillar.name}</CardTitle>
                
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pillar.description}</p>
                <button className="mt-4 text-accent hover:text-accent/80 transition-colors font-semibold">
                  Learn More →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
