import { NextRequest, NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  host: "cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com",
  user: "cvadmin", password: "cv2026Vivo", database: "cafevivo_prod",
  port: 5432, ssl: { rejectUnauthorized: false },
})

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  const allowed = ["is_active", "is_verified", "is_maestra"]
  const updates: string[] = []
  const vals: any[] = []
  let i = 1
  for (const key of allowed) {
    if (key in body) { updates.push(`${key} = $${i++}`); vals.push(body[key]) }
  }
  if (!updates.length) return NextResponse.json({ error: "No valid fields" }, { status: 400 })
  vals.push(parseInt(params.id))
  await pool.query(`UPDATE palenques SET ${updates.join(", ")} WHERE id = $${i}`, vals)
  return NextResponse.json({ ok: true })
}
