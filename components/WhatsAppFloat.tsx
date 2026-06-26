'use client';

import { useTranslations } from 'next-intl';
import { WhatsAppIcon } from './Icons';
import { whatsappLink } from '@/lib/site';

// Persistent floating WhatsApp button, kept inside the viewport-frame inset and
// respecting mobile safe-area insets (Section 5L).
export default function WhatsAppFloat() {
  const t = useTranslations('Nav');

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="cta-sheen group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brass text-graphite shadow-xl transition-all duration-300 hover:w-auto hover:gap-2 hover:rounded-full hover:px-5 hover:bg-brass-light"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.75rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1.75rem)',
      }}
    >
      <WhatsAppIcon className="h-7 w-7 flex-none" />
      <span className="hidden whitespace-nowrap font-body text-sm font-semibold group-hover:inline">
        {t('whatsapp')}
      </span>
    </a>
  );
}
