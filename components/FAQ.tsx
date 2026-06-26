'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import { DOSSIER_EASE } from './motion';

type Item = { q: string; a: string };

export default function FAQ() {
  const t = useTranslations('FAQ');
  const items = t.raw('items') as Item[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="sss"
      className="relative overflow-hidden border-t border-frame bg-surface py-24 lg:py-32"
    >
      <Watermark position="right" className="-top-6 pr-2 lg:pr-12">
        {t('watermark')}
      </Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading index="08" eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mx-auto mt-12 max-w-3xl">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-frame">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-bold tracking-tight text-ivory sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 flex-none items-center justify-center transition-colors frame-outline-strong ${
                        isOpen ? 'border-brass text-brass' : 'text-ivory'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: DOSSIER_EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 font-body text-base leading-relaxed text-ivory/[0.87]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
