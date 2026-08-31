"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Layers,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Shield,
  Save,
  X,
  Image as ImageIcon,
  Upload,
  Loader2,
} from "lucide-react";
import { Project } from "@/lib/projects";

const DEFAULT_CATEGORIES = [
  "IA & Automation",
  "IA & Data",
  "Développement Web",
  "Mobile",
  "FinTech",
  "Backend & API",
];

const STATUS_OPTIONS: Project["status"][] = [
  "En production",
  "Terminé",
  "En cours",
  "Concept",
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    description: string;
    techStackString: string;
    githubUrl: string;
    liveUrl: string;
    imageUrl: string;
    featured: boolean;
    status: Project["status"];
  }>({
    title: "",
    category: "IA & Automation",
    description: "",
    techStackString: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false,
    status: "En cours",
  });

  // Check existing session
  useEffect(() => {
    const savedToken = sessionStorage.getItem("konig_admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  async function fetchProjects() {
    setLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
      notify("error", "Impossible de charger les projets");
    } finally {
      setLoadingProjects(false);
    }
  }

  function notify(type: "success" | "error", text: string) {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("konig_admin_token", data.token);
        setIsAuthenticated(true);
        fetchProjects();
        notify("success", "Accès administrateur autorisé");
      } else {
        setAuthError(data.message || "Code secret incorrect");
      }
    } catch (err) {
      setAuthError("Erreur de connexion au serveur");
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("konig_admin_token");
    setIsAuthenticated(false);
    setPinInput("");
  }

  function openAddModal() {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "IA & Automation",
      description: "",
      techStackString: "Next.js 14, TypeScript, Supabase",
      githubUrl: "https://github.com/konigdev2286",
      liveUrl: "",
      imageUrl: "",
      featured: false,
      status: "En cours",
    });
    setIsModalOpen(true);
  }

  function openEditModal(project: Project) {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      techStackString: project.techStack.join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
      featured: project.featured,
      status: project.status,
    });
    setIsModalOpen(true);
  }

  async function handleImageFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        notify("success", "Image téléchargée avec succès !");
      } else {
        notify("error", data.message || "Échec du téléchargement");
      }
    } catch (err) {
      notify("error", "Erreur lors de l'envoi de l'image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleSaveProject(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      notify("error", "Veuillez remplir le titre et la description");
      return;
    }

    const techStack = formData.techStackString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingProject) {
        // Update
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingProject.id,
            title: formData.title,
            category: formData.category,
            description: formData.description,
            techStack,
            githubUrl: formData.githubUrl,
            liveUrl: formData.liveUrl,
            imageUrl: formData.imageUrl,
            featured: formData.featured,
            status: formData.status,
          }),
        });
        const data = await res.json();
        if (data.success) {
          notify("success", "Projet mis à jour avec succès !");
          setIsModalOpen(false);
          fetchProjects();
        } else {
          notify("error", data.message || "Erreur de mise à jour");
        }
      } else {
        // Create
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            description: formData.description,
            techStack,
            githubUrl: formData.githubUrl,
            liveUrl: formData.liveUrl,
            imageUrl: formData.imageUrl,
            featured: formData.featured,
            status: formData.status,
          }),
        });
        const data = await res.json();
        if (data.success) {
          notify("success", "Nouveau projet ajouté au portfolio !");
          setIsModalOpen(false);
          fetchProjects();
        } else {
          notify("error", data.message || "Erreur lors de l'ajout");
        }
      }
    } catch (err) {
      notify("error", "Erreur lors de la communication avec l'API");
    }
  }

  async function handleDeleteProject(id: string, title: string) {
    if (!confirm(`Es-tu sûr de vouloir supprimer "${title}" ?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        notify("success", `Projet "${title}" supprimé`);
        fetchProjects();
      } else {
        notify("error", data.message || "Erreur de suppression");
      }
    } catch (err) {
      notify("error", "Erreur réseau");
    }
  }

  // -------------------------------------------------------------
  // RENDER: LOGIN GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-xl bg-[#0D0D0D] border border-[#1E1E1E] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E01E28] to-transparent" />

          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E01E28]/10 border border-[#E01E28]/30 mx-auto mb-6 text-[#E01E28]">
            <Shield size={28} />
          </div>

          <h2
            className="text-2xl font-bold text-center text-white mb-2"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            KONIG.DEV // ADMIN
          </h2>
          <p className="text-xs text-[#888] text-center mb-8 font-mono">
            Accès sécurisé pour la gestion du portfolio &amp; des projets.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pin"
                className="text-xs font-mono text-[#AAA] block mb-2"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Code PIN Administrateur
              </label>
              <div className="relative">
                <input
                  id="admin-pin"
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded bg-[#141414] border border-[#222] text-white placeholder-[#555] font-mono text-center tracking-widest text-lg focus:outline-none focus:border-[#E01E28] transition-colors"
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded bg-[#E01E28] hover:bg-[#FF3040] text-white font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(224,30,40,0.3)] disabled:opacity-50"
            >
              {authLoading ? "Vérification..." : "Déverrouiller le panneau"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs text-[#666] hover:text-[#AAA] font-mono transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={12} />
              Retour au site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Admin Top Header */}
      <header className="border-b border-[#1A1A1A] bg-[#0D0D0D]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Voir le portfolio</span>
            </Link>
            <span className="text-[#333]">|</span>
            <div className="flex items-center gap-2">
              <span
                className="text-[#E01E28] font-mono font-bold text-sm tracking-wider"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                &lt;ADMIN_DASHBOARD /&gt;
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded border border-[#222] hover:border-red-500/40 text-[#888] hover:text-red-400 font-mono text-xs transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Status Notification Toast */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded border font-mono text-xs flex items-center gap-2 ${
                statusMessage.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              <span>{statusMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Metrics / Quick Action */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded bg-[#0D0D0D] border border-[#1E1E1E]">
            <span className="text-xs font-mono text-[#777] block mb-1">
              TOTAL PROJETS
            </span>
            <span
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {projects.length}
            </span>
          </div>

          <div className="p-5 rounded bg-[#0D0D0D] border border-[#1E1E1E]">
            <span className="text-xs font-mono text-[#777] block mb-1">
              EN PRODUCTION
            </span>
            <span
              className="text-3xl font-bold text-emerald-400"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {projects.filter((p) => p.status === "En production").length}
            </span>
          </div>

          <div className="p-5 rounded bg-[#0D0D0D] border border-[#1E1E1E] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#777] block mb-1">
                ACTION RAPIDE
              </span>
              <span className="text-xs text-[#AAA]">Nouveau projet</span>
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded bg-[#E01E28] hover:bg-[#FF3040] text-white font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(224,30,40,0.3)]"
            >
              <Plus size={14} />
              Ajouter
            </button>
          </div>
        </div>

        {/* Projects Table & Management */}
        <div className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden">
          <div className="p-5 border-b border-[#1E1E1E] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FolderGit2 className="text-[#E01E28]" size={18} />
              <h3
                className="text-white font-bold text-base"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Liste des projets déployés
              </h3>
            </div>

            <button
              onClick={fetchProjects}
              className="flex items-center gap-1.5 text-xs text-[#888] hover:text-white font-mono transition-colors"
            >
              <RefreshCw
                size={12}
                className={loadingProjects ? "animate-spin" : ""}
              />
              Rafraîchir
            </button>
          </div>

          {loadingProjects ? (
            <div className="p-12 text-center text-[#888] font-mono text-sm">
              Chargement des projets en cours...
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-[#888] font-mono text-sm">
              Aucun projet pour le moment. Clique sur &quot;Ajouter&quot; pour
              créer ton premier projet !
            </div>
          ) : (
            <div className="divide-y divide-[#171717]">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 hover:bg-[#111] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Project Thumbnail */}
                    <div className="w-16 h-12 rounded-lg bg-[#141414] border border-[#222] overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={20} className="text-[#444]" />
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-white font-bold text-base"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {project.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1A1A] text-[#888] border border-[#222]">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {project.status}
                        </span>
                      </div>

                      <p className="text-xs text-[#888] line-clamp-2 max-w-2xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] text-[#AAA] border border-[#1E1E1E]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded bg-[#141414] border border-[#222] text-[#888] hover:text-white hover:border-[#444] transition-colors"
                        title="GitHub"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded bg-[#141414] border border-[#222] text-[#888] hover:text-white hover:border-[#444] transition-colors"
                        title="Démo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-2 rounded bg-[#141414] border border-[#222] text-[#888] hover:text-white hover:border-[#444] transition-colors"
                      title="Modifier"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProject(project.id, project.title)
                      }
                      className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0D0D0D] border border-[#1E1E1E] rounded-xl p-6 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E] mb-6">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {editingProject ? "Modifier le projet" : "Ajouter un nouveau projet"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded text-[#888] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 font-sans text-sm">
                <div>
                  <label className="text-xs font-mono text-[#AAA] block mb-1.5">
                    Titre du projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Ex: Assistant IA Mobile Money"
                    className="w-full px-4 py-2.5 rounded bg-[#141414] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E01E28]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[#AAA] block mb-1.5">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#141414] border border-[#222] text-white text-sm focus:outline-none focus:border-[#E01E28]"
                    >
                      {DEFAULT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#AAA] block mb-1.5">
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Project["status"],
                        })
                      }
                      className="w-full px-4 py-2.5 rounded bg-[#141414] border border-[#222] text-white text-sm focus:outline-none focus:border-[#E01E28]"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload & URL Section */}
                <div className="p-4 rounded-lg bg-[#121212] border border-[#222] space-y-3">
                  <label className="text-xs font-mono text-[#AAA] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon size={14} className="text-[#E01E28]" />
                      Image ou capture d&apos;écran du projet
                    </span>
                    {formData.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: "" })}
                        className="text-[11px] text-red-400 hover:underline"
                      >
                        Supprimer l&apos;image
                      </button>
                    )}
                  </label>

                  {/* Image Preview if exists */}
                  {formData.imageUrl && (
                    <div className="relative w-full h-40 rounded-lg bg-[#0A0A0A] border border-[#252525] overflow-hidden group">
                      <img
                        src={formData.imageUrl}
                        alt="Aperçu du projet"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded bg-[#1A1A1A] border border-[#444] text-xs text-white font-mono hover:border-[#E01E28]"
                        >
                          Changer
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: "" })}
                          className="px-3 py-1.5 rounded bg-red-500/20 border border-red-500/40 text-xs text-red-400 font-mono hover:bg-red-500/40"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Upload button & Direct URL input */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <button
                      type="button"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="sm:col-span-1 px-3 py-2 rounded bg-[#1A1A1A] border border-[#333] hover:border-[#E01E28] text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 size={13} className="animate-spin text-[#E01E28]" />
                          <span>Envoi...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={13} className="text-[#E01E28]" />
                          <span>Parcourir fichier</span>
                        </>
                      )}
                    </button>

                    <div className="sm:col-span-2">
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        placeholder="Ou coller une URL d'image (https://...)"
                        className="w-full px-3 py-2 rounded bg-[#161616] border border-[#2A2A2A] text-white placeholder-[#555] text-xs focus:outline-none focus:border-[#E01E28]"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#666] font-mono">
                    Formats acceptés : PNG, JPG, WEBP, GIF, SVG. Max 10 Mo.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#AAA] block mb-1.5">
                    Stack technique (séparée par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.techStackString}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        techStackString: e.target.value,
                      })
                    }
                    placeholder="Next.js 14, Python, Supabase, Mistral AI"
                    className="w-full px-4 py-2.5 rounded bg-[#141414] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E01E28]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#AAA] block mb-1.5">
                    Description du projet *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Explique ce que fait le projet, le problème qu'il résout et ses fonctionnalités clés..."
                    className="w-full px-4 py-2.5 rounded bg-[#141414] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E01E28] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[#AAA] block mb-1.5">
                      Lien GitHub (Repository)
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, githubUrl: e.target.value })
                      }
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 rounded bg-[#141414] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E01E28]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#AAA] block mb-1.5">
                      Lien Démo en ligne (facultatif)
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, liveUrl: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 rounded bg-[#141414] border border-[#222] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#E01E28]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1E1E1E] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded border border-[#222] text-[#888] hover:text-white font-mono text-xs"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#E01E28] hover:bg-[#FF3040] text-white font-bold font-mono text-xs transition-all shadow-[0_0_15px_rgba(224,30,40,0.3)] flex items-center gap-1.5"
                  >
                    <Save size={14} />
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
