'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Lang = 'es' | 'en'

interface LangContextType {
  lang: Lang
  toggle: () => void
  t: (es: string, en: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  toggle: () => {},
  t: (es) => es,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Detect lang from URL: /en/* → EN, everything else → ES
  const detectLang = (): Lang => {
    if (pathname?.startsWith('/en')) return 'en'
    return 'es'
  }

  const [lang, setLang] = useState<Lang>(detectLang)
  const router = useRouter()

  useEffect(() => {
    setLang(detectLang())
  }, [pathname])

  const toggle = () => {
    const next = lang === 'es' ? 'en' : 'es'
    if (next === 'en') {
      // Switch to /en equivalent
      const enPath = pathname?.startsWith('/en') ? pathname : `/en${pathname === '/' ? '' : pathname}`
      router.push(enPath || '/en')
    } else {
      // Switch back to ES (strip /en prefix)
      const esPath = pathname?.replace(/^\/en/, '') || '/'
      router.push(esPath || '/')
    }
  }

  const t = (es: string, en: string) => lang === 'en' ? en : es

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
