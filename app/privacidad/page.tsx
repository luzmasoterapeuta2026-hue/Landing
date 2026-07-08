import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad — LuzMasoterapeuta",
  description: "Información sobre cómo LuzMasoterapeuta recopila, usa y protege tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <main>
      <Header />
      <section className="min-h-screen bg-[#fff7e8] px-6 py-24 pt-32">
        <div className="max-w-3xl mx-auto">

          <h1
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[#965e5d] mb-4 tracking-wide"
          >
            Política de Privacidad
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-sm text-[#2a2522]/50 mb-12 tracking-widest uppercase">
            Última actualización: julio de 2026
          </p>

          <div className="space-y-10 font-[family-name:var(--font-inter)] text-[#2a2522]/80 text-[15px] leading-relaxed">

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                1. Responsable del tratamiento
              </h2>
              <p>
                <strong>LuzMasoterapeuta</strong> (en adelante, "Luz", "LuzMasoterapeuta", "nosotros" o "el Responsable") es responsable
                del tratamiento de los datos personales que se recopilen a través de este sitio web
                (<em>luzmasoterapeuta.com</em>), conforme a la Ley N° 25.326 de Protección de los Datos Personales
                de la República Argentina.
              </p>
              <p className="mt-2">
                Contacto del Responsable:{" "}
                <a
                  href="https://wa.me/5491123467200"
                  className="text-[#965e5d] underline underline-offset-2 hover:text-[#dfa82b] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp +54 9 11 2346 7200
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                2. Datos que recopilamos
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Datos de contacto voluntarios:</strong> cuando te comunicás con nosotros a través de
                  WhatsApp, Instagram o TikTok, tratamos los datos que vos mismo proporcionás (nombre, número de
                  teléfono, consulta).
                </li>
                <li>
                  <strong>Datos de navegación:</strong> este sitio puede recopilar automáticamente información
                  técnica como dirección IP, tipo de navegador y páginas visitadas mediante herramientas de
                  analítica web (por ejemplo, Google Analytics), a fin de mejorar la experiencia del usuario.
                </li>
                <li>
                  <strong>Cookies:</strong> utilizamos cookies técnicas necesarias para el funcionamiento del
                  sitio y cookies analíticas para estadísticas de visitas.
                </li>
                <li>
                  <strong>Cookies de terceros:</strong> al cargar contenido embebido de redes sociales
                  (reels y videos de Instagram y TikTok), dichas plataformas pueden instalar sus propias
                  cookies en tu dispositivo. Ver el punto 8 para más detalle.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                3. Finalidad del tratamiento
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Responder consultas sobre cursos, formaciones y materiales.</li>
                <li>Gestionar el proceso de inscripción y/o compra de cursos y manuales.</li>
                <li>Mejorar el contenido y la experiencia del sitio web.</li>
                <li>Cumplir con obligaciones legales aplicables.</li>
              </ul>
              <p className="mt-3">
                No utilizamos tus datos para envíos de publicidad no solicitada ni los cedemos a terceros
                con fines comerciales.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                4. Base de legitimación
              </h2>
              <p>
                El tratamiento de tus datos se basa en tu consentimiento al comunicarte con nosotros y/o
                en la ejecución de una relación contractual (inscripción a cursos), conforme al art. 5 de la
                Ley N° 25.326.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                5. Conservación de los datos
              </h2>
              <p>
                Los datos personales se conservan durante el tiempo necesario para cumplir con la finalidad
                para la que fueron recopilados y, en todo caso, por el plazo que exijan las obligaciones legales
                y contables vigentes en Argentina.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                6. Derechos del titular
              </h2>
              <p>
                De acuerdo con la Ley N° 25.326, tenés derecho a acceder, rectificar, actualizar y, cuando
                corresponda, suprimir tus datos personales. Para ejercer estos derechos, podés contactarnos a
                través de WhatsApp +54 9 11 2346-7200 o por mensaje directo en nuestras redes sociales.
              </p>
              <p className="mt-2">
                Asimismo, podés presentar una reclamación ante la{" "}
                <strong>Agencia de Acceso a la Información Pública (AAIP)</strong>, autoridad de control en
                materia de protección de datos personales en Argentina.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                7. Transferencias internacionales
              </h2>
              <p>
                El uso de herramientas como Google Analytics puede implicar la transferencia de datos de
                navegación a servidores ubicados fuera de Argentina. Dichas transferencias se realizan bajo
                las condiciones de privacidad establecidas por el proveedor y de acuerdo con la normativa
                vigente.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                8. Contenido embebido de redes sociales
              </h2>
              <p>
                La sección de contenidos de este sitio muestra reels y videos alojados en{" "}
                <strong>Instagram</strong> y <strong>TikTok</strong> mediante contenido embebido (iframes).
                Estos videos no se cargan de forma automática: se activan recién cuando avanzás por el sitio
                o hacés clic, con el fin de reducir el intercambio de datos con terceros.
              </p>
              <p className="mt-2">
                Cuando ese contenido se carga, Instagram (Meta Platforms, Inc.) y TikTok pueden recopilar
                información de tu dispositivo e instalar sus propias cookies, conforme a sus respectivas
                políticas de privacidad, sobre las cuales LuzMasoterapeuta no tiene control. Te recomendamos
                consultar la{" "}
                <a
                  href="https://privacycenter.instagram.com/policy"
                  className="text-[#965e5d] underline underline-offset-2 hover:text-[#dfa82b] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad de Instagram
                </a>{" "}
                y la{" "}
                <a
                  href="https://www.tiktok.com/legal/page/row/privacy-policy/es"
                  className="text-[#965e5d] underline underline-offset-2 hover:text-[#dfa82b] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad de TikTok
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                9. Cambios en esta política
              </h2>
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente. La fecha de última actualización
                siempre estará indicada al inicio de este documento. El uso continuado del sitio implica la
                aceptación de los cambios.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-[#965e5d]/20">
            <a
              href="/"
              className="font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase text-[#965e5d] hover:text-[#dfa82b] transition-colors duration-200"
            >
              ← Volver al inicio
            </a>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}
