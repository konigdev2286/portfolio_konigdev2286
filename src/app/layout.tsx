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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-konigdev2286.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Esdras Thychel MBOULOUKOUE | Full-Stack & AI Developer",
    template: "%s | Esdras Thychel MBOULOUKOUE",
  },
  description:
    "Portfolio d'Esdras Thychel MBOULOUKOUE (konigdev2286) — Développeur Full-Stack & IA basé à Brazzaville, Congo. Spécialisé en Next.js, Flutter, Supabase, LangChain, RAG et solutions numériques.",
  keywords: [
    "Esdras Thychel",
    "Esdras Thychel MBOULOUKOUE",
    "Esdras MBOULOUKOUE",
    "konigdev2286",
    "konig dev",
    "portfolio esdras thychel",
    "développeur Full-Stack Congo",
    "développeur IA Brazzaville",
    "développeur web Congo",
    "Next.js",
    "Flutter",
    "Congo",
    "Brazzaville",
    "LangChain",
    "RAG",
    "Supabase",
    "n8n",
  ],
  authors: [{ name: "Esdras Thychel MBOULOUKOUE", url: SITE_URL }],
  creator: "Esdras Thychel MBOULOUKOUE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: SITE_URL,
    title: "Esdras Thychel MBOULOUKOUE | Full-Stack & AI Developer",
    description:
      "Développeur Full-Stack & IA — Créateur de solutions numériques pour l'Afrique francophone. Next.js, Flutter, LangChain, RAG.",
    siteName: "Portfolio d'Esdras Thychel MBOULOUKOUE",
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
    description: "Développeur Full-Stack & IA basé à Brazzaville, Congo 🇨🇬",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Esdras Thychel MBOULOUKOUE",
      alternateName: ["Esdras Thychel", "konigdev2286", "konig.dev"],
      jobTitle: "Full-Stack & AI Developer",
      description:
        "Développeur Full-Stack & IA basé à Brazzaville au Congo, spécialisé en Next.js, Flutter, Supabase et architectures RAG/IA.",
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brazzaville",
        addressCountry: "CG",
      },
      sameAs: [
        "https://github.com/konigdev2286",
        "https://www.linkedin.com/in/esdras-thychel-mbouloukoue-07168a400",
        "https://www.tiktok.com/@konig.dev22",
        "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=1156u5jf",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "Flutter",
        "TypeScript",
        "Python",
        "LangChain",
        "Supabase",
        "Artificial Intelligence",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Esdras Thychel MBOULOUKOUE - Portfolio",
      description: "Portfolio officiel d'Esdras Thychel MBOULOUKOUE, Développeur Full-Stack & IA.",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "fr-FR",
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[#0A0A0A] text-white antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
