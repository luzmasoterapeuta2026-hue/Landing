"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { motion, type PanInfo } from "motion/react";
import type { Curso } from "@/lib/types";
import { CourseCard } from "@/components/ui/CourseCard";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

const GAP = 24;
const VISIBLE = 3;
const AUTO_MS = 4500;
const EASE = [0.22, 1, 0.36, 1] as const;

function DesktopCarousel({ courses }: { courses: Curso[] }) {
  const N = courses.length;
  const looped = useMemo(() => [...courses, ...courses, ...courses], [courses]);
  const START = N; // begin in middle copy

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [idx, setIdx] = useState(START);
  const [instant, setInstant] = useState(false);

  // Sync measurement before first paint to avoid x-jump flash
  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current)
        setCardW((containerRef.current.offsetWidth - GAP * (VISIBLE - 1)) / VISIBLE);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => p + 1), AUTO_MS);
    return () => clearInterval(t);
  }, []);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = cardW * 0.25;
    if (info.offset.x < -threshold) setIdx((p) => p + 1);
    else if (info.offset.x > threshold) setIdx((p) => p - 1);
  }

  function handleAnimationComplete() {
    if (instant) {
      setInstant(false);
      return;
    }
    // Silent reset to keep looping seamlessly
    if (idx >= N * 2) {
      setInstant(true);
      setIdx(idx - N);
    } else if (idx < N) {
      setInstant(true);
      setIdx(idx + N);
    }
  }

  const activeDot = ((idx % N) + N) % N;

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -999999, right: 999999 }}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={{ x: cardW > 0 ? idx * -(cardW + GAP) : 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.55, ease: EASE }}
          onAnimationComplete={handleAnimationComplete}
        >
          {looped.map((curso, i) => (
            <div key={i} style={{ width: cardW || undefined }} className="flex-none">
              <CourseCard curso={curso} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-10">
        <button
          onClick={() => setIdx((p) => p - 1)}
          aria-label="Anterior"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[#965e5d]/25 text-[#965e5d] hover:bg-[#965e5d]/8 transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
        </button>

        <div className="flex items-center gap-2">
          {courses.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx((p) => p - activeDot + i)}
              aria-label={`Posición ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeDot
                  ? "w-6 h-2 bg-[#965e5d]"
                  : "w-2 h-2 bg-[#965e5d]/25 hover:bg-[#965e5d]/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setIdx((p) => p + 1)}
          aria-label="Siguiente"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[#965e5d]/25 text-[#965e5d] hover:bg-[#965e5d]/8 transition-colors"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}

function MobileCarousel({ courses }: { courses: Curso[] }) {
  const N = courses.length;
  const looped = useMemo(() => [...courses, ...courses, ...courses], [courses]);
  const START = N;

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [idx, setIdx] = useState(START);
  const [instant, setInstant] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current)
        setCardW(containerRef.current.offsetWidth * 0.8);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = cardW * 0.25;
    if (info.offset.x < -threshold) setIdx((p) => p + 1);
    else if (info.offset.x > threshold) setIdx((p) => p - 1);
  }

  function handleAnimationComplete() {
    if (instant) { setInstant(false); return; }
    if (idx >= N * 2) { setInstant(true); setIdx(idx - N); }
    else if (idx < N) { setInstant(true); setIdx(idx + N); }
  }

  // Center the active card: offset = (containerW - cardW) / 2 = cardW * 0.125
  const offset = cardW * 0.125;
  const activeDot = ((idx % N) + N) % N;

  return (
    <div>
      <div ref={containerRef} className="-mx-6 overflow-hidden cursor-grab active:cursor-grabbing select-none pb-4">
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -999999, right: 999999 }}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={{ x: cardW > 0 ? offset - idx * (cardW + GAP) : 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          onAnimationComplete={handleAnimationComplete}
        >
          {looped.map((curso, i) => (
            <div key={i} style={{ width: cardW || undefined }} className="flex-none">
              <CourseCard curso={curso} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => setIdx((p) => p - 1)}
          aria-label="Anterior"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[#965e5d]/25 text-[#965e5d] hover:bg-[#965e5d]/8 transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <div className="flex items-center gap-2">
          {courses.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx((p) => p - activeDot + i)}
              aria-label={`Posición ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeDot
                  ? "w-6 h-2 bg-[#965e5d]"
                  : "w-2 h-2 bg-[#965e5d]/25 hover:bg-[#965e5d]/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx((p) => p + 1)}
          aria-label="Siguiente"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[#965e5d]/25 text-[#965e5d] hover:bg-[#965e5d]/8 transition-colors"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}

export function CourseGrid({ courses }: { courses: Curso[] }) {
  if (courses.length === 0)
    return <ComingSoon label="Los proximos cursos estaran disponibles en breve." />;

  return (
    <>
      <div className="md:hidden">
        <MobileCarousel courses={courses} />
      </div>
      <div className="hidden md:block">
        <DesktopCarousel courses={courses} />
      </div>
    </>
  );
}
