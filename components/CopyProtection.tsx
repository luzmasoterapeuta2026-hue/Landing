"use client";
import { useEffect } from "react";

export function CopyProtection() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    const handleKey = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "s", "u", "a", "p"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
      if (e.key === "F12") e.preventDefault();
    };

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return null;
}
