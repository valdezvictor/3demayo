import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.redirect(
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin`
      : "https://3demayo.com/admin",
    { status: 303 }
  )
  res.cookies.set("dm_admin_session", "", { maxAge: 0, path: "/" })
  return res
}
