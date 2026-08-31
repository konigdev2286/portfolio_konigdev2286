"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { Send, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    username: "@konigdev2286",
    href: "https://github.com/konigdev2286",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
    ),
    color: "#FFFFFF",
  },
  {
    label: "LinkedIn",
    username: "Esdras Thychel MBOULOUKOUE",
    href: "https://www.linkedin.com/in/esdras-thychel-mbouloukoue-07168a400?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    ),
    color: "#0A66C2",
  },
  {
    label: "TikTok",
    username: "@konig.dev22",
    href: "https://www.tiktok.com/@konig.dev22?_r=1&_t=ZS-99KcRBwitls",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.76 1.52V7.08a4.85 4.85 0 01-1-.39z" />
      </svg>
    ),
    color: "#FF0050",
  },
  {
    label: "Instagram",
    username: "@konig.dev22",
    href: "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=1156u5jf",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
      </svg>
    ),
    color: "#E1306C",
  },
  {
    label: "Email",
    username: "konigdev2286@gmail.com",
    href: "mailto:konigdev2286@gmail.com",
    icon: <Mail size={20} />,
    color: "#E01E28",
  },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <SectionWrapper id="contact" className="border-t border-[#111]">
      <SectionHeading
        label="// contact.ts"
        title="On discute ?"
        subtitle="Un projet, une idée, ou juste envie d'échanger — je lis mes messages."
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name & Email row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-xs text-[#B3B3B3] font-mono block"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  Nom *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded bg-[#111] border border-[#1E1E1E] text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#E01E28] transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-xs text-[#B3B3B3] font-mono block"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@exemple.com"
                  className="w-full px-4 py-3 rounded bg-[#111] border border-[#1E1E1E] text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#E01E28] transition-colors duration-200"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label
                htmlFor="contact-subject"
                className="text-xs text-[#B3B3B3] font-mono block"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Sujet
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Projet freelance, collaboration..."
                className="w-full px-4 py-3 rounded bg-[#111] border border-[#1E1E1E] text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#E01E28] transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-xs text-[#B3B3B3] font-mono block"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Décrivez votre projet ou votre question..."
                className="w-full px-4 py-3 rounded bg-[#111] border border-[#1E1E1E] text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#E01E28] transition-colors duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "sending" || status === "success"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded font-semibold text-sm transition-all duration-300 ${status === "success"
                ? "bg-green-600 text-white"
                : status === "sending"
                  ? "bg-[#E01E28]/60 text-white cursor-not-allowed"
                  : "bg-[#E01E28] text-white hover:bg-[#FF3040] hover:shadow-[0_0_30px_rgba(224,30,40,0.4)]"
                }`}
            >
              {status === "sending" ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Envoi...</span>
                </>
              ) : status === "success" ? (
                <>
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Message envoyé !</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Envoyer le message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Right: Social Links + Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Quick info */}
          <div className="p-6 rounded border border-[#1E1E1E] bg-[#111]">
            <h3
              className="text-white font-bold mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              T&apos;as un projet ? On en parle.
            </h3>
            <p className="text-[#B3B3B3] text-sm leading-relaxed mb-4">
              Je suis dispo pour du freelance, des collaborations à distance, ou
              juste un échange entre devs. Pas de template de réponse ici.
            </p>
            <div className="space-y-2">
              {[
                { label: "Dispo", value: "Freelance / Remote" },
                { label: "Localisation", value: "Brazzaville, Congo 🇨🇬" },
                { label: "Langues", value: "Français (native), Anglais (pro)" },
                { label: "Réponse", value: "En général dans la journée" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 text-sm">
                  <span className="text-[#E01E28] font-mono text-xs mt-0.5" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    →
                  </span>
                  <span>
                    <span className="text-[#666]">{item.label} : </span>
                    <span className="text-white">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <h3
              className="text-[#B3B3B3] text-xs font-mono uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Réseaux sociaux
            </h3>
            <div className="space-y-3">
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3 rounded border border-[#1E1E1E] bg-[#0D0D0D] hover:border-[#E01E28]/40 transition-all duration-200 group"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded bg-[#111] text-[#B3B3B3] group-hover:text-white transition-colors"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{social.label}</p>
                    <p className="text-[#666] text-xs">{social.username}</p>
                  </div>
                  <svg
                    className="ml-auto w-4 h-4 text-[#333] group-hover:text-[#E01E28] transition-colors"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
