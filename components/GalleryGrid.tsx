'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import FrameCorners from './FrameCorners';
import { DOSSIER_EASE } from './motion';

export type GalleryImage = { src: string; w: number; h: number };

export default function GalleryGrid({
  images,
  alt,
  labels,
}: {
  images: GalleryImage[];
  alt: string;
  labels: {
    view: string;
    close: string;
    prev: string;
    next: string;
  };
}) {
  const [open, setOpen] = useState<number | null>(null);
  const has = open !== null;

  const move = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!has) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [has, move]);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden bg-surface frame-outline"
            aria-label={`${alt} ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={`${alt} ${i + 1}`}
              width={img.w}
              height={img.h}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-ivory/0 transition-colors duration-300 group-hover:bg-ivory/[0.06]" />
            <FrameCorners />
            <span className="absolute bottom-3 left-3 flex translate-y-1 items-center gap-1.5 bg-brass px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-widest2 text-graphite opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" />
              {labels.view}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {has && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-dark fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={labels.close}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-white/90 transition-colors hover:text-brass"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              aria-label={labels.prev}
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-brass sm:left-6"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              aria-label={labels.next}
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-brass sm:right-6"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {open !== null && (
              <motion.div
                key={open}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: DOSSIER_EASE }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[open].src}
                  alt={`${alt} ${open + 1}`}
                  width={images[open].w}
                  height={images[open].h}
                  sizes="90vw"
                  className="max-h-[82vh] w-auto max-w-[92vw] frame-outline"
                  priority
                />
                <span className="absolute -bottom-8 left-0 font-display text-sm font-bold tracking-widest text-white/80">
                  <span className="text-brass">
                    {String(open + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-1 text-white/40">/</span>
                  {String(images.length).padStart(2, '0')}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
