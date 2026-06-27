'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import FrameCorners from './FrameCorners';
import Tilt from './Tilt';
import { Link } from '@/i18n/navigation';
import { fadeUp, VIEWPORT_ONCE } from './motion';
import { CATEGORY_KEYS, CATEGORY_IMAGES } from '@/lib/site';

export default function ServiceCategories() {
  const t = useTranslations('Services');
  const tc = useTranslations('Categories');
  const scroller = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Click-and-drag horizontal scroll (mouse only — touch keeps native swipe)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = scroller.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scroller.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  // Swallow the click that ends a drag so "İncele" links don't fire on release
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const scrollTo = (i: number) => {
    const next = Math.max(0, Math.min(CATEGORY_KEYS.length - 1, i));
    setActive(next);
    cards.current[next]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  const pad = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <section
      id="hizmetlerimiz"
      className="relative overflow-hidden border-t border-frame bg-graphite py-24 lg:py-32"
    >
      <Watermark className="-top-6 pl-2 lg:pl-12">{t('watermark')}</Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading index="02" eyebrow={t('eyebrow')} title={t('title')} />

          {/* PREV/NEXT + running index */}
          <div className="flex items-center gap-5">
            <span className="font-display text-sm font-bold tracking-widest">
              <span className="text-brass">{pad(active)}</span>
              <span className="mx-1 text-muted/50">/</span>
              <span className="text-muted/70">
                {pad(CATEGORY_KEYS.length - 1)}
              </span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTo(active - 1)}
                disabled={active === 0}
                aria-label={t('prev')}
                className="flex h-10 w-10 items-center justify-center text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo(active + 1)}
                disabled={active === CATEGORY_KEYS.length - 1}
                aria-label={t('next')}
                className="flex h-10 w-10 items-center justify-center text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ivory/[0.87]">
          {t('intro')}
        </p>

        {/* Filmstrip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          ref={scroller}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          className={`no-scrollbar mt-12 flex gap-5 overflow-x-auto pb-4 lg:cursor-grab ${
            dragging
              ? 'snap-none select-none lg:cursor-grabbing'
              : 'snap-x snap-mandatory'
          }`}
        >
          {CATEGORY_KEYS.map((key, i) => (
            <article
              key={key}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="w-[78vw] flex-none snap-start sm:w-[48vw] lg:w-[31%]"
            >
              <Tilt
                max={6}
                className="group relative aspect-[3/4] overflow-hidden bg-surface frame-outline lg:aspect-[4/5]"
              >
                <Image
                  src={CATEGORY_IMAGES[key]}
                  alt={tc(`${key}.name`)}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 31vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />
                <FrameCorners />

                {/* Rotated category label along the left edge */}
                <span className="vertical-rl absolute left-4 top-5 rotate-180 font-body text-[11px] font-semibold uppercase tracking-widest2 text-ivory/70">
                  {tc(`${key}.rail`)}
                </span>

                {/* Ghost numeral bottom-right */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 right-4 select-none font-display text-7xl font-black leading-none text-ivory/[0.08] lg:text-8xl"
                >
                  {pad(i)}
                </span>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 pl-12">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ivory lg:text-2xl">
                    {tc(`${key}.name`)}
                  </h3>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-3 font-body text-sm leading-relaxed text-ivory/[0.87]">
                        {tc(`${key}.description`)}
                      </p>
                      <Link
                        href={{
                          pathname: '/projeler/[category]',
                          params: { category: key },
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brass"
                      >
                        {t('explore')}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Tilt>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
