import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Phone, MapPin, Clock, Mail, ArrowUpRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Watermark from '@/components/Watermark';
import FrameCorners from '@/components/FrameCorners';
import AnimatedText from '@/components/AnimatedText';
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from '@/components/Icons';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  PHONE_HREF,
  EMAIL,
  MAPS_URL,
  MAPS_EMBED,
  whatsappLink,
  SOCIAL,
} from '@/lib/site';

const SITE_URL = 'https://ttaskiran.com';
const LOCALIZED_PATH: Record<string, string> = { tr: '/iletisim', en: '/contact' };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  const path = LOCALIZED_PATH[locale] ?? '/iletisim';
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: {
        tr: `${SITE_URL}/tr/iletisim`,
        en: `${SITE_URL}/en/contact`,
        'x-default': `${SITE_URL}/tr/iletisim`,
      },
    },
    openGraph: {
      type: 'website',
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}${path}`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      images: [{ url: '/logo.jpg', width: 629, height: 271 }],
    },
    twitter: { card: 'summary_large_image', images: ['/logo.jpg'] },
  };
}

export default async function ContactPageRoute({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('ContactPage');
  const tc = await getTranslations('Contact');
  const tNav = await getTranslations('Nav');

  const rows = [
    { icon: Phone, label: tc('phoneLabel'), value: tc('phone'), href: PHONE_HREF },
    { icon: Mail, label: tc('emailLabel'), value: tc('email'), href: `mailto:${EMAIL}` },
    { icon: MapPin, label: tc('addressLabel'), value: tc('address'), href: MAPS_URL },
    { icon: Clock, label: tc('hoursLabel'), value: tc('hours'), href: undefined },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: tNav('home'),
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('breadcrumb'),
        item: `${SITE_URL}/${locale}${LOCALIZED_PATH[locale] ?? '/iletisim'}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-frame bg-graphite pb-20 pt-32 lg:pb-28 lg:pt-40">
          <Watermark className="-top-2 pl-2 lg:pl-12">{t('watermark')}</Watermark>

          <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
            {/* Breadcrumb */}
            <nav
              aria-label="breadcrumb"
              className="mb-8 flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest2 text-muted/60"
            >
              <Link href="/" className="transition-colors hover:text-brass">
                {tNav('home')}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-brass">{t('breadcrumb')}</span>
            </nav>

            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold tracking-widest text-brass">
                09<span className="ml-2 text-muted/40">—</span>
              </span>
              <span className="h-px w-8 bg-brass" />
              <span className="font-body text-[11px] font-semibold uppercase tracking-widest3 text-brass">
                {t('eyebrow')}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl break-words font-display text-[2rem] font-black uppercase leading-[1.0] tracking-tight text-ivory sm:text-5xl sm:leading-[0.98] md:text-6xl lg:text-7xl">
              <AnimatedText text={t('title')} />
            </h1>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ivory/[0.87] sm:text-lg">
              {t('intro')}
            </p>
          </div>
        </section>

        {/* Form + details */}
        <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1600px] gap-10 px-6 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-20">
            <ContactForm />

            <div className="flex flex-col gap-6">
              <h2 className="font-display text-sm font-bold uppercase tracking-widest2 text-brass">
                {t('directTitle')}
              </h2>

              <dl className="grid gap-px overflow-hidden border border-frame bg-frame sm:grid-cols-2">
                {rows.map((row) => {
                  const Inner = (
                    <>
                      <dt className="flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass">
                        <row.icon className="h-4 w-4" />
                        {row.label}
                      </dt>
                      <dd className="mt-2 font-body text-base text-ivory/[0.87] transition-colors group-hover/row:text-brass">
                        {row.value}
                      </dd>
                    </>
                  );
                  return (
                    <div key={row.label} className="bg-graphite p-6">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith('http') ? '_blank' : undefined}
                          rel={
                            row.href.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className="group/row block"
                        >
                          {Inner}
                        </a>
                      ) : (
                        Inner
                      )}
                    </div>
                  );
                })}
              </dl>

              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-brass px-6 py-3 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {tc('whatsappCta')}
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 font-body text-sm font-semibold text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
                >
                  {tc('mapCta')}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <a
                  href={SOCIAL.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${SOCIAL.instagram.handle}`}
                  className="text-muted/70 transition-colors hover:text-brass"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook ${SOCIAL.facebook.handle}`}
                  className="text-muted/70 transition-colors hover:text-brass"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              </div>

              {/* Map */}
              <div className="relative mt-2 min-h-[280px] flex-1 overflow-hidden frame-outline">
                <iframe
                  src={MAPS_EMBED}
                  title={tc('mapAlt')}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full [filter:grayscale(1)_contrast(0.95)_brightness(1.05)]"
                  style={{ border: 0 }}
                />
                <FrameCorners />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
