import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Los Guardianes del Maguey Silvestre — Tehuacán, Puebla | 3demayo',
  description: 'La lucha ecológica entre los monocultivos de Espadín y el patrimonio de agave silvestre del sur de Puebla. Perfiles de campo: Palenque El Original y Mezcal Santo Chin-ga Dazo.',
}

export default function GuardianesPage() {
  return (
    <>
      <style>{`
        :root {
          --bg: #0e0d0b;
          --bg-raised: #161410;
          --bg-card: #1c1a16;
          --border: #2e2b24;
          --border-soft: #232017;
          --fg: #e8e2d6;
          --fg-muted: #9a9080;
          --fg-dim: #5a5448;
          --green: #4a7c59;
          --green-light: #6aad7e;
          --green-dim: #2a4a35;
          --amber: #c8873a;
          --amber-light: #e8a85a;
          --amber-dim: #5a3a14;
          --display: 'Playfair Display', Georgia, serif;
          --body: 'DM Sans', system-ui, sans-serif;
        }
        .g-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .g-wrap {
          background: var(--bg);
          color: var(--fg);
          font-family: var(--body);
          font-size: 17px;
          line-height: 1.7;
          min-height: 100vh;
          padding: 0 max(16px, env(safe-area-inset-left, 0px));
          -webkit-font-smoothing: antialiased;
        }

        /* Nav */
        .g-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0; border-bottom: 1px solid var(--border-soft);
          max-width: 1100px; margin: 0 auto;
        }
        .g-brand { font-family: var(--display); font-size: 1.1rem; font-weight: 900;
          color: var(--amber); letter-spacing: .05em; text-decoration: none; }
        .g-breadcrumb { font-size: .72rem; color: var(--fg-muted); letter-spacing: .04em;
          text-transform: uppercase; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
        .g-breadcrumb span { color: var(--fg-dim); }

        /* Hero */
        .g-hero {
          max-width: 1100px; margin: 0 auto; padding: 60px 0 0;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
        }
        .g-hero-eyebrow { font-size: .7rem; letter-spacing: .15em; text-transform: uppercase;
          color: var(--green-light); margin-bottom: 20px; }
        .g-hero-headline {
          font-family: var(--display); font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 900;
          line-height: 1.1; color: var(--fg); margin-bottom: 24px;
        }
        .g-hero-headline em { font-style: italic; color: var(--amber); }
        .g-hero-sub { font-size: 1.05rem; color: var(--fg-muted); line-height: 1.65; max-width: 540px; }
        .g-hero-meta {
          display: flex; gap: 20px; margin-top: 32px; padding-top: 24px;
          border-top: 1px solid var(--border-soft); font-size: .75rem;
          letter-spacing: .05em; text-transform: uppercase; color: var(--fg-dim); flex-wrap: wrap;
        }
        .g-hero-meta strong { color: var(--fg-muted); font-weight: 500; }

        /* Dividers */
        .g-divider { background: var(--border-soft); height: 1px; margin: 56px 0; }
        .g-divider-thick {
          height: 3px; margin: 56px 0;
          background: linear-gradient(90deg, var(--green-dim), var(--amber-dim), var(--green-dim));
        }

        /* Article */
        .g-article { max-width: 720px; margin: 0 auto; padding: 0 0 80px; }
        .g-section-label {
          font-size: .68rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--green-light); margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
        }
        .g-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 60px; }
        .g-h2 {
          font-family: var(--display); font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 700;
          line-height: 1.2; color: var(--fg); margin-bottom: 24px;
        }
        .g-h2 em { font-style: italic; color: var(--amber); }
        .g-p { color: var(--fg-muted); margin-bottom: 20px; font-size: 1rem; line-height: 1.75; }
        .g-p strong { color: var(--fg); font-weight: 500; }
        .g-p em { font-style: italic; color: var(--fg); }

        /* Pull quote */
        .g-pull-quote {
          border-left: 3px solid var(--amber); padding: 20px 0 20px 28px; margin: 36px 0;
          background: linear-gradient(90deg, rgba(200,135,58,.06) 0%, transparent 100%);
        }
        .g-pull-quote blockquote {
          font-family: var(--display); font-size: 1.25rem; font-style: italic;
          line-height: 1.5; color: var(--fg); margin-bottom: 10px;
        }
        .g-pull-quote cite { font-size: .75rem; text-transform: uppercase; letter-spacing: .1em; color: var(--amber); font-style: normal; }

        /* Profile card */
        .g-profile-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px;
          padding: 36px; margin: 44px 0; position: relative;
        }
        .g-profile-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--green), var(--amber));
        }
        .g-profile-header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
        .g-monogram {
          width: 56px; height: 56px; border-radius: 50%; background: var(--green-dim);
          border: 1px solid var(--green); display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 1.3rem; font-weight: 700; color: var(--green-light); flex-shrink: 0;
        }
        .g-profile-name { font-family: var(--display); font-size: 1.35rem; font-weight: 700; color: var(--fg); line-height: 1.2; margin-bottom: 4px; }
        .g-profile-brand { font-size: .8rem; text-transform: uppercase; letter-spacing: .1em; color: var(--amber); }
        .g-profile-theme { font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: var(--fg-dim); margin-top: 2px; }

        .g-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
        .g-fact { background: var(--bg-raised); border: 1px solid var(--border-soft); border-radius: 3px; padding: 14px 16px; }
        .g-fact-label { font-size: .65rem; text-transform: uppercase; letter-spacing: .12em; color: var(--fg-dim); margin-bottom: 5px; }
        .g-fact-val { font-size: .88rem; color: var(--fg-muted); line-height: 1.4; }
        .g-fact-val strong { color: var(--fg); font-weight: 500; }

        .g-variety-tags { display: flex; flex-wrap: wrap; gap: 7px; margin: 12px 0 20px; }
        .g-variety-tag {
          background: var(--green-dim); border: 1px solid var(--green); border-radius: 3px;
          padding: 4px 10px; font-size: .72rem; color: var(--green-light); letter-spacing: .04em;
        }

        .g-award-badge {
          display: inline-flex; align-items: center; gap: 6px; background: var(--amber-dim);
          border: 1px solid var(--amber); border-radius: 20px; padding: 5px 12px;
          font-size: .72rem; letter-spacing: .05em; color: var(--amber-light); text-transform: uppercase; margin-bottom: 20px;
        }

        /* Matrix table */
        .g-table-wrap { overflow-x: auto; margin: 36px 0; }
        .g-table { width: 100%; border-collapse: collapse; font-size: .88rem; min-width: 560px; }
        .g-table th {
          text-align: left; padding: 10px 16px; font-size: .65rem; text-transform: uppercase;
          letter-spacing: .12em; color: var(--fg-dim); border-bottom: 1px solid var(--border); font-weight: 500;
        }
        .g-table td { padding: 14px 16px; border-bottom: 1px solid var(--border-soft); color: var(--fg-muted); vertical-align: top; line-height: 1.45; }
        .g-table tr:last-child td { border-bottom: none; }
        .g-table tr:hover td { background: var(--bg-raised); }
        .g-local-name { font-weight: 500; color: var(--fg); }
        .g-sci-name { font-style: italic; font-size: .82rem; display: block; color: var(--fg-dim); margin-top: 2px; }
        .g-mat-pill {
          display: inline-block; border-radius: 20px; padding: 2px 10px; font-size: .75rem; white-space: nowrap;
          background: var(--green-dim); border: 1px solid var(--green); color: var(--green-light);
        }
        .g-mat-pill.fast { background: var(--amber-dim); border-color: var(--amber); color: var(--amber-light); }

        /* Video placeholder */
        .g-video-module {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; margin: 44px 0;
        }
        .g-video-frame {
          aspect-ratio: 16/9; background: #060504; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 16px; border-bottom: 1px solid var(--border-soft);
        }
        .g-play-btn {
          width: 64px; height: 64px; border-radius: 50%; background: rgba(200,135,58,.15);
          border: 2px solid var(--amber); display: flex; align-items: center; justify-content: center;
        }
        .g-video-label { font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: var(--fg-dim); }
        .g-video-caption { padding: 16px 20px; font-size: .82rem; color: var(--fg-muted); line-height: 1.5; }
        .g-video-caption span { display: block; font-size: .72rem; color: var(--fg-dim); margin-top: 6px; font-style: italic; }

        /* Footer CTA */
        .g-footer-cta {
          background: var(--bg-raised); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 40px 0; margin: 60px 0 0;
        }
        .g-footer-inner { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
        .g-cta-links { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
        .g-cta-link {
          display: inline-flex; align-items: center; gap: 8px; font-size: .85rem; font-weight: 500;
          text-decoration: none; padding: 10px 20px; border-radius: 3px;
        }
        .g-cta-link.primary { background: var(--green); color: #fff; }
        .g-cta-link.secondary { border: 1px solid var(--border); color: var(--fg-muted); }
        .g-editorial { font-size: .75rem; color: var(--fg-dim); font-style: italic; padding-top: 16px; border-top: 1px solid var(--border-soft); }

        @media (max-width: 700px) {
          .g-hero { grid-template-columns: 1fr; padding: 36px 0 0; }
          .g-hero-visual { display: none; }
          .g-facts { grid-template-columns: 1fr; }
          .g-profile-card { padding: 24px; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap" />

      <div className="g-wrap">
        {/* Nav */}
        <nav>
          <div className="g-topbar">
            <a className="g-brand" href="/">3demayo.com</a>
            <div className="g-breadcrumb">
              <span>Inicio</span> › <span>Regiones</span> › <span>Puebla</span> ›
              <strong style={{ color: 'var(--fg-muted)' }}>Tehuacán</strong>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header>
          <div className="g-hero">
            <div>
              <p className="g-hero-eyebrow">Cobertura de campo — Tehuacán, Puebla · Noviembre 2026</p>
              <h1 className="g-hero-headline">Los Guardianes del <em>Maguey Silvestre:</em> Territorio, Tiempo y Resistencia en Tehuacán</h1>
              <p className="g-hero-sub">La lucha ecológica entre los monocultivos industriales de Espadín y el patrimonio multi-generacional de agave silvestre del sur de Puebla.</p>
              <div className="g-hero-meta">
                <span><strong>Región:</strong> Tehuacán-Cuicatlán, Puebla</span>
                <span><strong>Cobertura:</strong> 3demayo.com / Exclusiva</span>
                <span><strong>Producción:</strong> Artesanal &amp; Ancestral</span>
              </div>
            </div>
            <div className="g-hero-visual" aria-hidden="true">
              <svg viewBox="0 0 400 480" width="400" height="480" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustración botánica de Agave marmorata (Tepeztate) en roca caliza">
                <polygon points="40,440 90,370 160,390 230,355 300,375 370,340 390,440" fill="#1a1710" stroke="#2e2b22" strokeWidth="1.5" />
                <polygon points="0,440 40,440 90,370 60,440" fill="#161410" stroke="#2e2b22" strokeWidth="1" />
                <circle cx="200" cy="345" r="22" fill="#1c2a1f" stroke="#3a5e45" strokeWidth="1.5" />
                <path d="M200,345 Q140,310 80,340 Q100,320 120,315 Q160,330 200,345Z" fill="#2d5a3e" stroke="#4a7c59" strokeWidth="1.2" opacity=".9" />
                <path d="M200,345 Q260,310 320,340 Q300,320 280,315 Q240,330 200,345Z" fill="#2d5a3e" stroke="#4a7c59" strokeWidth="1.2" opacity=".9" />
                <path d="M200,345 Q175,270 155,210 Q172,230 180,250 Q190,300 200,345Z" fill="#345f42" stroke="#4a7c59" strokeWidth="1.2" />
                <path d="M200,345 Q225,270 245,210 Q228,230 220,250 Q210,300 200,345Z" fill="#345f42" stroke="#4a7c59" strokeWidth="1.2" />
                <circle cx="80" cy="340" r="2" fill="#c8d4b8" />
                <circle cx="320" cy="340" r="2" fill="#c8d4b8" />
                <circle cx="155" cy="210" r="2" fill="#c8d4b8" />
                <circle cx="245" cy="210" r="2" fill="#c8d4b8" />
                <line x1="200" y1="330" x2="200" y2="60" stroke="#4a7c59" strokeWidth="3" />
                <line x1="200" y1="180" x2="175" y2="150" stroke="#4a7c59" strokeWidth="2" />
                <line x1="200" y1="140" x2="230" y2="110" stroke="#4a7c59" strokeWidth="2" />
                <circle cx="175" cy="150" r="4" fill="#c8873a" opacity=".9" />
                <circle cx="230" cy="110" r="4" fill="#c8873a" opacity=".9" />
                <circle cx="200" cy="62" r="5" fill="#c8873a" />
                <text x="62" y="333" fontSize="8" fill="#6aad7e" fontFamily="Georgia, serif" fontStyle="italic">Agave marmorata</text>
                <text x="62" y="344" fontSize="7" fill="#4a7c59" fontFamily="sans-serif">(Tepeztate / Pichomel)</text>
              </svg>
            </div>
          </div>
        </header>

        <div className="g-divider-thick" />

        {/* Article */}
        <main className="g-article">

          {/* Section I */}
          <section>
            <p className="g-section-label">Sección I</p>
            <h2 className="g-h2">El Dilema Ecológico: <em>Ocho Años contra Cincuenta</em></h2>

            <p className="g-p">Hay un reloj que corre bajo las laderas áridas de la Reserva de la Biósfera Tehuacán-Cuicatlán. No mide años sino generaciones — la paciencia geológica necesaria para llevar a un <em>Agave marmorata</em> silvestre desde la germinación hasta la madurez completa. Donde los acantilados de caliza emergen del suelo desértico y las lluvias de verano llegan tarde, un Tepeztate echa raíces durante quince, veinte, a veces veinticinco años antes de estar listo para dar todo lo que tiene al fuego del mezcalero. Y entonces desaparece para siempre, su código genético único extinguido en una sola mañana de cosecha.</p>

            <p className="g-p">Frente a esta escala de tiempo antigua, la industria moderna del mezcal introdujo otro reloj. <strong><em>Agave angustifolia</em></strong> — Espadín — madura en siete a ocho años. Se propaga a través de <em>hijuelos</em> clonales que pueden replantarse en masa para cubrir laderas enteras con hileras genéticamente idénticas. Altos rendimientos de azúcar, perfiles de sabor predecibles, flujo industrial. Para un mercado global sediento del misticismo ahumado del mezcal, el Espadín es la respuesta que la cadena de suministro buscaba.</p>

            <p className="g-p">La colisión entre estas dos escalas temporales no es meramente económica — es ecológica. Los <strong>murciélagos nectarívoros</strong> (<em>murciélagos nectarívoros</em>) son los polinizadores primarios del agave silvestre. Siguen los quiotes florecidos que las plantas silvestres elevan hacia el cielo al alcanzar la madurez, alimentándose del néctar y transportando el polen de planta en planta por los cañones y escarpas calizas del sur de Puebla. Cuando la presión comercial lleva a los productores a cosechar agaves silvestres antes de que florezcan, los murciélagos pierden su corredor. El ciclo de reproducción por semilla colapsa. La siguiente generación de agaves silvestres nunca llega.</p>

            <p className="g-p">Esta es la crisis que los maestros mezcaleros de Tehuacán están viviendo. No es abstracta. Es la historia de cada planta silvestre en la ladera encima de sus palenques.</p>
          </section>

          <div className="g-divider" />

          {/* Profile I: Jaime */}
          <section>
            <p className="g-section-label">Perfil — I</p>

            <div className="g-profile-card">
              <div className="g-profile-header">
                <div className="g-monogram">J</div>
                <div>
                  <a href="/palenques/palenque-el-original" className="g-profile-name" style={{color:"inherit",textDecoration:"none",borderBottom:"1px solid var(--amber)",paddingBottom:"1px"}}>Maestro Jaime</a>
                  <div className="g-profile-brand">Palenque El Original</div>
                  <div className="g-profile-theme">Artesanía Ancestral &amp; Custodia de la Biósfera</div>
                </div>
              </div>

              <div className="g-facts">
                <div className="g-fact">
                  <div className="g-fact-label">Ubicación</div>
                  <div className="g-fact-val"><strong>Tehuacán / Zapotitlán</strong><br />Corredor de la Reserva de la Biósfera Tehuacán-Cuicatlán, Puebla</div>
                </div>
                <div className="g-fact">
                  <div className="g-fact-label">Método de Cocción</div>
                  <div className="g-fact-val"><strong>Hornos cónicos de piedra</strong><br />Hornos subterráneos cónicos de piedra, mezquite y encino</div>
                </div>
                <div className="g-fact">
                  <div className="g-fact-label">Fermentación</div>
                  <div className="g-fact-val"><strong>Fermentación abierta natural</strong><br />Fermentación abierta al aire libre, levaduras silvestres ambientales</div>
                </div>
                <div className="g-fact">
                  <div className="g-fact-label">Destilación</div>
                  <div className="g-fact-val"><strong>Alambique de cobre</strong><br />Lotes pequeños en alambique de cobre, destilación tradicional híbrida</div>
                </div>
              </div>

              <p className="g-section-label" style={{ marginTop: 0, marginBottom: '10px' }}>Variedades silvestres trabajadas</p>
              <div className="g-variety-tags">
                <span className="g-variety-tag">Papalometl (A. potatorum)</span>
                <span className="g-variety-tag">Tepeztate (A. marmorata)</span>
                <span className="g-variety-tag">Pichomel</span>
                <span className="g-variety-tag">A. salmiana</span>
                <span className="g-variety-tag">A. americana vars.</span>
              </div>

              <p className="g-p">En las sombras del cañón bajo los badlands de Zapotitlán Salinas, donde la Reserva de la Biósfera Tehuacán-Cuicatlán da paso a los campos ejidales del desierto alto de Puebla, Palenque El Original opera en una escala temporal que la industria de los destilados modernos ha abandonado en su mayor parte. La operación del Maestro Jaime es multigeneracional en el sentido más verdadero — no una afirmación de marketing sino una herencia vivida de conocimiento botánico transmitida entre padres e hijos durante décadas.</p>

              <p className="g-p">Lo que distingue a El Original es una filosofía de producción enraizada en la contención. Los especímenes silvestres se seleccionan a mano en la ladera en la madurez máxima — nunca antes — y se cosechan de manera que deja intacto el stock reproductivo de semillas. Cuando un quiote ha florecido, cuando los murciélagos han hecho su trabajo y el contrato genético con el paisaje ha sido honrado, solo entonces el equipo de Jaime lleva la piña a los hornos cónicos.</p>

              <div className="g-pull-quote">
                <blockquote>"El maguey silvestre no trabaja para nosotros. Nosotros trabajamos para él. El día que lo olvidemos, se acaba todo lo que somos como palenque."</blockquote>
                <cite>— Maestro Jaime, Palenque El Original · Tehuacán, Puebla</cite>
              </div>
            </div>
          </section>

          {/* Profile II: Jorge Armando */}
          <section>
            <p className="g-section-label">Perfil — II</p>

            <div className="g-profile-card">
              <div className="g-profile-header">
                <div className="g-monogram" style={{ background: 'var(--amber-dim)', borderColor: 'var(--amber)', color: 'var(--amber-light)' }}>JA</div>
                <div>
                  <a href="/palenques/mezcal-santo-chinga-dazo" className="g-profile-name" style={{color:"inherit",textDecoration:"none",borderBottom:"1px solid var(--amber)",paddingBottom:"1px"}}>Jorge Armando Rojas González</a>
                  <div className="g-profile-brand">Mezcal Santo Chin-ga Dazo</div>
                  <div className="g-profile-theme">Propiedad Ejidal, Resiliencia Comunitaria &amp; Defensa Genética</div>
                </div>
              </div>

              <div className="g-award-badge">
                <span>●</span>
                Medalla de Plata — Concurso Nacional de Marcas de Mezcal
              </div>

              <div className="g-facts">
                <div className="g-fact">
                  <div className="g-fact-label">Ubicación</div>
                  <div className="g-fact-val"><strong>San Vicente Ferrer</strong><br />Municipio de Tehuacán, Puebla</div>
                </div>
                <div className="g-fact">
                  <div className="g-fact-label">Modelo Operativo</div>
                  <div className="g-fact-val"><strong>Ejido colectivo</strong><br />Cooperativa de 7 marcas — infraestructura de palenque comunal multifamiliar</div>
                </div>
                <div className="g-fact">
                  <div className="g-fact-label">Reconocimiento Regional</div>
                  <div className="g-fact-val"><strong>Organizador principal</strong><br />FescalTH — Festival del Mezcal de Tehuacán</div>
                </div>
                <div className="g-fact">
                  <div className="g-fact-label">Misión Social</div>
                  <div className="g-fact-val"><strong>Empleo juvenil local</strong><br />Alternativa económica sostenible a la migración para la juventud ejidal de Tehuacán</div>
                </div>
              </div>

              <p className="g-section-label" style={{ marginTop: 0, marginBottom: '10px' }}>Variedades silvestres bajo protección activa</p>
              <div className="g-variety-tags">
                <span className="g-variety-tag">Pixhomel / Pichomel</span>
                <span className="g-variety-tag">Papalometl (A. potatorum)</span>
                <span className="g-variety-tag">Espadilla</span>
                <span className="g-variety-tag">Jabalí (A. convallis)</span>
              </div>

              <p className="g-p">Jorge Armando Rojas González opera en la intersección de la economía comunitaria y la preservación botánica — una combinación rara que le ha valido tanto una medalla de plata nacional como el respeto de las familias ejidales que comparten la infraestructura del palenque comunal en San Vicente Ferrer. Su operación no es un perfil de productor individual sino un ecosistema: siete marcas distintas destiladas desde una instalación cooperativa.</p>

              <p className="g-p">Su causa más urgente es la protección de las poblaciones de murciélagos nectarívoros de la región. La lógica es biológica e irreversible: sin murciélagos visitando los quiotes, los agaves silvestres no pueden sembrar. Sin siembra, la próxima generación de Pixhomel y Papalometl nunca se establece en las laderas calizas. Los ciclos de maduración de 12 a 45 años de estas plantas significan que el daño causado por una sola década de perturbación del hábitat no será visible durante treinta años — y para entonces, la ventana de recuperación se habrá cerrado.</p>

              <div className="g-pull-quote">
                <blockquote>"Si no dejamos florecer los quiotes — si cosechamos antes de que el murciélago visite — estamos robando el futuro de nuestra tierra. El mezcal silvestre no es solo lo que hacemos hoy. Es lo que prometemos dejar."</blockquote>
                <cite>— Jorge Armando Rojas González, Mezcal Santo Chin-ga Dazo · San Vicente Ferrer</cite>
              </div>
            </div>
          </section>

          <div className="g-divider" />

          {/* Agave Matrix */}
          <section>
            <p className="g-section-label">Referencia botánica</p>
            <h2 className="g-h2">Matriz de Magueys: <em>Tehuacán y Alrededores</em></h2>
            <p className="g-p">Referencia de campo para las cinco especies primarias presentes en el corredor Tehuacán-Cuicatlán, clasificadas por ciclo de maduración de más rápido a más lento.</p>

            <div className="g-table-wrap">
              <table className="g-table">
                <thead>
                  <tr>
                    <th>Nombre Local / Científico</th>
                    <th>Maduración Promedio</th>
                    <th>Notas de Terroir</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="g-local-name">Espadín</span><span className="g-sci-name">Agave angustifolia</span></td>
                    <td><span className="g-mat-pill fast">7–8 Años</span></td>
                    <td>Caballo de batalla cultivado del mercado comercial. Alto rendimiento de azúcar, se propaga vía hijuelos clonales. Volumen fundamental; el perfil de sabor carece de especificidad regional.</td>
                  </tr>
                  <tr>
                    <td><span className="g-local-name">Papalometl</span><span className="g-sci-name">Agave potatorum</span></td>
                    <td><span className="g-mat-pill">10–15 Años</span></td>
                    <td>Estructura de roseta compacta; floral y afrutado en nariz, acabado mineral rico. El pequeño tamaño de la piña limita el rendimiento. Los tallos florales vulnerables requieren polinización de murciélagos.</td>
                  </tr>
                  <tr>
                    <td><span className="g-local-name">Pixhomel / Pichomel</span><span className="g-sci-name">Variante endémica local</span></td>
                    <td><span className="g-mat-pill">12–18 Años</span></td>
                    <td>Endémico regional muy apreciado. Notas de terroir intensas y específicas del sitio directamente ligadas al microclima de caliza de Tehuacán. Volumen de producción extremadamente limitado.</td>
                  </tr>
                  <tr>
                    <td><span className="g-local-name">Jabalí</span><span className="g-sci-name">Agave convallis</span></td>
                    <td><span className="g-mat-pill">12–15 Años</span></td>
                    <td>Piña densa y fibrosa; fermentación notoriamente volátil. Exige manejo experimentado. Produce mezcal de complejidad y carácter regional excepcionales.</td>
                  </tr>
                  <tr>
                    <td><span className="g-local-name">Tepeztate</span><span className="g-sci-name">Agave marmorata</span></td>
                    <td><span className="g-mat-pill">15–25+ Años</span></td>
                    <td>Crece directamente de las caras de acantilados calizos. Complejidad herbal, vegetal y de pimiento verde. Espinas de punta blanca; enorme extensión de roseta. Mayor riesgo ecológico de todas las especies regionales.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="g-divider" />

          {/* Video */}
          <section>
            <p className="g-section-label">Multimedia</p>
            <h2 className="g-h2">Desde el Campo: <em>Voces del Palenque</em></h2>
            <p className="g-p">Footage de campo de dos sesiones de noviembre 2026 — Palenque El Original al amanecer y Santo Chin-ga Dazo en la tarde, con Jorge Armando hablando directamente sobre ecología de murciélagos y defensa de tierras ejidales.</p>

            <div className="g-video-module">
              <div className="g-video-frame">
                <div className="g-play-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--amber)"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <span className="g-video-label">Video — Próximamente</span>
              </div>
              <div className="g-video-caption">
                Entrevista 4K de campo — Jaime en los hornos cónicos, Jorge Armando sobre polinización de murciélagos y manejo ejidal de tierras.
                <span>[Embed de video — subir desde footage de campo · Tehuacán, Puebla, Noviembre 2026]</span>
              </div>
            </div>
          </section>

        </main>

        {/* Footer CTA */}
        <footer className="g-footer-cta">
          <div className="g-footer-inner">
            <div className="g-cta-links">
              <a href="/palenques-poblanos" className="g-cta-link primary">Explorar el Índice de Palenques Poblanos →</a>
              <a href="/silvestre" className="g-cta-link secondary">← Volver al Índice Silvestre</a>
            </div>
            <p className="g-editorial">
              Esta cobertura fue posible gracias al acceso exclusivo otorgado por los maestros mezcaleros de Tehuacán. Todas las citas y datos de campo corresponden a entrevistas realizadas en Noviembre de 2026. · 3demayo.com
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
