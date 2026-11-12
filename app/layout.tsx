import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ClientShell } from './components/ClientShell'
import SiteFooter from './components/SiteFooter'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  title: {
    default: '3 de Mayo — Mezcal Artesanal',
    template: '%s | 3 de Mayo',
  },
  description:
    'Mezcal artesanal de las 12 regiones certificadas de México. Palenques, maestras, variedades de agave y cultura mezcalera.',
  keywords: ['mezcal', 'mezcal artesanal', 'palenques', 'agave', 'NOM-070', 'mezcal oaxaca'],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    siteName: '3 de Mayo',
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
        {/* hreflang for SEO/AEO/GEO */}
        <link rel="alternate" hrefLang="es" href="http://54.241.20.166:3003/" />
        <link rel="alternate" hrefLang="en" href="http://54.241.20.166:3003/en" />
        <link rel="alternate" hrefLang="x-default" href="http://54.241.20.166:3003/" />
      <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "z5xsssn5fn");
      `}} />
      {/* Google Analytics GA4 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-QMF0X6JYTS" />
      <script dangerouslySetInnerHTML={{__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QMF0X6JYTS');
      `}} />
      </head>
      <body className="bg-[#080808] text-stone-100 font-sans antialiased">
        {/* ClientShell wraps client-only providers (LangContext) + SiteNav */}
        <ClientShell>
          {children}
          <SiteFooter />
        </ClientShell>
      </body>
    </html>
  )
}
