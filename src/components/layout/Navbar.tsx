"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ["hero", "about", "skills", "projects", "roadmap", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1E1E1E]"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#hero"
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group"
          >
            <span
              className="text-[#E01E28] font-mono text-xl font-bold group-hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              &lt;
            </span>
            <span
              className="text-white font-mono font-bold text-sm tracking-wider"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              KONIG.DEV
            </span>
            <span
              className="text-[#E01E28] font-mono text-xl font-bold group-hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              /&gt;
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative text-sm font-medium transition-colors duration-200 py-1 ${isActive ? "text-white" : "text-[#B3B3B3] hover:text-white"
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E01E28]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA & Admin */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 border border-[#222] text-[#666] hover:text-[#E01E28] hover:border-[#E01E28]/40 transition-colors rounded"
              title="Espace Administrateur"
              aria-label="Espace Administrateur"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#E01E28] text-[#E01E28] text-sm font-mono hover:bg-[#E01E28] hover:text-white transition-all duration-200 rounded"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              <span>CV</span>
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0D0D0D] border-b border-[#1E1E1E] py-6 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-[#B3B3B3] hover:text-[#E01E28] text-lg font-medium transition-colors text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t border-[#1E1E1E] flex items-center justify-between">
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-mono text-[#888] hover:text-white flex items-center gap-1.5"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Admin Panel</span>
                </Link>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs border border-[#E01E28] text-[#E01E28] rounded font-mono"
                >
                  CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
