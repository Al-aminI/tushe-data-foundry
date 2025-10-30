import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Community = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <Users className="h-16 w-16 text-primary mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Powered by <span className="text-primary">Community</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thousands of voices from Kano to Niamey, shaping the future of Hausa AI
          </p>
          
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Become a Contributor
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Community;
