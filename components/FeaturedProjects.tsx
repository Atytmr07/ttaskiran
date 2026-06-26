import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PROJECTS } from '@/lib/site';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import FrameCorners from './FrameCorners';
import Tilt from './Tilt';

// Real, named projects shown as cards on the home page. Each links into its
// category gallery (where the full image set is grouped by project).
export default async function FeaturedProjects() {
  const t = await getTranslations('Featured');
  const tc = await getTranslations('Categories');

  return (
    <section
      id="projeler"
      className="relative overflow-hidden border-t border-frame bg-graphite py-24 lg:py-32"
    >
      <Watermark className="-top-6 pl-2 lg:pl-12">{t('watermark')}</Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ivory/[0.87]">
          {t('intro')}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={{ pathname: '/projeler/[category]', params: { category: p.category } }}
              className="group block"
              aria-label={p.name}
            >
              <Tilt
                max={5}
                className="relative aspect-[4/3] overflow-hidden bg-surface frame-outline"
              >
                <Image
                  src={p.cover}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/10 to-transparent" />
                <FrameCorners />

                <span className="absolute left-4 top-4 z-10 bg-graphite/85 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest2 text-brass">
                  {tc(`${p.category}.name`)}
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-ivory lg:text-xl">
                      {p.name}
                    </h3>
                    <span className="mt-1 block font-body text-xs text-ivory/70">
                      {p.images.length} {t('imagesWord')}
                    </span>
                  </div>
                  <span className="flex h-10 w-10 flex-none items-center justify-center bg-brass text-graphite transition-transform duration-300 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Tilt>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
