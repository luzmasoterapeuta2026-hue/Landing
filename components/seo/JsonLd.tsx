const BASE_URL = "https://luzmasoterapeuta.com";

// Structured data so Google understands who Luz is, what she offers and how to reach her.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "HealthAndBeautyBusiness"],
      "@id": `${BASE_URL}/#business`,
      name: "LuzMasoterapeuta",
      alternateName: "Luz Masoterapeuta — Alquimia y Bienestar",
      description:
        "Formación holística y servicios terapéuticos para terapeutas y personas que buscan sanar desde la raíz: masoterapia clínica, terapia vibracional, biodecodificación del dolor y armonización energética.",
      url: BASE_URL,
      image: `${BASE_URL}/hero/hero-image.png`,
      logo: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
      telephone: "+5491123467200",
      priceRange: "$$",
      inLanguage: "es-AR",
      areaServed: [
        { "@type": "Country", name: "Argentina" },
        { "@type": "Place", name: "Online / A distancia" },
      ],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://wa.me/5491123467200",
        availableLanguage: "es",
      },
      knowsAbout: [
        "Masoterapia",
        "Masoterapia deportiva",
        "Biodecodificación del dolor",
        "Terapia vibracional",
        "Armonización energética",
        "Sabiduría ancestral",
      ],
      sameAs: [
        "https://instagram.com/luz_masoterapeuta",
        "https://www.tiktok.com/@luz_masoterapia_holistik",
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#luz`,
      name: "Luz",
      jobTitle: "Masoterapeuta holística y formadora",
      worksFor: { "@id": `${BASE_URL}/#business` },
      url: BASE_URL,
      sameAs: [
        "https://instagram.com/luz_masoterapeuta",
        "https://www.tiktok.com/@luz_masoterapia_holistik",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "LuzMasoterapeuta",
      inLanguage: "es-AR",
      publisher: { "@id": `${BASE_URL}/#business` },
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
