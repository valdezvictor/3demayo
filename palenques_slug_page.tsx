"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
  description_en: string
  agave_species: string[]
  production_method: string
  certifications: string[]
  is_verified: boolean
  website?: string
  instagram?: string
  contact_email?: string
  hero_image_url?: string
  region_name?: string
  region_desc_es?: string
}

const productionMethodLabel: Record<string, string> = {
  ancestral: "Ancestral",
  artisanal: "Artesanal",
  traditional: "Tradicional",
}

const productionMethodColor: Record<string, string> = {
  ancestral: "border-amber-500 text-amber-400",
  artisanal: "border-yellow-600 text-yellow-400",
  traditional: "border-stone-500 text-stone-400",
}

export default function PalenquePage() {
  const params = useParams()
  const router = useRouter()
  const [palenque, setPalenque] = useState<Palenque | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [lang, setLang] = useState<"es" | "en">("es")

  useEffect(() => {
    if (!params?.slug) return
    fetch(`/api/palenques/${params.slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setPalenque(data)
        setLoading(false)
      })
      .catch(() => {
        setError("No se pudo cargar el palenque.")
        setLoading(false)
      })
  }, [params?.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-amber-500 text-sm font-mono tracking-widest animate-pulse">
          CARGANDO REGISTRO...
        </div>
      </div>
    )
  }

  if (error || !palenque) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
        <p className="text-stone-400">Palenque no encontrado.</p>
        <Link href="/palenques" className="text-amber-500 hover:text-amber-400 text-sm">
          ← Volver al Registro
        </Link>
      </div>
    )
  }

  const description = lang === "es" ? palenque.description_es : palenque.description_en

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">
      {/* Nav breadcrumb */}
      <div className="border-b border-[#262626]">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link
            href="/palenques"
            className="text-stone-500 hover:text-amber-500 text-sm transition-colors"
          >
            ← Registro de Palenques
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Maestra badge */}
          {palenque.is_maestra && (
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-amber-500/40 rounded-sm">
              <span className="text-amber-400 text-xs">✦</span>
              <span className="text-amber-400 text-xs font-mono tracking-widest">
                MAESTRA MEZCALERA
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-100 mb-2">
            {palenque.palenque_name}
          </h1>

          <p className="text-amber-500 font-medium text-lg mb-1">
            {palenque.maestro_name}
          </p>
          <p className="text-stone-500 text-sm mb-6">{palenque.maestro_title}</p>

          {/* Key stats row */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-stone-600 text-xs font-mono tracking-widest">ESTADO</span>
              <p className="text-stone-200 mt-0.5">{palenque.state}</p>
            </div>
            <div>
              <span className="text-stone-600 text-xs font-mono tracking-widest">MUNICIPIO</span>
              <p className="text-stone-200 mt-0.5">{palenque.municipality}</p>
            </div>
            {palenque.altitude_m && (
              <div>
                <span className="text-stone-600 text-xs font-mono tracking-widest">ALTITUD</span>
                <p className="text-stone-200 mt-0.5">{palenque.altitude_m.toLocaleString()} m</p>
              </div>
            )}
            {palenque.founded_year && (
              <div>
                <span className="text-stone-600 text-xs font-mono tracking-widest">FUNDADO</span>
                <p className="text-stone-200 mt-0.5">{palenque.founded_year}</p>
              </div>
            )}
            {palenque.region_name && (
              <div>
                <span className="text-stone-600 text-xs font-mono tracking-widest">REGIÓN</span>
                <p className="text-stone-200 mt-0.5">{palenque.region_name}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Left: description */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-mono tracking-widest text-stone-500">DESCRIPCIÓN</h2>
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => setLang("es")}
                  className={`px-2 py-1 border transition-colors ${
                    lang === "es"
                      ? "border-amber-500 text-amber-400"
                      : "border-[#262626] text-stone-600 hover:text-stone-400"
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 border transition-colors ${
                    lang === "en"
                      ? "border-amber-500 text-amber-400"
                      : "border-[#262626] text-stone-600 hover:text-stone-400"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <p className="text-stone-300 leading-relaxed text-base">{description}</p>
          </section>

          {/* Agave species */}
          {palenque.agave_species?.length > 0 && (
            <section>
              <h2 className="text-xs font-mono tracking-widest text-stone-500 mb-4">
                VARIEDADES DE AGAVE
              </h2>
              <div className="flex flex-wrap gap-2">
                {palenque.agave_species.map(sp => (
                  <span
                    key={sp}
                    className="px-3 py-1.5 border border-[#262626] text-stone-300 text-sm rounded-sm bg-[#171717]"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Production method */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-stone-500 mb-4">
              MÉTODO DE PRODUCCIÓN
            </h2>
            <span
              className={`px-3 py-1.5 border text-sm rounded-sm ${
                productionMethodColor[palenque.production_method] ||
                "border-stone-600 text-stone-400"
              }`}
            >
              {productionMethodLabel[palenque.production_method] || palenque.production_method}
            </span>
          </section>

          {/* Certifications */}
          {palenque.certifications?.length > 0 && (
            <section>
              <h2 className="text-xs font-mono tracking-widest text-stone-500 mb-4">
                CERTIFICACIONES
              </h2>
              <div className="flex flex-wrap gap-2">
                {palenque.certifications.map(cert => (
                  <span
                    key={cert}
                    className="px-3 py-1.5 border border-amber-500/30 text-amber-600 text-xs font-mono rounded-sm"
                  >
                    {cert} ✓
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: contact + registry info */}
        <div className="space-y-6">
          {/* Verified badge */}
          {palenque.is_verified && (
            <div className="border border-[#262626] bg-[#0a0a0a] p-4">
              <p className="text-xs font-mono tracking-widest text-stone-600 mb-1">ESTADO</p>
              <p className="text-emerald-500 text-sm flex items-center gap-2">
                <span>●</span> Registro Verificado
              </p>
            </div>
          )}

          {/* Contact */}
          <div className="border border-[#262626] bg-[#0a0a0a] p-4 space-y-3">
            <p className="text-xs font-mono tracking-widest text-stone-600 mb-3">CONTACTO</p>

            {palenque.website && (
              <a
                href={palenque.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-amber-400 transition-colors"
              >
                <span className="text-stone-600">🌐</span>
                {palenque.website.replace(/^https?:\/\//, "")}
              </a>
            )}

            {palenque.instagram && (
              <a
                href={`https://instagram.com/${palenque.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-amber-400 transition-colors"
              >
                <span className="text-stone-600">📷</span>
                {palenque.instagram}
              </a>
            )}

            {palenque.contact_email && (
              <a
                href={`mailto:${palenque.contact_email}`}
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-amber-400 transition-colors"
              >
                <span className="text-stone-600">✉</span>
                {palenque.contact_email}
              </a>
            )}

            {!palenque.website && !palenque.instagram && !palenque.contact_email && (
              <p className="text-stone-600 text-sm">Contacto no disponible</p>
            )}
          </div>

          {/* Registry info */}
          <div className="border border-[#262626] bg-[#0a0a0a] p-4">
            <p className="text-xs font-mono tracking-widest text-stone-600 mb-3">
              ID DE REGISTRO
            </p>
            <p className="text-stone-500 font-mono text-xs">{palenque.slug}</p>
          </div>

          {/* B2B CTA */}
          <div className="border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-amber-400 text-xs font-mono tracking-widest mb-2">
              PARA RESTAURANTES
            </p>
            <p className="text-stone-400 text-xs leading-relaxed mb-3">
              ¿Interesado en incluir este palenque en tu programa de mezcal?
            </p>
            <Link
              href="/for-restaurants"
              className="text-amber-500 hover:text-amber-400 text-xs transition-colors"
            >
              Ver programas de gastronomía →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
