// Simple admin session check — cookie-based, no heavy auth library
import { cookies } from "next/headers"

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "3demayo2026"
export const ADMIN_COOKIE   = "dm_admin_session"

export function isAdminAuthed(): boolean {
  const store = cookies()
  return store.get(ADMIN_COOKIE)?.value === "authenticated"
}
