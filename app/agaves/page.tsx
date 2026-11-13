"use client"
import { useEffect, useState } from "react"
import { useLang } from "../components/LangContext"

export default function AgavesPage() {
  const { lang, t } = useLang()
  const [agaves, setAgaves] = useState<any[]>([])
  const [q, setQ] = useState("")

  useEffect(() => {
    fetch("/api/admin/agaves")
      .then(r => r.json())
      .then((d: any) => Array.isArray(d) && setAgaves(d))
  }, [])

  const filtered = agaves.filter((a: any) =>
    !q ||
    (a.name || "").toLowerCase().includes(q.toLowerCase()) ||
    (a.scientific_name || "").toLowerCase().includes(q.toLowerCase())
  )

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <style>{`
        .agave-card { background: #1a1916; border: 1px solid #2a2720; border-radius: 10px; padding: 1.25rem; transition: border-color 0.2s; }
        .agave-card:hover { border-color: #4a7c59; }
        .agave-search { width: 100%; padding: 0.75rem 1rem; border: 1px solid #2a2720; border-radius: 8px; font-size: 0.95rem; margin-bottom: 1.5rem; box-sizing: border-box; background: #121210; color: #e8e2d6; outline: none; transition: border-color 0.2s; }
        .agave-search:focus { border-color: #4a7c59; }
        .agave-search::placeholder { color: #5a5448; }
        .agave-banner { background: linear-gradient(135deg,#1e2e22,#2a4030); border-radius: 16px; padding: 3rem 2rem; color: #e8e2d6; margin-bottom: 2rem; text-align: center; border: 1px solid #3a5040; }
        .agave-notice { background: #1e1c16; border: 1px solid #3a3020; border-radius: 10px; padding: 1rem 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem; }
      `}</style>

      <div className="agave-banner">
        <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          {t("Enciclopedia de Agaves", "Agave Encyclopedia")}
        </h1>
        <p style={{ color: "#9a9080", fontSize: "1.05rem" }}>
          {agaves.length} {t("variedades documentadas", "documented varieties")}
        </p>
      </div>

      <div className="agave-notice">
        <span style={{ fontSize: "1.5rem" }}>🚧</span>
        <div style={{ color: "#9a9080", fontSize: "0.9rem" }}>
          <strong style={{ color: "#c8832a" }}>{t("PRÓXIMAMENTE:", "COMING SOON:")}</strong>{" "}
          {t("Guías detalladas de cada agave.", "Detailed guides for each agave.")}{" "}
          <a href="/register" style={{ color: "#c8832a", fontWeight: 600 }}>
            {t("Regístrate para ser el primero", "Register to be the first")}
          </a>
        </div>
      </div>

      <input
        value={q}
        onChange={(e: any) => setQ(e.target.value)}
        placeholder={t("Buscar agave…", "Search agave…")}
        className="agave-search"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
        {filtered.map((a: any) => (
          <div key={a.id} className="agave-card">
            <h3 style={{ fontWeight: 700, fontSize: "1rem", margin: "0 0 0.4rem", lineHeight: 1.3, color: "#e8e2d6" }}>
              {a.name}
            </h3>
            {a.scientific_name && (
              <p style={{ fontSize: "0.8rem", color: "#4a7c59", fontStyle: "italic", margin: "0 0 0.4rem" }}>
                {a.scientific_name}
              </p>
            )}
            {a.maturation_years && (
              <p style={{ fontSize: "0.8rem", color: "#5a5448", margin: "0" }}>
                {a.maturation_years} {t("años de maduración", "years to maturity")}
              </p>
            )}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "#5a5448", marginTop: "2rem", fontSize: "0.85rem" }}>
        {t("Mostrando", "Showing")} {filtered.length} {t("de", "of")} {agaves.length} {t("variedades", "varieties")}
      </p>
    </main>
  )
}
