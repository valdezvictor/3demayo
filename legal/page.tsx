'use client'
import { useLang } from '../components/LangContext'

export default function LegalPage() {
  const { t } = useLang()

  return (
    <main className="min-h-screen bg-[#080808] pt-20">
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-10">
          {t('Aviso Legal', 'Legal Notice')}
        </h1>

        <div className="space-y-10 text-stone-400 text-sm leading-relaxed">
          <div>
            <h2 className="text-white font-semibold text-base mb-3">
              {t('1. Información General', '1. General Information')}
            </h2>
            <p>
              {t(
                'Tres de Mayo es una plataforma de información y documentación sobre el mezcal artesanal mexicano. No somos comercializadores de bebidas alcohólicas ni contamos con licencias de venta de alcohol. Todo el contenido publicado tiene fines informativos, educativos y culturales.',
                'Tres de Mayo is an information and documentation platform about Mexican artisanal mezcal. We are not alcohol retailers and do not hold alcohol sales licenses. All published content is for informational, educational, and cultural purposes.'
              )}
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-3">
              {t('2. Mayoría de Edad', '2. Age Verification')}
            </h2>
            <p>
              {t(
                'El acceso y uso de este sitio está destinado exclusivamente a personas mayores de 18 años en México o de la edad mínima legal para el consumo de alcohol en su país de residencia. Al ingresar al sitio, el usuario declara tener la edad legal requerida.',
                'Access to and use of this site is intended exclusively for persons over 18 years of age in Mexico, or the legal minimum drinking age in their country of residence. By entering the site, the user declares they are of the required legal age.'
              )}
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-3">
              {t('3. Propiedad Intelectual', '3. Intellectual Property')}
            </h2>
            <p>
              {t(
                'Los contenidos de este sitio — textos, imágenes, bases de datos de palenques y productores, maridajes y material documental — son propiedad de Tres de Mayo o han sido publicados con autorización expresa de sus autores o productores. Queda prohibida su reproducción total o parcial sin autorización escrita.',
                'The contents of this site — texts, images, palenque and producer databases, pairings, and documentary material — are the property of Tres de Mayo or have been published with express authorization from their authors or producers. Total or partial reproduction without written authorization is prohibited.'
              )}
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-3">
              {t('4. Privacidad y Datos', '4. Privacy and Data')}
            </h2>
            <p>
              {t(
                'Los datos de contacto que los usuarios proporcionen a través de los formularios del sitio (restaurantes, prensa, productores) serán utilizados únicamente para responder a sus solicitudes y no serán compartidos con terceros sin consentimiento previo. Cumplimos con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.',
                'Contact data provided by users through site forms (restaurants, press, producers) will be used only to respond to their requests and will not be shared with third parties without prior consent. We comply with Mexico\'s Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP).'
              )}
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-3">
              {t('5. Consumo Responsable', '5. Responsible Consumption')}
            </h2>
            <p>
              {t(
                'Tres de Mayo promueve el conocimiento y la cultura del mezcal, no el consumo excesivo de alcohol. El mezcal es una bebida que se aprecia en pequeñas cantidades. No maneje vehículos bajo los efectos del alcohol.',
                'Tres de Mayo promotes knowledge and mezcal culture, not excessive alcohol consumption. Mezcal is a drink appreciated in small quantities. Do not drive under the influence of alcohol.'
              )}
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-base mb-3">
              {t('6. Contacto', '6. Contact')}
            </h2>
            <p>
              {t(
                'Para cualquier consulta legal, solicitud de derechos de datos o asuntos editoriales, puede contactarnos en:',
                'For any legal inquiry, data rights request, or editorial matters, you may contact us at:'
              )}
            </p>
            <p className="mt-2 text-amber-400">hola@3demayo.com</p>
          </div>

          <div className="border-t border-stone-800 pt-8">
            <p className="text-stone-600 text-xs">
              {t(
                'Última actualización: octubre 2026. Este aviso legal puede ser modificado en cualquier momento.',
                'Last updated: October 2026. This legal notice may be modified at any time.'
              )}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
