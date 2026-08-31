"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1E1E1E] bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span
              className="text-[#E01E28] font-mono font-bold text-sm"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              &lt;KONIG.DEV /&gt;
            </span>
            <span className="text-[#444] text-sm">
              Esdras Thychel MBOULOUKOUE
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm text-[#666]">
            <span className="w-2 h-2 rounded-full bg-[#E01E28] pulse-red" />
            <span className="font-mono text-xs" style={{ fontFamily: "var(--font-jetbrains)" }}>
              Brazzaville, Congo 🇨🇬
            </span>
          </div>

          {/* Copyright & Admin Link */}
          <div className="flex items-center gap-3">
            <p className="text-[#444] text-xs font-mono" style={{ fontFamily: "var(--font-jetbrains)" }}>
              © {year} — Built with{" "}
              <span className="text-[#E01E28]">♥</span>{" "}
              & Next.js
            </p>
            <span className="text-[#222]">|</span>
            <Link
              href="/admin"
              className="text-[#444] hover:text-[#888] text-[11px] font-mono transition-colors"
            >
              admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
