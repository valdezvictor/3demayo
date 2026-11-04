"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/palenques", label: "Registro" },
  { href: "/maestras",  label: "Maestras ✦" },
  { href: "/for-restaurants", label: "Restaurantes" },
  { href: "/documental", label: "Documental" },
  { href: "/about", label: "El 3 de Mayo" },
]

export default function Nav() {
  const path = usePathname()
  return (
    <nav className="border-b border-[#262626] bg-[#080808]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="text-stone-100 font-serif font-bold text-lg tracking-tight hover:text-amber-400 transition-colors">
          3 de Mayo
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-xs font-mono tracking-wide transition-colors ${
                path?.startsWith(l.href)
                  ? "text-amber-400"
                  : "text-stone-500 hover:text-stone-300"
              }`}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/palenques" className="md:hidden text-stone-500 text-xs font-mono">≡ MENÚ</Link>
      </div>
    </nav>
  )
}
