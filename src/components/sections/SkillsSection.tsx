"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import {
  Layers,
  Database,
  Cpu,
  Code2,
  Terminal,
  Activity,
  Workflow,
  Sparkles,
  Bot,
  BrainCircuit,
  Network,
  ShieldCheck,
} from "lucide-react";
import {
  NextjsLogo,
  FlutterLogo,
  TypeScriptLogo,
  ReactLogo,
  PythonLogo,
  JavaScriptLogo,
  CppLogo,
  DartLogo,
  SupabaseLogo,
  PostgreSQLLogo,
  N8nLogo,
  MistralLogo,
  OpenAILogo,
  AnthropicLogo,
} from "@/components/ui/TechLogos";

type SkillLevel = "expert" | "avancé" | "intermédiaire";

interface SkillItem {
  id: string;
  name: string;
  category: "dev" | "languages" | "backend" | "ai";
  level: SkillLevel;
  percentage: number;
  role: string;
  tag: string;
  logo: React.ComponentType<{ className?: string; size?: number }>;
  brandColor: string;
}

const CATEGORIES = [
  { id: "all", label: "Tous les modules", count: 14, icon: Layers },
  { id: "dev", label: "Développement", count: 4, icon: Code2 },
  { id: "languages", label: "Langages", count: 4, icon: Terminal },
  { id: "backend", label: "Backend / Data", count: 2, icon: Database },
  { id: "ai", label: "Automatisation / IA", count: 4, icon: Cpu },
] as const;

const SKILLS_DATA: SkillItem[] = [
  // 1. Développement
  {
    id: "nextjs",
    name: "Next.js 14",
    category: "dev",
    level: "expert",
    percentage: 95,
    role: "App Router, SSR, Server Actions & Architecture Full-Stack",
    tag: "FRAMEWORK",
    logo: NextjsLogo,
    brandColor: "#FFFFFF",
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "dev",
    level: "avancé",
    percentage: 88,
    role: "Applications mobiles iOS & Android cross-platform natives",
    tag: "MOBILE",
    logo: FlutterLogo,
    brandColor: "#02569B",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "dev",
    level: "avancé",
    percentage: 90,
    role: "Typage strict, architecture modulaire & robustesse",
    tag: "DEV",
    logo: TypeScriptLogo,
    brandColor: "#3178C6",
  },
  {
    id: "react",
    name: "React.js",
    category: "dev",
    level: "expert",
    percentage: 92,
    role: "Composants interactifs, hooks avancés & interfaces fluides",
    tag: "UI",
    logo: ReactLogo,
    brandColor: "#61DAFB",
  },

  // 2. Langages
  {
    id: "python",
    name: "Python",
    category: "languages",
    level: "avancé",
    percentage: 88,
    role: "Pipelines IA, scripts d'automatisation & data processing",
    tag: "AI_LANG",
    logo: PythonLogo,
    brandColor: "#3776AB",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    level: "expert",
    percentage: 94,
    role: "Écosystème web moderne, ESNext & runtime Node.js",
    tag: "WEB",
    logo: JavaScriptLogo,
    brandColor: "#F7DF1E",
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    level: "intermédiaire",
    percentage: 75,
    role: "Algorithmique, gestion mémoire & logique système",
    tag: "SYSTEM",
    logo: CppLogo,
    brandColor: "#00599C",
  },
  {
    id: "dart",
    name: "Dart",
    category: "languages",
    level: "avancé",
    percentage: 86,
    role: "Programmation orientée objet & logique applicative Flutter",
    tag: "CORE_LANG",
    logo: DartLogo,
    brandColor: "#0175C2",
  },

  // 3. Backend / Data
  {
    id: "supabase",
    name: "Supabase",
    category: "backend",
    level: "avancé",
    percentage: 90,
    role: "Auth, Realtime, Row Level Security & Edge Functions",
    tag: "BaaS",
    logo: SupabaseLogo,
    brandColor: "#3ECF8E",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    level: "avancé",
    percentage: 84,
    role: "Modélisation relationnelle, requêtes complexes & pgvector",
    tag: "DATABASE",
    logo: PostgreSQLLogo,
    brandColor: "#336791",
  },

  // 4. Automatisation / IA
  {
    id: "n8n",
    name: "n8n (Render)",
    category: "ai",
    level: "avancé",
    percentage: 90,
    role: "Orchestration de workflows événementiels, triggers & webhooks",
    tag: "AUTO_OPS",
    logo: N8nLogo,
    brandColor: "#FF6D5A",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    category: "ai",
    level: "avancé",
    percentage: 86,
    role: "Modèles européens haute performance & intégration francophone",
    tag: "LLM_MISTRAL",
    logo: MistralLogo,
    brandColor: "#FA520F",
  },
  {
    id: "openai",
    name: "OpenAI API",
    category: "ai",
    level: "avancé",
    percentage: 90,
    role: "Intégrations GPT-4o, structured outputs & embeddings vectoriels",
    tag: "LLM_OPENAI",
    logo: OpenAILogo,
    brandColor: "#10A37F",
  },
  {
    id: "anthropic",
    name: "Anthropic (Claude)",
    category: "ai",
    level: "avancé",
    percentage: 88,
    role: "Raisonnement avancé, prompts complexes & analyse technique",
    tag: "LLM_CLAUDE",
    logo: AnthropicLogo,
    brandColor: "#D97757",
  },
];

