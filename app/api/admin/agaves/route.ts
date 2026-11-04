import { NextResponse } from "next/server"
import { getPool } from "@/app/lib/db"
export async function GET() {
  try {
    const {rows}=await getPool().query("SELECT id,name,scientific_name,regions,maturation_years,flavor_notes,rarity FROM agave_varieties ORDER BY name ASC")
    return NextResponse.json(rows)
  } catch(e){ console.error(e); return NextResponse.json({error:"DB error"},{status:500}) }
}
