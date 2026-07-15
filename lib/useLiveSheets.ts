"use client";

import { useEffect, useRef, useState } from "react";

// Feature flag + interval are read from NEXT_PUBLIC_* vars, inlined at build time.
//   NEXT_PUBLIC_SHEETS_LIVE_REFRESH="true"  -> poll the API and update in place.
//   NEXT_PUBLIC_SHEETS_REFRESH_INTERVAL_MINUTES  -> poll cadence (default 60).
const LIVE_REFRESH_ENABLED =
  process.env.NEXT_PUBLIC_SHEETS_LIVE_REFRESH === "true";

const INTERVAL_MS =
  Math.max(1, Number(process.env.NEXT_PUBLIC_SHEETS_REFRESH_INTERVAL_MINUTES) || 60) *
  60_000;

/**
 * Seeds state with the server-rendered data and, when live refresh is enabled,
 * re-fetches it from `/api/sheets?type=<key>` on an interval so an open page
 * reflects Google Sheets edits without a manual reload.
 */
export function useLiveSheets<T>(key: "cursos" | "videos", initial: T[]): T[] {
  const [data, setData] = useState<T[]>(initial);
  const initialRef = useRef(initial);
  initialRef.current = initial;

  useEffect(() => {
    if (!LIVE_REFRESH_ENABLED) return;

    let cancelled = false;

    const tick = async () => {
      try {
        const res = await fetch(`/api/sheets?type=${key}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as unknown;
        if (!cancelled && Array.isArray(json)) setData(json as T[]);
      } catch {
        // Network hiccup — keep showing the last known data, try again next tick.
      }
    };

    const id = setInterval(tick, INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [key]);

  return LIVE_REFRESH_ENABLED ? data : initialRef.current;
}
