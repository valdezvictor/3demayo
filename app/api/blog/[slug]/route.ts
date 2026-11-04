import { NextResponse } from "next/server"
import { getPool } from "@/app/lib/db"
export async function GET(_req: Request,{params}:{params:{slug:string}}) {
  try {
    const {rows}=await getPool().query("SELECT * FROM dm_articles WHERE slug=$1 AND is_published=true",[params.slug])
    if(!rows.length) return NextResponse.json({error:"Not found"},{status:404})
    return NextResponse.json(rows[0])
  } catch(e){ console.error(e); return NextResponse.json({error:"DB error"},{status:500}) }
}
