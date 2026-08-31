import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <HeroSection />

      {/* Separator */}
      <div className="relative h-px max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E01E28]/30 to-transparent" />
      </div>

      <AboutSection />

      <div className="relative h-px max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E01E28]/20 to-transparent" />
      </div>

      <SkillsSection />

      <div className="relative h-px max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E01E28]/20 to-transparent" />
      </div>

      <ProjectsSection />

      <div className="relative h-px max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E01E28]/20 to-transparent" />
      </div>

      <RoadmapSection />

      <div className="relative h-px max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E01E28]/20 to-transparent" />
      </div>

      <ContactSection />
      <Footer />
    </main>
  );
}
