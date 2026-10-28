import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LangProvider } from './components/LangContext'
import { SiteNav } from './components/SiteNav'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'Tres de Mayo — Mezcal Artesanal',
    template: '%s | Tres de Mayo',
  },
  description:
    'Mezcal artesanal de las 12 regiones certificadas de México. Palenques, maestras, variedades de agave y cultura mezcalera.',
  keywords: ['mezcal', 'mezcal artesanal', 'palenques', 'agave', 'NOM-070', 'mezcal oaxaca'],
  alternates: {
    languages: {
      'es': 'http://54.241.20.166:3003/',
      'en': 'http://54.241.20.166:3003/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    siteName: 'Tres de Mayo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* hreflang for SEO/AEO/GEO — tells Google both language versions exist */}
        <link rel="alternate" hrefLang="es" href="http://54.241.20.166:3003/" />
        <link rel="alternate" hrefLang="en" href="http://54.241.20.166:3003/en" />
        <link rel="alternate" hrefLang="x-default" href="http://54.241.20.166:3003/" />
      </head>
      <body className="bg-[#080808] text-stone-100 font-sans antialiased">
        <LangProvider>
          <SiteNav />
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
