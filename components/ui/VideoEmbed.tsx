"use client";

import { useState } from "react";
import type { Video } from "@/lib/types";
import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";

function getEmbedUrl(video: Video): string | null {
  try {
    if (video.plataforma === "instagram") {
      const reel = video.url.match(/\/reel\/([A-Za-z0-9_-]+)/);
      if (reel) return `https://www.instagram.com/reel/${reel[1]}/embed/`;
      const post = video.url.match(/\/p\/([A-Za-z0-9_-]+)/);
      if (post) return `https://www.instagram.com/p/${post[1]}/embed/`;
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
  const [loaded, setLoaded] = useState(false);
  const embedUrl = getEmbedUrl(video);
  const Icon = video.plataforma === "tiktok" ? TiktokLogo : InstagramLogo;

  if (!embedUrl) {
    return (
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center gap-3 aspect-[4/5] bg-[#fff7e8] border border-[#965e5d]/12 rounded-2xl hover:border-[#965e5d]/30 transition-colors"
      >
        <Icon size={28} weight="thin" className="text-[#965e5d]/40 group-hover:text-[#965e5d] transition-colors" />
        <span className="font-[family-name:var(--font-inter)] text-[11px] text-[#2a2522]/40 group-hover:text-[#965e5d] uppercase tracking-wider">
          Ver en {video.plataforma === "tiktok" ? "TikTok" : "Instagram"}
        </span>
      </a>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#1e1a17]">

      {/* Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[#fff7e8]/5 flex items-center justify-center">
          <Icon size={32} weight="thin" className="text-[#965e5d]/30" />
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        title={video.titulo ?? `Post de ${video.plataforma}`}
        onLoad={() => setLoaded(true)}
      />

      {/* Top gradient mask */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#2a2522] to-transparent pointer-events-none z-10" />

      {/* Bottom gradient mask */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#2a2522] to-transparent pointer-events-none z-10" />

      {/* Platform badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-[#fff7e8]/85 backdrop-blur-sm rounded-full px-2.5 py-1">
        <Icon size={13} weight="fill" className="text-[#965e5d]" />
        <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#965e5d] uppercase tracking-wider font-medium">
          {video.plataforma === "tiktok" ? "TikTok" : "Instagram"}
        </span>
      </div>
    </div>
  );
}
