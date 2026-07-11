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
import { WhatsAppIcon } from './Icons';
import FrameCorners from './FrameCorners';
import MagneticButton from './MagneticButton';
import Tilt from './Tilt';
import { Link } from '@/i18n/navigation';
import { frameFront, DOSSIER_EASE } from './motion';
import {
  CATEGORY_KEYS,
  CATEGORY_IMAGES,
  whatsappLink,
} from '@/lib/site';

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
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-graphite"
    >
      {/* faint section watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-28 max-w-full select-none whitespace-nowrap font-display text-[5.5rem] font-black uppercase leading-none tracking-tighter text-ivory/[0.04] sm:-right-6 sm:text-[12rem] lg:text-[20rem]"
      >
        {tc(`${key}.rail`)}
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] items-center gap-10 px-6 pb-16 pt-[calc(var(--nav-height)+2.5rem)] sm:px-10 lg:grid-cols-[1fr_1.04fr] lg:gap-16 lg:px-20 lg:pb-10 lg:pt-[var(--nav-height)]">
        {/* LEFT — text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: DOSSIER_EASE }}
            className="mb-7 flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass"
          >
            <span className="h-px w-8 bg-brass" />
            {t('eyebrow')}
          </motion.p>

          <div className="min-h-[10.5rem] sm:min-h-[14rem] lg:min-h-[17rem]">
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
                <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ivory/[0.87] sm:text-lg">
                  {tc(`${key}.tagline`)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href={{ pathname: '/projeler/[category]', params: { category: key } }}
                className="cta-sheen group flex items-center gap-2.5 bg-brass py-3 pl-3 pr-6 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
              >
                <span className="flex h-7 w-7 items-center justify-center bg-graphite/15">
                  <Plus className="h-4 w-4" />
                </span>
                {t('exploreCta')}
              </Link>
            </MagneticButton>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 font-body text-sm font-semibold text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t('whatsappCta')}
            </a>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center gap-5">
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
            className="group relative aspect-[4/3] overflow-hidden bg-surface frame-outline sm:aspect-[4/5]"
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: reduce ? 1 : 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.3 : 0.8, ease: DOSSIER_EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={CATEGORY_IMAGES[key]}
                  alt={tc(`${key}.name`)}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </motion.div>
            </AnimatePresence>

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
