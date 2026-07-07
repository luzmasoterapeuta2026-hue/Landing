"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { X, MapPin, Calendar, Clock, Repeat, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Curso } from "@/lib/types";

const CATEGORIA_COLORS: Record<string, string> = {
  "Tecnico":    "bg-[#c45c3a]/10 text-[#c45c3a]",
  "Holistico":  "bg-[#965e5d]/10 text-[#965e5d]",
  "Energetico": "bg-[#dfa82b]/10 text-[#9a7020]",
  "Gabinete":   "bg-[#2a2522]/8 text-[#2a2522]/70",
};

const SERVICIO_COLOR = "bg-[#5c7a6b]/12 text-[#4a6356]";

function badgeFor(curso: Curso): { label: string; colorClass: string } | null {
  if (curso.tipo === "servicio")
    return { label: curso.categoria || "Servicio", colorClass: SERVICIO_COLOR };
  if (!curso.categoria) return null;
  return { label: curso.categoria, colorClass: CATEGORIA_COLORS[curso.categoria] ?? "bg-[#965e5d]/10 text-[#965e5d]" };
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

export function CourseModal({ curso, onClose }: { curso: Curso; onClose: () => void }) {
  const imageSrc = isValidImageSrc(curso.imagen) ? curso.imagen! : COURSE_FALLBACK_IMAGE;
  const badge = badgeFor(curso);
  const waIntro = curso.tipo === "servicio" ? "me+interesa+el+servicio" : "me+interesa+el+curso";
  const ctaHref =
    curso.cta_tipo === "formulario" && isSafeUrl(curso.cta_link)
      ? curso.cta_link
      : `https://wa.me/5491123467200?text=Hola+Luz%2C+${waIntro}+${encodeURIComponent(curso.nombre)}`;
  const isExternal = curso.cta_tipo === "formulario";

  // Ref so the lock effect can stay mount-only — parent re-renders (carousel autoplay)
  // must NOT tear down / rebuild the scroll lock, or Lenis briefly restarts mid-scroll.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    // Desktop: Lenis.stop() freezes scroll in place (preserves position, no jump).
    lenis?.stop();

    // Mobile (no Lenis): overflow:hidden holds the page WITHOUT resetting scrollY,
    // so there is no position to restore and nothing to snap back to.
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCloseRef.current(); };
    document.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prevOverflow;
      lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#2a2522]/65 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 bg-[#fff7e8] w-full md:max-w-xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col max-h-[90dvh]"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-52 md:h-64 flex-none">
          <Image
            src={imageSrc}
            alt={curso.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2522]/55 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#2a2522]/50 text-[#fff7e8] hover:bg-[#2a2522]/80 transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
          {badge && (
            <span className={`absolute bottom-4 left-4 font-[family-name:var(--font-inter)] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full ${badge.colorClass}`}>
              {badge.label}
            </span>
          )}
        </div>

        {/* Scrollable content */}
        <div data-lenis-prevent className="flex flex-col overflow-y-auto overscroll-contain p-6 gap-4">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[#2a2522] text-3xl md:text-4xl font-medium leading-snug">
            {curso.nombre}
          </h2>

          {curso.subtitulo && (
            <p className="font-[family-name:var(--font-cormorant)] text-[#965e5d] text-lg md:text-xl italic leading-snug -mt-1">
              {curso.subtitulo}
            </p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {curso.modalidad && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-[#2a2522]/60">
                <MapPin size={13} weight="fill" className="text-[#965e5d]" /> {curso.modalidad}
              </span>
            )}
            {curso.frecuencia && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-[#2a2522]/60">
                <Repeat size={13} weight="bold" className="text-[#965e5d]" /> {curso.frecuencia}
              </span>
            )}
            {curso.fecha && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-[#2a2522]/60">
                <Calendar size={13} weight="fill" className="text-[#965e5d]" /> {curso.fecha}
              </span>
            )}
            {curso.duracion && (
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-[#2a2522]/60">
                <Clock size={13} weight="fill" className="text-[#965e5d]" /> {curso.duracion}
              </span>
            )}
          </div>

          <div className="h-px bg-[#965e5d]/10" />

          {curso.descripcion && (
            <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/70 text-sm leading-relaxed whitespace-pre-line">
              {curso.descripcion}
            </p>
          )}

          {curso.bullets.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {curso.bullets_titulo && (
                <h3 className="font-[family-name:var(--font-cormorant)] text-[#2a2522] text-xl font-medium">
                  {curso.bullets_titulo}
                </h3>
              )}
              <ul className="flex flex-col gap-2">
                {curso.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5 font-[family-name:var(--font-inter)] text-[#2a2522]/70 text-sm leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#dfa82b]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {curso.dirigido && (
            <div className="flex flex-col gap-1.5">
              <h3 className="font-[family-name:var(--font-cormorant)] text-[#2a2522] text-xl font-medium">
                ¿A quién está dirigido?
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/70 text-sm leading-relaxed">
                {curso.dirigido}
              </p>
            </div>
          )}

          {curso.cita && (
            <blockquote className="border-l-2 border-[#dfa82b] pl-4 font-[family-name:var(--font-cormorant)] text-[#2a2522]/75 text-lg italic leading-snug">
              {curso.cita}
            </blockquote>
          )}

          <div className="flex items-center justify-between pt-2">
            {curso.precio && (
              <span className="font-[family-name:var(--font-cormorant)] text-[#dfa82b] text-2xl font-semibold">
                {curso.precio}
              </span>
            )}
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm bg-[#965e5d] text-[#fff7e8] px-6 py-3 rounded-full font-medium hover:bg-[#7d4e4d] active:scale-[0.98] transition-all duration-200"
            >
              {isExternal ? <ArrowUpRight size={15} weight="bold" /> : <WhatsappLogo size={15} weight="fill" />}
              {curso.cta_texto}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
