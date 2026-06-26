'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import FrameCorners from './FrameCorners';
import Tilt from './Tilt';
import { fadeUp, containerStagger, VIEWPORT_ONCE } from './motion';
import { CATEGORY_IMAGES } from '@/lib/site';

// Numbered two-column scope list + featured frame — adapted from the
// reference's "Team / our faces" composition, with real renovation scopes.
export default function Capabilities() {
  const t = useTranslations('Capabilities');
  const items = t.raw('items') as string[];
  const [active, setActive] = useState(0);
  const pad = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <section
      id="kapsam"
      className="relative overflow-hidden border-t border-frame bg-graphite py-24 lg:py-32"
    >
      <Watermark position="right" className="-top-4 pr-2 lg:pr-12">
        {t('watermark')}
      </Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading index="03" eyebrow={t('eyebrow')} title={t('title')} />
        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ivory/[0.87]">
          {t('intro')}
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16">
          {/* Featured frame */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
          >
            <Tilt
              max={5}
              className="group relative aspect-[4/5] overflow-hidden bg-surface frame-outline"
            >
              <Image
                src={CATEGORY_IMAGES.hotel}
                alt={t('featuredLabel')}
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent" />
              <FrameCorners size="h-4 w-4" />

              {/* rotated label */}
              <span className="vertical-rl absolute left-4 top-5 rotate-180 font-body text-[11px] font-semibold uppercase tracking-widest2 text-ivory/70">
                {t('featuredLabel')}
              </span>

              {/* active index badge */}
              <span
                aria-live="polite"
                className="absolute right-4 top-4 z-10 font-display text-2xl font-black tracking-tight text-ivory"
              >
                <span className="text-brass">{pad(active)}</span>
                <span className="ml-1 text-sm text-muted/60">
                  / {pad(items.length - 1)}
                </span>
              </span>

              {/* active scope name */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                <span className="font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass">
                  {t('eyebrow')}
                </span>
                <p className="mt-1 font-display text-xl font-bold tracking-tight text-ivory">
                  {items[active]}
                </p>
              </div>
            </Tilt>
          </motion.div>

          {/* Scope list — two columns, indexed */}
          <motion.ul
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="grid grid-cols-1 gap-x-10 self-center sm:grid-cols-2"
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <motion.li key={item} variants={fadeUp}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex w-full items-center gap-4 border-b border-frame py-4 text-left"
                  >
                    <span
                      className={`font-display text-xs font-bold tracking-widest transition-colors ${
                        isActive ? 'text-brass' : 'text-muted/50'
                      }`}
                    >
                      {pad(i)}
                    </span>
                    <span
                      className={`flex-1 font-display text-lg font-bold tracking-tight transition-colors sm:text-xl ${
                        isActive ? 'text-brass' : 'text-ivory'
                      }`}
                    >
                      {item}
                    </span>
                    <span
                      className={`h-px transition-all duration-300 ${
                        isActive ? 'w-8 bg-brass' : 'w-0 bg-transparent'
                      }`}
                    />
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
