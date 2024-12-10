import { FeaturesSection } from "@/components/layout/features";
import HeroSection from "@/components/layout/hero-section";
import ServiceDemos from "@/components/layout/service-demo";
import { ServicesSection } from "@/components/layout/services";
import { SiteFooter } from "@/components/layout/site-footer";
import TechStack from "@/components/layout/tech-stack";
import { TestimonialsSection } from "@/components/layout/testimonials";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <ServiceDemos />
      <TechStack />
      <TestimonialsSection />
      <SiteFooter />
    </main>
  );
}
