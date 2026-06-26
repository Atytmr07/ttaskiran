import { useTranslations } from 'next-intl';

// Decorative agency keyword ticker. Pure-CSS loop (reduced-motion disables it).
// aria-hidden — the keywords are branding, surfaced semantically elsewhere.
export default function Marquee() {
  const t = useTranslations('Marquee');
  const items = t.raw('items') as string[];

  const Group = () => (
    <div className="flex shrink-0 items-center">
      {items.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="px-7 font-display text-sm font-bold uppercase tracking-widest2 text-ivory/70">
            {word}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-brass" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-frame bg-surface py-5"
    >
      <div className="flex w-max animate-marquee">
        <Group />
        <Group />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface to-transparent sm:w-32" />
    </div>
  );
}
