'use client'
import Link from 'next/link'
import { useLang } from './LangContext'

export default function SiteFooter() {
  const { t, lang } = useLang()
  const base = lang === 'en' ? '/en' : ''

  return (
    <footer className="border-t border-stone-800 bg-[#080808] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <p className="text-white font-bold text-lg tracking-tight mb-2">Tres de Mayo</p>
          <p className="text-stone-500 text-xs leading-relaxed max-w-[200px]">
            {t(
              'Conocimiento mezcalero. Documentado, verificado, bilingüe.',
              'Mezcal knowledge. Documented, verified, bilingual.'
            )}
          </p>
        </div>

        {/* Explorar */}
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">{t('Explorar','Explore')}</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href={`${base}/palenques`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Palenques','Palenques')}</Link></li>
            <li><Link href={`${base}/maestras`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Maestras','Maestras')}</Link></li>
            <li><Link href={`${base}/regiones`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Regiones','Regions')}</Link></li>
            <li><Link href={`${base}/gastronomy`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Gastronomía','Gastronomy')}</Link></li>
            <li><Link href={`${base}/documental`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Documental','Documentary')}</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">{t('Información','Info')}</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href={`${base}/about`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Nosotros','About')}</Link></li>
            <li><Link href={`${base}/for-restaurants`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Para Restaurantes','For Restaurants')}</Link></li>
            <li><Link href={`${base}/legal`} className="text-stone-400 hover:text-amber-400 transition-colors">{t('Aviso Legal','Legal')}</Link></li>
          </ul>
        </div>

        {/* Language + contact */}
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">{t('Idioma','Language')}</p>
          <div className="flex gap-3 mb-6">
            <Link href="/" className={`text-sm px-3 py-1 rounded-full border transition-colors ${lang === 'es' ? 'border-amber-400 text-amber-400' : 'border-stone-700 text-stone-500 hover:border-stone-500'}`}>ES</Link>
            <Link href="/en" className={`text-sm px-3 py-1 rounded-full border transition-colors ${lang === 'en' ? 'border-amber-400 text-amber-400' : 'border-stone-700 text-stone-500 hover:border-stone-500'}`}>EN</Link>
          </div>
          <p className="text-stone-600 text-xs">hola@3demayo.com</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-700">
          <p>© {new Date().getFullYear()} Tres de Mayo. {t('Todos los derechos reservados.','All rights reserved.')}</p>
          <p>{t('Bebe con moderación. Solo mayores de 18 años.','Drink responsibly. 18+ only.')}</p>
        </div>
      </div>
    </footer>
  )
}
