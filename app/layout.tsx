import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { MaintenancePage } from "@/components/MaintenancePage";
import { SmoothScroll } from "@/components/SmoothScroll";

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
  openGraph: {
    title: "Solo Luz - Alquimia y Bienestar",
    description:
      "Formacion holistica para terapeutas que quieren ir mas profundo.",
    url: "https://luzmasoterapeuta.com",
    siteName: "Solo Luz",
    locale: "es_AR",
    type: "website",
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
        <SmoothScroll />
        {isMaintenance ? <MaintenancePage /> : children}
      </body>
    </html>
  );
}
