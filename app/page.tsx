import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import WorkSection from "@/components/WorkSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import ClosingCTA from "@/components/ClosingCTA";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Statement />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}
