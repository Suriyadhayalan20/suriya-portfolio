 import { motion } from "framer-motion";
 import { useInView } from "framer-motion";
 import { useRef } from "react";
 import { GraduationCap, Award, Calendar } from "lucide-react";
 
 export const EducationSection = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   return (
     <section id="education" className="py-24 relative">
       <div className="container mx-auto px-4">
         <div className="text-center mb-12">
           <span className="text-primary font-medium">Education & Learning</span>
           <h2 className="section-heading mt-2">Education & Certifications</h2>
         </div>
 
         <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
         >
           {/* Education Card */}
           <div className="glass-card p-6 rounded-xl">
             <div className="flex items-start gap-4">
               <div className="p-3 rounded-xl bg-gradient-primary">
                 <GraduationCap className="h-6 w-6 text-primary-foreground" />
               </div>
               <div>
                 <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                   Bachelor of Computer Application
                 </h3>
                 <p className="text-muted-foreground mb-2">
                   Kumararani Meena Muthiah College
                 </p>
                 <div className="flex items-center gap-4 text-sm">
                   <span className="flex items-center gap-1 text-primary font-medium">
                     <Award className="h-4 w-4" />
                     80% Score
                   </span>
                 </div>
               </div>
             </div>
           </div>
 
           {/* Certification Card */}
           <div className="glass-card p-6 rounded-xl">
             <div className="flex items-start gap-4">
               <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary">
                 <Award className="h-6 w-6 text-primary-foreground" />
               </div>
               <div>
                 <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                   Frontend Development with React JS
                 </h3>
                 <p className="text-muted-foreground mb-2">
                   Besant Technologies
                 </p>
                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
                   <Calendar className="h-4 w-4" />
                   Professional Certification
                 </div>
               </div>
             </div>
           </div>
         </motion.div>
       </div>
     </section>
   );
 };