import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroNetwork from "@/assets/hero-root-network.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroNetwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-indigo" />
      
      {/* Animated Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-root animate-glow" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 tracking-tight">
          Tushe
        </h1>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold mb-8 text-gradient-gold">
          The Foundation of Hausa Intelligence
        </h2>
        
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-12 font-light">
          Building the foundational datasets, knowledge, and intelligence for Hausa AI
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-green group font-semibold px-8 py-6 text-lg"
          >
            Join the Community
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg"
          >
            Explore Our Datasets
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
