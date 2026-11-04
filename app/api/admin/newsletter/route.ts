import { NextResponse } from "next/server"
import { getPool } from "@/app/lib/db"
import { cookies } from "next/headers"

function isAuthed() {
  return cookies().get("dm_admin_session")?.value === "authenticated"
}

export async function GET(req: Request) {
  if (!isAuthed()) return NextResponse.json({error:"Unauthorized"},{status:401})
  const type = new URL(req.url).searchParams.get("type") || "subscribers"
  const pool = getPool()
  if (type === "subscribers") {
    const { rows } = await pool.query("SELECT id,email,name,source,is_active,created_at FROM subscribers ORDER BY created_at DESC LIMIT 200")
    const cnt = await pool.query("SELECT COUNT(*) FROM subscribers WHERE is_active=true")
    return NextResponse.json({subscribers:rows,total:parseInt(cnt.rows[0].count)})
  }
  if (type === "articles") {
    const { rows } = await pool.query("SELECT id,slug,title_es,category,is_published,published_at,created_at FROM dm_articles ORDER BY created_at DESC")
    return NextResponse.json({articles:rows})
  }
  if (type === "cocktails") {
    const { rows } = await pool.query("SELECT id,slug,name_es,agave_base,difficulty,is_published,created_at FROM dm_cocktails ORDER BY created_at DESC")
    return NextResponse.json({cocktails:rows})
  }
  return NextResponse.json({error:"Unknown type"},{status:400})
}

export async function PATCH(req: Request) {
  if (!isAuthed()) return NextResponse.json({error:"Unauthorized"},{status:401})
  const {table,id,field,value} = await req.json()
  const allowed: Record<string,string[]> = {dm_articles:["is_published"],dm_cocktails:["is_published"],subscribers:["is_active"]}
  if (!allowed[table]?.includes(field)) return NextResponse.json({error:"Not allowed"},{status:400})
  await getPool().query("UPDATE " + table + " SET " + field + "=$1,updated_at=NOW() WHERE id=$2",[value,id])
  return NextResponse.json({ok:true})
}
