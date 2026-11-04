import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const r = await fetch('http://127.0.0.1:8002/api/v1/b2b-lead', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    })
    if (!r.ok) throw new Error('API error')
    return NextResponse.json({success: true})
  } catch(e) {
    return NextResponse.json({success: false}, {status: 500})
  }
}