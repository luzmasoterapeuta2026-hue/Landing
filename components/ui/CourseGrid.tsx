"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { motion, type PanInfo } from "motion/react";
import type { Curso } from "@/lib/types";
import { CourseCard } from "@/components/ui/CourseCard";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { useLiveSheets } from "@/lib/useLiveSheets";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

const GAP = 24;
const AUTO_MS = 4500;
const EASE = [0.22, 1, 0.36, 1] as const;

function DesktopCarousel({ courses }: { courses: Curso[] }) {
  const VISIBLE = 3;
  const N = courses.length;
  const looped = useMemo(() => [...courses, ...courses, ...courses], [courses]);
  const START = N;

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [idx, setIdx] = useState(START);
  const [instant, setInstant] = useState(false);

  const idxRef       = useRef(START);
  const instantRef   = useRef(false);
  const animatingRef = useRef(false);
  const pauseUntilRef = useRef(0);

  function commitIdx(n: number) { idxRef.current = n; setIdx(n); }
  function commitInstant(v: boolean) { instantRef.current = v; setInstant(v); }
  function pauseAutoAdvance() { pauseUntilRef.current = Date.now() + 4000; }

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current)
        setCardW((containerRef.current.offsetWidth - GAP * (VISIBLE - 1)) / VISIBLE);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      if (!animatingRef.current) {
        animatingRef.current = true;
        commitIdx(idxRef.current + 1);
      }
    }, AUTO_MS);
    return () => clearInterval(t);
  }, []);

  function goNext() {
    if (animatingRef.current) return;
    pauseAutoAdvance();
    animatingRef.current = true;
    commitIdx(idxRef.current + 1);
  }

  function goPrev() {
    if (animatingRef.current) return;
    pauseAutoAdvance();
    animatingRef.current = true;
    commitIdx(idxRef.current - 1);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    pauseAutoAdvance();
    const threshold = cardW * 0.25;
    if (info.offset.x < -threshold) commitIdx(idxRef.current + 1);
    else if (info.offset.x > threshold) commitIdx(idxRef.current - 1);
    else animatingRef.current = false;
  }

  function handleAnimationComplete() {
    const current = idxRef.current;
    if (instantRef.current) {
      commitInstant(false);
      animatingRef.current = false;
      return;
    }
    if (current >= N * 2) { commitInstant(true); commitIdx(current - N); }
    else if (current < N) { commitInstant(true); commitIdx(current + N); }
    else { animatingRef.current = false; }
  }

  const activeDot = ((idx % N) + N) % N;

  const btnClass = "w-11 h-11 flex items-center justify-center rounded-full border border-[#dfa82b]/40 text-[#dfa82b] hover:bg-[#dfa82b]/10 transition-colors cursor-pointer";

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing select-none py-3">
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -999999, right: 999999 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => { animatingRef.current = true; }}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={{ x: cardW > 0 ? idxRef.current * -(cardW + GAP) : 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.32, ease: EASE }}
          onAnimationComplete={handleAnimationComplete}
        >
          {looped.map((curso, i) => (
            <div key={i} style={{ width: cardW || undefined }} className="flex-none">
              <CourseCard curso={curso} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <button onClick={goPrev} aria-label="Anterior" className={btnClass}>
          <CaretLeft size={16} weight="bold" />
        </button>

        <span className="font-[family-name:var(--font-inter)] text-sm text-[#fff7e8]/60 tabular-nums min-w-[3rem] text-center select-none">
          <span className="text-[#dfa82b]">{activeDot + 1}</span><span className="mx-1 text-[#dfa82b]/30">/</span><span className="text-[#dfa82b]/50">{N}</span>
        </span>

        <button onClick={goNext} aria-label="Siguiente" className={btnClass}>
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

  const idxRef       = useRef(START);
  const instantRef   = useRef(false);
  const animatingRef = useRef(false);
  const pauseUntilRef = useRef(0);

  function commitIdx(n: number) { idxRef.current = n; setIdx(n); }
  function commitInstant(v: boolean) { instantRef.current = v; setInstant(v); }
  function pauseAutoAdvance() { pauseUntilRef.current = Date.now() + 4000; }

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current)
        setCardW(containerRef.current.offsetWidth * 0.8);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function goNext() {
    if (animatingRef.current) return;
    pauseAutoAdvance();
    animatingRef.current = true;
    commitIdx(idxRef.current + 1);
  }

  function goPrev() {
    if (animatingRef.current) return;
    pauseAutoAdvance();
    animatingRef.current = true;
    commitIdx(idxRef.current - 1);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    pauseAutoAdvance();
    const threshold = cardW * 0.25;
    if (info.offset.x < -threshold) commitIdx(idxRef.current + 1);
    else if (info.offset.x > threshold) commitIdx(idxRef.current - 1);
    else animatingRef.current = false;
  }

  function handleAnimationComplete() {
    const current = idxRef.current;
    if (instantRef.current) {
      commitInstant(false);
      animatingRef.current = false;
      return;
    }
    if (current >= N * 2) { commitInstant(true); commitIdx(current - N); }
    else if (current < N) { commitInstant(true); commitIdx(current + N); }
    else { animatingRef.current = false; }
  }

  const offset = cardW * 0.125;
  const activeDot = ((idx % N) + N) % N;

  const btnClass = "w-11 h-11 flex items-center justify-center rounded-full border border-[#dfa82b]/40 text-[#dfa82b] hover:bg-[#dfa82b]/10 transition-colors cursor-pointer";

  return (
    <div>
      <div ref={containerRef} className="-mx-6 overflow-hidden cursor-grab active:cursor-grabbing select-none pt-3 pb-4">
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -999999, right: 999999 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => { animatingRef.current = true; }}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={{ x: cardW > 0 ? offset - idx * (cardW + GAP) : 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.32, ease: EASE }}
          onAnimationComplete={handleAnimationComplete}
        >
          {looped.map((curso, i) => (
            <div key={i} style={{ width: cardW || undefined }} className="flex-none">
              <CourseCard curso={curso} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={goPrev} aria-label="Anterior" className={btnClass}>
          <CaretLeft size={16} weight="bold" />
        </button>

        <span className="font-[family-name:var(--font-inter)] text-sm text-[#fff7e8]/60 tabular-nums min-w-[3rem] text-center select-none">
          <span className="text-[#dfa82b]">{activeDot + 1}</span><span className="mx-1 text-[#dfa82b]/30">/</span><span className="text-[#dfa82b]/50">{N}</span>
        </span>

        <button onClick={goNext} aria-label="Siguiente" className={btnClass}>
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}

export function CourseGrid({ courses }: { courses: Curso[] }) {
  const liveCourses = useLiveSheets<Curso>("cursos", courses);

  if (liveCourses.length === 0)
    return <ComingSoon label="Los proximos cursos estaran disponibles en breve." />;

  return (
    <>
      <div className="md:hidden">
        <MobileCarousel courses={liveCourses} />
      </div>
      <div className="hidden md:block">
        <DesktopCarousel courses={liveCourses} />
      </div>
    </>
  );
}
