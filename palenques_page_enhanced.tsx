"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"

interface Palenque {
  id: number
  slug: string
  palenque_name: string
  maestro_name: string
  maestro_title: string
  is_maestra: boolean
  municipality: string
  state: string
  altitude_m: number
  founded_year: number
  description_es: string
  agave_species: string[]
  production_method: string
  certifications: string[]
  is_verified: boolean
  region_name?: string
}

const STATES = ["Puebla", "Oaxaca", "Guerrero", "Michoacán"]

const methodLabel: Record<string, string> = {
  ancestral: "Ancestral",
  artisanal: "Artesanal",
  traditional: "Tradicional",
}

export default function PalenquesPage() {
  const [items, setItems] = useState<Palenque[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [maestraOnly, setMaestraOnly] = useState(false)
  const [activeState, setActiveState] = useState("")
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    const params = new URLSearchParams()
    if (maestraOnly) params.set("maestra", "true")
    if (activeState) params.set("state", activeState)
    if (debouncedSearch) params.set("search", debouncedSearch)

    setLoading(true)
    fetch(`/api/palenques?${params.toString()}`)
      .then(r => r.json())
      .then(data => {
        setItems(data.items || [])
        setTotal(data.total || 0)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [maestraOnly, activeState, debouncedSearch])

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">
      {/* Header */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-amber-500 text-xs font-mono tracking-widest mb-3">
            REGISTRO PATRIMONIAL · MEZCAL MEXICANO
          </p>
          <h1 className="text-4xl font-serif font-bold text-stone-100 mb-2">
            Registro de Palenques
          </h1>
          <p className="text-stone-400 text-sm">
            {loading ? "Cargando..." : `${total} palenque${total !== 1 ? "s" : ""} en el registro`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#262626] sticky top-0 z-30 bg-[#080808]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar palenque, maestro, municipio..."
              className="w-full bg-[#0a0a0a] border border-[#262626] pl-9 pr-4 py-2.5 text-stone-200 placeholder-stone-600 focus:border-amber-500/50 outline-none text-sm rounded-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {/* Maestra toggle — primary */}
            <button
              onClick={() => setMaestraOnly(!maestraOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs transition-all ${
                maestraOnly
                  ? "border-amber-500 text-amber-400 bg-amber-500/10"
                  : "border-[#262626] text-stone-500 hover:border-stone-600 hover:text-stone-400"
              }`}
            >
              <span>✦</span>
              Solo Maestras
            </button>

            {/* Divider */}
            <span className="self-center text-stone-700 text-xs">|</span>

            {/* All states button */}
            <button
              onClick={() => setActiveState("")}
              className={`px-3 py-1.5 border text-xs transition-all ${
                !activeState
                  ? "border-stone-500 text-stone-300"
                  : "border-[#262626] text-stone-600 hover:border-stone-700 hover:text-stone-500"
              }`}
            >
              Todos los estados
            </button>

            {STATES.map(s => (
              <button
                key={s}
                onClick={() => setActiveState(activeState === s ? "" : s)}
                className={`px-3 py-1.5 border text-xs transition-all ${
                  activeState === s
                    ? "border-amber-500/60 text-amber-400 bg-amber-500/10"
                    : "border-[#262626] text-stone-600 hover:border-stone-700 hover:text-stone-400"
                }`}
              >
                {s}
              </button>
            ))}

            {/* Clear all */}
            {(maestraOnly || activeState || search) && (
              <button
                onClick={() => { setMaestraOnly(false); setActiveState(""); setSearch("") }}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-400 transition-colors ml-auto"
              >
                Limpiar filtros ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-[#262626] bg-[#0a0a0a] p-6 animate-pulse">
                <div className="h-3 bg-[#171717] rounded w-32 mb-4" />
                <div className="h-5 bg-[#171717] rounded w-48 mb-2" />
                <div className="h-4 bg-[#171717] rounded w-36 mb-4" />
                <div className="h-3 bg-[#171717] rounded w-40 mb-3" />
                <div className="flex gap-2">
                  <div className="h-6 bg-[#171717] rounded w-16" />
                  <div className="h-6 bg-[#171717] rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-600 text-sm mb-3">
              No se encontraron palenques con esos filtros.
            </p>
            <button
              onClick={() => { setMaestraOnly(false); setActiveState(""); setSearch("") }}
              className="text-amber-500 hover:text-amber-400 text-sm transition-colors"
            >
              Ver todos los palenques
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(p => (
              <PalenqueCard key={p.slug} palenque={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PalenqueCard({ palenque: p }: { palenque: Palenque }) {
  return (
    <Link
      href={`/palenques/${p.slug}`}
      className="group flex flex-col border border-[#262626] bg-[#0a0a0a] hover:border-amber-500/40 hover:bg-[#0f0f0f] transition-all p-6"
    >
      {/* Maestra badge */}
      {p.is_maestra ? (
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-amber-500 text-xs">✦</span>
          <span className="text-amber-500 text-xs font-mono tracking-widest">
            MAESTRA MEZCALERA
          </span>
        </div>
      ) : (
        <div className="mb-4 h-5" />
      )}

      {/* Name */}
      <h2 className="text-lg font-serif font-bold text-stone-100 mb-1 group-hover:text-amber-50 transition-colors">
        {p.palenque_name}
      </h2>

      {/* Maestro */}
      <p className={`text-sm mb-1 ${p.is_maestra ? "text-amber-400" : "text-stone-400"}`}>
        {p.maestro_name}
      </p>

      {/* Location */}
      <p className="text-stone-600 text-xs mb-4">
        {p.municipality} · {p.state}
        {p.altitude_m ? ` · ${p.altitude_m.toLocaleString()} m` : ""}
        {p.founded_year ? ` · est. ${p.founded_year}` : ""}
      </p>

      {/* Description */}
      <p className="text-stone-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
        {p.description_es}
      </p>

      {/* Agave chips */}
      {p.agave_species?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.agave_species.slice(0, 3).map(sp => (
            <span
              key={sp}
              className="px-2 py-0.5 border border-[#262626] text-stone-500 text-xs rounded-sm bg-[#171717]"
            >
              {sp}
            </span>
          ))}
          {p.agave_species.length > 3 && (
            <span className="text-stone-600 text-xs self-center">
              +{p.agave_species.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          {p.production_method && (
            <span className={`text-xs px-2 py-0.5 border rounded-sm ${
              p.production_method === "ancestral"
                ? "border-amber-500/40 text-amber-600"
                : p.production_method === "artisanal"
                ? "border-yellow-600/40 text-yellow-600"
                : "border-stone-600/40 text-stone-500"
            }`}>
              {methodLabel[p.production_method] || p.production_method}
            </span>
          )}
          {p.is_verified && (
            <span className="text-emerald-600 text-xs">✓</span>
          )}
        </div>
        <span className="text-amber-500 text-xs group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </div>
    </Link>
  )
}
