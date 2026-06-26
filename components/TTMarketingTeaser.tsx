'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FrameCorners from './FrameCorners';
import MagneticButton from './MagneticButton';
import { fadeUp, VIEWPORT_ONCE } from './motion';
import { TT_MARKETING_URL } from '@/lib/site';

export default function TTMarketingTeaser() {
  const t = useTranslations('Marketing');

  return (
    <section className="relative overflow-hidden border-t border-frame bg-graphite py-20">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <motion.a
          href={TT_MARKETING_URL}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="group relative flex flex-col gap-6 overflow-hidden bg-surface p-8 frame-outline transition-colors hover:border-brass sm:flex-row sm:items-center sm:justify-between sm:p-12"
        >
          <FrameCorners />
          {/* ghost wordmark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[8rem] font-black leading-none text-ivory/[0.04]"
          >
            TT.M
          </span>

          <div className="relative z-10 max-w-2xl">
            <span className="font-body text-[11px] font-semibold uppercase tracking-widest3 text-brass">
              {t('eyebrow')}
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ivory sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ivory/[0.87]">
              {t('body')}
            </p>
          </div>

          <MagneticButton className="relative z-10" strength={0.5}>
            <span className="flex items-center gap-2 whitespace-nowrap bg-brass px-6 py-3 font-body text-sm font-semibold text-graphite transition-colors group-hover:bg-brass-light">
              {t('cta')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </MagneticButton>
        </motion.a>
      </div>
    </section>
  );
}
