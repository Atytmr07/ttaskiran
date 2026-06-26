'use client';

import { useEffect, useState } from 'react';

export type ProgressSection = { id: string; label: string };

// Fixed right-edge pagination dots mirroring a slide-deck (Section 5M).
// Desktop only. Active section fills brass; click smooth-scrolls.
export default function SectionProgress({
  sections,
}: {
  sections: ProgressSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          // pick the most-visible section
          let best = active;
          let bestRatio = 0;
          for (const s of sections) {
            const r = visible.get(s.id) ?? 0;
            if (r > bestRatio) {
              bestRatio = r;
              best = s.id;
            }
          }
          if (best) setActive(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75] },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const onClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Bölüm gezinmesi"
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onClick(s.id)}
            aria-label={s.label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className={`font-body text-[10px] uppercase tracking-widest2 opacity-0 transition-opacity group-hover:opacity-100 ${
                isActive ? 'text-brass' : 'text-muted/70'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'scale-125 border-brass bg-brass'
                  : 'border-muted/50 bg-transparent group-hover:border-brass'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
