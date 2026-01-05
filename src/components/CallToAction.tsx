import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Twitter, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction = () => {
  const { isHausa } = useLanguage();

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-accent/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-glow" />
      
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-primary">
          {isHausa ? "Shirye don tsara makomar Hausa AI?" : "Ready to shape the future of Hausa AI?"}
        </h2>
        
        <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
          {isHausa 
            ? "Ku shiga tare da mu wajen gina tushen da zai ƙarfafa tsarin hankali na gaba"
            : "Join us in building the foundation that will power the next generation of intelligent systems"
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-gold font-semibold px-8 py-6 text-lg"
            >
              {isHausa ? "Fara Gudummawa" : "Start Contributing"}
            </Button>
          </Link>
          <Link to="/login">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-accent text-accent hover:bg-accent/10 font-semibold px-8 py-6 text-lg"
            >
              {isHausa ? "Shiga Yanzu" : "Sign In Now"}
            </Button>
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-wrap gap-6 justify-center text-sm mb-12">
          <a href="#careers" className="text-muted-foreground hover:text-primary transition-colors">
            Careers
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact Us
          </a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#datasets" className="text-muted-foreground hover:text-primary transition-colors">
            Datasets
          </a>
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-4 justify-center">
          <a
            href="https://x.com/tushen_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full border-2 border-primary/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all glow-gold"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5 text-primary" />
          </a>
          <a
            href="https://www.linkedin.com/in/al-amin-ibrahim-0b7293227/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full border-2 border-primary/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all glow-gold"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-primary" />
          </a>
          <a
            href="https://discord.gg/VRxBxgYCs8"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full border-2 border-primary/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all glow-gold"
            aria-label="Discord"
          >
            <MessageCircle className="h-5 w-5 text-primary" />
          </a>
          <a
            href="mailto:ibrahimalamin744@gmail.com"
            className="h-12 w-12 rounded-full border-2 border-primary/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all glow-gold"
            aria-label="Email"
          >
            <Mail className="h-5 w-5 text-primary" />
          </a>
        </div>
        
        {/* Footer Text */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-2xl font-display font-bold text-gradient-gold mb-2">Tushe</p>
          <p className="text-sm text-muted-foreground">The Foundation of Hausa Intelligence</p>
          <p className="text-xs text-muted-foreground mt-4">© 2025 Tushe. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
