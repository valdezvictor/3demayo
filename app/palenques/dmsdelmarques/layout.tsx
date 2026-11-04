import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DMS del Marqués — Palenque Artesanal | Tres de Mayo",
  description: "Palenque fundado en 1987 en San Marcos Tlapazola, Oaxaca. Maestra Mezcalera Graciela Cruz Hernández. Agaves Espadín, Tobalá y Tepeztate a 1,680 metros de altitud.",
  keywords: ["DMS del Marqués", "mezcal artesanal", "San Marcos Tlapazola", "Graciela Cruz Hernández", "maestra mezcalera", "Tobalá", "Tepeztate", "palenque Oaxaca"],
  openGraph: {
    title: "DMS del Marqués — Maestra Mezcalera Graciela Cruz Hernández",
    description: "Palenque artesanal en los Valles Centrales de Oaxaca. Producción tradicional con agaves propios desde 1987.",
    type: "website",
    locale: "es_MX",
    siteName: "Tres de Mayo",
    url: "https://www.3demayo.com/palenques/dmsdelmarques",
  },
  alternates: {
    canonical: "https://www.3demayo.com/palenques/dmsdelmarques",
    languages: {
      es: "https://www.3demayo.com/palenques/dmsdelmarques",
      en: "https://www.3demayo.com/en/palenques/dmsdelmarques",
    },
  },
}

export default function DmsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
