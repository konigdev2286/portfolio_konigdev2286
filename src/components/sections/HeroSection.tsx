"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const TYPEWRITER_PHRASES = [
  "je construis des choses qui marchent",
  "Next.js · Flutter · Supabase · IA",
  "autodidacte basé à Brazzaville 🇨🇬",
  "du concret, pas des slides PowerPoint",
];

function TypewriterEffect() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(timeout);
    }

    const speed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setIsPaused(true);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentPhrase.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((p) => (p + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPaused, phraseIndex]);

  return (
    <span className="text-[#E01E28]">
      {displayText}
      <span className="cursor-blink ml-0.5 text-[#E01E28]">|</span>
    </span>
  );
}

// Floating particles
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#E01E28]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const handleScrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0D0A0A] to-[#0A0A0A]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E01E28] opacity-[0.04] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E01E28] opacity-[0.03] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E01E28]/30 bg-[#E01E28]/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#E01E28] pulse-red" />
              <span
                className="text-xs text-[#B3B3B3] font-mono tracking-wider"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Disponible pour des projets
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              <span className="text-white">Esdras Thychel</span>
              <br />
              <span className="text-gradient">MBOULOUKOUE</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl font-mono min-h-[2.5rem] mb-8"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              <TypewriterEffect />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-[#B3B3B3] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Développeur full-stack & IA, entièrement autodidacte.
              Je construis des apps qui tournent en prod — pas des
              projets de démo. Côté Afrique francophone,{" "}
              <span className="text-white font-medium">mobile money, langues locales, contraintes réelles</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-3.5 bg-[#E01E28] text-white font-semibold rounded overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,30,40,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">Me contacter</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#E01E28] to-[#FF3040] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 border border-[#333] text-[#B3B3B3] hover:border-[#E01E28] hover:text-white font-semibold rounded transition-all duration-300"
              >
                <span>Télécharger CV</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v9M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                {
                  href: "https://github.com/konigdev2286",
                  label: "GitHub",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/esdras-thychel-mbouloukoue-07168a400?utm_source=share_via&utm_content=profile&utm_medium=member_android",
                  label: "LinkedIn",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  ),
                },
                {
                  href: "https://www.tiktok.com/@konig.dev22?_r=1&_t=ZS-99KcRBwitls",
                  label: "TikTok",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.76 1.52V7.08a4.85 4.85 0 01-1-.39z"/>
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=1156u5jf",
                  label: "Instagram",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0"/>
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded border border-[#222] text-[#666] hover:border-[#E01E28] hover:text-[#E01E28] transition-all duration-200 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full animated-border p-[3px] -m-[3px]">
                <div className="w-full h-full rounded-full bg-[#0A0A0A]" />
              </div>

              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full glow-red" />

              {/* Profile image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-[#E01E28]/30">
                <Image
                  src="/profile.jpg"
                  alt="Esdras Thychel MBOULOUKOUE"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                />
              </div>

              {/* Tech badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-2 -right-2 bg-[#111] border border-[#E01E28]/40 rounded px-3 py-2 glow-red-sm"
              >
                <p
                  className="text-[10px] text-[#B3B3B3] font-mono"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  const dev =
                </p>
                <p
                  className="text-xs text-[#E01E28] font-mono font-bold"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  &quot;Esdras Thychel&quot;
                </p>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -top-2 -left-2 bg-[#111] border border-[#1E1E1E] rounded px-3 py-2 flex items-center gap-2"
              >
                <span className="text-base">🇨🇬</span>
                <div>
                  <p className="text-[10px] text-[#666] font-mono" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    Based in
                  </p>
                  <p className="text-xs text-white font-medium">Brazzaville</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666] hover:text-[#E01E28] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ fontFamily: "var(--font-jetbrains)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
