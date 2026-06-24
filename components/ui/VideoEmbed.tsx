"use client";
import type { Video } from "@/lib/types";
import { InstagramLogo, TiktokLogo, ArrowUpRight } from "@phosphor-icons/react";

function getEmbedUrl(video: Video): string | null {
  try {
    if (video.plataforma === "instagram") {
      const match = video.url.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
      if (match) return `https://www.instagram.com/${match[1]}/${match[2]}/embed/`;
    }
    if (video.plataforma === "tiktok") {
      const match = video.url.match(/\/video\/(\d+)/);
      if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
    }
    return null;
  } catch {
    return null;
  }
}

export function VideoEmbed({ video }: { video: Video }) {
  const embedUrl = getEmbedUrl(video);
  const Icon = video.plataforma === "tiktok" ? TiktokLogo : InstagramLogo;

  if (!embedUrl) {
    return (
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center gap-3 aspect-[9/16] max-h-[560px] bg-[#fff7e8] border border-[#965e5d]/12 rounded-2xl hover:border-[#965e5d]/30 transition-colors"
      >
        <Icon size={32} weight="thin" className="text-[#965e5d]/50 group-hover:text-[#965e5d] transition-colors" />
        <span className="font-[family-name:var(--font-inter)] text-xs text-[#2a2522]/40 group-hover:text-[#965e5d] flex items-center gap-1">
          Ver en {video.plataforma === "tiktok" ? "TikTok" : "Instagram"}
          <ArrowUpRight size={11} />
        </span>
        {video.titulo && (
          <p className="font-[family-name:var(--font-cormorant)] text-[#2a2522]/60 text-base italic px-4 text-center">
            {video.titulo}
          </p>
        )}
      </a>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl bg-[#2a2522]/5" style={{ aspectRatio: "9/16", maxHeight: 560 }}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          title={video.titulo ?? `Video de ${video.plataforma}`}
        />
      </div>
      {video.titulo && (
        <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/50 text-xs text-center">
          {video.titulo}
        </p>
      )}
    </div>
  );
}
