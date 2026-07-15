import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const WA_HREF =
  "https://wa.me/5491123467200?text=Hola%20Luz,%20quiero%20contactarte.";

export function FloatingWhatsApp() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[150] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      {/* Soft pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" style={{ animationDuration: "2.6s" }} />
      <WhatsappLogo size={30} weight="fill" className="relative z-10" />
    </a>
  );
}
