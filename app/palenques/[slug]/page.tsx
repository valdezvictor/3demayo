"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import Link from "next/link"

interface Palenque {
  id: number
  slug: string
  palenque_name: string
  maestro_name: string
  maestro_title: string
  is_maestra: boolean
  municipality: string
  state: string
  altitude_m: number
  founded_year: number
  description_es: string
  description_en: string
  agave_species: string[]
  production_method: string
  certifications: string[]
  is_verified: boolean
  website?: string
  instagram?: string
  contact_email?: string
  hero_image_url?: string
  region_name?: string
  region_desc_es?: string
}

// ─── Static enrichment overlay ────────────────────────────────────────────────
// Supplements API data until CMS admin for palenques is built.
const PALENQUE_ENRICHMENT: Record<string, {
  tier: "free" | "paid" | "partner"
  tagline_es: string
  tagline_en: string
  region_story_es: string[]
  region_story_en: string[]
  founder_story_es: string[]
  founder_story_en: string[]
  pull_quote_es: string
  pull_quote_en: string
  production_steps: {
    num: string
    step_es: string
    step_en: string
    detail_es: string
    detail_en: string
  }[]
  agaves_rich: {
    name: string
    scientific: string
    type: "cultivated" | "silvestre"
    maturity_years: number
    notes_es: string
    notes_en: string
  }[]
  expressions: {
    name: string
    agave: string
    abv?: number
    batch_size: string
    notes_es: string
    notes_en: string
    label_style?: string
  }[]
  stat_plants?: string
  stat_altitude?: string
  stat_fermentation?: string
  social_instagram?: string
  social_facebook?: string
  contact_email?: string
  contact_phone?: string
  us_importer?: string
}> = {
  "dmsdelmarques": {
    tier: "partner",
    tagline_es: "Istmo de Tehuantepec · Artesanal Puro",
    tagline_en: "Istmo de Tehuantepec · Pure Artisanal",
    region_story_es: [
      "El Istmo de Tehuantepec es uno de los territorios más singulares de Oaxaca — una franja de tierra donde el Pacífico y el Golfo de México se acercan a tan solo 200 kilómetros de distancia. En su corazón, el valle fluvial de Jalapa del Marqués, bordeado por la Presa Presidente Benito Juárez, ofrece un microclima costero distinto a todo lo que el mundo conoce del mezcal.",
      "Lejos de la saturación de los Valles Centrales y Matatlán, los productores del Istmo representan un movimiento independiente: recuperar la producción mezcalera artesanal en una región históricamente relegada al margen del mercado formal. DMS del Marqués es uno de los nombres que lidera esa recuperación.",
    ],
    region_story_en: [
      "The Isthmus of Tehuantepec is one of Oaxaca's most singular territories — a strip of land where the Pacific and Gulf of Mexico converge within 200 kilometers. At its heart, the Jalapa del Marqués river valley, bordered by the Presa Presidente Benito Juárez reservoir, offers a coastal microclimate unlike anything the mainstream mezcal world has known.",
      "Far from the saturation of the Central Valleys and Matatlán, Isthmus producers represent an independent movement: reclaiming artisanal mezcal production in a region historically left outside the formal market. DMS del Marqués is one of the names leading that recovery.",
    ],
    founder_story_es: [
      "William Velásquez es el fundador y director de DMS del Marqués, una operación de mezcal artesanal enraizada en Santa María Jalapa del Marqués, Oaxaca. Su trabajo no es solo producción — es una declaración de pertenencia territorial.",
      "En una región donde el mezcal formal tardó décadas en obtener reconocimiento, Velásquez decidió construir bajo las normas más exigentes: agaves de madurez comprobada, cocción en horno cónico de piedra con leña de mezquite local, fermentación natural en tinas de pino, y destilación en alambiques de cobre. Sin atajos. Sin compromisos.",
      "El portafolio de DMS del Marqués incluye un Espadín de referencia y una línea de Mezcales Silvestres de lote pequeño — agaves que maduran más de 8 años en las laderas secas del Istmo, donde el suelo mineral y el clima de baja altitud imprimen notas que no se replican en ningún otro lugar de Oaxaca.",
    ],
    founder_story_en: [
      "William Velásquez is the founder and director of DMS del Marqués, an artisanal mezcal operation rooted in Santa María Jalapa del Marqués, Oaxaca. His work is not just production — it is a declaration of territorial belonging.",
      "In a region where formal mezcal recognition took decades to arrive, Velásquez chose to build under the most demanding standards: mature agave of proven age, cooking in a traditional stone conical pit with local mesquite wood, natural fermentation in pine wood vats, and distillation in copper pot stills. No shortcuts. No compromises.",
      "The DMS del Marqués portfolio includes a benchmark Espadín and a line of small-batch Mezcales Silvestres — agaves that mature 8+ years on the dry Isthmus hillsides, where mineral soil and low-altitude climate impart notes that cannot be replicated anywhere else in Oaxaca.",
    ],
    pull_quote_es: "El Istmo tiene su propio lenguaje. Nuestro mezcal es la traducción más honesta de este suelo.",
    pull_quote_en: "The Isthmus has its own language. Our mezcal is the most honest translation of this soil.",
    production_steps: [
      {
        num: "01",
        step_es: "Selección de Agave",
        step_en: "Agave Selection",
        detail_es: "Espadín cultivado y agaves silvestres maduros cosechados en las laderas del Istmo. Los silvestres requieren un mínimo de 8 años de maduración.",
        detail_en: "Cultivated Espadín and mature wild agaves harvested from the Isthmus hillsides. Wild varieties require a minimum of 8 years to maturity.",
      },
      {
        num: "02",
        step_es: "Cocción en Horno de Piedra con Leña de Mezquite",
        step_en: "Stone Pit Roasting with Mesquite Wood",
        detail_es: "Las piñas se cocinan en un horno de piedra con leña de mezquite local. Tras la cocción, la molienda se realiza con una tahona circular de aproximadamente 1 tonelada, impulsada por la fuerza de un caballo guiado por una persona dentro del palenque.",
        detail_en: "Piñas are roasted in a stone pit heated with local mesquite wood. After cooking, milling is done with a ~1-ton circular tahona stone, driven by a horse guided by a person inside the palenque.",
      },
      {
        num: "03",
        step_es: "Fermentación Natural en Tinas de Pino",
        step_en: "Natural Fermentation in Pine Vats",
        detail_es: "El maguey molido se coloca en tinas de madera de pino, donde la fermentación ocurre con levaduras nativas durante 5 a 7 días, dependiendo de las condiciones climáticas. El Istmo — su humedad, sus vientos — participa activamente en cada lote.",
        detail_en: "Ground maguey is placed in pine wood vats, where native yeasts ferment the must for 5 to 7 days depending on climatic conditions. The Isthmus — its humidity, its winds — actively participates in each batch.",
      },
      {
        num: "04",
        step_es: "Doble Destilación en Alambique de Cobre",
        step_en: "Double Distillation in Copper Pot Stills",
        detail_es: "Destilación doble en alambiques de cobre tradicionales. La cobre refina sin borrar — el carácter del agave y del terroir permanecen intactos.",
        detail_en: "Double distillation in traditional copper pot stills. Copper refines without erasing — the character of agave and terroir remain intact.",
      },
    ],
    agaves_rich: [
      {
        name: "Espadín",
        scientific: "Agave angustifolia",
        type: "cultivated",
        maturity_years: 7,
        notes_es: "La columna vertebral del portafolio. Cultivado en el valle fluvial del Istmo, expresa dulzura de agave cocido, ahumado de mezquite y un final mineral limpio.",
        notes_en: "The backbone of the portfolio. Cultivated in the Isthmus river valley, it expresses cooked agave sweetness, mesquite smoke, and a clean mineral finish.",
      },
      {
        name: "Silvestres del Istmo",
        scientific: "Varias especies",
        type: "silvestre",
        maturity_years: 8,
        notes_es: "Lotes pequeños de agaves silvestres cosechados en las laderas secas de baja altitud del Istmo. Notas minerales, cítricas y herbales que no se replican en los Valles Centrales.",
        notes_en: "Small batches of wild agaves harvested from the low-altitude dry hillsides of the Isthmus. Mineral, citrus and herbal notes unreplicable in the Central Valleys.",
      },
      {
        name: "Cremas y Licores",
        scientific: "Base de Agave",
        type: "cultivated",
        maturity_years: 7,
        notes_es: "Licores tradicionales de agave — una expresión de la cultura del Istmo más allá del mezcal puro.",
        notes_en: "Traditional agave liqueurs — an expression of Isthmus culture beyond pure mezcal.",
      },
    ],
    expressions: [
      {
        name: "Espadín Joven — Edición Especial",
        agave: "Maguey Espadín (Agave angustifolia)",
        abv: 45,
        batch_size: "700 ml · Denominación de Origen",
        notes_es: "Vista cristalina y brillante con destellos plateados. En nariz: aromas de maguey cocido, ligero ahumado de mezquite, notas cítricas de limón, notas herbales y de caramelo. En boca: dulces de maguey cocido, caramelo, jengibre y especias, mineral, alta permanencia en boca, percepción alcohólica balanceada, de gran cuerpo. Retrogusto: caramelo, herbal, prolongado.",
        notes_en: "Crystal clear and brilliant with silver highlights. Nose: cooked maguey aromas, light mesquite smoke, citrus lemon notes, herbal and caramel. Palate: cooked maguey sweetness, caramel, ginger and spice, mineral, long finish, balanced alcohol, full body. Finish: caramel, herbal, prolonged.",
        label_style: "gold",
      },
      {
        name: "Espadín Joven",
        agave: "Maguey Espadín (Agave angustifolia)",
        abv: 45,
        batch_size: "700 ml · Denominación de Origen",
        notes_es: "Vista cristalina y brillante con destellos plateados. En nariz: aromas de maguey cocido, ligero ahumado de mezquite, notas cítricas de limón, herbales y de caramelo. En boca: maguey cocido, caramelo, jengibre y especias, mineral, alta permanencia, percepción alcohólica balanceada, gran cuerpo. Retrogusto: caramelo, herbal, prolongado.",
        notes_en: "Crystal clear and brilliant with silver highlights. Nose: cooked maguey, light mesquite smoke, lemon citrus, herbal and caramel. Palate: cooked maguey sweetness, caramel, ginger and spice, mineral, long finish, balanced alcohol. Finish: caramel, herbal, prolonged.",
        label_style: "rainbow",
      },
      {
        name: "Passion Fruit",
        agave: "Maguey Espadín — base mezcal artesanal joven",
        abv: 45,
        batch_size: "750 ml · Mezcal Licor",
        notes_es: "Licor de mezcal artesanal con maracuyá. Dorado intenso, aroma tropical de maracuyá con trasfondo de agave cocido. En boca: frutal, dulce con equilibrio mezcalero. Elegante y de carácter.",
        notes_en: "Artisanal mezcal liqueur with passion fruit. Deep golden, tropical passion fruit aroma with underlying cooked agave. Palate: fruity, sweet with mezcal balance. Elegant and characterful.",
        label_style: "gold",
      },
      {
        name: "Pineapple Chamoy",
        agave: "Maguey Espadín — base mezcal artesanal joven",
        abv: 40,
        batch_size: "750 ml · Mezcal Licor",
        notes_es: "Licor de mezcal con piña y chamoy. Color rojizo vibrante. Aroma a piña tropical con notas de chamoy y agave de fondo. En boca: intenso, frutal-picante, característico de la cultura gastronómica mexicana.",
        notes_en: "Mezcal liqueur with pineapple and chamoy. Vibrant red color. Tropical pineapple aroma with chamoy and background agave. Palate: intense, fruity-spicy, characteristic of Mexican culinary culture.",
        label_style: "red",
      },
      {
        name: "Pineapple Coconut Cream",
        agave: "Maguey Espadín — base mezcal artesanal joven",
        abv: 15,
        batch_size: "750 ml · Crema de Mezcal",
        notes_es: "Crema de mezcal con piña y coco. Color marfil cremoso. Aroma a coco fresco, piña y agave suave. En boca: sedosa, dulce y tropical con un fondo mezcalero sutil. Perfecta servida fría.",
        notes_en: "Mezcal cream with pineapple and coconut. Creamy ivory color. Fresh coconut, pineapple and soft agave aroma. Palate: silky, sweet and tropical with a subtle mezcal background. Perfect served cold.",
        label_style: "cream",
      },
    ],
    stat_plants: "500+",
    stat_altitude: "~150 m",
    stat_fermentation: "5–7 días / Natural",
    social_instagram: "@dmsdelmarques",
    social_facebook: "Fábricademezcalelmarques",
    contact_phone: "+52 995 103 6705",
    contact_email: "wiliam_01vesi@hotmail.com",
    us_importer: "Maestro Lindo Oaxaca Corp. · Westminster, CA",
  },
}

