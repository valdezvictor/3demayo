'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLang } from './LangContext'

export function SiteNav() {
  const { lang, toggle, t } = useLang()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [silvestreOpen, setSilvestreOpen] = useState(false)

  const navLinks = [
    { href: lang === 'en' ? '/en/regiones' : '/regiones',    label: t('Regiones', 'Regions') },
    { href: lang === 'en' ? '/en/palenques' : '/palenques',  label: t('Palenques', 'Palenques') },
    { href: lang === 'en' ? '/en/maestras' : '/maestras',    label: t('Maestras', 'Maestras') },
    { href: lang === 'en' ? '/en/gastronomy' : '/gastronomy',label: t('Gastronomía', 'Gastronomy') },
    { href: lang === 'en' ? '/en/documental' : '/documental',label: t('Documental', 'Documentary') },
    { href: '/blog',       label: t('Blog', 'Blog') },
    { href: '/cocktails',  label: t('Coctelería', 'Cocktails') },
    { href: '/agaves',     label: t('Agaves', 'Agaves') },
  ]

  const silvestreLinks = [
    { href: '/silvestre',           label: t('El Índice Silvestre', 'Silvestre Index') },
    { href: '/guardianes',          label: t('Guardianes del Maguey', 'Guardians of Maguey') },
    { href: '/palenques-poblanos',  label: t('Palenques Poblanos', 'Puebla Palenques') },
  ]

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')
  const isSilvestreActive = silvestreLinks.some(l => isActive(l.href))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-sm border-b border-stone-900">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo / wordmark */}
        <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center gap-3 group">
          <span className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
            3 de Mayo
          </span>
          <span className="hidden sm:block text-stone-600 text-xs font-mono tracking-widest uppercase">
            Mezcal
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">

          {/* Silvestre dropdown */}
          <div className="relative" onMouseEnter={() => setSilvestreOpen(true)} onMouseLeave={() => setSilvestreOpen(false)}>
            <button
              className={`text-sm transition-colors flex items-center gap-1 ${
                isSilvestreActive ? 'text-amber-400 font-medium' : 'text-stone-400 hover:text-stone-200'
              }`}
              onClick={() => setSilvestreOpen(!silvestreOpen)}
            >
              {t('Silvestre', 'Silvestre')}
              <svg className={`w-3 h-3 transition-transform ${silvestreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {silvestreOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0e0d0b] border border-stone-800 rounded shadow-xl py-1 z-50">
                {silvestreLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSilvestreOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      isActive(href)
                        ? 'text-amber-400 font-medium bg-stone-900/50'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/30'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Regular links */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-900 bg-[#080808]">
          <div className="px-6 py-4 flex flex-col gap-1">

            {/* Silvestre section in mobile */}
            <div className="pb-2 mb-2 border-b border-stone-900">
              <p className="text-xs font-mono tracking-widest uppercase text-stone-700 mb-2">
                {t('Silvestre', 'Silvestre')}
              </p>
              {silvestreLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm py-1.5 pl-3 transition-colors ${
                    isActive(href)
                      ? 'text-amber-400 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm py-1.5 transition-colors ${
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
