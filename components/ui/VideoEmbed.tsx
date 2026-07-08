"use client";

import { useState, useEffect } from "react";
import type { Video } from "@/lib/types";
import { InstagramLogo, TiktokLogo, Play } from "@phosphor-icons/react/dist/ssr";
import { isVideoPreloadTriggered, onVideoPreload } from "@/lib/videoPreload";

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
  // Iframe stays unmounted until either the user clicks or the "Sobre Luz"
  // section scrolls into view (preload signal). Loading Instagram/TikTok embeds
  // on page load drags in third-party cookies + heavy scripts that tank Best
  // Practices and Speed Index; this facade defers all of that off the fold.
  const [active, setActive] = useState(() => isVideoPreloadTriggered());

  useEffect(() => onVideoPreload(() => setActive(true)), []);
  const embedUrl = getEmbedUrl(video);
  const Icon = video.plataforma === "tiktok" ? TiktokLogo : InstagramLogo;
  const platformLabel = video.plataforma === "tiktok" ? "TikTok" : "Instagram";

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

      {/* Facade — click to load the real embed. No third-party request until then. */}
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Reproducir video de ${platformLabel}`}
          className="group absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#2a2522] to-[#1e1a17] cursor-pointer"
        >
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#dfa82b] text-[#2a2522] shadow-[0_6px_24px_rgba(223,168,43,0.35)] group-hover:scale-110 transition-transform duration-300">
            <Play size={26} weight="fill" className="ml-0.5" />
          </span>
          <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-[#fff7e8]/60 uppercase tracking-wider">
            <Icon size={14} weight="fill" className="text-[#dfa82b]" />
            Ver en {platformLabel}
          </span>
        </button>
      )}

      {/* Skeleton while the iframe boots */}
      {active && !loaded && (
        <div className="absolute inset-0 animate-pulse bg-[#fff7e8]/5 flex items-center justify-center">
          <Icon size={32} weight="thin" className="text-[#965e5d]/30" />
        </div>
      )}

      {/* Iframe — only mounted after click */}
      {active && (
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          title={video.titulo ?? `Post de ${video.plataforma}`}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      )}

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
