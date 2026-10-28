"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Stats {
  total: number
  maestras: number
  states: number
}

export default function HomePage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [featured, setFeatured] = useState<any[]>([])

  useEffect(() => {
    // Fetch all palenques for stats + featured maestras
    fetch("/api/palenques")
      .then(r => r.json())
      .then(data => {
        const items = data.items || []
        const maestraCount = items.filter((p: any) => p.is_maestra).length
        const stateSet = new Set(items.map((p: any) => p.state))
        setStats({ total: items.length, maestras: maestraCount, states: stateSet.size })
        // Featured: top 3 maestras
        setFeatured(items.filter((p: any) => p.is_maestra).slice(0, 3))
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">
      {/* Hero */}
      <div className="relative min-h-[80vh] flex items-center border-b border-[#262626] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #c29418 0px, #c29418 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #c29418 0px, #c29418 1px, transparent 1px, transparent 60px)"
          }}
        />
        <div className="max-w-5xl mx-auto px-4 py-24 relative">
          <p className="text-amber-500 text-xs font-mono tracking-widest mb-8">
            3 DE MAYO · REGISTRO PATRIMONIAL DEL MEZCAL MEXICANO
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-100 mb-8 leading-tight">
            Cada botella es<br />
            <span className="text-amber-400">un acto de devoción.</span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            El registro abierto que preserva el conocimiento de los maestros y palenques
            del mezcal ancestral mexicano. 12 estados certificados. 40+ especies de agave.
            Las mujeres de la Sierra Mixteca.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/palenques"
              className="px-6 py-3 bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors text-sm"
            >
              Explorar el Registro
            </Link>
            <Link
              href="/maestras"
              className="px-6 py-3 border border-amber-500/50 text-amber-400 hover:border-amber-500 hover:text-amber-300 transition-colors text-sm"
            >
              ✦ Las Maestras Mezcaleras
            </Link>
            <Link
              href="/for-restaurants"
              className="px-6 py-3 border border-[#262626] text-stone-400 hover:border-stone-600 hover:text-stone-300 transition-colors text-sm"
            >
              Para Restaurantes →
            </Link>
          </div>
        </div>
      </div>

      {/* Live stats */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-serif font-bold text-amber-400 mb-1">
                {stats ? stats.total : "—"}
              </p>
              <p className="text-stone-500 text-sm">Palenques Registrados</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-amber-400 mb-1">
                {stats ? stats.maestras : "—"}
              </p>
              <p className="text-stone-500 text-sm">Maestras Mezcaleras</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-amber-400 mb-1">
                {stats ? stats.states : "—"}
              </p>
              <p className="text-stone-500 text-sm">Estados Productores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="border-b border-[#262626]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-stone-600 text-xs font-mono tracking-widest mb-10 text-center">
            LOS TRES PILARES
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-[#262626] bg-[#0a0a0a] p-8">
              <p className="text-amber-500 text-2xl mb-4">⬡</p>
              <h3 className="text-xl font-serif font-bold text-stone-100 mb-3">La Planta</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Más de 40 especies de agave certificadas. Desde el Tobalá silvestre que
                tarda 15 años en madurar, hasta el Tepextate que puede vivir 25 años
                antes de florecer una sola vez.
              </p>
              <Link
                href="/palenques"
                className="mt-4 block text-amber-500 text-xs hover:text-amber-400 transition-colors"
              >
                Explorar por agave →
              </Link>
            </div>
            <div className="border border-[#262626] bg-[#0a0a0a] p-8">
              <p className="text-amber-500 text-2xl mb-4">◎</p>
              <h3 className="text-xl font-serif font-bold text-stone-100 mb-3">El Terroir</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                La arcilla porosa de Puebla. El suelo volcánico de Oaxaca. La altitud
                del Guerrero. El micro-terroir de cada palenque define el carácter
                irrepetible de cada destilado.
              </p>
              <Link
                href="/palenques"
                className="mt-4 block text-amber-500 text-xs hover:text-amber-400 transition-colors"
              >
                Atlas de regiones →
              </Link>
            </div>
            <div className="border border-[#262626] bg-[#0a0a0a] p-8">
              <p className="text-amber-500 text-2xl mb-4">✦</p>
              <h3 className="text-xl font-serif font-bold text-stone-100 mb-3">El Ritual</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                El 3 de mayo, los palenques se detienen. Se tejen cruces de agave.
                Las primeras gotas de la cosecha se vierten sobre la tierra seca —
                no en botellas, sino como ofrenda al suelo que nutrió la planta.
              </p>
              <Link
                href="/about"
                className="mt-4 block text-amber-500 text-xs hover:text-amber-400 transition-colors"
              >
                La tradición →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Maestras */}
      {featured.length > 0 && (
        <div className="border-b border-[#262626] bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-amber-500 text-xs font-mono tracking-widest mb-2">
                  ✦ MAESTRAS DESTACADAS
                </p>
                <h2 className="text-3xl font-serif font-bold text-stone-100">
                  Las Guardianas del Maguey
                </h2>
              </div>
              <Link
                href="/maestras"
                className="text-amber-500 hover:text-amber-400 text-sm transition-colors hidden md:block"
              >
                Ver todas →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {featured.map(p => (
                <Link
                  key={p.slug}
                  href={`/palenques/${p.slug}`}
                  className="border border-[#262626] hover:border-amber-500/40 bg-[#171717] hover:bg-[#1a1a1a] transition-all p-5"
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-amber-400 text-xs">✦</span>
                    <span className="text-amber-400 text-xs font-mono tracking-wider">
                      MAESTRA MEZCALERA
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-stone-100 mb-1">
                    {p.palenque_name}
                  </h3>
                  <p className="text-amber-400 text-xs mb-1">{p.maestro_name}</p>
                  <p className="text-stone-600 text-xs mb-3">
                    {p.municipality} · {p.state}
                  </p>
                  <p className="text-stone-400 text-xs leading-relaxed line-clamp-2">
                    {p.description_es}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6 md:hidden">
              <Link href="/maestras" className="text-amber-500 text-sm">
                Ver todas las maestras →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* B2B teaser */}
      <div className="border-b border-[#262626]">
        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-amber-500 text-xs font-mono tracking-widest mb-4">
              PARA RESTAURANTES Y BARES
            </p>
            <h2 className="text-3xl font-serif font-bold text-stone-100 mb-4">
              Deja de vender humo.<br />Empieza a vender terroir.
            </h2>
            <p className="text-stone-400 leading-relaxed mb-6">
              Tres vuelos de gastronomía listos para usar. Datos botánicos completos.
              Materiales de entrenamiento para tu equipo. Conexión directa con palenques ancestrales.
            </p>
            <Link
              href="/for-restaurants"
              className="inline-flex items-center gap-2 px-6 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all text-sm font-medium"
            >
              Ver programas de mezcal →
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "Vuelo 01: Ecos Ancestrales", desc: "Arcilla y tierra — Tobalá silvestre + Papalote" },
              { name: "Vuelo 02: Micro-Terroir", desc: "Caza silvestre — Cenizo + Salmiana" },
              { name: "Vuelo 03: Armonía Botánica", desc: "Borde costero — Espadín Capón + Ixtero" },
            ].map((f, i) => (
              <div
                key={i}
                className="border border-[#262626] bg-[#0a0a0a] p-4 flex items-center gap-4"
              >
                <span className="text-amber-500/60 font-mono text-xs w-6 shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-stone-200 text-sm font-medium">{f.name}</p>
                  <p className="text-stone-500 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* May 3rd quote */}
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-600 text-xs font-mono tracking-widest mb-8">3 DE MAYO</p>
        <blockquote className="text-2xl md:text-3xl font-serif italic text-stone-300 max-w-3xl mx-auto leading-relaxed mb-8">
          "El 3 de mayo, el palenque se detiene. Se limpian los pisos de tierra.
          Se honra el linaje. Las primeras gotas se devuelven a la tierra."
        </blockquote>
        <Link href="/about" className="text-amber-500 hover:text-amber-400 text-sm transition-colors">
          La historia del 3 de Mayo →
        </Link>
      </div>
    </div>
  )
}
