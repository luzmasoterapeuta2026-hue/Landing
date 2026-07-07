"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { MapPin, Calendar, Clock, Repeat, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Curso } from "@/lib/types";
import { CourseModal } from "./CourseModal";

// Solid fills so the badge reads clearly over any card image
const CATEGORIA_COLORS: Record<string, string> = {
  "Tecnico": "bg-[#c45c3a] text-white",
  "Holistico": "bg-[#965e5d] text-white",
  "Energetico": "bg-[#dfa82b] text-[#2a2522]",
  "Gabinete": "bg-[#fff7e8] text-[#2a2522]",
};

// Servicios (ej. biodecodificacion a distancia) llevan badge propio, distinto de las formaciones
const SERVICIO_COLOR = "bg-[#5c7a6b] text-white";

const BADGE_FALLBACK = "bg-[#2a2522] text-[#fff7e8]";

function badgeFor(curso: Curso): { label: string; colorClass: string } | null {
  if (curso.tipo === "servicio")
    return { label: curso.categoria || "Servicio", colorClass: SERVICIO_COLOR };
  if (!curso.categoria) return null;
  return { label: curso.categoria, colorClass: CATEGORIA_COLORS[curso.categoria] ?? BADGE_FALLBACK };
}

const COURSE_FALLBACK_IMAGE = "/curses/background.webp";

function isValidImageSrc(url: string | undefined): boolean {
  if (!url) return false;
  if (url.startsWith("/")) return true;
  return url.startsWith("https://res.cloudinary.com/");
}

function isSafeUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

export function CourseCard({ curso }: { curso: Curso }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const badge = badgeFor(curso);
  const imageSrc = isValidImageSrc(curso.imagen) ? curso.imagen! : COURSE_FALLBACK_IMAGE;
  const waIntro = curso.tipo === "servicio" ? "me+interesa+el+servicio" : "me+interesa+el+curso";
  const ctaHref =
    curso.cta_tipo === "formulario" && isSafeUrl(curso.cta_link)
      ? curso.cta_link
      : `https://wa.me/5491123467200?text=Hola+Luz%2C+${waIntro}+${encodeURIComponent(curso.nombre)}`;
  const isExternal = curso.cta_tipo === "formulario";
  const preview = curso.subtitulo || curso.descripcion;

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="group cursor-pointer h-[440px] bg-[#fff7e8]/90 backdrop-blur-sm border border-[#2a2522]/8 rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_8px_32px_rgba(42,37,34,0.12)] hover:-translate-y-1 transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden flex-none">
          <Image
            src={imageSrc}
            alt={curso.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2522]/40 to-transparent" />
          {badge && (
            <span className={`absolute top-3 left-3 font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(42,37,34,0.35)] ${badge.colorClass}`}>
              {badge.label}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 min-h-0 p-5">
          <h3 className="font-[family-name:var(--font-cormorant)] text-[#2a2522] text-2xl font-medium leading-snug mb-3 line-clamp-1">
            {curso.nombre}
          </h3>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
            {curso.modalidad && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/55 truncate">
                <MapPin size={12} weight="fill" className="text-[#2a2522]/60 flex-none" />
                {curso.modalidad}
              </span>
            )}
            {curso.frecuencia && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/55 truncate">
                <Repeat size={12} weight="bold" className="text-[#2a2522]/60 flex-none" />
                {curso.frecuencia}
              </span>
            )}
            {curso.fecha && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/55 truncate">
                <Calendar size={12} weight="fill" className="text-[#2a2522]/60 flex-none" />
                {curso.fecha}
              </span>
            )}
            {curso.duracion && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/55 truncate">
                <Clock size={12} weight="fill" className="text-[#2a2522]/60 flex-none" />
                {curso.duracion}
              </span>
            )}
          </div>

          {preview && (
            <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/60 text-sm leading-relaxed mb-4 flex-1 min-h-0 line-clamp-2">
              {preview}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2522]/10">
            {curso.precio && (
              <span className="font-[family-name:var(--font-cormorant)] text-[#dfa82b] text-lg font-semibold">
                {curso.precio}
              </span>
            )}
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex items-center gap-2 font-[family-name:var(--font-inter)] text-xs bg-[#dfa82b] text-[#2a2522] px-4 py-2 rounded-full hover:bg-[#c8981f] active:scale-[0.98] transition-all duration-200"
            >
              {isExternal ? <ArrowUpRight size={13} weight="bold" /> : <WhatsappLogo size={13} weight="fill" />}
              {curso.cta_texto}
            </a>
          </div>
        </div>
      </article>

      {mounted && createPortal(
        <AnimatePresence>
          {open && <CourseModal curso={curso} onClose={() => setOpen(false)} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
