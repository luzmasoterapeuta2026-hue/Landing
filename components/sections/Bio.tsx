"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BookOpen } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/ui/FadeUp";

const PILLARS = [
  { n: "Masoterapia", l: "Clinica" },
  { n: "Energia", l: "Ancestral" },
  { n: "Biodecodificacion", l: "Emocional" },
];

export function Bio() {
  return (
    <section id="sobre-luz" className="bg-[#2a2522] py-16 md:py-0 px-6 scroll-mt-20 md:min-h-[calc(100dvh-5rem)] md:flex md:items-center">
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image with clip-path reveal */}
        <FadeUp className="relative">
          <motion.div
            className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden"
            initial={{ clipPath: "inset(100% 0 0 0 round 16px)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0 round 16px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Image
              src="/about/luz-image.webp"
              alt="Luz Masoterapeuta"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </motion.div>
        </FadeUp>

        {/* Content */}
        <div>
          <FadeUp delay={0.1}>
            <p className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.22em] uppercase text-[#dfa82b] mb-5">
              Sobre Luz
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-[#fff7e8] font-light leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              El linaje del tacto
            </h2>
          </FadeUp>

          <FadeUp delay={0.32} className="space-y-4 font-[family-name:var(--font-inter)] text-[#fff7e8]/65 text-[15px] leading-relaxed">
            <p>
              Soy Luz, Masoterapeuta Holistica. Entiendo la masoterapia no solo como una tecnica
              fisica, sino como un puente entre el cuerpo, la emocion y la energia.
            </p>
            <p>
              Mi enfoque integra el rigor anatomico de la ciencia con la sabiduria ancestral de
              las sobadoras y curanderas de tradicion. Porque el cuerpo no es una maquina,
              es un mapa viviente de emociones y energia.
            </p>
            <p>
              Cada formacion que ofrezco esta disenada para que puedas ofrecer sesiones que no
              solo alivian el cuerpo fisico, sino que nutren el espiritu.
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
                <p className="font-[family-name:var(--font-cormorant)] text-[#dfa82b] text-xl font-semibold">
                  {item.n}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[#fff7e8]/45 text-[11px] uppercase tracking-wider">
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
