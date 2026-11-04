"use client"

import { useState } from "react"
import Link from "next/link"

interface FlightSpirit {
  name: string
  origin: string
  vessel: string
  agave: string
  notes: string
}

interface Flight {
  id: string
  name: string
  tagline: string
  pairing: string
  spirits: FlightSpirit[]
  complexity: "introductory" | "intermediate" | "advanced"
}

const FLIGHTS: Flight[] = [
  {
    id: "F01",
    name: "Vuelo 01: Ecos Ancestrales y Tierra Cocida",
    tagline: "Arcilla y fuego — los sabores más antiguos del mezcal",
    pairing: "Carnes braseadas · Mole Negro Oaxaqueño · Pato ahumado",
    complexity: "introductory",
    spirits: [
      {
        name: "Tobalá Silvestre — Olla de Barro",
        origin: "Sierra Sur, Oaxaca",
        vessel: "Olla de Barro / Artesanal",
        agave: "Agave potatorum · 13 años · Silvestre",
        notes: "La arcilla porosa retiene los compuestos orgánicos pesados e infunde minerales de la tierra. Terroso, vegetal, lentamente revelado.",
      },
      {
        name: "Papalote Silvestre — Cobre y Madera",
        origin: "Sierra de Guerrero",
        vessel: "Cobre y Tronco / Artesanal",
        agave: "Agave cupreata · 12 años · Silvestre",
        notes: "La destilación doble en cobre produce una mayor nitidez aromática. Las notas ahumadas del roble de Guerrero se integran con la dulzura mineral.",
      },
    ],
  },
  {
    id: "F02",
    name: "Vuelo 02: Micro-Terroir de Caliza y Caza Silvestre",
    tagline: "Minerales y altitud — los sabores del norte profundo",
    pairing: "Cabrito asado · Barbacoa de mejilla · Cordero braseado",
    complexity: "intermediate",
    spirits: [
      {
        name: "Cenizo Silvestre — Durango",
        origin: "Sierras de Durango",
        vessel: "Cobre / Tradicional",
        agave: "Agave durangensis · 15 años · Silvestre",
        notes: "El suelo calcáreo de Durango imprime notas minerales únicas. Seco, limpio, con acabado herbal persistente.",
      },
      {
        name: "Salmiana Semi-Silvestre — San Luis Potosí",
        origin: "Altiplano Potosino",
        vessel: "Cobre / Artesanal",
        agave: "Agave salmiana · 10 años · Semi-silvestre",
        notes: "La Salmiana del altiplano produce un mezcal de alta graduación con notas cítricas y terrosas que equilibran la textura aceitosa.",
      },
    ],
  },
  {
    id: "F03",
    name: "Vuelo 03: Armonía Botánica — Capón y Salmuera Costera",
    tagline: "Elegancia y borde marino — el mezcal más sutil",
    pairing: "Aguachile Verde · Ceviche del Pacífico · Ostión crudo",
    complexity: "advanced",
    spirits: [
      {
        name: "Espadín Capón — Valle Central",
        origin: "Valles Centrales, Oaxaca",
        vessel: "Cobre / Artesanal",
        agave: "Agave angustifolia Capón · 10 años",
        notes: "El proceso capón — cortar el quiote antes de florecer — concentra los azúcares en el corazón. Dulzura concentrada, botánico, florido.",
      },
      {
        name: "Ixtero Amarillo — Michoacán",
        origin: "Tierra Caliente, Michoacán",
        vessel: "Cobre / Tradicional",
        agave: "Agave inaequidens · 10 años · Silvestre",
        notes: "Variedad endémica michoacana con notas cítricas distintivas y frescura herbácea. Contraste perfecto con la intensidad del Capón.",
      },
    ],
  },
]

const complexityColor: Record<string, string> = {
  introductory: "border-emerald-600/40 text-emerald-500",
  intermediate: "border-amber-500/40 text-amber-500",
  advanced: "border-red-600/40 text-red-400",
}

const complexityLabel: Record<string, string> = {
  introductory: "Introductorio",
  intermediate: "Intermedio",
  advanced: "Avanzado",
}

