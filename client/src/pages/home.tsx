import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ValueProposition from "@/components/value-proposition";

import Solutions from "@/components/solutions";
import Edapt from "@/components/edapt";
import Awards from "@/components/awards";

import Team from "@/components/team";
import News from "@/components/news";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ValueProposition />

      <Solutions />
      <Edapt />
      <Awards />

      <Team />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}
