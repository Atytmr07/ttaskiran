'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

// Subtle pointer-driven 3D tilt with a moving sheen highlight. Used on the
// showpiece cards/frames. Reduced-motion → a plain static wrapper.
export default function Tilt({
  children,
  className = '',
  max = 7,
  sheen = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  sheen?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sprX = useSpring(px, { stiffness: 200, damping: 20 });
  const sprY = useSpring(py, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(sprY, [0, 1], [max, -max]);
  const rotateY = useTransform(sprX, [0, 1], [-max, max]);
  // Hook is called unconditionally (rules of hooks); only rendered when needed.
  const sheenBg = useTransform(
    sprX,
    (v) =>
      `radial-gradient(circle at ${v * 100}% 0%, rgba(255,255,255,0.5), transparent 55%)`,
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {sheen && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 [mix-blend-mode:soft-light] group-hover:opacity-100"
          style={{ background: sheenBg }}
        />
      )}
    </motion.div>
  );
}
