import { getCursos } from "@/lib/sheets";
import { CourseGrid } from "@/components/ui/CourseGrid";
import { FadeUp } from "@/components/ui/FadeUp";

export async function Courses() {
  const cursos = await getCursos();

  return (
    <section id="cursos" className="bg-[#fff7e8] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-14">
          <h2
            className="font-[family-name:var(--font-cormorant)] text-[#2a2522] font-light leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
          >
            Formaciones disponibles
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/55 text-base mt-3 max-w-[55ch]">
            Cursos y talleres para terapeutas que buscan integrar tecnica, energia y sabiduria.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <CourseGrid courses={cursos} />
        </FadeUp>
      </div>
    </section>
  );
}
