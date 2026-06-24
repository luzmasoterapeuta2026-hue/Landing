import Image from "next/image";
import { InstagramLogo, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/luz_masoterapeuta",
    Icon: InstagramLogo,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@luz_masoterapeuta_holistik",
    Icon: TiktokLogo,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5491123467200",
    Icon: WhatsappLogo,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#965e5d] py-14 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Image
            src="/logo/trace.svg"
            alt="Solo Luz"
            width={60}
            height={60}
          />
          <p className="font-[family-name:var(--font-cormorant)] text-[#fcfdfb]/60 text-sm italic">
            Alquimia y Bienestar
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-5">
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#fcfdfb]/55 hover:text-[#fcfdfb] transition-colors duration-200"
              >
                <Icon size={22} weight="light" />
              </a>
            ))}
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[#fcfdfb]/35 text-[11px]">
            &copy; {new Date().getFullYear()} Solo Luz. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
