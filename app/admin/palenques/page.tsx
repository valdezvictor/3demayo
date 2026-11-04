"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Palenque {
  id: number; slug: string; palenque_name: string; maestro_name: string
  is_maestra: boolean; state: string; municipality: string
  is_active: boolean; is_verified: boolean; production_method: string
}

export default function AdminPalenques() {
  const [items, setItems] = useState<Palenque[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => { fetch("/api/admin/palenques").then(r => r.json()).then(d => { setItems(d); setLoading(false) }) }, [])

  const filtered = items.filter(p =>
    !search || p.palenque_name.toLowerCase().includes(search.toLowerCase()) ||
    p.state.toLowerCase().includes(search.toLowerCase())
  )

  async function toggle(id: number, field: "is_active" | "is_verified", val: boolean) {
    await fetch(`/api/admin/palenques/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: val }),
    })
    setItems(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-serif text-stone-100">Palenques</h1>
          <p className="text-stone-500 text-sm">{items.length} productores registrados</p>
        </div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="bg-[#111] border border-[#2a2a2a] text-stone-300 px-3 py-2 text-sm w-56 focus:outline-none focus:border-amber-500/40"
        />
      </div>

      {loading ? (
        <p className="text-stone-600 text-sm animate-pulse">Cargando...</p>
      ) : (
        <div className="border border-[#1e1e1e] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#0a0a0a]">
                {["Palenque","Maestro/a","Estado","Método","Activo","Verificado",""].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono tracking-wider text-stone-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-[#131313] hover:bg-[#0c0c0c] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-stone-200">{p.palenque_name}</p>
                    <p className="text-stone-600 text-xs">{p.municipality}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className={p.is_maestra ? "text-amber-400" : "text-stone-300"}>{p.maestro_name}</p>
                    {p.is_maestra && <p className="text-amber-600 text-xs">✦ Maestra</p>}
                  </td>
                  <td className="px-4 py-3 text-stone-400">{p.state}</td>
                  <td className="px-4 py-3 text-stone-500 capitalize">{p.production_method}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(p.id, "is_active", !p.is_active)}
                      className={`px-2 py-1 text-xs border transition-colors ${p.is_active ? "border-emerald-600 text-emerald-400" : "border-stone-700 text-stone-600 hover:border-stone-500"}`}
                    >
                      {p.is_active ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(p.id, "is_verified", !p.is_verified)}
                      className={`px-2 py-1 text-xs border transition-colors ${p.is_verified ? "border-amber-600 text-amber-400" : "border-stone-700 text-stone-600 hover:border-stone-500"}`}
                    >
                      {p.is_verified ? "✓ Verif." : "Pendiente"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/palenques/${p.slug}`} target="_blank" className="text-stone-600 hover:text-amber-400 text-xs transition-colors">Ver →</Link>
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
