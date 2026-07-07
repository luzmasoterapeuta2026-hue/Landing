# LuzMasoterapeuta — Alquimia y Bienestar 🌿✨

Landing page moderna, responsiva y de alto rendimiento diseñada para centralizar las formaciones, terapias y servicios holísticos de **LuzMasoterapeuta**. El sitio combina rigor técnico con estética premium y fluidez de interacción.

---

## 🚀 Características Principales

*   **Integración Dinámica con Google Sheets**: Carga en tiempo real de formaciones/servicios y videos (desde Instagram y TikTok) utilizando la API de visualización de Google Sheets (`gviz/tq`) y parseo rápido de CSV con cacheo optimizado para producción.
*   **Ajustes de Diseño Premium**: Estética visualmente atractiva con transiciones de color orgánicas, orbes de luz animados y micro-interacciones interactivas.
*   **Navegación y Scroll Suave**: Implementación de [Lenis Scroll](https://github.com/darkroomengineering/lenis) para un desplazamiento premium y consistente en todos los navegadores, sincronizado con un sistema de bloqueo de scroll inteligente para ventanas modales.
*   **Modales de Detalle Enriquecidos**: Ventanas emergentes interactivas para cursos y servicios que renderizan dinámicamente descripciones detalladas, listas de beneficios (bullets), público objetivo y citas inspiracionales.
*   **SEO de Elite y Optimización de Búsqueda**:
    *   Generación dinámica de `sitemap.xml` y `robots.txt`.
    *   Metadatos completos usando la Metadata API de Next.js (OpenGraph, Twitter Cards, tags de viewport).
    *   Estructura de datos enriquecidos (Schema.org) mediante el componente `JsonLd` (`ProfessionalService`, `Person`, `WebSite`).
*   **Protección de Contenido**: Scripts integrados para mitigar la copia no autorizada y desactivar accesos directos de depuración en producción (`CopyProtection`).
*   **Botón Flotante de WhatsApp**: Acceso rápido y directo con efectos visuales de pulso para la comunicación inmediata con Luz.

---

## 🛠️ Stack Tecnológico

*   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) con React 19 y TypeScript.
*   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) — Arquitectura moderna orientada a variables CSS nativas.
*   **Animaciones**: [Framer Motion 12](https://www.motion.dev/) (paquete `motion`) para orbes decorativos, fade-ins y transiciones de modales.
*   **Iconos**: [@phosphor-icons/react](https://phosphoricons.com/) para una iconografía limpia y consistente.
*   **Desplazamiento**: [Lenis Scroll](https://lenis.darkroom.engineering/) para suavizado de desplazamiento en wheel y touch devices.

---

## 📊 Integración y Datos en Google Sheets

El sitio consume dinámicamente dos hojas dentro de una misma hoja de cálculo de Google (compartida mediante enlace público):

### 📋 Hoja: Cursos
Define la información sobre formaciones y servicios de gabinete:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| **nombre** | Texto | Nombre principal de la formación o servicio. |
| **tipo** | `"formacion"` o `"servicio"` | Define si es un curso formativo o una consulta/terapia. |
| **categoria** | Texto | Categoría (ej: *Masoterapia*, *Energía*, *Gabinete*). |
| **modalidad** | Texto | Ubicación o modalidad (ej: *Presencial*, *A distancia*). |
| **frecuencia** | Texto | Periodicidad (ej: *Semanal*, *Mensual*). |
| **fecha** | Texto | Fecha de inicio o disponibilidad. |
| **duracion** | Texto | Duración total. |
| **precio** | Texto | Costo (ej: *$25.000* o *Consultar*). |
| **subtitulo** | Texto | Copete corto descriptivo. |
| **descripcion** | Texto | Detalle largo. Admite saltos de línea. |
| **bullets_titulo**| Texto | Título para la sección de viñetas en el modal. |
| **bullets** | Texto | Lista separada por tuberías `\|` (ej: *Elemento 1 \| Elemento 2*). |
| **dirigido** | Texto | A quién va dirigida la formación. |
| **cita** | Texto | Cita célebre o frase destacada que se muestra en cursiva. |
| **imagen** | URL (Cloudinary) | Imagen de cabecera. Si no se especifica, usa un fallback local. |
| **cta_tipo** | `"whatsapp"` o `"formulario"`| Comportamiento del botón de acción. |
| **cta_link** | URL | Enlace de destino (necesario si el tipo es formulario). |
| **cta_texto** | Texto | Leyenda del botón de acción (ej: *Inscribirme*). |
| **activo** | `TRUE` / `FALSE` | Oculta o muestra el ítem en la landing. |
| **orden** | Número | Prioridad de ordenamiento visual en la grilla. |

### 📹 Hoja: Videos
Permite listar reels y videos destacados incrustados directamente de redes sociales:

*   **url**: Enlace directo del video de Instagram o TikTok.
*   **plataforma**: `"instagram"` o `"tiktok"`.
*   **titulo**: Título alternativo o descripción interna.
*   **activo**: `TRUE` / `FALSE`.
*   **orden**: Prioridad de ordenamiento en el carrusel de videos.

---

## 📂 Estructura del Proyecto

```bash
├── app/
│   ├── privacidad/        # Página legal de Política de Privacidad
│   ├── terminos/          # Página legal de Términos y Condiciones
│   ├── globals.css        # Estilos globales y configuración de Tailwind CSS v4
│   ├── layout.tsx         # Layout raíz (SEO, Google Fonts, Wrappers)
│   ├── page.tsx           # Página de inicio (Landing principal)
│   ├── robots.ts          # Configuración del rastreo de robots SEO
│   └── sitemap.ts         # Generador dinámico del mapa del sitio
├── components/
│   ├── sections/          # Secciones principales (Hero, Bio, Courses, Videos, Footer)
│   ├── seo/               # Componente de marcado estructurado JsonLd
│   ├── ui/                # Componentes interactivos reutilizables (CourseCard, CourseModal, FloatingWhatsApp, etc.)
│   ├── CopyProtection.tsx # Hook cliente para protección de copia
│   ├── Header.tsx         # Cabecera de navegación principal
│   ├── MaintenancePage.tsx# Plantilla para modo mantenimiento
│   └── SmoothScroll.tsx   # Configuración de inicialización de Lenis
├── lib/
│   ├── sheets.ts          # Utilidad para obtener y parsear CSV desde Google Sheets
│   └── types.ts           # Definiciones de tipos e interfaces TypeScript
└── public/                # Recursos estáticos (Logos, imágenes, favicons)
```

---

## 💻 Desarrollo Local

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/luzmasoterapeuta2026-hue/Landing.git
    cd Landing
    ```

2.  **Instalar las dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar el entorno de desarrollo**:
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

4.  **Generar el build de producción**:
    ```bash
    npm run build
    npm run start
    ```

---

## 🤝 Créditos

Este proyecto fue diseñado, desarrollado y optimizado con ❤️ por **[Nosterlabs](https://www.nosterlabs.com)**.
