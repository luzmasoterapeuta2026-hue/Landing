import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export function ComingSoon({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Sparkle size={28} weight="thin" className="text-[#dfa82b] mb-4" />
      <p className="font-[family-name:var(--font-cormorant)] text-[#965e5d] text-3xl font-light italic mb-2">
        Proximamente
      </p>
      {label && (
        <p className="font-[family-name:var(--font-inter)] text-[#2a2522]/45 text-sm">
          {label}
        </p>
      )}
    </div>
  );
}
