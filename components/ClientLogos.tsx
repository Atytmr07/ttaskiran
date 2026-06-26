'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import { fadeUp, containerStagger, VIEWPORT_ONCE } from './motion';

// Neutral, abstract placeholder marks. No real or implied named client
// relationship — these are swapped for verified partner logos once TT Design
// supplies them (Section 5I).
const MARKS = [
  (k: string) => (
    <svg viewBox="0 0 120 48" className="h-10 w-auto" aria-hidden="true" key={k}>
      <circle cx="20" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="42" y="14" width="60" height="3" fill="currentColor" />
      <rect x="42" y="24" width="44" height="3" fill="currentColor" />
    </svg>
  ),
  (k: string) => (
    <svg viewBox="0 0 120 48" className="h-10 w-auto" aria-hidden="true" key={k}>
      <path d="M14 38 L28 10 L42 38 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="54" y="16" width="52" height="3" fill="currentColor" />
      <rect x="54" y="28" width="36" height="3" fill="currentColor" />
    </svg>
  ),
  (k: string) => (
    <svg viewBox="0 0 120 48" className="h-10 w-auto" aria-hidden="true" key={k}>
      <rect x="10" y="12" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="18" y="20" width="8" height="8" fill="currentColor" />
      <rect x="46" y="16" width="60" height="3" fill="currentColor" />
      <rect x="46" y="28" width="40" height="3" fill="currentColor" />
    </svg>
  ),
  (k: string) => (
    <svg viewBox="0 0 120 48" className="h-10 w-auto" aria-hidden="true" key={k}>
      <path d="M12 24 Q24 6 36 24 Q24 42 12 24 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="48" y="16" width="58" height="3" fill="currentColor" />
      <rect x="48" y="28" width="30" height="3" fill="currentColor" />
    </svg>
  ),
  (k: string) => (
    <svg viewBox="0 0 120 48" className="h-10 w-auto" aria-hidden="true" key={k}>
      <line x1="12" y1="36" x2="24" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="12" x2="36" y2="36" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2" />
      <rect x="48" y="20" width="58" height="3" fill="currentColor" />
    </svg>
  ),
  (k: string) => (
    <svg viewBox="0 0 120 48" className="h-10 w-auto" aria-hidden="true" key={k}>
      <circle cx="20" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="52" y="22" width="54" height="3" fill="currentColor" />
    </svg>
  ),
];

export default function ClientLogos() {
  const t = useTranslations('Clients');

  return (
    <section
      id="is-ortaklari"
      className="relative overflow-hidden border-t border-frame bg-graphite py-20 lg:py-28"
    >
      <Watermark className="-top-4 pl-2 lg:pl-12">{t('watermark')}</Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading index="07" eyebrow={t('eyebrow')} title={t('title')} />

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-frame bg-frame sm:grid-cols-3 lg:grid-cols-6"
        >
          {MARKS.map((Mark, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group flex items-center justify-center bg-graphite px-6 py-10 text-ivory grayscale transition-all duration-300 hover:grayscale-0"
            >
              <span className="text-muted/60 transition-colors duration-300 group-hover:text-brass">
                {Mark(String(i))}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 font-body text-xs italic text-muted/50">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
