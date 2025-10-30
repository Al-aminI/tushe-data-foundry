import Hero from "@/components/Hero";
import DataStreams from "@/components/DataStreams";
import Community from "@/components/Community";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DataStreams />
      <Community />
      <Impact />
      <Footer />
    </div>
  );
};

export default Index;
