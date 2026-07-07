import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { MaintenancePage } from "@/components/MaintenancePage";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CopyProtection } from "@/components/CopyProtection";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { JsonLd } from "@/components/seo/JsonLd";

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

const SITE_DESCRIPTION =
  "Formación holística y servicios terapéuticos para sanar desde la raíz. Masoterapia clínica, biodecodificación del dolor, terapia vibracional y sabiduría ancestral, en un solo camino.";

export const metadata: Metadata = {
  title: {
    default: "LuzMasoterapeuta — Formación holística y sanación desde la raíz",
    template: "%s — LuzMasoterapeuta",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://luzmasoterapeuta.com"),
  applicationName: "LuzMasoterapeuta",
  authors: [{ name: "Luz Masoterapeuta" }],
  creator: "LuzMasoterapeuta",
  publisher: "LuzMasoterapeuta",
  category: "health",
  keywords: [
    "masoterapia",
    "masoterapia holística",
    "masoterapia deportiva",
    "biodecodificación del dolor",
    "biocodificación",
    "terapia vibracional",
    "armonización energética",
    "formación para terapeutas",
    "cursos de masoterapia",
    "sanación holística",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "LuzMasoterapeuta — Formación holística y sanación desde la raíz",
    description: SITE_DESCRIPTION,
    url: "https://luzmasoterapeuta.com",
    siteName: "LuzMasoterapeuta",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/hero/hero-image.png",
        width: 1200,
        height: 800,
        alt: "LuzMasoterapeuta — Alquimia y Bienestar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuzMasoterapeuta — Formación holística y sanación desde la raíz",
    description: SITE_DESCRIPTION,
    images: ["/hero/hero-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2a2522",
  width: "device-width",
  initialScale: 1,
};

const isMaintenance = process.env.MAINTENANCE_MODE === "true";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png?v=20260625" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg?v=20260625" />
        <link rel="shortcut icon" href="/favicon/favicon.ico?v=20260625" />
        <meta name="apple-mobile-web-app-title" content="Luz" />
        <link rel="manifest" href="/favicon/site.webmanifest?v=20260625" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://www.tiktok.com" />
        <link rel="preconnect" href="https://static.cdninstagram.com" crossOrigin="anonymous" />
        <JsonLd />
        <CopyProtection />
        <SmoothScroll />
        {isMaintenance ? (
          <MaintenancePage />
        ) : (
          <>
            {children}
            <FloatingWhatsApp />
          </>
        )}
      </body>
    </html>
  );
}
