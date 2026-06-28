"use client";

import { useEffect, useRef } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function MarqueeSection() {
  const { skills } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Flatten every skill into one list, then split across two rows.
  const allSkills = skills.categories.flatMap((category) => category.items);
  const half = Math.ceil(allSkills.length / 2);
  const ROW_1 = allSkills.slice(0, half);
  const ROW_2 = allSkills.slice(half);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrolled = window.scrollY - sectionTop + window.innerHeight;
      const offset = scrolled * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPill = (label: string, i: number) => (
    <span
      key={`${label}-${i}`}
      className="flex-shrink-0 rounded-full border border-[#D7E2EA]/25 px-6 py-3 sm:px-8 sm:py-4 font-medium uppercase tracking-wide text-[#D7E2EA] whitespace-nowrap"
      style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.6rem)" }}
    >
      {label}
    </span>
  );

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ backgroundColor: "#0C0C0C" }}
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="overflow-hidden w-full">
          <div
            ref={row1Ref}
            className="flex gap-4 sm:gap-5"
            style={{ willChange: "transform", transform: "translateX(-200px)" }}
          >
            {[...ROW_1, ...ROW_1, ...ROW_1].map(renderPill)}
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <div
            ref={row2Ref}
            className="flex gap-4 sm:gap-5"
            style={{ willChange: "transform", transform: "translateX(200px)" }}
          >
            {[...ROW_2, ...ROW_2, ...ROW_2].map(renderPill)}
          </div>
        </div>
      </div>
    </section>
  );
}
