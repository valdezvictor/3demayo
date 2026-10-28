'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLang } from './LangContext'

export function SiteNav() {
  const { lang, toggle, t } = useLang()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: lang === 'en' ? '/en/regiones' : '/regiones',    label: t('Regiones', 'Regions') },
    { href: lang === 'en' ? '/en/palenques' : '/palenques',  label: t('Palenques', 'Palenques') },
    { href: lang === 'en' ? '/en/maestras' : '/maestras',    label: t('Maestras', 'Maestras') },
    { href: lang === 'en' ? '/en/gastronomy' : '/gastronomy',label: t('Gastronomía', 'Gastronomy') },
    { href: lang === 'en' ? '/en/documental' : '/documental',label: t('Documental', 'Documentary') },
  ]

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-sm border-b border-stone-900">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo / wordmark */}
        <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center gap-3 group">
          <span className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
            Tres de Mayo
          </span>
          <span className="hidden sm:block text-stone-600 text-xs font-mono tracking-widest uppercase">
            Mezcal
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                isActive(href)
                  ? 'text-amber-400 font-medium'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side: lang toggle + mobile menu */}
        <div className="flex items-center gap-4">
          {/* ES | EN toggle */}
          <button
            onClick={toggle}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase"
          >
            <span className={lang === 'es' ? 'text-amber-400 font-bold' : 'text-stone-600 hover:text-stone-400 transition-colors'}>
              ES
            </span>
            <span className="text-stone-800 mx-0.5 select-none">|</span>
            <span className={lang === 'en' ? 'text-amber-400 font-bold' : 'text-stone-600 hover:text-stone-400 transition-colors'}>
              EN
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-stone-400 hover:text-stone-200 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-900 bg-[#080808]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm py-1 transition-colors ${
                  isActive(href)
                    ? 'text-amber-400 font-medium'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
