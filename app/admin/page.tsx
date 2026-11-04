import { Pool } from "pg"
import Link from "next/link"

const pool = new Pool({
  host: "cv-prod-db.cyfiieky5gzb.us-west-1.rds.amazonaws.com",
  user: "cvadmin", password: "cv2026Vivo", database: "cafevivo_prod",
  port: 5432, ssl: { rejectUnauthorized: false },
})

async function getStats() {
  const [p, m, a, l, s] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM palenques WHERE is_active=true"),
    pool.query("SELECT COUNT(*) FROM palenques WHERE is_maestra=true AND is_active=true"),
    pool.query("SELECT COUNT(*) FROM agave_varieties"),
    pool.query("SELECT COUNT(*) FROM dm_b2b_leads"),
    pool.query("SELECT COUNT(*) FROM subscribers"),
  ])
  return {
    palenques:  parseInt(p.rows[0].count),
    maestras:   parseInt(m.rows[0].count),
    agaves:     parseInt(a.rows[0].count),
    leads:      parseInt(l.rows[0].count),
    visitantes: parseInt(s.rows[0].count),
  }
}

const CARDS = [
  { href: "/admin/palenques",  label: "Palenques",      desc: "Ver y editar productores",       key: "palenques"  },
  { href: "/admin/maestras",   label: "Maestras",        desc: "Perfiles de maestras mezcaleras", key: "maestras"   },
  { href: "/admin/agaves",     label: "Agave Varieties", desc: "40+ variedades · editorial",      key: "agaves"     },
  { href: "/admin/leads",      label: "B2B Leads",       desc: "Solicitudes de restaurantes",     key: "leads"      },
  { href: "/admin/visitantes", label: "Visitantes",      desc: "Suscriptores y cuentas",          key: "visitantes" },
]

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-stone-100">Panel de Administración</h1>
        <p className="text-stone-500 text-sm mt-1">3demayo.com · Registro de Mezcal</p>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-5 gap-3 mb-10">
        {CARDS.map(c => (
          <div key={c.key} className="border border-[#1e1e1e] bg-[#0a0a0a] p-4">
            <p className="text-2xl font-serif text-amber-400">{(stats as any)[c.key]}</p>
            <p className="text-stone-500 text-xs mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Nav cards */}
      <div className="grid grid-cols-2 gap-4">
        {CARDS.map(c => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-[#1e1e1e] bg-[#0a0a0a] p-5 hover:border-amber-500/30 hover:bg-[#0f0f0f] transition-all group"
          >
            <p className="text-stone-100 font-medium group-hover:text-amber-400 transition-colors">{c.label}</p>
            <p className="text-stone-500 text-sm mt-1">{c.desc}</p>
          </Link>
        ))}
        <Link
          href="/"
          className="border border-[#1e1e1e] bg-[#0a0a0a] p-5 hover:border-stone-600 transition-all group"
        >
          <p className="text-stone-400 group-hover:text-stone-200 transition-colors">Ver sitio público →</p>
          <p className="text-stone-600 text-sm mt-1">3demayo.com</p>
        </Link>
      </div>
    </div>
  )
}
