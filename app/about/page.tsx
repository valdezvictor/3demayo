'use client'
import { useLang } from '../components/LangContext'

export default function AboutPage() {
  const { t } = useLang()
  return (
    <main className="min-h-screen bg-[#080808] pt-20">
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <p className="text-amber-400 text-sm tracking-[0.2em] uppercase mb-3">{t('Nuestra Historia','Our Story')}</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">3 de Mayo</h1>
        <p className="text-stone-300 text-xl leading-relaxed mb-6">{t('El 3 de mayo es la fiesta de la Santa Cruz — el día en que los maestros de obra celebran su oficio. Es también el día en que en muchas comunidades mezcaleras de México, el agave regresa a la tierra.','May 3rd is the feast of the Holy Cross — the day craftsmen celebrate their trade. It is also the day when, in many mezcal communities across Mexico, the agave returns to the earth.')}</p>
        <p className="text-stone-400 text-lg leading-relaxed mb-6">{t('3 de Mayo nació de esa misma convicción: que el mezcal no es una bebida de moda, sino un oficio ancestral que merece ser documentado, entendido y compartido con respeto.','3 de Mayo was born from that same conviction: that mezcal is not a trend, but an ancestral craft that deserves to be documented, understood, and shared with respect.')}</p>
        <p className="text-stone-400 text-lg leading-relaxed">{t('Somos una plataforma de conocimiento mezcalero. No vendemos botellas. Conectamos personas con productores, regiones con mesas, y tradición con curiosidad.','We are a mezcal knowledge platform. We do not sell bottles. We connect people with producers, regions with tables, and tradition with curiosity.')}</p>
      </section>
      <section className="border-t border-stone-800 px-6 py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div><div className="text-amber-400 text-3xl mb-4">◈</div><h3 className="text-white font-semibold text-lg mb-3">{t('Origen verificado','Verified Origin')}</h3><p className="text-stone-400 text-sm leading-relaxed">{t('Cada palenque en nuestra base de datos fue visitado o verificado con el productor directamente.','Every palenque in our database was visited or verified directly with the producer.')}</p></div>
          <div><div className="text-amber-400 text-3xl mb-4">◈</div><h3 className="text-white font-semibold text-lg mb-3">{t('Bilingüe por diseño','Bilingual by Design')}</h3><p className="text-stone-400 text-sm leading-relaxed">{t('El mezcal habla español primero. Pero queremos que el mundo lo entienda.','Mezcal speaks Spanish first. But we want the world to understand it.')}</p></div>
          <div><div className="text-amber-400 text-3xl mb-4">◈</div><h3 className="text-white font-semibold text-lg mb-3">{t('Sin romanticismo vacío','Without Empty Romanticism')}</h3><p className="text-stone-400 text-sm leading-relaxed">{t('Respetamos la tradición sin idealizarla. El mezcal enfrenta retos reales.','We respect tradition without idealizing it. Mezcal faces real challenges.')}</p></div>
        </div>
      </section>
      <section className="border-t border-stone-800 px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-400 text-sm tracking-widest uppercase mb-4">{t('Próximamente','Coming Soon')}</p>
          <h2 className="text-3xl font-bold text-white mb-4">{t('El Documental','The Documentary')}</h2>
          <p className="text-stone-400 mb-8 leading-relaxed">{t('Estamos filmando un documental sobre los palenques de Puebla, Oaxaca y Guerrero.','We are filming a documentary about the palenques of Puebla, Oaxaca, and Guerrero.')}</p>
          <a href={t('/documental','/en/documental')} className="inline-block border border-amber-400 text-amber-400 font-semibold px-8 py-3 rounded-full hover:bg-amber-400 hover:text-black transition-colors">{t('Ver avances','Watch previews')}</a>
        </div>
      </section>
    </main>
  )
}
