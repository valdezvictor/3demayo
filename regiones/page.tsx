'use client'
import Link from 'next/link'
import { useLang } from '../components/LangContext'

const regions = [
  {
    estado: 'Oaxaca',
    slug: 'oaxaca',
    agaves: ['Espadín', 'Tobalá', 'Tepeztate', 'Madre Cuixe', 'Mexicano', 'Jabalí'],
    descripcion: 'La cuna del mezcal. Valles, Cañada y Sierra Sur producen expresiones inigualables.',
    description: 'The cradle of mezcal. Valleys, Cañada, and Sierra Sur produce unmatched expressions.',
    color: 'from-amber-900/40 to-stone-900',
    palenques: 312,
  },
  {
    estado: 'Guerrero',
    slug: 'guerrero',
    agaves: ['Cupreata', 'Angustifolia'],
    descripcion: 'Vichicota y mezcal de costa. El agave cupreata domina las laderas de la Sierra Madre del Sur.',
    description: 'Vichicota and coastal mezcal. Cupreata agave dominates the slopes of the Sierra Madre del Sur.',
    color: 'from-emerald-900/40 to-stone-900',
    palenques: 48,
  },
  {
    estado: 'Puebla',
    slug: 'puebla',
    agaves: ['Papalometl', 'Tobaziche', 'Espadín'],
    descripcion: 'Mezcal de las mixtecas y la Sierra Norte. Papalometl silvestre con carácter único.',
    description: 'Mezcal from the Mixteca and Sierra Norte. Wild Papalometl with unique character.',
    color: 'from-red-900/40 to-stone-900',
    palenques: 27,
  },
  {
    estado: 'Durango',
    slug: 'durango',
    agaves: ['Cenizo', 'Durangensis'],
    descripcion: 'Sotol y mezcal de altura. El cenizo crece en altitudes superiores a 2,000 metros.',
    description: 'Sotol and highland mezcal. Cenizo grows at altitudes above 2,000 meters.',
    color: 'from-blue-900/40 to-stone-900',
    palenques: 19,
  },
  {
    estado: 'San Luis Potosí',
    slug: 'san-luis-potosi',
    agaves: ['Salmiana', 'Crassispina'],
    descripcion: 'Mezcal del altiplano potosino. Salmiana de corazón dulce y larga maduración.',
    description: 'Mezcal from the Potosí highlands. Salmiana with a sweet heart and long maturation.',
    color: 'from-purple-900/40 to-stone-900',
    palenques: 14,
  },
  {
    estado: 'Zacatecas',
    slug: 'zacatecas',
    agaves: ['Durangensis', 'Maximiliana'],
    descripcion: 'Tierras mineras y agaves silvestres. Producciones artesanales de comunidades serranas.',
    description: 'Mining lands and wild agaves. Artisanal production from mountain communities.',
    color: 'from-yellow-900/40 to-stone-900',
    palenques: 11,
  },
  {
    estado: 'Michoacán',
    slug: 'michoacan',
    agaves: ['Cupreata', 'Inaequidens'],
    descripcion: 'Mezcal purépecha. Las comunidades indígenas guardan técnicas ancestrales de destilación.',
    description: 'Purépecha mezcal. Indigenous communities preserve ancestral distillation techniques.',
    color: 'from-orange-900/40 to-stone-900',
    palenques: 9,
  },
  {
    estado: 'Tamaulipas',
    slug: 'tamaulipas',
    agaves: ['Americana', 'Funkiana'],
    descripcion: 'Mezcal del noreste. Producción limitada con agaves de la llanura costera.',
    description: 'Northeast mezcal. Limited production with agaves from the coastal plain.',
    color: 'from-teal-900/40 to-stone-900',
    palenques: 6,
  },
]

export default function RegionesPage() {
  const { t } = useLang()

  return (
    <main className="min-h-screen bg-[#080808] pt-20">
      {/* Header */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <p className="text-amber-400 text-sm tracking-[0.2em] uppercase mb-3">
          {t('México Mezcalero', 'Mezcal Mexico')}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {t('Regiones Productoras', 'Producing Regions')}
        </h1>
        <p className="text-stone-400 text-lg max-w-2xl">
          {t(
            '12 estados con denominación de origen. Cada región expresa el terroir único de sus agaves, su suelo y sus maestros mezcaleros.',
            '12 states with denomination of origin. Each region expresses the unique terroir of its agaves, soil, and master mezcal producers.'
          )}
        </p>
      </section>

      {/* Stats bar */}
      <section className="border-y border-stone-800 px-6 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-amber-400">12</p>
            <p className="text-stone-500 text-sm mt-1">{t('Estados', 'States')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-400">40+</p>
            <p className="text-stone-500 text-sm mt-1">{t('Variedades de Agave', 'Agave Varieties')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-400">446+</p>
            <p className="text-stone-500 text-sm mt-1">{t('Palenques', 'Palenques')}</p>
          </div>
        </div>
      </section>

      {/* Regions grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((r) => (
            <div
              key={r.slug}
              className={`bg-gradient-to-br ${r.color} border border-stone-800 rounded-2xl p-8 hover:border-amber-400/40 transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {r.estado}
                  </h2>
                  <p className="text-stone-500 text-sm mt-1">
                    {r.palenques} {t('palenques registrados', 'registered palenques')}
                  </p>
                </div>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed mb-5">
                {t(r.descripcion, r.description)}
              </p>

              <div className="flex flex-wrap gap-2">
                {r.agaves.map((a) => (
                  <span
                    key={a}
                    className="text-xs bg-stone-800/80 text-amber-300 px-3 py-1 rounded-full border border-stone-700"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center border-t border-stone-800">
        <h2 className="text-2xl font-bold text-white mb-4">
          {t('Explora los Palenques', 'Explore the Palenques')}
        </h2>
        <p className="text-stone-400 mb-8 max-w-md mx-auto">
          {t(
            'Conoce a los maestros detrás de cada expresión regional.',
            'Meet the masters behind each regional expression.'
          )}
        </p>
        <Link
          href={t('/palenques', '/en/palenques')}
          className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition-colors"
        >
          {t('Ver Palenques', 'View Palenques')}
        </Link>
      </section>
    </main>
  )
}
