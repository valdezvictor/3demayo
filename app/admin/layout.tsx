import { cookies } from "next/headers"
import Link from "next/link"
import AdminLoginInline from "./login-inline"

const ADMIN_COOKIE = "dm_admin_session"

const NAV = [
  { href: "/admin",              label: "Dashboard"  },
  { href: "/admin/palenques",    label: "Palenques"  },
  { href: "/admin/maestras",     label: "Maestras"   },
  { href: "/admin/agaves",       label: "Agaves"     },
  { href: "/admin/leads",        label: "B2B Leads"  },
  { href: "/admin/visitantes",   label: "Visitantes" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const store = cookies()
  const authed = store.get(ADMIN_COOKIE)?.value === "authenticated"

  if (!authed) {
    return <AdminLoginInline />
  }

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200 flex">
      <aside className="w-56 border-r border-[#1e1e1e] flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-[#1e1e1e]">
          <p className="text-amber-500 text-xs font-mono tracking-widest">3DE MAYO</p>
          <p className="text-stone-500 text-xs mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center px-5 py-2.5 text-sm text-stone-400 hover:text-amber-400 hover:bg-[#111] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-[#1e1e1e]">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

function SignOutButton() {
  return (
    <form action="/api/admin/signout" method="POST">
      <button type="submit" className="text-stone-600 hover:text-stone-400 text-xs transition-colors">
        Cerrar sesión →
      </button>
    </form>
  )
}
