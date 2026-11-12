'use client'
import { useLang } from '../components/LangContext'

export default function LegalPage() {
  const { t } = useLang()
  return (
    <main className="min-h-screen bg-[#080808] pt-20">
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-10">{t('Aviso Legal','Legal Notice')}</h1>
        <div className="space-y-10 text-stone-400 text-sm leading-relaxed">
          <div><h2 className="text-white font-semibold text-base mb-3">{t('1. Información General','1. General Information')}</h2><p>{t('3 de Mayo es una plataforma de información sobre el mezcal artesanal mexicano. No somos comercializadores de bebidas alcohólicas. Todo el contenido tiene fines informativos, educativos y culturales.','3 de Mayo is an information platform about Mexican artisanal mezcal. We are not alcohol retailers. All content is for informational, educational, and cultural purposes.')}</p></div>
          <div><h2 className="text-white font-semibold text-base mb-3">{t('2. Mayoría de Edad','2. Age Verification')}</h2><p>{t('El acceso está destinado exclusivamente a personas mayores de 18 años. Al ingresar al sitio, el usuario declara tener la edad legal requerida.','Access is intended exclusively for persons over 18 years of age. By entering the site, the user declares they are of the required legal age.')}</p></div>
          <div><h2 className="text-white font-semibold text-base mb-3">{t('3. Propiedad Intelectual','3. Intellectual Property')}</h2><p>{t('Los contenidos de este sitio son propiedad de 3 de Mayo o han sido publicados con autorización expresa. Queda prohibida su reproducción sin autorización escrita.','The contents of this site are the property of 3 de Mayo or have been published with express authorization. Reproduction without written authorization is prohibited.')}</p></div>
          <div><h2 className="text-white font-semibold text-base mb-3">{t('4. Consumo Responsable','4. Responsible Consumption')}</h2><p>{t('3 de Mayo promueve el conocimiento y la cultura del mezcal, no el consumo excesivo de alcohol. No maneje vehículos bajo los efectos del alcohol.','3 de Mayo promotes mezcal knowledge and culture, not excessive alcohol consumption. Do not drive under the influence of alcohol.')}</p></div>
          <div><h2 className="text-white font-semibold text-base mb-3">{t('5. Contacto','5. Contact')}</h2><p className="mt-2 text-amber-400">hola@3demayo.com</p></div>
          <div className="border-t border-stone-800 pt-8"><p className="text-stone-600 text-xs">{t('Última actualización: octubre 2026.','Last updated: October 2026.')}</p></div>
        </div>
      </section>
    </main>
  )
}
