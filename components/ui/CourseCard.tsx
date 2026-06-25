"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { MapPin, Calendar, Clock, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Curso } from "@/lib/types";
import { CourseModal } from "./CourseModal";

const CATEGORIA_COLORS: Record<string, string> = {
  "Tecnico": "bg-[#c45c3a]/20 text-[#e8856a]",
  "Holistico": "bg-[#965e5d]/20 text-[#c48a89]",
  "Energetico": "bg-[#dfa82b]/20 text-[#dfa82b]",
  "Gabinete": "bg-[#fff7e8]/10 text-[#fff7e8]/70",
};

const PLACEHOLDER_SEEDS: Record<string, string> = {
  "Tecnico": "massage-therapy-hands",
  "Holistico": "holistic-nature-flowers",
  "Energetico": "crystals-energy-light",
  "Gabinete": "therapy-room-calm",
};

export function CourseCard({ curso }: { curso: Curso }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const colorClass = CATEGORIA_COLORS[curso.categoria] ?? "bg-[#fff7e8]/10 text-[#fff7e8]/70";
  const imageSeed = PLACEHOLDER_SEEDS[curso.categoria] ?? "wellness-holistic";
  const imageSrc = curso.imagen || `https://picsum.photos/seed/${imageSeed}/600/400`;
  const ctaHref =
    curso.cta_tipo === "formulario" && curso.cta_link
      ? curso.cta_link
      : `https://wa.me/5491123467200?text=Hola+Luz%2C+me+interesa+el+curso+${encodeURIComponent(curso.nombre)}`;
  const isExternal = curso.cta_tipo === "formulario";

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="group cursor-pointer bg-[#fff7e8]/90 backdrop-blur-sm border border-[#2a2522]/8 rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_8px_32px_rgba(42,37,34,0.12)] hover:-translate-y-1 transition-all duration-300"
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
          {curso.categoria && (
            <span className={`absolute top-3 left-3 font-[family-name:var(--font-inter)] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full ${colorClass}`}>
              {curso.categoria}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5">
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

          {curso.descripcion && (
            <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/60 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
              {curso.descripcion}
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
