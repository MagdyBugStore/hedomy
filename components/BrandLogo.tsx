import type { Logo } from "@/lib/types";

/** Logo on a neutral tile (dark tile for white logos). Falls back to the brand's initials. */
export default function BrandLogo({ name, logo, className = "", pad = "p-5" }: { name: string; logo?: Logo; className?: string; pad?: string }) {
  const bg = logo?.light ? "bg-[#222]" : "bg-white";
  return (
    <div className={`grid place-items-center overflow-hidden ${bg} ${className}`}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo.file} alt={name} loading="lazy" className={`max-h-full max-w-full object-contain ${pad}`} />
      ) : (
        <span className="text-2xl font-semibold text-ink/70" aria-label={name}>{name.trim().slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
