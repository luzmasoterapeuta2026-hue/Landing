import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones — LuzMasoterapeuta",
  description: "Condiciones generales de contratación de cursos, formaciones y materiales de LuzMasoterapeuta.",
};

export default function TerminosPage() {
  return (
    <main>
      <Header />
      <section className="min-h-screen bg-[#fff7e8] px-6 py-24 pt-32">
        <div className="max-w-3xl mx-auto">

          <h1
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[#965e5d] mb-4 tracking-wide"
          >
            Términos y Condiciones
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-sm text-[#2a2522]/50 mb-12 tracking-widest uppercase">
            Última actualización: junio de 2026
          </p>

          <div className="space-y-10 font-[family-name:var(--font-inter)] text-[#2a2522]/80 text-[15px] leading-relaxed">

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                1. Identificación
              </h2>
              <p>
                El presente sitio web (<em>luzmasoterapeuta.com</em>) es operado por <strong>LuzMasoterapeuta</strong>,
                actividad de formación y venta de materiales educativos en el área del bienestar y la masoterapia
                holística, con sede en la República Argentina. Contacto:{" "}
                <a
                  href="https://wa.me/5491123467200"
                  className="text-[#965e5d] underline underline-offset-2 hover:text-[#dfa82b] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +54 9 11 2346-7200
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                2. Aceptación de los términos
              </h2>
              <p>
                Al navegar por este sitio, consultar o adquirir cualquiera de nuestros cursos, formaciones,
                manuales o materiales digitales, aceptás íntegramente los presentes Términos y Condiciones.
                Si no estás de acuerdo con alguna de estas condiciones, te pedimos que te abstengas de
                utilizar el sitio.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                3. Descripción de los servicios
              </h2>
              <p>LuzMasoterapeuta ofrece:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Cursos y formaciones en masoterapia clínica, terapias holísticas y abordaje energético.</li>
                <li>Manuales y libros digitales y/o físicos sobre bienestar, sanación y desarrollo profesional.</li>
                <li>Asesoramiento personalizado sobre qué formación se adapta a cada momento profesional.</li>
              </ul>
              <p className="mt-3">
                Los detalles de contenido, duración, modalidad y precio de cada producto o curso se informan
                al momento de la consulta o en la descripción específica de cada oferta.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                4. Proceso de inscripción y compra
              </h2>
              <p>
                La inscripción a cursos y la adquisición de materiales se realiza a través de comunicación
                directa por WhatsApp al número{" "}
                <strong>+54 9 11 2346-7200</strong> o mediante los medios indicados en cada oferta particular.
                Una vez confirmado el pago, recibirás los accesos o materiales en el plazo acordado.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                5. Precios y formas de pago
              </h2>
              <p>
                Los precios se expresan en pesos argentinos (ARS) salvo indicación expresa en otra moneda.
                Las formas de pago disponibles y los precios vigentes se informan en cada oportunidad de compra.
                LuzMasoterapeuta se reserva el derecho de modificar precios sin previo aviso; el precio aplicable
                es el vigente al momento de confirmar la inscripción.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                6. Política de cancelación y reembolso
              </h2>
              <p>
                De acuerdo con la Ley N° 24.240 de Defensa del Consumidor y su normativa concordante:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Para <strong>cursos y formaciones</strong>: podés cancelar tu inscripción y solicitar
                  reembolso completo dentro de las <strong>48 horas</strong> de realizado el pago, siempre
                  que el curso no haya comenzado.
                </li>
                <li>
                  Para <strong>materiales digitales</strong> (manuales, libros en formato digital) ya
                  entregados: no corresponde reembolso una vez que el acceso o descarga ha sido proporcionado,
                  salvo defecto en el material recibido.
                </li>
                <li>
                  En caso de cancelación por parte de LuzMasoterapeuta de un curso programado, se reintegrará el
                  100% del importe abonado o se ofrecerá una fecha alternativa.
                </li>
              </ul>
              <p className="mt-3">
                Para solicitudes de cancelación o reembolso, contactanos por WhatsApp al{" "}
                <strong>+54 9 11 2346-7200</strong>.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                7. Propiedad intelectual
              </h2>
              <p>
                Todo el contenido de este sitio web y de los materiales ofrecidos —incluyendo textos,
                imágenes, videos, diseños, manuales, metodologías y el libro <em>Alquimia del Ser</em>—
                es propiedad exclusiva de LuzMasoterapeuta y está protegido por las leyes de propiedad intelectual
                de la República Argentina (Ley N° 11.723).
              </p>
              <p className="mt-2">
                Queda prohibida la reproducción, distribución, comunicación pública o transformación de
                cualquier parte del contenido sin autorización expresa y escrita de LuzMasoterapeuta.
                El acceso a los materiales adquiridos es estrictamente personal e intransferible.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                8. Limitación de responsabilidad
              </h2>
              <p>
                Los cursos y materiales de LuzMasoterapeuta tienen finalidad educativa y de desarrollo profesional.
                No constituyen diagnóstico médico ni reemplazan la atención de profesionales de la salud
                habilitados. LuzMasoterapeuta no se responsabiliza por el uso que cada persona haga de la
                información y técnicas aprendidas.
              </p>
              <p className="mt-2">
                LuzMasoterapeuta tampoco se responsabiliza por interrupciones en el acceso al sitio web por causas
                ajenas a su control (fuerza mayor, fallos de terceros, etc.).
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                9. Modificaciones
              </h2>
              <p>
                LuzMasoterapeuta se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento.
                Los cambios entrarán en vigor desde su publicación en este sitio. El uso continuado del
                sitio o de los servicios implica la aceptación de los términos actualizados.
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#2a2522] mb-3">
                10. Legislación aplicable y jurisdicción
              </h2>
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier
                controversia que se derive de su interpretación o cumplimiento será sometida a los
                tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia expresa a
                cualquier otro fuero que pudiera corresponder.
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