const EXPERTISE_DOMAINS = [
  {
    id: "rag",
    icon: BrainCircuit,
    title: "Pipelines RAG",
    tag: "RETRIEVAL_ENGINE",
    description:
      "Architecture de génération augmentée par récupération : découpage sémantique (chunking), vectorisation pgvector et injection de contexte métier précis pour des réponses sans hallucination.",
    highlights: ["Embeddings", "pgvector", "Indexation sémantique", "Zéro hallucination"],
  },
  {
    id: "agents",
    icon: Bot,
    title: "Agents IA Autonomes",
    tag: "AUTONOMOUS_AGENTS",
    description:
      "Conception d'agents capables de planifier, d'exécuter des actions séquentielles avec outils (function calling), d'accéder à des APIs tierces et de maintenir une mémoire contextuelle.",
    highlights: ["Function Calling", "Tool Use", "Multi-étapes", "Mémoire contextuelle"],
  },
  {
    id: "africa",
    icon: Network,
    title: "Workflows pour l'Afrique francophone",
    tag: "LOCAL_IMPACT",
    description:
      "Automatisation de processus métiers adaptée aux contraintes locales : intégrations de flux mobiles money, interactions fluides en français et systèmes déployés à faible latence et coût maîtrisé.",
    highlights: ["Mobile Money", "n8n Cloud Render", "Contexte FR", "Coûts optimisés"],
  },
];

const LEVEL_CONFIG: Record<
  SkillLevel,
  { label: string; color: string }
