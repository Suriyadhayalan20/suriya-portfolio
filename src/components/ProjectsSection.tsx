import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Atna AI",
    subtitle: "Product Interface",
    description: "Engineered reusable React components for an AI product platform with dynamic data rendering and scalable architecture.",
    tech: ["React", "Next.js", "Tailwind CSS", "API Integration"],
    gradient: "from-indigo-500 to-purple-600",
    link: "https://atna.ai/",
  },
  {
    title: "SolvStrat",
    subtitle: "Corporate Website",
    description: "Delivered a clean, responsive corporate website with optimized SEO structure and seamless user experience.",
    tech: ["Next.js", "Tailwind CSS", "SEO", "Responsive Design"],
    gradient: "from-blue-500 to-cyan-500",
    link: "https://solvstrat.com/",
  },
  {
    title: "GRB",
    subtitle: "Brand Website",
    description: "Translated Figma designs into a pixel-perfect, responsive brand website with smooth animations and layout precision.",
    tech: ["React", "Tailwind CSS", "Figma", "Animation"],
    gradient: "from-emerald-500 to-teal-500",
    link: "https://grbdairyfood.com/",
  },
  {
    title: "Billing Paradise",
    subtitle: "Healthcare RCM Platform",
    description: "Developed complex responsive UI for a healthcare CRM with dynamic forms and data-driven interfaces.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    gradient: "from-rose-500 to-pink-500",
    link: "https://www.billingparadise.com/",
  },
  // {
  //   title: "CaptioningStar",
  //   subtitle: "Accessibility Services",
  //   description: "Developed accessibility-focused website for captioning services with WCAG compliance and responsive design.",
  //   tech: ["WordPress", "CSS3", "Accessibility", "SEO"],
  //   gradient: "from-amber-500 to-orange-500",
  // },
  // {
  //   title: "BehavioralProz",
  //   subtitle: "Therapy Platform",
  //   description: "Created therapy services platform with intuitive UI, appointment booking, and responsive patient portal.",
  //   tech: ["HTML5", "Bootstrap", "JavaScript", "Responsive"],
  //   gradient: "from-violet-500 to-purple-500",
  // },
  {
    title: "Whitespace Health",
    subtitle: "Healthcare Platform",
    description: "Built a performance-optimized healthcare web platform with mobile-first layout and clean component structure.",
    tech: ["WordPress", "CSS3", "Performance", "SEO"],
    gradient: "from-sky-500 to-blue-500",
    link: "https://whitespacehealth.com/",
  },
  {
    title: "BUsoft Tech",
    subtitle: "Corporate Website",
    description: "Customized and optimized a WordPress corporate website with improved performance and SEO best practices.",
    tech: ["WordPress", "PHP", "CSS3", "SEO"],
    gradient: "from-fuchsia-500 to-pink-500",
    link: "https://busofttech.com/",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium">My work</span>
          <h2 className="section-heading mt-2">Key Projects</h2>
          <p className="section-subheading mx-auto">
          Production projects built using React, Next.js, Redux, REST APIs, and deployed via Vercel and Hostinger.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="glass-card p-6 rounded-xl h-full flex flex-col overflow-hidden">
                {/* Gradient Header */}
                <div className={`h-2 w-full bg-gradient-to-r ${project.gradient} rounded-t-xl absolute top-0 left-0 right-0`} />

                <div className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-gradient-to-br ${project.gradient} opacity-80 hover:opacity-100 transition-opacity`}
                      >
                        <Code className="h-4 w-4 text-white" />
                      </a>
                    ) : (
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${project.gradient} opacity-80`}>
                        <Code className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-full justify-center gap-2 mt-auto group-hover:bg-primary/10"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <span>View Project</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center gap-2 mt-auto group-hover:bg-primary/10"
                    >
                      <span>View Project</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};