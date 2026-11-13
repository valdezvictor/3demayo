"use client"
import { useEffect, useState } from "react"
import { useLang } from "../components/LangContext"

export default function CocktailsPage() {
  const { lang, t } = useLang()
  const [cocktails, setCocktails] = useState<any[]>([])
  const [active, setActive] = useState<any>(null)

  useEffect(() => {
    fetch("/api/cocktails")
      .then(r => r.json())
      .then((d: any) => {
        if (Array.isArray(d)) { setCocktails(d); if (d.length) setActive(d[0]) }
      })
  }, [])

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <style>{`
        .cktl-list-item { padding: 1rem 1.25rem; border: 1px solid #2a2720; border-radius: 10px; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
        .cktl-list-item:hover { border-color: #c8832a; }
        .cktl-list-item.active { border-color: #c8832a; background: #1e1810; }
        .cktl-detail { border: 1px solid #2a2720; border-radius: 12px; padding: 2rem; background: #1a1916; }
        .cktl-section-label { font-weight: 700; color: #c8832a; margin-bottom: 0.75rem; font-size: 0.95rem; letter-spacing: 0.03em; }
        .cktl-ing-item { padding: 0.4rem 0; border-bottom: 1px solid #2a2720; font-size: 0.95rem; color: #c8c0b0; }
        .cktl-step-item { margin-bottom: 0.6rem; font-size: 0.95rem; line-height: 1.55; color: #9a9080; }
        .cktl-meta { margin-top: 1.5rem; padding: 1rem 1.25rem; background: #121210; border-radius: 8px; display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.9rem; color: #9a9080; border: 1px solid #2a2720; }
        .cktl-meta strong { color: #e8e2d6; }
        @media (max-width: 680px) { .cktl-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "2.4rem", fontWeight: 700, color: "#e8e2d6", marginBottom: "0.5rem" }}>
        {t("Coctelería con Mezcal", "Mezcal Cocktails")}
      </h1>
      <p style={{ color: "#9a9080", marginBottom: "2rem", fontSize: "1rem" }}>
        {t("Recetas inspiradas en la tradición mezcalera artesanal", "Recipes inspired by artisanal mezcal tradition")}
      </p>

      <div className="cktl-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {cocktails.map((c: any) => (
            <div
              key={c.slug}
              onClick={() => setActive(c)}
              className={`cktl-list-item${active?.slug === c.slug ? " active" : ""}`}
            >
              <div style={{ fontWeight: 700, color: "#e8e2d6", fontSize: "0.95rem" }}>
                {lang === "en" && c.name_en ? c.name_en : c.name_es}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#5a5448", marginTop: "0.2rem" }}>{c.agave_base}</div>
            </div>
          ))}
        </div>

        {active && (
          <div className="cktl-detail">
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem", color: "#e8e2d6", fontFamily: "var(--font-playfair, serif)" }}>
              {lang === "en" && active.name_en ? active.name_en : active.name_es}
            </h2>
            <p style={{ color: "#9a9080", lineHeight: 1.65, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              {lang === "en" && active.description_en ? active.description_en : active.description_es}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <div className="cktl-section-label">{t("Ingredientes", "Ingredients")}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {(lang === "en" && active.ingredients_en ? active.ingredients_en : active.ingredients_es || []).map((ing: string, i: number) => (
                    <li key={i} className="cktl-ing-item">{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="cktl-section-label">{t("Preparación", "Preparation")}</div>
                <ol style={{ paddingLeft: "1.25rem", margin: 0 }}>
                  {(lang === "en" && active.steps_en ? active.steps_en : active.steps_es || []).map((s: string, i: number) => (
                    <li key={i} className="cktl-step-item">{s}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="cktl-meta">
              <span><strong>{t("Copa:", "Glass:")}</strong> {active.glass_type}</span>
              <span><strong>{t("Tiempo:", "Time:")}</strong> {active.prep_time_min} min</span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
