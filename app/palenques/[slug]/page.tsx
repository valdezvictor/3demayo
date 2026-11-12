// /opt/3demayo/web/app/palenques/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PalenqueRecord {
  id: number;
  slug: string;
  palenque_name: string;
  maestro_name: string;
  maestro_title: string | null;
  is_maestra: boolean;
  municipality: string;
  state: string;
  altitude_m: number | null;
  founded_year: number | null;
  description_es: string | null;
  description_en: string | null;
  agave_species: string[];
  production_method: string | null;
  certifications: string[];
  is_verified: boolean;
  website: string | null;
  instagram: string | null;
  contact_email: string | null;
  hero_image_url: string | null;
  region_name: string | null;
  region_slug: string | null;
  region_description_es: string | null;
  region_description_en: string | null;
}

async function getPalenque(slug: string): Promise<PalenqueRecord | null> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'http://localhost:3003'
      : 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/palenques/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.palenque ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const p = await getPalenque(params.slug);
  if (!p) return { title: 'Palenque no encontrado | 3deMayo' };

  return {
    title: `${p.palenque_name} · ${p.maestro_name} | 3deMayo`,
    description: p.description_en
      ?? `${p.palenque_name} — ancestral mezcal palenque in ${p.municipality}, ${p.state}. ${p.agave_species?.join(', ')}.`,
    openGraph: {
      title: `${p.palenque_name} | 3deMayo Heritage Registry`,
      description: p.description_es ?? '',
      images: p.hero_image_url ? [{ url: p.hero_image_url }] : [],
    },
  };
}

function IdentityCard({ p }: { p: PalenqueRecord }) {
  return (
    <div className="border border-neutral-800 rounded-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-amber-700 to-amber-400" />
      <div className="divide-y divide-neutral-800/60">
        {p.municipality && (
          <div className="flex justify-between items-start px-4 py-3 gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5 whitespace-nowrap">Municipio</span>
            <span className="text-sm text-neutral-200 text-right">{p.municipality}, {p.state}</span>
          </div>
        )}
        {p.altitude_m && (
          <div className="flex justify-between items-start px-4 py-3 gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5 whitespace-nowrap">Altitud</span>
            <span className="text-sm text-neutral-200 text-right">{p.altitude_m.toLocaleString()} m.s.n.m.</span>
          </div>
        )}
        {p.region_name && (
          <div className="flex justify-between items-start px-4 py-3 gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5 whitespace-nowrap">Región</span>
            <span className="text-sm text-neutral-200 text-right">{p.region_name}</span>
          </div>
        )}
        {p.production_method && (
          <div className="flex justify-between items-start px-4 py-3 gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5 whitespace-nowrap">Método</span>
            <span className="text-sm text-neutral-200 text-right">{p.production_method}</span>
          </div>
        )}
        {p.certifications?.length > 0 && (
          <div className="flex justify-between items-start px-4 py-3 gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5 whitespace-nowrap">Certificaciones</span>
            <span className="text-sm text-neutral-200 text-right">{p.certifications.join(', ')}</span>
          </div>
        )}
        {p.founded_year && (
          <div className="flex justify-between items-start px-4 py-3 gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5 whitespace-nowrap">Fundado</span>
            <span className="text-sm text-neutral-200 text-right">{p.founded_year}</span>
          </div>
        )}
        <div className="flex justify-between items-start px-4 py-3 gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5 whitespace-nowrap">Verificado</span>
          <span className={`text-sm text-right ${p.is_verified ? 'text-emerald-400' : 'text-neutral-500'}`}>
            {p.is_verified ? '✦ Campo verificado' : 'Pendiente'}
          </span>
        </div>
      </div>
    </div>
  );
}

