import Image from "next/image";

export function MaintenancePage() {
  return (
    <div className="min-h-[100dvh] bg-[#fff7e8] flex flex-col items-center justify-center px-6 text-center">
      <Image
        src="/logo/trace.svg"
        alt="Solo Luz"
        width={120}
        height={80}
        className="mb-10 opacity-80"
        priority
      />
      <p
        className="font-[family-name:var(--font-cormorant)] text-[#965e5d] text-4xl md:text-5xl font-light italic mb-4"
        style={{ letterSpacing: "0.02em" }}
      >
        Volvemos pronto
      </p>
      <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/60 text-sm max-w-xs">
        Estamos preparando algo especial. Gracias por tu paciencia.
      </p>
    </div>
  );
}
