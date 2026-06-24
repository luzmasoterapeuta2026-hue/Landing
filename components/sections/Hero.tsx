"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

const ORBS = [
  { w: 420, h: 420, left: "2%",  top: "5%",  color: "#965e5d", blur: 100, opacity: 0.10, dur: 13, kx: [0, 45, -10,  0], ky: [0, 20, 40,  0] },
  { w: 280, h: 280, left: "68%", top: "50%", color: "#dfa82b", blur: 80,  opacity: 0.09, dur: 10, kx: [0, -30, 10,  0], ky: [0, -40, 15, 0] },
  { w: 220, h: 220, left: "82%", top: "5%",  color: "#c45c3a", blur: 65,  opacity: 0.08, dur: 12, kx: [0, -20, 30,  0], ky: [0, 30, -20, 0] },
  { w: 320, h: 320, left: "50%", top: "72%", color: "#965e5d", blur: 90,  opacity: 0.07, dur: 15, kx: [0, 25, -15, 0], ky: [0, -25, 10, 0] },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.14, duration: 0.72, ease: EASE },
  },
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, -90]);

  return (
    <section ref={sectionRef} className="min-h-[100dvh] bg-[#fff7e8] grid md:grid-cols-2 pt-20 relative overflow-hidden">
      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.left,
            top: orb.top,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
          }}
          animate={{ x: orb.kx, y: orb.ky }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Left col: content */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 md:py-0 order-2 md:order-1">
        <motion.p
          variants={stagger(0)}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.22em] uppercase text-[#dfa82b] mb-6"
        >
          Alquimia y Bienestar
        </motion.p>

        <motion.h1
          variants={stagger(1)}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-cormorant)] text-[#2a2522] font-light leading-[1.05] mb-6"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
        >
          Eleva tu practica.
          <br />
          <em className="text-[#965e5d]">Sana desde la raiz.</em>
        </motion.h1>

        <motion.p
          variants={stagger(2)}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-inter)] text-[#2a2522]/65 text-base leading-relaxed max-w-[45ch] mb-10"
        >
          Formacion holistica para terapeutas que quieren ir mas profundo,
          tecnica, energia y sabiduria ancestral en un solo camino.
        </motion.p>

        <motion.div
          variants={stagger(3)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#cursos"
            className="font-[family-name:var(--font-inter)] text-sm bg-[#965e5d] text-[#fff7e8] px-8 py-3.5 rounded-full text-center hover:bg-[#7d4e4d] active:scale-[0.98] transition-all duration-200"
          >
            Ver cursos
          </a>
          <a
            href="https://wa.me/5491123467200?text=Hola+Luz%2C+quiero+saber+mas+sobre+los+cursos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-inter)] text-sm border border-[#965e5d]/40 text-[#965e5d] px-8 py-3.5 rounded-full text-center hover:border-[#965e5d] hover:bg-[#965e5d]/5 active:scale-[0.98] transition-all duration-200"
          >
            Escribir por WhatsApp
          </a>
        </motion.div>

        <motion.div
          variants={stagger(4)}
          initial="hidden"
          animate="visible"
          className="mt-16 hidden md:flex items-center gap-2 text-[#2a2522]/30"
        >
          <ArrowDown size={14} weight="light" />
          <span className="font-[family-name:var(--font-inter)] text-[11px] tracking-widest uppercase">
            Explorar
          </span>
        </motion.div>
      </div>

      {/* Right col: image with parallax */}
      <div className="relative min-h-[50vw] md:min-h-0 order-1 md:order-2 overflow-hidden">
        <motion.div className="absolute -top-16 -bottom-16 left-0 right-0" style={{ y: imageY }}>
          <Image
            src="https://picsum.photos/seed/luz-holistic-crystals-candles/900/1100"
            alt="Espacio de sanacion holistica"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2522]/10 via-transparent to-[#fff7e8]/30 md:bg-gradient-to-r md:from-[#fff7e8]/20 md:via-transparent md:to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
