import { NextRequest, NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  host: "cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com",
  user: "cvadmin", password: "cv2026Vivo", database: "cafevivo_prod",
  port: 5432, ssl: { rejectUnauthorized: false },
})

export async function GET(req: NextRequest) {
  const maestra = req.nextUrl.searchParams.get("maestra") === "true"
  const where = maestra ? "WHERE is_maestra = true" : ""
  const result = await pool.query(
    `SELECT id, slug, palenque_name, maestro_name, maestro_title, is_maestra,
            municipality, state, founded_year, agave_species, production_method,
            is_active, is_verified
     FROM palenques ${where}
     ORDER BY is_maestra DESC, state, palenque_name`
  )
  return NextResponse.json(result.rows)
}
