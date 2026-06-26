import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryGrid from '@/components/GalleryGrid';
import AnimatedText from '@/components/AnimatedText';
import Watermark from '@/components/Watermark';
import MagneticButton from '@/components/MagneticButton';
import { WhatsAppIcon } from '@/components/Icons';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  CATEGORY_KEYS,
  projectsByCategory,
  galleryImagesFor,
  isCategoryKey,
  whatsappLink,
} from '@/lib/site';

const SITE_URL = 'https://ttaskiran.com';
const seg = (locale: string) => (locale === 'en' ? 'projects' : 'projeler');

export function generateStaticParams() {
  const out: { locale: string; category: string }[] = [];
  for (const locale of routing.locales) {
    for (const category of CATEGORY_KEYS) out.push({ locale, category });
  }
  return out;
}

export async function generateMetadata({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}): Promise<Metadata> {
  if (!isCategoryKey(category)) return {};
  const tc = await getTranslations({ locale, namespace: 'Categories' });
  const tg = await getTranslations({ locale, namespace: 'Gallery' });
  const name = tc(`${category}.name`);
  return {
    title: `${name} — ${tg('metaSuffix')}`,
    description: tg('metaDescription', { category: name }),
    alternates: {
      canonical: `${SITE_URL}/${locale}/${seg(locale)}/${category}`,
      languages: {
        tr: `${SITE_URL}/tr/projeler/${category}`,
        en: `${SITE_URL}/en/projects/${category}`,
      },
    },
    openGraph: {
      type: 'website',
      title: `${name} — ${tg('metaSuffix')}`,
      description: tg('metaDescription', { category: name }),
      url: `${SITE_URL}/${locale}/${seg(locale)}/${category}`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      images: [{ url: '/logo.jpg', width: 629, height: 271 }],
    },
    twitter: { card: 'summary_large_image', images: ['/logo.jpg'] },
  };
}

export default async function GalleryPage({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}) {
  if (!isCategoryKey(category)) notFound();
  setRequestLocale(locale);

  const tc = await getTranslations('Categories');
  const tg = await getTranslations('Gallery');

  const name = tc(`${category}.name`);
  const projects = projectsByCategory(category);
  const allImageSrcs = projects.length
    ? projects.flatMap((p) => p.images.map((im) => im.src))
    : galleryImagesFor(category);
  const galleryLabels = {
    view: tg('view'),
    close: tg('close'),
    prev: tg('prevImage'),
    next: tg('nextImage'),
  };
  const activeIndex = CATEGORY_KEYS.indexOf(category);
  const pad = (n: number) => String(n + 1).padStart(2, '0');

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tg('breadcrumbHome'), item: `${SITE_URL}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}/${locale}/${seg(locale)}/${category}`,
      },
    ],
  };

  const galleryLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${name} — ${tg('metaSuffix')}`,
    description: tg('metaDescription', { category: name }),
    url: `${SITE_URL}/${locale}/${seg(locale)}/${category}`,
    image: allImageSrcs.map((src) => `${SITE_URL}${src}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryLd) }}
      />
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-frame bg-graphite pb-14 pt-[calc(var(--nav-height)+2.5rem)]">
          <Watermark className="-top-2 pl-2 lg:pl-12">{tg('watermark')}</Watermark>

          <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
            {/* breadcrumb */}
            <nav
              aria-label="breadcrumb"
              className="mb-7 flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest2 text-muted/60"
            >
              <Link href="/" className="transition-colors hover:text-brass">
                {tg('breadcrumbHome')}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <a href={`/${locale}#hizmetlerimiz`} className="transition-colors hover:text-brass">
                {tg('breadcrumbProjects')}
              </a>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-brass">{name}</span>
            </nav>

            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold tracking-widest text-brass">
                {pad(activeIndex)}
                <span className="ml-2 text-muted/40">—</span>
              </span>
              <span className="h-px w-8 bg-brass" />
              <span className="font-body text-[11px] font-semibold uppercase tracking-widest3 text-brass">
                {tg('eyebrow')}
              </span>
            </div>

            <h1 className="mt-5 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ivory sm:text-6xl lg:text-7xl">
              <AnimatedText text={name} />
            </h1>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ivory/[0.87] sm:text-lg">
              {tc(`${category}.description`)}
            </p>

            {/* category switcher */}
            <div className="mt-9 flex flex-wrap gap-2.5">
              {CATEGORY_KEYS.map((key) => {
                const isActive = key === category;
                return (
                  <Link
                    key={key}
                    href={{ pathname: '/projeler/[category]', params: { category: key } }}
                    className={`px-4 py-2 font-body text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-brass text-graphite'
                        : 'text-ivory frame-outline-strong hover:border-brass hover:text-brass'
                    }`}
                  >
                    {tc(`${key}.name`)}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery — grouped by project */}
        <section className="relative bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
            <p className="mb-12 font-body text-sm italic text-muted/60">
              {tg('selectionNote')}
            </p>

            {projects.length > 0 ? (
              <div className="space-y-20">
                {projects.map((p, pi) => (
                  <article key={p.slug} id={p.slug} className="scroll-mt-40">
                    <header className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-frame pb-5">
                      <div className="flex items-end gap-4">
                        <span className="font-display text-sm font-bold tracking-widest text-brass">
                          {pad(pi)}
                        </span>
                        <div>
                          <span className="font-body text-[11px] font-semibold uppercase tracking-widest2 text-muted/60">
                            {tg('projectLabel')}
                          </span>
                          <h2 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
                            {p.name}
                          </h2>
                        </div>
                      </div>
                      <span className="font-body text-sm text-muted/60">
                        {p.images.length} {tg('imagesWord')}
                      </span>
                    </header>
                    <GalleryGrid images={p.images} alt={p.name} labels={galleryLabels} />
                  </article>
                ))}
              </div>
            ) : (
              <GalleryGrid
                images={galleryImagesFor(category).map((src) => ({ src, w: 1400, h: 1180 }))}
                alt={name}
                labels={galleryLabels}
              />
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-frame bg-graphite py-20">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20">
            <div className="max-w-2xl">
              <span className="font-body text-[11px] font-semibold uppercase tracking-widest3 text-brass">
                {tg('ctaEyebrow')}
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ivory sm:text-4xl">
                {tg('ctaTitle')}
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-ivory/[0.87]">
                {tg('ctaBody')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton>
                <Link
                  href="/iletisim"
                  className="cta-sheen group flex items-center gap-2 bg-brass px-6 py-3.5 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
                >
                  {tg('ctaButton')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 font-body text-sm font-semibold text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {tg('whatsapp')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
