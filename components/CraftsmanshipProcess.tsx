'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Watermark from './Watermark';
import SectionHeading from './SectionHeading';
import { fadeUp, containerStagger, VIEWPORT_ONCE, DOSSIER_EASE } from './motion';

type Step = { no: string; title: string; body: string };

export default function CraftsmanshipProcess() {
  const t = useTranslations('Process');
  const steps = t.raw('steps') as Step[];

  return (
    <section
      id="surec"
      className="relative overflow-hidden border-t border-frame bg-surface py-24 lg:py-32"
    >
      <Watermark position="center" className="-top-6">
        {t('watermark')}
      </Watermark>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <SectionHeading index="04" eyebrow={t('eyebrow')} title={t('title')} />

        <div className="relative mt-16">
          {/* Desktop horizontal connector */}
          <svg
            className="absolute left-0 right-0 top-7 hidden h-2 w-full lg:block"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="#CF2929"
              strokeWidth="1"
              strokeDasharray="3 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: DOSSIER_EASE }}
            />
          </svg>

          <motion.ol
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="grid gap-y-12 lg:grid-cols-4 lg:gap-x-8"
          >
            {steps.map((step) => (
              <motion.li
                key={step.no}
                variants={fadeUp}
                className="relative pl-16 lg:pl-0"
              >
                {/* Mobile vertical connector dot anchor */}
                <span className="absolute left-0 top-0 h-full w-px bg-frame lg:hidden" />

                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center bg-graphite font-display text-lg font-bold text-brass frame-outline-strong">
                  {step.no}
                  <span className="absolute -left-16 top-1/2 hidden h-px w-16 lg:block" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ivory">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-muted/70">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
