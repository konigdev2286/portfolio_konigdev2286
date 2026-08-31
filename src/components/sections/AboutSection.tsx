"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { Code2, Cpu, MapPin, Zap } from "lucide-react";

const STATS = [
  { value: "3+", label: "Années de code" },
  { value: "70%", label: "Apprentissage par le faire" },
  { value: "0€", label: "Formation en ligne" },
  { value: "🇨🇬", label: "Made in Congo" },
];

const HIGHLIGHTS = [
  {
    icon: <MapPin size={18} className="text-[#E01E28]" />,
    title: "Brazzaville & Pointe-Noire",
    desc: "Congo-Brazzaville",
  },
  {
    icon: <Code2 size={18} className="text-[#E01E28]" />,
    title: "Développeur autodidacte",
    desc: "Self-taught developer",
  },
  {
    icon: <Cpu size={18} className="text-[#E01E28]" />,
    title: "Focus IA & Produits",
    desc: "AI-first product builder",
  },
  {
    icon: <Zap size={18} className="text-[#E01E28]" />,
    title: "70% pratique / 30% théorie",
    desc: "Philosophie d'apprentissage",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          <SectionHeading
            label="// about_me.ts"
            title="Mon parcours"
            subtitle="De Brazzaville au code — une histoire d'apprentissage constant."
          />

          <div className="space-y-5 text-[#B3B3B3] leading-relaxed">
            <p>
              Je m&apos;appelle{" "}
              <span className="text-white font-semibold">Esdras Thychel MBOULOUKOUE</span>,
              développeur Full-Stack & IA basé à Brazzaville. J&apos;ai tout appris
              seul — pas de BTS, pas de licence, juste des projets ratables
              et la ténacité d&apos;y revenir le lendemain.
            </p>
            <p>
              Ma méthode :{" "}
              <span className="text-[#E01E28] font-semibold">construire d&apos;abord</span>,
              comprendre ensuite. Chaque projet que j&apos;ai livré m&apos;a appris
              plus qu&apos;une année de cours théoriques.
            </p>
            <p>
              Ce qui me motive : créer des outils IA concrets pour l&apos;Afrique
              francophone. Des produits qui fonctionnent avec les{" "}
              <span className="text-white">APIs mobile money</span>, qui parlent
              français, et qui répondent à de vrais problèmes locaux.
            </p>
            <p>
              Aujourd&apos;hui je travaille principalement avec{" "}
              <span className="text-white">Next.js, Flutter et Supabase</span>, et
              je plonge sérieusement dans l&apos;ingénierie IA (LLMs, RAG, agents).
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded border border-[#1E1E1E] bg-[#111] hover:border-[#E01E28]/40 transition-colors duration-300"
              >
                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-[#666] text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Stats & Terminal */}
        <div className="space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded border border-[#1E1E1E] bg-[#111] text-center hover:border-[#E01E28]/40 transition-all duration-300 group"
              >
                <p
                  className="text-4xl font-bold text-[#E01E28] group-hover:scale-110 transition-transform duration-300 inline-block"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#B3B3B3] text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="rounded border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1E1E] bg-[#111]">
              <div className="w-3 h-3 rounded-full bg-[#E01E28]" />
              <div className="w-3 h-3 rounded-full bg-[#FF6B35] opacity-60" />
              <div className="w-3 h-3 rounded-full bg-[#333]" />
              <span
                className="ml-2 text-xs text-[#666] font-mono"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                about.json
              </span>
            </div>
            {/* Terminal body */}
            <div
              className="p-5 text-sm font-mono leading-7"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              <p className="text-[#666]">{"{"}</p>
              <p className="pl-4">
                <span className="text-[#E01E28]">&quot;name&quot;</span>
                <span className="text-[#666]">: </span>
                <span className="text-[#B3B3B3]">&quot;Esdras Thychel MBOULOUKOUE&quot;</span>
                <span className="text-[#666]">,</span>
              </p>
              <p className="pl-4">
                <span className="text-[#E01E28]">&quot;role&quot;</span>
                <span className="text-[#666]">: </span>
                <span className="text-[#B3B3B3]">&quot;Full-Stack & AI Developer&quot;</span>
                <span className="text-[#666]">,</span>
              </p>
              <p className="pl-4">
                <span className="text-[#E01E28]">&quot;location&quot;</span>
                <span className="text-[#666]">: </span>
                <span className="text-[#B3B3B3]">&quot;Brazzaville, Congo 🇨🇬&quot;</span>
                <span className="text-[#666]">,</span>
              </p>
              <p className="pl-4">
                <span className="text-[#E01E28]">&quot;learning&quot;</span>
                <span className="text-[#666]">: </span>
                <span className="text-[#B3B3B3]">&quot;AI Engineering&quot;</span>
                <span className="text-[#666]">,</span>
              </p>
              <p className="pl-4">
                <span className="text-[#B3B3B3]">"philosophy"</span>
                <span className="text-[#666]">: </span>
                <span className="text-[#B3B3B3]">&quot;Ship it. Fix it. Improve it.&quot;</span>
              </p>
              <p className="text-[#666]">{"}"}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
