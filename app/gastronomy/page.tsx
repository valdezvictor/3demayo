'use client'
import { useLang } from '../components/LangContext'

const pairings = [
  { agave: 'Espadín', region: 'Oaxaca', perfil: 'Ahumado suave, frutal, herbáceo', profile: 'Soft smoke, fruity, herbaceous', color: 'border-amber-400/30', badge: 'bg-amber-400/10 text-amber-300',
    pares: [{ platillo: 'Mole Negro', en: 'Black Mole', nota: 'El humo del espadín amplifica la profundidad del chile mulato' },{ platillo: 'Tasajo oaxaqueño', en: 'Oaxacan Tasajo', nota: 'Grasa y sal del tasajo contra la acidez brillante del agave' },{ platillo: 'Chapulines', en: 'Grasshoppers', nota: 'Umami terroso — el maridaje más autóctono de Oaxaca' },{ platillo: 'Queso Oaxaca fresco', en: 'Fresh Oaxacan Cheese', nota: 'Lácteo suave que limpia el paladar entre sorbo y sorbo' }] },
  { agave: 'Tobalá', region: 'Oaxaca / Puebla', perfil: 'Floral, mineral, frutas tropicales', profile: 'Floral, mineral, tropical fruits', color: 'border-purple-400/30', badge: 'bg-purple-400/10 text-purple-300',
    pares: [{ platillo: 'Ceviche de mariscos', en: 'Seafood Ceviche', nota: 'La acidez del limón espeja los ésteres florales del tobalá' },{ platillo: 'Aguachile verde', en: 'Green Aguachile', nota: 'Picante fresco con mineral de agave silvestre' },{ platillo: 'Flores de calabaza', en: 'Squash Blossoms', nota: 'Floral con floral — armonía elegante en temporada' },{ platillo: 'Tacos de chicharrón', en: 'Chicharrón Tacos', nota: 'Grasa crujiente equilibrada con mineralidad alta' }] },
  { agave: 'Cupreata', region: 'Guerrero', perfil: 'Terroso, mineral, notas de cuero', profile: 'Earthy, mineral, leather notes', color: 'border-emerald-400/30', badge: 'bg-emerald-400/10 text-emerald-300',
    pares: [{ platillo: 'Pozole rojo', en: 'Red Pozole', nota: 'Caldo profundo y picante con el terroir de Guerrero' },{ platillo: 'Barbacoa de borrego', en: 'Lamb Barbacoa', nota: 'Cuero y humo del agave junto a la laminilla del borrego' },{ platillo: 'Cecina con nopales', en: 'Cecina with Nopales', nota: 'Acidez del nopal limpia la grasa — el cupreata completa' },{ platillo: 'Chocolate amargo 70%', en: '70% Dark Chocolate', nota: 'Mineral contra amargo — el maridaje más sorprendente' }] },
  { agave: 'Papalometl', region: 'Puebla', perfil: 'Dulce, especiado, notas de piloncillo', profile: 'Sweet, spiced, piloncillo notes', color: 'border-yellow-400/30', badge: 'bg-yellow-400/10 text-yellow-300',
    pares: [{ platillo: 'Mole Poblano', en: 'Puebla Mole', nota: 'El dulzor del papalometl amplifica el chocolate del mole' },{ platillo: 'Chiles en nogada', en: 'Chiles en Nogada', nota: 'Fruta seca y nuez — el maridaje patriótico perfecto' },{ platillo: 'Pan de yema', en: 'Egg Yolk Bread', nota: 'Piloncillo con piloncillo — Puebla en su expresión más pura' },{ platillo: 'Pipián verde', en: 'Green Pipián', nota: 'Semilla de calabaza con la dulzura especiada del agave' }] },
]

export default function GastronomyPage() {
  const { t } = useLang()
  return (
    <main className="min-h-screen bg-[#080808] pt-20">
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <p className="text-amber-400 text-sm tracking-[0.2em] uppercase mb-3">{t('Mesa y Destilado','Table & Spirit')}</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('Gastronomía del Agave','Agave Gastronomy')}</h1>
        <p className="text-stone-400 text-lg max-w-2xl">{t('El mezcal nació en la mesa. Cada variedad de agave tiene su propio lenguaje gastronómico.','Mezcal was born at the table. Each agave variety has its own gastronomic language.')}</p>
      </section>
      <section className="px-6 py-8 max-w-6xl mx-auto space-y-12">
        {pairings.map((p) => (
          <div key={p.agave} className={`border ${p.color} rounded-2xl overflow-hidden`}>
            <div className="bg-stone-900/80 px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-white">{p.agave}</h2>
                <p className="text-stone-500 text-sm mt-0.5">{p.region}</p>
              </div>
              <span className={`${p.badge} text-xs px-3 py-1.5 rounded-full self-start sm:self-auto`}>{t(p.perfil, p.profile)}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-800/40">
              {p.pares.map((par) => (
                <div key={par.platillo} className="bg-[#080808] px-8 py-6">
                  <h3 className="text-white font-semibold mb-1">{t(par.platillo, par.en)}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{par.nota}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="px-6 py-20 text-center border-t border-stone-800 mt-8">
        <p className="text-stone-500 text-sm tracking-widest uppercase mb-4">{t('¿Eres restaurantero?','Are you a restaurateur?')}</p>
        <h2 className="text-2xl font-bold text-white mb-4">{t('Lleva el mezcal a tu mesa','Bring mezcal to your table')}</h2>
        <a href={t('/for-restaurants','/en/for-restaurants')} className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition-colors">{t('Contactar','Get in touch')}</a>
      </section>
    </main>
  )
}
