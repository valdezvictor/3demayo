"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Palenque {
  id: number
  slug: string
  palenque_name: string
  maestro_name: string
  maestro_title: string
  municipality: string
  state: string
  altitude_m: number
  founded_year: number
  description_es: string
  agave_species: string[]
  production_method: string
  is_verified: boolean
  region_name?: string
}

export default function MaestrasPage() {
  const [maestras, setMaestras] = useState<Palenque[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/palenques?maestra=true")
      .then(r => r.json())
      .then(data => {
        setMaestras(data.items || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const pueblaMaestras = maestras.filter(m => m.state === "Puebla")
  const otherMaestras = maestras.filter(m => m.state !== "Puebla")

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">
      {/* Hero */}
      <div className="relative border-b border-[#262626] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 py-20 relative">
          <p className="text-amber-500 text-xs font-mono tracking-widest mb-6">
            ✦ REGISTRO · MAESTRAS MEZCALERAS
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-100 mb-6 leading-tight">
            Las Guardianas<br />del Maguey
          </h1>
          <p className="text-stone-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            Las mujeres que custodian el conocimiento ancestral de la destilación del mezcal.
            Generaciones de sabiduría transmitida por la palabra y el instinto — no por manuales de laboratorio.
          </p>
        </div>
      </div>

      {/* The story */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-100 mb-4">
              Una Tradición Invisible
            </h2>
            <p className="text-stone-400 leading-relaxed mb-4">
              Durante siglos, las mujeres de la Sierra Mixteca de Puebla han sido las custodias
              silenciosas del mezcal ancestral. Mientras los directorios internacionales registran
              nombres masculinos, las maestras mezcaleras han continuado destilando en sus hogares,
              transmitiendo técnicas milenarias de madre a hija.
            </p>
            <p className="text-stone-400 leading-relaxed">
              3 de Mayo existe para hacer visible lo invisible. Este registro es el primer
              directorio abierto dedicado a las maestras mezcaleras de México — comenzando con
              las mujeres de Puebla.
            </p>
          </div>
          <div className="space-y-6">
            <div className="border border-[#262626] bg-[#171717] p-6">
              <p className="text-3xl font-serif font-bold text-amber-400 mb-1">
                {loading ? "—" : maestras.length}
              </p>
              <p className="text-stone-500 text-sm">Maestras Mezcaleras en el Registro</p>
            </div>
            <div className="border border-[#262626] bg-[#171717] p-6">
              <p className="text-3xl font-serif font-bold text-amber-400 mb-1">
                {loading ? "—" : pueblaMaestras.length}
              </p>
              <p className="text-stone-500 text-sm">Productoras de Puebla · Sierra Mixteca</p>
            </div>
            <div className="border border-[#262626] bg-[#171717] p-6">
              <p className="text-3xl font-serif font-bold text-amber-400 mb-1">4</p>
              <p className="text-stone-500 text-sm">Generaciones de Conocimiento Preservado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Las Hijas del Maguey feature */}
      <div className="border-b border-[#262626]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="border border-amber-500/30 bg-amber-500/5 p-8 md:p-10">
            <p className="text-amber-500 text-xs font-mono tracking-widest mb-4">
              ✦ COLECTIVO DESTACADO
            </p>
            <h2 className="text-3xl font-serif font-bold text-stone-100 mb-4">
              Las Hijas del Maguey
            </h2>
            <p className="text-stone-300 text-lg leading-relaxed mb-4">
              <em>Mujeres del Agave del Estado de Puebla</em>
            </p>
            <p className="text-stone-400 leading-relaxed mb-6 max-w-2xl">
              El primer proyecto de mezcal de autoría colectiva femenina certificado en el estado de Puebla.
              Fundado en 2018 por siete productoras de la Sierra Mixteca, Las Hijas del Maguey
              representa la convergencia de la tradición ancestral y la organización contemporánea.
            </p>
            <p className="text-stone-400 leading-relaxed max-w-2xl">
              Su mezcal no es sólo una bebida — es un acto político de visibilidad, una declaración
              de que el conocimiento más antiguo de esta tierra pertenece a las manos que lo han
              cuidado durante generaciones.
            </p>
            <div className="mt-6">
              <Link
                href="/palenques/palenque-hijas-maguey-puebla"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                Ver su registro completo →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Puebla Maestras Grid */}
      {pueblaMaestras.length > 0 && (
        <div className="border-b border-[#262626]">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-amber-500 text-xs font-mono tracking-widest mb-2">
                  SIERRA MIXTECA · PUEBLA
                </p>
                <h2 className="text-3xl font-serif font-bold text-stone-100">
                  Maestras de Puebla
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {pueblaMaestras.map(m => (
                <MaestraCard key={m.slug} maestra={m} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Maestras */}
      {otherMaestras.length > 0 && (
        <div className="border-b border-[#262626] bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <div className="mb-8">
              <p className="text-stone-600 text-xs font-mono tracking-widest mb-2">
                OTROS ESTADOS
              </p>
              <h2 className="text-3xl font-serif font-bold text-stone-100">
                Maestras del Registro Nacional
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {otherMaestras.map(m => (
                <MaestraCard key={m.slug} maestra={m} />
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="max-w-5xl mx-auto px-4 py-20 flex justify-center">
          <p className="text-stone-600 text-sm font-mono animate-pulse">
            CARGANDO REGISTRO...
          </p>
        </div>
      )}

      {/* CTA: Register */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-serif font-bold text-stone-200 mb-4">
          ¿Eres Maestra Mezcalera?
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto">
          Este registro está construido para las mujeres que hacen el mezcal.
          Si produces mezcal ancestral o artesanal y quieres que tu palenque aparezca aquí,
          contáctanos directamente.
        </p>
        <a
          href="mailto:registro@3demayo.com"
          className="inline-flex items-center gap-2 px-6 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all text-sm font-medium"
        >
          Registrar mi Palenque
        </a>
      </div>
    </div>
  )
}

function MaestraCard({ maestra }: { maestra: Palenque }) {
  return (
    <Link
      href={`/palenques/${maestra.slug}`}
      className="block border border-[#262626] bg-[#0a0a0a] hover:border-amber-500/40 hover:bg-[#0f0f0f] transition-all p-6"
    >
      {/* Maestra badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-amber-500 text-xs">✦</span>
        <span className="text-amber-500 text-xs font-mono tracking-widest">MAESTRA MEZCALERA</span>
      </div>

      <h3 className="text-lg font-serif font-bold text-stone-100 mb-1">
        {maestra.palenque_name}
      </h3>
      <p className="text-amber-400 text-sm mb-1">{maestra.maestro_name}</p>
      <p className="text-stone-500 text-xs mb-4">
        {maestra.municipality} · {maestra.state}
        {maestra.altitude_m ? ` · ${maestra.altitude_m.toLocaleString()} m` : ""}
      </p>

      <p className="text-stone-400 text-sm leading-relaxed line-clamp-3 mb-4">
        {maestra.description_es}
      </p>

      {maestra.agave_species?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {maestra.agave_species.slice(0, 3).map(sp => (
            <span
              key={sp}
              className="px-2 py-0.5 border border-[#262626] text-stone-500 text-xs rounded-sm"
            >
              {sp}
            </span>
          ))}
        </div>
      )}

      <p className="text-amber-500 text-xs mt-4">Ver perfil completo →</p>
    </Link>
  )
}