function AgaveSpeciesList({ species }: { species: string[] }) {
  if (!species?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {species.map((s) => (
        <span
          key={s}
          className="font-mono text-[10px] px-2.5 py-1 bg-amber-500/10 border border-amber-500/25 rounded-sm text-amber-400 tracking-wide"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function MaestraBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 bg-amber-500/10 border border-amber-500/40 rounded-sm text-amber-400 tracking-widest uppercase">
      ✦ Maestra Mezcalera
    </span>
  );
}

function VideoPlaceholder({ name }: { name: string }) {
  return (
    <div className="border border-neutral-800 rounded-sm bg-neutral-950 aspect-video flex flex-col items-center justify-center gap-3 my-6">
      <div className="text-4xl opacity-20">▶</div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-600 text-center">
        Video de Palenque · En Producción
      </p>
      <p className="text-xs text-neutral-700 italic text-center">
        {name} — Tehuacán, Noviembre 2026 · Próximamente en 3deMayo.com
      </p>
    </div>
  );
}

export default async function PalenqueDetailPage(
  { params }: { params: { slug: string } }
) {
  const p = await getPalenque(params.slug);
  if (!p) notFound();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">

      <div className="border-b border-neutral-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500/80">
            3<span className="text-amber-400">de</span>Mayo · Guardianes
          </span>
          <a
            href="/palenques"
            className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            ← Índice de Palenques
          </a>
        </div>
      </div>

      <div className="border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-emerald-700" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600">
              C2 · Circuito Reserva Biósfera · {p.municipality}, {p.state}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
            <div>
              {p.is_maestra && <div className="mb-3"><MaestraBadge /></div>}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-neutral-100 mb-1">
                {p.palenque_name}
              </h1>
              <p className="font-serif text-lg italic text-amber-400 mb-6">
                {p.maestro_name}
                {p.maestro_title && (
                  <span className="text-neutral-500 not-italic text-sm ml-2">· {p.maestro_title}</span>
                )}
              </p>

              {p.description_es && (
                <div className="border-l-2 border-amber-700 pl-5 mb-3">
                  <p className="text-sm leading-relaxed text-neutral-400">{p.description_es}</p>
                </div>
              )}
              {p.description_en && (
                <div className="border-l-2 border-neutral-700 pl-5 mb-6">
                  <p className="text-sm leading-relaxed text-neutral-500 italic">{p.description_en}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-[10px] px-2.5 py-1 bg-emerald-900/30 border border-emerald-800 rounded-sm text-emerald-500 tracking-wide">
                  UNESCO Biósfera
                </span>
                {p.production_method && (
                  <span className="font-mono text-[10px] px-2.5 py-1 bg-red-900/20 border border-red-900/50 rounded-sm text-red-400/80 tracking-wide">
                    {p.production_method}
                  </span>
                )}
                {p.is_verified && (
                  <span className="font-mono text-[10px] px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-sm text-amber-400 tracking-wide">
                    Campo Verificado Nov 2026
                  </span>
                )}
              </div>
            </div>

            <IdentityCard p={p} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        <p className="font-mono text-[10px] uppercase tracking-widest text-amber-600 mb-2 pb-3 border-b border-neutral-800">
          Documental de Campo · <span className="text-neutral-600">Field Documentary — Coming Soon</span>
        </p>
        <VideoPlaceholder name={p.palenque_name} />

        {p.agave_species?.length > 0 && (
          <section className="mb-10 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-600 mb-4 pb-3 border-b border-neutral-800">
              Agaves Trabajados · <span className="text-neutral-600">Agave Species</span>
            </p>
            <AgaveSpeciesList species={p.agave_species} />
          </section>
        )}

        {p.region_description_es && (
          <section className="mb-10 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-600 mb-4 pb-3 border-b border-neutral-800">
              El Territorio · <span className="text-neutral-600">The Territory</span>
            </p>
            <p className="text-sm leading-relaxed text-neutral-400 mb-3">{p.region_description_es}</p>
            {p.region_description_en && (
              <p className="text-sm leading-relaxed text-neutral-500 italic pl-4 border-l border-neutral-800">
                {p.region_description_en}
              </p>
            )}
          </section>
        )}

        {(p.website || p.instagram) && (
          <section className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-600 mb-4 pb-3 border-b border-neutral-800">
              Contacto · <span className="text-neutral-600">Contact</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {p.website && (
                <a href={p.website} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[11px] px-4 py-2 border border-neutral-700 rounded-sm text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 transition-colors">
                  Sitio Web →
                </a>
              )}
              {p.instagram && (
                <a href={`https://instagram.com/${p.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[11px] px-4 py-2 border border-neutral-700 rounded-sm text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 transition-colors">
                  Instagram →
                </a>
              )}
            </div>
          </section>
        )}

        <div className="pt-8 border-t border-neutral-800">
          <a href="/palenques"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500 hover:text-amber-400 transition-colors">
            ← Regresar al Registro · Back to Registry
          </a>
        </div>

      </div>
    </main>
  );
}
