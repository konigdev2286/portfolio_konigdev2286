"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import {
  FolderGit2,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  Code2,
} from "lucide-react";
import { Project } from "@/lib/projects";

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  "En production": {
    label: "En production",
    color: "#22C55E",
    bg: "rgba(34, 197, 94, 0.1)",
  },
  Terminé: {
    label: "Terminé",
    color: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.1)",
  },
  "En cours": {
    label: "En cours",
    color: "#E01E28",
    bg: "rgba(224, 30, 40, 0.1)",
  },
  Concept: {
    label: "Concept",
    color: "#EAB308",
    bg: "rgba(234, 179, 8, 0.1)",
  },
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = [
    "Tous",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects" className="border-t border-[#141414] relative">
      <SectionHeading
        label="// projects.json"
        title="Projets & Réalisations"
        subtitle="Applications concrètes, agents IA et architectures logicielles déployées."
      />

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded font-mono text-xs transition-all duration-300 ${
                isActive
                  ? "bg-[#1A1112] text-white border border-[#E01E28]/60 shadow-[0_0_15px_rgba(224,30,40,0.2)]"
                  : "bg-[#111] text-[#888] border border-[#1E1E1E] hover:border-[#333] hover:text-[#CCC]"
              }`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#E01E28] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded border border-[#1E1E1E] bg-[#0D0D0D]">
          <FolderGit2 className="w-12 h-12 text-[#444] mx-auto mb-3" />
          <p className="text-[#888] text-sm">Aucun projet trouvé dans cette catégorie.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const statusConfig =
                STATUS_BADGE[project.status] || STATUS_BADGE["En cours"];

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -4, borderColor: "rgba(224,30,40,0.4)" }}
                  className="group relative rounded-xl bg-[#0D0D0D] border border-[#1E1E1E] flex flex-col justify-between transition-all duration-300 overflow-hidden hover:shadow-[0_8px_30px_rgba(224,30,40,0.15)]"
                >
                  {/* Top Scanline accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E01E28] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {/* Project Image Banner (if available) */}
                  {project.imageUrl && (
                    <div className="relative w-full h-48 bg-[#111] overflow-hidden border-b border-[#1A1A1A]">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Header: Category & Status */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] text-[#888] border border-[#222]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {project.category}
                        </span>

                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1.5"
                          style={{
                            color: statusConfig.color,
                            backgroundColor: statusConfig.bg,
                            fontFamily: "var(--font-jetbrains)",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: statusConfig.color }}
                          />
                          {statusConfig.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        className="text-white text-lg font-bold mb-2 group-hover:text-[#E01E28] transition-colors"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {project.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[#888] text-xs leading-relaxed mb-6 font-sans line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[#171717]">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111] text-[#AAA] border border-[#1E1E1E]"
                            style={{ fontFamily: "var(--font-jetbrains)" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#171717]">
                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#888] hover:text-white transition-colors p-1.5 rounded bg-[#141414] border border-[#222] hover:border-[#E01E28]/40"
                              aria-label="Code source GitHub"
                            >
                              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
                              </svg>
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#888] hover:text-white transition-colors p-1.5 rounded bg-[#141414] border border-[#222] hover:border-[#E01E28]/40"
                              aria-label="Voir la démo en direct"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>

                        <span
                          className="text-[10px] font-mono text-[#555]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {project.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