> = {
  expert: {
    label: "Expert",
    color: "#E01E28",
  },
  avancé: {
    label: "Avancé",
    color: "#FF6B35",
  },
  intermédiaire: {
    label: "Intermédiaire",
    color: "#4DA6FF",
  },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <SectionWrapper id="skills" className="border-t border-[#141414] relative">
      <SectionHeading
        label="// stack_and_expertise.json"
        title="Stack & Domaines d'expertise"
        subtitle="Un ensemble d'outils et de briques logicielles maîtrisés pour concevoir des produits modernes et scalables."
      />

      {/* Tech Console HUD Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 p-4 rounded bg-[#0D0D0D] border border-[#1E1E1E] flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E01E28] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E01E28]"></span>
          </span>
          <span className="text-white font-medium">SYSTEM_RUNTIME:</span>
          <span className="text-[#E01E28]">PRODUCTION_ACTIVE</span>
        </div>

        <div className="flex items-center gap-4 text-[#888]">
          <div className="flex items-center gap-1.5">
            <Activity size={14} className="text-[#E01E28]" />
            <span>MODULES: <strong className="text-white">{SKILLS_DATA.length}</strong></span>
          </div>
          <span className="text-[#333]">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[#B3B3B3]">IA & FULL-STACK CERTIFIED</span>
          </div>
        </div>
      </motion.div>

      {/* Domaines d'expertise (Highlights Banner Cards) */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Workflow size={18} className="text-[#E01E28]" />
          <h3
            className="text-white font-bold text-lg uppercase tracking-wider font-mono"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            // Domaines d&apos;expertise clés
          </h3>
          <div className="flex-1 h-px bg-[#1E1E1E]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERTISE_DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(224,30,40,0.4)" }}
                className="p-6 rounded bg-[#0D0D0D] border border-[#1E1E1E] flex flex-col justify-between transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E01E28] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded bg-[#141414] border border-[#222] flex items-center justify-center text-[#E01E28] group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] text-[#888] border border-[#222]"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {domain.tag}
                    </span>
                  </div>

                  <h4
                    className="text-white text-base font-bold mb-2 group-hover:text-[#E01E28] transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {domain.title}
                  </h4>

                  <p className="text-[#888] text-xs leading-relaxed mb-6 font-sans">
                    {domain.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#171717]">
                  {domain.highlights.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111] text-[#AAA] border border-[#1E1E1E]"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stack & Modules Header */}
      <div className="flex items-center gap-3 mb-6">
        <Code2 size={18} className="text-[#E01E28]" />
        <h3
          className="text-white font-bold text-lg uppercase tracking-wider font-mono"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          // Stack technique & Outils
        </h3>
        <div className="flex-1 h-px bg-[#1E1E1E]" />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs transition-all duration-300 ${
                isActive
                  ? "bg-[#1A1112] text-white border border-[#E01E28]/60 shadow-[0_0_20px_rgba(224,30,40,0.25)]"
                  : "bg-[#111] text-[#888] border border-[#1E1E1E] hover:border-[#333] hover:text-[#CCC]"
              }`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              <Icon size={14} className={isActive ? "text-[#E01E28]" : "text-[#666]"} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? "bg-[#E01E28] text-white" : "bg-[#1C1C1C] text-[#666]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid with Official Logos */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => {
            const config = LEVEL_CONFIG[skill.level];
            const Logo = skill.logo;
            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.02 }}
                whileHover={{ y: -3, borderColor: "rgba(224,30,40,0.5)" }}
                className="group relative p-5 rounded bg-[#0D0D0D] border border-[#1C1C1C] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Tech scanline accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E01E28]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Header: Logo, Tag & Level */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#222] flex items-center justify-center p-2 group-hover:border-[#E01E28]/40 group-hover:scale-105 transition-all">
                        <Logo className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <h4
                          className="text-white text-base font-bold group-hover:text-[#E01E28] transition-colors"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {skill.name}
                        </h4>
                        <span
                          className="text-[10px] font-mono text-[#666]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {skill.tag}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: config.color, fontFamily: "var(--font-jetbrains)" }}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>

                  {/* Skill Tech Role */}
                  <p className="text-[#777] text-xs leading-relaxed mb-4 font-sans line-clamp-2">
                    {skill.role}
                  </p>
                </div>

                {/* Progress Metric Bar */}
                <div className="pt-2 border-t border-[#171717]">
                  <div
                    className="flex justify-between items-center text-[10px] font-mono mb-1.5"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    <span className="text-[#555]">MAÎTRISE</span>
                    <span className="text-[#AAA]">{skill.percentage}%</span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-[#171717] overflow-hidden p-[1px]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: config.color }}
                    >
                      {/* Glow dot at the edge */}
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFF]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
