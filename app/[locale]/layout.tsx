import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archivo, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ViewportFrame from '@/components/ViewportFrame';
import SideRail from '@/components/SideRail';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import GrainOverlay from '@/components/GrainOverlay';
import '../globals.css';

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://ttaskiran.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: '%s | TT Design',
    },
    description: t('description'),
    applicationName: 'TT Design',
    authors: [{ name: 'T Taşkıran' }],
    keywords:
      locale === 'tr'
        ? [
            'otel renovasyonu',
            'villa renovasyonu',
            'iş merkezi tadilat',
            'konut renovasyonu',
            'Antalya müteahhit',
            'Muratpaşa tadilat',
            'iç mimari',
          ]
        : [
            'hotel renovation',
            'villa renovation',
            'business center fit-out',
            'residential renovation',
            'Antalya contractor',
            'interior fit-out',
          ],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        tr: `${SITE_URL}/tr`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/tr`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'TT Design',
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      images: [
        { url: '/logo.jpg', width: 629, height: 271, alt: t('ogAlt') },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/logo.jpg'],
    },
    icons: {
      icon: [{ url: '/logo.jpg', type: 'image/jpeg' }],
      shortcut: '/logo.jpg',
      apple: [{ url: '/logo.jpg', type: 'image/jpeg' }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as 'tr' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${archivo.variable} ${inter.variable}`}>
      <body className="bg-graphite font-body text-ivory antialiased">
        <NextIntlClientProvider messages={messages}>
          <GrainOverlay />
          <ViewportFrame />
          <SideRail />
          {children}
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
