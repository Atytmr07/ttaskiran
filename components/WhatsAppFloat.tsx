'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { whatsappLink } from '@/lib/site';

// Floating WhatsApp button that opens a small chat panel. The visitor types a
// message; "Send" opens WhatsApp (wa.me) pre-filled with that exact message.
export default function WhatsAppFloat() {
  const t = useTranslations('Whatsapp');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = () => {
    window.open(whatsappLink(msg.trim() || undefined), '_blank', 'noopener,noreferrer');
    setMsg('');
    setOpen(false);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1.5rem)',
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-[calc(100vw-3rem)] max-w-[360px] origin-bottom-right overflow-hidden rounded-2xl bg-graphite shadow-2xl frame-outline"
            role="dialog"
            aria-label={t('title')}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-ivory px-4 py-4">
              <span className="relative flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-7 w-7" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-ivory bg-[#25D366]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-bold leading-tight text-white">
                  {t('title')}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 font-body text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  {t('online')} · {t('subtitle')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('close')}
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Greeting bubble */}
            <div className="bg-surface px-4 py-5">
              <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-graphite px-4 py-3 font-body text-sm leading-relaxed text-ivory/[0.87] shadow-sm">
                {t('greeting')}
              </div>
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-end gap-2 border-t border-frame bg-graphite p-3"
            >
              <textarea
                ref={inputRef}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder={t('placeholder')}
                className="max-h-28 min-h-[44px] w-full resize-none rounded-xl bg-surface px-3.5 py-2.5 font-body text-sm text-ivory placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-brass"
              />
              <button
                type="submit"
                aria-label={t('send')}
                className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#25D366] text-white transition-colors hover:bg-[#1eb858]"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t('close') : t('open')}
        aria-expanded={open}
        className="cta-sheen group flex h-14 w-14 items-center justify-center rounded-full bg-brass text-graphite shadow-xl transition-colors duration-300 hover:bg-brass-light"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'wa'}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-7 w-7" /> : <WhatsAppIcon className="h-7 w-7" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
