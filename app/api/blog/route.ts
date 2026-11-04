import { NextResponse } from "next/server"
import { getPool } from "@/app/lib/db"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const cat = url.searchParams.get("category") || ""
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = 12
  const offset = (page - 1) * limit
  try {
    const pool = getPool()
    let where = "is_published=true"
    const vals: unknown[] = []
    if (cat) { vals.push(cat); where += " AND category=$1" }
    const q1 = "SELECT id,slug,title_es,excerpt_es,category,tags,author,published_at FROM dm_articles WHERE " + where + " ORDER BY published_at DESC LIMIT " + limit + " OFFSET " + offset
    const q2 = "SELECT COUNT(*) FROM dm_articles WHERE " + where
    const { rows } = await pool.query(q1, vals)
    const cnt = await pool.query(q2, vals)
    return NextResponse.json({
      articles: rows,
      total: parseInt(cnt.rows[0].count),
      page,
      pages: Math.ceil(parseInt(cnt.rows[0].count) / limit),
    })
  } catch(e) { console.error(e); return NextResponse.json({error:"DB error"},{status:500}) }
}
