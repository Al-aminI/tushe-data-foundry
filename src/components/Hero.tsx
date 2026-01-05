import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
import heroNetwork from "@/assets/hero-root-network.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { isHausa, language, setLanguage } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center glow-gold">
              <span className="text-primary-foreground font-bold text-lg sm:text-xl">T</span>
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl text-gradient-gold">Tushe</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#mission" className="text-sm text-secondary/80 hover:text-secondary transition-colors">
              {isHausa ? "Manufa" : "Mission"}
            </a>
            <a href="#pillars" className="text-sm text-secondary/80 hover:text-secondary transition-colors">
              {isHausa ? "Ginshiƙai" : "Pillars"}
            </a>
            <a href="#impact" className="text-sm text-secondary/80 hover:text-secondary transition-colors">
              {isHausa ? "Tasiri" : "Impact"}
            </a>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ha" : "en")}
              className="gap-1.5 text-secondary/80 hover:text-secondary h-8 sm:h-9 px-2 sm:px-3"
            >
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{isHausa ? "EN" : "HA"}</span>
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-secondary/80 hover:text-secondary h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm">
                {isHausa ? "Shiga" : "Login"}
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-gold h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm">
                {isHausa ? "Yi Rajista" : "Register"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

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
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 tracking-tight">
          Tushe
        </h1>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold mb-8 text-gradient-gold">
          {isHausa ? "Tushen Hankali na Hausa" : "The Foundation of Hausa Intelligence"}
        </h2>
        
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-12 font-light">
          {isHausa 
            ? "Gina bayanan tushe, ilimi, da hankali don AI na Hausa"
            : "Building the foundational datasets, knowledge, and intelligence for Hausa AI"
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://discord.gg/VRxBxgYCs8" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground glow-green group font-semibold px-8 py-6 text-lg"
            >
              {isHausa ? "Shiga Al'umma" : "Join the Community"}
            </Button>
          </a>
          <Link to="/login">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg"
            >
              {isHausa ? "Fara Gudummawa" : "Start Contributing"}
            </Button>
          </Link>
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
