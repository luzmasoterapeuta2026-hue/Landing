"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { motion, type PanInfo } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Video } from "@/lib/types";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

const GAP = 24;
const AUTO_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

function Carousel({
  videos,
  visible,
  cardWidthFn,
}: {
  videos: Video[];
  visible: number;
  cardWidthFn: (containerW: number) => number;
}) {
  const N = videos.length;
  const looped = useMemo(() => [...videos, ...videos, ...videos], [videos]);
  const START = N;

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [idx, setIdx] = useState(START);
  const [instant, setInstant] = useState(false);

  // Refs always in sync with state — updated synchronously, never via useEffect
  const idxRef   = useRef(START);
  const instantRef = useRef(false);
  const animatingRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  // Synchronous setters — keep ref and state in lockstep
  function commitIdx(n: number) {
    idxRef.current = n;
    setIdx(n);
  }
  function commitInstant(v: boolean) {
    instantRef.current = v;
    setInstant(v);
  }

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current)
        setCardW(cardWidthFn(containerRef.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cardWidthFn]);

  useEffect(() => {
    if (N <= visible) return;
    const t = setInterval(() => {
      if (!animatingRef.current) {
        animatingRef.current = true;
        commitIdx(idxRef.current + 1);
      }
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [N, visible]);

  function goNext() {
    if (animatingRef.current) return;
    animatingRef.current = true;
    commitIdx(idxRef.current + 1);
  }

  function goPrev() {
    if (animatingRef.current) return;
    animatingRef.current = true;
    commitIdx(idxRef.current - 1);
  }

  function handleDragStart() {
    setDragging(true);
    // Block auto-advance while user is dragging
    animatingRef.current = true;
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    setDragging(false);
    const threshold = cardW * 0.25;
    if (info.offset.x < -threshold) {
      commitIdx(idxRef.current + 1);
    } else if (info.offset.x > threshold) {
      commitIdx(idxRef.current - 1);
    } else {
      // No threshold crossed — snap back, release lock
      animatingRef.current = false;
    }
  }

  function handleAnimationComplete() {
    const current = idxRef.current;
    const isInstant = instantRef.current;

    if (isInstant) {
      commitInstant(false);
      animatingRef.current = false;
      return;
    }
    if (current >= N * 2) {
      commitInstant(true);
      commitIdx(current - N);
    } else if (current < N) {
      commitInstant(true);
      commitIdx(current + N);
    } else {
      animatingRef.current = false;
    }
  }

  const offset = visible === 1 ? cardW * 0.125 : 0;
  const activeDot = ((idx % N) + N) % N;
  const x = cardW > 0 ? offset - idx * (cardW + GAP) : 0;

  const btnClass =
    "w-11 h-11 flex items-center justify-center rounded-full border border-[#dfa82b]/40 text-[#dfa82b] hover:bg-[#dfa82b]/10 transition-colors cursor-pointer";

  return (
    <div>
      <div
        ref={containerRef}
        className={`overflow-hidden select-none ${
          visible === 1
            ? "-mx-6 cursor-grab active:cursor-grabbing"
            : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -999999, right: 999999 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={{ x }}
          transition={
            instant
              ? { duration: 0 }
              : { duration: 0.55, ease: EASE }
          }
          onAnimationComplete={handleAnimationComplete}
        >
          {looped.map((video, i) => (
            <div
              key={i}
              style={{ width: cardW || undefined }}
              className="flex-none relative"
            >
              <VideoEmbed video={video} />
              {dragging && <div className="absolute inset-0 z-50" />}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={goPrev} aria-label="Anterior" className={btnClass}>
          <CaretLeft size={16} weight="bold" />
        </button>

        <span className="font-[family-name:var(--font-inter)] text-sm text-[#fff7e8]/60 tabular-nums min-w-[3rem] text-center select-none">
          <span className="text-[#dfa82b]">{activeDot + 1}</span>
          <span className="mx-1 text-[#dfa82b]/30">/</span>
          <span className="text-[#dfa82b]/50">{N}</span>
        </span>

        <button onClick={goNext} aria-label="Siguiente" className={btnClass}>
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}

export function VideoCarousel({ videos }: { videos: Video[] }) {
  const desktopCardW = (w: number) => (w - GAP * 2) / 3;
  const mobileCardW  = (w: number) => w * 0.8;

  return (
    <>
      <div className="md:hidden">
        <Carousel videos={videos} visible={1} cardWidthFn={mobileCardW} />
      </div>
      <div className="hidden md:block">
        <Carousel videos={videos} visible={3} cardWidthFn={desktopCardW} />
      </div>
    </>
  );
}
