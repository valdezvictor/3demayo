'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useLang } from '../../components/LangContext'

type RegionData = {
  nombre: string; nameEn: string; termino: string; terminoEn: string
  agaves: string[]; coccion: string; coccionEn: string
  fermentacion: string; fermentacionEn: string
  destilacion: string; destilacionEn: string
  reto: string; retoEn: string
  descripcion: string; descripcionEn: string
  color: string; palenques: number
}

const REGIONS: Record<string, RegionData> = {
  oaxaca: { nombre:'Oaxaca',nameEn:'Oaxaca',termino:'Palenque',terminoEn:'Palenque',agaves:['Espadín','Tobalá','Tepextate','Madre Cuixe','Mexicano','Jabalí'],coccion:'Hoyo cónico subterráneo con piedras',coccionEn:'Underground conical stone pit',fermentacion:'Tinas abiertas de roble o pino al aire libre',fermentacionEn:'Open-air oak or pine vats (tinas)',destilacion:'Alambique de cobre / Ollas de barro',destilacionEn:'Copper alembic / Clay pots (barro)',reto:'Alta fragmentación de volumen / Lotes sin certificar',retoEn:'High volume fragmentation / Uncertified batches',descripcion:'La cuna del mezcal. Los Valles Centrales, la Cañada y la Sierra Sur producen expresiones únicas en el mundo. El palenque oaxaqueño es el núcleo de la identidad mezcalera mexicana.',descripcionEn:'The cradle of mezcal. The Central Valleys, Cañada, and Sierra Sur produce expressions unique in the world. The Oaxacan palenque is the core of Mexican mezcal identity.',color:'from-amber-900/30',palenques:312 },
  guerrero: { nombre:'Guerrero',nameEn:'Guerrero',termino:'Palenque / Fábrica',terminoEn:'Palenque / Fábrica',agaves:['Papalote (Cupreata)','Angustifolia'],coccion:'Hoyo subterráneo revestido de roble',coccionEn:'Underground pit lined with oak',fermentacion:'Tinas de ayacahuite (pino local) / Cuero',fermentacionEn:'Ayacahuite (local pine) vats / Leather',destilacion:'Estilo filipino con serpentín de cobre interno',destilacionEn:'Filipino style with internal copper coils',reto:'Protocolos de seguridad / Microclimas montañosos remotos',retoEn:'Security protocols / Remote mountainous micro-climates',descripcion:'El agave papalote (cupreata) domina las laderas de la Sierra Madre del Sur. El mezcal de Guerrero es terroso, mineral, con notas de cuero.',descripcionEn:'The papalote agave dominates the slopes of the Sierra Madre del Sur. Guerrero mezcal is earthy, mineral, with leather notes.',color:'from-emerald-900/30',palenques:48 },
  'san-luis-potosi': { nombre:'San Luis Potosí',nameEn:'San Luis Potosí',termino:'Fábrica / Palenque',terminoEn:'Fábrica / Palenque',agaves:['Salmiana (Verde / Gentryi)'],coccion:'Hornos de mampostería sobre tierra',coccionEn:'Above-ground masonry ovens (hornos)',fermentacion:'Tanques de mampostería (piedra/ladrillo)',fermentacionEn:'Mampostería (stone/brick tanks)',destilacion:'Alambiques de cobre con condensador interno',destilacionEn:'Copper stills with internal condenser',reto:'Agaves de bajísimo contenido de azúcar / Fermentación larga',retoEn:'Extremely low sugar content agaves / Long fermentation',descripcion:'El altiplano potosino produce uno de los mezcales más complejos de México. El agave salmiana requiere mucho más biomasa por litro que el espadín.',descripcionEn:"The Potosí highlands produce one of Mexico's most complex mezcals. Salmiana requires far more biomass per liter than espadín.",color:'from-purple-900/30',palenques:14 },
  tamaulipas: { nombre:'Tamaulipas',nameEn:'Tamaulipas',termino:'Fábrica',terminoEn:'Fábrica',agaves:['Universidad (Funkiana)','Americana'],coccion:'Autoclaves de vapor / Hornos de mampostería',coccionEn:'Steam autoclaves / Masonry ovens',fermentacion:'Acero inoxidable / Plástico grado alimentario',fermentacionEn:'Stainless steel / Food-grade plastic',destilacion:'Columnas de acero inoxidable o cobre',destilacionEn:'Stainless steel or copper columns',reto:'Aislamiento geográfico / Validación estricta de límites estatales',retoEn:'Geographical isolation / Strict state boundary validation',descripcion:'La región mezcalera más al norte de México. La Funkiana y la Americana crecen en la llanura costera del Golfo.',descripcionEn:"Mexico's northernmost mezcal region. Funkiana and Americana agaves grow on the Gulf coastal plain.",color:'from-teal-900/30',palenques:6 },
  guanajuato: { nombre:'Guanajuato',nameEn:'Guanajuato',termino:'Fábrica',terminoEn:'Fábrica',agaves:['Salmiana','Agave Azul'],coccion:'Hornos de mampostería / Hoyos en tierra',coccionEn:'Masonry ovens / In-ground pits',fermentacion:'Tinas de roble / Mampostería subterránea',fermentacionEn:'Oak vats / Underground masonry',destilacion:'Alambique de cobre con condensador de madera',destilacionEn:'Copper alembic with wood condenser',reto:'Jurisdicciones superpuestas con zonas CRT de Tequila',retoEn:'Overlapping jurisdictions with Tequila CRT zones',descripcion:'Guanajuato produce mezcal en la sombra del tequila. Sus fábricas navegan jurisdicciones regulatorias complejas.',descripcionEn:'Guanajuato produces mezcal in the shadow of tequila. Its fabricas navigate complex regulatory jurisdictions.',color:'from-yellow-900/30',palenques:9 },
  zacatecas: { nombre:'Zacatecas',nameEn:'Zacatecas',termino:'Fábrica',terminoEn:'Fábrica',agaves:['Tequilana Weber','Salmiana'],coccion:'Hornos de vapor / Autoclaves',coccionEn:'Steam ovens / Autoclaves',fermentacion:'Acero inoxidable / Fermentación cerrada',fermentacionEn:'Stainless steel / Closed fermentation',destilacion:'Columnas industriales de cobre / Cobre tradicional',destilacionEn:'Industrial copper columns / Traditional copper',reto:'Alta concentración de perfiles de destilación industrial',retoEn:'High concentration of industrial distillation profiles',descripcion:'Tierras mineras con agaves silvestres. Zacatecas tiene una mezcla inusual de producción industrial y artesanal.',descripcionEn:'Mining lands with wild agaves. Zacatecas has an unusual mix of industrial and artisanal production.',color:'from-orange-900/30',palenques:11 },
  durango: { nombre:'Durango',nameEn:'Durango',termino:'Vinata',terminoEn:'Vinata',agaves:['Cenizo (Durangensis)'],coccion:'Hoyo subterráneo con piedras volcánicas',coccionEn:'Underground stone pit (volcanic)',fermentacion:'Tinas subterráneas de pino / Tinas de roble',fermentacionEn:'Underground pine vats / Oak vats',destilacion:'Estilo filipino (olla de cobre / tapa de madera)',destilacionEn:'Filipino style (copper pot / wood top)',reto:'Seguimiento de agave silvestre / Vastas distancias geográficas',retoEn:'Wild agave supply tracking / Vast geographical distances',descripcion:'En Durango no se dice palenque — se dice vinata. El cenizo crece a más de 2,000 metros en la Sierra Madre Occidental.',descripcionEn:"In Durango they don't say palenque — they say vinata. Cenizo grows above 2,000 meters in the Sierra Madre Occidental.",color:'from-blue-900/30',palenques:19 },
  michoacan: { nombre:'Michoacán',nameEn:'Michoacán',termino:'Palenque',terminoEn:'Palenque',agaves:['Cupreata','Inaequidens'],coccion:'Hoyo subterráneo con piedras',coccionEn:'Underground pit with stones',fermentacion:'Tinas de madera / Recipientes de barro',fermentacionEn:'Wood vats / Clay vessels',destilacion:'Alambique de cobre / Destilación en barro',destilacionEn:'Copper alembic / Clay distillation',reto:'Comunidades purépechas con técnicas no documentadas',retoEn:'Purépecha communities with undocumented techniques',descripcion:'El mezcal purépecha de Michoacán es uno de los menos documentados. Las comunidades indígenas guardan técnicas de destilación en barro únicas.',descripcionEn:"Michoacán's Purépecha mezcal is one of the least documented. Indigenous communities hold unique clay distillation techniques.",color:'from-red-900/30',palenques:9 },
  puebla: { nombre:'Puebla',nameEn:'Puebla',termino:'Palenque',terminoEn:'Palenque',agaves:['Papalometl','Tobaziche','Espadín'],coccion:'Hoyo subterráneo / Hornos de piedra',coccionEn:'Underground pit / Stone ovens',fermentacion:'Tinas de madera / Fermentación en cuero',fermentacionEn:'Wood vats / Leather fermentation',destilacion:'Alambique de cobre / Destilación en barro',destilacionEn:'Copper alembic / Clay distillation',reto:'Papalometl silvestre — difícil de rastrear y certificar',retoEn:'Wild Papalometl — difficult to track and certify',descripcion:'Puebla produce mezcal en la Mixteca y la Sierra Norte. El papalometl silvestre tiene un dulzor especiado que no existe en ningún otro agave.',descripcionEn:"Puebla produces mezcal in la Mixteca y la Sierra Norte. Wild papalometl has a spiced sweetness found in no other agave.",color:'from-pink-900/30',palenques:27 },
}

