import { getVideos } from "@/lib/sheets";
import { VideoCarousel } from "@/components/ui/VideoCarousel";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { FadeUp } from "@/components/ui/FadeUp";
import { InstagramLogo, TiktokLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const PLATFORMS = [
  {
    name: "Instagram",
    handle: "@luz_masoterapeuta",
    href: "https://instagram.com/luz_masoterapeuta",
    Icon: InstagramLogo,
    accent: "#965e5d",
  },
  {
    name: "TikTok",
    handle: "@luz_masoterapeuta_holistik",
    href: "https://tiktok.com/@luz_masoterapeuta_holistik",
    Icon: TiktokLogo,
    accent: "#2a2522",
  },
];

export async function Videos() {
  const videos = await getVideos();

  return (
    <section
      id="videos"
      className="relative py-24 px-6 scroll-mt-20"
      style={{
        backgroundImage: "url('/network/network-background.webp')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#111010",
      }}
    >
      <div className="absolute inset-0 bg-[#2a2522]/55" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <FadeUp className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">

            {/* Left: title + paragraph */}
            <div className="max-w-xl text-center md:text-left">
              <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.22em] uppercase text-[#dfa82b] mb-4 md:text-left">
                Contenido
              </p>
              <h2
                className="font-[family-name:var(--font-cormorant)] text-[#fff7e8] font-light leading-tight mb-5"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                Seguinos en<br />
                <em className="text-[#dfa82b]">las redes</em>
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[#fff7e8]/50 text-base leading-relaxed">
                Tecnicas, reflexiones y herramientas para tu practica holistica,
                cada semana en Instagram y TikTok.
              </p>
            </div>

            {/* Right: platform cards */}
            <div className="flex flex-col sm:flex-row gap-4 md:flex-col lg:flex-row flex-shrink-0">
              {PLATFORMS.map(({ name, handle, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-[#fff7e8]/6 hover:bg-[#fff7e8]/12 border border-[#fff7e8]/12 hover:border-[#dfa82b]/50 rounded-2xl px-5 py-4 transition-all duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fff7e8]/10 group-hover:bg-[#dfa82b]/20 transition-colors flex-none">
                    <Icon size={20} weight="fill" className="text-[#fff7e8]/60 group-hover:text-[#dfa82b] transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-wider text-[#fff7e8]/35 mb-0.5">
                      {name}
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-sm text-[#fff7e8]/75 group-hover:text-[#fff7e8] transition-colors truncate">
                      {handle}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-[#fff7e8]/20 group-hover:text-[#dfa82b] transition-colors flex-none ml-auto"
                  />
                </a>
              ))}
            </div>

          </div>
        </FadeUp>

        {/* Carousel */}
        {videos.length === 0 ? (
          <ComingSoon label="Proximos videos disponibles en breve." />
        ) : (
          <FadeUp delay={0.15}>
            <VideoCarousel videos={videos} />
          </FadeUp>
        )}
      </div>
    </section>
  );
}
