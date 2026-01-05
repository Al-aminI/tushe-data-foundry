import { useLanguage } from "@/contexts/LanguageContext";

const Mission = () => {
  const { isHausa } = useLanguage();

  return (
    <section id="mission" className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-primary">
              {isHausa ? "Tushe: Inda Bayanai Ke Zama Fahimta" : "Tushe: Where Data Becomes Understanding"}
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              {isHausa 
                ? "Tushe shine tushen bayanai da al'umma ke gudanarwa wanda aka sadaukar don gina, inganta, da raba bayanan harshen Hausa - daga magana zuwa rubutu, fassara, da sauransu."
                : "Tushe is a community-driven data foundry dedicated to building, refining, and democratizing Hausa language datasets — from speech to text, translation, and beyond."
              }
            </p>
            
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {isHausa 
                ? "Muna nufin ƙirƙirar tushe don samfuran AI na Hausa waɗanda ke fahimta, magana, da tunani kamar mu."
                : "We aim to create the foundation for Hausa AI models that understand, speak, and think like us."
              }
            </p>
          </div>
          
          <div className="relative h-[400px] flex items-center justify-center">
            {/* Abstract Data Flow Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/20 border-2 border-primary glow-gold animate-pulse" />
                
                {/* Orbiting Nodes */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 animate-float"
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-120px)`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/30 border-2 border-accent glow-green" />
                  </div>
                ))}
                
                {/* Connection Lines */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={`line-${i}`}
                    className="absolute top-1/2 left-1/2 w-[120px] h-[2px] bg-gradient-to-r from-primary/50 to-accent/50 origin-left"
                    style={{
                      transform: `rotate(${i * 90}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
