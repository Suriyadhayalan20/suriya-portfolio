"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from "lucide-react";

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

const fieldClass =
  "w-full rounded-2xl border border-[#D7E2EA]/20 bg-[#111111] px-5 py-4 text-sm sm:text-base text-[#D7E2EA] placeholder:text-[#D7E2EA]/40 outline-none transition-colors duration-200 focus:border-[#D7E2EA]/60";

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
    <section
      id="contact"
      className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
      style={{ backgroundColor: "#0C0C0C" }}
    >
      <div className="flex flex-col items-center pb-16 sm:pb-20 md:pb-24">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center w-full"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Contact
        </h2>
        <p className="mt-6 max-w-2xl text-center text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base md:text-lg">
          Looking for a React / Next.js developer who understands APIs, Redux state
          management, and production deployments? Let&apos;s connect.
        </p>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto grid w-full max-w-5xl gap-6 md:gap-8 lg:grid-cols-2"
      >
        {/* Contact Info */}
        <div className="rounded-[30px] border border-[#D7E2EA]/20 p-6 sm:p-8 md:rounded-[40px]">
          <h3 className="text-lg font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-xl">
            Contact Information
          </h3>
          <div className="mt-6 flex flex-col gap-3">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-colors duration-200 hover:border-[#D7E2EA]/20 hover:bg-[#111111]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/45">
                    {item.label}
                  </span>
                  <span className="font-medium text-[#D7E2EA] transition-opacity duration-200 group-hover:opacity-80">
                    {item.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-[30px] border border-[#D7E2EA]/20 p-6 sm:p-8 md:rounded-[40px]">
          <h3 className="text-lg font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-xl">
            Send me a message
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={fieldClass}
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={fieldClass}
                required
              />
            </div>

            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={fieldClass}
              required
            />

            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${fieldClass} min-h-[140px] resize-none`}
              required
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D7E2EA] bg-[#D7E2EA] px-6 py-4 text-sm font-medium uppercase tracking-widest text-[#0C0C0C] transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
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
            </button>

            {/* Status Message */}
            {statusMsg && (
              <p
                className={`mt-1 text-center text-sm font-medium transition-all duration-300 ${
                  isError ? "text-red-400" : "text-green-400"
                }`}
              >
                {statusMsg}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
};
