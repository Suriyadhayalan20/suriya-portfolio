import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Get to know me</span>
            <h2 className="section-heading mt-2">About Me</h2>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium text-foreground">Chennai, India</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                  <div className="font-medium text-foreground">2.5+ Years</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Degree</div>
                  <div className="font-medium text-foreground">BCA (80%)</div>
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Frontend Engineer with <span className="text-foreground font-medium">2.5 years of experience</span> building scalable web applications using{" "}
              <span className="text-primary font-medium">React JS</span>,{" "}
              <span className="text-primary font-medium">Next JS</span>, and{" "}
              <span className="text-primary font-medium">Tailwind CSS</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4 mb-8">
              Specialized in translating Figma designs into pixel-perfect, responsive interfaces and optimizing performance for real-world products.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Reusable component architecture",
                "Pixel-perfect Figma to code conversion",
                "Performance optimization & clean code",
                "Product UI & brand website experience",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};