"use client"
import { useEffect, useState } from "react"

interface Subscriber {
  id: number; email: string; name: string; source: string
  created_at: string; confirmed: boolean
}

export default function AdminVisitantes() {
  const [items, setItems] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetch("/api/admin/visitantes").then(r => r.json()).then(d => { setItems(d); setLoading(false) }) }, [])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-serif text-stone-100">Visitantes y Suscriptores</h1>
        <p className="text-stone-500 text-sm">{items.length} registros</p>
      </div>

      {loading ? (
        <p className="text-stone-600 text-sm animate-pulse">Cargando...</p>
      ) : items.length === 0 ? (
        <div className="border border-[#1e1e1e] bg-[#0a0a0a] p-8 text-center">
          <p className="text-stone-500 text-sm">Sin suscriptores aún.</p>
        </div>
      ) : (
        <div className="border border-[#1e1e1e] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e1e] bg-[#0a0a0a]">
                {["Email","Nombre","Fuente","Registro","Estado"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono tracking-wider text-stone-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(s => (
                <tr key={s.id} className="border-b border-[#131313] hover:bg-[#0c0c0c]">
                  <td className="px-4 py-3 text-stone-300">{s.email}</td>
                  <td className="px-4 py-3 text-stone-400">{s.name || "—"}</td>
                  <td className="px-4 py-3 text-stone-500 text-xs">{s.source || "—"}</td>
                  <td className="px-4 py-3 text-stone-500 text-xs">{new Date(s.created_at).toLocaleDateString("es-MX")}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${s.confirmed ? "text-emerald-500" : "text-stone-600"}`}>
                      {s.confirmed ? "● Confirmado" : "○ Pendiente"}
                    </span>
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
