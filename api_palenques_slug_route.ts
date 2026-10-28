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

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await pool.query(`
      SELECT p.id, p.slug, p.palenque_name, p.maestro_name, p.maestro_title,
             p.is_maestra, p.municipality, p.state, p.altitude_m,
             p.founded_year, p.description_es, p.description_en,
             p.agave_species, p.production_method, p.certifications,
             p.is_verified, p.website, p.instagram, p.contact_email,
             p.hero_image_url, r.name as region_name, r.description_es as region_desc_es
      FROM palenques p
      LEFT JOIN palenque_regions r ON r.id = p.region_id
      WHERE p.slug = $1 AND p.is_active = true
    `, [params.slug])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Palenque not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (err: any) {
    console.error("Palenque detail API error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
