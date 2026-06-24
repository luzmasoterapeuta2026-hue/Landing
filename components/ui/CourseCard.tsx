import type { Curso } from "@/lib/types";
import Image from "next/image";
import { MapPin, Calendar, Clock, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const CATEGORIA_COLORS: Record<string, string> = {
  "Tecnico": "bg-[#c45c3a]/10 text-[#c45c3a]",
  "Holistico": "bg-[#965e5d]/10 text-[#965e5d]",
  "Energetico": "bg-[#dfa82b]/10 text-[#9a7020]",
  "Gabinete": "bg-[#2a2522]/8 text-[#2a2522]/70",
};

const PLACEHOLDER_SEEDS: Record<string, string> = {
  "Tecnico": "massage-therapy-hands",
  "Holistico": "holistic-nature-flowers",
  "Energetico": "crystals-energy-light",
  "Gabinete": "therapy-room-calm",
};

export function CourseCard({ curso }: { curso: Curso }) {
  const colorClass = CATEGORIA_COLORS[curso.categoria] ?? "bg-[#965e5d]/10 text-[#965e5d]";
  const imageSeed = PLACEHOLDER_SEEDS[curso.categoria] ?? "wellness-holistic";
  const imageSrc = curso.imagen || `https://picsum.photos/seed/${imageSeed}/600/400`;

  const ctaHref =
    curso.cta_tipo === "formulario" && curso.cta_link
      ? curso.cta_link
      : `https://wa.me/5491123467200?text=Hola+Luz%2C+me+interesa+el+curso+${encodeURIComponent(curso.nombre)}`;

  const isExternal = curso.cta_tipo === "formulario";

  return (
    <article className="group bg-[#fff7e8] border border-[#965e5d]/12 rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_8px_32px_rgba(150,94,93,0.12)] hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={curso.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2522]/40 to-transparent" />
        {curso.categoria && (
          <span className={`absolute top-3 left-3 font-[family-name:var(--font-inter)] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full ${colorClass}`}>
            {curso.categoria}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-[family-name:var(--font-cormorant)] text-[#2a2522] text-2xl font-medium leading-snug mb-3">
          {curso.nombre}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
          {curso.modalidad && (
            <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/55">
              <MapPin size={12} weight="fill" className="text-[#965e5d]" />
              {curso.modalidad}
            </span>
          )}
          {curso.fecha && (
            <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/55">
              <Calendar size={12} weight="fill" className="text-[#965e5d]" />
              {curso.fecha}
            </span>
          )}
          {curso.duracion && (
            <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/55">
              <Clock size={12} weight="fill" className="text-[#965e5d]" />
              {curso.duracion}
            </span>
          )}
        </div>

        {curso.descripcion && (
          <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/65 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {curso.descripcion}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#965e5d]/10">
          {curso.precio && (
            <span className="font-[family-name:var(--font-cormorant)] text-[#dfa82b] text-lg font-semibold">
              {curso.precio}
            </span>
          )}
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-2 font-[family-name:var(--font-inter)] text-xs bg-[#965e5d] text-[#fff7e8] px-4 py-2 rounded-full hover:bg-[#7d4e4d] active:scale-[0.98] transition-all duration-200"
          >
            {isExternal ? <ArrowUpRight size={13} weight="bold" /> : <WhatsappLogo size={13} weight="fill" />}
            {curso.cta_texto}
          </a>
        </div>
      </div>
    </article>
  );
}
