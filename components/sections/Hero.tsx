"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";

const ORBS = [
  { w: 500, h: 500, left: "2%", top: "5%", color: "#dfa82b", blur: 80, opacity: 0.42, dur: 13, fdur: 22.0, kx: [0, 45, -10, 0], ky: [0, 20, 40, 0], factor: 0.10 },
  { w: 340, h: 340, left: "68%", top: "50%", color: "#c45c3a", blur: 60, opacity: 0.38, dur: 10, fdur: 18.0, kx: [0, -30, 10, 0], ky: [0, -40, 15, 0], factor: 0.16 },
  { w: 280, h: 280, left: "82%", top: "5%", color: "#c45c3a", blur: 50, opacity: 0.35, dur: 12, fdur: 26.0, kx: [0, -20, 30, 0], ky: [0, 30, -20, 0], factor: 0.13 },
  { w: 380, h: 380, left: "50%", top: "72%", color: "#dfa82b", blur: 70, opacity: 0.36, dur: 15, fdur: 20.0, kx: [0, 25, -15, 0], ky: [0, -25, 10, 0], factor: 0.08 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 18, filter: "blur(12px)", scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { delay: 0.2 + i * 0.16, duration: 0.85, ease: EASE },
  },
});

function OrbItem({
  orb,
  index,
  springX,
  springY,
}: {
  orb: (typeof ORBS)[0];
  index: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const ox = useTransform(springX, (v) => v * orb.factor);
  const oy = useTransform(springY, (v) => v * orb.factor);

  return (
    <motion.div
      className="absolute pointer-events-none z-[1]"
      style={{ left: orb.left, top: orb.top, x: ox, y: oy }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 1.8 + index * 0.25, ease: EASE }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: orb.w,
          height: orb.h,
          background: orb.color,
          filter: `blur(${orb.blur}px)`,
        }}
        animate={{
          x: orb.kx,
          y: orb.ky,
          opacity: [
            orb.opacity,
            orb.opacity * 0.25,
            orb.opacity * 0.9,
            orb.opacity * 0.1,
            orb.opacity * 0.85,
            orb.opacity * 0.4,
            orb.opacity,
            orb.opacity * 0.15,
            orb.opacity,
          ],
        }}
        transition={{
          x: { duration: orb.dur, repeat: Infinity, ease: "easeInOut" },
          y: { duration: orb.dur, repeat: Infinity, ease: "easeInOut" },
          opacity: {
            duration: orb.fdur, repeat: Infinity, ease: "linear",
            times: [0, 0.08, 0.18, 0.3, 0.48, 0.65, 0.78, 0.9, 1]
          },
        }}
      />
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, -90]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] md:min-h-[100dvh] overflow-hidden bg-[#2a2522] md:bg-[#fff7e8] md:grid md:grid-cols-2 md:pt-20"
    >
      {/* Mobile only: hero background image + overlay */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/hero/hero-mobile.webp"
          alt="Espacio de sanacion holistica"
          fill
          className="object-cover object-bottom"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-[#2a2522]/75" />
      </div>

      {/* Floating orbs — react to mouse on desktop, float on both */}
      {ORBS.map((orb, i) => (
        <OrbItem key={i} orb={orb} index={i} springX={springX} springY={springY} />
      ))}

      {/* Text column */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 md:px-16 lg:px-24 py-20 md:py-0 min-h-[100svh] md:min-h-0">
        <motion.p
          variants={stagger(0)}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-inter)] text-[10px] md:text-[13px] tracking-[0.22em] uppercase text-[#dfa82b] mb-6"
        >
          Alquimia y Bienestar
        </motion.p>

        <motion.h1
          variants={stagger(1)}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-cormorant)] text-[#fff7e8] md:text-[#2a2522] font-light leading-[1.05] mb-6 text-[clamp(2.8rem,6vw,5rem)] md:text-[clamp(4rem,7vw,7rem)]"
        >
          Eleva tu practica.
          <br />
          <em className="text-[#dfa82b] md:text-[#965e5d]">Sana desde la raiz.</em>
        </motion.h1>

        <motion.p
          variants={stagger(2)}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-inter)] text-[#fff7e8]/75 md:text-[#2a2522]/65 text-base md:text-xl leading-relaxed max-w-[45ch] mb-10"
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
            className="font-[family-name:var(--font-inter)] text-sm bg-[#dfa82b] md:bg-[#965e5d] text-[#2a2522] md:text-[#fff7e8] px-8 py-3.5 rounded-full text-center font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            Ver cursos
          </a>
          <a
            href="https://wa.me/5491123467200?text=Hola+Luz%2C+quiero+saber+mas+sobre+los+cursos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-inter)] text-sm border border-[#fff7e8]/40 md:border-[#965e5d]/40 text-[#fff7e8] md:text-[#965e5d] px-8 py-3.5 rounded-full text-center hover:bg-[#fff7e8]/10 md:hover:bg-[#965e5d]/5 md:hover:border-[#965e5d] active:scale-[0.98] transition-all duration-200"
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
          <span className="text-sm leading-none">↓</span>
          <span className="font-[family-name:var(--font-inter)] text-[11px] tracking-widest uppercase">
            Explorar
          </span>
        </motion.div>
      </div>

      {/* Desktop right col: image with parallax + entrance animation */}
      <motion.div
        className="hidden md:block relative overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      >
        <motion.div className="absolute -top-16 -bottom-16 left-0 right-0" style={{ y: imageY }}>
          <Image
            src="/hero/hero-desktop.webp"
            alt="Espacio de sanacion holistica"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
