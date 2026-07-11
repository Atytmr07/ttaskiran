'use client';

import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { fadeUp, VIEWPORT_ONCE } from './motion';

// Eyebrow + display title pairing used across sections. An optional running
// index gives the whole page the numbered-catalog feel of the reference.
export default function SectionHeading({
  eyebrow,
  title,
  index,
  align = 'left',
  className = '',
}: {
  eyebrow: string;
  title: string;
  index?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`relative ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className={`flex items-center gap-3 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        {index && (
          <span className="font-display text-sm font-bold tracking-widest text-brass">
            {index}
            <span className="ml-2 text-muted/40">—</span>
          </span>
        )}
        <motion.span
          aria-hidden="true"
          className="h-px w-8 origin-left bg-brass"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        />
        <span className="font-body text-[11px] font-semibold uppercase tracking-widest3 text-brass">
          {eyebrow}
        </span>
      </motion.div>

      <h2 className="mt-5 max-w-4xl break-words font-display text-[1.85rem] font-extrabold leading-[1.05] tracking-tight text-ivory sm:text-4xl sm:leading-[1.02] md:text-5xl lg:text-6xl">
        <AnimatedText text={title} />
      </h2>
    </div>
  );
}
