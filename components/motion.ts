import type { Variants } from 'framer-motion';

// Shared Framer Motion presets (Section 4).
export const DOSSIER_EASE = [0.25, 0.1, 0.25, 1] as const;

export const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: DOSSIER_EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: DOSSIER_EASE } },
};

// Overlapping-frame entry: back frame first, front frame follows.
export const frameBack: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: DOSSIER_EASE },
  },
};

export const frameFront: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: DOSSIER_EASE, delay: 0.1 },
  },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.25 } as const;
