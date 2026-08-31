import { getDbPool } from "./db";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: "En production" | "Terminé" | "En cours" | "Concept";
  createdAt: string;
}

// ---------------------------------------------------------------
// Schema migration — runs once per server cold start
// ---------------------------------------------------------------
let schemaReady = false;

async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  const pool = getDbPool();
  if (!pool) throw new Error("DATABASE_URL non configurée — connexion PostgreSQL impossible.");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id          VARCHAR(64)  PRIMARY KEY,
      title       VARCHAR(255) NOT NULL,
      category    VARCHAR(100) NOT NULL DEFAULT 'Développement',
      description TEXT         NOT NULL,
      tech_stack  JSONB        NOT NULL DEFAULT '[]'::jsonb,
      github_url  VARCHAR(500)          DEFAULT '',
      live_url    VARCHAR(500)          DEFAULT '',
      image_url   VARCHAR(500)          DEFAULT '',
      featured    BOOLEAN      NOT NULL DEFAULT false,
      status      VARCHAR(50)  NOT NULL DEFAULT 'En cours',
      created_at  VARCHAR(50)  NOT NULL,
      updated_at  TIMESTAMPTZ           DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Idempotent column additions for tables created before image_url existed
  await pool.query(`
    ALTER TABLE projects
      ADD COLUMN IF NOT EXISTS image_url  VARCHAR(500) DEFAULT '',
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP;
  `);

  schemaReady = true;
}

// ---------------------------------------------------------------
// Row → Project mapper
// ---------------------------------------------------------------
function mapRow(row: Record<string, unknown>): Project {
  return {
    id:          row.id as string,
    title:       row.title as string,
    category:    row.category as string,
    description: row.description as string,
    techStack:   Array.isArray(row.tech_stack)
      ? (row.tech_stack as string[])
      : typeof row.tech_stack === "string"
        ? (JSON.parse(row.tech_stack) as string[])
        : [],
    githubUrl:  (row.github_url as string) || "",
    liveUrl:    (row.live_url   as string) || "",
    imageUrl:   (row.image_url  as string) || "",
    featured:   Boolean(row.featured),
    status:     (row.status as Project["status"]),
    createdAt:  row.created_at as string,
  };
}

// ---------------------------------------------------------------
// READ — all projects
// ---------------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  await ensureSchema();
  const pool = getDbPool()!;
  const res = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
  return res.rows.map(mapRow);
}

// ---------------------------------------------------------------
// CREATE — single project
// ---------------------------------------------------------------
export async function createProject(data: Omit<Project, "id" | "createdAt">): Promise<Project> {
  await ensureSchema();
  const pool = getDbPool()!;

  const id        = "proj_" + Date.now();
  const createdAt = new Date().toISOString().split("T")[0];

  await pool.query(
    `INSERT INTO projects
       (id, title, category, description, tech_stack, github_url, live_url, image_url, featured, status, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
    [
      id,
      data.title.trim(),
      data.category || "Développement",
      data.description.trim(),
      JSON.stringify(data.techStack ?? []),
      data.githubUrl  || "",
      data.liveUrl    || "",
      data.imageUrl   || "",
      Boolean(data.featured),
      data.status || "En cours",
      createdAt,
    ]
  );

  const res = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  return mapRow(res.rows[0]);
}

// ---------------------------------------------------------------
// UPDATE — single project
// ---------------------------------------------------------------
export async function updateProject(
  id: string,
  fields: Partial<Omit<Project, "id" | "createdAt">>
): Promise<Project> {
  await ensureSchema();
  const pool = getDbPool()!;

  await pool.query(
    `UPDATE projects SET
       title       = COALESCE($2, title),
       category    = COALESCE($3, category),
       description = COALESCE($4, description),
       tech_stack  = COALESCE($5, tech_stack),
       github_url  = COALESCE($6, github_url),
       live_url    = COALESCE($7, live_url),
       image_url   = COALESCE($8, image_url),
       featured    = COALESCE($9, featured),
       status      = COALESCE($10, status),
       updated_at  = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [
      id,
      fields.title       ?? null,
      fields.category    ?? null,
      fields.description ?? null,
      fields.techStack   != null ? JSON.stringify(fields.techStack) : null,
      fields.githubUrl   ?? null,
      fields.liveUrl     ?? null,
      fields.imageUrl    ?? null,
      fields.featured    ?? null,
      fields.status      ?? null,
    ]
  );

  const res = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  if (res.rows.length === 0) throw new Error(`Projet ${id} introuvable.`);
  return mapRow(res.rows[0]);
}

// ---------------------------------------------------------------
// DELETE — single project
// ---------------------------------------------------------------
export async function deleteProject(id: string): Promise<void> {
  await ensureSchema();
  const pool = getDbPool()!;
  const res = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING id", [id]);
  if (res.rows.length === 0) throw new Error(`Projet ${id} introuvable.`);
}

// ---------------------------------------------------------------
// LEGACY helpers kept for backward-compat with existing API route
// (can be removed once route.ts is updated)
// ---------------------------------------------------------------
export async function saveProjects(projects: Project[]): Promise<boolean> {
  await ensureSchema();
  const pool = getDbPool()!;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM projects");
    for (const p of projects) {
      await client.query(
        `INSERT INTO projects
           (id, title, category, description, tech_stack, github_url, live_url, image_url, featured, status, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          p.id, p.title, p.category, p.description,
          JSON.stringify(p.techStack),
          p.githubUrl || "", p.liveUrl || "", p.imageUrl || "",
          p.featured, p.status, p.createdAt,
        ]
      );
    }
    await client.query("COMMIT");
    return true;
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("saveProjects error:", e);
    return false;
  } finally {
    client.release();
  }
}
