import Image from "next/image";
import { InstagramLogo, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/luz_masoterapeuta", Icon: InstagramLogo },
  { label: "TikTok", href: "https://www.tiktok.com/@luz_masoterapia_holistik", Icon: TiktokLogo },
  { label: "WhatsApp", href: "https://wa.me/5491123467200", Icon: WhatsappLogo },
];

export function Footer() {
  return (
    <footer className="bg-[#965e5d] px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-10">

        {/* Logo */}
        <a href="/" aria-label="LuzMasoterapeuta - inicio" className="flex-shrink-0">
          <Image
            src="/logo/trace.svg"
            alt="LuzMasoterapeuta"
            width={300}
            height={300}
            style={{ width: "18.75rem", height: "18.75rem" }}
          />
        </a>

        {/* Right column */}
        <div className="flex flex-col items-center md:items-end gap-6 pb-2 w-full md:w-auto">

          {/* Social icons with labels */}
          <div className="flex items-end gap-8">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex flex-col items-center gap-2 text-[#fcfdfb]/45 hover:text-[#fcfdfb] transition-colors duration-200"
              >
                <Icon size={26} weight="light" />
                <span className="font-[family-name:var(--font-inter)] text-[10px] md:text-[13px] tracking-[0.15em] uppercase">
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#fcfdfb]/15" />

          {/* Nosterlabs chip */}
          <a
            href="https://nosterlabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#fcfdfb]/25 rounded-full px-4 py-2
              font-[family-name:var(--font-inter)] text-[11px] md:text-[13px] tracking-wide text-[#fcfdfb]/50
              hover:border-[#dfa82b]/70 hover:text-[#dfa82b] hover:bg-[#dfa82b]/10 hover:scale-[1.05]
              active:scale-95 transition-all duration-300"
          >
            ⚡ Powered by <strong className="font-semibold">Nosterlabs</strong>
          </a>

          {/* Legal links */}
          <div className="flex gap-4">
            <a
              href="/privacidad"
              className="font-[family-name:var(--font-inter)] text-[#fcfdfb]/35 text-[11px] md:text-[13px] hover:text-[#fcfdfb]/70 transition-colors duration-200"
            >
              Política de Privacidad
            </a>
            <span className="text-[#fcfdfb]/20 text-[11px]">·</span>
            <a
              href="/terminos"
              className="font-[family-name:var(--font-inter)] text-[#fcfdfb]/35 text-[11px] md:text-[13px] hover:text-[#fcfdfb]/70 transition-colors duration-200"
            >
              Términos y Condiciones
            </a>
          </div>

          {/* Copyright */}
          <p className="font-[family-name:var(--font-inter)] text-[#fcfdfb]/30 text-[11px] md:text-[13px]">
            &copy; {new Date().getFullYear()} LuzMasoterapeuta. Todos los derechos reservados.
          </p>

        </div>
      </div>
    </footer>
  );
}
