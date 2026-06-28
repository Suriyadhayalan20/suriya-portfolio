"use client";

import FadeIn from "./FadeIn";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function ServicesSection() {
  const { skills } = usePortfolio();

  return (
    <section
      id="skills"
      className="scroll-mt-20 flex flex-col px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase leading-none tracking-tight text-center w-full mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)", color: "#0C0C0C" }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="flex flex-col w-full items-center">
        {skills.categories.map((category, i) => {
          const number = String(i + 1).padStart(2, "0");

          return (
            <FadeIn key={category.name} delay={i * 0.1} y={30} className="flex flex-col items-center w-full max-w-5xl">
              {i > 0 && <div className="w-full" style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }} />}
              <div className="flex items-start gap-6 sm:gap-8 md:gap-10 py-8 sm:py-10 md:py-12 w-full">
                <span
                  className="font-black uppercase leading-none flex-shrink-0"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)", color: "#0C0C0C" }}
                >
                  {number}
                </span>

                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-1">
                  <span
                    className="font-medium uppercase"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)", color: "#0C0C0C" }}
                  >
                    {category.name}
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-4 py-1.5 text-sm sm:text-base"
                        style={{ borderColor: "rgba(12,12,12,0.2)", color: "#0C0C0C" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
