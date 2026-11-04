"use client"
import { useEffect, useState } from "react"

interface Agave {
  id: number; name: string; scientific_name: string; rarity: string
  production_method: string; maturation_years: number
  flavor_notes: string[]; food_pairings: string[]
  pairing_rationale_es: string
}

export default function AdminAgaves() {
  const [items, setItems] = useState<Agave[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => { fetch("/api/admin/agaves").then(r => r.json()).then(d => { setItems(d); setLoading(false) }) }, [])

  const filtered = items.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-serif text-stone-100">Variedades de Agave</h1>
          <p className="text-stone-500 text-sm">{items.length} variedades · contenido editorial en desarrollo</p>
        </div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar variedad..."
          className="bg-[#111] border border-[#2a2a2a] text-stone-300 px-3 py-2 text-sm w-56 focus:outline-none focus:border-amber-500/40"
        />
      </div>

      {/* Placeholder banner */}
      <div className="border border-amber-500/20 bg-amber-500/5 px-4 py-3 mb-6 text-amber-400 text-xs font-mono tracking-wider">
        ◈ PRÓXIMAMENTE — Página pública /agaves · Maridajes gastronómicos · Perfiles editoriales
      </div>

      {loading ? (
        <p className="text-stone-600 text-sm animate-pulse">Cargando...</p>
      ) : (
        <div className="border border-[#1e1e1e] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#0a0a0a]">
                {["Nombre","Nombre Científico","Rareza","Maduración","Notas","Maridaje ES",""].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono tracking-wider text-stone-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-[#131313] hover:bg-[#0c0c0c] transition-colors">
                  <td className="px-4 py-3 text-stone-200 font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-stone-500 italic text-xs">{a.scientific_name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 border ${
                      a.rarity === "silvestre" ? "border-amber-600 text-amber-500" :
                      a.rarity === "raro" ? "border-red-800 text-red-500" :
                      "border-stone-700 text-stone-500"
                    }`}>{a.rarity}</span>
                  </td>
                  <td className="px-4 py-3 text-stone-400">{a.maturation_years ? `${a.maturation_years} años` : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {a.flavor_notes?.slice(0, 3).map(n => (
                        <span key={n} className="text-xs text-stone-500 border border-[#2a2a2a] px-1.5 py-0.5">{n}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-500 text-xs max-w-xs truncate">
                    {a.pairing_rationale_es ? (
                      <span className="text-stone-400">{a.pairing_rationale_es.slice(0, 60)}…</span>
                    ) : (
                      <span className="text-stone-700 italic">Pendiente</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-stone-700 hover:text-amber-400 text-xs transition-colors">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
