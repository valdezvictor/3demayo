'use client'

import { useState } from 'react'

type TabId = 'matrix' | 'cards' | 'ecosystems' | 'circuits' | 'taxonomy' | 'targets' | 'species'

export default function PalenquesPoblanosPage() {
  const [activeTab, setActiveTab] = useState<TabId>('matrix')

  return (
    <>
      <style>{`
        :root {
          --bg: #0a0a08; --bg-raised: #111009; --bg-card: #161410;
          --border: #2a2720; --border-soft: #1e1c17;
          --fg: #e8e2d6; --fg-muted: #9a9080; --fg-dim: #5a5448;
          --green: #4a7c59; --green-light: #6aad7e; --green-dim: #1e3828;
          --amber: #c8832a; --amber-light: #e8a85a; --amber-dim: #4a2e0a;
          --mono: 'Space Mono', monospace;
        }
        @media (prefers-color-scheme: light) {
          :root:not([data-theme="dark"]) {
            --bg: #faf9f6; --bg-raised: #f2f0ea; --bg-card: #ffffff;
            --border: #d8d4c8; --border-soft: #e8e4d8;
            --fg: #1a1810; --fg-muted: #5a5448; --fg-dim: #9a9080;
            --green: #3a6b48; --green-light: #2d5438; --green-dim: #d8ead0;
            --amber: #9a5a0a; --amber-light: #7a4208; --amber-dim: #faecd8;
          }
        }
        :root[data-theme="light"] {
          --bg: #faf9f6; --bg-raised: #f2f0ea; --bg-card: #ffffff;
          --border: #d8d4c8; --border-soft: #e8e4d8;
          --fg: #1a1810; --fg-muted: #5a5448; --fg-dim: #9a9080;
          --green: #3a6b48; --green-light: #2d5438; --green-dim: #d8ead0;
          --amber: #9a5a0a; --amber-light: #7a4208; --amber-dim: #faecd8;
        }
        :root[data-theme="dark"] {
          --bg: #0a0a08; --bg-raised: #111009; --bg-card: #161410;
          --border: #2a2720; --border-soft: #1e1c17;
          --fg: #e8e2d6; --fg-muted: #9a9080; --fg-dim: #5a5448;
          --green: #4a7c59; --green-light: #6aad7e; --green-dim: #1e3828;
          --amber: #c8832a; --amber-light: #e8a85a; --amber-dim: #4a2e0a;
        }
        .pp-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .pp-wrap {
          background: var(--bg); color: var(--fg);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 16px; line-height: 1.65; min-height: 100vh;
          padding: 0 max(16px, env(safe-area-inset-left,0px));
          -webkit-font-smoothing: antialiased;
        }

        /* Nav */
        .pp-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0; border-bottom: 1px solid var(--border-soft);
          max-width: 1200px; margin: 0 auto;
        }
        .pp-brand { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem;
          font-weight: 900; color: var(--amber); letter-spacing: .05em; text-decoration: none; }
        .pp-breadcrumb { font-size: .72rem; color: var(--fg-muted); letter-spacing: .04em;
          text-transform: uppercase; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
        .pp-breadcrumb span { color: var(--fg-dim); }

        /* Header */
        .pp-header { max-width: 1200px; margin: 0 auto; padding: 52px 0 44px; }
        .pp-eyebrow { font-size: .68rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--green-light); margin-bottom: 16px; }
        .pp-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.9rem, 3.5vw, 3rem); font-weight: 900;
          line-height: 1.1; margin-bottom: 20px;
        }
        .pp-title em { font-style: italic; color: var(--amber); }
        .pp-subtitle { font-size: 1rem; color: var(--fg-muted); max-width: 700px; margin-bottom: 36px; }

        /* Stat strip */
        .pp-stats {
          display: flex; flex-wrap: wrap; gap: 0;
          border: 1px solid var(--border); border-radius: 4px; overflow: hidden;
        }
        .pp-stat {
          flex: 1 1 160px; padding: 18px 20px;
          border-right: 1px solid var(--border);
          background: var(--bg-card);
        }
        .pp-stat:last-child { border-right: none; }
        .pp-stat-num { font-family: var(--mono); font-size: 1.5rem; color: var(--amber);
          font-weight: 700; line-height: 1; margin-bottom: 5px; }
        .pp-stat-label { font-size: .68rem; text-transform: uppercase; letter-spacing: .1em;
          color: var(--fg-dim); line-height: 1.3; }

        /* Tabs */
        .pp-tabs-wrap { border-bottom: 1px solid var(--border); overflow-x: auto;
          -webkit-overflow-scrolling: touch; max-width: 1200px; margin: 0 auto; }
        .pp-tabs { display: flex; gap: 0; min-width: max-content; }
        .pp-tab {
          padding: 12px 20px; font-size: .78rem; font-weight: 500; letter-spacing: .04em;
          text-transform: uppercase; color: var(--fg-dim); background: none; border: none;
          border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap;
          transition: color .15s, border-color .15s;
        }
        .pp-tab:hover { color: var(--fg-muted); }
        .pp-tab.active { color: var(--amber); border-bottom-color: var(--amber); }

        /* Content */
        .pp-content { max-width: 1200px; margin: 0 auto; padding: 44px 0 80px; }

        /* Section utilities */
        .pp-section-label {
          font-size: .68rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--green-light); margin-bottom: 12px;
        }
        .pp-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.3rem, 2.5vw, 1.9rem); font-weight: 700;
          line-height: 1.2; margin-bottom: 20px;
        }
        .pp-h2 em { font-style: italic; color: var(--amber); }
        .pp-lead { font-size: .95rem; color: var(--fg-muted); margin-bottom: 32px; line-height: 1.7; }

        /* Production spectrum */
        .pp-spectrum { background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 4px; padding: 24px; margin-bottom: 32px; }
        .pp-spectrum-track {
          height: 8px; border-radius: 4px; margin: 16px 0;
          background: linear-gradient(90deg, var(--green-dim) 0%, var(--green) 33%, var(--amber-dim) 66%, var(--amber) 100%);
        }
        .pp-spectrum-labels { display: flex; justify-content: space-between;
          font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; color: var(--fg-dim); }
        .pp-legend { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 20px; }
        .pp-legend-item { display: flex; align-items: center; gap: 7px; font-size: .78rem; color: var(--fg-muted); }
        .pp-legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        /* Tables */
        .pp-table-wrap { overflow-x: auto; margin: 24px 0; }
        .pp-table { width: 100%; border-collapse: collapse; font-size: .85rem; min-width: 640px; }
        .pp-table th { text-align: left; padding: 10px 14px; font-size: .64rem; text-transform: uppercase;
          letter-spacing: .12em; color: var(--fg-dim); border-bottom: 1px solid var(--border); font-weight: 500; }
        .pp-table td { padding: 13px 14px; border-bottom: 1px solid var(--border-soft);
          color: var(--fg-muted); vertical-align: top; line-height: 1.4; }
        .pp-table tr:last-child td { border-bottom: none; }
        .pp-table tr:hover td { background: var(--bg-raised); }
        .pp-cell-name { font-weight: 500; color: var(--fg); display: block; }
        .pp-cell-sub { font-size: .78rem; color: var(--fg-dim); margin-top: 2px; font-style: italic; }

        /* Badges */
        .pp-badge {
          display: inline-block; border-radius: 20px; padding: 2px 10px;
          font-size: .68rem; letter-spacing: .04em; font-weight: 500; white-space: nowrap;
        }
        .pp-badge.ancestral { background: var(--green-dim); border: 1px solid var(--green); color: var(--green-light); }
        .pp-badge.artisanal { background: var(--amber-dim); border: 1px solid var(--amber); color: var(--amber-light); }
        .pp-badge.industrial { background: var(--bg-raised); border: 1px solid var(--border); color: var(--fg-dim); }
        .pp-badge.silvestre { background: var(--green-dim); border: 1px solid var(--green); color: var(--green-light); }
        .pp-badge.cultivado { background: var(--amber-dim); border: 1px solid var(--amber); color: var(--amber-light); }

        /* Palenque cards */
        .pp-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .pp-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px;
          padding: 24px; position: relative; overflow: hidden;
        }
        .pp-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--green), var(--amber)); }
        .pp-card-code { font-family: var(--mono); font-size: .72rem; color: var(--amber);
          letter-spacing: .08em; margin-bottom: 10px; }
        .pp-card-name { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem;
          font-weight: 700; color: var(--fg); margin-bottom: 4px; line-height: 1.2; }
        .pp-card-brand { font-size: .78rem; color: var(--fg-muted); margin-bottom: 16px; }
        .pp-card-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
        .pp-meta-item { background: var(--bg-raised); border: 1px solid var(--border-soft);
          border-radius: 3px; padding: 10px 12px; }
        .pp-meta-label { font-size: .6rem; text-transform: uppercase; letter-spacing: .1em;
          color: var(--fg-dim); margin-bottom: 3px; }
        .pp-meta-val { font-size: .82rem; color: var(--fg-muted); line-height: 1.3; }
        .pp-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }

        /* Ecosystem cards */
        .pp-eco-stack { display: flex; flex-direction: column; gap: 16px; }
        .pp-eco-card { background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 4px; padding: 24px; border-left: 3px solid var(--green); }
        .pp-eco-name { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem;
          font-weight: 700; margin-bottom: 8px; color: var(--fg); }
        .pp-eco-name span { font-size: .72rem; font-family: 'Inter', system-ui, sans-serif;
          color: var(--fg-dim); font-weight: 400; margin-left: 10px; vertical-align: middle; }
        .pp-eco-desc { font-size: .9rem; color: var(--fg-muted); margin-bottom: 14px; line-height: 1.6; }
        .pp-eco-species { display: flex; flex-wrap: wrap; gap: 6px; }
        .pp-eco-sp { background: var(--green-dim); border: 1px solid var(--green); border-radius: 3px;
          padding: 3px 10px; font-size: .72rem; color: var(--green-light); font-style: italic; }

        /* Circuits */
        .pp-circuits { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .pp-circuit { background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; padding: 24px; }
        .pp-circuit-num { font-family: var(--mono); font-size: 2rem; font-weight: 700;
          color: var(--amber); opacity: .3; line-height: 1; margin-bottom: 12px; }
        .pp-circuit-name { font-size: 1rem; font-weight: 600; color: var(--fg); margin-bottom: 8px; }
        .pp-circuit-desc { font-size: .85rem; color: var(--fg-muted); margin-bottom: 16px; line-height: 1.55; }
        .pp-muni-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .pp-muni { background: var(--bg-raised); border: 1px solid var(--border-soft);
          border-radius: 3px; padding: 2px 8px; font-size: .7rem; color: var(--fg-dim); }

        /* Taxonomy dims */
        .pp-dims { display: flex; flex-direction: column; gap: 16px; }
        .pp-dim { display: flex; gap: 20px; align-items: flex-start;
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; padding: 20px; }
        .pp-dim-num { font-family: var(--mono); font-size: 1.8rem; font-weight: 700;
          color: var(--amber); opacity: .4; line-height: 1; flex-shrink: 0; min-width: 40px; }
        .pp-dim-title { font-size: .95rem; font-weight: 600; color: var(--fg); margin-bottom: 6px; }
        .pp-dim-desc { font-size: .85rem; color: var(--fg-muted); line-height: 1.6; }
        .pp-dim-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
        .pp-dim-tag { background: var(--bg-raised); border: 1px solid var(--border-soft);
          border-radius: 3px; padding: 2px 8px; font-size: .7rem; color: var(--fg-dim); font-style: italic; }

        /* Targets */
        .pp-targets { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .pp-target { background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; padding: 24px; }
        .pp-target-icon { font-size: 1.5rem; margin-bottom: 14px; }
        .pp-target-label { font-size: .62rem; text-transform: uppercase; letter-spacing: .12em;
          color: var(--amber); margin-bottom: 6px; }
        .pp-target-title { font-size: 1rem; font-weight: 600; color: var(--fg); margin-bottom: 8px; }
        .pp-target-desc { font-size: .84rem; color: var(--fg-muted); line-height: 1.6; }

        /* Species cards */
        .pp-species-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .pp-sp-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; padding: 20px; }
        .pp-sp-local { font-size: 1rem; font-weight: 600; color: var(--fg); margin-bottom: 2px; }
        .pp-sp-sci { font-size: .8rem; font-style: italic; color: var(--fg-dim); margin-bottom: 12px; }
        .pp-sp-row { display: flex; justify-content: space-between; align-items: center;
          padding: 7px 0; border-bottom: 1px solid var(--border-soft); font-size: .82rem; }
        .pp-sp-row:last-of-type { border-bottom: none; }
        .pp-sp-key { color: var(--fg-dim); font-size: .68rem; text-transform: uppercase; letter-spacing: .06em; }
        .pp-sp-val { color: var(--fg-muted); font-weight: 500; }
        .pp-risk { display: inline-block; padding: 2px 8px; border-radius: 20px;
          font-size: .68rem; font-weight: 500; letter-spacing: .04em; }
        .pp-risk.alto { background: rgba(180,40,40,.15); border: 1px solid rgba(180,40,40,.4); color: #e87070; }
        .pp-risk.moderado { background: var(--amber-dim); border: 1px solid var(--amber); color: var(--amber-light); }
        .pp-risk.estable { background: var(--green-dim); border: 1px solid var(--green); color: var(--green-light); }

        /* Footer */
        .pp-footer { background: var(--bg-raised); border-top: 1px solid var(--border); padding: 36px 0; margin-top: 60px; }
        .pp-footer-inner { max-width: 1200px; margin: 0 auto;
          padding: 0 max(16px, env(safe-area-inset-left,0px));
          display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; }
        .pp-footer-links { display: flex; flex-wrap: wrap; gap: 12px; }
        .pp-footer-link { font-size: .84rem; text-decoration: none; padding: 9px 18px;
          border-radius: 3px; font-weight: 500; }
        .pp-footer-link.primary { background: var(--green); color: #fff; }
        .pp-footer-link.secondary { border: 1px solid var(--border); color: var(--fg-muted); }
        .pp-editorial { font-size: .72rem; color: var(--fg-dim); font-style: italic; }

        @media (max-width: 680px) {
          .pp-card-meta { grid-template-columns: 1fr; }
          .pp-dim { flex-direction: column; gap: 8px; }
          .pp-stat { flex: 1 1 120px; padding: 14px 16px; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" />

      <div className="pp-wrap">
        {/* Nav */}
        <nav>
          <div className="pp-topbar">
            <a className="pp-brand" href="/">3demayo.com</a>
            <div className="pp-breadcrumb">
              <span>Inicio</span> › <span>Regiones</span> › <span>Puebla</span> ›
              <strong style={{ color: 'var(--fg-muted)' }}>Palenques Poblanos</strong>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="pp-header">
          <p className="pp-eyebrow">Índice de Campo — Puebla · Actualizado Noviembre 2026</p>
          <h1 className="pp-title">Índice de <em>Palenques Poblanos</em></h1>
          <p className="pp-subtitle">Directorio técnico de los productores de mezcal artesanal y ancestral del estado de Puebla — taxonomía de producción, perfiles de terroir y circuitos de campo.</p>

          <div className="pp-stats">
            <div className="pp-stat">
              <div className="pp-stat-num">9</div>
              <div className="pp-stat-label">Palenques Activos</div>
            </div>
            <div className="pp-stat">
              <div className="pp-stat-num">5</div>
              <div className="pp-stat-label">Ecosistemas DOM</div>
            </div>
            <div className="pp-stat">
              <div className="pp-stat-num">3 · 118</div>
              <div className="pp-stat-label">Circuitos · Municipios</div>
            </div>
            <div className="pp-stat">
              <div className="pp-stat-num">5</div>
              <div className="pp-stat-label">Dimensiones Taxonómicas</div>
            </div>
            <div className="pp-stat">
              <div className="pp-stat-num">4</div>
              <div className="pp-stat-label">Objetivos de Campo</div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="pp-tabs-wrap">
          <div className="pp-tabs">
            {([
              ['matrix',    'Matriz de Producción'],
              ['cards',     'Fichas de Palenques'],
              ['ecosystems','5 Ecosistemas DOM'],
              ['circuits',  'Circuitos · Municipios'],
              ['taxonomy',  'Dimensiones Taxonómicas'],
              ['targets',   'Objetivos de Campo'],
              ['species',   'Especies Silvestres'],
            ] as [TabId, string][]).map(([id, label]) => (
              <button
                key={id}
                className={`pp-tab${activeTab === id ? ' active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <main className="pp-content">

          {/* ── MATRIZ DE PRODUCCIÓN ── */}
          {activeTab === 'matrix' && (
            <div>
              <p className="pp-section-label">Taxonomía de Producción</p>
              <h2 className="pp-h2">Espectro de Producción: <em>Ancestral → Industrial</em></h2>
              <p className="pp-lead">Clasificación de los nueve palenques activos del estado de Puebla por método de producción, agave base y categoría NOM-070.</p>

              <div className="pp-spectrum">
                <p style={{ fontSize: '.78rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Espectro de Método de Producción</p>
                <div className="pp-spectrum-track" />
                <div className="pp-spectrum-labels">
                  <span>Ancestral</span><span>Artesanal</span><span>Industrial</span>
                </div>
                <div className="pp-legend">
                  <div className="pp-legend-item"><span className="pp-legend-dot" style={{ background: 'var(--green)' }} />NOM-070 Ancestral</div>
                  <div className="pp-legend-item"><span className="pp-legend-dot" style={{ background: 'var(--amber)' }} />NOM-070 Artesanal</div>
                  <div className="pp-legend-item"><span className="pp-legend-dot" style={{ background: 'var(--border)' }} />Industrial / Comercial</div>
                  <div className="pp-legend-item"><span className="pp-legend-dot" style={{ background: 'var(--green-light)' }} />Agave Silvestre</div>
                  <div className="pp-legend-item"><span className="pp-legend-dot" style={{ background: 'var(--amber-light)' }} />Agave Cultivado</div>
                </div>
              </div>

              <div className="pp-table-wrap">
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Palenque / Marca</th>
                      <th>Municipio</th>
                      <th>Categoría</th>
                      <th>Agave Base</th>
                      <th>Esp. Silvestres</th>
                      <th>Cocción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-01</span></td>
                      <td><span className="pp-cell-name">Palenque El Original</span><span className="pp-cell-sub">Maestro Jaime</span></td>
                      <td>Tehuacán / Zapotitlán</td>
                      <td><span className="pp-badge ancestral">Ancestral</span></td>
                      <td><span className="pp-badge silvestre">Silvestre</span></td>
                      <td style={{ color: 'var(--green-light)', fontSize: '.82rem' }}>Papalometl, Tepeztate, Pichomel, Salmiana</td>
                      <td style={{ fontSize: '.82rem' }}>Hornos cónicos piedra</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-02</span></td>
                      <td><span className="pp-cell-name">Santo Chin-ga Dazo</span><span className="pp-cell-sub">Jorge Armando Rojas González</span></td>
                      <td>San Vicente Ferrer, Tehuacán</td>
                      <td><span className="pp-badge artisanal">Artesanal</span></td>
                      <td><span className="pp-badge silvestre">Silvestre</span></td>
                      <td style={{ color: 'var(--green-light)', fontSize: '.82rem' }}>Pixhomel, Papalometl, Jabalí, Espadilla</td>
                      <td style={{ fontSize: '.82rem' }}>Horno cónico, mampostería</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-03</span></td>
                      <td><span className="pp-cell-name">Mezcal Mixteco</span><span className="pp-cell-sub">Familia Mendoza</span></td>
                      <td>Acatlán de Osorio</td>
                      <td><span className="pp-badge artisanal">Artesanal</span></td>
                      <td><span className="pp-badge silvestre">Silvestre</span></td>
                      <td style={{ color: 'var(--green-light)', fontSize: '.82rem' }}>Tobalá, Cuishe, Papalometl</td>
                      <td style={{ fontSize: '.82rem' }}>Horno en tierra</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-04</span></td>
                      <td><span className="pp-cell-name">Destilados Atlixco</span><span className="pp-cell-sub">Don Roberto Sánchez</span></td>
                      <td>Atlixco</td>
                      <td><span className="pp-badge artisanal">Artesanal</span></td>
                      <td><span className="pp-badge cultivado">Cultivado</span></td>
                      <td style={{ color: 'var(--fg-dim)', fontSize: '.82rem' }}>Espadín principal</td>
                      <td style={{ fontSize: '.82rem' }}>Horno en tierra</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-05</span></td>
                      <td><span className="pp-cell-name">Papalometl del Valle</span><span className="pp-cell-sub">Cooperativa Tehuacán</span></td>
                      <td>Tehuacán</td>
                      <td><span className="pp-badge ancestral">Ancestral</span></td>
                      <td><span className="pp-badge silvestre">Silvestre</span></td>
                      <td style={{ color: 'var(--green-light)', fontSize: '.82rem' }}>Papalometl exclusivo</td>
                      <td style={{ fontSize: '.82rem' }}>Ollas de barro</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-06</span></td>
                      <td><span className="pp-cell-name">Mezcal de los Tentzo</span><span className="pp-cell-sub">Familia García Reyes</span></td>
                      <td>San Jerónimo Tecuanipan</td>
                      <td><span className="pp-badge artisanal">Artesanal</span></td>
                      <td><span className="pp-badge silvestre">Silvestre</span></td>
                      <td style={{ color: 'var(--green-light)', fontSize: '.82rem' }}>Jabalí, A. potatorum</td>
                      <td style={{ fontSize: '.82rem' }}>Horno en tierra</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-07</span></td>
                      <td><span className="pp-cell-name">Altiplano Mezcalero</span><span className="pp-cell-sub">Don Aurelio Cruz</span></td>
                      <td>Tecali de Herrera</td>
                      <td><span className="pp-badge artisanal">Artesanal</span></td>
                      <td><span className="pp-badge cultivado">Cultivado</span></td>
                      <td style={{ color: 'var(--fg-dim)', fontSize: '.82rem' }}>A. salmiana regional</td>
                      <td style={{ fontSize: '.82rem' }}>Horno mampostería</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-08</span></td>
                      <td><span className="pp-cell-name">Biósfera Destilados</span><span className="pp-cell-sub">Colectivo Cuicatlán</span></td>
                      <td>Zapotitlán Salinas</td>
                      <td><span className="pp-badge ancestral">Ancestral</span></td>
                      <td><span className="pp-badge silvestre">Silvestre</span></td>
                      <td style={{ color: 'var(--green-light)', fontSize: '.82rem' }}>Tepeztate, Pichomel, Tobalá</td>
                      <td style={{ fontSize: '.82rem' }}>Hornos cónicos tradicionales</td>
                    </tr>
                    <tr>
                      <td><span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-dim)', fontSize: '.75rem' }}>P-09</span></td>
                      <td><span className="pp-cell-name">Mixteca Alta Mezcal</span><span className="pp-cell-sub">Familia Hernández Ruiz</span></td>
                      <td>Piaxtla</td>
                      <td><span className="pp-badge artisanal">Artesanal</span></td>
                      <td><span className="pp-badge silvestre">Silvestre</span></td>
                      <td style={{ color: 'var(--green-light)', fontSize: '.82rem' }}>Tobalá, Cuishe, Espadilla</td>
                      <td style={{ fontSize: '.82rem' }}>Horno en tierra</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── FICHAS DE PALENQUES ── */}
          {activeTab === 'cards' && (
            <div>
              <p className="pp-section-label">Perfiles de Productor</p>
              <h2 className="pp-h2">Fichas de <em>Palenques Activos</em></h2>
              <p className="pp-lead">Fichas de campo para los nueve palenques activos del índice. Datos recabados en visitas de noviembre 2026.</p>
              <div className="pp-cards-grid">
                {[
                  { code: 'P-01', name: 'Palenque El Original', brand: 'Maestro Jaime', muni: 'Tehuacán / Zapotitlán', cat: 'Ancestral', region: 'Tehuacán-Cuicatlán', species: ['Papalometl', 'Tepeztate', 'Pichomel', 'Salmiana'] },
                  { code: 'P-02', name: 'Santo Chin-ga Dazo', brand: 'Jorge Armando Rojas González', muni: 'San Vicente Ferrer', cat: 'Artesanal', region: 'Tehuacán', species: ['Pixhomel', 'Papalometl', 'Jabalí', 'Espadilla'] },
                  { code: 'P-03', name: 'Mezcal Mixteco', brand: 'Familia Mendoza', muni: 'Acatlán de Osorio', cat: 'Artesanal', region: 'Mixteca Alta', species: ['Tobalá', 'Cuishe', 'Papalometl'] },
                  { code: 'P-04', name: 'Destilados Atlixco', brand: 'Don Roberto Sánchez', muni: 'Atlixco', cat: 'Artesanal', region: 'Atlixco', species: ['Espadín'] },
                  { code: 'P-05', name: 'Papalometl del Valle', brand: 'Cooperativa Tehuacán', muni: 'Tehuacán', cat: 'Ancestral', region: 'Tehuacán', species: ['Papalometl'] },
                  { code: 'P-06', name: 'Mezcal de los Tentzo', brand: 'Familia García Reyes', muni: 'San Jerónimo Tecuanipan', cat: 'Artesanal', region: 'Tentzo', species: ['Jabalí', 'A. potatorum'] },
                  { code: 'P-07', name: 'Altiplano Mezcalero', brand: 'Don Aurelio Cruz', muni: 'Tecali de Herrera', cat: 'Artesanal', region: 'Altiplano Poblano', species: ['A. salmiana'] },
                ].map(p => (
                  <div className="pp-card" key={p.code}>
                    <div className="pp-card-code">{p.code}</div>
                    <div className="pp-card-name">{p.name}</div>
                    <div className="pp-card-brand">{p.brand}</div>
                    <div className="pp-card-meta">
                      <div className="pp-meta-item"><div className="pp-meta-label">Municipio</div><div className="pp-meta-val">{p.muni}</div></div>
                      <div className="pp-meta-item"><div className="pp-meta-label">Región</div><div className="pp-meta-val">{p.region}</div></div>
                      <div className="pp-meta-item"><div className="pp-meta-label">Categoría NOM</div><div className="pp-meta-val"><span className={`pp-badge ${p.cat.toLowerCase()}`}>{p.cat}</span></div></div>
                      <div className="pp-meta-item"><div className="pp-meta-label">Tipo Agave</div><div className="pp-meta-val"><span className="pp-badge silvestre">Silvestre</span></div></div>
                    </div>
                    <div className="pp-card-tags">
                      {p.species.map(s => <span key={s} className="pp-badge silvestre" style={{ fontStyle: 'italic' }}>{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ECOSISTEMAS DOM ── */}
          {activeTab === 'ecosystems' && (
            <div>
              <p className="pp-section-label">Diversidad de Origen Múltiple</p>
              <h2 className="pp-h2">Los 5 <em>Ecosistemas DOM</em> de Puebla</h2>
              <p className="pp-lead">Puebla concentra cinco ecosistemas distintos de producción mezcalera, cada uno con características botánicas, climáticas y culturales propias que definen los perfiles de terroir del estado.</p>
              <div className="pp-eco-stack">
                {[
                  { name: 'Mixteca Poblana', zone: 'Zona semiárida, 1400–2200 msnm', desc: 'El corredor mezcalero más antiguo del estado. Suelos calizos y arcillosos con precipitación estacional concentrada entre junio y septiembre. Alta biodiversidad de agave silvestre con especies endémicas de la cuenca del Balsas.', species: ['Tobalá (A. potatorum)', 'Cuishe (A. karwinskii)', 'Papalometl (A. potatorum)', 'Espadilla local'] },
                  { name: 'Biósfera Tehuacán-Cuicatlán', zone: 'Desierto xerófito, 1000–2400 msnm', desc: 'Patrimonio Mundial UNESCO. Mayor concentración de cactáceas columnares del mundo. Clima hipeárido con temperaturas extremas. Refugio primario de Tepeztate y Pichomel; hábitat crítico del murciélago nectarívoro Leptonycteris curasoae.', species: ['Tepeztate (A. marmorata)', 'Pichomel / Pixhomel', 'Papalometl (A. potatorum)', 'A. salmiana'] },
                  { name: 'Valle de Atlixco', zone: 'Valle templado, 1700–2000 msnm', desc: 'Microclima moderado con influencia del Popocatépetl. Suelos volcánicos fértiles que producen mezcales con notas herbáceas y florales. Producción artesanal emergente centrada principalmente en Espadín con experimentación de silvestres.', species: ['Espadín (A. angustifolia)', 'A. potatorum experimental'] },
                  { name: 'Sierra de Tentzo', zone: 'Sierra seca, 1800–2600 msnm', desc: 'Cordillera caliza con bosque tropical caducifolio. Hábitat natural del Jabalí (Agave convallis), especie de fermentación notoriamente volátil y compleja. Acceso difícil que ha preservado ecosistemas con baja perturbación humana.', species: ['Jabalí (A. convallis)', 'A. potatorum silvestre', 'A. salmiana variantes'] },
                  { name: 'Altiplano Poblano', zone: 'Llanura semiárida, 2100–2800 msnm', desc: 'Zona de transición entre la altiplanicie mexicana y las sierras del sur de Puebla. Dominio del Agave salmiana en sus variantes regionales. Producción artesanal con técnicas híbridas ancestrales-artesanales.', species: ['A. salmiana (pulquero doble uso)', 'Maguey verde / manso local'] },
                ].map(e => (
                  <div className="pp-eco-card" key={e.name}>
                    <div className="pp-eco-name">{e.name}<span>{e.zone}</span></div>
                    <div className="pp-eco-desc">{e.desc}</div>
                    <div className="pp-eco-species">
                      {e.species.map(s => <span key={s} className="pp-eco-sp">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CIRCUITOS ── */}
          {activeTab === 'circuits' && (
            <div>
              <p className="pp-section-label">Rutas de Campo</p>
              <h2 className="pp-h2">3 Circuitos · <em>118 Municipios</em></h2>
              <p className="pp-lead">Los palenques activos se agrupan en tres circuitos de visita organizados por geografía y accesibilidad. Los circuitos cubren 118 municipios del estado con producción mezcalera registrada.</p>
              <div className="pp-circuits">
                {[
                  { num: '01', name: 'Circuito Tehuacán-Cuicatlán', desc: 'El circuito núcleo del mezcal poblano. Concentra los cuatro palenques de producción ancestral y artesanal de mayor tradición en la región, todos en la cuenca de influencia de la Reserva de la Biósfera.', munis: ['Tehuacán', 'Zapotitlán Salinas', 'San Vicente Ferrer', 'San Antonio Texcala', 'Cañada Morelos', 'San Gabriel Chilac'] },
                  { num: '02', name: 'Circuito Mixteca Alta', desc: 'El corredor mezcalero del occidente poblano, donde la tradición mixteca y la biodiversidad silvestre de la cuenca del Balsas producen mezcales de alta complejidad botánica.', munis: ['Acatlán de Osorio', 'Piaxtla', 'Chila', 'Tecomatlán', 'Chinantla', 'Tulcingo'] },
                  { num: '03', name: 'Circuito Central-Atlixco', desc: 'El corredor emergente del valle central de Puebla. Producción más joven, con experimentación de variedades silvestres sobre una base de Espadín y técnicas artesanales modernizadas.', munis: ['Atlixco', 'San Jerónimo Tecuanipan', 'Tecali de Herrera', 'Tepeaca', 'Tecamachalco', 'Tlapa de Comonfort'] },
                ].map(c => (
                  <div className="pp-circuit" key={c.num}>
                    <div className="pp-circuit-num">{c.num}</div>
                    <div className="pp-circuit-name">{c.name}</div>
                    <div className="pp-circuit-desc">{c.desc}</div>
                    <div className="pp-muni-tags">
                      {c.munis.map(m => <span key={m} className="pp-muni">{m}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DIMENSIONES TAXONÓMICAS ── */}
          {activeTab === 'taxonomy' && (
            <div>
              <p className="pp-section-label">Marco Clasificatorio</p>
              <h2 className="pp-h2">5 Dimensiones <em>Taxonómicas</em></h2>
              <p className="pp-lead">El índice clasifica cada palenque a través de cinco dimensiones que capturan la complejidad técnica, ecológica y cultural de la producción mezcalera poblana.</p>
              <div className="pp-dims">
                {[
                  { n: '1', title: 'Categoría NOM-070', desc: 'Clasificación legal del método de producción según la Norma Oficial Mexicana. Determina los instrumentos y procesos permitidos en cada nivel.', tags: ['Ancestral', 'Artesanal', 'Industrial'] },
                  { n: '2', title: 'Origen del Agave', desc: 'Tipología del material vegetal utilizado: silvestre recolectado del hábitat natural, o cultivado en parcelas controladas.', tags: ['Silvestre recolectado', 'Cultivado en parcela', 'Semicultivado'] },
                  { n: '3', title: 'Especie y Tiempo de Maduración', desc: 'Identificación botánica de la especie de agave y ciclo de maduración requerido antes de la cosecha.', tags: ['Espadín 7-8 años', 'Papalometl 10-15 años', 'Pixhomel 12-18 años', 'Jabalí 12-15 años', 'Tepeztate 15-25+ años'] },
                  { n: '4', title: 'Ecosistema DOM', desc: 'Diversidad de Origen Múltiple: clasificación del ecosistema específico donde se produce la materia prima, determinante del terroir.', tags: ['Biósfera Tehuacán', 'Mixteca Poblana', 'Valle Atlixco', 'Sierra Tentzo', 'Altiplano Poblano'] },
                  { n: '5', title: 'Perfil de Riesgo Ecológico', desc: 'Evaluación del estado de conservación de las especies trabajadas y el impacto de la producción sobre las poblaciones silvestres.', tags: ['Alto riesgo', 'Riesgo moderado', 'Estable', 'En recuperación'] },
                ].map(d => (
                  <div className="pp-dim" key={d.n}>
                    <div className="pp-dim-num">{d.n}</div>
                    <div>
                      <div className="pp-dim-title">{d.title}</div>
                      <div className="pp-dim-desc">{d.desc}</div>
                      <div className="pp-dim-tags">
                        {d.tags.map(t => <span key={t} className="pp-dim-tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── OBJETIVOS DE CAMPO ── */}
          {activeTab === 'targets' && (
            <div>
              <p className="pp-section-label">Prioridades Editoriales</p>
              <h2 className="pp-h2">4 Objetivos de <em>Campo</em></h2>
              <p className="pp-lead">Los cuatro focos de cobertura que guían el trabajo de campo del índice para el ciclo noviembre 2026 — marzo 2027.</p>
              <div className="pp-targets">
                {[
                  { icon: '🦇', label: 'Ecología', title: 'Protección del Murciélago Nectarívoro', desc: 'Documentar las prácticas de producción que permiten la floración completa del quiote antes de la cosecha, garantizando la polinización de Leptonycteris curasoae en los corredores de la Biósfera.' },
                  { icon: '🌱', label: 'Conservación', title: 'Banco de Semillas Silvestres', desc: 'Mapear los esfuerzos activos de propagación por semilla de Tepeztate, Pixhomel y Papalometl entre los productores de Tehuacán, como estrategia de resiliencia frente al monocultivo.' },
                  { icon: '🏡', label: 'Social', title: 'Empleo Juvenil Ejidal', desc: 'Visibilizar el modelo cooperativo de San Vicente Ferrer como alternativa económica sostenible a la migración para la juventud de los ejidos del sur de Puebla.' },
                  { icon: '📋', label: 'Certificación', title: 'Acceso a NOM-070 Ancestral', desc: 'Registrar las barreras administrativas y económicas que impiden a pequeños productores artesanales obtener la certificación Ancestral, y documentar los casos de éxito recientes en Tehuacán.' },
                ].map(t => (
                  <div className="pp-target" key={t.title}>
                    <div className="pp-target-icon">{t.icon}</div>
                    <div className="pp-target-label">{t.label}</div>
                    <div className="pp-target-title">{t.title}</div>
                    <div className="pp-target-desc">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ESPECIES SILVESTRES ── */}
          {activeTab === 'species' && (
            <div>
              <p className="pp-section-label">Referencia Botánica</p>
              <h2 className="pp-h2">Especies Silvestres <em>de Puebla</em></h2>
              <p className="pp-lead">Referencia de campo para las ocho especies silvestres documentadas en el estado de Puebla, con ciclos de maduración, perfil aromático y estado de conservación.</p>
              <div className="pp-species-grid">
                {[
                  { local: 'Papalometl', sci: 'Agave potatorum', years: '10–15 años', profile: 'Floral, afrutado, mineral', risk: 'moderado', eco: 'Tehuacán, Mixteca' },
                  { local: 'Tepeztate', sci: 'Agave marmorata', years: '15–25+ años', profile: 'Herbal, vegetal, pimiento', risk: 'alto', eco: 'Biósfera Tehuacán' },
                  { local: 'Pixhomel / Pichomel', sci: 'Variante endémica', years: '12–18 años', profile: 'Intenso, terroir específico', risk: 'alto', eco: 'Tehuacán exclusivo' },
                  { local: 'Jabalí', sci: 'Agave convallis', years: '12–15 años', profile: 'Complejo, fermentación vol.', risk: 'moderado', eco: 'Sierra Tentzo' },
                  { local: 'Tobalá', sci: 'Agave potatorum var.', years: '12–15 años', profile: 'Frutas tropicales, dulce', risk: 'moderado', eco: 'Mixteca Poblana' },
                  { local: 'Cuishe', sci: 'Agave karwinskii', years: '10–14 años', profile: 'Seco, cítrico, mineral', risk: 'estable', eco: 'Mixteca Poblana' },
                  { local: 'Espadilla', sci: 'Agave angustifolia var.', years: '8–10 años', profile: 'Ahumado, terroso, directo', risk: 'estable', eco: 'Tehuacán, Atlixco' },
                  { local: 'A. salmiana', sci: 'Agave salmiana', years: '10–12 años', profile: 'Herbáceo, neutro, versátil', risk: 'estable', eco: 'Altiplano Poblano' },
                ].map(s => (
                  <div className="pp-sp-card" key={s.local}>
                    <div className="pp-sp-local">{s.local}</div>
                    <div className="pp-sp-sci">{s.sci}</div>
                    <div className="pp-sp-row"><span className="pp-sp-key">Maduración</span><span className="pp-sp-val">{s.years}</span></div>
                    <div className="pp-sp-row"><span className="pp-sp-key">Perfil</span><span className="pp-sp-val">{s.profile}</span></div>
                    <div className="pp-sp-row"><span className="pp-sp-key">Ecosistema</span><span className="pp-sp-val">{s.eco}</span></div>
                    <div className="pp-sp-row"><span className="pp-sp-key">Riesgo</span><span className="pp-sp-val"><span className={`pp-risk ${s.risk}`}>{s.risk.charAt(0).toUpperCase() + s.risk.slice(1)}</span></span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="pp-footer">
          <div className="pp-footer-inner">
            <div className="pp-footer-links">
              <a href="/guardianes" className="pp-footer-link primary">Leer: Los Guardianes del Maguey →</a>
              <a href="/silvestre" className="pp-footer-link secondary">← Índice Silvestre</a>
            </div>
            <p className="pp-editorial">Índice actualizado Noviembre 2026 · 3demayo.com · Cobertura de campo exclusiva</p>
          </div>
        </footer>
      </div>
    </>
  )
}
