"use client";

import Navbar from "./Navbar";
import SocialLinks from "./SocialLinks";
import FadeIn from "./FadeIn";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function HeroSection() {
  const { profile } = usePortfolio();

  return (
    <section id="home" className="h-screen scroll-mt-20 flex flex-col overflow-hidden relative">
      <div className="flex flex-col flex-1 px-5 sm:px-8 md:px-10 relative z-0">
        <FadeIn delay={0} y={-20}>
          <Navbar />
        </FadeIn>

        <div className="flex-1 flex items-center justify-center">
          <FadeIn delay={0.15} y={40} className="overflow-hidden">
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight whitespace-nowrap text-center"
              style={{ fontSize: "clamp(3rem, 14vw, 14.5rem)" }}
            >
              Hi, i&apos;m {profile.shortName}
            </h1>
          </FadeIn>
        </div>

        <div className="relative flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              {profile.tagline}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.5}
            y={20}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 sm:static sm:translate-x-0"
          >
            <SocialLinks />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
