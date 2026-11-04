"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Maestra {
  id: number; slug: string; palenque_name: string; maestro_name: string
  state: string; municipality: string; founded_year: number
  agave_species: string[]; production_method: string; is_verified: boolean
}

export default function AdminMaestras() {
  const [items, setItems] = useState<Maestra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/palenques?maestra=true")
      .then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-serif text-stone-100">Maestras Mezcaleras</h1>
        <p className="text-stone-500 text-sm">{items.length} maestras en el registro</p>
      </div>

      {loading ? (
        <p className="text-stone-600 text-sm animate-pulse">Cargando...</p>
      ) : (
        <div className="grid gap-4">
          {items.map(m => (
            <div key={m.id} className="border border-[#1e1e1e] bg-[#0a0a0a] p-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-400 text-xs">✦</span>
                  <p className="text-stone-100 font-medium">{m.maestro_name}</p>
                </div>
                <p className="text-amber-600 text-sm mb-2">{m.palenque_name}</p>
                <div className="flex flex-wrap gap-3 text-xs text-stone-500">
                  <span>{m.municipality}, {m.state}</span>
                  {m.founded_year && <span>Est. {m.founded_year}</span>}
                  <span className="capitalize">{m.production_method}</span>
                </div>
                {m.agave_species?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {m.agave_species.map(a => (
                      <span key={a} className="px-2 py-0.5 border border-[#262626] text-stone-400 text-xs">{a}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 items-end shrink-0 ml-4">
                {m.is_verified && (
                  <span className="text-emerald-500 text-xs">● Verificada</span>
                )}
                <Link
                  href={`/palenques/${m.slug}`}
                  target="_blank"
                  className="text-stone-600 hover:text-amber-400 text-xs transition-colors"
                >
                  Ver perfil →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
