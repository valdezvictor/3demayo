export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-stone-200">
      {/* Hero */}
      <div className="border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <p className="text-amber-500 text-xs font-mono tracking-widest mb-6">
            EL DÍA QUE EL PALENQUE SE DETIENE
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-100 mb-8 leading-tight">
            El 3 de Mayo
          </h1>
          <p className="text-stone-400 text-xl leading-relaxed max-w-2xl">
            En honor al fuego, a la tierra, y al maestro destilador.
          </p>
        </div>
      </div>

      {/* The ritual */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mb-6">
                La Tradición
              </h2>
              <div className="space-y-5 text-stone-400 leading-relaxed">
                <p>
                  El <strong className="text-stone-200">Día de la Santa Cruz</strong> —
                  el 3 de mayo — es la frontera sagrada de la producción tradicional de mezcal
                  en los palenques de las montañas de México.
                </p>
                <p>
                  Cada año, antes de que las lluvias de verano lleguen y enfríen los
                  hornos subterráneos de piedra volcánica:
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "⬡",
                  title: "La Cruz de Agave",
                  desc: "Los maestros tejen cruces de fibra cruda de maguey y las colocan sobre los hornos cónicos de piedra.",
                },
                {
                  icon: "◎",
                  title: "La Protección",
                  desc: "Los alambiques de cobre y las ollas de barro se envuelven en flores silvestres y hojas frescas de agave.",
                },
                {
                  icon: "✦",
                  title: "El Primer Cordón",
                  desc: "Las primeras gotas de la cosecha se vierten directamente sobre la tierra seca — no en botellas, no para vender — como ofrenda sagrada al suelo que nutrió el agave durante 30 años.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-[#262626] bg-[#171717] p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-amber-500 text-lg shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-stone-100 font-medium mb-1">{item.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 border-l-2 border-amber-500/40 pl-6">
            <p className="text-stone-300 text-lg leading-relaxed italic">
              La producción se detiene. El palenquero barre los pisos de tierra.
              El linaje es honrado. Antes de las lluvias de verano y el siguiente ciclo de cosecha,
              se reconoce a quienes vinieron antes.
            </p>
          </div>
        </div>
      </div>

      {/* Our covenant */}
      <div className="border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-serif font-bold text-stone-100 mb-10">
            El Compromiso de la Plataforma
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "I",
                title: "Honrar al Maestro",
                desc: "Visibilizar a las familias que transmiten sus recetas por tradición oral e instinto — no por readouts de laboratorio industrial.",
              },
              {
                num: "II",
                title: "Proteger el Micro-Terroir",
                desc: "Asegurar que los agaves silvestres sin cultivar sean cosechados éticamente, dando tiempo a los ecosistemas para regenerarse naturalmente.",
              },
              {
                num: "III",
                title: "Exigir Transparencia",
                desc: "Proporcionar una visión sin compromisos de las coordenadas exactas, números de lote y estilos de destilación de los espirituosos auténticos.",
              },
            ].map(item => (
              <div key={item.num} className="border border-[#262626] bg-[#0a0a0a] p-6">
                <p className="text-amber-500/40 font-mono text-3xl font-bold mb-4">{item.num}</p>
                <h3 className="text-stone-100 font-serif font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why this exists */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-serif font-bold text-stone-100 mb-6">
            Por Qué Existe Este Registro
          </h2>
          <div className="space-y-5 text-stone-400 leading-relaxed max-w-2xl">
            <p>
              La producción corporativa a escala y la destilación industrial están
              entrando en la categoría del mezcal. Los elementos sagrados, lentos y
              profundamente humanos de la destilación tradicional están siendo amenazados.
            </p>
            <p>
              COMERCAM protege sus datos detrás de accesos restringidos. No existe
              ningún directorio abierto, verificado y consultable de los productores
              de mezcal ancestral de México — especialmente no uno que ponga a las
              mujeres de la Sierra Mixteca de Puebla en el centro.
            </p>
            <p>
              3deMayo.com se opone directamente a la industrialización del patrimonio.
              Es el primer registro de código abierto del mezcal ancestral mexicano —
              construido para que el conocimiento más antiguo de esta tierra sea visible,
              accesible, y honrado.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-serif font-bold text-stone-100 mb-10">
          Quiénes Somos
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-[#262626] bg-[#0a0a0a] p-8">
            <p className="text-amber-500 text-xs font-mono tracking-widest mb-4">
              FUNDADOR · PLATAFORMA
            </p>
            <h3 className="text-xl font-serif font-bold text-stone-100 mb-2">
              Victor Valdez
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Constructor de plataformas de datos en la industria de bebidas y construcción.
              Creador de NexaBuilder, 24dejulio.com, TequilaNoms.com y TequilaDigest.com.
              La convicción central: los datos deben ser abiertos y las historias merecen
              ser contadas.
            </p>
          </div>
          <div className="border border-amber-500/30 bg-amber-500/5 p-8">
            <p className="text-amber-500 text-xs font-mono tracking-widest mb-4">
              PUENTE CULTURAL · DOCUMENTAL
            </p>
            <h3 className="text-xl font-serif font-bold text-stone-100 mb-2">
              Mariale Alejandra Ortiz
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Actriz, comentarista de radio y productora de documentales. Amiga cercana
              de las fundadoras de Las Hijas del Maguey. Su documental sobre las maestras
              mezcaleras de Puebla se convierte en el ancla editorial más poderosa de
              esta plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
