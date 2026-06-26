"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FadeUp } from "@/components/ui/FadeUp";

const PILLARS = [
  { n: "Masoterapia", l: "Clinica" },
  { n: "Energia", l: "Ancestral" },
  { n: "Biodecodificacion", l: "Emocional" },
];

export function Bio() {
  return (
    <section
      id="sobre-luz"
      className="bg-[#2a2522] scroll-mt-20 relative overflow-hidden flex flex-col md:block"
    >
      {/* Image column: normal flow on mobile, absolute left half on desktop */}
      <div className="order-2 relative h-[480px] md:absolute md:inset-y-0 md:left-0 md:w-1/2 md:h-auto">
        {/* Aura */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, #dfa82b90 0%, #dfa82b44 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Image */}
        <motion.div
          className="absolute inset-x-[10%] top-0 bottom-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/about/luz-image.webp"
            alt="Luz Masoterapeuta"
            fill
            className="object-contain object-bottom"
            style={{ objectPosition: "center bottom" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      {/* Content column: offset right on desktop */}
      <div className="order-1 md:ml-[50%] pt-16 pb-2 md:py-16 md:min-h-[calc(100dvh-5rem)] flex items-center px-6 md:px-16">
        <div className="w-full max-w-xl">
          <FadeUp delay={0.1}>
            <p className="font-[family-name:var(--font-inter)] text-[10px] md:text-[13px] tracking-[0.22em] uppercase text-[#dfa82b] mb-5">
              Sobre Luz
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-[#fff7e8] font-light leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              El linaje del tacto
            </h2>
          </FadeUp>

          <FadeUp delay={0.32} className="space-y-4 font-[family-name:var(--font-inter)] text-[#fff7e8]/65 text-[15px] md:text-[18px] leading-relaxed">
            <p>
              La masoterapia no es solo una tecnica fisica —
              es <em className="text-[#dfa82b] not-italic font-medium">un puente entre el cuerpo, la emocion y la energia.</em>
            </p>
            <p>
              Combino <em className="text-[#dfa82b] not-italic font-medium">rigor anatomico</em> con
              la sabiduria ancestral de sobadoras y curanderas de tradicion.
              Porque el cuerpo no es una maquina: es <em className="text-[#dfa82b] not-italic font-medium">un mapa viviente de emociones.</em>
            </p>
            <p>
              Formo terapeutas que ofrecen sesiones que no solo alivian —
              que <em className="text-[#dfa82b] not-italic font-medium">transforman desde la raiz.</em>
            </p>
          </FadeUp>

          <FadeUp delay={0.45} className="mt-8 pt-8 border-t border-[#fff7e8]/10 flex flex-wrap gap-6 justify-center md:justify-start">
            {PILLARS.map((item, i) => (
              <motion.div
                key={item.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <p className="font-[family-name:var(--font-cormorant)] text-[#dfa82b] text-xl md:text-2xl font-semibold">
                  {item.n}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[#fff7e8]/45 text-[11px] md:text-[13px] uppercase tracking-wider">
                  {item.l}
                </p>
              </motion.div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
