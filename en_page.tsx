'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePageEN() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main className="min-h-screen bg-[#080808] text-stone-100">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/agave_grave_hero.jpeg"
            alt="Agave field with ceremonial fire pit — mezcal country, Mexico"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-amber-400/80 mb-6 font-mono">
            Tres de Mayo · Artisanal Mezcal
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
            From the Agave
            <br />
            <span className="text-amber-400">to the Soul</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Mezcal crafted across Mexico's 12 certified producing states.
            Discover the terroir, the maestras, and the palenques behind every bottle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/regiones"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-sm tracking-wide transition-colors"
            >
              Explore Regions
            </Link>
            <Link
              href="/en/palenques"
              className="px-8 py-4 border border-amber-500/60 hover:border-amber-400 text-amber-400 hover:text-amber-300 font-semibold rounded-sm tracking-wide transition-colors"
            >
              View Palenques
            </Link>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs tracking-widest uppercase text-stone-400 font-mono">Discover</span>
            <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { num: '12', label: 'Certified States', sub: 'NOM-070-SCFI-2016' },
            { num: '40+', label: 'Agave Varieties', sub: 'Wild & cultivated' },
            { num: '∞', label: 'Expressions', sub: 'Every palenque, unique' },
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
            Producing Regions
          </h2>
          <p className="text-stone-400 mt-6 mb-10 max-w-2xl">
            From Oaxaca to Tamaulipas, mezcal is born from the soil, the elevation, and the hands that shape it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'Oaxaca', 'Guerrero', 'Durango', 'San Luis Potosí',
              'Zacatecas', 'Guanajuato', 'Tamaulipas', 'Puebla',
            ].map((region) => (
              <Link
                key={region}
                href={`/en/regiones/${region.toLowerCase().replace(/\s+/g, '-').replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u')}`}
                className="palenque-card border border-stone-800 rounded-sm p-4 text-center hover:bg-stone-900 transition-all"
              >
                <span className="text-stone-300 text-sm font-medium">{region}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/en/regiones" className="text-amber-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors">
              View all 12 regions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gastronomy teaser ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <span className="text-xs tracking-[0.2em] uppercase text-amber-400/70 font-mono">Gastronomy</span>
            <h2 className="font-serif text-3xl font-bold text-stone-100 mt-2 mb-4 gold-underline">
              Mezcal & the Table
            </h2>
            <p className="text-stone-400 mt-6 leading-relaxed mb-6">
              Like wine, every agave has its profile — smoke, mineral, fruit, floral.
              Discover pairings that elevate both the mezcal and Mexican cuisine.
            </p>
            <Link
              href="/en/gastronomy"
              className="inline-block text-sm font-mono text-amber-500 hover:text-amber-400 border-b border-amber-500/40 hover:border-amber-400 pb-px transition-colors"
            >
              Explore pairings →
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3">
            {[
              { agave: 'Espadín', pair: 'Street tacos', note: 'Smoky · Citrus' },
              { agave: 'Tobalá', pair: 'Mole negro', note: 'Mineral · Floral' },
              { agave: 'Cuishe', pair: 'Ceviche', note: 'Herbaceous · Fresh' },
              { agave: 'Tepextate', pair: 'Oaxacan cheese', note: 'Complex · Long' },
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
          Artisanal Mezcal · Made in Mexico · NOM-070
        </p>
      </footer>
    </main>
  )
}
