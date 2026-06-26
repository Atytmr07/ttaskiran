'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import { fadeUp, containerStagger, VIEWPORT_ONCE } from './motion';

export default function TrustMetrics() {
  const t = useTranslations('TrustMetrics');
  const reduce = useReducedMotion();
  const target = t.raw('yearsValue') as number;
  const stats = t.raw('stats') as { value: string; label: string }[];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(reduce ? target : 0);
  const [sheen, setSheen] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setSheen(true);
    if (reduce) {
      setCount(target);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  return (
    <section
      id="guven"
      className="relative overflow-hidden border-t border-frame bg-graphite py-24 lg:py-32"
    >
      <Watermark position="right" className="-top-8 pr-4 lg:pr-16">
        {t('watermark')}
      </Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading index="01" eyebrow={t('eyebrow')} title={t('title')} />

        <motion.div
          ref={ref}
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid items-center gap-12 lg:grid-cols-[auto_1fr]"
        >
          {/* Oversized metallic numeral */}
          <motion.div variants={fadeUp} className="flex items-end gap-5">
            <span
              className={`metallic-numeral font-display font-black leading-none tracking-tighter ${
                sheen ? 'sheen-on' : ''
              }`}
              style={{ fontSize: 'clamp(7rem, 20vw, 17rem)' }}
            >
              {count}
            </span>
            <span className="mb-6 max-w-[7rem] font-body text-xs font-semibold uppercase tracking-widest2 text-muted/70">
              {t('yearsLabel')}
            </span>
          </motion.div>

          {/* Supporting stats */}
          <motion.div
            variants={fadeUp}
            className="grid max-w-xl gap-px overflow-hidden sm:grid-cols-2"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-graphite py-5 pr-6 sm:border-l sm:border-frame sm:pl-8 sm:first:border-l-0"
              >
                <div className="font-display text-4xl font-extrabold tracking-tight text-ivory lg:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 font-body text-sm text-muted/70">
                  {s.label}
                </div>
              </div>
            ))}
            <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-muted/60 sm:col-span-2">
              {t('note')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
