import { getCursos } from "@/lib/sheets";
import { CourseGrid } from "@/components/ui/CourseGrid";
import { FadeUp } from "@/components/ui/FadeUp";

export async function Courses() {
  const cursos = await getCursos();

  return (
    <section
      id="cursos"
      className="relative py-16 md:py-24 px-6 scroll-mt-20 overflow-hidden"
      style={{ backgroundColor: "#111010" }}
    >
      {/* Blurred bg — scale-110 hides blur edges */}
      <div
        className="absolute inset-0 scale-110 bg-scroll md:bg-fixed"
        style={{
          backgroundImage: "url('/curses/background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="mb-14 text-center">
          <p className="font-[family-name:var(--font-inter)] text-[11px] md:text-[13px] tracking-[0.22em] uppercase text-[#dfa82b] mb-4">
            Formaciones y Servicios
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-[#fff7e8] font-light leading-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Aprende a sanar{" "}
            <em className="text-[#dfa82b]">desde adentro</em>
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[#fff7e8]/60 text-base md:text-lg mt-4 max-w-[52ch] leading-relaxed mx-auto">
            Formaciones y servicios que unen <em className="text-[#dfa82b] not-italic font-medium">técnica clínica</em>, sabiduría ancestral y biodecodificación emocional.
            Da el salto de aliviar síntomas a <em className="text-[#dfa82b] not-italic font-medium">acompañar transformaciones reales.</em>
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <CourseGrid courses={cursos} />
        </FadeUp>
      </div>
    </section>
  );
}
