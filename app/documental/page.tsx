"use client"

import { useState } from "react"
import Link from "next/link"

export default function Documental() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire to API route
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end border-b border-[#262626] overflow-hidden">
        {/* Simulated dark cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-stone-900/40 to-[#080808] pointer-events-none" />

        {/* Abstract texture suggesting smoke/maguey */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at 30% 50%, #c29418 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #8b5e3c 0%, transparent 50%)"
          }}
        />

        <div className="max-w-5xl mx-auto px-4 pb-16 relative z-20">
          <p className="text-amber-500 text-xs font-mono tracking-widest mb-4">
            DOCUMENTAL · EN PRODUCCIÓN
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-100 mb-4 leading-tight">
            Las Hijas<br />
            <span className="text-amber-400">del Maguey</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-xl">
            Un documental sobre las mujeres que preservan el mezcal ancestral de Puebla.
          </p>
        </div>
      </div>

      {/* Documentary info */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-100 mb-6">
              El Proyecto
            </h2>
            <div className="space-y-5 text-stone-400 leading-relaxed">
              <p>
                Durante décadas, las maestras mezcaleras de la Sierra Mixteca de Puebla
                han destilado en silencio. Sus nombres no aparecen en los directorios
                internacionales. Sus técnicas no se enseñan en las escuelas de enología.
                Su conocimiento vive únicamente en la memoria de sus hijas.
              </p>
              <p>
                Este documental sigue a siete mujeres de la Sierra Mixteca — las fundadoras
                del colectivo Las Hijas del Maguey — a través de un ciclo completo de
                producción: desde el corte del agave hasta las primeras gotas del destilado
                que salen de la olla de barro.
              </p>
              <p>
                No es una historia de lucha. Es una historia de continuidad, de poder
                callado, de un conocimiento tan antiguo que no tiene nombre escrito.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-[#262626] bg-[#171717] p-6">
              <p className="text-stone-500 text-xs font-mono tracking-widest mb-2">DIRECTORA</p>
              <p className="text-stone-100 font-serif text-lg">Mariale Alejandra Ortiz</p>
              <p className="text-stone-500 text-sm mt-1">Actriz · Comentarista · Productora</p>
            </div>
            <div className="border border-[#262626] bg-[#171717] p-6">
              <p className="text-stone-500 text-xs font-mono tracking-widest mb-2">LOCACIÓN PRINCIPAL</p>
              <p className="text-stone-100">Sierra Mixteca, Puebla — México</p>
              <p className="text-stone-500 text-sm mt-1">Tehuitzingo · Chiautla de Tapia · Piaxtla</p>
            </div>
            <div className="border border-[#262626] bg-[#171717] p-6">
              <p className="text-stone-500 text-xs font-mono tracking-widest mb-2">ESTADO</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <p className="text-amber-400">En Producción</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why here */}
      <div className="border-b border-[#262626]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="border border-amber-500/20 bg-amber-500/5 p-8 md:p-10 max-w-2xl">
            <h2 className="text-xl font-serif font-bold text-stone-100 mb-4">
              Por Qué Vive Aquí
            </h2>
            <p className="text-stone-400 leading-relaxed mb-4">
              Este documental no vive en YouTube junto a videos de gatos. Vive dentro
              del registro — la referencia definitiva para cualquiera que tome en serio
              el mezcal.
            </p>
            <p className="text-stone-400 leading-relaxed">
              Cada palenque que aparece en el documental tendrá su perfil completo
              aquí. Cada maestra mezcalera será directamente linkeable. La historia
              y los datos se vuelven inseparables.
            </p>
          </div>
        </div>
      </div>

      {/* Email capture */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-600 text-xs font-mono tracking-widest mb-4">ACTUALIZACIONES</p>
        <h2 className="text-3xl font-serif font-bold text-stone-100 mb-4">
          Sé el Primero en Saberlo
        </h2>
        <p className="text-stone-400 mb-8 max-w-lg mx-auto">
          Te notificamos cuando el documental esté disponible y cuando nuevas maestras
          sean agregadas al registro.
        </p>

        {submitted ? (
          <div className="border border-amber-500/40 bg-amber-500/5 px-8 py-6 inline-block">
            <p className="text-amber-400 font-medium">✦ Registrado</p>
            <p className="text-stone-400 text-sm mt-1">Te avisamos cuando haya novedades.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 bg-[#0a0a0a] border border-[#262626] px-4 py-3 text-stone-200 placeholder-stone-600 focus:border-amber-500 outline-none text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors text-sm whitespace-nowrap"
            >
              Notificarme
            </button>
          </form>
        )}

        <div className="mt-10">
          <Link
            href="/maestras"
            className="text-amber-500 hover:text-amber-400 text-sm transition-colors"
          >
            Mientras tanto — conoce a las maestras mezcaleras →
          </Link>
        </div>
      </div>
    </div>
  )
}
