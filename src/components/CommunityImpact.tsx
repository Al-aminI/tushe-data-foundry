import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const metrics = [
  { icon: Users, value: "120K+", label: "Speech Samples Collected" },
  { icon: TrendingUp, value: "5+", label: "NLP Models Released" },
  { icon: Globe, value: "20+", label: "Universities Collaborating" },
];

const CommunityImpact = () => {
  const { isHausa } = useLanguage();

  return (
    <section id="impact" className="py-32 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-accent">
            Harshe. Bayanai. Hankali.
          </h2>
          <p className="text-2xl md:text-3xl font-light text-secondary mb-4">
            Language. Data. Intelligence.
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {isHausa 
              ? "Ku shiga tare da masu kirkira da masu harshe waɗanda ke gina makomar AI na Hausa. Daga Najeriya zuwa duk faɗin Afirka, muryoyin sun haɗu don tsara fasaha da ke fahimtar mu."
              : "Join a growing movement of innovators and linguists building the future of Hausa AI. From Nigeria to all over Africa, voices unite to shape technology that understands us."
            }
          </p>
          
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground glow-green font-semibold px-8 py-6 text-lg"
            >
              {isHausa ? "Zama Mai Gudummawa" : "Become a Contributor"}
            </Button>
          </Link>
        </div>
        
        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mt-20">
          {metrics.map((metric) => (
            <div key={metric.label} className="relative">
              <metric.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-5xl md:text-6xl font-display font-bold text-gradient-gold mb-3">
                {metric.value}
              </div>
              <div className="text-muted-foreground text-lg">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
