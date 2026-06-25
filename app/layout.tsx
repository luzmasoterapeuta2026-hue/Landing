import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { MaintenancePage } from "@/components/MaintenancePage";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CopyProtection } from "@/components/CopyProtection";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solo Luz - Alquimia y Bienestar",
  description:
    "Formacion holistica para terapeutas que quieren ir mas profundo. Tecnica, energia y sabiduria ancestral en un solo camino.",
  metadataBase: new URL("https://luzmasoterapeuta.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Solo Luz - Alquimia y Bienestar",
    description:
      "Formacion holistica para terapeutas que quieren ir mas profundo.",
    url: "https://luzmasoterapeuta.com",
    siteName: "Solo Luz",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/hero/hero-image.png",
        width: 1200,
        height: 800,
        alt: "Solo Luz - Alquimia y Bienestar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solo Luz - Alquimia y Bienestar",
    description:
      "Formacion holistica para terapeutas que quieren ir mas profundo.",
    images: ["/hero/hero-image.png"],
  },
};

const isMaintenance = process.env.MAINTENANCE_MODE === "true";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <body>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png?v=20260625" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg?v=20260625" />
        <link rel="shortcut icon" href="/favicon/favicon.ico?v=20260625" />
        <meta name="apple-mobile-web-app-title" content="Luz" />
        <link rel="manifest" href="/favicon/site.webmanifest?v=20260625" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://www.tiktok.com" />
        <link rel="preconnect" href="https://static.cdninstagram.com" crossOrigin="anonymous" />
        <CopyProtection />
        <SmoothScroll />
        {isMaintenance ? <MaintenancePage /> : children}
      </body>
    </html>
  );
}
