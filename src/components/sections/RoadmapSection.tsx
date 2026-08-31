"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { BookOpen, Target, Rocket, Clock } from "lucide-react";

const ROADMAP_ITEMS = [
  {
    id: 1,
    status: "current",
    phase: "Phase actuelle",
    title: "Ingénierie IA — Deep dive",
    description:
      "Je creuse sérieusement : LLMs, RAG, agents autonomes, fine-tuning, LangChain/LangGraph. Pas pour mettre ça sur un CV — pour construire des produits IA qui tournent vraiment.",
    tech: ["LangChain", "LangGraph", "RAG", "Vector DBs", "Python"],
    icon: <BookOpen size={20} className="text-[#E01E28]" />,
    timeframe: "En cours — 2026",
  },
  {
    id: 2,
    status: "next",
    phase: "Prochaine étape",
    title: "Agents IA pour l'Afrique francophone",
    description:
      "Construire des agents IA utiles localement : assistant mobile money, chatbots en français adapté au contexte africain, automatisation de processus métier sans cloud à 10$/mois.",
    tech: ["Multi-agents", "Mobile Money", "n8n", "Supabase", "Langues locales"],
    icon: <Target size={20} className="text-[#B3B3B3]" />,
    timeframe: "Q4 2026",
  },
  {
    id: 3,
    status: "planned",
    phase: "Vision",
    title: "Premier SaaS IA — lancement",
    description:
      "Un vrai produit, payant, sur le marché africain. Avec des prix adaptés au pouvoir d'achat local et une intégration mobile money native.",
    tech: ["SaaS", "Next.js", "Supabase", "IA générative", "Mobile Money"],
    icon: <Rocket size={20} className="text-[#666]" />,
    timeframe: "2027",
  },
];

const STATUS_CONFIG = {
  current: {
    dot: "bg-[#E01E28] pulse-red",
    border: "border-[#E01E28]/40",
    bg: "bg-[#E01E28]/5",
    badge: "bg-[#E01E28]/10 text-[#E01E28] border border-[#E01E28]/30",
    label: "EN COURS",
  },
  next: {
    dot: "bg-[#FF6B35]",
    border: "border-[#FF6B35]/20",
    bg: "bg-[#111]",
    badge: "bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30",
    label: "PROCHAINE",
  },
  planned: {
    dot: "bg-[#333]",
    border: "border-[#1E1E1E]",
    bg: "bg-[#111]",
    badge: "bg-[#222] text-[#666] border border-[#333]",
    label: "PLANIFIÉ",
  },
};

export default function RoadmapSection() {
  return (
    <SectionWrapper id="roadmap" className="border-t border-[#111]">
      <SectionHeading
        label="// roadmap.ts"
        title="En cours & Roadmap"
        subtitle="Ma trajectoire d'apprentissage — une progression active et visible."
      />

      {/* Active learning banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 p-5 rounded border border-[#E01E28]/30 bg-[#E01E28]/5 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded flex items-center justify-center bg-[#E01E28]/10 flex-shrink-0">
          <Clock size={20} className="text-[#E01E28]" />
        </div>
        <div>
          <p className="text-white font-semibold mb-1">🎯 Plongeon dans l&apos;IA — pour de vrai</p>
          <p className="text-[#B3B3B3] text-sm leading-relaxed">
            Je me forme activement en ingénierie IA — LLMs, RAG, agents autonomes.
            Pas pour cocher une case. Pour construire quelque chose d&apos;utile
            sur le continent africain avec ces outils.
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#E01E28] via-[#333] to-[#1A1A1A] hidden sm:block" />

        <div className="space-y-8">
          {ROADMAP_ITEMS.map((item, i) => {
            const config = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="sm:pl-20 relative"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-6 w-12 h-12 -translate-y-1/2 items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ${config.dot} border-2 border-[#0A0A0A]`} />
                </div>

                {/* Card */}
                <div
                  className={`rounded border ${config.border} ${config.bg} p-6 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)]`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded bg-[#0A0A0A]">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs text-[#666] block">{item.phase}</span>
                        <h3
                          className="text-lg font-bold text-white"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-mono px-2 py-1 rounded ${config.badge}`} style={{ fontFamily: "var(--font-jetbrains)" }}>
                        {config.label}
                      </span>
                      <span className="text-[11px] text-[#666]">{item.timeframe}</span>
                    </div>
                  </div>

                  <p className="text-[#B3B3B3] text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded bg-[#0A0A0A] border border-[#1E1E1E] text-[#B3B3B3] font-mono"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center text-[#666] text-sm font-mono"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        <span className="text-[#E01E28]">// </span>
        Encore du boulot. C&apos;est bien.
      </motion.p>
    </SectionWrapper>
  );
}
