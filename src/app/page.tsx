"use client";

import HeroSection from "@/components/arvind/HeroSection";
import MarqueeSection from "@/components/arvind/MarqueeSection";
import AboutSection from "@/components/arvind/AboutSection";
import ExperienceSection from "@/components/arvind/ExperienceSection";
import ServicesSection from "@/components/arvind/ServicesSection";
import ProjectsSection from "@/components/arvind/ProjectsSection";
import EducationSection from "@/components/arvind/EducationSection";
import Footer from "@/components/arvind/Footer";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
    return (
        <main className="arvind-root" style={{ backgroundColor: "#0C0C0C", overflowX: "clip" }}>
            <HeroSection />
            <MarqueeSection />
            <AboutSection />
            <ExperienceSection />
            <ServicesSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
            <Footer />
        </main>
    );
}
