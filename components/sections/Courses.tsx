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
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: "url('/curses/background.webp')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="mb-14 text-center">
          <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.22em] uppercase text-[#dfa82b] mb-4">
            Formaciones
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-[#fff7e8] font-light leading-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Aprende a sanar{" "}
            <em className="text-[#dfa82b]">desde adentro</em>
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[#fff7e8]/60 text-base mt-4 max-w-[50ch] leading-relaxed mx-auto">
            Cursos y talleres que integran tecnica, energia y sabiduria ancestral.
            Para terapeutas que quieren ir mas profundo.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <CourseGrid courses={cursos} />
        </FadeUp>
      </div>
    </section>
  );
}
