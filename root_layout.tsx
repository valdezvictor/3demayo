import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Nav from "./components/Nav"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3 de Mayo — Registro Patrimonial del Mezcal Mexicano",
  description: "El primer directorio abierto del mezcal ancestral mexicano. Palenques verificados, maestras mezcaleras, y el patrimonio vivo de la Sierra Mixteca de Puebla.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#080808] text-stone-200 antialiased`}>
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-[#262626] mt-20">
          <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-stone-200 font-serif font-bold mb-1">3 de Mayo</p>
              <p className="text-stone-600 text-xs">Registro Patrimonial del Mezcal Mexicano</p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-stone-600">
              <a href="mailto:registro@3demayo.com" className="hover:text-amber-500 transition-colors">registro@3demayo.com</a>
              <span>© 2026 3deMayo.com</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
