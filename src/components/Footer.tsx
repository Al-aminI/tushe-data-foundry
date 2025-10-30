import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gradient-gold mb-2">Tushe</h3>
            <p className="text-sm text-muted-foreground">
              The Foundation of Hausa Intelligence
            </p>
          </div>
          
          <nav className="flex gap-8 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#datasets" className="text-muted-foreground hover:text-primary transition-colors">
              Datasets
            </a>
            <a href="#join" className="text-muted-foreground hover:text-primary transition-colors">
              Join
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="flex gap-4">
            <a
              href="#"
              className="h-10 w-10 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
