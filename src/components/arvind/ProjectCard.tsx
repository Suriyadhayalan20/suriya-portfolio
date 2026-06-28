"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import LiveProjectButton from "./LiveProjectButton";

interface ProjectData {
  number: string;
  category: string;
  name: string;
  href: string;
  image: string;
  description?: string;
  highlights?: string[];
  stack?: string[];
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}

export default function ProjectCard({ project, index, totalCards, progress }: ProjectCardProps) {
  const rangeStart = index / totalCards;
  const rangeEnd = 1;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);
  const hasImage = Boolean(project.image);

  const renderPreview = (className: string, height: string) => {
    if (hasImage) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.name}
          className={`${className} w-full h-auto object-contain`}
        />
      );
    }

    return (
      <div
        className={`${className} relative flex items-end overflow-hidden border border-[#D7E2EA]/20 bg-[#111111]`}
        style={{ height }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(182,0,168,0.22),transparent_34%),linear-gradient(135deg,rgba(215,226,234,0.08),rgba(215,226,234,0.02))]" />
        <span className="relative p-5 text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base">
          {project.name}
        </span>
      </div>
    );
  };

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
          backgroundColor: "#0C0C0C",
        }}
        className="absolute w-full max-w-[1760px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-8 md:gap-10 lg:gap-14 origin-top"
      >
        {/* Left: content */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full md:w-1/2">
          <div className="flex items-start gap-6 sm:gap-8 md:gap-10">
            <span
              className="text-[#D7E2EA] font-black uppercase leading-none flex-shrink-0"
              style={{ fontSize: "clamp(3rem, 8vw, 120px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-2 sm:gap-4">
              <span
                className="text-[#D7E2EA] font-medium uppercase"
                style={{ fontSize: "clamp(1rem, 2vw, 1.9rem)" }}
              >
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-light tracking-wide"
                style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.75rem)" }}
              >
                {project.name}
              </span>
            </div>
          </div>

          {project.highlights && project.highlights.length > 0 ? (
            <ul className="flex flex-col gap-2 pl-4 text-[#D7E2EA]/70">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="list-disc font-light leading-relaxed"
                  style={{ fontSize: "clamp(0.78rem, 1.1vw, 1rem)" }}
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : project.description ? (
            <p className="font-light leading-relaxed text-[#D7E2EA]/70 text-sm sm:text-base md:text-lg">
              {project.description}
            </p>
          ) : null}

          {project.stack && project.stack.length > 0 ? (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/60 sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          {project.href ? <LiveProjectButton href={project.href} /> : null}
        </div>

        {/* Right: image */}
        <div className="w-full md:w-1/2">
          {renderPreview(
            "rounded-[30px] sm:rounded-[40px] md:rounded-[50px]",
            "clamp(220px, 50vh, 520px)"
          )}
        </div>
      </motion.div>
    </div>
  );
}
