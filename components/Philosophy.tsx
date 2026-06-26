'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Watermark from './Watermark';
import { fadeUp, containerStagger, VIEWPORT_ONCE } from './motion';

export default function Philosophy() {
  const t = useTranslations('Philosophy');
  const quoteLines = t('quote').split('\n');

  return (
    <section
      id="hakkimizda"
      className="relative overflow-hidden border-t border-frame bg-surface py-24 lg:py-36"
    >
      <Watermark position="right" className="-top-8 pr-2 lg:pr-12">
        {t('watermark')}
      </Watermark>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="relative z-10 mx-auto grid max-w-[1600px] gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-20"
      >
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold tracking-widest text-brass">
              06<span className="ml-2 text-muted/40">—</span>
            </span>
            <span className="h-px w-8 bg-brass" />
            <span className="font-body text-[11px] font-semibold uppercase tracking-widest3 text-brass">
              {t('eyebrow')}
            </span>
          </div>
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          className="lg:col-span-10 lg:col-start-3"
        >
          <p className="font-display text-3xl font-extrabold leading-[1.04] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
            {quoteLines.map((line, i) => (
              <span key={i} className="block">
                {i === quoteLines.length - 1 ? (
                  <span className="text-brass">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-2xl font-body text-base leading-relaxed text-ivory/[0.87] sm:text-lg">
              {t('body')}
            </p>
            <footer className="font-body text-sm font-semibold uppercase tracking-widest2 text-muted/70">
              — {t('signature')}
            </footer>
          </div>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}
