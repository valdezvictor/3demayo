import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  host: "cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com",
  user: "cvadmin", password: "cv2026Vivo", database: "cafevivo_prod",
  port: 5432, ssl: { rejectUnauthorized: false },
})

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM dm_b2b_leads ORDER BY created_at DESC LIMIT 200"
    )
    return NextResponse.json(result.rows)
  } catch (e: any) {
    return NextResponse.json([], { status: 200 }) // empty if table missing
  }
}
