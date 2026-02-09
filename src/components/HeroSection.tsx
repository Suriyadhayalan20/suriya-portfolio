import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            {/* <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border">
              👋 Hello, I'm Suriya
            </span> */}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Frontend Engineer</span>
            <br />
            <span className="text-foreground">React & Next.js Expert</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 mx-auto"
          >
            I build fast, scalable, pixel-perfect web applications from Figma designs using React, Next.js, Redux, REST APIs, and modern frontend architecture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="rounded-full gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity" asChild>
              <a href="#projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full gap-2" asChild>
              <a href="#contact">
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full gap-2" asChild>
              <a href="/Suriya_Resume.pdf" download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text">2.5+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text">10+</div>
              <div className="text-sm text-muted-foreground mt-1">Production Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Pixel-Perfect UI Specialist</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};