"use client"
import { useEffect, useState } from "react"

interface Lead {
  id: number; restaurant_name: string; contact_name: string
  email: string; phone: string; city: string; flight_interest: string
  message: string; created_at: string; status: string
}

export default function AdminLeads() {
  const [items, setItems] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetch("/api/admin/leads").then(r => r.json()).then(d => { setItems(d); setLoading(false) }) }, [])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-serif text-stone-100">B2B Leads — Restaurantes</h1>
        <p className="text-stone-500 text-sm">{items.length} solicitudes del programa Los Tres Vuelos</p>
      </div>

      {loading ? (
        <p className="text-stone-600 text-sm animate-pulse">Cargando...</p>
      ) : items.length === 0 ? (
        <div className="border border-[#1e1e1e] bg-[#0a0a0a] p-8 text-center">
          <p className="text-stone-500 text-sm">No hay solicitudes aún.</p>
          <p className="text-stone-600 text-xs mt-2">Las solicitudes de /for-restaurants aparecerán aquí.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(l => (
            <div key={l.id} className="border border-[#1e1e1e] bg-[#0a0a0a] p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-stone-100 font-medium">{l.restaurant_name}</p>
                  <p className="text-stone-500 text-sm">{l.contact_name} · {l.email}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 border ${
                    l.status === "new" ? "border-amber-600 text-amber-500" :
                    l.status === "contacted" ? "border-blue-700 text-blue-400" :
                    "border-stone-700 text-stone-500"
                  }`}>{l.status || "nuevo"}</span>
                  <p className="text-stone-600 text-xs mt-1">{new Date(l.created_at).toLocaleDateString("es-MX")}</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-stone-500 mb-2">
                {l.city && <span>📍 {l.city}</span>}
                {l.phone && <span>📞 {l.phone}</span>}
                {l.flight_interest && <span>✦ {l.flight_interest}</span>}
              </div>
              {l.message && <p className="text-stone-400 text-sm border-t border-[#1a1a1a] pt-2 mt-2">{l.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
