'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { DOSSIER_EASE } from './motion';

// Per-word reveal (rise + un-blur + fade) — the signature premium heading
// motion. Falls back to plain text under prefers-reduced-motion.
export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-change-transform"
          style={{ marginRight: i < words.length - 1 ? '0.26em' : undefined }}
          initial={{ opacity: 0, y: '0.4em', filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once, amount: 0.4 }}
          transition={{
            duration: 0.6,
            ease: DOSSIER_EASE,
            delay: delay + i * stagger,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
