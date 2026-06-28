'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import MagneticButton from './MagneticButton';
import Logo from './Logo';
import { WhatsAppIcon } from './Icons';
import { whatsappLink, CATEGORY_KEYS } from '@/lib/site';

// Animated left-to-right underline shared by the desktop nav links
const UNDERLINE =
  'relative after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-brass after:transition-transform after:duration-300 hover:after:scale-x-100';

export default function Navbar() {
  const t = useTranslations('Nav');
  const tc = useTranslations('Categories');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Locale-aware homepage anchors so the links also work from sub-pages
  // (e.g. the contact page) — they route to the localized home, then scroll.
  const sec = (id: string) => `/${locale}#${id}`;
  const SECTIONS = {
    home: sec('anasayfa'),
    about: sec('hakkimizda'),
    services: sec('hizmetlerimiz'),
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: SECTIONS.home, label: t('home') },
    { href: SECTIONS.about, label: t('about') },
  ];

  return (
    <nav
      aria-label={t('navLabel')}
      className={`fixed inset-x-0 top-0 z-40 border-b border-frame bg-graphite transition-shadow duration-500 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Wordmark */}
        <Link href="/" aria-label="TT Design" className="flex items-center">
          <Logo priority className="h-[4.5rem] w-auto lg:h-[6rem]" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-sm font-medium text-ivory/80 transition-colors hover:text-brass ${UNDERLINE}`}
            >
              {l.label}
            </a>
          ))}

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a
              href={SECTIONS.services}
              className="flex items-center gap-1 font-body text-sm font-medium text-ivory/80 transition-colors hover:text-brass"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              {t('services')}
              <ChevronDown className="h-3.5 w-3.5" />
            </a>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full w-56 glass-strong p-2 frame-outline shadow-xl"
                >
                  {CATEGORY_KEYS.map((key) => (
                    <Link
                      key={key}
                      href={{ pathname: '/projeler/[category]', params: { category: key } }}
                      className="block px-3 py-2 font-body text-sm text-ivory/70 transition-colors hover:bg-surface hover:text-brass"
                    >
                      {tc(`${key}.name`)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/iletisim"
            className={`font-body text-sm font-medium text-ivory/80 transition-colors hover:text-brass ${UNDERLINE}`}
          >
            {t('contact')}
          </Link>

          <LocaleSwitcher label={t('langLabel')} />

          <MagneticButton>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-sheen flex items-center gap-2 bg-brass px-4 py-2.5 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t('whatsapp')}
            </a>
          </MagneticButton>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-ivory lg:hidden"
          aria-label={t('menuOpen')}
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-graphite lg:hidden"
          >
            <div
              className="flex items-center justify-between px-6"
              style={{ height: 'var(--nav-height)' }}
            >
              <Logo className="h-[4.5rem] w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-ivory"
                aria-label={t('menuClose')}
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              className="flex flex-1 flex-col justify-center gap-2 px-8"
            >
              {[
                { href: SECTIONS.home, label: t('home') },
                { href: SECTIONS.about, label: t('about') },
                { href: SECTIONS.services, label: t('services') },
              ].map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="border-b border-frame py-4 font-display text-3xl font-bold uppercase tracking-tight text-ivory"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  show: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  href="/iletisim"
                  onClick={() => setOpen(false)}
                  className="block border-b border-frame py-4 font-display text-3xl font-bold uppercase tracking-tight text-ivory"
                >
                  {t('contact')}
                </Link>
              </motion.div>
            </motion.div>

            <div className="flex items-center justify-between gap-4 px-8 pb-10">
              <LocaleSwitcher label={t('langLabel')} className="text-base" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 bg-brass px-5 py-3 font-body text-sm font-semibold text-graphite"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t('whatsapp')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
