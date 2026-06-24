import { getVideos } from "@/lib/sheets";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { FadeUp } from "@/components/ui/FadeUp";

export async function Videos() {
  const videos = await getVideos();

  return (
    <section id="videos" className="bg-[#fff7e8] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-[#2a2522] font-light leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
            >
              En las redes
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/55 text-base mt-3 max-w-[45ch]">
              Tecnicas, reflexiones y herramientas para tu practica holistica.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/luz_masoterapeuta"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-inter)] text-[11px] tracking-wider uppercase border border-[#965e5d]/30 text-[#965e5d] px-4 py-2 rounded-full hover:bg-[#965e5d]/5 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@luz_masoterapeuta_holistik"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-inter)] text-[11px] tracking-wider uppercase border border-[#965e5d]/30 text-[#965e5d] px-4 py-2 rounded-full hover:bg-[#965e5d]/5 transition-colors"
            >
              TikTok
            </a>
          </div>
        </FadeUp>

        {videos.length === 0 ? (
          <ComingSoon label="Proximos videos disponibles en breve." />
        ) : (
          <FadeUp delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {videos.map((video, i) => (
              <VideoEmbed key={i} video={video} />
            ))}
          </FadeUp>
        )}
      </div>
    </section>
  );
}
