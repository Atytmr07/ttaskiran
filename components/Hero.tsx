'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import FrameCorners from './FrameCorners';
import MagneticButton from './MagneticButton';
import Tilt from './Tilt';
import { Link } from '@/i18n/navigation';
import { frameFront, DOSSIER_EASE } from './motion';
import { CATEGORY_KEYS, CATEGORY_IMAGES } from '@/lib/site';

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const t = useTranslations('Hero');
  const tc = useTranslations('Categories');
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const count = CATEGORY_KEYS.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Auto-advance through the 4 category "screens" on a fixed interval
  // (disabled only for prefers-reduced-motion).
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, go]);

  const key = CATEGORY_KEYS[index];
  const pad = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <header
      id="anasayfa"
      className="relative overflow-hidden bg-graphite"
    >
      {/* faint section watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-28 hidden max-w-full select-none whitespace-nowrap font-display font-black uppercase leading-none tracking-tighter text-ivory/[0.04] lg:block lg:text-[20rem]"
      >
        {tc(`${key}.rail`)}
      </span>

      {/* ============================================================
          MOBILE / TABLET — immersive image-led hero (below lg).
          The framed image grows to fill the viewport; the headline is
          overlaid on it so nothing gets clipped on short phones.
      ============================================================ */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col px-5 pb-7 pt-[calc(var(--nav-height)+0.75rem)] lg:hidden">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: DOSSIER_EASE }}
          className="mb-3 flex items-center gap-2.5 font-body text-[10px] font-semibold uppercase tracking-widest2 text-brass"
        >
          <span className="h-px w-6 bg-brass" />
          {t('eyebrow')}
        </motion.p>

        {/* framed image fills the remaining height */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-surface frame-outline">
          {/* Pre-mounted cross-fade layers (see desktop note) */}
          {CATEGORY_KEYS.map((catKey, i) => (
            <div
              key={catKey}
              aria-hidden={i !== index}
              className={`absolute inset-0 ${
                reduce ? '' : 'transition-opacity duration-700 ease-out'
              } ${i === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={CATEGORY_IMAGES[catKey]}
                alt={tc(`${catKey}.name`)}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* legibility gradient — bottom-anchored & light so the image stays forward */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-graphite via-graphite/40 to-transparent" />
          <FrameCorners size="h-3.5 w-3.5" />

          {/* rotated category rail */}
          <span className="vertical-rl absolute left-3 top-4 rotate-180 font-body text-[10px] font-semibold uppercase tracking-widest2 text-ivory/80">
            {tc(`${key}.rail`)}
          </span>

          {/* overlaid headline block */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                transition={{ duration: 0.45, ease: DOSSIER_EASE }}
              >
                <span className="font-body text-[10px] font-semibold uppercase tracking-widest2 text-brass">
                  {t('indexLabel')} · {pad(index)}
                </span>
                <h1 className="mt-1.5 break-words font-display text-[1.55rem] font-black uppercase leading-[1.0] tracking-tight text-ivory">
                  {tc(`${key}.headline`)}
                </h1>
                <p className="mt-2 line-clamp-2 max-w-md font-body text-[12px] leading-relaxed text-ivory/80">
                  {tc(`${key}.tagline`)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA + carousel controls */}
        <div className="mt-5 flex flex-col gap-4">
          <Link
            href={{ pathname: '/projeler/[category]', params: { category: key } }}
            className="cta-sheen group inline-flex w-full items-center justify-center gap-2.5 bg-brass py-3.5 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
          >
            <span className="flex h-6 w-6 items-center justify-center bg-graphite/15">
              <Plus className="h-4 w-4" />
            </span>
            {t('exploreCta')}
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold tracking-widest">
                <span className="text-brass">{pad(index)}</span>
                <span className="mx-1 text-muted/50">/</span>
                <span className="text-muted/70">{pad(count - 1)}</span>
              </span>
              <div className="flex items-center gap-1.5">
                {CATEGORY_KEYS.map((catKey, i) => (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={tc(`${catKey}.name`)}
                    aria-current={i === index ? 'true' : undefined}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-5 bg-brass' : 'w-1.5 bg-muted/40'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t('prev')}
                className="flex h-10 w-10 items-center justify-center text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t('next')}
                className="flex h-10 w-10 items-center justify-center text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP — split layout: text left, framed image right (lg+)
      ============================================================ */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] w-full max-w-[1600px] items-center gap-16 px-20 pb-10 pt-[var(--nav-height)] lg:grid lg:grid-cols-[1fr_1.04fr]">
        {/* LEFT — text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: DOSSIER_EASE }}
            className="mb-7 hidden items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass sm:flex"
          >
            <span className="h-px w-8 bg-brass" />
            {t('eyebrow')}
          </motion.p>

          <div className="min-h-[7rem] sm:min-h-[14rem] lg:min-h-[17rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, x: reduce ? 0 : 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -28 }}
                transition={{ duration: 0.5, ease: DOSSIER_EASE }}
              >
                <span className="font-body text-xs font-semibold uppercase tracking-widest2 text-muted/70">
                  {t('indexLabel')} · {pad(index)}
                </span>
                <h1 className="mt-3 break-words font-display text-[2rem] font-black uppercase leading-[0.98] tracking-tight text-ivory sm:text-5xl sm:leading-[0.92] md:text-6xl lg:text-7xl xl:text-8xl">
                  {tc(`${key}.headline`)}
                </h1>
                <p className="mt-5 hidden max-w-lg font-body text-base leading-relaxed text-ivory/[0.87] sm:block sm:text-lg">
                  {tc(`${key}.tagline`)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mt-6 sm:mt-8">
            <MagneticButton>
              <Link
                href={{ pathname: '/projeler/[category]', params: { category: key } }}
                className="cta-sheen group inline-flex items-center gap-2.5 bg-brass py-3 pl-3 pr-6 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
              >
                <span className="flex h-7 w-7 items-center justify-center bg-graphite/15">
                  <Plus className="h-4 w-4" />
                </span>
                {t('exploreCta')}
              </Link>
            </MagneticButton>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10">
            <span className="font-display text-sm font-bold tracking-widest">
              <span className="text-brass">{pad(index)}</span>
              <span className="mx-1 text-muted/50">/</span>
              <span className="text-muted/70">{pad(count - 1)}</span>
            </span>
            <span className="h-6 w-px bg-frame" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t('prev')}
                className="flex h-10 w-10 items-center justify-center text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t('next')}
                className="flex h-10 w-10 items-center justify-center text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {CATEGORY_KEYS.map((catKey, i) => (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={tc(`${catKey}.name`)}
                  aria-current={i === index ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-6 bg-brass'
                      : 'w-2 bg-muted/40 hover:bg-muted/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — prominent framed image */}
        <motion.div
          variants={reduce ? undefined : frameFront}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* offset back frame for depth */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 hidden h-full w-full frame-outline lg:block"
          />

          <Tilt
            max={6}
            className="group relative aspect-[16/10] overflow-hidden bg-surface frame-outline sm:aspect-[4/5]"
          >
            {/* All 4 covers are mounted and cross-fade via opacity so switching
                is instant — no on-demand fetch lag when the category changes. */}
            {CATEGORY_KEYS.map((catKey, i) => (
              <div
                key={catKey}
                aria-hidden={i !== index}
                className={`absolute inset-0 ${
                  reduce ? '' : 'transition-opacity duration-700 ease-out'
                } ${i === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={CATEGORY_IMAGES[catKey]}
                  alt={tc(`${catKey}.name`)}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-graphite/85 via-graphite/20 to-transparent" />
            <FrameCorners size="h-4 w-4" />

            {/* rotated category rail label */}
            <span className="vertical-rl absolute left-4 top-5 rotate-180 font-body text-[11px] font-semibold uppercase tracking-widest2 text-ivory/80">
              {tc(`${key}.rail`)}
            </span>

            {/* bottom category chip */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6">
              <span className="font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass">
                {t('indexLabel')}
              </span>
              <p className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-ivory lg:text-2xl">
                {tc(`${key}.name`)}
              </p>
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* KAYDIR cue — desktop */}
      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 lg:flex">
        <span className="vertical-rl font-body text-[11px] font-semibold uppercase tracking-widest2 text-muted/70">
          {t('scroll')}
        </span>
        <motion.span
          aria-hidden="true"
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-12 w-px bg-gradient-to-b from-brass to-transparent"
        />
      </div>
    </header>
  );
}