const methodLabel: Record<string, string> = {
  ancestral: "Ancestral",
  artisanal: "Artesanal",
  traditional: "Tradicional",
}

function PalenqueView({ slug }: { slug: string }) {
  const [palenque, setPalenque] = useState<Palenque | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [lang, setLang] = useState<"es" | "en">("es")

  useEffect(() => {
    if (!slug) return
    fetch(`/api/palenques/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setPalenque(data)
        setLoading(false)
      })
      .catch(() => {
        // For slugs not yet in API, render from enrichment data alone
        })
  }, [slug])

  const rich = slug ? PALENQUE_ENRICHMENT[slug] ?? null : null

  // If no API data but enrichment exists, build a synthetic palenque object
  const displayData: Palenque | null = palenque ?? (rich ? {
    id: 0,
    slug,
    palenque_name: "DMS del Marqués",
    maestro_name: "William Velásquez",
    maestro_title: "Fundador · Director de Producción",
    is_maestra: false,
    municipality: "Santa María Jalapa del Marqués",
    state: "Oaxaca",
    altitude_m: 150,
    founded_year: 0,
    description_es: rich.founder_story_es[0],
    description_en: rich.founder_story_en[0],
    agave_species: ["Espadín (Agave angustifolia)", "Silvestres del Istmo"],
    production_method: "artisanal",
    certifications: ["COMERCAM"],
    is_verified: true,
    instagram: rich.social_instagram,
    contact_email: rich.contact_email,
    region_name: "Istmo de Tehuantepec",
  } : null)

  const es = lang === "es"

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-amber-500 text-sm font-mono tracking-widest animate-pulse">
          CARGANDO REGISTRO...
        </div>
      </div>
    )
  }

  if (!displayData && !rich) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
        <p className="text-stone-400">Palenque no encontrado.</p>
        <Link href="/palenques" className="text-amber-500 hover:text-amber-400 text-sm">
          ← Volver al Registro
        </Link>
      </div>
    )
  }

  const p = displayData!
  const founderParas = rich ? (es ? rich.founder_story_es : rich.founder_story_en) : [p.description_es]
  const regionParas = rich ? (es ? rich.region_story_es : rich.region_story_en) : []

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">

      {/* ── Lang toggle ───────────────────────────── */}
      <div className="fixed top-4 right-4 z-50 flex border border-[#262626] overflow-hidden">
        <button
          onClick={() => setLang("es")}
          className={`px-3 py-1.5 text-xs font-mono tracking-widest transition-colors ${
            lang === "es" ? "bg-amber-500 text-black" : "bg-[#0a0a0a] text-stone-500 hover:text-stone-300"
          }`}
        >ES</button>
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1.5 text-xs font-mono tracking-widest transition-colors ${
            lang === "en" ? "bg-amber-500 text-black" : "bg-[#0a0a0a] text-stone-500 hover:text-stone-300"
          }`}
        >EN</button>
      </div>

      {/* ── Breadcrumb ────────────────────────────── */}
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2 text-xs font-mono text-stone-600">
          <Link href="/palenques" className="hover:text-amber-500 transition-colors">
            {es ? "Registro de Palenques" : "Palenque Registry"}
          </Link>
          <span>›</span>
          <Link href="/regiones" className="hover:text-amber-500 transition-colors">
            {p.region_name ?? "Oaxaca"}
          </Link>
          <span>›</span>
          <span className="text-stone-400">{p.palenque_name}</span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────── */}
      <div className="relative border-b border-[#1a1a1a] bg-[#060606] overflow-hidden">
        {/* Decorative agave silhouette lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden>
          <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMaxYMid slice">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (Math.PI / 12) * i - Math.PI * 0.1
              const len = 400
              const cx = 680, cy = 200
              return (
                <line
                  key={i}
                  x1={cx} y1={cy}
                  x2={cx + Math.cos(angle) * len}
                  y2={cy + Math.sin(angle) * len}
                  stroke="#d97706" strokeWidth="1"
                />
              )
            })}
            <circle cx="680" cy="200" r="80" fill="none" stroke="#d97706" strokeWidth="0.5" />
            <circle cx="680" cy="200" r="160" fill="none" stroke="#d97706" strokeWidth="0.3" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-16">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-amber-500 text-xs font-mono tracking-widest">
              {es ? "PALENQUE VERIFICADO · ARTESANAL" : "VERIFIED PALENQUE · ARTESANAL"}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-100 mb-3 leading-none">
            {p.palenque_name}
          </h1>

          {rich && (
            <p className="text-amber-500/70 font-mono text-xs tracking-widest mb-6">
              {es ? rich.tagline_es : rich.tagline_en}
            </p>
          )}

          <p className="text-amber-400 font-medium text-lg mb-1">{p.maestro_name}</p>
          <p className="text-stone-500 text-sm mb-10">{p.maestro_title}</p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-stone-600 text-xs font-mono tracking-widest mb-1">
                {es ? "REGIÓN" : "REGION"}
              </p>
              <p className="text-stone-200 text-sm">{p.region_name ?? "Istmo de Tehuantepec"}</p>
            </div>
            <div>
              <p className="text-stone-600 text-xs font-mono tracking-widest mb-1">
                {es ? "MUNICIPIO" : "MUNICIPALITY"}
              </p>
              <p className="text-stone-200 text-sm">{p.municipality}, {p.state}</p>
            </div>
            <div>
              <p className="text-stone-600 text-xs font-mono tracking-widest mb-1">
                {es ? "ALTITUD" : "ALTITUDE"}
              </p>
              <p className="text-stone-200 text-sm">
                {rich?.stat_altitude ?? (p.altitude_m ? `${p.altitude_m.toLocaleString()} m` : "~150 m")}
              </p>
            </div>
            <div>
              <p className="text-stone-600 text-xs font-mono tracking-widest mb-1">
                {es ? "MÉTODO" : "METHOD"}
              </p>
              <p className="text-amber-400/80 text-sm font-mono">
                {methodLabel[p.production_method] ?? p.production_method}
              </p>
            </div>
            <div>
              <p className="text-stone-600 text-xs font-mono tracking-widest mb-1">
                {es ? "FERMENTACIÓN" : "FERMENTATION"}
              </p>
              <p className="text-stone-200 text-sm">
                {rich?.stat_fermentation ?? "Natural"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Founder Story ─────────────────────────── */}
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-5">
            <p className="text-xs font-mono tracking-widest text-stone-600">
              {es ? "EL FUNDADOR" : "THE FOUNDER"}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 leading-tight">
              {es ? <><em className="text-stone-500 not-italic">La historia</em> detrás del palenque</> : <><em className="text-stone-500 not-italic">The story</em> behind the palenque</>}
            </h2>
            <div className="space-y-4">
              {founderParas.map((para, i) => (
                <p key={i} className="text-stone-300 leading-relaxed text-sm">{para}</p>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {rich && (
              <blockquote className="border-l-2 border-amber-500 pl-5">
                <p className="text-stone-300 font-serif text-base italic leading-relaxed">
                  "{es ? rich.pull_quote_es : rich.pull_quote_en}"
                </p>
                <cite className="block mt-3 text-xs font-mono tracking-widest text-stone-600 not-italic">
                  — {p.maestro_name}
                </cite>
              </blockquote>
            )}
            <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-5 space-y-4">
              <p className="text-xs font-mono tracking-widest text-stone-600">
                {es ? "DATOS CLAVE" : "KEY FACTS"}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-serif font-bold text-amber-500">8+</p>
                  <p className="text-xs font-mono text-stone-600 mt-1">
                    {es ? "Años agave silvestre" : "Wild agave years"}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-amber-500">0</p>
                  <p className="text-xs font-mono text-stone-600 mt-1">
                    {es ? "Aditivos" : "Additives"}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-amber-500">2×</p>
                  <p className="text-xs font-mono text-stone-600 mt-1">
                    {es ? "Destilado" : "Distilled"}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-amber-500">∞</p>
                  <p className="text-xs font-mono text-stone-600 mt-1">
                    {es ? "Levaduras silvestres" : "Wild yeasts"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Region Story ──────────────────────────── */}
      {regionParas.length > 0 && (
        <div className="border-b border-[#1a1a1a] bg-[#050505]">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <p className="text-xs font-mono tracking-widest text-stone-600 mb-4">
              {es ? "EL TERROIR" : "THE TERROIR"}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 mb-8 leading-tight">
              {es
                ? <><em className="text-stone-500 not-italic">Istmo de Tehuantepec</em> — un microclima sin igual</>
                : <><em className="text-stone-500 not-italic">Isthmus of Tehuantepec</em> — an unmatched microclimate</>
              }
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regionParas.map((para, i) => (
                <p key={i} className="text-stone-400 leading-relaxed text-sm">{para}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label_es: "Microclima costero", label_en: "Coastal microclimate" },
                { label_es: "Valle fluvial — Presa Benito Juárez", label_en: "River valley — Presa Benito Juárez" },
                { label_es: "Suelo mineral bajo altitud", label_en: "Mineral low-altitude soil" },
                { label_es: "Levaduras silvestres del Istmo", label_en: "Isthmus wild yeasts" },
              ].map(t => (
                <span key={t.label_es} className="px-3 py-1.5 border border-[#262626] text-stone-500 text-xs font-mono rounded-sm">
                  {es ? t.label_es : t.label_en}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Production Process ────────────────────── */}
      {rich?.production_steps && (
        <div className="border-b border-[#1a1a1a]">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <p className="text-xs font-mono tracking-widest text-stone-600 mb-4">
              {es ? "PROCESO DE PRODUCCIÓN" : "PRODUCTION PROCESS"}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 mb-10 leading-tight">
              {es
                ? <><em className="text-stone-500 not-italic">Artesanal</em> — sin atajos</>
                : <><em className="text-stone-500 not-italic">Artisanal</em> — no shortcuts</>
              }
            </h2>
            <div className="space-y-0">
              {rich.production_steps.map((step, i) => (
                <div key={step.num} className="flex gap-6 py-6 border-b border-[#1a1a1a] last:border-b-0">
                  <div className="text-3xl font-serif font-bold text-amber-500/30 w-10 flex-shrink-0 leading-none mt-1">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-stone-400 mb-2">
                      {es ? step.step_es : step.step_en}
                    </p>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {es ? step.detail_es : step.detail_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Agave Varieties ───────────────────────── */}
      {rich?.agaves_rich && (
        <div className="border-b border-[#1a1a1a] bg-[#050505]">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <p className="text-xs font-mono tracking-widest text-stone-600 mb-4">
              {es ? "VARIEDADES DE AGAVE" : "AGAVE VARIETIES"}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 mb-10 leading-tight">
              {es
                ? <>Del <em className="text-stone-500 not-italic">suelo del Istmo</em> al alambique</>
                : <>From the <em className="text-stone-500 not-italic">Isthmus soil</em> to the still</>
              }
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {rich.agaves_rich.map(agave => (
                <div key={agave.name} className="border border-[#1a1a1a] bg-[#0a0a0a] p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-stone-100 font-serif font-bold text-lg leading-tight">{agave.name}</p>
                    <span className={`px-2 py-0.5 text-xs font-mono flex-shrink-0 ${
                      agave.type === "silvestre"
                        ? "border border-amber-500/40 text-amber-500"
                        : "border border-stone-700 text-stone-500"
                    }`}>
                      {agave.type === "silvestre"
                        ? (es ? "Silvestre" : "Wild")
                        : (es ? "Cultivado" : "Cultivated")
                      }
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs font-mono italic">{agave.scientific}</p>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <span className="font-mono">{agave.maturity_years}+</span>
                    <span>{es ? "años de maduración" : "years to maturity"}</span>
                  </div>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {es ? agave.notes_es : agave.notes_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Expressions ───────────────────────────── */}
      {rich?.expressions && (
        <div className="border-b border-[#1a1a1a]">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <p className="text-xs font-mono tracking-widest text-stone-600 mb-4">
              {es ? "EL PORTAFOLIO" : "THE PORTFOLIO"}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 mb-10 leading-tight">
              {es
                ? <><em className="text-stone-500 not-italic">Expresiones</em> del Istmo</>
                : <><em className="text-stone-500 not-italic">Expressions</em> of the Isthmus</>
              }
            </h2>
            {/* Mezcal expressions (first 2) */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {rich.expressions.slice(0, 2).map(expr => (
                <div key={expr.name} className="border border-amber-500/20 bg-[#0a0a0a] p-6 space-y-4">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-amber-500/60 mb-1">
                      {es ? "MEZCAL ARTESANAL" : "ARTISANAL MEZCAL"}
                    </p>
                    <p className="text-xs font-mono text-stone-600 mb-2">{expr.agave}</p>
                    <h3 className="text-stone-100 font-serif font-bold text-xl">{expr.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {expr.abv && (
                      <span className="px-2 py-1 border border-amber-500/30 text-amber-500 text-xs font-mono">
                        {expr.abv}% ABV
                      </span>
                    )}
                    <span className="px-2 py-1 border border-[#262626] text-stone-500 text-xs font-mono">
                      {expr.batch_size}
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {es ? expr.notes_es : expr.notes_en}
                  </p>
                </div>
              ))}
            </div>
            {/* Liqueur / Cream line (last 3) */}
            <div className="border-t border-[#1a1a1a] pt-6">
              <p className="text-xs font-mono tracking-widest text-stone-600 mb-6">
                {es ? "LICORES Y CREMAS DE MEZCAL" : "MEZCAL LIQUEURS & CREAMS"}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {rich.expressions.slice(2).map(expr => (
                  <div key={expr.name} className="border border-[#1a1a1a] bg-[#0a0a0a] p-6 space-y-4">
                    <div>
                      <p className="text-xs font-mono tracking-widest text-stone-500/60 mb-2">
                        {expr.batch_size.includes("Crema") ? (es ? "CREMA DE MEZCAL" : "MEZCAL CREAM") : (es ? "LICOR DE MEZCAL" : "MEZCAL LIQUEUR")}
                      </p>
                      <h3 className="text-stone-100 font-serif font-bold text-lg">{expr.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expr.abv && (
                        <span className="px-2 py-1 border border-[#262626] text-stone-500 text-xs font-mono">
                          {expr.abv}% ABV
                        </span>
                      )}
                      <span className="px-2 py-1 border border-[#262626] text-stone-500 text-xs font-mono">
                        750 ml
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {es ? expr.notes_es : expr.notes_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Video placeholder ─────────────────────── */}
      <div className="border-b border-[#1a1a1a] bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <p className="text-xs font-mono tracking-widest text-stone-600 mb-4">
            {es ? "DOCUMENTAL" : "DOCUMENTARY"}
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 mb-3 leading-tight">
            {es
              ? <><em className="text-stone-500 not-italic">La voz</em> de William Velásquez</>
              : <><em className="text-stone-500 not-italic">The voice</em> of William Velásquez</>
            }
          </h2>
          <p className="text-stone-500 text-sm mb-8 max-w-lg">
            {es
              ? "William Velásquez ha dado su consentimiento para compartir la historia del palenque en video. Este espacio está reservado para ese material."
              : "William Velásquez has agreed to share the palenque's story on video. This space is reserved for that content."
            }
          </p>
          <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-12 flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border border-amber-500/40 flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-14 border-transparent border-l-amber-500 ml-1"
                style={{ borderLeftWidth: 18 }} />
            </div>
            <p className="text-stone-400 text-sm">{p.maestro_name} — {p.maestro_title}</p>
            <p className="text-stone-700 text-xs font-mono tracking-widest">
              {es ? "VIDEO PRÓXIMAMENTE" : "VIDEO COMING SOON"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Contact + Registry sidebar ────────────── */}
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <p className="text-xs font-mono tracking-widest text-stone-600">
              {es ? "CONTACTO" : "CONTACT"}
            </p>
            <div className="flex flex-wrap gap-3">
              {(rich?.social_instagram ?? p.instagram) && (
                <a
                  href={`https://instagram.com/${(rich?.social_instagram ?? p.instagram ?? "").replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-[#262626] text-stone-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors text-sm"
                >
                  <span>📷</span>
                  {rich?.social_instagram ?? p.instagram}
                </a>
              )}
              {rich?.social_facebook && (
                <a
                  href={`https://facebook.com/${rich.social_facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-[#262626] text-stone-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors text-sm"
                >
                  <span>f</span>
                  {rich.social_facebook}
                </a>
              )}
              {rich?.contact_phone && (
                <a
                  href={`tel:${rich.contact_phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-4 py-2.5 border border-[#262626] text-stone-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors text-sm"
                >
                  <span>☎</span>
                  {rich.contact_phone}
                </a>
              )}
              {(rich?.contact_email ?? p.contact_email) && (
                <a
                  href={`mailto:${rich?.contact_email ?? p.contact_email}`}
                  className="flex items-center gap-2 px-4 py-2.5 border border-[#262626] text-stone-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors text-sm"
                >
                  <span>✉</span>
                  {rich?.contact_email ?? p.contact_email}
                </a>
              )}
              {!rich?.social_instagram && !p.instagram && !rich?.contact_email && !p.contact_email && (
                <p className="text-stone-700 text-sm">
                  {es ? "Contacto no disponible" : "Contact not available"}
                </p>
              )}
            </div>
            {rich?.us_importer && (
              <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
                <p className="text-xs font-mono tracking-widest text-stone-600 mb-1">
                  {es ? "IMPORTADOR EE.UU." : "US IMPORTER"}
                </p>
                <p className="text-stone-500 text-sm">{rich.us_importer}</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {p.is_verified && (
              <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-4">
                <p className="text-xs font-mono tracking-widest text-stone-600 mb-2">
                  {es ? "ESTADO" : "STATUS"}
                </p>
                <p className="text-emerald-500 text-sm flex items-center gap-2">
                  <span>●</span>
                  {es ? "Registro Verificado" : "Verified Registry"}
                </p>
              </div>
            )}
            <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-4">
              <p className="text-xs font-mono tracking-widest text-stone-600 mb-2">
                {es ? "ID DE REGISTRO" : "REGISTRY ID"}
              </p>
              <p className="text-stone-500 font-mono text-xs">{p.slug}</p>
            </div>
            <div className="border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-amber-400 text-xs font-mono tracking-widest mb-2">
                {es ? "PARA RESTAURANTES" : "FOR RESTAURANTS"}
              </p>
              <p className="text-stone-400 text-xs leading-relaxed mb-3">
                {es
                  ? "¿Interesado en incluir DMS del Marqués en tu programa de mezcal?"
                  : "Interested in featuring DMS del Marqués in your mezcal program?"
                }
              </p>
              <Link
                href="/for-restaurants"
                className="text-amber-500 hover:text-amber-400 text-xs transition-colors"
              >
                {es ? "Ver programas de gastronomía →" : "View gastronomy programs →"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex justify-between items-center flex-wrap gap-4">
        <Link href="/" className="text-stone-600 hover:text-amber-500 font-serif text-lg transition-colors">
          3de<span className="text-amber-500">mayo</span>.com
        </Link>
        <div className="text-xs font-mono text-stone-700 text-right leading-relaxed">
          {p.palenque_name} · {p.municipality}, {p.state}<br />
          <a
            href={`https://3demayo.com/palenques/${p.slug}`}
            className="hover:text-stone-500 transition-colors"
          >
            3demayo.com/palenques/{p.slug}
          </a>
        </div>
      </div>

    </div>
  )
}

export default function Page({ params }: { params: { slug: string } }) {
  return <PalenqueView slug={params.slug} />
}
