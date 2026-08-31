import { Pool } from "pg";

let pool: Pool | null = null;

export function getDbPool(): Pool | null {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.SUPABASE_DB_URL;

  if (!connectionString) {
    return null;
  }

  if (!pool) {
    const isSSL =
      connectionString.includes("sslmode=require") ||
      connectionString.includes("supabase.co") ||
      connectionString.includes("neon.tech") ||
      connectionString.includes("render.com") ||
      process.env.NODE_ENV === "production";

    pool = new Pool({
      connectionString,
      ssl: isSSL ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  return pool;
}
