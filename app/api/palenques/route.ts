import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  host: 'cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com',
  user: 'cvadmin',
  password: 'cv2026Vivo',
  database: 'cafevivo_prod',
  port: 5432,
  ssl: { rejectUnauthorized: false }
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get("state")
  const maestraOnly = searchParams.get("maestra") === "true"
  const search = searchParams.get("search")

  const filters: string[] = ["p.is_active = true"]
  const params: any[] = []
  let idx = 1

  if (state) {
    filters.push(`p.state = $${idx++}`)
    params.push(state)
  }
  if (maestraOnly) {
    filters.push("p.is_maestra = true")
  }
  if (search) {
    filters.push(`(p.palenque_name ILIKE $${idx} OR p.maestro_name ILIKE $${idx} OR p.municipality ILIKE $${idx})`)
    params.push(`%${search}%`)
    idx++
  }

  const where = filters.join(" AND ")

  try {
    const result = await pool.query(`
      SELECT p.id, p.slug, p.palenque_name, p.maestro_name, p.maestro_title,
             p.is_maestra, p.municipality, p.state, p.altitude_m,
             p.founded_year, p.description_es, p.description_en,
             p.agave_species, p.production_method, p.certifications,
             p.is_verified, p.website, p.instagram, p.hero_image_url,
             r.name as region_name
      FROM palenques p
      LEFT JOIN palenque_regions r ON r.id = p.region_id
      WHERE ${where}
      ORDER BY p.is_maestra DESC, p.state, p.palenque_name
    `, params)
    return NextResponse.json({ total: result.rows.length, items: result.rows })
  } catch (err: any) {
    console.error("Palenques API error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
