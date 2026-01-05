import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { isHausa } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-32 h-32 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 glow-gold">
          <span className="text-6xl font-bold text-primary">404</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {isHausa ? "Ba a samu shafin ba" : "Page Not Found"}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {isHausa 
            ? "Shafin da kuke nema ba ya nan. Watakila an motsa shi ko an share shi."
            : "The page you're looking for doesn't exist. It might have been moved or deleted."
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="gap-2 glow-gold">
              <Home className="w-4 h-4" />
              {isHausa ? "Gida" : "Go Home"}
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {isHausa ? "Koma Baya" : "Go Back"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
