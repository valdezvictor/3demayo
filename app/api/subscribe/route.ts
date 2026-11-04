import { NextResponse } from "next/server"
import { getPool } from "@/app/lib/db"
export async function POST(req: Request) {
  try {
    const { email, name, source } = await req.json()
    if (!email || !email.includes("@")) return NextResponse.json({ error: "Email inválido" },{status:400})
    const { rows } = await getPool().query(
      "INSERT INTO subscribers (email,name,source,is_active,created_at) VALUES ($1,$2,$3,true,NOW()) ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name,source=EXCLUDED.source,is_active=true RETURNING id,email",
      [email.toLowerCase().trim(), name||null, source||"website"]
    )
    return NextResponse.json({ success:true, id:rows[0].id })
  } catch(e){ console.error(e); return NextResponse.json({error:"Error"},{status:500}) }
}
