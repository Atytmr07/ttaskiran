'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import Logo from './Logo';
import { InstagramIcon, FacebookIcon } from './Icons';
import {
  SOCIAL,
  TT_MARKETING_URL,
  CATEGORY_KEYS,
  PHONE_HREF,
  EMAIL,
} from '@/lib/site';

export default function Footer() {
  const t = useTranslations('Footer');
  const tn = useTranslations('Nav');
  const tcat = useTranslations('Categories');
  const tcon = useTranslations('Contact');
  const locale = useLocale();
  const sec = (id: string) => `/${locale}#${id}`;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-frame bg-graphite pt-20">
      {/* Oversized ghost wordmark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 left-1/2 w-full -translate-x-1/2 select-none text-center font-display font-black leading-none text-ivory/[0.06]"
        style={{ fontSize: 'clamp(4rem, 22vw, 22rem)' }}
      >
        {t('wordmark')}
      </span>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="grid gap-12 pb-32 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="h-16 w-auto max-w-full lg:h-20" />
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-muted/70">
              {t('tagline')}
            </p>
          </div>

          {/* Menu */}
          <nav aria-label={t('columns.navTitle')}>
            <h3 className="font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass">
              {t('columns.navTitle')}
            </h3>
            <ul className="mt-5 space-y-3 font-body text-sm text-ivory/[0.7]">
              <li><a href={sec('anasayfa')} className="hover:text-brass">{tn('home')}</a></li>
              <li><a href={sec('hakkimizda')} className="hover:text-brass">{tn('about')}</a></li>
              <li><a href={sec('hizmetlerimiz')} className="hover:text-brass">{tn('services')}</a></li>
              <li><Link href="/iletisim" className="hover:text-brass">{tn('contact')}</Link></li>
              <li>
                <a
                  href={TT_MARKETING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brass"
                >
                  {tn('marketing')}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t('columns.servicesTitle')}>
            <h3 className="font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass">
              {t('columns.servicesTitle')}
            </h3>
            <ul className="mt-5 space-y-3 font-body text-sm text-ivory/[0.7]">
              {CATEGORY_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={{ pathname: '/projeler/[category]', params: { category: key } }}
                    className="hover:text-brass"
                  >
                    {tcat(`${key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-body text-[11px] font-semibold uppercase tracking-widest2 text-brass">
              {t('columns.contactTitle')}
            </h3>
            <ul className="mt-5 space-y-3 font-body text-sm text-ivory/[0.7]">
              <li><a href={PHONE_HREF} className="hover:text-brass">{tcon('phone')}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-brass">{tcon('email')}</a></li>
              <li className="text-muted/60">{tcon('address')}</li>
              <li className="text-muted/60">{tcon('hours')}</li>
            </ul>
            <div className="mt-5 flex items-center gap-4">
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
          </div>
        </div>

        {/* Utility bar */}
        <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-frame py-6 sm:flex-row">
          <p className="font-body text-xs text-muted/60">
            © {year} {t('company')} — {t('rights')}
          </p>
          <div className="flex items-center gap-6">
            <LocaleSwitcher label={tn('langLabel')} />
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SOCIAL.instagram.handle}`}
                className="text-muted/60 transition-colors hover:text-brass"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook ${SOCIAL.facebook.handle}`}
                className="text-muted/60 transition-colors hover:text-brass"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
