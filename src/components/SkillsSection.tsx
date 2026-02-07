 import { motion } from "framer-motion";
 import { useInView } from "framer-motion";
 import { useRef } from "react";
 
 const skills = [
   { name: "React JS", icon: "⚛️" },
   { name: "Next JS", icon: "▲" },
   { name: "JavaScript (ES6+)", icon: "🟨" },
   { name: "TypeScript", icon: "🔷" },
   { name: "Tailwind CSS", icon: "🎨" },
   { name: "HTML5", icon: "📄" },
   { name: "CSS3", icon: "🎭" },
   { name: "Bootstrap", icon: "🅱️" },
   { name: "API Integration", icon: "🔗" },
   { name: "Git", icon: "📦" },
   { name: "Figma to Code", icon: "🖼️" },
   { name: "WordPress", icon: "📝" },
   { name: "Responsive Design", icon: "📱" },
   { name: "SEO Structure", icon: "🔍" },
   { name: "Performance Optimization", icon: "⚡" },
   { name: "Reusable Components", icon: "🧩" },
 ];
 
 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: {
       staggerChildren: 0.05,
     },
   },
 };
 
 const itemVariants = {
   hidden: { opacity: 0, scale: 0.8 },
   visible: { opacity: 1, scale: 1 },
 };
 
 export const SkillsSection = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   return (
     <section id="skills" className="py-24 relative">
       <div className="container mx-auto px-4">
         <div className="text-center mb-12">
           <span className="text-primary font-medium">What I work with</span>
           <h2 className="section-heading mt-2">Core Competencies</h2>
           <p className="section-subheading mx-auto">
             Technologies and tools I use to bring products to life
           </p>
         </div>
 
         <motion.div
           ref={ref}
           variants={containerVariants}
           initial="hidden"
           animate={isInView ? "visible" : "hidden"}
           className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
         >
           {skills.map((skill) => (
             <motion.div
               key={skill.name}
               variants={itemVariants}
               whileHover={{ scale: 1.05, y: -2 }}
               className="skill-badge flex items-center gap-2 cursor-default"
             >
               <span>{skill.icon}</span>
               <span>{skill.name}</span>
             </motion.div>
           ))}
         </motion.div>
       </div>
     </section>
   );
 };