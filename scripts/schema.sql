-- =======================================================
-- SQL SCHEMA FOR PORTFOLIO BACKEND (POSTGRESQL / SUPABASE)
-- =======================================================

CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Développement',
    description TEXT NOT NULL,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    github_url VARCHAR(500) DEFAULT '',
    live_url VARCHAR(500) DEFAULT '',
    featured BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(50) NOT NULL DEFAULT 'En cours',
    created_at VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast queries by category and status
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Sample initial data
INSERT INTO projects (id, title, category, description, tech_stack, github_url, live_url, featured, status, created_at)
VALUES 
(
    'project-1',
    'Assistant IA Mobile Money',
    'IA & Automation',
    'Agent conversationnel intelligent capable d''orchestrer des transactions de paiement mobile, de vérifier les soldes et de guider l''utilisateur en français et langues locales.',
    '["Next.js 14", "Python", "Mistral AI", "Supabase", "n8n"]'::jsonb,
    'https://github.com/konigdev2286',
    'https://github.com/konigdev2286',
    true,
    'En production',
    '2026-08-15'
),
(
    'project-2',
    'Pipeline RAG & Documents Privés',
    'IA & Data',
    'Moteur d''indexation vectorielle sur documents juridiques et administratifs avec chunking sémantique optimisé et recherche de similarité pgvector sans hallucination.',
    '["Python", "pgvector", "OpenAI API", "PostgreSQL", "LangChain"]'::jsonb,
    'https://github.com/konigdev2286',
    '',
    true,
    'Terminé',
    '2026-07-20'
),
(
    'project-3',
    'Application Mobile E-Commerce Flutter',
    'Mobile',
    'Application mobile native iOS & Android avec gestion des commandes en temps réel, notifications push et intégration des passerelles de paiement locales.',
    '["Flutter", "Dart", "Supabase", "Tailwind CSS"]'::jsonb,
    'https://github.com/konigdev2286',
    '',
    false,
    'En cours',
    '2026-06-10'
)
ON CONFLICT (id) DO NOTHING;
