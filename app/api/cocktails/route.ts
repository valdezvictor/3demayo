import { NextResponse } from "next/server"
import { getPool } from "@/app/lib/db"
export async function GET() {
  try {
    const {rows}=await getPool().query("SELECT * FROM dm_cocktails WHERE is_published=true ORDER BY created_at DESC")
    return NextResponse.json(rows)
  } catch(e){ console.error(e); return NextResponse.json({error:"DB error"},{status:500}) }
}
