import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "suriyadhayalan2001@gmail.com",
    href: "mailto:suriyadhayalan2001@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7397288546",
    href: "tel:+917397288546",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Chennai, India",
    href: "#",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Suriya Dhayalan",
    href: "https://linkedin.com/in/suriyadhayalan",
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg("");
    setIsError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        setStatusMsg("✅ Message sent successfully! Check your email ✨");
        setForm({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setIsSubmitted(false);
          setStatusMsg("");
        }, 4000);
      } else {
        setIsError(true);
        setStatusMsg("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      setIsError(true);
      setStatusMsg("❌ Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium">Get in touch</span>
          <h2 className="section-heading mt-2">Contact Me</h2>
          <p className="section-subheading mx-auto">
            Open to frontend roles, freelance work, and collaboration.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-display font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-xl font-display font-semibold mb-6">
              Send me a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary border-border focus:border-primary"
                  required
                />

                <Input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-secondary border-border focus:border-primary"
                  required
                />
              </div>

              <Input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="bg-secondary border-border focus:border-primary"
                required
              />

              <Textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-secondary border-border focus:border-primary min-h-[120px] resize-none"
                required
              />

              <Button
                type="submit"
                className="w-full rounded-lg gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Inquiry
                  </>
                )}
              </Button>

              {/* Status Message */}
              {statusMsg && (
                <p
                  className={`text-sm mt-3 text-center font-medium transition-all duration-300 ${isError ? "text-red-500" : "text-green-500"
                    }`}
                >
                  {statusMsg}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
