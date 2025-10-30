import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Pillars from "@/components/Pillars";
import CommunityImpact from "@/components/CommunityImpact";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <Pillars />
      <CommunityImpact />
      <CallToAction />
    </div>
  );
};

export default Index;