export default function RegionSlugPage({ params }: { params: { slug: string } }) {
  const { t } = useLang()
  const r = REGIONS[params.slug]
  if (!r) notFound()

  return (
    <main className="min-h-screen bg-[#080808] pt-20">
      <section className={`px-6 py-16 bg-gradient-to-br ${r.color} to-[#080808]`}>
        <div className="max-w-4xl mx-auto">
          <Link href={t('/regiones','/en/regiones')} className="text-stone-500 text-sm hover:text-amber-400 transition-colors mb-6 inline-block">
            ← {t('Todas las regiones','All regions')}
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4 mt-2">
            <div>
              <p className="text-amber-400 text-xs tracking-widest uppercase mb-2">{t(r.termino, r.terminoEn)}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white">{r.nombre}</h1>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-400">{r.palenques}</p>
              <p className="text-stone-500 text-sm mt-1">{t('registrados','registered')}</p>
            </div>
          </div>
          <p className="text-stone-300 text-lg leading-relaxed mt-6 max-w-2xl">{t(r.descripcion, r.descripcionEn)}</p>
        </div>
      </section>

      <section className="px-6 py-14 max-w-4xl mx-auto">
        <p className="text-stone-500 text-xs uppercase tracking-widest mb-8">{t('Datos de Producción','Production Data')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-6">
            <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">{t('Agaves Principales','Primary Agaves')}</p>
            <div className="flex flex-wrap gap-2">
              {r.agaves.map((a: string) => (
                <span key={a} className="text-sm bg-stone-800 text-amber-300 px-3 py-1 rounded-full border border-stone-700">{a}</span>
              ))}
            </div>
          </div>
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-6">
            <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">{t('Cocción','Cooking')}</p>
            <p className="text-stone-300 text-sm leading-relaxed">{t(r.coccion, r.coccionEn)}</p>
          </div>
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-6">
            <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">{t('Fermentación','Fermentation')}</p>
            <p className="text-stone-300 text-sm leading-relaxed">{t(r.fermentacion, r.fermentacionEn)}</p>
          </div>
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-6">
            <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">{t('Destilación','Distillation')}</p>
            <p className="text-stone-300 text-sm leading-relaxed">{t(r.destilacion, r.destilacionEn)}</p>
          </div>
        </div>
        <div className="mt-4 bg-stone-900/40 border border-stone-800/60 rounded-xl p-6">
          <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">{t('Reto Principal de Trazabilidad','Primary Traceability Challenge')}</p>
          <p className="text-stone-400 text-sm leading-relaxed">{t(r.reto, r.retoEn)}</p>
        </div>
      </section>

      <section className="px-6 py-10 border-t border-stone-800 text-center">
        <Link href={t('/palenques','/en/palenques')} className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition-colors">
          {t('Ver Palenques','View Palenques')}
        </Link>
      </section>
    </main>
  )
}
