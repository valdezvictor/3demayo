import { Pool } from "pg"
let pool: Pool | null = null
export function getPool(): Pool {
  if (!pool) pool = new Pool({
    host: process.env.DB_HOST||"cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com",
    user: process.env.DB_USER||"cvadmin",
    password: process.env.DB_PASSWORD||"cv2026Vivo",
    database: process.env.DB_NAME||"cafevivo_prod",
    port: Number(process.env.DB_PORT)||5432,
    ssl: { rejectUnauthorized: false },
    max: 5, idleTimeoutMillis: 30000
  })
  return pool
}
