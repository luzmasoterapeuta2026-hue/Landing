"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Curso } from "@/lib/types";
import { CourseCard } from "@/components/ui/CourseCard";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

export function CourseGrid({ courses }: { courses: Curso[] }) {
  const [page, setPage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (mounted) setPage(0);
  }, [isMobile, mounted]);

  // Track the tallest grid height to prevent layout shifts
  useEffect(() => {
    if (!gridRef.current) return;
    const h = gridRef.current.offsetHeight;
    if (h > 0) setMinHeight((prev) => Math.max(prev ?? 0, h));
  });

  if (courses.length === 0) {
    return <ComingSoon label="Los proximos cursos estaran disponibles en breve." />;
  }

  const pageSize = mounted && isMobile ? 3 : 6;
  const totalPages = Math.ceil(courses.length / pageSize);
  const visible = courses.slice(page * pageSize, (page + 1) * pageSize);

  function goTo(p: number) {
    setPage(p);
    document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div className="relative" style={{ minHeight }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${page}-${pageSize}`}
            ref={gridRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {visible.map((curso, i) => (
              <motion.div
                key={curso.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <CourseCard curso={curso} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => goTo(Math.max(0, page - 1))}
            disabled={page === 0}
            aria-label="Página anterior"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#965e5d]/25 text-[#965e5d] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#965e5d]/8 transition-colors"
          >
            <CaretLeft size={16} weight="bold" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Página ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-6 h-2 bg-[#965e5d]"
                    : "w-2 h-2 bg-[#965e5d]/25 hover:bg-[#965e5d]/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            aria-label="Página siguiente"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#965e5d]/25 text-[#965e5d] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#965e5d]/8 transition-colors"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
