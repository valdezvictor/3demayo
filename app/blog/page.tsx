"use client"
import { useEffect, useState } from "react"
import { useLang } from "../components/LangContext"

const CATS_ES = [
  { key: "Todo", label: "Todo" },
  { key: "agave", label: "Agaves" },
  { key: "producer", label: "Productores" },
  { key: "region", label: "Regiones" },
  { key: "gastronomy", label: "Gastronomía" },
  { key: "editorial", label: "Editorial" },
]
const CATS_EN = [
  { key: "Todo", label: "All" },
  { key: "agave", label: "Agaves" },
  { key: "producer", label: "Producers" },
  { key: "region", label: "Regions" },
  { key: "gastronomy", label: "Gastronomy" },
  { key: "editorial", label: "Editorial" },
]
const ICONS: Record<string, string> = {
  agave: "🌵", producer: "🏭", region: "🗺️", gastronomy: "🍽️", editorial: "📝",
}

export default function BlogPage() {
  const { lang, t } = useLang()
  const [articles, setArticles] = useState<any[]>([])
  const [cat, setCat] = useState("Todo")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const q = cat && cat !== "Todo" ? "?category=" + cat : ""
    fetch("/api/blog" + q)
      .then(r => r.json())
      .then((d: any) => { setArticles(d.articles || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [cat])

  const CATS = lang === "en" ? CATS_EN : CATS_ES

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <style>{`
        .blog-card { background: #1a1916; border: 1px solid #2a2720; border-radius: 12px; overflow: hidden; transition: border-color 0.2s, transform 0.2s; }
        .blog-card:hover { border-color: #c8832a; transform: translateY(-2px); }
        .blog-card-img { background: linear-gradient(135deg,#1e1c16,#2a2518); height: 140px; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
        .blog-card-body { padding: 1.25rem; }
        .blog-cat-chip { padding: 0.4rem 1.1rem; border-radius: 2rem; border: 1px solid; cursor: pointer; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.04em; transition: all 0.15s; }
        .blog-cat-chip.active { background: #c8832a; border-color: #c8832a; color: #0a0a08; }
        .blog-cat-chip.inactive { background: transparent; border-color: #3a3530; color: #9a9080; }
        .blog-cat-chip.inactive:hover { border-color: #c8832a; color: #e8e2d6; }
      `}</style>

      <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "2.4rem", fontWeight: 700, color: "#e8e2d6", marginBottom: "0.5rem" }}>
        {t("Blog & Editorial", "Blog & Editorial")}
      </h1>
      <p style={{ color: "#9a9080", marginBottom: "2rem", fontSize: "1rem" }}>
        {t("Historias, conocimiento y cultura del mezcal artesanal", "Stories, knowledge and culture of artisanal mezcal")}
      </p>

      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {CATS.map(c => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`blog-cat-chip ${cat === c.key ? "active" : "inactive"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "#9a9080" }}>{t("Cargando…", "Loading…")}</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
          {articles.length === 0 && (
            <p style={{ color: "#9a9080" }}>{t("No hay artículos.", "No articles found.")}</p>
          )}
          {articles.map((a: any) => (
            <a key={a.slug} href={"/blog/" + a.slug} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="blog-card">
                <div className="blog-card-img">{ICONS[a.category] || "📝"}</div>
                <div className="blog-card-body">
                  <span style={{ fontSize: "0.72rem", color: "#c8832a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {a.category}
                  </span>
                  <h2 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0.5rem 0 0.4rem", lineHeight: 1.35, color: "#e8e2d6" }}>
                    {lang === "en" && a.title_en ? a.title_en : a.title_es}
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#9a9080", lineHeight: 1.55, margin: "0 0 0.75rem" }}>
                    {lang === "en" && a.excerpt_en ? a.excerpt_en : a.excerpt_es}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "#5a5448" }}>{a.author}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  )
}
