import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esdras Thychel MBOULOUKOUE | Full-Stack & AI Developer",
  description:
    "Portfolio d'Esdras Thychel MBOULOUKOUE — Développeur Full-Stack & IA autodidacte basé au Congo. Spécialisé en Next.js, Flutter, Supabase, LangChain et solutions IA pour l'Afrique francophone.",
  keywords: [
    "Esdras Thychel",
    "MBOULOUKOUE",
    "développeur Full-Stack",
    "développeur IA",
    "Next.js",
    "Flutter",
    "Congo",
    "Brazzaville",
    "LangChain",
    "RAG",
    "Supabase",
    "n8n",
  ],
  authors: [{ name: "Esdras Thychel MBOULOUKOUE" }],
  creator: "Esdras Thychel MBOULOUKOUE",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://esdras-thychel.dev",
    title: "Esdras Thychel MBOULOUKOUE | Full-Stack & AI Developer",
    description:
      "Développeur Full-Stack & IA — Créateur de solutions numériques pour l'Afrique francophone. Next.js, Flutter, LangChain, RAG.",
    siteName: "Esdras Thychel Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Esdras Thychel MBOULOUKOUE - Full-Stack & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esdras Thychel MBOULOUKOUE | Full-Stack & AI Developer",
    description: "Développeur Full-Stack & IA basé au Congo 🇨🇬",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      style={{ colorScheme: "dark" }}
    >
      <body
        className="bg-[#0A0A0A] text-white antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