export default function ForRestaurantsPage() {
  const [activeTab, setActiveTab] = useState<"flights" | "contact">("flights")
  const [form, setForm] = useState({
    name: "", restaurant: "", email: "", phone: "", message: "", flight: ""
  })
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch("/api/b2b-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    } catch {}
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">
      {/* Hero */}
      <div className="border-b border-[#262626]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-amber-500 text-xs font-mono tracking-widest mb-6">
            PARA RESTAURANTES Y BARES
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-100 mb-6 leading-tight">
            Deja de Vender Humo.<br />
            <span className="text-amber-400">Empieza a Vender Terroir.</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl leading-relaxed mb-8">
            Tres vuelos de gastronomía listos para usar. Datos botánicos completos.
            Conexión directa con palenques ancestrales de Puebla, Oaxaca y Guerrero.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab("flights")}
              className={`px-5 py-2.5 text-sm border transition-all ${
                activeTab === "flights"
                  ? "border-amber-500 text-amber-400 bg-amber-500/10"
                  : "border-[#262626] text-stone-400 hover:border-stone-600"
              }`}
            >
              Los Tres Vuelos
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-5 py-2.5 text-sm border transition-all ${
                activeTab === "contact"
                  ? "border-amber-500 text-amber-400 bg-amber-500/10"
                  : "border-[#262626] text-stone-400 hover:border-stone-600"
              }`}
            >
              Iniciar Programa
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {activeTab === "flights" && (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
          {FLIGHTS.map(flight => (
            <div key={flight.id} className="border border-[#262626] bg-[#0a0a0a]">
              {/* Flight header */}
              <div className="border-b border-[#262626] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-amber-500/50 font-mono text-xs">{flight.id}</span>
                      <span className={`text-xs px-2 py-0.5 border rounded-sm ${complexityColor[flight.complexity]}`}>
                        {complexityLabel[flight.complexity]}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold text-stone-100 mb-1">
                      {flight.name}
                    </h2>
                    <p className="text-stone-500 text-sm">{flight.tagline}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2">
                  <span className="text-stone-600 text-xs mt-0.5 shrink-0">Maridaje:</span>
                  <p className="text-stone-400 text-sm">{flight.pairing}</p>
                </div>
              </div>

              {/* Spirits */}
              <div className="divide-y divide-[#1a1a1a]">
                {flight.spirits.map((spirit, i) => (
                  <div key={i} className="p-6 grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <p className="text-stone-200 font-medium text-sm mb-1">{spirit.name}</p>
                      <p className="text-stone-500 text-xs">{spirit.origin}</p>
                      <p className="text-amber-500/60 text-xs mt-1">{spirit.vessel}</p>
                    </div>
                    <div className="md:col-span-1">
                      <p className="text-stone-600 text-xs font-mono mb-1">AGAVE</p>
                      <p className="text-stone-400 text-xs">{spirit.agave}</p>
                    </div>
                    <div className="md:col-span-1">
                      <p className="text-stone-600 text-xs font-mono mb-1">NOTAS</p>
                      <p className="text-stone-400 text-xs leading-relaxed">{spirit.notes}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="border-t border-[#262626] px-6 py-4 flex justify-end">
                <button
                  onClick={() => {
                    setForm(f => ({ ...f, flight: flight.id }))
                    setActiveTab("contact")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="text-amber-500 hover:text-amber-400 text-xs transition-colors flex items-center gap-1"
                >
                  Solicitar este vuelo →
                </button>
              </div>
            </div>
          ))}

          {/* Value props */}
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            {[
              { icon: "📋", title: "Materiales de Entrenamiento", desc: "PDF completo para capacitar a tu equipo de sala." },
              { icon: "📱", title: "QR de Trazabilidad", desc: "Tarjetas de mesa enlazadas al registro del palenque." },
              { icon: "🔗", title: "Conexión Directa", desc: "Contacto directo con los palenques para proyectos especiales." },
            ].map(v => (
              <div key={v.title} className="border border-[#262626] bg-[#0a0a0a] p-5">
                <p className="text-2xl mb-3">{v.icon}</p>
                <p className="text-stone-200 text-sm font-medium mb-1">{v.title}</p>
                <p className="text-stone-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="max-w-2xl mx-auto px-4 py-10">
          {submitted ? (
            <div className="border border-amber-500/40 bg-amber-500/5 p-10 text-center">
              <p className="text-amber-400 text-2xl font-serif font-bold mb-3">
                ✦ Solicitud Recibida
              </p>
              <p className="text-stone-400">
                Te contactamos en las próximas 24 horas con la propuesta completa para tu programa de mezcal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-100 mb-2">
                  Iniciar Programa de Mezcal
                </h2>
                <p className="text-stone-400 text-sm">
                  Cuéntanos sobre tu establecimiento y te armamos una propuesta.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-500 mb-1.5">NOMBRE</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#262626] px-3 py-2.5 text-stone-200 text-sm focus:border-amber-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-500 mb-1.5">RESTAURANTE</label>
                  <input
                    required
                    type="text"
                    value={form.restaurant}
                    onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#262626] px-3 py-2.5 text-stone-200 text-sm focus:border-amber-500/50 outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-500 mb-1.5">EMAIL</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#262626] px-3 py-2.5 text-stone-200 text-sm focus:border-amber-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-500 mb-1.5">TELÉFONO</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#262626] px-3 py-2.5 text-stone-200 text-sm focus:border-amber-500/50 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1.5">
                  VUELO DE INTERÉS
                </label>
                <select
                  value={form.flight}
                  onChange={e => setForm(f => ({ ...f, flight: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#262626] px-3 py-2.5 text-stone-200 text-sm focus:border-amber-500/50 outline-none"
                >
                  <option value="">Seleccionar...</option>
                  <option value="F01">Vuelo 01 — Ecos Ancestrales</option>
                  <option value="F02">Vuelo 02 — Micro-Terroir de Caliza</option>
                  <option value="F03">Vuelo 03 — Armonía Botánica</option>
                  <option value="CUSTOM">Programa personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1.5">MENSAJE</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Cuéntanos sobre tu programa actual, número de cubiertos, enfoque de cocina..."
                  className="w-full bg-[#0a0a0a] border border-[#262626] px-3 py-2.5 text-stone-200 text-sm placeholder-stone-600 focus:border-amber-500/50 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors text-sm"
              >
                Enviar Solicitud
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
