"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";

const NAV = [
  { label: "Cursos", href: "#cursos" },
  { label: "Sobre Luz", href: "#sobre-luz" },
  { label: "Videos", href: "#videos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#965e5d] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.18)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" aria-label="Solo Luz - inicio">
          <Image
            src="/logo/trace.svg"
            alt="Solo Luz"
            width={52}
            height={52}
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-[family-name:var(--font-inter)] text-sm text-[#fcfdfb]/70 hover:text-[#fcfdfb] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.me/5491123467200?text=Hola+Luz%2C+quiero+saber+mas+sobre+los+cursos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-inter)] text-sm bg-[#dfa82b] text-[#2a2522] px-5 py-2 rounded-full font-medium hover:bg-[#c8981f] active:scale-[0.98] transition-all duration-200"
          >
            Contacto
          </a>
        </nav>

        <button
          className="md:hidden text-[#fcfdfb] p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
        >
          {open ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#7d4e4d] border-t border-[#fcfdfb]/10 px-6 py-6 flex flex-col gap-5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-inter)] text-base text-[#fcfdfb]/80 hover:text-[#fcfdfb] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.me/5491123467200?text=Hola+Luz%2C+quiero+saber+mas+sobre+los+cursos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-inter)] text-sm bg-[#dfa82b] text-[#2a2522] px-5 py-3 rounded-full text-center font-medium"
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  );
}
