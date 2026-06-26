'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import FrameCorners from './FrameCorners';
import { WhatsAppIcon } from './Icons';
import MagneticButton from './MagneticButton';
import { Link } from '@/i18n/navigation';
import { fadeUp, containerStagger, VIEWPORT_ONCE } from './motion';
import {
  PHONE_HREF,
  EMAIL,
  MAPS_URL,
  MAPS_EMBED,
  whatsappLink,
} from '@/lib/site';

export default function ContactCTA() {
  const t = useTranslations('Contact');

  const rows = [
    { icon: Phone, label: t('phoneLabel'), value: t('phone'), href: PHONE_HREF },
    { icon: Mail, label: t('emailLabel'), value: t('email'), href: `mailto:${EMAIL}` },
    { icon: MapPin, label: t('addressLabel'), value: t('address'), href: MAPS_URL },
    { icon: Clock, label: t('hoursLabel'), value: t('hours'), href: undefined },
  ];

  return (
    <section
      id="iletisim"
      className="relative overflow-hidden border-t border-frame bg-surface py-24 lg:py-32"
    >
      <Watermark className="-top-6 pl-2 lg:pl-12">{t('watermark')}</Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading index="09" eyebrow={t('eyebrow')} title={t('title')} />
        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ivory/[0.87]">
          {t('intro')}
        </p>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          {/* Details */}
          <motion.div variants={fadeUp} className="flex flex-col">
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
                  <div key={row.label} className="bg-surface p-6">
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith('http') ? '_blank' : undefined}
                        rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton>
                <Link
                  href="/iletisim"
                  className="group flex items-center gap-2 bg-brass px-6 py-3 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
                >
                  {t('formCta')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 font-body text-sm font-semibold text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t('whatsappCta')}
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 font-body text-sm font-semibold text-ivory frame-outline-strong transition-colors hover:border-brass hover:text-brass"
              >
                {t('mapCta')}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeUp}
            className="relative min-h-[320px] overflow-hidden frame-outline"
          >
            <iframe
              src={MAPS_EMBED}
              title={t('mapAlt')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:grayscale(1)_contrast(0.95)_brightness(1.05)]"
              style={{ border: 0 }}
            />
            <FrameCorners />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
