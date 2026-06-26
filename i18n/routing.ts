import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Turkish is the default locale (Section 2)
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'always',
  // Localized URLs: /tr/iletisim ↔ /en/contact, /tr/projeler/.. ↔ /en/projects/..
  pathnames: {
    '/': '/',
    '/iletisim': {
      tr: '/iletisim',
      en: '/contact',
    },
    '/projeler/[category]': {
      tr: '/projeler/[category]',
      en: '/projects/[category]',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
