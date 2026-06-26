'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

// TR/EN locale switch that preserves the current route — including dynamic
// routes like /projeler/[category] (params are forwarded so the URL rebuilds).
export default function LocaleSwitcher({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // next-intl's typed router can't statically tie pathname↔params here
        { pathname, params } as Parameters<typeof router.replace>[0],
        { locale: next },
      );
    });
  }

  return (
    <div
      className={`flex items-center gap-1 font-body text-xs font-semibold ${className}`}
      role="group"
      aria-label={label}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-muted/40">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-current={loc === locale ? 'true' : undefined}
            className={`uppercase tracking-widest transition-colors duration-200 ${
              loc === locale
                ? 'text-brass'
                : 'text-muted/60 hover:text-ivory'
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
