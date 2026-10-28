'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main className="min-h-screen bg-[#080808] text-stone-100">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/agave_grave_hero.jpeg"
            alt="Agave field with ceremonial pit and mountains — mezcal country"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark gradient overlay — preserves legibility while showing the landscape */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          {/* Extra bottom fade for smooth transition into content below */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.25em] uppercase text-amber-400/80 mb-6 font-mono">
            Tres de Mayo · Mezcal Artesanal
          </p>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
            Del Maguey
            <br />
            <span className="text-amber-400">al Alma</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Mezcal crafted in the tradition of 12 certified Mexican states.
            Explore the terroir, the maestras, and the palenques behind every bottle.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/regiones"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-sm tracking-wide transition-colors"
            >
              Explorar Regiones
            </Link>
            <Link
              href="/palenques"
              className="px-8 py-4 border border-amber-500/60 hover:border-amber-400 text-amber-400 hover:text-amber-300 font-semibold rounded-sm tracking-wide transition-colors"
            >
              Ver Palenques
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs tracking-widest uppercase text-stone-400 font-mono">Descubrir</span>
            <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Intro strip ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { num: '12', label: 'Estados Certificados', sub: 'NOM-070-SCFI-2016' },
            { num: '40+', label: 'Variedades de Agave', sub: 'Silvestres y cultivadas' },
            { num: '∞', label: 'Expresiones', sub: 'Cada palenque, único' },
          ].map(({ num, label, sub }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-serif text-5xl font-bold text-amber-400 mb-2">{num}</span>
              <span className="font-semibold text-stone-200 text-sm tracking-wide uppercase mb-1">{label}</span>
              <span className="text-stone-500 text-xs font-mono">{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Regions teaser ── */}
      <section className="py-16 px-6 bg-[#0d0d0d] border-t border-stone-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-stone-100 mb-2 gold-underline">
            Regiones Productoras
          </h2>
          <p className="text-stone-400 mt-6 mb-10 max-w-2xl">
            Desde Oaxaca hasta Tamaulipas, el mezcal nace del suelo, la altitud y las manos que lo forjan.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'Oaxaca', 'Guerrero', 'Durango', 'San Luis Potosí',
              'Zacatecas', 'Guanajuato', 'Tamaulipas', 'Puebla',
            ].map((region) => (
              <Link
                key={region}
                href={`/regiones/${region.toLowerCase().replace(/\s+/g, '-').replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u')}`}
                className="palenque-card border border-stone-800 rounded-sm p-4 text-center hover:bg-stone-900 transition-all"
              >
                <span className="text-stone-300 text-sm font-medium">{region}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/regiones" className="text-amber-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors">
              Ver las 12 regiones →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gastronomy teaser ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <span className="text-xs tracking-[0.2em] uppercase text-amber-400/70 font-mono">Gastronomía</span>
            <h2 className="font-serif text-3xl font-bold text-stone-100 mt-2 mb-4 gold-underline">
              Mezcal & Mesa
            </h2>
            <p className="text-stone-400 mt-6 leading-relaxed mb-6">
              Como el vino, cada agave tiene su perfil — humo, mineral, frutal, floral.
              Descubre los maridajes que elevan tanto el mezcal como la cocina mexicana.
            </p>
            <Link
              href="/gastronomy"
              className="inline-block text-sm font-mono text-amber-500 hover:text-amber-400 border-b border-amber-500/40 hover:border-amber-400 pb-px transition-colors"
            >
              Explorar maridajes →
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3">
            {[
              { agave: 'Espadín', pair: 'Tacos de canasta', note: 'Ahumado · Cítrico' },
              { agave: 'Tobalá', pair: 'Mole negro', note: 'Mineral · Floral' },
              { agave: 'Cuishe', pair: 'Ceviche', note: 'Herbáceo · Fresco' },
              { agave: 'Tepextate', pair: 'Queso de Oaxaca', note: 'Complejo · Largo' },
            ].map(({ agave, pair, note }) => (
              <div key={agave} className="border border-stone-800 rounded-sm p-4 palenque-card">
                <p className="text-amber-400 font-serif font-semibold text-sm mb-1">{agave}</p>
                <p className="text-stone-300 text-xs mb-1">{pair}</p>
                <p className="text-stone-600 text-xs font-mono">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-900 py-10 px-6 text-center">
        <p className="font-serif text-amber-400/60 text-sm tracking-widest uppercase">
          Tres de Mayo
        </p>
        <p className="text-stone-700 text-xs mt-2 font-mono">
          Mezcal Artesanal · Hecho en México · NOM-070
        </p>
      </footer>
    </main>
  )
}
