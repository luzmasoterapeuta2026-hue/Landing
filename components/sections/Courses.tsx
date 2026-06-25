import { getCursos } from "@/lib/sheets";
import { CourseGrid } from "@/components/ui/CourseGrid";
import { FadeUp } from "@/components/ui/FadeUp";

export async function Courses() {
  const cursos = await getCursos();

  return (
    <section id="cursos" className="bg-[#fff7e8] py-16 md:py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-14 text-center">
          <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.22em] uppercase text-[#dfa82b] mb-4">
            Formaciones
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-[#2a2522] font-light leading-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Aprende a sanar{" "}
            <em className="text-[#965e5d]">desde adentro</em>
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/55 text-base mt-4 max-w-[50ch] leading-relaxed mx-auto">
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
