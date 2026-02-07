import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Frontend Engineer",
    company: "Crayon Biz LLP",
    period: "Dec 2025 – Present",
    description: [
      "Building scalable UIs using React.js, Next.js, and Tailwind CSS",
      "Converting complex Figma designs into pixel-perfect, responsive interfaces",
      "Integrating REST APIs, forms, and dynamic data rendering",
      "Improving performance, SEO structure, and cross-device compatibility",
    ],
    projects: [
      { name: "Atna AI (Product Interface)", link: "https://atna.ai/" },
      { name: "SolvStrat (Corporate Website)", link: "https://solvstrat.com/" },
      { name: "GRB (Brand Website)", link: "https://grbdairyfood.com/" }
    ],
    isCurrent: true,
  },
  {
    title: "Junior Web Developer",
    company: "iSource ITES Pvt Ltd",
    period: "Nov 2023 – Nov 2025",
    description: [
      "Developed responsive user interfaces using HTML, CSS,JavaScript and React js",
      "Converted Figma and design mockups into pixel-perfect web pages",
      "Built reusable UI sections and maintained consistent design across pages",
      "Optimized website performance, responsiveness, and cross-browser compatibility",
    ],
    projects: [],
    isCurrent: false,
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium">My journey</span>
          <h2 className="section-heading mt-2">Professional Experience</h2>
        </div>

        <div ref={ref} className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

              {/* Timeline dot */}
              <div className={`absolute left-0 top-0 w-2 h-2 rounded-full -translate-x-1/2 ${exp.isCurrent ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground"
                }`} />

              <div className="glass-card p-6 rounded-xl ml-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Building2 className="h-4 w-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    <Calendar className="h-3 w-3" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-muted-foreground">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.projects.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-sm font-medium text-foreground mb-2">Key Projects:</div>
                    <div className="flex flex-wrap gap-2">
                      {exp.projects.map((project: any) => (
                        project.link ? (
                          <a
                            key={project.name}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1 hover:bg-primary/20 transition-colors"
                          >
                            {project.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span
                            key={project.name || project}
                            className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1"
                          >
                            {project.name || project}
                            <ExternalLink className="h-3 w-3" />
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};