import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'El Índice Silvestre — Cartografía del Maguey Silvestre | 3demayo',
  description: 'Directorio editorial de las regiones productoras de mezcal de agave silvestre en México. Puebla, Oaxaca, Guerrero y más.',
}

export default function SilvestrePage() {
  return (
    <>
      <style>{`
        :root {
          --bg: #0a0a08;
          --bg-raised: #121210;
          --bg-card: #1a1916;
          --border: #2a2720;
          --border-soft: #1e1c18;
          --fg: #e8e2d6;
          --fg-muted: #9a9080;
          --fg-dim: #5a5448;
          --green: #4a7c59;
          --green-light: #6aad7e;
          --green-dim: #2a4a35;
          --amber: #c8832a;
          --amber-light: #e8a85a;
          --amber-dim: #5a3a14;
          --display: 'Playfair Display', Georgia, serif;
          --body: 'Inter', system-ui, sans-serif;
        }
        .silvestre-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .silvestre-wrap {
          background: var(--bg);
          color: var(--fg);
          font-family: var(--body);
          min-height: 100vh;
          padding: 80px max(16px, env(safe-area-inset-left, 0px)) 0;
        }

        /* Nav */
        .s-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0; border-bottom: 1px solid var(--border-soft);
          max-width: 1100px; margin: 0 auto;
        }
        .s-brand { font-family: var(--display); font-size: 1.1rem; font-weight: 900;
          color: var(--amber); letter-spacing: .05em; text-decoration: none; }
        .s-breadcrumb { font-size: .72rem; color: var(--fg-muted); letter-spacing: .04em;
          text-transform: uppercase; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
        .s-breadcrumb span { color: var(--fg-dim); }

        /* Hero */
        .s-hero {
          max-width: 1100px; margin: 0 auto; padding: 72px 0 0;
          display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center;
        }
        .s-hero-eyebrow {
          font-size: .68rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--green-light); margin-bottom: 20px;
        }
        .s-hero-headline {
          font-family: var(--display); font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 900; line-height: 1.08; color: var(--fg); margin-bottom: 24px;
        }
        .s-hero-headline em { font-style: italic; color: var(--amber); }
        .s-hero-sub { font-size: 1.05rem; color: var(--fg-muted); line-height: 1.65; max-width: 500px; }
        .s-hero-stats {
          display: flex; gap: 32px; margin-top: 36px; padding-top: 28px;
          border-top: 1px solid var(--border-soft); flex-wrap: wrap;
        }
        .s-stat-num {
          font-family: var(--display); font-size: 2rem; font-weight: 900; color: var(--amber);
          line-height: 1;
        }
        .s-stat-label { font-size: .68rem; letter-spacing: .1em; text-transform: uppercase;
          color: var(--fg-dim); margin-top: 4px; }

        /* Filter chips */
        .s-filters {
          max-width: 1100px; margin: 0 auto; padding: 40px 0 0;
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .s-chip {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 20px; padding: 7px 16px; font-size: .78rem;
          color: var(--fg-muted); letter-spacing: .05em; cursor: default;
          transition: border-color .15s;
        }
        .s-chip:hover { border-color: var(--amber); color: var(--amber-light); }
        .s-chip.active { border-color: var(--green); color: var(--green-light); background: var(--green-dim); }

        /* Section */
        .s-section { max-width: 1100px; margin: 0 auto; padding: 60px 0 0; }
        .s-section-eyebrow {
          font-size: .68rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--green-light); display: flex; align-items: center; gap: 10px; margin-bottom: 24px;
        }
        .s-section-eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 80px; }
        .s-section-title {
          font-family: var(--display); font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700;
          line-height: 1.2; color: var(--fg); margin-bottom: 12px;
        }
        .s-section-title em { color: var(--amber); font-style: italic; }
        .s-section-lead { font-size: 1rem; color: var(--fg-muted); line-height: 1.7; max-width: 60ch; margin-bottom: 36px; }

        /* Region cards */
        .s-regions { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .s-region-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; padding: 24px;
          position: relative; overflow: hidden;
        }
        .s-region-card.featured { border-color: var(--amber); }
        .s-region-card.featured::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--amber), var(--green));
        }
        .s-region-name {
          font-family: var(--display); font-size: 1.15rem; font-weight: 700; color: var(--fg); margin-bottom: 6px;
        }
        .s-region-sub { font-size: .78rem; color: var(--amber); letter-spacing: .05em; margin-bottom: 14px; }
        .s-region-species { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .s-species-tag {
          background: var(--green-dim); border: 1px solid var(--green); border-radius: 3px;
          padding: 3px 9px; font-size: .7rem; color: var(--green-light); font-style: italic;
        }
        .s-region-p { font-size: .85rem; color: var(--fg-muted); line-height: 1.6; }
        .s-region-badge {
          display: inline-flex; align-items: center; gap: 5px; margin-top: 12px;
          background: var(--amber-dim); border: 1px solid var(--amber); border-radius: 20px;
          padding: 3px 10px; font-size: .68rem; color: var(--amber-light); text-transform: uppercase;
        }

        /* Taxonomy table */
        .s-table-wrap { overflow-x: auto; margin: 0 0 20px; }
        .s-table { width: 100%; border-collapse: collapse; font-size: .86rem; min-width: 560px; }
        .s-table th {
          text-align: left; padding: 10px 14px; font-size: .64rem; text-transform: uppercase;
          letter-spacing: .12em; color: var(--fg-dim); border-bottom: 1px solid var(--border); font-weight: 500;
        }
        .s-table td { padding: 14px; border-bottom: 1px solid var(--border-soft); color: var(--fg-muted); vertical-align: top; }
        .s-table tr:last-child td { border-bottom: none; }
        .s-table tr:hover td { background: var(--bg-raised); }
        .s-local-name { font-weight: 500; color: var(--fg); }
        .s-sci-name { font-style: italic; font-size: .8rem; color: var(--fg-dim); display: block; margin-top: 2px; }
        .s-risk { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: .72rem; white-space: nowrap; }
        .s-risk.alto { background: rgba(180,50,50,.18); border: 1px solid #c04040; color: #e08080; }
        .s-risk.moderado { background: var(--amber-dim); border: 1px solid var(--amber); color: var(--amber-light); }
        .s-risk.estable { background: var(--green-dim); border: 1px solid var(--green); color: var(--green-light); }

        /* Manifesto */
        .s-manifesto { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .s-manifesto-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; padding: 28px;
        }
        .s-manifesto-num { font-family: var(--display); font-size: 2.4rem; font-weight: 900; color: var(--amber); opacity: .3; line-height: 1; margin-bottom: 12px; }
        .s-manifesto-title { font-family: var(--display); font-size: 1.1rem; font-weight: 700; color: var(--fg); margin-bottom: 12px; }
        .s-manifesto-p { font-size: .88rem; color: var(--fg-muted); line-height: 1.65; }

        /* Event band */
        .s-event-band {
          background: linear-gradient(135deg, var(--amber-dim), var(--green-dim));
          border-top: 1px solid var(--amber); border-bottom: 1px solid var(--amber);
          padding: 32px 0; margin: 60px 0 0;
        }
        .s-event-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .s-event-label { font-size: .68rem; letter-spacing: .18em; text-transform: uppercase; color: var(--amber-light); margin-bottom: 8px; }
        .s-event-title { font-family: var(--display); font-size: 1.5rem; font-weight: 900; color: var(--fg); }
        .s-event-meta { font-size: .85rem; color: var(--fg-muted); margin-top: 4px; }
        .s-event-cta {
          margin-left: auto; background: var(--amber); color: #0a0a08; padding: 12px 24px;
          border-radius: 3px; font-size: .88rem; font-weight: 600; text-decoration: none;
        }

        /* Producer cards */
        .s-producers { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .s-producer-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; padding: 28px;
          position: relative;
        }
        .s-producer-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--green), var(--amber));
        }
        .s-producer-name { font-family: var(--display); font-size: 1.2rem; font-weight: 700; color: var(--fg); margin-bottom: 4px; }
        .s-producer-brand { font-size: .78rem; text-transform: uppercase; letter-spacing: .1em; color: var(--amber); margin-bottom: 14px; }
        .s-producer-p { font-size: .88rem; color: var(--fg-muted); line-height: 1.65; }

        /* Footer */
        .s-footer { max-width: 1100px; margin: 60px auto 0; padding: 32px 0; border-top: 1px solid var(--border-soft); }
        .s-footer-links { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
        .s-footer-link {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
          border-radius: 3px; font-size: .84rem; font-weight: 500; text-decoration: none;
        }
        .s-footer-link.primary { background: var(--green); color: #fff; }
        .s-footer-link.secondary { border: 1px solid var(--border); color: var(--fg-muted); }
        .s-editorial { font-size: .72rem; color: var(--fg-dim); font-style: italic; }

        @media (max-width: 700px) {
          .s-hero { grid-template-columns: 1fr; padding: 40px 0 0; gap: 32px; }
          .s-hero-visual { display: none; }
          .s-section { padding: 40px 0 0; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap" />

      <div className="silvestre-wrap">
        {/* Hero */}
        <header>
          <div className="s-hero">
            <div>
              <p className="s-hero-eyebrow">Directorio Editorial · 7 Regiones · Cobertura en Desarrollo</p>
              <h1 className="s-hero-headline">
                Cartografía del<br /><em>Maguey Silvestre</em>
              </h1>
              <p className="s-hero-sub">
                El índice de referencia para las regiones productoras de mezcal silvestre en México. Desde los cañones de Tehuacán hasta las sierras de Durango — las especies, los maestros y los ecosistemas en riesgo.
              </p>
              <div className="s-hero-stats">
                <div>
                  <div className="s-stat-num">7+</div>
                  <div className="s-stat-label">Estados DOM</div>
                </div>
                <div>
                  <div className="s-stat-num">30+</div>
                  <div className="s-stat-label">Especies silvestres</div>
                </div>
                <div>
                  <div className="s-stat-num">45</div>
                  <div className="s-stat-label">Años máx. maduración</div>
                </div>
              </div>
            </div>
            <div className="s-hero-visual" aria-hidden="true">
              <svg viewBox="0 0 320 380" width="320" height="380" xmlns="http://www.w3.org/2000/svg">
                <circle cx="160" cy="240" r="18" fill="#1c2a1f" stroke="#3a5e45" strokeWidth="1.5" />
                <path d="M160,240 Q100,205 40,235 Q60,215 80,210 Q120,225 160,240Z" fill="#2d5a3e" stroke="#4a7c59" strokeWidth="1.2" opacity=".9" />
                <path d="M160,240 Q220,205 280,235 Q260,215 240,210 Q200,225 160,240Z" fill="#2d5a3e" stroke="#4a7c59" strokeWidth="1.2" opacity=".9" />
                <path d="M160,240 Q135,165 115,105 Q132,125 140,145 Q150,195 160,240Z" fill="#345f42" stroke="#4a7c59" strokeWidth="1.2" />
                <path d="M160,240 Q185,165 205,105 Q188,125 180,145 Q170,195 160,240Z" fill="#345f42" stroke="#4a7c59" strokeWidth="1.2" />
                <line x1="160" y1="225" x2="160" y2="30" stroke="#4a7c59" strokeWidth="2.5" />
                <circle cx="160" cy="30" r="4" fill="#c8832a" />
                <circle cx="135" cy="90" r="3.5" fill="#c8832a" opacity=".9" />
                <circle cx="185" cy="65" r="3.5" fill="#c8832a" opacity=".9" />
                <text x="40" y="234" fontSize="8" fill="#6aad7e" fontFamily="Georgia, serif" fontStyle="italic">Agave marmorata</text>
                <text x="40" y="244" fontSize="7" fill="#4a7c59" fontFamily="sans-serif">(Tepeztate)</text>
              </svg>
            </div>
          </div>
        </header>

        {/* Filter chips */}
        <div className="s-filters">
          <span className="s-chip active">Todas las regiones</span>
          <span className="s-chip">Por estado</span>
          <span className="s-chip">Por especie</span>
          <span className="s-chip">Por proceso</span>
          <span className="s-chip">Solo UNESCO Biósfera</span>
        </div>

        {/* Regional directory */}
        <section className="s-section">
          <p className="s-section-eyebrow">Directorio Regional</p>
          <h2 className="s-section-title">Regiones Productoras de <em>Agave Silvestre</em></h2>
          <p className="s-section-lead">Las siete regiones principales donde el mezcal de agave silvestre conserva una presencia significativa — cada una con sus propias especies endémicas, métodos ancestrales y presiones ecológicas.</p>

          <div className="s-regions">
            <div className="s-region-card featured">
              <div className="s-region-name">Tehuacán-Cuicatlán, Puebla</div>
              <div className="s-region-sub">Biósfera UNESCO C2 · Cobertura prioritaria</div>
              <div className="s-region-species">
                <span className="s-species-tag">A. marmorata</span>
                <span className="s-species-tag">A. potatorum</span>
                <span className="s-species-tag">Pixhomel</span>
                <span className="s-species-tag">A. convallis</span>
              </div>
              <p className="s-region-p">La región de mayor concentración de guardianes del agave silvestre en Puebla. El ejido de San Vicente Ferrer opera múltiples marcas desde infraestructura compartida. FescalTH ancla el calendario editorial.</p>
              <div className="s-region-badge">● Cobertura activa — Noviembre 2026</div>
            </div>

            <div className="s-region-card">
              <div className="s-region-name">Valles Centrales, Oaxaca</div>
              <div className="s-region-sub">Alta densidad de especies silvestres · Tobalá, Madrecuishe, Jabalí</div>
              <div className="s-region-species">
                <span className="s-species-tag">A. potatorum</span>
                <span className="s-species-tag">A. karwinskii</span>
                <span className="s-species-tag">A. convallis</span>
              </div>
              <p className="s-region-p">La región de mayor producción de mezcal silvestre por volumen. Presión creciente de monocultivos de Espadín sobre territorios de especies de maduración larga. Cobertura en planificación.</p>
            </div>

            <div className="s-region-card">
              <div className="s-region-name">Montaña de Guerrero</div>
              <div className="s-region-sub">A. cupreata (Papalometl guerrerense) · Producción ancestral</div>
              <div className="s-region-species">
                <span className="s-species-tag">A. cupreata</span>
                <span className="s-species-tag">A. angustifolia vars.</span>
              </div>
              <p className="s-region-p">El Papalometl de Guerrero es genéticamente distinto al oaxaqueño. Métodos de destilación en olla de barro profundamente arraigados. Comunidades nahua y mixteca co-gestionan los territorios de cosecha.</p>
            </div>

            <div className="s-region-card">
              <div className="s-region-name">Sierra de Michoacán</div>
              <div className="s-region-sub">A. cupreata · Producción artesanal de baja escala</div>
              <div className="s-region-species">
                <span className="s-species-tag">A. cupreata</span>
                <span className="s-species-tag">A. inaequidens</span>
              </div>
              <p className="s-region-p">Zona de producción artesanal dispersa con alta variabilidad de terroir entre municipios. Los suelos volcánicos de la trans-mexicana confieren mineraidad característica. Poco documentada editorialmente.</p>
            </div>

            <div className="s-region-card">
              <div className="s-region-name">Cañones de Durango</div>
              <div className="s-region-sub">A. durangensis · Raicilla del Norte · Alta altitud</div>
              <div className="s-region-species">
                <span className="s-species-tag">A. durangensis</span>
                <span className="s-species-tag">A. rhodacantha</span>
              </div>
              <p className="s-region-p">Espacio de producción a más de 2000 msnm con ciclos de maduración excepcionalmente largos. La A. durangensis endémica produce destilados de perfil herbal intenso. Acceso difícil por geografía.</p>
            </div>

            <div className="s-region-card">
              <div className="s-region-name">SLP / Zacatecas</div>
              <div className="s-region-sub">A. salmiana · A. americana · Mezcal de altura y semi-árido</div>
              <div className="s-region-species">
                <span className="s-species-tag">A. salmiana</span>
                <span className="s-species-tag">A. americana</span>
                <span className="s-species-tag">A. mapisaga</span>
              </div>
              <p className="s-region-p">Zona de transición entre producción de pulque ancestral y mezcal artesanal. La A. salmiana — planta masiva del altiplano — produce mezcales de perfil vegetal profundo cuando se destila.</p>
            </div>

            <div className="s-region-card">
              <div className="s-region-name">Guanajuato / Edo. de México</div>
              <div className="s-region-sub">A. inaequidens · A. hookeri · Frontera DOM</div>
              <div className="s-region-species">
                <span className="s-species-tag">A. inaequidens</span>
                <span className="s-species-tag">A. hookeri</span>
              </div>
              <p className="s-region-p">Zona de expansión de la DOM con productores emergentes. Microclimas de bosque templado producen perfiles florales atípicos para el mezcal. Menor presión comercial que Oaxaca o Puebla.</p>
            </div>
          </div>
        </section>

        {/* Taxonomy */}
        <section className="s-section">
          <p className="s-section-eyebrow">Taxonomía de Campo</p>
          <h2 className="s-section-title">Matriz de <em>Especies Silvestres</em></h2>
          <p className="s-section-lead">Seis especies de alta prioridad documental — las más amenazadas por presión comercial, contaminación genética y pérdida de hábitat.</p>

          <div className="s-table-wrap">
            <table className="s-table">
              <thead>
                <tr>
                  <th>Nombre local / Científico</th>
                  <th>Maduración</th>
                  <th>Distribución</th>
                  <th>Riesgo ecológico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="s-local-name">Tepeztate / Pichomel</span><span className="s-sci-name">Agave marmorata</span></td>
                  <td>15–25+ años</td>
                  <td>Tehuacán-Cuicatlán, Puebla</td>
                  <td><span className="s-risk alto">Alto Riesgo</span></td>
                </tr>
                <tr>
                  <td><span className="s-local-name">Jabalí</span><span className="s-sci-name">Agave convallis</span></td>
                  <td>12–15 años</td>
                  <td>Puebla, Oaxaca, Guerrero</td>
                  <td><span className="s-risk alto">Alto Riesgo</span></td>
                </tr>
                <tr>
                  <td><span className="s-local-name">Tobalá / Papalometl</span><span className="s-sci-name">Agave potatorum</span></td>
                  <td>10–15 años</td>
                  <td>Oaxaca, Puebla, Guerrero</td>
                  <td><span className="s-risk moderado">Moderado</span></td>
                </tr>
                <tr>
                  <td><span className="s-local-name">Papalometl Guerrerense</span><span className="s-sci-name">Agave cupreata</span></td>
                  <td>12–18 años</td>
                  <td>Guerrero, Michoacán</td>
                  <td><span className="s-risk moderado">Moderado</span></td>
                </tr>
                <tr>
                  <td><span className="s-local-name">Maguey Alto / Bruto</span><span className="s-sci-name">Agave inaequidens</span></td>
                  <td>10–14 años</td>
                  <td>Michoacán, EdoMex, Jalisco</td>
                  <td><span className="s-risk estable">Estable</span></td>
                </tr>
                <tr>
                  <td><span className="s-local-name">Durangensis</span><span className="s-sci-name">Agave durangensis</span></td>
                  <td>18–30 años</td>
                  <td>Durango, Chihuahua</td>
                  <td><span className="s-risk moderado">Moderado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Manifesto */}
        <section className="s-section">
          <p className="s-section-eyebrow">Manifiesto Editorial</p>
          <h2 className="s-section-title">Por qué <em>Importa</em> el Silvestre</h2>

          <div className="s-manifesto">
            <div className="s-manifesto-card">
              <div className="s-manifesto-num">01</div>
              <h3 className="s-manifesto-title">El problema del monocultivo</h3>
              <p className="s-manifesto-p">El Espadín representa más del 80% de la producción mezcalera. Su expansión en monocultivo desplaza a especies silvestres de maduración larga y homogeniza genéticamente el paisaje agavero a través de polinización cruzada.</p>
            </div>
            <div className="s-manifesto-card">
              <div className="s-manifesto-num">02</div>
              <h3 className="s-manifesto-title">La ciencia del murciélago polinizador</h3>
              <p className="s-manifesto-p">Los murciélagos nectarívoros (<em>Leptonycteris spp.</em>) son los polinizadores primarios del agave silvestre. Sin quiotes florecidos — sin que las plantas lleguen a madurez reproductiva — el ciclo de semilla colapsa y la siguiente generación no existe.</p>
            </div>
            <div className="s-manifesto-card">
              <div className="s-manifesto-num">03</div>
              <h3 className="s-manifesto-title">La solución del ejido</h3>
              <p className="s-manifesto-p">La gobernanza comunal ejidal impone equilibrio ecológico a largo plazo a través de rendición de cuentas colectiva. Ninguna familia puede agotar las reservas silvestres compartidas sin afectar la producción futura de todas. Es sostenibilidad desde adentro, no regulación externa.</p>
            </div>
          </div>
        </section>

        {/* FescalTH Event */}
        <div className="s-event-band">
          <div className="s-event-inner">
            <div>
              <div className="s-event-label">Evento ancla · Tehuacán, Puebla</div>
              <div className="s-event-title">FescalTH — Festival del Mezcal de Tehuacán</div>
              <div className="s-event-meta">Organizado por Jorge Armando Rojas González · Santo Chin-ga Dazo · San Vicente Ferrer</div>
            </div>
            <a href="/guardianes" className="s-event-cta">Ver guardianes →</a>
          </div>
        </div>

        {/* Producers */}
        <section className="s-section">
          <p className="s-section-eyebrow">Perfil de Campo — Tehuacán</p>
          <h2 className="s-section-title">Productores en <em>Cobertura Activa</em></h2>

          <div className="s-producers">
            <div className="s-producer-card">
              <div className="s-producer-name">Maestro Jaime</div>
              <div className="s-producer-brand">Palenque El Original · San Vicente Ferrer</div>
              <p className="s-producer-p">Producción 100% silvestre con cosecha selectiva post-quiote. Hornos cónicos de piedra, fermentación abierta, destilación en alambique de cobre. Guardián activo de la Biósfera Tehuacán-Cuicatlán.</p>
              <a href="/palenques-poblanos" style={{ display: 'inline-block', marginTop: '14px', fontSize: '.8rem', color: 'var(--amber)', textDecoration: 'none' }}>Ver en índice de palenques →</a>
            </div>
            <div className="s-producer-card">
              <div className="s-producer-name">Jorge Armando Rojas González</div>
              <div className="s-producer-brand">Mezcal Santo Chin-ga Dazo · San Vicente Ferrer</div>
              <p className="s-producer-p">Medalla de Plata — Concurso Nacional de Marcas de Mezcal. Hub de 7 marcas en infraestructura ejidal compartida. Organizador de FescalTH. Advocacía activa para la protección de murciélagos polinizadores.</p>
              <a href="/guardianes" style={{ display: 'inline-block', marginTop: '14px', fontSize: '.8rem', color: 'var(--amber)', textDecoration: 'none' }}>Leer perfil completo →</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="s-footer">
          <div className="s-footer-links">
            <a href="/guardianes" className="s-footer-link primary">Los Guardianes del Maguey Silvestre →</a>
            <a href="/palenques-poblanos" className="s-footer-link secondary">Índice de Palenques Poblanos</a>
          </div>
          <p className="s-editorial">El Índice Silvestre es un proyecto editorial en desarrollo. Contenido de campo: Tehuacán, Puebla · Noviembre 2026 · 3demayo.com</p>
        </footer>
      </div>
    </>
  )
}
