'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import FrameCorners from './FrameCorners';
import { fadeUp, VIEWPORT_ONCE } from './motion';
import { BEFORE_AFTER_IMAGES } from '@/lib/site';

export default function BeforeAfterShowcase() {
  const t = useTranslations('BeforeAfter');
  const caption = t.raw('caption') as {
    project: string;
    location: string;
    scope: string;
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // percent revealed of "after"
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);

  // Keep the clipped BEFORE image at full container width so it never squashes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [setFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  };

  return (
    <section
      id="referans"
      className="relative overflow-hidden border-t border-frame bg-graphite py-24 lg:py-32"
    >
      <Watermark className="-top-6 pl-2 lg:pl-12">{t('watermark')}</Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading index="05" eyebrow={t('eyebrow')} title={t('title')} />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end"
        >
          {/* Slider */}
          <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden frame-outline"
            onPointerDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
          >
            {/* AFTER (full, underneath) */}
            <Image
              src={BEFORE_AFTER_IMAGES.after}
              alt={`${caption.project} — ${t('afterLabel')}`}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
            <span className="absolute right-4 top-4 bg-graphite/70 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-widest2 text-ivory">
              {t('afterLabel')}
            </span>

            {/* BEFORE (clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <div
                className="relative h-full"
                style={{ width: width || '100%' }}
              >
                <Image
                  src={BEFORE_AFTER_IMAGES.before}
                  alt={`${caption.project} — ${t('beforeLabel')}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>
              <span className="absolute left-4 top-4 bg-graphite/70 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-widest2 text-ivory">
                {t('beforeLabel')}
              </span>
            </div>

            {/* Handle */}
            <div
              className="absolute inset-y-0 z-10 w-px bg-brass"
              style={{ left: `${pos}%` }}
            >
              <button
                type="button"
                role="slider"
                aria-label={t('dragHint')}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                tabIndex={0}
                onKeyDown={onKey}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  dragging.current = true;
                }}
                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-brass text-graphite shadow-lg"
              >
                <MoveHorizontal className="h-5 w-5" />
              </button>
            </div>

            <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-graphite/70 px-3 py-1 font-body text-[11px] uppercase tracking-widest2 text-ivory/70">
              {t('dragHint')}
            </span>
            <FrameCorners size="h-4 w-4" />
          </div>

          {/* Caption card */}
          <div className="relative bg-surface p-7 frame-outline">
            <FrameCorners />
            <h3 className="font-display text-2xl font-bold tracking-tight text-ivory">
              {caption.project}
            </h3>
            <dl className="mt-5 space-y-4 font-body text-sm text-ivory/[0.65]">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest2 text-brass">
                  {t('beforeLabel')} / {t('afterLabel')}
                </dt>
                <dd className="mt-1">{caption.location}</dd>
              </div>
              <div className="border-t border-frame pt-4">
                <dd>{caption.scope}</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
